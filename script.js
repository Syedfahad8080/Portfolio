/* =====================================================
   PORTFOLIO SCRIPT.JS
   Plain vanilla JavaScript - no libraries, no frameworks.
   Organized into small, focused functions.
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initScrollProgress();
  initNavbarScrollState();
  initMobileMenu();
  initScrollSpy();
  initThemeToggle();
  initTypingText();
  initCodePanel();
  initScrollReveal();
  initSkillBars();
  initProjectFilter();
  initContactForm();
  initBackToTop();
  initFooterYear();
  initSectionNav();
});

/* -----------------------------------------------------
   1. SCROLL PROGRESS BAR
   Fills the top bar based on how far the user has scrolled.
----------------------------------------------------- */
function initScrollProgress() {
  const progressBar = document.getElementById("scrollProgress");
  if (!progressBar) return;

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = percent + "%";
  });
}

/* -----------------------------------------------------
   2. NAVBAR SHRINK ON SCROLL
   Adds a class to the navbar once the page is scrolled down,
   which our CSS uses to show the glass background.
----------------------------------------------------- */
function initNavbarScrollState() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  const updateState = () => {
    if (window.scrollY > 20) {
      navbar.classList.add("is-scrolled");
    } else {
      navbar.classList.remove("is-scrolled");
    }
  };

  updateState();
  window.addEventListener("scroll", updateState);
}

/* -----------------------------------------------------
   3. MOBILE MENU (HAMBURGER)
----------------------------------------------------- */
function initMobileMenu() {
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("is-open");
    mobileMenu.classList.toggle("is-open");
  });

  // Close the menu whenever a link inside it is clicked
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("is-open");
      mobileMenu.classList.remove("is-open");
    });
  });
}

/* -----------------------------------------------------
   4. SCROLL SPY (ACTIVE NAV LINK HIGHLIGHT)
   Watches each section and highlights the matching nav link
   when that section is roughly in the middle of the screen.
----------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".navbar__links .nav-link");
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");

          navLinks.forEach((link) => {
            const isMatch = link.getAttribute("href") === `#${id}`;
            link.classList.toggle("is-active", isMatch);
          });
        }
      });
    },
    { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
  );

  sections.forEach((section) => observer.observe(section));
}

/* -----------------------------------------------------
   5. DARK / LIGHT THEME TOGGLE
   Toggles a class on <body> and remembers the choice
   in localStorage so it persists on refresh.
----------------------------------------------------- */
function initThemeToggle() {
  const toggleBtn = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");
  if (!toggleBtn || !themeIcon) return;

  const savedTheme = localStorage.getItem("portfolio-theme");

  // Apply saved preference on page load (defaults to dark)
  if (savedTheme === "light") {
    document.body.classList.add("light-theme");
    themeIcon.textContent = "☀️";
  }

  toggleBtn.addEventListener("click", () => {
    const isLight = document.body.classList.toggle("light-theme");
    themeIcon.textContent = isLight ? "☀️" : "🌙";
    localStorage.setItem("portfolio-theme", isLight ? "light" : "dark");
  });
}

