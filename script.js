// Logic Script (moved from inline)
// 1. Dark Mode
const toggleButton = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Initial Check
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    htmlElement.classList.add('dark');
} else {
    htmlElement.classList.remove('dark');
}

toggleButton.addEventListener('click', () => {
    htmlElement.classList.toggle('dark');
    localStorage.theme = htmlElement.classList.contains('dark') ? 'dark' : 'light';
});

// 2. Typewriter Effect
const words = ["MERN Developer", "CS Student", "Problem Solver", "Tech Enthusiast", "Open Source Contributor", "AI Explorer", "Tech Blogger", "Community Builder"];
let i = 0;
let timer;

function typeWriter() {
    const heading = document.getElementById("typewriter");
    const word = words[i];
    const current = heading.textContent;

    if (!heading.dataset.deleting && current.length < word.length) {
        // Typing
        heading.textContent = word.substring(0, current.length + 1);
        timer = setTimeout(typeWriter, 100);
    } else if (!heading.dataset.deleting && current.length === word.length) {
        // Wait at end
        heading.dataset.deleting = "true";
        timer = setTimeout(typeWriter, 2000);
    } else if (heading.dataset.deleting && current.length > 0) {
        // Deleting
        heading.textContent = word.substring(0, current.length - 1);
        timer = setTimeout(typeWriter, 50);
    } else {
        // Next word
        heading.dataset.deleting = "";
        i = (i + 1) % words.length;
        timer = setTimeout(typeWriter, 500);
    }
}
typeWriter();

// 2.1 Skills generator (replace repeated spans with data-driven list)
const skills = ["React.js","Node.js","MongoDB","Express","JavaScript","C++","C","Tailwind CSS","Python","Linux","Data Structures","MySQL","Git & Github","Canva","Figma"];
const techList = document.getElementById('tech-list');
if (techList) {
    const baseClass = "px-4 py-2 bg-neutral-100 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-lg text-sm font-medium hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors cursor-default";
    techList.append(...skills.map(s => {
        const span = document.createElement('span');
        span.className = baseClass;
        span.textContent = s;
        return span;
    }));
}

// 3. Spotlight Effect
const container = document.body; 
// Applying listener to body to capture mouse movement even outside specific containers for smoother transitions
const cards = document.querySelectorAll('.spotlight-card');

window.addEventListener('mousemove', e => {
    for(const card of cards) {
        const rect = card.getBoundingClientRect(),
              x = e.clientX - rect.left,
              y = e.clientY - rect.top;

        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
    }
});

// 4. Scroll Reveal
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
