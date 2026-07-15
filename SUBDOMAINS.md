# Subdomains

`lab.romeo558.ru` is already mapped to the page at `/lab` in the project.

To create another subdomain:

1. Add its page to `src/config/pages.js`.
2. Add the hostname and page path to `src/config/subdomains.js`.
3. Attach the subdomain to this same App Platform backend application in Timeweb Cloud.
4. Create the matching DNS record in Timeweb Cloud.

Example:

```js
// pages.js
{ path: "/archive", eyebrow: "ARCHIVE", title: "Archive.", text: ["..."], links: [] }

// subdomains.js
"archive.romeo558.ru": "/archive"
```

The application renders that page only for requests to the subdomain root. The fallback path `romeo558.ru/archive` continues to work too.

## Timeweb Cloud

In **Domains and SSL**, add `lab.romeo558.ru` and select the existing App Platform application under "Attach to service". Then open the domain DNS tab and create an A record for `lab` that is attached to the same application. The panel creates and manages SSL for the domain binding.

There is no need to make a separate Node application or pay for a second deployment just for a subdomain. Use a separate App Platform application only when `lab` should have independent code, environment variables, deploys or resource limits.
