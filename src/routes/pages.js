export function registerPageRoutes(app, pages) {
  for (const page of pages) {
    app.get(page.path, (_request, response) => response.render("page", { page }));
  }
}
