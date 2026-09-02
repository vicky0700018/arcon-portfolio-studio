import heroBanner from "../assets/hero-banner.jpg";
import aboutVisual from "../assets/about-visual.jpg";
import projectEcommerce from "../assets/project-ecommerce.jpg";
import projectCorporate from "../assets/project-corporate.jpg";
import projectDashboard from "../assets/project-dashboard.jpg";
import projectLanding from "../assets/project-landing.jpg";

export const initialHero = {
  badge: "Technical Portfolio • Pune",
  heading: "Building Digital Experiences With Clean Code & Creative Thinking",
  description:
    "Welcome to my digital space. This demo portfolio is a showcase of my technical skills, creative design experiments, and clean code implementation across various web applications.",
  primaryButton: "View My Work",
  secondaryButton: "Let's Connect",
  image: heroBanner,
  stats: [
    { id: 1, label: "Modern UI", value: "Design First" },
    { id: 2, label: "Responsive Design", value: "All Devices" },
    { id: 3, label: "Clean Code", value: "Maintainable" },
    { id: 4, label: "Performance Focused", value: "Fast Loads" },
  ],
};

export const initialAbout = {
  heading: "A Portfolio Built as a Living Resume",
  description:
    "This website is a concept portfolio designed to demonstrate modern web development practices, responsive UI/UX, and seamless user experiences. Built as a living resume, it serves as a testing ground for integrating new technologies, optimizing site performance, and displaying interactive components.",
  image: aboutVisual,
  highlights: [
    { id: 1, text: "Component-driven React architecture with reusable building blocks" },
    { id: 2, text: "Mobile-first responsive layouts across every section" },
    { id: 3, text: "Accessible markup, clear focus states and readable contrast" },
    { id: 4, text: "Frontend-only data layer with demo persistence" },
  ],
  stats: [
    { id: 1, value: "20+", label: "Projects" },
    { id: 2, value: "5+", label: "Years Learning & Building" },
    { id: 3, value: "100%", label: "Responsive" },
    { id: 4, value: "∞", label: "Continuous Innovation" },
  ],
};

export const initialSkills = [
  { id: 1, title: "React Development", description: "Composable interfaces built with hooks, context and clean state boundaries." },
  { id: 2, title: "Frontend Architecture", description: "Predictable folder structure, shared utilities and a documented design system." },
  { id: 3, title: "Responsive Web Design", description: "Fluid layouts and type scales that hold up from mobile to widescreen." },
  { id: 4, title: "UI/UX Implementation", description: "Turning design intent into pixel-accurate, interactive interfaces." },
  { id: 5, title: "JavaScript Development", description: "Modern ES syntax, data shaping and browser APIs without heavy dependencies." },
  { id: 6, title: "Performance Optimization", description: "Lean bundles, lazy media and render-aware component design." },
  { id: 7, title: "Component-Based Design", description: "Reusable primitives for cards, forms, sections and navigation." },
  { id: 8, title: "Interactive Web Experiences", description: "Filters, dashboards and motion that stay subtle and purposeful." },
  { id: 9, title: "Clean Code Practices", description: "Readable naming, small functions and consistent formatting throughout." },
];

export const initialTechnologies = [
  { id: 1, name: "HTML", category: "Markup", description: "Semantic structure and accessible document outlines." },
  { id: 2, name: "CSS", category: "Styling", description: "Modern layout with grid, flexbox and custom properties." },
  { id: 3, name: "JavaScript", category: "Language", description: "The core language behind every interaction on this site." },
  { id: 4, name: "React", category: "Framework", description: "Component-based UI with state-driven rendering." },
  { id: 5, name: "Vite", category: "Tooling", description: "Instant dev server and optimized production builds." },
  { id: 6, name: "Tailwind CSS", category: "Styling", description: "Utility-first styling driven by design tokens." },
  { id: 7, name: "Git", category: "Workflow", description: "Version control, branching and reviewable history." },
  { id: 8, name: "Responsive Design", category: "Practice", description: "Breakpoint strategy for desktop, tablet and mobile." },
];

export const projectCategories = ["All", "Web Apps", "E-Commerce", "Dashboard", "Corporate", "UI/UX"];

