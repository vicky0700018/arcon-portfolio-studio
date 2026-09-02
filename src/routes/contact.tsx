import { createFileRoute } from "@tanstack/react-router";
import SiteLayout from "../components/site/SiteLayout";
import PageHeader from "../components/site/PageHeader";
import Contact from "../components/site/Contact";

const title = "Contact | Prospera Arcon LLP Pune Portfolio";
const description =
  "Contact Prospera Arcon LLP Pune in Kondhwa, Pune — address, phone and a demo enquiry form with browser-side validation.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Contact"
        title="Get in touch with Prospera Arcon LLP"
        description="Based in Kondhwa, Pune. Send a message through the demo form or use the direct details."
      />
      <Contact />
    </SiteLayout>
  );
}
