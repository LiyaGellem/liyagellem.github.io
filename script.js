// ===== ANIMATED PARTICLE BACKGROUND =====
const canvas = document.getElementById('background-canvas');
const ctx = canvas.getContext('2d');

// Set canvas size
function setCanvasSize() {
  canvas.width = window.innerWidth;
  canvas.height = document.body.scrollHeight;
}

setCanvasSize();
window.addEventListener('resize', setCanvasSize);

// Particle class with neon green theme
class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = Math.random() * 0.5 - 0.25;
    this.speedY = Math.random() * 0.5 - 0.25;
    this.opacity = Math.random() * 0.3 + 0.1;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Wrap around screen
    if (this.x > canvas.width) this.x = 0;
    if (this.x < 0) this.x = canvas.width;
    if (this.y > canvas.height) this.y = 0;
    if (this.y < 0) this.y = canvas.height;
  }

  draw() {
    ctx.fillStyle = `rgba(0, 255, 136, ${this.opacity})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Create particles
const particlesArray = [];
const numberOfParticles = 100;

function initParticles() {
  for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push(new Particle());
  }
}

// Connect particles with lines
function connectParticles() {
  for (let i = 0; i < particlesArray.length; i++) {
    for (let j = i + 1; j < particlesArray.length; j++) {
      const dx = particlesArray[i].x - particlesArray[j].x;
      const dy = particlesArray[i].y - particlesArray[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 150) {
        ctx.strokeStyle = `rgba(0, 255, 136, ${0.15 - distance / 1000})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
        ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
        ctx.stroke();
      }
    }
  }
}

// Animation loop
function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
  }

  connectParticles();
  requestAnimationFrame(animateParticles);
}

// Initialize and start animation
initParticles();
animateParticles();

// Update canvas size on scroll
let resizeTimeout;
window.addEventListener('scroll', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    setCanvasSize();
  }, 100);
});

// ===== SCROLL REVEAL ANIMATION =====
const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  { threshold: 0.2 }
);
reveals.forEach((section) => observer.observe(section));

// ===== MOBILE MENU =====
const toggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navLinksItems = document.querySelectorAll(".nav-links a");

// Toggle mobile menu
toggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Close mobile menu when clicking on a link
navLinksItems.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!toggle.contains(e.target) && !navLinks.contains(e.target)) {
    navLinks.classList.remove("active");
  }
});

// ===== DARK MODE WITH PERSISTENCE =====
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = themeToggle.querySelector("i");

// Load saved theme or default to dark
let currentTheme = localStorage.getItem("theme") || "dark";
document.body.classList.remove("dark", "light");
document.body.classList.add(currentTheme);
updateThemeIcon(currentTheme === "dark");

// Toggle theme on click
themeToggle.addEventListener("click", () => {
  const isDark = document.body.classList.contains("dark");

  if (isDark) {
    document.body.classList.remove("dark");
    document.body.classList.add("light");
    localStorage.setItem("theme", "light");
  } else {
    document.body.classList.remove("light");
    document.body.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }

  updateThemeIcon(!isDark);
});

// Update theme icon
function updateThemeIcon(isDark) {
  if (isDark) {
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
  } else {
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
  }
}

// ===== NAVBAR BACKGROUND ON SCROLL =====
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.style.boxShadow = "0 4px 30px rgba(0, 255, 136, 0.2)";
  } else {
    navbar.style.boxShadow = "0 2px 20px rgba(0, 255, 136, 0.1)";
  }
});

// ===== SMOOTH SCROLL FOR SAFARI =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href === "#" || !href) return;

    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// ===== ACTIVE NAV LINK HIGHLIGHT =====
const sections = document.querySelectorAll("section, header");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (window.scrollY >= sectionTop - 100) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// ===== ANIMATE MODERN SKILL BARS ON SCROLL =====
const skillBarsModern = document.querySelectorAll('.skill-bar-modern');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      const fill = bar.querySelector('.skill-bar-fill');
      const targetWidth = bar.getAttribute('data-width');

      // Reset width
      fill.style.width = '0%';

      // Animate to target width
      setTimeout(() => {
        fill.style.width = targetWidth + '%';
      }, 100);

      // Stop observing this bar
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

// Observe all skill bars
skillBarsModern.forEach(bar => skillObserver.observe(bar));

