# RomaOS Node

Express wrapper for the RomaOS portfolio. The existing homepage is in `public/`.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Add a page

Edit `src/config/pages.js` and add an object to `pages`:

```js
{
  path: "/notes",
  eyebrow: "NOTES / 02",
  title: "Notes.",
  text: ["Page content goes here."],
  links: [{ href: "/", label: "Back to RomaOS" }]
}
```

The generic view is `src/views/page.ejs`. Make a separate EJS view and route only when a page needs a different layout.

## Timeweb Cloud

Create an App Platform backend application, choose Express and Node.js 22, then use `npm start`. Set `PORT` through the panel if necessary. The health-check path is `/health`.
