import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { ProjectCard } from "@/components/ProjectCard";
import { fetchProjects } from "@/server/projects.functions";

export const Route = createFileRoute("/")({
  loader: async () => {
    try {
      const projects = await fetchProjects();
      return { projects, projectsError: null };
    } catch (error) {
      return {
        projects: [],
        projectsError:
          error instanceof Error ? error.message : "Failed to load projects",
      };
    }
  },
  component: Portfolio,
});

function Portfolio() {
  return (
    <div className="bg-[#0a0f1e] text-gray-100 min-h-screen font-sans">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <HomeProjectsSection />
      <PortfolioHighlight />
      <ContactSection />
      <Footer />
    </div>
  );
}

/* ── Navbar ─────────────────────────────────────────────────── */
function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#portfolio", label: "Portfolio" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0f1e]/90 backdrop-blur border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <a
          href="#hero"
          className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
        >
          MR<span className="text-white">.</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm text-gray-400 hover:text-blue-400 transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Hire me button */}
        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Hire Me
        </a>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-gray-400 hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          <i className={`fas ${open ? "fa-xmark" : "fa-bars"} text-xl`} />
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[#0d1527] border-t border-white/5 px-4 py-4 space-y-3">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block text-gray-300 hover:text-blue-400 transition-colors py-1"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

/* ── Hero ───────────────────────────────────────────────────── */
function HeroSection() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16"
    >
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative text-center max-w-4xl mx-auto px-4">
        <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-4 animate-fade-in">
          <i className="fas fa-chart-line mr-2" />
          Data Analyst
        </p>
        <h1 className="text-5xl sm:text-7xl font-extrabold mb-6 leading-tight">
          Mohamed{" "}
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Ragab
          </span>
        </h1>
        <p className="text-xl sm:text-2xl text-gray-300 mb-4 font-light">
          Turning Data into{" "}
          <span className="text-blue-400 font-semibold">
            Actionable Insights
          </span>
        </p>
        <p className="text-gray-500 max-w-xl mx-auto mb-10 leading-relaxed">
          Commerce-educated, self-taught data analyst passionate about
          uncovering patterns, visualizing trends, and driving decisions through
          data.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#projects"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/20"
          >
            <i className="fas fa-folder-open" />
            View Projects
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl border border-white/10 bg-white/5 font-semibold hover:bg-white/10 transition-colors"
          >
            <i className="fas fa-envelope" />
            Contact Me
          </a>
        </div>

        {/* Social row */}
        <div className="flex items-center justify-center gap-6 mt-12">
          <a
            href="https://github.com/m7mdragab74"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-blue-400 transition-colors text-xl"
          >
            <i className="fab fa-github" />
          </a>
          <a
            href="https://www.linkedin.com/in/mohamedragab74/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-blue-400 transition-colors text-xl"
          >
            <i className="fab fa-linkedin" />
          </a>
          <a
            href="mailto:mohamedhamza642023@gmail.com"
            className="text-gray-500 hover:text-blue-400 transition-colors text-xl"
          >
            <i className="fas fa-envelope" />
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <i className="fas fa-chevron-down text-gray-600" />
        </div>
      </div>
    </section>
  );
}

