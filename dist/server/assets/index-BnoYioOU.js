import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { P as ProjectCard } from "./ProjectCard-DiBXfB-8.js";
import emailjs from "@emailjs/browser";
import { R as Route } from "./router-C2G_46km.js";
import "lucide-react";
import "./badge-BPHIUsEo.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "../server.js";
import "node:async_hooks";
import "h3-v2";
import "@tanstack/router-core";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core/ssr/server";
import "@tanstack/react-router/ssr/server";
function Portfolio() {
  return /* @__PURE__ */ jsxs("div", { className: "bg-[#0a0f1e] text-gray-100 min-h-screen font-sans", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx(HeroSection, {}),
    /* @__PURE__ */ jsx(AboutSection, {}),
    /* @__PURE__ */ jsx(SkillsSection, {}),
    /* @__PURE__ */ jsx(HomeProjectsSection, {}),
    /* @__PURE__ */ jsx(PortfolioHighlight, {}),
    /* @__PURE__ */ jsx(ContactSection, {}),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [{
    href: "#about",
    label: "About"
  }, {
    href: "#skills",
    label: "Skills"
  }, {
    href: "#projects",
    label: "Projects"
  }, {
    href: "#portfolio",
    label: "Portfolio"
  }, {
    href: "#contact",
    label: "Contact"
  }];
  return /* @__PURE__ */ jsxs("nav", { className: "fixed top-0 left-0 right-0 z-50 bg-[#0a0f1e]/90 backdrop-blur border-b border-white/5", children: [
    /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16", children: [
      /* @__PURE__ */ jsxs("a", { href: "#hero", className: "text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent", children: [
        "MR",
        /* @__PURE__ */ jsx("span", { className: "text-white", children: "." })
      ] }),
      /* @__PURE__ */ jsx("ul", { className: "hidden md:flex items-center gap-8", children: links.map((l) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: l.href, className: "text-sm text-gray-400 hover:text-blue-400 transition-colors", children: l.label }) }, l.href)) }),
      /* @__PURE__ */ jsx("a", { href: "#contact", className: "hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-sm font-medium hover:opacity-90 transition-opacity", children: "Hire Me" }),
      /* @__PURE__ */ jsx("button", { onClick: () => setOpen(!open), className: "md:hidden text-gray-400 hover:text-white transition-colors", "aria-label": "Toggle menu", children: /* @__PURE__ */ jsx("i", { className: `fas ${open ? "fa-xmark" : "fa-bars"} text-xl` }) })
    ] }),
    open && /* @__PURE__ */ jsx("div", { className: "md:hidden bg-[#0d1527] border-t border-white/5 px-4 py-4 space-y-3", children: links.map((l) => /* @__PURE__ */ jsx("a", { href: l.href, onClick: () => setOpen(false), className: "block text-gray-300 hover:text-blue-400 transition-colors py-1", children: l.label }, l.href)) })
  ] });
}
function HeroSection() {
  return /* @__PURE__ */ jsxs("section", { id: "hero", className: "min-h-screen flex items-center justify-center relative overflow-hidden pt-16", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" }),
    /* @__PURE__ */ jsxs("div", { className: "relative text-center max-w-4xl mx-auto px-4", children: [
      /* @__PURE__ */ jsxs("p", { className: "text-blue-400 text-sm font-semibold uppercase tracking-widest mb-4 animate-fade-in", children: [
        /* @__PURE__ */ jsx("i", { className: "fas fa-chart-line mr-2" }),
        "Data Analyst"
      ] }),
      /* @__PURE__ */ jsxs("h1", { className: "text-5xl sm:text-7xl font-extrabold mb-6 leading-tight", children: [
        "Mohamed",
        " ",
        /* @__PURE__ */ jsx("span", { className: "bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent", children: "Ragab" })
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "text-xl sm:text-2xl text-gray-300 mb-4 font-light", children: [
        "Turning Data into",
        " ",
        /* @__PURE__ */ jsx("span", { className: "text-blue-400 font-semibold", children: "Actionable Insights" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-500 max-w-xl mx-auto mb-10 leading-relaxed", children: "Commerce-educated, self-taught data analyst passionate about uncovering patterns, visualizing trends, and driving decisions through data." }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [
        /* @__PURE__ */ jsxs("a", { href: "#projects", className: "inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/20", children: [
          /* @__PURE__ */ jsx("i", { className: "fas fa-folder-open" }),
          "View Projects"
        ] }),
        /* @__PURE__ */ jsxs("a", { href: "#contact", className: "inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl border border-white/10 bg-white/5 font-semibold hover:bg-white/10 transition-colors", children: [
          /* @__PURE__ */ jsx("i", { className: "fas fa-envelope" }),
          "Contact Me"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-6 mt-12", children: [
        /* @__PURE__ */ jsx("a", { href: "https://github.com/MohamedRagab", target: "_blank", rel: "noopener noreferrer", className: "text-gray-500 hover:text-blue-400 transition-colors text-xl", children: /* @__PURE__ */ jsx("i", { className: "fab fa-github" }) }),
        /* @__PURE__ */ jsx("a", { href: "https://linkedin.com/in/MohamedRagab", target: "_blank", rel: "noopener noreferrer", className: "text-gray-500 hover:text-blue-400 transition-colors text-xl", children: /* @__PURE__ */ jsx("i", { className: "fab fa-linkedin" }) }),
        /* @__PURE__ */ jsx("a", { href: "mailto:mohamed@example.com", className: "text-gray-500 hover:text-blue-400 transition-colors text-xl", children: /* @__PURE__ */ jsx("i", { className: "fas fa-envelope" }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce", children: /* @__PURE__ */ jsx("i", { className: "fas fa-chevron-down text-gray-600" }) })
    ] })
  ] });
}
function AboutSection() {
  const stats = [{
    value: "3+",
    label: "Projects Completed"
  }, {
    value: "4+",
    label: "Tools Mastered"
  }, {
    value: "1",
    label: "Internships"
  }, {
    value: "100%",
    label: "Passion for Data"
  }];
  return /* @__PURE__ */ jsx("section", { id: "about", className: "py-24 px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto", children: [
    /* @__PURE__ */ jsx(SectionLabel, { icon: "fa-user", text: "About Me" }),
    /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-12 items-center mt-12", children: [
      /* @__PURE__ */ jsx("div", { className: "flex justify-center md:justify-start", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx("div", { className: "w-64 h-64 rounded-2xl bg-gradient-to-br from-blue-600/30 to-purple-600/30 border border-white/10 flex items-center justify-center", children: /* @__PURE__ */ jsx("i", { className: "fas fa-database text-8xl text-blue-400/50" }) }),
        /* @__PURE__ */ jsxs("div", { className: "absolute -bottom-4 -right-4 bg-[#0d1527] border border-white/10 rounded-xl px-4 py-2 text-sm", children: [
          /* @__PURE__ */ jsx("span", { className: "text-blue-400 font-bold", children: "Data" }),
          " Analyst"
        ] }),
        /* @__PURE__ */ jsx("div", { className: "absolute -top-4 -left-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl px-4 py-2 text-xs font-semibold shadow-lg", children: "Available for hire" })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-3xl sm:text-4xl font-bold", children: [
          "Hi, I'm",
          " ",
          /* @__PURE__ */ jsx("span", { className: "bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent", children: "Mohamed Ragab" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 leading-relaxed", children: "I’m passionate about leveraging technology to solve real-world problems. My journey began with mobile application development using Flutter, where I built projects that combined creativity and functionality." }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 leading-relaxed", children: "As a Commerce student at Mansoura University, I bring a solid foundation in business and finance, enabling me to connect technical solutions with business goals effectively. Recently, I’ve transitioned my focus toward Data Analysis, mastering tools like Excel, Power BI, SQL, and Python to extract insights and support data-driven decision-making. This shift allows me to combine my business acumen with analytical and technical skills to uncover meaningful trends and improve performance. I’m driven by continuous learning, exploring new technologies, and bridging the gap between business, data, and technology to create impactful solutions." }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-4 pt-4", children: stats.map((s) => /* @__PURE__ */ jsxs("div", { className: "bg-white/5 rounded-xl p-4 border border-white/5 hover:border-blue-500/30 transition-colors", children: [
          /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent", children: s.value }),
          /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500 mt-1", children: s.label })
        ] }, s.label)) })
      ] })
    ] })
  ] }) });
}
const skillGroups = [{
  category: "Programming",
  icon: "fa-code",
  color: "blue",
  skills: [{
    name: "Python",
    level: 85,
    icon: "fab fa-python"
  }, {
    name: "SQL",
    level: 85,
    icon: "fab fa-sql"
  }]
}, {
  category: "Data Analysis",
  icon: "fa-magnifying-glass-chart",
  color: "purple",
  skills: [{
    name: "Pandas",
    level: 88,
    icon: "fas fa-table"
  }, {
    name: "NumPy",
    level: 80,
    icon: "fas fa-calculator"
  }, {
    name: "Data Cleaning",
    level: 90,
    icon: "fas fa-broom"
  }, {
    name: "EDA",
    level: 85,
    icon: "fas fa-chart-bar"
  }]
}, {
  category: "Visualization",
  icon: "fa-chart-pie",
  color: "indigo",
  skills: [{
    name: "Matplotlib",
    level: 82,
    icon: "fas fa-chart-line"
  }, {
    name: "Seaborn",
    level: 78,
    icon: "fas fa-wave-square"
  }, {
    name: "Power BI",
    level: 70,
    icon: "fas fa-chart-pie"
  }]
}, {
  category: "Tools",
  icon: "fa-wrench",
  color: "cyan",
  skills: [{
    name: "Git",
    level: 75,
    icon: "fab fa-git-alt"
  }, {
    name: "GitHub",
    level: 80,
    icon: "fab fa-github"
  }, {
    name: "Excel",
    level: 88,
    icon: "fas fa-file-excel"
  }]
}];
const colorMap = {
  blue: "from-blue-500 to-blue-600",
  purple: "from-purple-500 to-purple-600",
  indigo: "from-indigo-500 to-indigo-600",
  cyan: "from-cyan-500 to-cyan-600"
};
const borderMap = {
  blue: "border-blue-500/20 hover:border-blue-500/50",
  purple: "border-purple-500/20 hover:border-purple-500/50",
  indigo: "border-indigo-500/20 hover:border-indigo-500/50",
  cyan: "border-cyan-500/20 hover:border-cyan-500/50"
};
function SkillsSection() {
  return /* @__PURE__ */ jsx("section", { id: "skills", className: "py-24 px-4 bg-[#060b18]", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto", children: [
    /* @__PURE__ */ jsx(SectionLabel, { icon: "fa-layer-group", text: "Skills & Expertise" }),
    /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-center mt-3 mb-14", children: "Tools and technologies I use to bring data to life." }),
    /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-6", children: skillGroups.map((group) => /* @__PURE__ */ jsxs("div", { className: `bg-white/[0.03] rounded-2xl p-6 border ${borderMap[group.color]} transition-all duration-300 hover:-translate-y-1`, children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
        /* @__PURE__ */ jsx("div", { className: `w-10 h-10 rounded-xl bg-gradient-to-br ${colorMap[group.color]} flex items-center justify-center`, children: /* @__PURE__ */ jsx("i", { className: `fas ${group.icon} text-white text-sm` }) }),
        /* @__PURE__ */ jsx("h3", { className: "font-semibold text-sm", children: group.category })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-4", children: group.skills.map((skill) => /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-1.5", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm text-gray-300", children: [
            /* @__PURE__ */ jsx("i", { className: `${skill.icon} text-xs text-gray-500` }),
            skill.name
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "text-xs text-gray-500", children: [
            skill.level,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "h-1.5 bg-white/5 rounded-full overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: `h-full rounded-full bg-gradient-to-r ${colorMap[group.color]}`, style: {
          width: `${skill.level}%`
        } }) })
      ] }, skill.name)) })
    ] }, group.category)) })
  ] }) });
}
function PortfolioHighlight() {
  return /* @__PURE__ */ jsx("section", { id: "portfolio", className: "py-24 px-4 bg-[#060b18]", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto", children: [
    /* @__PURE__ */ jsx(SectionLabel, { icon: "fa-briefcase", text: "Portfolio Highlights" }),
    /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-center mt-3 mb-14", children: "Featured deliverables showcasing analytical depth and presentation." }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-row justify-center gap-8", children: /* @__PURE__ */ jsxs("div", { className: "bg-white/[0.03] w-1/2 rounded-2xl p-8 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:-translate-y-1 group", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-6", children: [
        /* @__PURE__ */ jsx("div", { className: "w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center", children: /* @__PURE__ */ jsx("i", { className: "fas fa-file-pdf text-blue-400 text-2xl" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold text-lg", children: "CV (PDF)" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-sm", children: "Data Analysis Showcase" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm leading-relaxed mb-6", children: "A curated portfolio highlighting my key projects and technical expertise. To view my full CV and professional background, please follow the link below." }),
      /* @__PURE__ */ jsx("div", { className: "h-40 bg-white/[0.02] rounded-xl border border-white/5 flex items-center justify-center mb-6", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx("i", { className: "fas fa-file-pdf text-4xl text-blue-400/30 mb-2 block" }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-600", children: "CV PDF Preview" })
      ] }) }),
      /* @__PURE__ */ jsxs("a", { href: "#contact", className: "inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 font-medium text-sm hover:opacity-90 transition-opacity", children: [
        /* @__PURE__ */ jsx("i", { className: "fas fa-download" }),
        "Request Report"
      ] })
    ] }) })
  ] }) });
}
function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const socialLinks = [{
    icon: "fab fa-github",
    label: "GitHub",
    value: "https://github.com/m7mdragab74",
    href: "https://github.com/m7mdragab74"
  }, {
    icon: "fab fa-linkedin",
    label: "LinkedIn",
    value: "https://www.linkedin.com/in/mohamedragab74/",
    href: "https://www.linkedin.com/in/mohamedragab74/"
  }, {
    icon: "fas fa-envelope",
    label: "Email",
    value: "mohamedhamza642023@gmail.com",
    href: "mailto:mohamedhamza642023@gmail.com"
  }];
  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    emailjs.sendForm("service_hmqmbah", "template_p3w211f", e.currentTarget, "E9zJR5viRTspkwJ1W").then(() => {
      setSubmitted(true);
      e.currentTarget.reset();
    }).catch((err) => {
      setError("Failed to send message. Please try again later.");
      console.error("EmailJS Error:", err);
    }).finally(() => setSending(false));
  };
  if (submitted) {
    return /* @__PURE__ */ jsx("section", { id: "contact", className: "py-24 px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-xl mx-auto text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6", children: /* @__PURE__ */ jsx("i", { className: "fas fa-circle-check text-green-400 text-3xl" }) }),
      /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold mb-3", children: "Message Sent!" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-8", children: "Thanks for reaching out, Mohamed will get back to you shortly." }),
      /* @__PURE__ */ jsx("button", { onClick: () => setSubmitted(false), className: "px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 font-medium hover:opacity-90 transition-opacity", children: "Send Another" })
    ] }) });
  }
  return /* @__PURE__ */ jsx("section", { id: "contact", className: "py-24 px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-14", children: [
      /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium", children: [
        /* @__PURE__ */ jsx("i", { className: "fas fa-paper-plane text-xs" }),
        " Get in Touch"
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-500 mt-3", children: "Open to data analyst roles, freelance projects, and collaborations." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-12 items-start", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold mb-4", children: "Let's Work Together" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-400 leading-relaxed", children: "Whether you're looking for a data analyst to join your team or need help turning your data into insights, I'd love to hear from you." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-4", children: socialLinks.map((s) => /* @__PURE__ */ jsxs("a", { href: s.href, target: s.href.startsWith("http") ? "_blank" : void 0, rel: "noopener noreferrer", className: "flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-blue-500/30 transition-colors group", children: [
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/30 transition-colors", children: /* @__PURE__ */ jsx("i", { className: `${s.icon} text-blue-400` }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: s.label }),
            /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: s.value })
          ] }),
          /* @__PURE__ */ jsx("i", { className: "fas fa-arrow-right text-gray-600 ml-auto text-xs group-hover:text-blue-400 transition-colors" })
        ] }, s.label)) })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-5 bg-white/[0.03] rounded-2xl p-8 border border-white/5", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm text-gray-400 mb-2", htmlFor: "name", children: "Your Name" }),
          /* @__PURE__ */ jsx("input", { id: "name", name: "name", type: "text", required: true, placeholder: "John Doe", className: "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-blue-500/50 transition-colors" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm text-gray-400 mb-2", htmlFor: "email", children: "Email Address" }),
          /* @__PURE__ */ jsx("input", { id: "email", name: "email", type: "email", required: true, placeholder: "john@company.com", className: "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-blue-500/50 transition-colors" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm text-gray-400 mb-2", htmlFor: "message", children: "Message" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              id: "message",
              name: "message",
              required: true,
              rows: 5,
              placeholder: "Tell me about your project or opportunity...",
              className: "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-blue-500/50 transition-colors resize-none"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("button", { type: "submit", disabled: sending, className: "w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2", children: sending ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("i", { className: "fas fa-spinner fa-spin" }),
          " Sending…"
        ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("i", { className: "fas fa-paper-plane" }),
          " Send Message"
        ] }) }),
        error && /* @__PURE__ */ jsx("p", { className: "text-sm text-red-400 mt-2 text-center", children: error })
      ] })
    ] })
  ] }) });
}
function HomeProjectsSection() {
  const {
    projects,
    projectsError
  } = Route.useLoaderData();
  const featuredProjects = projects.slice(0, 3);
  return /* @__PURE__ */ jsx("section", { id: "projects", className: "py-24 px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto", children: [
    /* @__PURE__ */ jsx(SectionLabel, { icon: "fa-folder-open", text: "Projects" }),
    /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-center mt-3 mb-14", children: "Real-world analyses turning raw data into meaningful stories." }),
    featuredProjects.length > 0 ? /* @__PURE__ */ jsx("div", { className: "grid lg:grid-cols-3 gap-8", children: featuredProjects.map((project) => /* @__PURE__ */ jsx(ProjectCard, { project }, project.id)) }) : /* @__PURE__ */ jsxs("div", { className: "rounded-3xl border border-white/10 bg-white/[0.03] px-8 py-12 text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "text-lg font-semibold text-white", children: "No projects available right now" }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm text-slate-400", children: projectsError ?? "Add some projects in the dashboard and they will appear here." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-10 flex justify-center", children: /* @__PURE__ */ jsxs(Link, { to: "/projects/projects", className: "inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10", children: [
      "Explore all projects",
      /* @__PURE__ */ jsx("i", { className: "fas fa-arrow-right text-xs" })
    ] }) })
  ] }) });
}
function Footer() {
  return /* @__PURE__ */ jsx("footer", { className: "py-8 px-4 border-t border-white/5 bg-[#060b18]", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4", children: [
    /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " Mohamed Ragab. All rights reserved."
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6", children: [
      /* @__PURE__ */ jsx("a", { href: "https://github.com/m7mdragab74", target: "_blank", rel: "noopener noreferrer", className: "text-gray-600 hover:text-blue-400 transition-colors", children: /* @__PURE__ */ jsx("i", { className: "fab fa-github" }) }),
      /* @__PURE__ */ jsx("a", { href: "https://www.linkedin.com/in/mohamedragab74/", target: "_blank", rel: "noopener noreferrer", className: "text-gray-600 hover:text-blue-400 transition-colors", children: /* @__PURE__ */ jsx("i", { className: "fab fa-linkedin" }) }),
      /* @__PURE__ */ jsx("a", { href: "mailto:mohamedhamza642023@gmail.com", className: "text-gray-600 hover:text-blue-400 transition-colors", children: /* @__PURE__ */ jsx("i", { className: "fas fa-envelope" }) })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-700", children: "Built with TanStack Start · Deployed on Netlify" })
  ] }) });
}
function SectionLabel({
  icon,
  text
}) {
  return /* @__PURE__ */ jsx("div", { className: "text-center", children: /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold mb-4", children: [
    /* @__PURE__ */ jsx("i", { className: `fas ${icon} text-xs` }),
    text
  ] }) });
}
export {
  Portfolio as component
};
