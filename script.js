// Prevent browser from restoring scroll
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// Force scroll to top when page loads
window.addEventListener("load", () => {
  window.scrollTo(0, 0);
});

// Handle back/forward cache
window.addEventListener('pageshow', (event) => {
  if (event.persisted) window.scrollTo(0, 0);
});

// Reset before leaving page
window.addEventListener('beforeunload', () => {
  window.scrollTo(0, 0);
});

// Lucide icons
if (window.lucide && typeof window.lucide.createIcons === 'function') {
  window.lucide.createIcons();
}

document.addEventListener('DOMContentLoaded', () => {
  // Ensure initial paint is at the top
  window.scrollTo(0, 0);
        const observerOptions = {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        }, observerOptions);

        document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
      });

// Hero slider controlled by JavaScript for smooth transitions and seamless looping
document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.hero-bg-track');
  if (!track) return;

  const slides = Array.from(track.children);
  const total = slides.length; // duplicated slides (e.g. 6)
  const originals = total / 2; // number of unique slides (e.g. 3)
  const slidePercent = 100 / total; // e.g. 16.666...
  const displayMs = 9000; // pause per slide
  const transitionMs = 400; // must match CSS transition

  let index = 0;
  let timeoutId = null;

  function setTransform(i, withTransition = true) {
    if (!withTransition) track.style.transition = 'none';
    else track.style.transition = `transform ${transitionMs}ms ease`;
    track.style.transform = `translateX(-${(i * slidePercent).toFixed(6)}%)`;
  }

  function scheduleNext() {
    timeoutId = setTimeout(() => {
      index++;
      setTransform(index, true);

      // When we've moved to the duplicated set (index == originals), reset after transition
      if (index === originals) {
        const onEnd = () => {
          track.removeEventListener('transitionend', onEnd);
          // jump back to the original first slide without transition
          index = 0;
          setTransform(index, false);
        };
        track.addEventListener('transitionend', onEnd, { once: true });
      }

      scheduleNext();
    }, displayMs + 0); // show current slide for displayMs, then transition
  }

  // initialize
  setTransform(0, false);
  // small delay before starting so initial paint is stable
  setTimeout(scheduleNext, displayMs);

  // cleanup on page hide/unload
  window.addEventListener('pagehide', () => { if (timeoutId) clearTimeout(timeoutId); });
  window.addEventListener('beforeunload', () => { if (timeoutId) clearTimeout(timeoutId); });
});
// --- TESTIMONIALS (Next/Prev + dots) ---
 
    let index = 0;

    // Small fade transition (no dependencies)
    function animateSwap() {
      const targets = [avatarEl, quoteEl, nameEl, roleEl, dotsEl];
      targets.forEach((el) => {
        el.style.transition = "opacity 240ms ease, transform 240ms ease";
        el.style.opacity = "0";
        el.style.transform = "translateY(6px)";
      });

      window.setTimeout(() => {
        render();
        targets.forEach((el) => {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        });
      }, 220);
    }

    function renderDots() {
      dotsEl.innerHTML = "";
      testimonials.forEach((_, i) => {
        const b = document.createElement("button");
        b.type = "button";
        b.setAttribute("aria-label", `Go to testimonial ${i + 1}`);
        b.className = "h-2.5 rounded-full transition-all duration-300 " + (i === index ? "w-10 bg-gray-900" : "w-2.5 bg-gray-300 hover:bg-gray-400");
        b.addEventListener("click", () => {
          if (i === index) return;
          index = i;
          animateSwap();
        });
        dotsEl.appendChild(b);
      });
    }

    function render() {
      const t = testimonials[index];
      avatarEl.src = t.avatar;
      avatarEl.alt = `${t.name} avatar`;
      quoteEl.textContent = t.quote;
      nameEl.textContent = t.name;
      roleEl.textContent = t.role;
      renderDots();

      // Lucide re-scan (safe to call; fixes any icon updates elsewhere too)
      if (window.lucide && typeof window.lucide.createIcons === "function") {
        window.lucide.createIcons();
      }
    }

    function next() {
      index = (index + 1) % testimonials.length;
      animateSwap();
    }
    function prev() {
      index = (index - 1 + testimonials.length) % testimonials.length;
      animateSwap();
    }

    nextBtn.addEventListener("click", next);
    prevBtn.addEventListener("click", prev);

    // Optional: keyboard support when section is in view
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    });

    // First paint
    render();

    // Start visible (so the first transition doesn’t flash)
    [avatarEl, quoteEl, nameEl, roleEl, dotsEl].forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    });