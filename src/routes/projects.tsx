import { createFileRoute } from "@tanstack/react-router";
import SiteLayout from "../components/site/SiteLayout";
import PageHeader from "../components/site/PageHeader";
import Projects from "../components/site/Projects";
import Technologies from "../components/site/Technologies";

const title = "Projects & Portfolio | Prospera Arcon LLP Pune";
const description =
  "Browse demo projects from Prospera Arcon LLP Pune: e-commerce, corporate portfolio, dashboard and landing page concepts with category filtering.";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Projects"
        title="Work, concepts and experiments"
        description="Filter by category to explore each project card, its stack and current status."
      />
      <Projects />
      <Technologies />
    </SiteLayout>
  );
}