/* -----------------------------------------------------
   6. HERO TYPING TEXT ANIMATION
   Types out a word, pauses, deletes it, then moves to the
   next word in the list — classic "typewriter" effect.
----------------------------------------------------- */
function initTypingText() {
  const el = document.getElementById("typingText");
  if (!el) return;

  const words = ["full stack.", "modern web.", "real users.", "long term."];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const TYPING_SPEED = 80;
  const DELETING_SPEED = 45;
  const PAUSE_TIME = 1500;

  function tick() {
    const currentWord = words[wordIndex];

    if (!isDeleting) {
      charIndex++;
      el.textContent = currentWord.slice(0, charIndex);

      if (charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(tick, PAUSE_TIME);
        return;
      }
    } else {
      charIndex--;
      el.textContent = currentWord.slice(0, charIndex);

      if (charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
    }

    setTimeout(tick, isDeleting ? DELETING_SPEED : TYPING_SPEED);
  }

  tick();
}

/* -----------------------------------------------------
   7. HERO CODE PANEL "TYPING" EFFECT
   Builds a fake syntax-highlighted JS object line by line,
   using <span> tags with color classes for highlighting.
----------------------------------------------------- */
function initCodePanel() {
  const body = document.getElementById("codePanelBody");
  if (!body) return;

  // Each line is an array of tokens: { text, class }
  const lines = [
    [
      { t: "const ", c: "tok-kw" },
      { t: "developer", c: "tok-var" },
      { t: " = {", c: "tok-punct" },
    ],
    [
      { t: "  name", c: "tok-prop" },
      { t: ": ", c: "tok-punct" },
      { t: "'Syed Fahad Ali'", c: "tok-str" },
      { t: ",", c: "tok-punct" },
    ],
    [
      { t: "  role", c: "tok-prop" },
      { t: ": ", c: "tok-punct" },
      { t: "'Full Stack Developer'", c: "tok-str" },
      { t: ",", c: "tok-punct" },
    ],
    [
      { t: "  basedIn", c: "tok-prop" },
      { t: ": ", c: "tok-punct" },
      { t: "'India'", c: "tok-str" },
      { t: ",", c: "tok-punct" },
    ],
    [
      { t: "  stack", c: "tok-prop" },
      { t: ": [", c: "tok-punct" },
      { t: "'React'", c: "tok-str" },
      { t: ", ", c: "tok-punct" },
      { t: "'Next.js'", c: "tok-str" },
      { t: ", ", c: "tok-punct" },
      { t: "'Node.js'", c: "tok-str" },
      { t: "],", c: "tok-punct" },
    ],
    [
      { t: "  loves", c: "tok-prop" },
      { t: ": ", c: "tok-punct" },
      { t: "'clean, scalable code'", c: "tok-str" },
      { t: ",", c: "tok-punct" },
    ],
    [
      { t: "  available", c: "tok-prop" },
      { t: ": ", c: "tok-punct" },
      { t: "true", c: "tok-bool" },
    ],
    [{ t: "};", c: "tok-punct" }],
  ];

  let lineIndex = 0;

  function typeNextLine() {
    if (lineIndex >= lines.length) return;

    const lineDiv = document.createElement("div");
    lines[lineIndex].forEach((token) => {
      const span = document.createElement("span");
      span.className = token.c;
      span.textContent = token.t;
      lineDiv.appendChild(span);
    });

    body.appendChild(lineDiv);
    lineIndex++;

    setTimeout(typeNextLine, 260);
  }

  typeNextLine();
}

/* -----------------------------------------------------
   8. SCROLL REVEAL ANIMATIONS
   Adds .is-visible to any element with the .reveal class
   once it scrolls into the viewport.
----------------------------------------------------- */
function initScrollReveal() {
  const revealEls = document.querySelectorAll(".reveal");
  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  revealEls.forEach((el) => observer.observe(el));
}

/* -----------------------------------------------------
   9. ANIMATED SKILL BARS
   Fills each skill bar to its data-width value only once
   it becomes visible, so the animation feels intentional.
----------------------------------------------------- */
function initSkillBars() {
  const bars = document.querySelectorAll(".skill-bar__fill");
  if (!bars.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const width = bar.getAttribute("data-width") || "0";
          bar.style.width = width + "%";
          observer.unobserve(bar);
        }
      });
    },
    { threshold: 0.4 },
  );

  bars.forEach((bar) => observer.observe(bar));
}

/* -----------------------------------------------------
   10. PROJECT FILTERING
   Shows/hides project cards based on the selected category.
----------------------------------------------------- */
function initProjectFilter() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");
  if (!filterButtons.length || !projectCards.length) return;

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter");

      // Update active button styling
      filterButtons.forEach((btn) => btn.classList.remove("is-active"));
      button.classList.add("is-active");

      // Show or hide each card based on its data-category
      projectCards.forEach((card) => {
        const category = card.getAttribute("data-category");
        const shouldShow = filter === "all" || category === filter;
        card.classList.toggle("is-hidden", !shouldShow);
      });
    });
  });
}

