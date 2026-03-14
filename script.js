//  STICKY NAV
const header = document.getElementById("site-header");

const handleScroll = () => {
  header.classList.toggle("scrolled", window.scrollY > 60);
};

window.addEventListener("scroll", handleScroll, { passive: true });
handleScroll(); // run on load

//  MOBILE MENU
const navToggle = document.getElementById("nav-toggle");
const navLinks = document.getElementById("nav-links");

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", isOpen.toString());
});

// Close menu when a link is clicked
navLinks.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// Close on Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && navLinks.classList.contains("open")) {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.focus();
  }
});

//  HERO CANVAS NETWORK ANIMATION
(function initCanvas() {
  const canvas = document.getElementById("hero-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let W, H, nodes, animFrameId;

  const NODE_COUNT = 55;
  const MAX_DIST = 160;
  const SPEED = 0.35;
  const NODE_RADIUS = 2.2;

  const COLOR_NODE = "rgba(0, 212, 255, 0.7)";
  const COLOR_LINE = "rgba(0, 212, 255, ";

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    initNodes();
  }

  function initNodes() {
    nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * SPEED,
      vy: (Math.random() - 0.5) * SPEED,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Update positions
    for (const n of nodes) {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;
    }

    // Draw connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          const alpha = (1 - dist / MAX_DIST) * 0.35;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = COLOR_LINE + alpha + ")";
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    // Draw nodes
    for (const n of nodes) {
      ctx.beginPath();
      ctx.arc(n.x, n.y, NODE_RADIUS, 0, Math.PI * 2);
      ctx.fillStyle = COLOR_NODE;
      ctx.fill();
    }

    animFrameId = requestAnimationFrame(draw);
  }

  // Pause when tab is hidden
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      cancelAnimationFrame(animFrameId);
    } else {
      animFrameId = requestAnimationFrame(draw);
    }
  });

  // Only animate if in view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animFrameId = requestAnimationFrame(draw);
      } else {
        cancelAnimationFrame(animFrameId);
      }
    });
  });
  observer.observe(canvas);

  window.addEventListener(
    "resize",
    () => {
      cancelAnimationFrame(animFrameId);
      resize();
    },
    { passive: true },
  );

  resize();
})();

// SCROLL REVEAL
(function initReveal() {
  const elements = document.querySelectorAll(
    ".about-card, .pillar-card, .pipeline-step, .community-card, " +
      ".about-text, .contact-info, .contact-form-wrapper, .section-title, " +
      ".section-subtitle, .section-label",
  );

  elements.forEach((el) => el.classList.add("reveal"));

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger children of grid parents
          const delay =
            Array.from(entry.target.parentElement.children).indexOf(
              entry.target,
            ) * 80;
          setTimeout(
            () => {
              entry.target.classList.add("visible");
            },
            Math.min(delay, 320),
          );
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
  );

  elements.forEach((el) => revealObserver.observe(el));
})();

// ACTIVE NAV LINK HIGHLIGHT
(function initActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const links = document.querySelectorAll(".nav-link:not(.nav-cta)");

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          links.forEach((link) => {
            const isActive = link.getAttribute("href") === `#${id}`;
            link.style.color = isActive ? "var(--clr-white)" : "";
          });
        }
      });
    },
    { threshold: 0.4 },
  );

  sections.forEach((s) => sectionObserver.observe(s));
})();

//  CONTACT FORM
(function initForm() {
  const form = document.getElementById("interest-form");
  const success = document.getElementById("form-success");
  const btn = document.getElementById("submit-btn");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.querySelector("#full-name");
    const email = form.querySelector("#email");
    let valid = true;

    // Basic validation
    [name, email].forEach((field) => {
      field.style.borderColor = "";
      if (!field.value.trim()) {
        field.style.borderColor = "#F87171";
        valid = false;
      }
    });

    if (!email.value.includes("@")) {
      email.style.borderColor = "#F87171";
      valid = false;
    }

    if (!valid) return;

    // Simulate submission
    const btnText = btn.querySelector(".btn-text");
    btnText.textContent = "Sending…";
    btn.disabled = true;

    setTimeout(() => {
      form.reset();
      btn.disabled = false;
      btnText.textContent = "Register Interest";
      success.hidden = false;
      success.scrollIntoView({ behavior: "smooth", block: "nearest" });

      setTimeout(() => {
        success.hidden = true;
      }, 6000);
    }, 1200);
  });

  // Clear error highlight on input
  form.querySelectorAll("input, textarea").forEach((field) => {
    field.addEventListener("input", () => {
      field.style.borderColor = "";
    });
  });
})();

// PILLAR CARD GLOW ON HOVER
(function initCardGlow() {
  const cards = document.querySelectorAll(
    ".pillar-card, .pipeline-step, .community-card",
  );

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = (((e.clientX - rect.left) / rect.width) * 100).toFixed(1);
      const y = (((e.clientY - rect.top) / rect.height) * 100).toFixed(1);
      card.style.setProperty("--glow-x", `${x}%`);
      card.style.setProperty("--glow-y", `${y}%`);
    });
  });
})();