export const initialProjects = [
  {
    id: 1,
    title: "Modern E-Commerce Experience",
    category: "E-Commerce",
    description: "A responsive shopping experience focused on clean product discovery and intuitive navigation.",
    image: projectEcommerce,
    technologies: ["React", "Vite", "Tailwind CSS"],
    featured: true,
    status: "Completed",
    url: "#",
  },
  {
    id: 2,
    title: "Business Portfolio Platform",
    category: "Corporate",
    description: "A modern professional website designed around strong visual hierarchy and responsive layouts.",
    image: projectCorporate,
    technologies: ["React", "Tailwind CSS"],
    featured: true,
    status: "Completed",
    url: "#",
  },
  {
    id: 3,
    title: "Interactive Dashboard Concept",
    category: "Dashboard",
    description: "A frontend dashboard concept demonstrating structured information architecture and interactive components.",
    image: projectDashboard,
    technologies: ["React", "JavaScript", "CSS"],
    featured: false,
    status: "In Progress",
    url: "#",
  },
  {
    id: 4,
    title: "Creative Landing Page",
    category: "UI/UX",
    description: "A visually focused landing page concept built around modern responsive design.",
    image: projectLanding,
    technologies: ["HTML", "Tailwind CSS", "JavaScript"],
    featured: false,
    status: "Concept",
    url: "#",
  },
];

export const initialServices = [
  { id: 1, title: "Web Development", description: "Modern responsive web applications with clean and maintainable frontend architecture.", icon: "</>" },
  { id: 2, title: "UI/UX Implementation", description: "Converting design concepts into polished, responsive user experiences.", icon: "◎" },
  { id: 3, title: "Portfolio Development", description: "Professional digital portfolios designed to showcase skills, projects and experience.", icon: "▣" },
  { id: 4, title: "Performance Optimization", description: "Improving frontend performance, responsiveness and overall usability.", icon: "⚡" },
  { id: 5, title: "Responsive Design", description: "Layouts optimized for desktop, tablet and mobile devices.", icon: "▤" },
  { id: 6, title: "Creative Web Experiments", description: "Interactive concepts for testing new technologies and interface ideas.", icon: "✦" },
];

export const initialExperience = [
  { id: 1, year: "2026", title: "Continuous Innovation", description: "Experimenting with modern frontend technologies and interactive experiences." },
  { id: 2, year: "2025", title: "Advanced Web Projects", description: "Focused on responsive applications, reusable components and better UX." },
  { id: 3, year: "2024", title: "Frontend Development", description: "Expanded expertise in modern JavaScript and component-based development." },
];

export const initialWhyChoose = [
  { id: 1, title: "Clean Implementation", description: "Readable, structured code that another developer can pick up without a handover doc.", icon: "◆" },
  { id: 2, title: "Responsive First", description: "Every layout is designed at mobile width first, then scaled up with intent.", icon: "▣" },
  { id: 3, title: "Performance Focused", description: "Lightweight dependencies, lazy media and measured rendering decisions.", icon: "⚡" },
  { id: 4, title: "Continuous Experimentation", description: "New patterns get prototyped here before they reach client work.", icon: "✦" },
];

export const initialTestimonials = [
  { id: 1, name: "Demo Client", role: "Product Lead (Demo)", content: "An impressive demonstration of modern frontend development and thoughtful UI design.", image: "" },
  { id: 2, name: "Demo Reviewer", role: "Design Consultant (Demo)", content: "Clean typography, calm colour use and a layout that stays readable on every screen size.", image: "" },
  { id: 3, name: "Demo Partner", role: "Founder (Demo)", content: "The admin panel makes the whole portfolio feel like a real content-managed product.", image: "" },
];

export const initialContact = {
  businessName: "Prospera Arcon LLP Pune",
  ownerName: "Vikesh Kantilal Chhajed",
  address: "F 8 Clover Pinnacle Ridge, S.No. 33/2/75, Kondhwa, Pune City, Pune, Maharashtra, India - 411048",
  phone: "+91 90350 92921",
  email: "support.prosperaarconllp.com",
  socials: [
    { id: 1, label: "LinkedIn", url: "#" },
    { id: 2, label: "GitHub", url: "#" },
    { id: 3, label: "Dribbble", url: "#" },
    { id: 4, label: "X", url: "#" },
  ],
};

export const initialSettings = {
  siteTitle: "Prospera Arcon LLP Pune | Digital Portfolio",
  siteDescription:
    "A modern digital portfolio showcasing technical skills, creative web experiments, projects and responsive user experiences by Prospera Arcon LLP Pune.",
  copyright: "© 2026 Prospera Arcon LLP Pune. All Rights Reserved.",
  accentColor: "cyan",
  demoMode: true,
};

export const accentOptions = [
  { value: "cyan", label: "Cyan" },
  { value: "electric", label: "Electric Blue" },
  { value: "royal", label: "Royal Blue" },
];

export const initialData = {
  hero: initialHero,
  about: initialAbout,
  skills: initialSkills,
  technologies: initialTechnologies,
  projects: initialProjects,
  services: initialServices,
  experience: initialExperience,
  whyChoose: initialWhyChoose,
  testimonials: initialTestimonials,
  contact: initialContact,
  settings: initialSettings,
};

export const adminCredentials = { username: "admin", password: "admin123" };
