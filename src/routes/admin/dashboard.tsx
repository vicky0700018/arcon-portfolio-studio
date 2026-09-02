import { createFileRoute } from "@tanstack/react-router";
import AdminDashboard from "../../components/admin/AdminDashboard";

const title = "Admin Dashboard | Prospera Arcon LLP Pune";
const description = "Manage hero, about, projects, services, technologies, experience and testimonials content.";

export const Route = createFileRoute("/admin/dashboard")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: AdminDashboard,
});
