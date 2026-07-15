// Add a page here. The route and all visible content live in one small object.
export const pages = [
  {
    path: "/lab",
    eyebrow: "LAB / 00",
    title: "A space for experiments.",
    text: [
      "This is the page served from lab.romeo558.ru.",
      "Replace this placeholder with experiments, notes, prototypes or any other content."
    ],
    links: [{ href: "https://romeo558.ru", label: "Back to RomaOS" }]
  },
  {
    path: "/about",
    eyebrow: "ABOUT / 01",
    title: "A separate page, without turning the site into a SPA.",
    text: [
      "This page is rendered by Express. The portfolio homepage stays in public/index.html.",
      "To add another route, copy this object, change path and content, then deploy."
    ],
    links: [{ href: "/", label: "Back to RomaOS" }]
  }
];
