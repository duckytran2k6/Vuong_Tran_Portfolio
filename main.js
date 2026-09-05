document.addEventListener("DOMContentLoaded", () => {
  const content = {
    about: { cmd: "whoami" },
    projects: { cmd: "ls ~/projects" },
    experiences: { cmd: "history" },
    contact: { cmd: "whois vuong" },
    message: { cmd: "curl -X POST /contact" }
  };

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const brand = document.querySelector(".brand");
  const brandLine = document.querySelector(".brand-line");
  if (brand && brandLine) {
    brandLine.style.width = (brand.offsetWidth + 40) + "px";
  }

  const starsBg = document.getElementById("stars-bg");
  for (let i = 0; i < 70; i++) {
    const s = document.createElement("div");
    s.className = "bgstar";
    s.style.left = Math.random() * 100 + "%";
    s.style.top = Math.random() * 100 + "%";
    s.style.animationDelay = (Math.random() * 4) + "s";
    starsBg.appendChild(s);
  }

  const panel = document.getElementById("panel");
  const panelCmd = document.getElementById("panel-cmd");
  const panes = document.querySelectorAll(".panel-pane");
  const nodes = document.querySelectorAll(".node");
  const menu = document.getElementById("menu");
  const hamburger = document.getElementById("hamburger");

  let typingId = null;

  function typeText(el, text, speed, onDone) {
    clearInterval(typingId);
    el.textContent = "";
    if (reduceMotion) { el.textContent = text; onDone(); return; }
    let i = 0;
    typingId = setInterval(() => {
      i++;
      el.textContent = text.slice(0, i);
      if (i >= text.length) { clearInterval(typingId); onDone(); }
    }, 55);
  }

  function openPanel(id) {
    const data = content[id];
    if (!data) return;

    panes.forEach(p => p.classList.remove("active"));
    panel.classList.add("open");
    nodes.forEach(n => n.classList.toggle("active", n.dataset.id === id));
    menu.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");

    typeText(panelCmd, data.cmd, 55, () => {
      const pane = document.getElementById("pane-" + id);
      if (pane) pane.classList.add("active");
    });
  }

  nodes.forEach(n => n.addEventListener("click", () => openPanel(n.dataset.id)));
  menu.querySelectorAll("button").forEach(b => b.addEventListener("click", () => openPanel(b.dataset.id)));

  document.getElementById("panel-close").addEventListener("click", () => {
    panel.classList.remove("open");
    nodes.forEach(n => n.classList.remove("active"));
    clearInterval(typingId);
  });

  hamburger.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    hamburger.setAttribute("aria-expanded", String(isOpen));
  });

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");

  function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || "";
    lightbox.classList.add("open");
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    lightboxImg.src = "";
  }

  document.querySelectorAll(".pane-photo, .pane-thumb").forEach(img => {
    img.addEventListener("click", () => openLightbox(img.src, img.alt));
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.getElementById("lightbox-close").addEventListener("click", closeLightbox);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      panel.classList.remove("open");
      menu.classList.remove("open");
      nodes.forEach(n => n.classList.remove("active"));
      clearInterval(typingId);
      closeLightbox();
    }
  });

  const statusText = document.getElementById("status-text");
  typeText(statusText, "click a star to begin", 40, () => {});
});