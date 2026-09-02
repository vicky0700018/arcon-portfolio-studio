import { createFileRoute } from "@tanstack/react-router";
import SiteLayout from "../components/site/SiteLayout";
import PageHeader from "../components/site/PageHeader";
import Services from "../components/site/Services";
import WhyChoose from "../components/site/WhyChoose";
import Skills from "../components/site/Skills";

const title = "Services | Prospera Arcon LLP Pune Portfolio";
const description =
  "Frontend services from Prospera Arcon LLP Pune: web development, UI/UX implementation, portfolio builds, performance optimization and responsive design.";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Services"
        title="Frontend services, delivered cleanly"
        description="Each service below is managed through the portfolio admin panel using demo data."
      />
      <Services />
      <WhyChoose />
      <Skills />
    </SiteLayout>
  );
}
