import "dotenv/config";
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { pages } from "./src/config/pages.js";
import { subdomainPages } from "./src/config/subdomains.js";
import { registerPageRoutes } from "./src/routes/pages.js";

const rootDirectory = path.dirname(fileURLToPath(import.meta.url));
const publicDirectory = path.join(rootDirectory, "public");
const app = express();
const port = Number(process.env.PORT || 3000);

app.disable("x-powered-by");
app.set("view engine", "ejs");
app.set("views", path.join(rootDirectory, "src/views"));

app.use((request, response, next) => {
  const route = subdomainPages[request.hostname.toLowerCase()];
  const page = pages.find(item => item.path === route);

  if (request.path === "/" && page) return response.render("page", { page });
  return next();
});

app.get("/health", (_request, response) => response.type("text").send("ok"));
app.get("/", (_request, response) => response.sendFile(path.join(publicDirectory, "index.html")));
app.use(express.static(publicDirectory, { index: false, maxAge: process.env.NODE_ENV === "production" ? "1h" : 0 }));

registerPageRoutes(app, pages);

app.use((_request, response) => response.status(404).render("page", {
  page: {
    eyebrow: "404 / NOT FOUND",
    title: "Page not found.",
    text: ["This route is not in src/config/pages.js."],
    links: [{ href: "/", label: "Back to home" }]
  }
}));

app.listen(port, "0.0.0.0", () => {
  console.log(`RomaOS is running on http://0.0.0.0:${port}`);
});
