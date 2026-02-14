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

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem("theme") || "light";

// Apply saved theme on page load
if (currentTheme === "dark") {
  document.body.classList.add("dark");
  updateThemeIcon(true);
}

// Toggle theme
themeToggle.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark");
  
  // Save theme preference
  localStorage.setItem("theme", isDark ? "dark" : "light");
  
  // Update icon
  updateThemeIcon(isDark);
});

// Function to update theme toggle icon
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
    navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.2)";
  } else {
    navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
  }
});

// ===== SMOOTH SCROLL FOR SAFARI =====
// Safari doesn't fully support CSS scroll-behavior, so we add JS fallback
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    
    // Skip if it's just "#" or empty
    if (href === "#" || !href) return;
    
    e.preventDefault();
    
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
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
    const sectionHeight = section.clientHeight;
    
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

// ===== ANIMATE SKILL BARS ON SCROLL =====
const skillBars = document.querySelectorAll('.skill-progress');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const width = entry.target.style.width;
      entry.target.style.width = '0%';
      
      // Animate the width
      setTimeout(() => {
        entry.target.style.width = width;
      }, 100);
      
      // Stop observing this element after animation
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

// Observe all skill bars
skillBars.forEach(bar => skillObserver.observe(bar));