/* -----------------------------------------------------
   11. CONTACT FORM VALIDATION
   Simple client-side validation with inline error messages.
   No backend is connected — this only demonstrates validation.
----------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");

  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const messageError = document.getElementById("messageError");
  const successMessage = document.getElementById("formSuccess");

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    successMessage.classList.remove("is-visible");

    let isValid = true;

    // Validate name
    if (nameInput.value.trim().length < 2) {
      nameError.textContent = "Please enter your full name.";
      isValid = false;
    } else {
      nameError.textContent = "";
    }

    // Validate email
    if (!emailPattern.test(emailInput.value.trim())) {
      emailError.textContent = "Please enter a valid email address.";
      isValid = false;
    } else {
      emailError.textContent = "";
    }

    // Validate message
    if (messageInput.value.trim().length < 10) {
      messageError.textContent = "Message should be at least 10 characters.";
      isValid = false;
    } else {
      messageError.textContent = "";
    }

    if (isValid) {
      emailjs
        .send("service_vt7lr4f", "template_s3fforh", {
          name: nameInput.value,
          email: emailInput.value,
          message: messageInput.value,
        })
        .then(() => {
          successMessage.textContent =
            "Message sent successfully! I'll get back to you soon.";
          successMessage.classList.add("is-visible");
          form.reset();
        })
        .catch((error) => {
          console.error("EmailJS Error:", error);

          successMessage.textContent =
            "Failed to send message. Please try again.";

          successMessage.classList.add("is-visible");
        });
    }
  });
}

/* -----------------------------------------------------
   12. BACK TO TOP BUTTON
----------------------------------------------------- */
function initBackToTop() {
  const button = document.getElementById("backToTop");
  if (!button) return;

  window.addEventListener("scroll", () => {
    button.classList.toggle("is-visible", window.scrollY > 500);
  });

  button.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* -----------------------------------------------------
   13. FOOTER YEAR
   Keeps the copyright year always current.
----------------------------------------------------- */
function initFooterYear() {
  const yearEl = document.getElementById("year");
  if (!yearEl) return;
  yearEl.textContent = new Date().getFullYear();
}

/* -----------------------------------------------------
   14. SPA-STYLE SECTION NAVIGATION
   Clicking a nav link (desktop nav, mobile nav, footer nav,
   logo, or the "Let's Talk" button) shows only that section
   — like a separate "page" — while hiding all others, with
   a smooth fade transition and no full page reload.
   Home (#hero) is shown by default when the site loads.
----------------------------------------------------- */
function initSectionNav() {
  const main = document.querySelector("main");
  if (!main) return;

  const sections = Array.from(main.querySelectorAll(":scope > section[id]"));
  if (!sections.length) return;

  const TRANSITION_MS = 350;
  let activeId = "hero";
  let isAnimating = false;

  function applyActiveState(id) {
    document.querySelectorAll(".nav-link").forEach((link) => {
      const href = link.getAttribute("href");
      link.classList.toggle("is-active", href === `#${id}`);
    });
  }

  // Immediately re-run the existing reveal / skill-bar animations
  // for whatever section just became visible, so users don't have
  // to scroll for content to appear.
  function revealSectionContent(section) {
    section.querySelectorAll(".reveal").forEach((el) => {
      el.classList.add("is-visible");
    });
    section.querySelectorAll(".skill-bar__fill").forEach((bar) => {
      const width = bar.getAttribute("data-width") || "0";
      bar.style.width = width + "%";
    });
  }

  function showSection(id) {
    if (isAnimating || id === activeId) return;

    const target = sections.find((sec) => sec.id === id);
    const current = sections.find((sec) => sec.id === activeId);
    if (!target) return;

    isAnimating = true;

    function activateTarget() {
      sections.forEach((sec) => {
        if (sec === target) return;
        sec.style.display = "none";
        sec.style.opacity = "";
      });

      // Hero relies on its own CSS (display: flex); every other
      // section is a plain block-level <section>.
      target.style.display = target.id === "hero" ? "" : "block";
      target.style.opacity = "0";
      // Force a reflow so the browser registers the starting
      // opacity before we transition it, giving a real fade-in.
      void target.offsetWidth;
      target.style.opacity = "1";

      activeId = id;
      applyActiveState(id);
      window.scrollTo({ top: 0, behavior: "auto" });
      revealSectionContent(target);
      history.replaceState(null, "", `#${id}`);

      setTimeout(() => {
        isAnimating = false;
      }, TRANSITION_MS);
    }

    if (current) {
      current.style.opacity = "0";
      setTimeout(activateTarget, TRANSITION_MS);
    } else {
      activateTarget();
    }
  }

  // Hook into every in-page anchor link that points at a real
  // section id (nav, mobile nav, footer, logo, CTA buttons).
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    const href = link.getAttribute("href");
    if (!href || href.length < 2) return;
    const id = href.slice(1);
    if (!sections.some((sec) => sec.id === id)) return;

    link.addEventListener("click", (event) => {
      event.preventDefault();
      showSection(id);

      const hamburger = document.getElementById("hamburger");
      const mobileMenu = document.getElementById("mobileMenu");
      if (hamburger && mobileMenu) {
        hamburger.classList.remove("is-open");
        mobileMenu.classList.remove("is-open");
      }
    });
  });

  // Home (#hero) is always the default page shown on first load.
  applyActiveState("hero");
}

emailjs.init("xJmeDiHtghM2YBQ5t");

const liveDemoBtn = document.getElementById("liveDemoBtn");
const videoPanel = document.getElementById("videoPanel");
const closeVideo = document.getElementById("closeVideo");
const clariopVideo = document.getElementById("clariopVideo");

if (liveDemoBtn) {
  liveDemoBtn.addEventListener("click", function (e) {
    e.preventDefault();

    videoPanel.classList.add("active");

    clariopVideo.play();
  });
}

closeVideo.addEventListener("click", function () {
  videoPanel.classList.remove("active");

  clariopVideo.pause();

  clariopVideo.currentTime = 0;
});
