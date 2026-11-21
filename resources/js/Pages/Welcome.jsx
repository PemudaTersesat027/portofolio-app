import { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import {
  ArrowRight,
  BriefcaseBusiness,
  Code2,
  Globe,
  Mail,
  MapPin,
  Menu,
  Network,
  Package,
  Router,
  Server,
  ShoppingBag,
  Terminal,
  Wrench,
  X,
} from "lucide-react";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";

// ============================================================
// DATA
// Profil, statistik, skill, pengalaman, dan proyek berasal dari props Inertia.
// Kapabilitas berikut masih merupakan konten statis.
// ============================================================

const capabilities = [
  {
    title: "Software Development",
    description:
      "Full-stack web and desktop applications built with modern, maintainable architectures.",
    icon: Terminal,
  },
  {
    title: "System Architecture",
    description:
      "Reliable enterprise workflows, database modeling, and resilient API design.",
    icon: Network,
  },
  {
    title: "Networking",
    description:
      "MikroTik routing, Linux servers, Proxmox virtualization, and ISP telemetry.",
    icon: Router,
  },
  {
    title: "Digital Products",
    description:
      "Commercial-grade software tools packaged for businesses and operators.",
    icon: Package,
  },
];

const experienceIcons = {
  Code2,
  Server,
  BriefcaseBusiness,
  Wrench,
  Network,
  Router,
  Package,
};

// ============================================================
// HELPERS
// ============================================================

function formatPrice(value) {
  if (typeof value !== "number") return null;

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

function getDiscount(price, discountedPrice) {
  if (!price || !discountedPrice || discountedPrice >= price) return 0;
  return Math.round(((price - discountedPrice) / price) * 100);
}

function Badge({ children, tone = "neutral" }) {
  const tones = {
    neutral: "bg-[#E2E8F0] text-[#1E293B]",
    primary: "bg-[#D8F3E6] text-[#003825]",
    success: "bg-[#047857] text-white",
    warning: "bg-[#B45309] text-white",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

function SectionEyebrow({ children }) {
  return (
    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#006948]">
      {children}
    </span>
  );
}

function Tag({ children }) {
  return (
    <span className="rounded-sm border border-[#E2E8F0] bg-[#F8FAFC] px-2.5 py-1 text-xs text-[#475569]">
      {children}
    </span>
  );
}

// ============================================================
// PROJECT UI
// ============================================================

function ProjectBadges({ project }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {project.developmentStatus === "development" ? (
        <Badge tone="warning">In Development</Badge>
      ) : (
        <Badge tone="success">Released</Badge>
      )}

      {project.sourceType === "open-source" ? (
        <Badge tone="primary">Open Source</Badge>
      ) : (
        <Badge>Closed Source</Badge>
      )}

      {project.salesStatus === "pre-order" && (
        <Badge tone="primary">Pre-Order</Badge>
      )}

      {project.salesStatus === "available" && (
        <Badge tone="primary">Available</Badge>
      )}

      {project.salesStatus === "discontinued" && (
        <Badge>Discontinued</Badge>
      )}
    </div>
  );
}

function ProjectActions({ project, compact = false }) {
  const base =
    "inline-flex min-h-10 items-center justify-center gap-2 rounded border px-3 py-2 text-center text-sm font-semibold transition-colors";
  const secondary =
    `${base} border-[#E2E8F0] bg-white text-[#0F172A] hover:bg-[#F8FAFC]`;
  const primary =
    `${base} border-[#006948] bg-[#006948] text-white hover:bg-[#00543A]`;

  if (project.salesStatus === "discontinued") {
    return (
      <p className="rounded bg-[#F1F5F9] px-3 py-3 text-center text-sm text-[#475569]">
        This product is no longer available.
      </p>
    );
  }

  if (project.sourceType === "open-source") {
    return (
      <div className={`grid gap-2 ${compact ? "grid-cols-2" : "grid-cols-2"}`}>
        {project.liveUrl && (
          <a className={secondary} href={project.liveUrl} target="_blank" rel="noreferrer">
            <Globe size={15} />
            Live Demo
          </a>
        )}
        {project.githubUrl && (
          <a className={primary} href={project.githubUrl} target="_blank" rel="noreferrer">
            <SiGithub size={15} />
            Source Code
          </a>
        )}
      </div>
    );
  }

  if (
    project.developmentStatus === "development" &&
    project.salesStatus === "pre-order"
  ) {
    const soldOut =
      typeof project.preorderLimit === "number" &&
      (project.preorderSold || 0) >= project.preorderLimit;

    if (soldOut) {
      return (
        <button type="button" disabled className={`${base} w-full cursor-not-allowed border-[#E2E8F0] bg-[#F1F5F9] text-[#94A3B8]`}>
          Pre-Order Sold Out
        </button>
      );
    }

    return project.purchaseUrl ? (
      <a className={`${primary} w-full`} href={project.purchaseUrl}>
        <ShoppingBag size={15} />
        Pre-Order Now
      </a>
    ) : (
      <button type="button" disabled className={`${base} w-full cursor-not-allowed border-[#E2E8F0] bg-[#F1F5F9] text-[#94A3B8]`}>
        Pre-Order Unavailable
      </button>
    );
  }

  if (project.developmentStatus === "released" && project.salesStatus === "available") {
    return (
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        {project.liveUrl && (
          <a className={secondary} href={project.liveUrl} target="_blank" rel="noreferrer">
            Live Demo
          </a>
        )}
        {project.trialUrl && (
          <a className={secondary} href={project.trialUrl} target="_blank" rel="noreferrer">
            Trial
          </a>
        )}
        {project.purchaseUrl && (
          <a className={primary} href={project.purchaseUrl}>
            Buy Full Version
          </a>
        )}
      </div>
    );
  }

  // Development + not-for-sale: deliberately render no active action.
  return null;
}

function ProjectPricing({ project }) {
  if (project.sourceType !== "closed-source") return null;

  if (project.salesStatus === "pre-order") {
    const discount = getDiscount(project.price, project.preorderPrice);
    const remaining =
      typeof project.preorderLimit === "number"
        ? Math.max(0, project.preorderLimit - (project.preorderSold || 0))
        : null;

    return (
      <div className="flex flex-col gap-3 border-t border-[#E2E8F0] pt-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-baseline gap-3">
            <span className="font-display text-2xl text-[#0F172A]">
              {formatPrice(project.preorderPrice)}
            </span>
            <span className="text-sm text-[#64748B] line-through">
              {formatPrice(project.price)}
            </span>
          </div>
          {discount > 0 && <Badge tone="primary">{discount}% OFF</Badge>}
        </div>
        <div className="flex flex-wrap justify-between gap-2 text-xs text-[#475569]">
          {project.preorderDeadline && (
            <span>Deadline: {project.preorderDeadline}</span>
          )}
          {remaining !== null && (
            <span>
              {project.preorderSold || 0} / {project.preorderLimit} licenses sold
            </span>
          )}
        </div>
      </div>
    );
  }

  if (project.salesStatus === "available") {
    return (
      <div className="flex flex-wrap items-baseline justify-between gap-3 border-t border-[#E2E8F0] pt-4">
        <span className="font-display text-2xl text-[#0F172A]">
          {formatPrice(project.price)}
        </span>
        <span className="text-xs text-[#475569]">Commercial License</span>
      </div>
    );
  }

  return null;
}

function FeaturedProjectCard({ project }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-[#E2E8F0] bg-white">
      {project.image && (
        <img
          src={project.image}
          alt={`${project.title} preview`}
          className="h-52 w-full border-b border-[#E2E8F0] object-cover sm:h-56"
          loading="lazy"
        />
      )}

      <div className="flex flex-1 flex-col justify-between gap-6 p-5 sm:p-6">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs text-[#475569]">{project.category}</span>
            <span className="font-mono text-xs text-[#475569]">
              {project.version ? `v${project.version}` : null}
            </span>
          </div>

          <ProjectBadges project={project} />

          <h3 className="font-display text-2xl leading-tight text-[#0F172A]">
            {project.title}
          </h3>

          <p className="text-sm leading-6 text-[#475569]">{project.description}</p>

          <div className="flex flex-wrap gap-2 pt-1">
            {(project.tags ?? []).map((tag) => <Tag key={tag}>{tag}</Tag>)}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <ProjectPricing project={project} />
          <ProjectActions project={project} />
        </div>
      </div>
    </article>
  );
}

function CompactProjectCard({ project }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-[#E2E8F0] bg-white">
      {project.image && (
        <img
          src={project.image}
          alt={`${project.title} preview`}
          className="h-36 w-full border-b border-[#E2E8F0] object-cover"
          loading="lazy"
        />
      )}

      <div className="flex flex-1 flex-col justify-between gap-5 p-5 sm:p-6">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs text-[#475569]">{project.category}</span>
            <span className="font-mono text-xs text-[#475569]">
              {project.version ? `v${project.version}` : null}
            </span>
          </div>

          <ProjectBadges project={project} />

          <h3 className="font-display text-xl text-[#0F172A]">{project.title}</h3>
          <p className="text-sm leading-6 text-[#475569]">{project.description}</p>

          <div className="flex flex-wrap gap-1.5">
            {(project.tags ?? []).map((tag) => <Tag key={tag}>{tag}</Tag>)}
          </div>
        </div>

        <div className="border-t border-[#E2E8F0] pt-4">
          <ProjectPricing project={project} />
          <div className={project.sourceType === "closed-source" && project.salesStatus !== "not-for-sale" ? "mt-4" : ""}>
            <ProjectActions project={project} compact />
          </div>
        </div>
      </div>
    </article>
  );
}

// ============================================================
// PAGE SECTIONS
// ============================================================

function Navbar({ profile }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    ["Home", "#home"],
    ["About", "#about"],
    ["Skills", "#skills"],
    ["Experience", "#experience"],
    ["Projects", "#projects"],
    ["Contact", "#contact"],
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-[#E2E8F0] bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:h-20 sm:px-8">
        <Link href={route("login")} className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-[#006948] font-display text-base text-white">
            {profile.initials}
          </span>
          <span className="font-display text-lg text-[#0F172A]">{profile.name}</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className={`text-sm font-semibold transition-colors hover:text-[#006948] ${label === "Home" ? "text-[#006948]" : "text-[#475569]"}`}
            >
              {label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden rounded bg-[#006948] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#00543A] lg:inline-flex"
        >
          Get in Touch
        </a>

        <button
          type="button"
          className="rounded-md p-2 text-[#0F172A] hover:bg-[#F1F5F9] lg:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <nav className="border-t border-[#E2E8F0] bg-white px-5 py-4 lg:hidden" aria-label="Mobile navigation">
          <div className="flex flex-col gap-1">
            {links.map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="rounded-md px-3 py-3 text-sm font-semibold text-[#475569] hover:bg-[#F8FAFC] hover:text-[#006948]"
              >
                {label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="mt-2 rounded bg-[#006948] px-4 py-3 text-center text-sm font-semibold text-white"
            >
              Get in Touch
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}

function Hero({ profile, statistics }) {
  return (
    <section id="home" className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="flex flex-col items-start gap-5 lg:col-span-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 py-1.5">
            <MapPin size={15} className="text-[#006948]" />
            <span className="text-xs font-medium text-[#475569]">
              {profile.location} · Independent Developer & IT Enthusiast
            </span>
          </div>

          <h1 className="font-display text-4xl leading-tight tracking-tight text-[#0F172A] sm:text-5xl lg:text-[56px]">
            {profile.name}
          </h1>

          <p className="font-display text-xl text-[#006948]">
            {profile.role}
          </p>

          <p className="max-w-xl text-base leading-7 text-[#475569] sm:text-lg sm:leading-8">
            {profile.description}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded bg-[#006948] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#00543A]"
            >
              Explore Projects
              <ArrowRight size={17} />
            </a>
            <a
              href="#about"
              className="rounded border border-[#E2E8F0] bg-white px-6 py-3 text-sm font-semibold text-[#0F172A] transition hover:bg-[#F8FAFC]"
            >
              About Me
            </a>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-6 border-t border-[#E2E8F0] pt-5">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#475569] transition hover:text-[#006948]"
            >
              <SiGithub size={17} />
              GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#475569] transition hover:text-[#006948]"
            >
              <FaLinkedin size={17} />
              LinkedIn
            </a>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-3 sm:p-4">
            <img
              src={profile.heroImage}
              alt="Minimalist architectural composition representing software and systems design"
              className="h-64 w-full rounded-md object-cover sm:h-80"
            />
            <div className="flex items-center justify-between gap-3 px-1 pt-4">
              <div className="flex min-w-0 items-center gap-3">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="h-10 w-10 rounded-full border border-[#E2E8F0] object-cover"
                />
                <div className="min-w-0">
                  <p className="truncate font-semibold text-[#0F172A]">{profile.name}</p>
                  <p className="text-xs text-[#475569]">Systems & Product Builder</p>
                </div>
              </div>
              <span className="shrink-0 rounded-full bg-[#D8F3E6] px-3 py-1 text-xs font-semibold text-[#003825]">
                Available
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-4 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-5 sm:mt-16 sm:grid-cols-4 sm:gap-6 sm:p-6">
        {statistics.map((item, index) => (
          <div
            key={item.label}
            className={`flex flex-col gap-1 ${index % 2 === 1 ? "border-l border-[#E2E8F0] pl-4 sm:pl-6" : ""} ${index >= 2 ? "sm:border-l sm:border-[#E2E8F0] sm:pl-6" : ""}`}
          >
            <span
              title={String(item.value)}
              className={`min-w-0 truncate font-display text-xl tabular-nums sm:text-2xl ${index === 3 ? "text-[#006948]" : "text-[#0F172A]"}`}
            >
              {item.value}
            </span>
            <span className="text-xs leading-5 text-[#475569] sm:text-sm">{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function About({ profile }) {
  return (
    <section id="about" className="border-y border-[#E2E8F0] bg-[#F8FAFC] py-16 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12">
        <div className="flex flex-col gap-4 lg:col-span-5">
          <SectionEyebrow>About</SectionEyebrow>
          <h2 className="font-display text-3xl leading-tight text-[#0F172A] sm:text-4xl">
            Technology is more than just code.
          </h2>
          <p className="text-base leading-7 text-[#475569] sm:text-lg sm:leading-8">
            {profile.about}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
          {capabilities.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex flex-col gap-3 rounded-md border border-[#E2E8F0] bg-white p-5 sm:p-6">
                <Icon size={26} strokeWidth={1.8} className="text-[#006948]" />
                <h3 className="font-display text-lg text-[#0F172A]">{item.title}</h3>
                <p className="text-sm leading-6 text-[#475569]">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SkillsExperience({ skills, experiences }) {
  const groupedSkills = skills.reduce((groups, skill) => {
    let group = groups.find((item) => item.title === skill.category);

    if (!group) {
      group = { title: skill.category, items: [] };
      groups.push(group);
    }

    group.items.push(skill);

    return groups;
  }, []);

  return (
    <section id="skills" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
      <div className="flex flex-col gap-3">
        <SectionEyebrow>Capabilities</SectionEyebrow>
        <h2 className="font-display text-3xl text-[#0F172A] sm:text-4xl">
          Technical Stack & Experience
        </h2>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {groupedSkills.length > 0 ? (
          groupedSkills.map((group) => (
            <div key={group.title} className="flex flex-col gap-4 rounded-md border border-[#E2E8F0] bg-[#F8FAFC] p-5 sm:p-6">
              <h3 className="font-semibold text-[#0F172A]">{group.title}</h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <Tag key={skill.id}>
                    {skill.name}
                    {skill.level && (
                      <span className="ml-1 text-[10px] text-[#94A3B8]">{skill.level}</span>
                    )}
                  </Tag>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-[#94A3B8]">Belum ada skill yang ditambahkan.</p>
        )}
      </div>

      <div id="experience" className="mt-8 grid gap-4 md:grid-cols-2">
        {experiences.length > 0 ? (
          experiences.map((item) => {
            const Icon = experienceIcons[item.icon] ?? Code2;

            return (
              <div key={item.id} className="flex items-start gap-4 rounded-md border border-[#E2E8F0] bg-white p-5 sm:p-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#D8F3E6] text-[#003825]">
                  <Icon size={19} />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-semibold text-[#006948]">{item.eyebrow}</span>
                  <h3 className="font-display text-lg text-[#0F172A]">{item.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-[#475569]">{item.description}</p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-sm text-[#94A3B8]">Belum ada pengalaman yang ditambahkan.</p>
        )}
      </div>
    </section>
  );
}

function Projects({ projects }) {
  const featuredProjects = projects.slice(0, 2);
  const otherProjects = projects.slice(2);

  return (
    <section id="projects" className="border-y border-[#E2E8F0] bg-[#F8FAFC] py-16 sm:py-20">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 sm:px-8 sm:gap-10">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-2">
            <SectionEyebrow>Portfolio & Products</SectionEyebrow>
            <h2 className="font-display text-3xl leading-tight text-[#0F172A] sm:text-4xl">
              Selected Projects & Digital Products
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-[#475569] lg:text-right">
            Commercial software, enterprise systems, and open-source infrastructure tools.
          </p>
        </div>

        {projects.length === 0 ? (
          <p className="text-sm text-[#94A3B8]">Belum ada proyek yang ditambahkan.</p>
        ) : (
          <>
            <div className="grid items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
              {featuredProjects.map((project) => (
                <FeaturedProjectCard key={project.id} project={project} />
              ))}
            </div>

            {otherProjects.length > 0 && (
              <div className="grid items-stretch gap-5 md:grid-cols-2 lg:grid-cols-3">
                {otherProjects.map((project) => (
                  <CompactProjectCard key={project.id} project={project} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

function Contact({ profile }) {
  const contactItems = [
    {
      label: "Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
      icon: Mail,
    },
    {
      label: "Location",
      value: profile.location,
      href: null,
      icon: MapPin,
    },
    {
      label: "GitHub",
      value: "@erickalaziz",
      href: profile.github,
      icon: SiGithub,
    },
    {
      label: "LinkedIn",
      value: "Erick Al Aziz",
      href: profile.linkedin,
      icon: FaLinkedin,
    },
  ];

  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
      <div className="grid gap-8 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6 sm:p-10 lg:grid-cols-12 lg:items-center lg:gap-10 lg:p-12">
        <div className="flex flex-col gap-4 lg:col-span-7">
          <SectionEyebrow>Contact</SectionEyebrow>
          <h2 className="font-display text-3xl leading-tight text-[#0F172A] sm:text-4xl">
            Have an idea? Let&apos;s build it.
          </h2>
          <p className="max-w-xl text-base leading-7 text-[#475569]">
            Have a project, collaboration opportunity, or want to know more about my digital products? Feel free to contact me.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:col-span-5">
          {contactItems.map((item) => {
            const Icon = item.icon;
            const content = (
              <>
                <Icon size={19} className="shrink-0 text-[#006948]" />
                <span className="flex min-w-0 flex-col">
                  <span className="text-xs text-[#475569]">{item.label}</span>
                  <span className="truncate text-sm font-semibold text-[#0F172A]">{item.value}</span>
                </span>
              </>
            );

            return item.href ? (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={item.href.startsWith("mailto:") ? undefined : "noreferrer"}
                className="flex min-w-0 items-center gap-3 rounded-md border border-[#E2E8F0] bg-white p-4 transition-colors hover:border-[#006948]"
              >
                {content}
              </a>
            ) : (
              <div key={item.label} className="flex min-w-0 items-center gap-3 rounded-md border border-[#E2E8F0] bg-white p-4">
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Footer({ profile }) {
  return (
    <footer className="border-t border-[#E2E8F0] bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <span className="text-sm text-[#475569]">
          {profile.name} — Independent Developer & IT Enthusiast
        </span>
        <span className="text-xs text-[#475569]">
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </span>
      </div>
    </footer>
  );
}

// ============================================================
// MAIN PAGE
// ============================================================

export default function Welcome({
  profile,
  statistics = [],
  skills = [],
  experiences = [],
  projects = [],
}) {
  return (
    <>
      <Head title={`${profile.name} — Minimalist Professional Portfolio`} />

      <div
        className="min-h-screen bg-white text-[#0F172A] antialiased"
        style={{ fontFamily: '"Instrument Sans", sans-serif' }}
      >
        <Navbar profile={profile} />
        <main>
          <Hero profile={profile} statistics={statistics} />
          <About profile={profile} />
          <SkillsExperience skills={skills} experiences={experiences} />
          <Projects projects={projects} />
          <Contact profile={profile} />
        </main>
        <Footer profile={profile} />
      </div>
    </>
  );
}
