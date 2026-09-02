import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { usePortfolio } from "../../lib/portfolio-store";
import { accentOptions, projectCategories } from "../../lib/portfolio-data";
import SafeImage from "../site/SafeImage";
import {
  CheckField,
  CollectionEditor,
  FieldGrid,
  Panel,
  PanelHeader,
  TextField,
} from "./AdminUI";

const navItems = [
  { key: "overview", label: "Dashboard" },
  { key: "hero", label: "Hero" },
  { key: "about", label: "About" },
  { key: "skills", label: "Skills" },
  { key: "technologies", label: "Technologies" },
  { key: "projects", label: "Projects" },
  { key: "services", label: "Services" },
  { key: "experience", label: "Experience" },
  { key: "testimonials", label: "Testimonials" },
  { key: "contact", label: "Contact Info" },
  { key: "settings", label: "Settings" },
];

/** Editor for a small array nested inside an object section (hero stats, socials, ...). */
function NestedListEditor({ title, items, fields, blank, section, keyName, updateSection }) {
  const write = (list) => updateSection(section, { [keyName]: list });
  const nextId = () => items.reduce((max, i) => Math.max(max, Number(i.id) || 0), 0) + 1;

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-bold tracking-[0.14em] text-muted-foreground uppercase">{title}</h3>
        <button
          type="button"
          className="btn btn-outline btn-sm"
          onClick={() => write([...items, { ...blank, id: nextId() }])}
        >
          + Add
        </button>
      </div>
      <div className="grid gap-3">
        {items.map((item) => (
          <div key={item.id} className="rounded-xl border border-border p-4">
            <FieldGrid
              fields={fields}
              draft={item}
              onField={(key, value) => write(items.map((i) => (i.id === item.id ? { ...i, [key]: value } : i)))}
            />
            <button
              type="button"
              className="btn btn-danger btn-sm mt-3"
              onClick={() => write(items.filter((i) => i.id !== item.id))}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionForm({ title, description, fields, section, values, updateSection, children }) {
  return (
    <div>
      <PanelHeader title={title} description={description} />
      <Panel>
        <FieldGrid fields={fields} draft={values} onField={(key, value) => updateSection(section, { [key]: value })} />
        {children ? <div className="mt-8 grid gap-8">{children}</div> : null}
        <p className="mt-6 text-xs text-muted-foreground">
          Changes save automatically to this browser and update the public website instantly.
        </p>
      </Panel>
    </div>
  );
}

export default function AdminDashboard() {
  const store = usePortfolio();
  const { data, hydrated, isAdmin, logout, updateSection, addItem, updateItem, removeItem, moveItem, resetData } = store;
  const navigate = useNavigate();
  const [active, setActive] = useState("overview");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (hydrated && !isAdmin) navigate({ to: "/admin/login" });
  }, [hydrated, isAdmin, navigate]);

  if (!hydrated || !isAdmin) {
    return (
      <main className="grid min-h-screen place-items-center bg-surface px-4">
        <p className="text-sm text-muted-foreground">Checking your admin session…</p>
      </main>
    );
  }

  const onLogout = () => {
    logout();
    navigate({ to: "/admin/login" });
  };

  const go = (key) => {
    setActive(key);
    setMenuOpen(false);
  };

  const summary = [
    { label: "Total Projects", value: data.projects.length },
    { label: "Featured Projects", value: data.projects.filter((p) => p.featured).length },
    { label: "Services", value: data.services.length },
    { label: "Technologies", value: data.technologies.length },
    { label: "Testimonials", value: data.testimonials.length },
  ];

  const panels = {
    overview: (
      <div>
        <PanelHeader title="Dashboard overview" description="A snapshot of everything published on the portfolio." />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {summary.map((card) => (
            <div key={card.label} className="card-base p-5">
              <p className="font-mono text-3xl font-bold text-royal">{card.value}</p>
              <p className="mt-1 text-sm font-medium text-muted-foreground">{card.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <Panel>
            <h3 className="mb-4 text-sm font-bold tracking-[0.14em] text-muted-foreground uppercase">Recent projects</h3>
            <ul className="grid gap-3">
              {data.projects.slice(-4).reverse().map((project) => (
                <li key={project.id} className="flex items-center gap-3">
                  <SafeImage
                    src={project.image}
                    alt={project.title}
                    className="size-12 shrink-0 rounded-lg object-cover"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-foreground">{project.title}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {project.category} • {project.status}
                      {project.featured ? " • Featured" : ""}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel>
            <h3 className="mb-4 text-sm font-bold tracking-[0.14em] text-muted-foreground uppercase">Quick actions</h3>
            <div className="grid gap-2">
              <button type="button" className="btn btn-primary btn-sm" onClick={() => go("projects")}>
                Add Project
              </button>
              <button type="button" className="btn btn-outline btn-sm" onClick={() => go("services")}>
                Add Service
              </button>
              <button type="button" className="btn btn-outline btn-sm" onClick={() => go("technologies")}>
                Add Technology
              </button>
              <button type="button" className="btn btn-outline btn-sm" onClick={() => go("hero")}>
                Edit Hero
              </button>
            </div>
          </Panel>
        </div>
      </div>
    ),

    hero: (
      <SectionForm
        title="Hero section"
        description="Badge, headline, buttons, banner image and floating stats."
        section="hero"
        values={data.hero}
        updateSection={updateSection}
        fields={[
          { key: "badge", label: "Hero badge" },
          { key: "primaryButton", label: "Primary button text" },
          { key: "secondaryButton", label: "Secondary button text" },
          { key: "image", label: "Hero banner image URL", wide: true },
          { key: "heading", label: "Hero heading", type: "textarea" },
          { key: "description", label: "Hero description", type: "textarea" },
        ]}
      >
        <NestedListEditor
          title="Hero statistics"
          items={data.hero.stats}
          section="hero"
          keyName="stats"
          updateSection={updateSection}
          blank={{ label: "New stat", value: "Value" }}
          fields={[
            { key: "label", label: "Label" },
            { key: "value", label: "Value" },
          ]}
        />
      </SectionForm>
    ),

    about: (
      <SectionForm
        title="About section"
        description="Heading, description, visual and the supporting numbers."
        section="about"
        values={data.about}
        updateSection={updateSection}
        fields={[
          { key: "heading", label: "About heading", wide: true },
          { key: "image", label: "Profile / visual image URL", wide: true },
          { key: "description", label: "About description", type: "textarea" },
        ]}
      >
        <NestedListEditor
          title="Statistics"
          items={data.about.stats}
          section="about"
          keyName="stats"
          updateSection={updateSection}
          blank={{ value: "0", label: "New stat" }}
          fields={[
            { key: "value", label: "Value" },
            { key: "label", label: "Label" },
          ]}
        />
        <NestedListEditor
          title="Highlights"
          items={data.about.highlights}
          section="about"
          keyName="highlights"
          updateSection={updateSection}
          blank={{ text: "New highlight" }}
          fields={[{ key: "text", label: "Highlight", wide: true }]}
        />
      </SectionForm>
    ),

    skills: (
      <CollectionEditor
        title="Skills / Expertise"
        description="Cards shown in the skills grid."
        items={data.skills}
        blank={{ title: "", description: "" }}
        fields={[
          { key: "title", label: "Skill title" },
          { key: "description", label: "Description", type: "textarea" },
        ]}
        labelOf={(i) => i.title}
        metaOf={(i) => i.description}
        onAdd={(item) => addItem("skills", item)}
        onUpdate={(id, values) => updateItem("skills", id, values)}
        onRemove={(id) => removeItem("skills", id)}
        onMove={(id, dir) => moveItem("skills", id, dir)}
      />
    ),

    technologies: (
      <CollectionEditor
        title="Technologies"
        description="Name, category and a short description for each badge."
        items={data.technologies}
        blank={{ name: "", category: "", description: "" }}
        fields={[
          { key: "name", label: "Technology name" },
          { key: "category", label: "Category" },
          { key: "description", label: "Description", type: "textarea" },
        ]}
        labelOf={(i) => i.name}
        metaOf={(i) => `${i.category} — ${i.description}`}
        onAdd={(item) => addItem("technologies", item)}
        onUpdate={(id, values) => updateItem("technologies", id, values)}
        onRemove={(id) => removeItem("technologies", id)}
        onMove={(id, dir) => moveItem("technologies", id, dir)}
      />
    ),

    projects: (
      <div>
        <CollectionEditor
          title="Projects"
          description="Full CRUD for the portfolio showcase."
          items={data.projects}
          blank={{
            title: "",
            category: "Web Apps",
            description: "",
            image: "",
            technologies: [],
            featured: false,
            status: "Concept",
            url: "#",
          }}
          fields={[
            { key: "title", label: "Title" },
            { key: "category", label: "Category", type: "select", options: projectCategories.filter((c) => c !== "All") },
            { key: "image", label: "Image URL" },
            { key: "url", label: "Project URL" },
            { key: "status", label: "Status", type: "select", options: ["Completed", "In Progress", "Concept"] },
            { key: "technologies", label: "Technologies", type: "list" },
            { key: "featured", label: "Featured project", type: "check" },
            { key: "description", label: "Description", type: "textarea" },
          ]}
          labelOf={(i) => i.title}
          metaOf={(i) => `${i.category} • ${i.status}${i.featured ? " • Featured" : ""}`}
          onAdd={(item) => addItem("projects", item)}
          onUpdate={(id, values) => updateItem("projects", id, values)}
          onRemove={(id) => removeItem("projects", id)}
          onMove={(id, dir) => moveItem("projects", id, dir)}
        />

        <Panel className="mt-6 overflow-x-auto">
          <h3 className="mb-4 text-sm font-bold tracking-[0.14em] text-muted-foreground uppercase">Project table</h3>
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs tracking-[0.12em] text-muted-foreground uppercase">
                <th scope="col" className="py-2 pr-3">Image</th>
                <th scope="col" className="py-2 pr-3">Project</th>
                <th scope="col" className="py-2 pr-3">Category</th>
                <th scope="col" className="py-2 pr-3">Status</th>
                <th scope="col" className="py-2 pr-3">Featured</th>
                <th scope="col" className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.projects.map((project) => (
                <tr key={project.id} className="border-b border-border/70 last:border-0">
                  <td className="py-3 pr-3">
                    <SafeImage src={project.image} alt={project.title} className="size-10 rounded-md object-cover" />
                  </td>
                  <td className="py-3 pr-3 font-semibold text-foreground">{project.title}</td>
                  <td className="py-3 pr-3 text-muted-foreground">{project.category}</td>
                  <td className="py-3 pr-3 text-muted-foreground">{project.status}</td>
                  <td className="py-3 pr-3">{project.featured ? "Yes" : "No"}</td>
                  <td className="py-3">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        className="btn btn-outline btn-sm"
                        onClick={() => updateItem("projects", project.id, { featured: !project.featured })}
                      >
                        {project.featured ? "Unfeature" : "Feature"}
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => removeItem("projects", project.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      </div>
    ),

    services: (
      <CollectionEditor
        title="Services"
        description="Add, edit, delete and reorder the service cards."
        items={data.services}
        blank={{ title: "", description: "", icon: "✦" }}
        fields={[
          { key: "title", label: "Title" },
          { key: "icon", label: "Icon / symbol" },
          { key: "description", label: "Description", type: "textarea" },
        ]}
        labelOf={(i) => `${i.icon} ${i.title}`}
        metaOf={(i) => i.description}
        onAdd={(item) => addItem("services", item)}
        onUpdate={(id, values) => updateItem("services", id, values)}
        onRemove={(id) => removeItem("services", id)}
        onMove={(id, dir) => moveItem("services", id, dir)}
      />
    ),

    experience: (
      <CollectionEditor
        title="Experience / Journey"
        description="Timeline entries for My Digital Journey."
        items={data.experience}
        blank={{ year: "", title: "", description: "" }}
        fields={[
          { key: "year", label: "Year" },
          { key: "title", label: "Title" },
          { key: "description", label: "Description", type: "textarea" },
        ]}
        labelOf={(i) => `${i.year} — ${i.title}`}
        metaOf={(i) => i.description}
        onAdd={(item) => addItem("experience", item)}
        onUpdate={(id, values) => updateItem("experience", id, values)}
        onRemove={(id) => removeItem("experience", id)}
        onMove={(id, dir) => moveItem("experience", id, dir)}
      />
    ),

    testimonials: (
      <CollectionEditor
        title="Testimonials"
        description="Clearly labelled demo testimonials."
        items={data.testimonials}
        blank={{ name: "", role: "", content: "", image: "" }}
        fields={[
          { key: "name", label: "Client name" },
          { key: "role", label: "Role" },
          { key: "image", label: "Image URL", wide: true },
          { key: "content", label: "Testimonial", type: "textarea" },
        ]}
        labelOf={(i) => i.name}
        metaOf={(i) => `${i.role} — ${i.content}`}
        onAdd={(item) => addItem("testimonials", item)}
        onUpdate={(id, values) => updateItem("testimonials", id, values)}
        onRemove={(id) => removeItem("testimonials", id)}
        onMove={(id, dir) => moveItem("testimonials", id, dir)}
      />
    ),

    contact: (
      <SectionForm
        title="Contact information"
        description="Used by both the contact section and the footer."
        section="contact"
        values={data.contact}
        updateSection={updateSection}
        fields={[
          { key: "businessName", label: "Business name" },
          { key: "ownerName", label: "Owner name" },
          { key: "phone", label: "Phone" },
          { key: "email", label: "Email" },
          { key: "address", label: "Address", type: "textarea" },
        ]}
      >
        <NestedListEditor
          title="Social links"
          items={data.contact.socials}
          section="contact"
          keyName="socials"
          updateSection={updateSection}
          blank={{ label: "New link", url: "#" }}
          fields={[
            { key: "label", label: "Label" },
            { key: "url", label: "URL" },
          ]}
        />
      </SectionForm>
    ),

    settings: (
      <div>
        <PanelHeader title="Settings" description="Site metadata, footer text and demo behaviour." />
        <Panel>
          <div className="grid gap-4">
            <TextField
              label="Website title"
              value={data.settings.siteTitle}
              onChange={(v) => updateSection("settings", { siteTitle: v })}
            />
            <label className="block">
              <span className="field-label">Website description</span>
              <textarea
                className="field"
                rows={3}
                value={data.settings.siteDescription}
                onChange={(e) => updateSection("settings", { siteDescription: e.target.value })}
              />
            </label>
            <TextField
              label="Footer copyright"
              value={data.settings.copyright}
              onChange={(v) => updateSection("settings", { copyright: v })}
            />
            <label className="block">
              <span className="field-label">Primary accent colour</span>
              <select
                className="field"
                value={data.settings.accentColor}
                onChange={(e) => updateSection("settings", { accentColor: e.target.value })}
              >
                {accentOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
            <CheckField
              label="Demo mode banner"
              value={data.settings.demoMode}
              onChange={(v) => updateSection("settings", { demoMode: v })}
            />
            <div>
              <button type="button" className="btn btn-outline btn-sm" onClick={resetData}>
                Reset all content to original demo data
              </button>
            </div>
          </div>
        </Panel>
      </div>
    ),
  };

  return (
    <div className="min-h-screen bg-surface">
      <header className="surface-dark sticky top-0 z-40 border-b border-navy-foreground/10">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="btn btn-outline-light btn-sm lg:hidden"
              aria-expanded={menuOpen}
              aria-label="Toggle admin menu"
              onClick={() => setMenuOpen((v) => !v)}
            >
              ☰
            </button>
            <span className="text-sm font-bold tracking-tight text-navy-foreground">Prospera Arcon — Admin</span>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/" className="btn btn-outline-light btn-sm">
              View site
            </Link>
            <button type="button" className="btn btn-accent btn-sm" onClick={onLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1400px] gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[240px_1fr]">
        <aside className={`${menuOpen ? "block" : "hidden"} lg:block`}>
          <nav aria-label="Admin sections" className="card-base sticky top-20 p-3">
            <ul className="grid gap-1">
              {navItems.map((item) => (
                <li key={item.key}>
                  <button
                    type="button"
                    onClick={() => go(item.key)}
                    aria-current={active === item.key ? "page" : undefined}
                    className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                      active === item.key
                        ? "bg-royal text-primary-foreground"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={onLogout}
                  className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-destructive transition-colors hover:bg-secondary"
                >
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </aside>

        <main className="min-w-0">{panels[active]}</main>
      </div>
    </div>
  );
}
