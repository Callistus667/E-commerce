if ("scrollRestoration" in history) history.scrollRestoration = "manual";

window.addEventListener("pageshow", () => window.scrollTo(0, 0));

function throttle(fn, wait) {
  let pending = false;
  return function throttled() {
    if (pending) return;
    pending = true;
    requestAnimationFrame(() => {
      fn();
      setTimeout(() => {
        pending = false;
      }, wait);
    });
  };
}

document.addEventListener("DOMContentLoaded", () => {
  const revealItems = document.querySelectorAll(".reveal-on-scroll");
  if (revealItems.length) {
    const io = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    revealItems.forEach((item) => io.observe(item));
  }

  const track = document.querySelector(".hero-bg-track");
  if (track && track.children.length > 2) {
    const total = track.children.length;
    const originals = total / 2;
    const slidePercent = 100 / total;
    let idx = 0;
    const displayMs = 2600;
    const transitionMs = 550;

    const tick = () => {
      idx += 1;
      track.style.transition = `transform ${transitionMs}ms ease`;
      track.style.transform = `translateX(-${(idx * slidePercent).toFixed(6)}%)`;
      if (idx === originals) {
        setTimeout(() => {
          idx = 0;
          track.style.transition = "none";
          track.style.transform = "translateX(0%)";
        }, transitionMs + 15);
      }
    };

    setInterval(tick, displayMs);
  }

  const progressBar = document.querySelector(".scroll-progress");
  const parallaxItems = document.querySelectorAll("[data-parallax]");
  const doScrollEffects = throttle(() => {
    const scrollTop = window.scrollY || window.pageYOffset;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (progressBar && max > 0) {
      progressBar.style.width = `${Math.min(100, (scrollTop / max) * 100)}%`;
    }

    parallaxItems.forEach((el) => {
      const speed = Number(el.getAttribute("data-parallax")) || 0.08;
      const y = Math.max(-40, Math.min(40, scrollTop * speed));
      el.style.transform = `translate3d(0, ${y}px, 0)`;
    });
  }, 20);
  window.addEventListener("scroll", doScrollEffects, { passive: true });
  doScrollEffects();

  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  document.querySelectorAll(".tilt-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const box = card.getBoundingClientRect();
      const x = e.clientX - box.left;
      const y = e.clientY - box.top;
      const rx = ((y / box.height) - 0.5) * -5;
      const ry = ((x / box.width) - 0.5) * 5;
      card.style.transform = `rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(-4px)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "rotateX(0deg) rotateY(0deg) translateY(0)";
    });
  });

  document.querySelectorAll("[data-count]").forEach((counter) => {
    const targetValue = Number(counter.getAttribute("data-count")) || 0;
    let current = 0;
    const step = Math.max(1, Math.floor(targetValue / 60));
    const run = () => {
      current = Math.min(targetValue, current + step);
      counter.textContent = `${current}${counter.getAttribute("data-suffix") || ""}`;
      if (current < targetValue) requestAnimationFrame(run);
    };
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        run();
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.4 });
    counterObserver.observe(counter);
  });
});
