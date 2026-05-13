import React, { useEffect, useState, useRef } from 'react';
import './App.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const typewriterRef = useRef(null);
  
  // Dark mode effect
  useEffect(() => {
    const isDark = localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
        localStorage.theme = 'dark';
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.theme = 'light';
      }
      return next;
    });
  };

  // Typewriter effect
  useEffect(() => {
    const words = ["MERN Developer", "CS Student", "Problem Solver", "Tech Enthusiast", "Open Source Contributor", "AI Explorer", "Tech Blogger", "Community Builder"];
    let i = 0;
    let timer;
    
    function typeWriter() {
      const heading = typewriterRef.current;
      if (!heading) return;
      
      const word = words[i];
      const current = heading.textContent;
      
      if (heading.dataset.deleting !== "true" && current.length < word.length) {
        // Typing
        heading.textContent = word.substring(0, current.length + 1);
        timer = setTimeout(typeWriter, 100);
      } else if (heading.dataset.deleting !== "true" && current.length === word.length) {
        // Wait at end
        heading.dataset.deleting = "true";
        timer = setTimeout(typeWriter, 2000);
      } else if (heading.dataset.deleting === "true" && current.length > 0) {
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
    
    timer = setTimeout(typeWriter, 100);
    return () => clearTimeout(timer);
  }, []);

  // Spotlight effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      const cards = document.querySelectorAll('.spotlight-card');
      for(const card of cards) {
        const rect = card.getBoundingClientRect(),
              x = e.clientX - rect.left,
              y = e.clientY - rect.top;

        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll Reveal effect
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    
    return () => observer.disconnect();
  }, []);

  const skills = ["React.js","Node.js","MongoDB","Express","JavaScript","C++","C","Tailwind CSS","Python","Linux","Data Structures","MySQL","Git & Github","Canva","Figma"];

  return (
    <div className="bg-white text-neutral-900 dark:bg-dark-bg dark:text-neutral-200 transition-colors duration-300 min-h-screen antialiased selection:bg-neutral-900 selection:text-white dark:selection:bg-white dark:selection:text-black overflow-x-hidden">
        {/* Noise Texture */}
        <div className="bg-noise"></div>

        {/* Background Effects */}
        <div className="fixed inset-0 z-0 pointer-events-none">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
            {/* Ambient Light Orb */}
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-500/20 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob dark:mix-blend-lighten dark:bg-white/5"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/20 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000 dark:mix-blend-lighten dark:bg-white/5"></div>
        </div>

        {/* Main Content */}
        <main className="relative z-10 max-w-3xl mx-auto px-6 pt-32 pb-40 space-y-32">

            {/* Hero Section */}
            <section id="home" className="reveal active space-y-8 text-center sm:text-left">
                <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-10">
                    <div className="space-y-6 max-w-lg">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 text-xs font-medium text-neutral-600 dark:text-neutral-400">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            Available for opportunities
                        </div>
                        
                        <h1 className="text-5xl sm:text-6xl font-bold font-display tracking-tight leading-[1.1] min-h-[160px] sm:min-h-[200px]">
                            I'm Sameer,<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-900 to-neutral-500 dark:from-white dark:to-neutral-500" id="typewriter" ref={typewriterRef}></span><span className="cursor-blink font-light text-neutral-400 dark:text-neutral-500 animate-pulse">|</span>
                        </h1>
                        
                        <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                            I bridge the gap between complex backend logic and elegant frontend design. Specialized in building scalable MERN stack applications that solve real-world problems.
                        </p>
                        
                        <div className="flex flex-wrap gap-4 justify-center sm:justify-start pt-2">
                            <a href="#contact" className="group relative px-6 py-3 bg-neutral-900 dark:bg-white text-white dark:text-black font-medium rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95">
                                <span className="relative z-10">Connect Now</span>
                                <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                            </a>
                            <a href="https://drive.google.com/file/d/1MNlbR3zwxvSj57k5k4fIeTMd39tGlm3q/view?usp=sharing" target="_blank" rel="noreferrer" className="px-6 py-3 border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-full font-medium transition-colors">
                                View Resume
                            </a>
                        </div>
                    </div>
                    
                    {/* Creative Avatar / Logo */}
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-neutral-200 to-neutral-400 dark:from-neutral-800 dark:to-neutral-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center overflow-hidden">
                            {/* Stylized Initials */}
                            <span className="font-display text-5xl font-bold text-neutral-300 dark:text-neutral-700 select-none group-hover:scale-110 transition-transform duration-500">SG</span>
                        </div>
                        {/* Orbiting Badge */}
                        <div className="absolute -bottom-2 -right-2 bg-white dark:bg-neutral-800 text-xs font-bold px-2 py-1 rounded-md shadow-lg border border-neutral-100 dark:border-neutral-700 animate-bounce">
                            Dev
                        </div>
                    </div>
                </div>

                {/* Social Links (Minimal) */}
                <div className="flex justify-center sm:justify-start gap-6 text-neutral-500 dark:text-neutral-500">
                    <a href="https://github.com/MasterchiefSameer/" title="Github" className="hover:text-black dark:hover:text-white transition-transform hover:-translate-y-1"><i className="fab fa-github text-2xl"></i></a>
                    <a href="https://linkedin.com/in/sameergautam1996/" title="LinkedIn" target="_blank" rel="noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400 transition-transform hover:-translate-y-1"><i className="fab fa-linkedin text-2xl"></i></a>
                    <a href="mailto:sameergautam024gmail.com" title="Email" className="hover:text-red-500 transition-transform hover:-translate-y-1"><i className="fas fa-envelope text-2xl"></i></a>
                    <a href="https://codolio.com/profile/SameerG" target="_blank" rel="noreferrer" title="Coding History" className="hover:text-green-500 transition-transform hover:-translate-y-1"><i className="fas fa-laptop-code text-2xl"></i></a>
                </div>
            </section>

            {/* Static Skills Section (No Motion) */}
            <section className="reveal space-y-8 border-y border-neutral-100 dark:border-neutral-900/50 py-10">
                <h2 className="text-sm font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-500 mb-4">Technical Arsenal</h2>
                <div id="tech-list" className="flex flex-wrap gap-3">
                  {skills.map(skill => (
                    <span key={skill} className="px-4 py-2 bg-neutral-100 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-lg text-sm font-medium hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
            </section> 

            {/* Education Section (Added Back) */}
            <section id="education" className="reveal space-y-10">
                <h2 className="text-3xl font-display font-bold">Education</h2>
                <div className="grid gap-6">
                    
                    {/* University */}
                    <div className="spotlight-card rounded-xl group">
                        <div className="card-content bg-neutral-50 dark:bg-neutral-900 rounded-xl p-6 flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
                            <div className="w-20 h-20 shrink-0 bg-white p-2 rounded-full border border-neutral-200 dark:border-neutral-800 shadow-sm flex items-center justify-center">
                                <img src="/csjmu.png" alt="CSJMU Logo" className="w-full h-full object-contain rounded-full border border-neutral-200" />
                            </div>
                            <div className="flex-1 space-y-2">
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                                    <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">Chhatrapati Shahu Ji Maharaj University</h3>
                                    <span className="text-sm font-mono text-neutral-500">2022 - 2026</span>
                                </div>
                                <p className="text-neutral-600 dark:text-neutral-400 font-medium">B.Tech in Computer Science and Engineering</p>
                                <p className="text-sm text-neutral-500">Kanpur, Uttar Pradesh</p>
                            </div>
                        </div>
                    </div>

                    {/* School */}
                    <div className="spotlight-card rounded-xl group">
                        <div className="card-content bg-neutral-50 dark:bg-neutral-900 rounded-xl p-6 flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
                            <div className="w-20 h-20 shrink-0 bg-white p-2 rounded-full border border-neutral-200 dark:border-neutral-800 shadow-sm flex items-center justify-center">
                                <img src="/kvoc.jpg" alt="KV Logo" className="w-full h-full object-contain rounded-full border border-neutral-200 " />
                            </div>
                            <div className="flex-1 space-y-2">
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                                    <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">Kendriya Vidyalaya Old Cantt</h3>
                                    <span className="text-sm font-mono text-neutral-500">2021</span>
                                </div>
                                <p className="text-neutral-600 dark:text-neutral-400 font-medium">Higher Secondary (PCM)</p>
                                <p className="text-sm text-neutral-500">Prayagraj, Uttar Pradesh</p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* Projects Section (Spotlight Cards) */}
            <section id="projects" className="reveal space-y-10">
                <div className="flex items-end justify-between">
                    <h2 className="text-3xl font-display font-bold">Featured Projects</h2>
                    <span className="text-sm text-neutral-500 font-mono hidden sm:block">03 / SELECTED WORKS</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="card-container">
                    
                    {/* Card 1 */}
                    <div className="spotlight-card rounded-2xl md:col-span-2 group">
                        <div className="card-content bg-white dark:bg-neutral-900 rounded-2xl p-8 h-full flex flex-col md:flex-row gap-8 items-start">
                            <div className="flex-1 space-y-4 relative z-20">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-1">
                                        <h3 className="text-2xl font-bold font-display group-hover:text-purple-500 transition-colors">Foodie Diet</h3>
                                        <p className="text-sm font-mono text-green-500">Completed</p>
                                    </div>
                                    <div className="flex gap-3 text-neutral-400">
                                        <a href="https://github.com/MasterchiefSameer/Servd" target="_blank" rel="noreferrer" className="hover:text-black dark:hover:text-white transition-colors"><i className="fab fa-github text-xl"></i></a>
                                        <a href="https://servd-woad.vercel.app/" target="_blank" rel="noreferrer" className="hover:text-black dark:hover:text-white transition-colors"><i className="fas fa-external-link-alt text-xl"></i></a>
                                    </div>
                                </div>
                                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                                    A comprehensive dietary platform aimed at reducing food waste and promoting plant-based nutrition. Features a personalized recipe engine, pantry management, and dynamic nutrition visualization.
                                </p>
                                <div className="flex flex-wrap gap-2 pt-2">
                                    <span className="px-3 py-1 text-xs border border-neutral-200 dark:border-neutral-800 rounded-full text-neutral-500">Next.js, Gemini API, Arcjet for protection</span>
                                    <span className="px-3 py-1 text-xs border border-neutral-200 dark:border-neutral-800 rounded-full text-neutral-500">Node.js, Tailwind CSS, ShadCN</span>
                                    <span className="px-3 py-1 text-xs border border-neutral-200 dark:border-neutral-800 rounded-full text-neutral-500">NeonDB (PostgreSQL), Strapi(API), Clerk(Auth)</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="spotlight-card rounded-2xl group">
                        <div className="card-content bg-white dark:bg-neutral-900 rounded-2xl p-6 h-full flex flex-col justify-between">
                            <div className="space-y-4">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-xl font-bold font-display group-hover:text-blue-500 transition-colors">Real-Time Chat</h3>
                                    <a href="#" className="text-neutral-400 hover:text-white"><i className="fab fa-github"></i></a>
                                </div>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                                    Bi-directional communication platform using Socket.io. Supports typing indicators, live status, and secure message storage.
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-2 pt-6">
                                <span className="px-2 py-1 text-[10px] border border-neutral-200 dark:border-neutral-800 rounded text-neutral-500">Socket.io</span>
                                <span className="px-2 py-1 text-[10px] border border-neutral-200 dark:border-neutral-800 rounded text-neutral-500">MERN</span>
                            </div>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="spotlight-card rounded-2xl group">
                        <div className="card-content bg-white dark:bg-neutral-900 rounded-2xl p-6 h-full flex flex-col justify-between">
                            <div className="space-y-4">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-xl font-bold font-display group-hover:text-orange-500 transition-colors">Gemini Clone</h3>
                                    <a href="https://github.com/MasterchiefSameer/Google-Gemini-Clone" target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-white"><i className="fab fa-github"></i></a>
                                </div>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                                    AI chatbot interface replicating Google Gemini's UX. Highly responsive and optimized for mobile devices.
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-2 pt-6">
                                <span className="px-2 py-1 text-[10px] border border-neutral-200 dark:border-neutral-800 rounded text-neutral-500">Gemini API</span>
                                <span className="px-2 py-1 text-[10px] border border-neutral-200 dark:border-neutral-800 rounded text-neutral-500">React</span>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* Certifications & Achievements */}
            <section id="achievements" className="reveal space-y-10">
                <h2 className="text-3xl font-display font-bold">Certifications</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    <div className="flex items-center gap-4 p-4 border border-neutral-200 dark:border-neutral-800 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors group">
                        <div className="w-12 h-12 flex items-center justify-center bg-green-100 dark:bg-green-900/20 rounded-lg text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform">
                            <i className="fas fa-certificate text-xl"></i>
                        </div>
                        <div>
                            <h4 className="font-bold">GFG 160 Days Coding</h4>
                            <p className="text-sm text-neutral-500">GeeksforGeeks</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 border border-neutral-200 dark:border-neutral-800 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors group">
                        <div className="w-12 h-12 flex items-center justify-center bg-blue-100 dark:bg-blue-900/20 rounded-lg text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                            <i className="fas fa-shield-alt text-xl"></i>
                        </div>
                        <div>
                            <h4 className="font-bold">Cyber Security</h4>
                            <p className="text-sm text-neutral-500">C3iHub IIT Kanpur</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 border border-neutral-200 dark:border-neutral-800 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors group">
                        <div className="w-12 h-12 flex items-center justify-center bg-purple-100 dark:bg-purple-900/20 rounded-lg text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
                            <i className="fas fa-server text-xl"></i>
                        </div>
                        <div>
                            <h4 className="font-bold">Back-end Development</h4>
                            <p className="text-sm text-neutral-500">Techkriti IIT Kanpur</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 border border-neutral-200 dark:border-neutral-800 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors group">
                        <div className="w-12 h-12 flex items-center justify-center bg-yellow-100 dark:bg-yellow-900/20 rounded-lg text-yellow-600 dark:text-yellow-400 group-hover:scale-110 transition-transform">
                            <i className="fas fa-briefcase text-xl"></i>
                        </div>
                        <div>
                            <h4 className="font-bold">ESG Job Simulation</h4>
                            <p className="text-sm text-neutral-500">Tata Group (Forage)</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 border border-neutral-200 dark:border-neutral-800 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors group">
                        <div className="w-12 h-12 flex items-center justify-center bg-red-100 dark:bg-red-900/20 rounded-lg text-red-600 dark:text-red-400 group-hover:scale-110 transition-transform">
                            <i className="fas fa-brain text-xl"></i>
                        </div>
                        <div>
                            <h4 className="font-bold">OCI AI Foundations</h4>
                            <p className="text-sm text-neutral-500">Oracle University</p>
                        </div>
                    </div>

                </div>
            </section>

            {/* Volunteering */}
             <section className="reveal space-y-8">
                <h2 className="text-3xl font-display font-bold">Volunteering & Leadership</h2>
                <div className="border-l border-neutral-200 dark:border-neutral-800 ml-3 space-y-12">
                    
                    {/* T&P Cell */}
                    <div className="relative pl-12 group">
                        <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-neutral-400 rounded-full group-hover:bg-black dark:group-hover:bg-white transition-colors ring-4 ring-white dark:ring-dark-bg"></div>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                            <h4 className="text-lg font-bold">Student Coordinator</h4>
                            <span className="text-sm font-mono text-neutral-500">Oct 2025</span>
                        </div>
                        <p className="text-neutral-600 dark:text-neutral-400 font-medium">Training and Placement Cell, CSJMU Kanpur</p>
                        <p className="text-sm text-neutral-500 mt-2 max-w-lg">
                            Played a key role in organizing the Campus Job Fair 2025. Managed on-ground logistics,
                            coordinated with recruiters, and streamlined the interview process for hundreds of students.
                        </p>
                    </div>

                    {/* Digital Identity Awareness Workshop */}
                    <div className="relative pl-12 group">
                        <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-neutral-400 rounded-full group-hover:bg-black dark:group-hover:bg-white transition-colors ring-4 ring-white dark:ring-dark-bg"></div>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                            <h4 className="text-lg font-bold">Organizer Team Member</h4>
                            <span className="text-sm font-mono text-neutral-500">Aug 2025</span>
                        </div>
                        <p className="text-neutral-600 dark:text-neutral-400 font-medium">Training and Placement Cell, CSJMU Kanpur</p>
                        <p className="text-sm text-neutral-500 mt-2 max-w-lg">
                            Played a key role as a member of the organizing committee for the "Digital Identity Awarness Workshop".
                            Assisted in coordinating sessions, managing logistics, promotional outreach 
                            and ensuring a smooth experience for all participants.
                        </p>
                    </div>

                    {/* ICRAECCT */}
                    <div className="relative pl-12 group">
                        <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-neutral-400 rounded-full group-hover:bg-black dark:group-hover:bg-white transition-colors ring-4 ring-white dark:ring-dark-bg"></div>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                            <h4 className="text-lg font-bold">Student Volunteer on ICRAECCT-2025</h4>
                            <span className="text-sm font-mono text-neutral-500">April -2025</span>
                        </div>
                        <p className="text-neutral-600 dark:text-neutral-400 font-medium">International Cell, CSJMU</p>
                        <p className="text-sm text-neutral-500 mt-2 max-w-lg">
                            Served as a core volunteer for the International Conference on Recent Advances in Engineering, Computing,
                            and Communication Technologies.
                        </p>
                    </div>

                    {/* GDG */}
                    <div className="relative pl-12 group">
                        <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-neutral-400 rounded-full group-hover:bg-black dark:group-hover:bg-white transition-colors ring-4 ring-white dark:ring-dark-bg"></div>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                            <h4 className="text-lg font-bold">Organizer Team Member</h4>
                            <span className="text-sm font-mono text-neutral-500">May 2023 - june 2023</span>
                        </div>
                        <p className="text-neutral-600 dark:text-neutral-400 font-medium">GDG Kanpur & Tech Events</p>
                        <p className="text-sm text-neutral-500 mt-2 max-w-lg">
                            Active organizer for Google Developer Groups (GDG) and various college tech fests. Facilitating workshops and 
                            fostering a collaborative developer community.
                        </p>
                    </div>

                </div>
            </section>

            {/* Contact / Footer */}
            <section id="contact" className="reveal pt-20 border-t border-neutral-200 dark:border-neutral-800 text-center space-y-6">
                <h2 className="text-5xl sm:text-7xl font-display font-bold tracking-tighter hover:text-neutral-600 dark:hover:text-neutral-400 transition-colors cursor-default">
                    Let's Work<br />Together.
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 max-w-md mx-auto">
                    I'm currently looking for new opportunities to build scalable solutions.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
                    <a href="mailto:sameergautam024gmail.com" className="px-8 py-4 bg-neutral-900 dark:bg-white text-white dark:text-black font-medium rounded-full hover:scale-105 transition-transform shadow-xl shadow-neutral-500/10">
                        Send Email
                    </a>
                    <a href="https://linkedin.com/in/sameergautam1996/" target="_blank" rel="noreferrer" className="px-8 py-4 border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-full font-medium transition-colors">
                        LinkedIn Profile
                    </a>
                </div>
                
                <div className="pt-20 pb-40 text-xs text-neutral-500 flex justify-between items-center">
                    <p>&copy; 2026 Sameer Gautam.</p>
                    <p>Kanpur, India</p>
                </div>
            </section>

        </main>

        {/* Floating Dock Navigation */}
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
            <div className="dock-container flex items-center gap-1 p-2 bg-white/80 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl shadow-black/10">
                
                <a href="#home" className="p-3 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-all hover:scale-110" aria-label="Home">
                    <i className="fas fa-home text-lg"></i>
                </a>
                
                <a href="#education" className="p-3 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-all hover:scale-110" aria-label="Education">
                    <i className="fas fa-graduation-cap text-lg"></i>
                </a>

                <a href="#projects" className="p-3 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-all hover:scale-110" aria-label="Projects">
                    <i className="fas fa-layer-group text-lg"></i>
                </a>

                <a href="#achievements" className="p-3 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-all hover:scale-110" aria-label="Achievements">
                    <i className="fas fa-certificate text-lg"></i>
                </a>
                <div className="w-px h-6 bg-neutral-300 dark:bg-neutral-700 mx-2"></div>

                <a href="https://github.com/MasterchiefSameer" title="GitHub" target="_blank" rel="noreferrer" className="p-3 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-all hover:scale-110" aria-label="GitHub">
                    <i className="fab fa-github text-lg"></i>
                </a>

                <a href="https://linktr.ee/sameergautam024" title="Linktree" target="_blank" rel="noreferrer" className="p-3 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-green-600 dark:hover:text-green-500 transition-all hover:scale-110" aria-label="Linktree">
                    <i className="fas fa-link text-lg"></i>
                </a>
                {/* line between theme toggle and github */}
                <div className="w-px h-6 bg-neutral-300 dark:bg-neutral-700 mx-2"></div>

                <button id="theme-toggle" onClick={toggleDarkMode} className="p-3 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-all hover:scale-110">
                    <i className="fas fa-moon dark:hidden"></i>
                    <i className="fas fa-sun hidden dark:block"></i>
                </button>

            </div>
        </div>
    </div>
  );
}

export default App;
