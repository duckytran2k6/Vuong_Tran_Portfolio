const cardData = {
  projects: [
    {
      image: "images/enc_tool_menu.png",
      imageAlt: "Encryption Tool screenshot",
      title: "Encryption Tool",
      description:
        "A local CLI-based encryption and decryption tool using AES and RSA algorithms for hybrid encryption that enables secure file handling directly from the terminal, reinforcing core concepts in data protection, system interaction, and security-focused workflows.",
      meta: "Tool: Java",
      link: { text: "View Repo", href: "https://github.com/duckytran2k6/CLI_QuackyENC" }
    },
    {
      image: "images/wazuh_agent_dashboard.png",
      imageAlt: "SOC Homelab screenshot",
      title: "SOC Homelab",
      description:
        "A SOC homelab environment built using an old laptop to provide an isolated and controlled environment. Includes automation scripts, multiple virtual machines, network segmentation, and a SIEM tool for security monitoring and alerting, hands-on experience in threat detection, incident response, and security analysis.",
      meta: "Tool: Docker, Wazuh, libvirt, iptables, bash"
    }
  ],

  experiences: [
    {
      image: "images/blake_burn_elementary.png",
      imageAlt: "Blakeburn Elementary",
      title: "Elementary Tutor",
      description:
        "Participated in a Leadership class project, tutoring Grade 3 students. Designed, organized, and delivered engaging hands-on activities that introduced critical thinking, leadership, and problem solving.",
      meta: "@ Blakeburn Elementary school",
      link: { text: "Visit website", href: "https://www.sd43.bc.ca/school/blakeburn/Pages/default.aspx#/=" }
    },
    {
      image: "images/terry_fox_secondary_2.png",
      imageAlt: "Terry Fox Secondary",
      title: "Tour de Fox guide",
      description:
        "Guided 2-3 groups of 10-15 middle school students from Coquitlam, Port Coquitlam, and Port Moody through a professionally organized school tour, introducing facilities, course offerings, and key aspects of high school life.",
      meta: "@ Terry Fox Secondary school",
      link: { text: "Visit website", href: "https://www.sd43.bc.ca/school/terryfox/Pages/default.aspx#/=" }
    },
    {
      image: "images/terry_fox_secondary_2.png",
      imageAlt: "Terry Fox Secondary",
      title: "Pro-D Day Assistant",
      description:
        "Assisted during School District 43 Pro-D Day, supporting educators with classroom navigation, technical setup, and on-site troubleshooting for digital check-in and scheduled activities.",
      meta: "@ Terry Fox Secondary school",
      link: { text: "Visit website", href: "https://www.sd43.bc.ca/school/terryfox/Pages/default.aspx#/=" }
    }
  ],

  certs: [
    {
      image: "images/tryhackme.png",
      imageAlt: "TryHackMe",
      details: [
        { label: "Current Path", value: "SAL1" },
        { label: "Completed Path", value: "Coming soon..." }
      ],
      button: { text: "View TryHackMe profile", href: "YOUR_TRYHACKME_PROFILE_URL" }
    },
    {
      image: "images/comptia_network+.png",
      imageAlt: "CompTIA Network+",
      details: [
        { label: "Goal", value: "Take the exam in mid-February 2027" }
      ],
      button: { text: "Progress Tracking", href: "https://docs.google.com/spreadsheets/d/19OGkEmGRE37BhISMT9oVLpvM8ffRIBf_WMpRSvo-vRo/edit?usp=sharing" }
    }
  ]
};

function makeLink(link) {
  const a = document.createElement("a");
  a.href = link.href;
  a.textContent = link.text;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  return a;
}

