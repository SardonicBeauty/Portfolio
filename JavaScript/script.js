
document.addEventListener("DOMContentLoaded", () => {
  // ========================================
  // 1. REVEAL CONTENT WHEN SCROLLING
  // ========================================

  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          } else {
            entry.target.classList.remove("visible");
          }
        });
      },
      {
        threshold: 0.12
      }
    );

    revealElements.forEach((element) => {
      observer.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }

  // ========================================
  // 2. FADE BANNER BASED ON SCROLL DIRECTION
  // ========================================

  const banner = document.querySelector(".banner");

  let lastScrollY = window.scrollY;
  const scrollThreshold = 4;

  if (banner) {
    window.addEventListener(
      "scroll",
      () => {
        const currentScrollY = window.scrollY;
        const difference = currentScrollY - lastScrollY;

        if (Math.abs(difference) >= scrollThreshold) {
          if (difference > 0 && currentScrollY > 100) {
            // Scrolling down: fade the banner out
            banner.classList.add("banner-hidden");
          } else if (difference < 0) {
            // Scrolling up: fade the banner in
            banner.classList.remove("banner-hidden");
          }

          lastScrollY = currentScrollY;
        }

        // Always show the banner near the top
        if (currentScrollY <= 20) {
          banner.classList.remove("banner-hidden");
        }
      },
      {
        passive: true
      }
    );
  }

  // ========================================
  // 3. UPDATE COPYRIGHT YEAR
  // ========================================

  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});

