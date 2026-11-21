/* ===== EDIT ONLY THIS DATA BLOCK to add/remove skills & projects ===== */
const SKILLS = [
  { title: "Programming", icon: "bx-code-alt", items: [
    { name: "C++", icon: "bxl-c-plus-plus", level: 85 },
    { name: "Python", icon: "bxl-python", level: 85 },
    { name: "JavaScript", icon: "bxl-javascript", level: 85 },
    { name: "SQL", icon: "bx-data", level: 80 } ] },
  { title: "Web Development", icon: "bx-world", items: [
    { name: "React", icon: "bxl-react", level: 80 },
    { name: "ReactJS", icon: "bxl-react", level: 80 },
    { name: "Angular", icon: "bxl-angular", level: 65 },
    { name: "Bootstrap", icon: "bxl-bootstrap", level: 75 } ] },
  { title: "Data, AI & Cloud", icon: "bx-brain", items: [
    { name: "NumPy", icon: "bx-bar-chart-alt-2", level: 80 },
    { name: "Pandas", icon: "bx-table", level: 80 },
    { name: "Matplotlib", icon: "bx-line-chart", level: 75 },
    { name: "AWS", icon: "bxl-aws", level: 65 },
    { name: "Google Cloud", icon: "bx-cloud", level: 65 } ] },
  { title: "Developer Tools & Core", icon: "bx-data", items: [
    { name: "MySQL", icon: "bx-data", level: 80 },
    { name: "Kubernetes", icon: "bx-layer", level: 65 },
    { name: "Docker", icon: "bxl-docker", level: 65 },
    { name: "Git & GitHub", icon: "bxl-git", level: 85 },
    { name: "DSA", icon: "bx-network-chart", level: 85 },
    { name: "OOP & OS", icon: "bx-chip", level: 80 } ] }
];

const PROJECTS = [
  { title: "Face Recognition System for Lost Persons", tags: ["AI", "Full Stack"], date: "",
    icon: "bx-face", image: "",
    summary: "AI-assisted facial recognition platform that speeds up locating missing individuals using face matching across photos and surveillance images.",
    highlights: ["Registers missing person profiles and scans incoming sightings",
      "Uses advanced face detection and recognition techniques"],
    tech: ["Python", "Streamlit", "MediaPipe", "SQLite", "OpenCV"], live: "", github: "https://github.com/gauravmani007" },
  { title: "Personal Portfolio", tags: ["Web"], date: "",
    icon: "bx-id-card", image: "",
    summary: "Responsive personal portfolio showcasing projects, skills, achievements and professional background.",
    highlights: [], tech: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "GitHub Pages"], live: "", github: "https://github.com/gauravmani007" },
  { title: "Search Chatbot", tags: ["AI", "Full Stack"], date: "",
    icon: "bx-bot", image: "",
    summary: "AI-powered search and chat platform for real-time, contextual responses using the Google Gemini API.",
    highlights: ["Secure Node.js backend with REST API communication",
      "Responsive React frontend"],
    tech: ["React.js", "Node.js", "Express.js", "Gemini API", "REST API", "Axios"], live: "", github: "https://github.com/gauravmani007" },
  { title: "AI Interview Prep Platform", tags: ["AI", "Full Stack"], date: "Dec 2025 – Jan 2026",
    icon: "bx-bot", image: "",
    summary: "GenAI career assistant that finds skill gaps from your resume and a job description, then builds a prep plan.",
    highlights: ["Analyzes resumes and job descriptions for skill gaps",
      "Generates role-specific technical and behavioral questions with personalized prep plans",
      "AI-powered ATS resume optimization for a target job description"],
    tech: ["React", "Node.js", "Express", "MongoDB", "LLM APIs", "Tailwind"], live: "", github: "" },
  { title: "Civic Reporting Platform", tags: ["AI", "Full Stack"], date: "2025",
    icon: "bx-map-pin", image: "",
    summary: "AI-powered platform where citizens report civic issues and authorities track and resolve them.",
    highlights: ["Role-based Authority Dashboard for complaints, analytics and task assignment",
      "GPS, image/video upload, AI categorization, priority scoring and smart routing",
      "Worker task management with navigation and proof upload"],
    tech: ["React", "Node.js", "Express", "MongoDB", "Google Maps API", "AI/ML"], live: "", github: "" },
  { title: "Find Recipe", tags: ["Web"], date: "",
    icon: "bx-bowl-hot", image: "food recipe.png",
    summary: "Website to find delicious recipes using a public API.",
    highlights: [], tech: ["HTML", "CSS", "JavaScript", "API"], live: "", github: "https://github.com/gauravmani007" },
  { title: "Wings Music", tags: ["Web"], date: "",
    icon: "bx-music", image: "Wings music.png",
    summary: "Music player with a dynamic, modern look.",
    highlights: [], tech: ["HTML", "CSS", "JavaScript"], live: "", github: "" }
];

const ACHIEVEMENTS = [
  { icon: "bx-trophy", value: 450, suffix: "+", label: "LeetCode problems solved" },
  { icon: "bx-certification", value: 3, suffix: "", label: "Certifications: SQL, Python, Palo Alto Cybersecurity" },
  { icon: "bx-folder-open", value: PROJECTS.length, suffix: "", label: "Projects built" },
  { icon: "bx-book-open", value: 7.3, suffix: "/10", label: "CGPA, B.Tech CSE (AI)" }
];
/* ===================================================================== */

const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

