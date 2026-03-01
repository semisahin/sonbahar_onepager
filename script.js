const body = document.body;
const year = document.getElementById("year");
const header = document.getElementById("siteHeader");
const enterArrow = document.getElementById("enterArrow");
const heroVideo = document.getElementById("heroVideo");

const modal = document.getElementById("contractModal");
const modalClose = document.getElementById("modalClose");
const modalTitle = document.getElementById("modalTitle");
const contractContent = document.getElementById("contractContent");
const contractButtons = document.querySelectorAll(".contract-button");

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}
window.scrollTo(0, 0);

year.textContent = new Date().getFullYear();

let introUnlocked = false;

function revealVideo() {
  body.classList.add("video-ready");
}

function updateHeaderVisibility() {
  const trigger = window.innerHeight * 0.18;
  if (window.scrollY > trigger) {
    header.classList.add("visible");
  } else {
    header.classList.remove("visible");
  }
}

function unlockIntro() {
  introUnlocked = true;
  body.classList.remove("intro-locked");
  updateHeaderVisibility();
}

function goToPlayer(event) {
  event.preventDefault();

  body.classList.add("entering");

  setTimeout(() => {
    unlockIntro();
    const target = document.getElementById("player");
    target.scrollIntoView({ behavior: "smooth", block: "start" });

    setTimeout(() => body.classList.remove("entering"), 650);
  }, 140);
}

function preventIfLocked(event) {
  if (introUnlocked) return;

  const actuallyAtIntro = window.scrollY < Math.max(40, window.innerHeight * 0.15);
  if (actuallyAtIntro) {
    event.preventDefault();
  }
}

function preventKeysIfLocked(event) {
  if (introUnlocked) return;

  const actuallyAtIntro = window.scrollY < Math.max(40, window.innerHeight * 0.15);
  if (!actuallyAtIntro) return;

  const blockedKeys = [
    "ArrowDown",
    "ArrowUp",
    "PageDown",
    "PageUp",
    "Home",
    "End",
    " ",
    "Spacebar"
  ];

  if (blockedKeys.includes(event.key)) {
    event.preventDefault();
  }
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function formatContractText(raw) {
  let text = raw.replace(/\r\n/g, "\n");

  text = escapeHtml(text);
  text = text.replace(/^<!-- -->$/gm, "");
  text = text.replace(/\n{3,}/g, "\n\n");
  text = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  text = text.replace(/\*(.*?)\*/g, "<em>$1</em>");

  const lines = text.split("\n");
  let html = "";
  let inUl = false;
  let inOl = false;

  function closeLists() {
    if (inUl) {
      html += "</ul>";
      inUl = false;
    }
    if (inOl) {
      html += "</ol>";
      inOl = false;
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (!line) {
      closeLists();
      continue;
    }

    if (line.startsWith("### ")) {
      closeLists();
      html += `<h3>${line.slice(4)}</h3>`;
      continue;
    }

    if (line.startsWith("## ")) {
      closeLists();
      html += `<h2>${line.slice(3)}</h2>`;
      continue;
    }

    if (line.startsWith("# ")) {
      closeLists();
      html += `<h1>${line.slice(2)}</h1>`;
      continue;
    }

    if (/^\d+\.\s+/.test(line)) {
      if (!inOl) {
        closeLists();
        html += "<ol>";
        inOl = true;
      }
      html += `<li>${line.replace(/^\d+\.\s+/, "")}</li>`;
      continue;
    }

    if (/^[-*]\s+/.test(line)) {
      if (!inUl) {
        closeLists();
        html += "<ul>";
        inUl = true;
      }
      html += `<li>${line.replace(/^[-*]\s+/, "")}</li>`;
      continue;
    }

    closeLists();
    html += `<p>${line}</p>`;
  }

  closeLists();

  return html || "<p class='error'>No contract content found.</p>";
}

async function openContract(path, title) {
  modalTitle.textContent = title;
  contractContent.innerHTML = `<p class="loading">Loading contract...</p>`;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  body.classList.add("modal-open");

  try {
    const response = await fetch(path);

    if (!response.ok) {
      throw new Error("Unable to load contract.");
    }

    const text = await response.text();
    contractContent.innerHTML = formatContractText(text);
  } catch (error) {
    contractContent.innerHTML = `<p class="error">Could not load this contract.</p>`;
  }
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  contractContent.innerHTML = "";
  body.classList.remove("modal-open");
}

contractButtons.forEach((button) => {
  button.addEventListener("click", () => {
    openContract(button.dataset.contract, button.dataset.title);
  });
});

modalClose.addEventListener("click", closeModal);

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("open")) {
    closeModal();
  }
});

if (heroVideo) {
  heroVideo.addEventListener("loadeddata", revealVideo, { once: true });
  heroVideo.addEventListener("canplay", revealVideo, { once: true });
}

window.addEventListener("load", () => {
  window.scrollTo(0, 0);
  setTimeout(revealVideo, 180);
});

enterArrow.addEventListener("click", goToPlayer);

window.addEventListener("wheel", preventIfLocked, { passive: false });
window.addEventListener("touchmove", preventIfLocked, { passive: false });
window.addEventListener("keydown", preventKeysIfLocked, { passive: false });
window.addEventListener("scroll", updateHeaderVisibility, { passive: true });

updateHeaderVisibility();