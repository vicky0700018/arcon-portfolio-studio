import { createFileRoute } from "@tanstack/react-router";
import AdminLogin from "../../components/admin/AdminLogin";

const title = "Admin Portal | Prospera Arcon LLP Pune";
const description = "Demo admin login for managing the Prospera Arcon LLP Pune portfolio content.";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: AdminLogin,
});