/* ── About ──────────────────────────────────────────────────── */
function AboutSection() {
  const stats = [
    { value: "3+", label: "Projects Completed" },
    { value: "4+", label: "Tools Mastered" },
    { value: "1", label: "Internships" },
    { value: "100%", label: "Passion for Data" },
  ];

  return (
    <section id="about" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionLabel icon="fa-user" text="About Me" />

        <div className="grid md:grid-cols-2 gap-12 items-center mt-12">
          {/* Avatar / visual */}
          <div className="flex justify-center md:justify-start">
            <div className="relative">
              <div className="w-64 h-64 rounded-2xl bg-gradient-to-br from-blue-600/30 to-purple-600/30 border border-white/10 flex items-center justify-center">
                <i className="fas fa-database text-8xl text-blue-400/50" />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-[#0d1527] border border-white/10 rounded-xl px-4 py-2 text-sm">
                <span className="text-blue-400 font-bold">Data</span> Analyst
              </div>
              <div className="absolute -top-4 -left-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl px-4 py-2 text-xs font-semibold shadow-lg">
                Available for hire
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Mohamed Ragab
              </span>
            </h2>
            <p className="text-gray-400 leading-relaxed">
              I’m passionate about leveraging technology to solve real-world
              problems. My journey began with mobile application development
              using Flutter, where I built projects that combined creativity and
              functionality.
            </p>
            <p className="text-gray-400 leading-relaxed">
              As a Commerce student at Mansoura University, I bring a solid
              foundation in business and finance, enabling me to connect
              technical solutions with business goals effectively. Recently,
              I’ve transitioned my focus toward Data Analysis, mastering tools
              like Excel, Power BI, SQL, and Python to extract insights and
              support data-driven decision-making. This shift allows me to
              combine my business acumen with analytical and technical skills to
              uncover meaningful trends and improve performance. I’m driven by
              continuous learning, exploring new technologies, and bridging the
              gap between business, data, and technology to create impactful
              solutions.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="bg-white/5 rounded-xl p-4 border border-white/5 hover:border-blue-500/30 transition-colors"
                >
                  <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {s.value}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Skills ─────────────────────────────────────────────────── */
const skillGroups = [
  {
    category: "Programming",
    icon: "fa-code",
    color: "blue",
    skills: [
      { name: "Python", level: 85, icon: "fab fa-python" },
      { name: "SQL", level: 85, icon: "fab fa-sql" },
    ],
  },

  {
    category: "Data Analysis",
    icon: "fa-magnifying-glass-chart",
    color: "purple",
    skills: [
      { name: "Pandas", level: 88, icon: "fas fa-table" },
      { name: "NumPy", level: 80, icon: "fas fa-calculator" },
      { name: "Data Cleaning", level: 90, icon: "fas fa-broom" },
      { name: "EDA", level: 85, icon: "fas fa-chart-bar" },
    ],
  },
  {
    category: "Visualization",
    icon: "fa-chart-pie",
    color: "indigo",
    skills: [
      { name: "Matplotlib", level: 82, icon: "fas fa-chart-line" },
      { name: "Seaborn", level: 78, icon: "fas fa-wave-square" },
      { name: "Power BI", level: 70, icon: "fas fa-chart-pie" },
    ],
  },
  {
    category: "Tools",
    icon: "fa-wrench",
    color: "cyan",
    skills: [
      { name: "Git", level: 75, icon: "fab fa-git-alt" },
      { name: "GitHub", level: 80, icon: "fab fa-github" },
      { name: "Excel", level: 88, icon: "fas fa-file-excel" },
    ],
  },
];

const colorMap: Record<string, string> = {
  blue: "from-blue-500 to-blue-600",
  purple: "from-purple-500 to-purple-600",
  indigo: "from-indigo-500 to-indigo-600",
  cyan: "from-cyan-500 to-cyan-600",
};

const borderMap: Record<string, string> = {
  blue: "border-blue-500/20 hover:border-blue-500/50",
  purple: "border-purple-500/20 hover:border-purple-500/50",
  indigo: "border-indigo-500/20 hover:border-indigo-500/50",
  cyan: "border-cyan-500/20 hover:border-cyan-500/50",
};

function SkillsSection() {
  return (
    <section id="skills" className="py-24 px-4 bg-[#060b18]">
      <div className="max-w-6xl mx-auto">
        <SectionLabel icon="fa-layer-group" text="Skills & Expertise" />
        <p className="text-gray-500 text-center mt-3 mb-14">
          Tools and technologies I use to bring data to life.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillGroups.map((group) => (
            <div
              key={group.category}
              className={`bg-white/[0.03] rounded-2xl p-6 border ${borderMap[group.color]} transition-all duration-300 hover:-translate-y-1`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${colorMap[group.color]} flex items-center justify-center`}
                >
                  <i className={`fas ${group.icon} text-white text-sm`} />
                </div>
                <h3 className="font-semibold text-sm">{group.category}</h3>
              </div>

              <div className="space-y-4">
                {group.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <i className={`${skill.icon} text-xs text-gray-500`} />
                        {skill.name}
                      </div>
                      <span className="text-xs text-gray-500">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${colorMap[group.color]}`}
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Projects ───────────────────────────────────────────────── */

/* ── Portfolio Highlight ────────────────────────────────────── */
function PortfolioHighlight() {
  return (
    <section id="portfolio" className="py-24 px-4 bg-[#060b18]">
      <div className="max-w-6xl mx-auto">
        <SectionLabel icon="fa-briefcase" text="Portfolio Highlights" />
        <p className="text-gray-500 text-center mt-3 mb-14">
          Featured deliverables showcasing analytical depth and presentation.
        </p>

        <div className="flex flex-row justify-center gap-8">
          {/* PDF Portfolio */}
          <div className="bg-white/[0.03] w-1/2 max-md:w-full rounded-2xl p-8 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:-translate-y-1 group">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center">
                <i className="fas fa-file-pdf text-blue-400 text-2xl" />
              </div>
              <div>
                <h3 className="font-bold text-lg">CV (PDF)</h3>
                <p className="text-gray-500 text-sm">Data Analysis Showcase</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              A curated portfolio highlighting my key projects and technical
              expertise. To view my full CV and professional background, please
              follow the link below.
            </p>
            <div className="h-40 bg-white/[0.02] rounded-xl border border-white/5 flex items-center justify-center mb-6">
              <div className="text-center">
                <i className="fas fa-file-pdf text-4xl text-blue-400/30 mb-2 block" />
                <p className="text-xs text-gray-600">CV PDF Preview</p>
              </div>
            </div>
            <a
              href="https://drive.google.com/file/d/1zUTb_4k3s0GpL2KywuR68zyRNuGZqcgt/view?usp=sharing"
              target="_blank"
              className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 font-medium text-sm hover:opacity-90 transition-opacity"
            >
              <i className="fas fa-download" />
              Request Report
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Contact ────────────────────────────────────────────────── */
function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const socialLinks = [
    {
      icon: "fab fa-github",
      label: "GitHub",
      value: "https://github.com/m7mdragab74",
      href: "https://github.com/m7mdragab74",
    },
    {
      icon: "fab fa-linkedin",
      label: "LinkedIn",
      value: "https://www.linkedin.com/in/mohamedragab74/",
      href: "https://www.linkedin.com/in/mohamedragab74/",
    },
    {
      icon: "fas fa-envelope",
      label: "Email",
      value: "mohamedhamza642023@gmail.com",
      href: "mailto:mohamedhamza642023@gmail.com",
    },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name")?.toString() ?? "";
    const email = formData.get("email")?.toString() ?? "";
    const message = formData.get("message")?.toString() ?? "";
    const publicKey = "E9zJR5viRTspkwJ1W";

    if (!publicKey) {
      setSending(false);
      setError(
        "EmailJS public key is missing. Set VITE_EMAILJS_PUBLIC_KEY and restart the build.",
      );
      return;
    }

    fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: "service_hmqmbah",
        template_id: "template_p3w211f",
        user_id: publicKey,
        template_params: {
          from_name: name,
          reply_to: email,
          message,
        },
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Send failed");
        setSubmitted(true);
        form.reset();
      })
      .catch((err) => {
        setError("Failed to send message. Please try again later.");
        console.error("EmailJS Error:", err);
      })
      .finally(() => setSending(false));
  };

  if (submitted) {
    return (
      <section id="contact" className="py-24 px-4">
        <div className="max-w-xl mx-auto text-center">
          <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-circle-check text-green-400 text-3xl" />
          </div>
          <h3 className="text-2xl font-bold mb-3">Message Sent!</h3>
          <p className="text-gray-400 mb-8">
            Thanks for reaching out, Mohamed will get back to you shortly.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 font-medium hover:opacity-90 transition-opacity"
          >
            Send Another
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium">
            <i className="fas fa-paper-plane text-xs" /> Get in Touch
          </div>
          <p className="text-gray-500 mt-3">
            Open to data analyst roles, freelance projects, and collaborations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Info Side */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Let's Work Together</h3>
              <p className="text-gray-400 leading-relaxed">
                Whether you're looking for a data analyst to join your team or
                need help turning your data into insights, I'd love to hear from
                you.
              </p>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-blue-500/30 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                    <i className={`${s.icon} text-blue-400`} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">{s.label}</p>
                    <p className="text-sm font-medium">{s.value}</p>
                  </div>
                  <i className="fas fa-arrow-right text-gray-600 ml-auto text-xs group-hover:text-blue-400 transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Form Side */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5 bg-white/[0.03] rounded-2xl p-8 border border-white/5"
          >
            <div>
              <label
                className="block text-sm text-gray-400 mb-2"
                htmlFor="name"
              >
                Your Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-blue-500/50 transition-colors"
              />
            </div>

            <div>
              <label
                className="block text-sm text-gray-400 mb-2"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="john@company.com"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-blue-500/50 transition-colors"
              />
            </div>

            <div>
              <label
                className="block text-sm text-gray-400 mb-2"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message" // تأكد أن هذا الاسم مطابق لما في Template EmailJS
                required
                rows={5}
                placeholder="Tell me about your project or opportunity..."
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-blue-500/50 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {sending ? (
                <>
                  <i className="fas fa-spinner fa-spin" /> Sending…
                </>
              ) : (
                <>
                  <i className="fas fa-paper-plane" /> Send Message
                </>
              )}
            </button>

            {error && (
              <p className="text-sm text-red-400 mt-2 text-center">{error}</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

/* ── Footer ─────────────────────────────────────────────────── */
function HomeProjectsSection() {
  const { projects, projectsError } = Route.useLoaderData();
  const featuredProjects = projects.slice(0, 3);

  return (
    <section id="projects" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionLabel icon="fa-folder-open" text="Projects" />
        <p className="text-gray-500 text-center mt-3 mb-14">
          Real-world analyses turning raw data into meaningful stories.
        </p>

        {featuredProjects.length > 0 ? (
          <div className="grid lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] px-8 py-12 text-center">
            <p className="text-lg font-semibold text-white">
              No projects available right now
            </p>
            <p className="mt-3 text-sm text-slate-400">
              {projectsError ??
                "Add some projects in the dashboard and they will appear here."}
            </p>
          </div>
        )}

        <div className="mt-10 flex justify-center">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Explore all projects
            <i className="fas fa-arrow-right text-xs" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-8 px-4 border-t border-white/5 bg-[#060b18]">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-600">
          © {new Date().getFullYear()} Mohamed Ragab. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/m7mdragab74"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-400 transition-colors"
          >
            <i className="fab fa-github" />
          </a>
          <a
            href="https://www.linkedin.com/in/mohamedragab74/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-400 transition-colors"
          >
            <i className="fab fa-linkedin" />
          </a>
          <a
            href="mailto:mohamedhamza642023@gmail.com"
            className="text-gray-600 hover:text-blue-400 transition-colors"
          >
            <i className="fas fa-envelope" />
          </a>
        </div>
        <p className="text-xs text-gray-700">
          Built with TanStack Start · Deployed on Netlify
        </p>
      </div>
    </footer>
  );
}

/* ── Shared helper ──────────────────────────────────────────── */
function SectionLabel({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="text-center">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold mb-4">
        <i className={`fas ${icon} text-xs`} />
        {text}
      </div>
    </div>
  );
}
