import { createFileRoute } from "@tanstack/react-router";
import SiteLayout from "../components/site/SiteLayout";
import About from "../components/site/About";
import Skills from "../components/site/Skills";
import Technologies from "../components/site/Technologies";
import Experience from "../components/site/Experience";
import WhyChoose from "../components/site/WhyChoose";
import Testimonials from "../components/site/Testimonials";
import PageHeader from "../components/site/PageHeader";

const title = "About & Skills | Prospera Arcon LLP Pune Portfolio";
const description =
  "Learn about the Prospera Arcon LLP Pune portfolio: frontend skills, technology stack, digital journey timeline and demo client feedback.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="About"
        title="A portfolio built as a living resume"
        description="Skills, technologies and the journey behind this demo portfolio for Prospera Arcon LLP Pune."
      />
      <About />
      <Skills />
      <Technologies />
      <Experience />
      <WhyChoose />
      <Testimonials />
    </SiteLayout>
  );
}
