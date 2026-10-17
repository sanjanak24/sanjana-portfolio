# Sanjana Kadapatti — portfolio

A responsive personal portfolio built with HTML, CSS, and JavaScript. The page
content is maintained in `assets/js/data.js`, and the resume PDF is served from
`assets/resume.pdf`.

## Portfolio sections

- Education and technical skills
- Cisco Systems experience in software engineering and automation
- Projects in RAG-based document intelligence and event management
- Certifications, recognition, and research
- GitHub, LinkedIn, and contact links
- Resume download and in-page PDF preview

## Update the content

1. Edit `assets/js/data.js` to update the profile, skills, experience, projects,
   achievements, and links.
2. Replace `assets/resume.pdf` to publish a new resume, keeping the same path.
3. Add project screenshots under `assets/img/` and set the project's `image`
   value in `data.js`. Leave it empty to use the generated project cover.

## Run locally

Open `index.html` in a browser, or start a local server from this folder:

```bash
python -m http.server
```

Then visit http://localhost:8000.

## Deploy to GitHub Pages

Upload the contents of this folder to a GitHub repository, keeping `index.html`
at the repository root and including `.nojekyll`. In the repository's
**Settings → Pages**, select **Deploy from a branch**, choose the `main` branch
and the root folder, then save.

All site assets use relative paths so the portfolio can also be hosted under a
repository subpath.

## Files

```
index.html            page structure
assets/css/style.css  styles and animations
assets/js/data.js     portfolio content
assets/js/main.js     rendering and interaction logic
assets/resume.pdf     resume PDF
assets/img/           image assets
.nojekyll             serves files as-is on GitHub Pages
```
