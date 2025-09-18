// ========== HAMBURGER MENU ==========
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  hamburger.classList.toggle("active");
});

// ========== PROJECT MODAL ==========
const modal = document.getElementById("project-modal");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const modalImg = document.getElementById("modal-img");
const modalLink = document.getElementById("modal-link");
const closeBtn = document.querySelector(".close");

// buka modal ketika klik tombol View
document.querySelectorAll(".view-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    modalTitle.textContent = btn.dataset.title;
    modalDesc.textContent = btn.dataset.desc;
    modalImg.src = btn.dataset.img;
    modalLink.href = btn.dataset.link || "#";
    modal.classList.add("active");
  });
});

// tombol close
closeBtn.addEventListener("click", () => modal.classList.remove("active"));

// klik luar modal untuk menutup
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.remove("active");
});

// esc key untuk menutup
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("active")) {
    modal.classList.remove("active");
  }
});

// ========== ABOUT ME TABS + FADE-IN ==========
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".about-nav button");
  const contents = document.querySelectorAll(".tab-content");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      contents.forEach((c) => c.classList.remove("active"));

      btn.classList.add("active");
      const tabId = btn.getAttribute("data-tab");
      document.getElementById(tabId).classList.add("active");
    });
  });

  // Fade-in saat scroll
  const fadeElems = document.querySelectorAll(".fade-in");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  fadeElems.forEach((el) => observer.observe(el));
});

// === Futuristic Cursor Glow ===
const cursor = document.createElement("div");
cursor.classList.add("cursor-glow");
document.body.appendChild(cursor);

document.addEventListener("mousemove", (e) => {
  cursor.style.top = e.clientY + "px";
  cursor.style.left = e.clientX + "px";
  cursor.style.transform = `translate(-50%, -50%) scale(1.2)`;
  setTimeout(() => {
    cursor.style.transform = `translate(-50%, -50%) scale(1)`;
  }, 150);
});

// === Ripple Neon on Click/Tap ===
document.addEventListener("click", (e) => {
  const ripple = document.createElement("span");
  ripple.classList.add("ripple");
  ripple.style.left = e.clientX - 50 + "px";
  ripple.style.top = e.clientY - 50 + "px";
  ripple.style.width = ripple.style.height = "100px";

  document.body.appendChild(ripple);

  setTimeout(() => ripple.remove(), 800);
});
// ====== PARTICLES ======
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
const colors = ["#1e90ff", "#63b3ed", "#00f0ff", "#ffffff"];

class Particle {
  constructor(x, y, radius, speedX, speedY, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speedX = speedX;
    this.speedY = speedY;
    this.color = color;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 15;
    ctx.shadowColor = this.color;
    ctx.fill();
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // bouncing
    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

    this.draw();
  }
}

function initParticles() {
  particlesArray = [];
  for (let i = 0; i < 70; i++) {
    let radius = Math.random() * 2 + 1;
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    let speedX = (Math.random() - 0.5) * 0.6;
    let speedY = (Math.random() - 0.5) * 0.6;
    let color = colors[Math.floor(Math.random() * colors.length)];
    particlesArray.push(new Particle(x, y, radius, speedX, speedY, color));
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach((p) => p.update());
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});