function buildCard(card) {
  const item = document.createElement("div");
  item.className = "pane-item";

  if (card.image) {
    const img = document.createElement("img");
    img.className = "pane-thumb";
    img.src = card.image;
    img.alt = card.imageAlt || "";
    item.appendChild(img);
  }

  if (card.title) {
    const h3 = document.createElement("h3");
    h3.textContent = card.title;
    item.appendChild(h3);
  }

  if (card.description) {
    const p = document.createElement("p");
    p.textContent = card.description;
    item.appendChild(p);
  }

  (card.details || []).forEach((d) => {
    const p = document.createElement("p");
    p.className = "pane-detail";

    const label = document.createElement("span");
    label.className = "detail-label";
    label.textContent = d.label + ":";
    p.appendChild(label);

    if (d.value) p.appendChild(document.createTextNode(" " + d.value));
    if (d.link) {
      p.appendChild(document.createTextNode(" "));
      p.appendChild(makeLink(d.link));
    }
    item.appendChild(p);
  });

  if (card.meta || card.link) {
    const p = document.createElement("p");
    p.className = "pane-meta";
    if (card.meta) p.appendChild(document.createTextNode(card.meta));
    if (card.meta && card.link) p.appendChild(document.createTextNode(" · "));
    if (card.link) p.appendChild(makeLink(card.link));
    item.appendChild(p);
  }

  if (card.button) {
    const a = makeLink(card.button);
    a.className = "pane-button";
    item.appendChild(a);
  }

  return item;
}

function renderCards(sectionId) {
  const pane = document.getElementById("pane-" + sectionId);
  if (!pane) return;
  const cards = cardData[sectionId] || [];
  pane.textContent = "";

  cards.forEach((card, index) => {
    pane.appendChild(buildCard(card));

    if (index < cards.length - 1) {
      const divider = document.createElement("hr");
      divider.className = "pane-divider";
      pane.appendChild(divider);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const content = {
    about: { cmd: "whoami" },
    projects: { cmd: "ls ~/projects" },
    experiences: { cmd: "history" },
    contact: { cmd: "curl -X POST /contacts" },
    certs: { cmd: "ls ~/certs" }
  };

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  Object.keys(cardData).forEach(renderCards);

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

  function typeText(el, text, speed, onDone) {
    el.textContent = "";
    if (reduceMotion) {
      el.textContent = text;
      if (onDone) onDone();
      return null;
    }
    let i = 0;
    const id = setInterval(() => {
      i++;
      el.textContent = text.slice(0, i);
      if (i >= text.length) {
        clearInterval(id);
        if (onDone) onDone();
      }
    }, speed);
    return id;
  }

  let panelTypingId = null;

  function openPanel(id) {
    const data = content[id];
    if (!data) return;

    panes.forEach(p => p.classList.remove("active"));
    panel.classList.add("open");
    nodes.forEach(n => n.classList.toggle("active", n.dataset.id === id));
    menu.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");

    clearInterval(panelTypingId);
    panelTypingId = typeText(panelCmd, data.cmd, 55, () => {
      const pane = document.getElementById("pane-" + id);
      if (pane) pane.classList.add("active");
    });
  }

  nodes.forEach(n => n.addEventListener("click", () => openPanel(n.dataset.id)));
  menu.querySelectorAll("button").forEach(b => b.addEventListener("click", () => openPanel(b.dataset.id)));
  document.querySelectorAll(".quick-links button[data-id]").forEach(b => b.addEventListener("click", () => openPanel(b.dataset.id)));

  const formToggle = document.getElementById("form-toggle");
  const formWrap = document.getElementById("form-wrap");

  formToggle.addEventListener("click", () => {
    const isOpen = formWrap.classList.toggle("open");
    formToggle.setAttribute("aria-expanded", String(isOpen));
    formToggle.textContent = isOpen ? "Hide form" : "Send a message";
    if (isOpen) {
      formWrap.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest" });
    }
  });

  document.getElementById("panel-close").addEventListener("click", () => {
    panel.classList.remove("open");
    nodes.forEach(n => n.classList.remove("active"));
    clearInterval(panelTypingId);
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

  panel.addEventListener("click", (e) => {
    const img = e.target.closest(".pane-photo, .pane-thumb");
    if (img) openLightbox(img.src, img.alt);
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
      clearInterval(panelTypingId);
      closeLightbox();
    }
  });

  const statusText = document.getElementById("status-text");
  typeText(statusText, "click a star to begin", 40);
});