// Skills (same markup your style.js already animates)
document.getElementById("skills-root").innerHTML = SKILLS.map(c => `
  <div class="skill-category">
    <div class="skill-header"><i class='bx ${c.icon}'></i><h2 class="skills-sub-title">${esc(c.title)}</h2></div>
    <div class="skills-grid">${c.items.map(s => `
      <div class="skill-item" data-skill="${s.level}">
        <div class="skill-icon"><i class='bx ${s.icon}'></i></div>
        <div class="skill-info"><h3>${esc(s.name)}</h3>
          <div class="skill-bar"><div class="skill-progress"></div></div>
          <span class="skill-percent">0%</span></div>
      </div>`).join("")}
    </div>
  </div>`).join("");

// Projects + filter chips
const grid = document.getElementById("project-grid");
const filters = document.getElementById("project-filters");
const allTags = ["All", ...new Set(PROJECTS.flatMap(p => p.tags))];
filters.innerHTML = allTags.map((t, i) => `<button class="filter-chip${i ? "" : " active"}" data-tag="${t}">${t}</button>`).join("");

function renderProjects(tag) {
  const list = PROJECTS.map((p, i) => ({ p, i })).filter(({ p }) => tag === "All" || p.tags.includes(tag));
  grid.innerHTML = list.map(({ p, i }) => `
    <div class="project-card" data-index="${i}" tabindex="0">
      <div class="project-img-container">
        ${p.image ? `<img src="${esc(p.image)}" alt="${esc(p.title)} thumbnail" class="project-img">`
                  : `<div class="project-placeholder"><i class='bx ${p.icon}'></i></div>`}
        ${(p.live || p.github) ? `<div class="project-links">
          ${p.live ? `<a href="${esc(p.live)}" class="project-link" target="_blank" rel="noopener" aria-label="Live demo"><i class='bx bx-link-external'></i></a>` : ""}
          ${p.github ? `<a href="${esc(p.github)}" class="project-link" target="_blank" rel="noopener" aria-label="GitHub"><i class='bx bxl-github'></i></a>` : ""}
        </div>` : ""}
      </div>
      <div class="project-content">
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.summary)}</p>
        <div class="project-tech">${p.tech.map(t => `<span>${esc(t)}</span>`).join("")}</div>
        ${p.highlights.length ? `<button class="details-btn" data-index="${i}">View details</button>` : ""}
      </div>
    </div>`).join("");
}
filters.addEventListener("click", e => {
  const b = e.target.closest(".filter-chip"); if (!b) return;
  filters.querySelectorAll(".filter-chip").forEach(x => x.classList.toggle("active", x === b));
  renderProjects(b.dataset.tag);
});
renderProjects("All");

// Details modal
const modal = document.getElementById("project-modal");
const modalBody = document.getElementById("modal-body");
function openModal(i) {
  const p = PROJECTS[i];
  modalBody.innerHTML = `<h3>${esc(p.title)}</h3>${p.date ? `<p class="modal-date">${esc(p.date)}</p>` : ""}
    <p>${esc(p.summary)}</p><ul>${p.highlights.map(h => `<li>${esc(h)}</li>`).join("")}</ul>
    <div class="project-tech">${p.tech.map(t => `<span>${esc(t)}</span>`).join("")}</div>`;
  modal.classList.add("open"); modal.setAttribute("aria-hidden", "false");
}
const closeModal = () => { modal.classList.remove("open"); modal.setAttribute("aria-hidden", "true"); };
grid.addEventListener("click", e => { const b = e.target.closest(".details-btn"); if (b) openModal(+b.dataset.index); });
modal.addEventListener("click", e => { if (e.target === modal || e.target.closest(".modal-close")) closeModal(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

// Achievements with count-up on scroll
const ach = document.getElementById("achievement-grid");
ach.innerHTML = ACHIEVEMENTS.map(a => `
  <div class="ach-card"><i class='bx ${a.icon}'></i>
    <h3><span class="count" data-to="${a.value}">0</span>${esc(a.suffix)}</h3><p>${esc(a.label)}</p></div>`).join("");
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const achObs = new IntersectionObserver((entries, obs) => entries.forEach(en => {
  if (!en.isIntersecting) return;
  obs.unobserve(en.target);
  const el = en.target.querySelector(".count"), to = +el.dataset.to;
  if (reduce) { el.textContent = to; return; }
  const t0 = performance.now();
  (function tick(t) {
    const k = Math.min((t - t0) / 1200, 1);
    el.textContent = Math.round(to * k);
    if (k < 1) requestAnimationFrame(tick);
  })(t0);
}), { threshold: 0.4 });
ach.querySelectorAll(".ach-card").forEach(c => achObs.observe(c));

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Typing effect for hero roles
(function () {
  const el = document.getElementById("typed-role");
  const roles = ["Full Stack Developer", "AI/ML Enthusiast", "Problem Solver"];
  if (reduce) { let k = 0; setInterval(() => { k = (k + 1) % roles.length; el.textContent = roles[k]; }, 2500); return; }
  let r = 0, i = 0, del = false;
  (function tick() {
    const word = roles[r];
    el.textContent = word.slice(0, i);
    if (!del && i === word.length) { del = true; return setTimeout(tick, 1400); }
    if (del && i === 0) { del = false; r = (r + 1) % roles.length; }
    i += del ? -1 : 1;
    setTimeout(tick, del ? 45 : 90);
  })();
})();

// Reveal for new sections
ScrollReveal().reveal(".about-card, .ach-card", { delay: 200, origin: "bottom", distance: "40px", duration: 800, interval: 150 });
