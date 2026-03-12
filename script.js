if (window.lucide && typeof window.lucide.createIcons === 'function') {
  window.lucide.createIcons();
}

     document.addEventListener('DOMContentLoaded', () => {
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
// --- TESTIMONIALS (Next/Prev + dots) ---
  (function () {
    const prevBtn = document.getElementById("tPrev");
    const nextBtn = document.getElementById("tNext");
    const avatarEl = document.getElementById("tAvatar");
    const quoteEl = document.getElementById("tQuote");
    const nameEl = document.getElementById("tName");
    const roleEl = document.getElementById("tRole");
    const dotsEl = document.getElementById("tDots");

    if (!prevBtn || !nextBtn || !avatarEl || !quoteEl || !nameEl || !roleEl || !dotsEl) return;

    const testimonials = [
      {
        avatar:
          "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/4734259a-bad7-422f-981e-ce01e79184f2_1600w.jpg",
        quote:
          "The layout feels premium and effortless. Our conversion rate went up within the first week after switching.",
        name: "Ava Thompson",
        role: "Verified Buyer",
      },
      {
        avatar:
          "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/c543a9e1-f226-4ced-80b0-feb8445a75b9_1600w.jpg",
        quote:
          "Beautiful motion, clean hierarchy, and it loads fast. It finally looks like a modern brand, not a template.",
        name: "Noah Patel",
        role: "Store Owner",
      },
      {
        avatar:
          "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/5bab247f-35d9-400d-a82b-fd87cfe913d2_1600w.webp",
        quote:
          "The product grids and collection cards are so easy to scan. Customers find what they want faster now.",
        name: "Mia Laurent",
        role: "Verified Buyer",
      },
      {
        avatar:
          "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/917d6f93-fb36-439a-8c48-884b67b35381_1600w.jpg",
        quote:
          "It feels like Apple-level polish with ecommerce practicality. Smooth, minimal, and confident.",
        name: "Ethan Rivera",
        role: "Creative Director",
      },
    ];

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
  })();
