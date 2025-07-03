// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// Dark Mode Toggle
const themeSwitch = document.getElementById('theme-switch');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Check for saved theme preference or use system preference
if (localStorage.getItem('darkMode') === 'true' || 
    (localStorage.getItem('darkMode') === null && prefersDarkScheme.matches)) {
  document.body.classList.add('dark-mode');
  themeSwitch.checked = true;
}

themeSwitch.addEventListener('change', () => {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', themeSwitch.checked);
});

// Listen for system theme changes
prefersDarkScheme.addListener(e => {
  if (localStorage.getItem('darkMode') === null) {
    document.body.classList.toggle('dark-mode', e.matches);
    themeSwitch.checked = e.matches;
  }
});

// Smooth Scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const target = document.querySelector(targetId);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 70,
        behavior: 'smooth'
      });
    }
  });
});

// Project Data
const projects = [
  {
    title: "Whatsapp Bot Multi Device",
    description: "A Whatsapp Bot with a lot of features.",
    image: "https://files.catbox.moe/tm8dtm.jpg",
    tags: ["JavaScript", "NodeJS"],
    liveLink: "#",
    codeLink: "https://github.com/DanX1020/DANNN---Botz"
  },
  {
    title: "REST API",
    description: "A REST API with a lot of fratures free & interesting.",
    image: "https://files.catbox.moe/ph93ql.jpg",
    tags: ["NodeJS", "Express"],
    liveLink: "https://dan-xapi.vercel.app",
    codeLink: "https://github.com/DanX1020/DanXAPI"
  },
  {
    title: "Portfolio Website",
    description: "A Simple portfolio.",
    image: "https://files.catbox.moe/zinr90.jpg",
    tags: ["HTML", "CSS", "Java Script"],
    liveLink: "https://danx-portfolio.vercel.app",
    codeLink: "https://github.com/DanX1020/Simple-fortfolio"
  }
];

// Skills Data - Logo Only
const skills = [
  { icon: "fab fa-js", name: "JavaScript" },
  { icon: "fab fa-python", name: "Python" },
  { icon: "fab fa-java", name: "Java" },
  { icon: "fab fa-html5", name: "HTML5" },
  { icon: "fab fa-css3-alt", name: "CSS3" },
  { icon: "fab fa-react", name: "React" },
  { icon: "fab fa-node", name: "Node.js" },
  { icon: "fab fa-database", name: "Database" },
  { icon: "fab fa-git-alt", name: "Git" }
];

// Render Projects
function renderProjects() {
  const projectGrid = document.querySelector('.project-grid');
  
  projects.forEach(project => {
    const projectCard = document.createElement('div');
    projectCard.className = 'project-card';
    
    projectCard.innerHTML = `
      <div class="project-img">
        <img src="${project.image}" alt="${project.title}" loading="lazy">
      </div>
      <div class="project-info">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="project-tags">
          ${project.tags.map(tag => `<span>${tag}</span>`).join('')}
        </div>
        <div class="project-links">
          <a href="${project.liveLink}" target="_blank"><i class="fas fa-external-link-alt"></i> Live Demo</a>
          <a href="${project.codeLink}" target="_blank"><i class="fab fa-github"></i> View Code</a>
        </div>
      </div>
    `;
    
    projectGrid.appendChild(projectCard);
  });
}

// Render Skills Logos Only
function renderSkills() {
  const skillsGrid = document.querySelector('.skills-logo-grid');
  
  skills.forEach(skill => {
    const skillLogo = document.createElement('div');
    skillLogo.className = 'skill-logo';
    skillLogo.title = skill.name; // Show name on hover
    skillLogo.innerHTML = `<i class="${skill.icon}"></i>`;
    skillLogo.tabIndex = 0; // Make it focusable
    
    skillsGrid.appendChild(skillLogo);
  });
}

// Form Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Here you would typically send the form data to a server
    // For demo purposes, we'll just show an alert
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
  });
}

// GSAP Animations
document.addEventListener('DOMContentLoaded', () => {
  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);
  
  // Hero section animation
  gsap.from('.hero-content h1', {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power3.out"
  });
  
  gsap.from('.hero-content p', {
    opacity: 0,
    y: 50,
    duration: 1,
    delay: 0.3,
    ease: "power3.out"
  });
  
  gsap.from('.hero-content .btn', {
    opacity: 0,
    y: 50,
    duration: 1,
    delay: 0.6,
    ease: "elastic.out(1, 0.5)"
  });
  
  gsap.from('.hero-image img', {
    opacity: 0,
    scale: 0.8,
    duration: 1.5,
    delay: 0.3,
    ease: "back.out(1.7)"
  });
  
  // Continuous floating animation
  gsap.to('.hero-image img', {
    y: 20,
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });
  
  // Project cards animation
  gsap.utils.toArray('.project-card').forEach((card, i) => {
    gsap.from(card, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      delay: i * 0.1,
      scrollTrigger: {
        trigger: card,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });
  });
  
  // Skill logos animation
  gsap.utils.toArray('.skill-logo').forEach((logo, i) => {
    gsap.from(logo, {
      opacity: 0,
      scale: 0.5,
      duration: 0.8,
      delay: i * 0.1,
      scrollTrigger: {
        trigger: logo,
        start: "top 80%",
        toggleActions: "play none none none"
      },
      ease: "back.out(1.7)"
    });
  });
  
  // Section title animations
  gsap.utils.toArray('section h2').forEach(title => {
    gsap.from(title, {
      opacity: 0,
      x: -50,
      duration: 0.8,
      scrollTrigger: {
        trigger: title,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });
    
    // Create underline element
    const underline = document.createElement('div');
    underline.className = 'title-underline';
    title.appendChild(underline);
    
    // Animate underline
    gsap.from(underline, {
      scaleX: 0,
      duration: 1,
      scrollTrigger: {
        trigger: title,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });
  });
  
  // Initialize components
  renderProjects();
  renderSkills();
});