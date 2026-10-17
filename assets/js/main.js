/* ==========================================================================
   Portfolio — behaviour & animation
   Content comes from data.js (window.PORTFOLIO). Nothing to edit here
   unless you want to change how things move.
   ========================================================================== */
(() => {
  "use strict";

  const D = PORTFOLIO; // defined in data.js
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const esc = (s = "") => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const lerp = (a, b, t) => a + (b - a) * t;

  /* ---------- Icons ---------- */
  const ICON = {
    github: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.4-5.27 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z"/></svg>',
    twitter: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.4l-5.8-7.58-6.63 7.58H.48l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93Zm-1.29 19.5h2.04L6.48 3.24H4.3l13.31 17.41Z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    youtube: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4L15.8 12l-6.2 3.6Z"/></svg>',
    medium: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><ellipse cx="6.8" cy="12" rx="6.8" ry="6.9"/><ellipse cx="17.6" cy="12" rx="3.4" ry="6.5"/><ellipse cx="22.6" cy="12" rx="1.4" ry="5.8"/></svg>',
    external: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>',
    trophy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4zM7 6H4v1a3 3 0 0 0 3 3M17 6h3v1a3 3 0 0 1-3 3"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'
  };

  // Devicon if given, otherwise a lettered badge (for things like RAG, n8n)
  const skillIcon = s => s.icon
    ? `<i class="${esc(s.icon)}"></i>`
    : `<span class="lbadge" aria-hidden="true">${esc(s.name.replace(/[^A-Za-z0-9]/g, " ").trim().split(/\s+/).map(w => w[0]).join("").slice(0, 3) || s.name.slice(0, 2))}</span>`;

  /* ======================================================================
     1. Render content from data.js
     ====================================================================== */
  function render() {
    const first = D.name.split(" ")[0];
    document.title = `${D.name} · Portfolio`;
    $("#heroName").textContent = D.name;
    $("#heroFirst").textContent = first;
    $("#heroTagline").textContent = D.tagline;
    $("#heroAvail").textContent = D.availability;
    $("#heroLoc").textContent = D.location;
    $("#navMark").textContent = D.shortName;
    $("#orbitCore").textContent = D.shortName;
    $("#footName").textContent = D.name;
    $("#year").textContent = new Date().getFullYear();
    ["#heroResume", "#resumeDownload"].forEach(s => $(s).setAttribute("href", D.resume));
    if (!D.girl || D.girl.enabled === false) $(".hero").classList.add("no-girl");

    // hero stats
    $("#heroStats").innerHTML = D.stats.map(s =>
      `<div class="dash-stat"><b><span data-count="${s.value}">0</span>${esc(s.suffix)}</b><span>${esc(s.label)}</span></div>`
    ).join("");

    // marquee of every skill (duplicated for a seamless loop)
    const all = Object.values(D.skills).flat();
    const items = all.map(s => `<span class="marquee__item">${skillIcon(s)}${esc(s.name)}</span>`).join("");
    $("#marquee").innerHTML = items + items;

    // education
    $("#eduTimeline").insertAdjacentHTML("beforeend", D.education.map((e, i) => `
      <article class="t-item reveal" style="--d:${i * 120}">
        <div class="t-card spot">
          <div class="t-card__top"><h3>${esc(e.degree)}</h3><span class="t-card__period">${esc(e.period)}</span></div>
          <p class="t-card__school">${esc(e.school)}</p>
          ${e.score ? `<span class="t-card__score">${esc(e.score)}</span>` : ""}
          ${e.details && e.details.length ? `<ul>${e.details.map(d => `<li>${esc(d)}</li>`).join("")}</ul>` : ""}
        </div>
      </article>`).join(""));

    // experience
    $("#expList").insertAdjacentHTML("beforeend", D.experience.map(x => `
      <article class="exp-item reveal">
        <div class="t-card exp-card spot">
          <div class="t-card__top"><h3>${esc(x.role)}</h3><span class="t-card__period">${esc(x.period)}${x.duration ? ` · ${esc(x.duration)}` : ""}</span></div>
          <div class="exp-card__brand">${x.logo ? `<span class="exp-card__logo"><img src="${esc(x.logo)}" alt="${esc(x.company)} logo" loading="lazy"></span>` : ""}<p class="exp-card__company">${esc(x.company)}</p></div>
          ${x.location ? `<p class="exp-card__meta">${esc(x.location)}</p>` : ""}
          <ul>${x.points.map(p => `<li>${esc(p)}</li>`).join("")}</ul>
          ${x.awards && x.awards.length ? `<div class="exp-awards"><p class="exp-awards__head">${ICON.trophy}Awards &amp; recognition</p>${x.awards.map(a => `
            <a class="exp-award" ${a.image ? `href="${esc(a.image)}" target="_blank" rel="noopener" title="View certificate"` : ""}>
              ${a.image ? `<img class="exp-award__thumb" src="${esc(a.image)}" alt="${esc(a.title)} recognition certificate" loading="lazy">` : ""}
              <span class="exp-award__text"><b>${esc(a.title)}</b><span>${esc(a.detail)}</span><small>${esc(a.date)}${a.by ? ` · by ${esc(a.by)}` : ""}</small></span>
            </a>`).join("")}</div>` : ""}
          <ul class="chips">${(x.tech || []).map(t => `<li>${esc(t)}</li>`).join("")}</ul>
        </div>
      </article>`).join(""));

    // orbit planets: spread a dozen skill icons over three rings
    const planets = [...all.filter(s => s.icon), ...all.filter(s => !s.icon)].slice(0, 12);
    const rings = [$(".orbit__ring.r1"), $(".orbit__ring.r2"), $(".orbit__ring.r3")];
    const perRing = [3, 4, 5];
    let p = 0;
    rings.forEach((ring, ri) => {
      for (let k = 0; k < perRing[ri] && p < planets.length; k++, p++) {
        const a = (k / perRing[ri]) * Math.PI * 2 + ri;
        const el = document.createElement("span");
        el.className = "orbit__planet";
        el.title = planets[p].name;
        el.innerHTML = skillIcon(planets[p]);
        el.style.left = `${50 + 50 * Math.cos(a)}%`;
        el.style.top = `${50 + 50 * Math.sin(a)}%`;
        ring.appendChild(el);
      }
    });

    renderSkillTabs();
    renderProjects();

    // coding profiles
    const C = 2 * Math.PI * 39; // ring circumference (r = 39)
    const pg = $("#profileGrid");
    if (D.codingProfiles.length % 3 !== 0 && D.codingProfiles.length % 2 === 0) pg.classList.add("profiles--two");
    pg.innerHTML = D.codingProfiles.map((c, i) => {
      const tag = c.url ? "a" : "div";
      const attrs = c.url ? `href="${esc(c.url)}" target="_blank" rel="noopener"` : "";
      return `
      <${tag} class="profile reveal ${c.url ? "" : "profile--static"}" style="--c:${esc(c.color)};--d:${i * 90}" ${attrs}>
        <div class="ring">
          <svg viewBox="0 0 92 92"><circle class="track" cx="46" cy="46" r="39"/><circle class="meter" cx="46" cy="46" r="39" style="stroke-dasharray:${C};stroke-dashoffset:${C}" data-progress="${c.progress}" data-c="${C}"/></svg>
          <span class="ring__label">${esc(c.platform)}</span>
        </div>
        <div class="profile__info">
          <h3>${esc(c.platform)}</h3>
          ${c.username ? `<p class="profile__user">@${esc(c.username)}</p>` : ""}
          ${c.stat != null ? `<div class="profile__stat"><span data-count="${c.stat}">0</span>${esc(c.suffix || "")}<small>${esc(c.statLabel)}</small></div>` : ""}
          ${c.extra ? `<p class="profile__extra">${esc(c.extra)}</p>` : ""}
        </div>
        ${c.url ? `<span class="profile__arrow">${ICON.arrow}</span>` : ""}
      </${tag}>`;
    }).join("");
    // ring label shows initials so it fits
    $$(".ring__label").forEach(l => {
      const t = l.textContent.trim();
      l.textContent = t.length > 6 ? t.replace(/[^A-Z]/g, "") || t.slice(0, 3) : t;
    });

    // achievements
    const ach = D.achievements || [];
    if (!ach.length) $("#achievements").remove();
    else $("#achGrid").innerHTML = ach.map((a, i) => `
      <article class="ach reveal" style="--d:${(i % 3) * 110}">
        <span class="ach__glow" aria-hidden="true"></span>
        <div class="ach__badge">${esc(a.highlight)}</div>
        <h3>${esc(a.title)}</h3>
        <p>${esc(a.detail)}</p>
      </article>`).join("");

    // resume date
    $("#resumeDate").textContent = new Date(document.lastModified).toLocaleDateString(undefined, { month: "long", year: "numeric" });

    // contact
    const mail = $("#contactMail");
    if (mail) mail.remove(); // email address is not displayed on the page
    const socials = { ...D.socials, mail: `mailto:${D.email}` };
    $("#socials").innerHTML = Object.entries(socials)
      .filter(([k, v]) => v && ICON[k])
      .map(([k, v]) => `<a class="social magnetic" href="${esc(v)}" ${k === "mail" ? "" : 'target="_blank" rel="noopener"'} aria-label="${k}">${ICON[k]}</a>`)
      .join("");
  }

  /* ---------- Skills with animated tabs ---------- */
  function renderSkillTabs() {
    const cats = Object.keys(D.skills);
    const tabs = $("#skillTabs");
    tabs.innerHTML = `<span class="tabs__pill"></span>` + cats.map((c, i) =>
      `<button class="tab" role="tab" aria-selected="${i === 0}" data-cat="${esc(c)}">${esc(c)}</button>`).join("");

    const pill = $(".tabs__pill", tabs);
    const movePill = btn => {
      pill.style.left = btn.offsetLeft + "px";
      pill.style.top = btn.offsetTop + "px";
      pill.style.width = btn.offsetWidth + "px";
      pill.style.height = btn.offsetHeight + "px";
    };
    const show = (cat, animateBars) => {
      $("#skillGrid").innerHTML = D.skills[cat].map((s, i) => `
        <div class="skill" style="--i:${i}">
          <div class="skill__head">${skillIcon(s)}<strong>${esc(s.name)}</strong><span class="skill__pct" data-to="${s.level}">0%</span></div>
          <div class="bar"><span data-w="${s.level}"></span></div>
        </div>`).join("");
      if (animateBars) fillBars();
    };
    tabs.addEventListener("click", e => {
      const btn = e.target.closest(".tab");
      if (!btn) return;
      $$(".tab", tabs).forEach(t => t.setAttribute("aria-selected", t === btn));
      movePill(btn);
      show(btn.dataset.cat, true);
    });
    // arrow-key navigation between tabs
    tabs.addEventListener("keydown", e => {
      if (!["ArrowLeft", "ArrowRight"].includes(e.key)) return;
      const list = $$(".tab", tabs);
      const i = list.indexOf(document.activeElement);
      const next = list[(i + (e.key === "ArrowRight" ? 1 : -1) + list.length) % list.length];
      next.focus(); next.click();
    });
    show(cats[0], false);
    requestAnimationFrame(() => movePill($(".tab", tabs)));
    window.addEventListener("resize", () => movePill($('.tab[aria-selected="true"]', tabs)));
  }

  let skillsSeen = false;
  function fillBars() {
    if (!skillsSeen) return;
    requestAnimationFrame(() => {
      $$("#skillGrid .bar span").forEach(b => (b.style.width = b.dataset.w + "%"));
      $$("#skillGrid .skill__pct").forEach((el, i) => countUp(el, +el.dataset.to, 1400, "%", i * 70 + 200));
    });
  }

  /* ---------- Projects with filter + FLIP ---------- */
  const COVER_GRADS = [
    "linear-gradient(135deg,#6CF0D2,#8C7BFF)",
    "linear-gradient(135deg,#8C7BFF,#FF8FA3)",
    "linear-gradient(135deg,#FF8FA3,#FFC48C)",
    "linear-gradient(135deg,#3B8BFF,#6CF0D2)",
    "linear-gradient(135deg,#B57BFF,#3B8BFF)",
    "linear-gradient(135deg,#6CF0D2,#C9F27B)"
  ];
  function renderProjects() {
    const cats = ["All", ...new Set(D.projects.map(p => p.category))];
    const count = c => c === "All" ? D.projects.length : D.projects.filter(p => p.category === c).length;
    $("#filters").innerHTML = cats.map((c, i) =>
      `<button class="filter magnetic" aria-pressed="${i === 0}" data-f="${esc(c)}">${esc(c)}<sup>${count(c)}</sup></button>`).join("");

    $("#projectGrid").innerHTML = D.projects.map((p, i) => {
      const initials = p.title.split(/\s+/).map(w => w[0]).join("").slice(0, 2).toUpperCase();
      const media = p.image
        ? `<img src="${esc(p.image)}" alt="Screenshot of ${esc(p.title)}" loading="lazy" />`
        : `<div class="cover" style="background:${COVER_GRADS[i % COVER_GRADS.length]}"><span>${esc(initials)}</span></div>`;
      return `
      <article class="project reveal ${p.featured ? "featured" : ""}" data-cat="${esc(p.category)}" style="--d:${(i % 3) * 110}">
        <div class="project__card tilt">
          <div class="project__glare"></div>
          <div class="project__media">${media}<span class="project__tag">${esc(p.category)}</span></div>
          <div class="project__body">
            <h3>${esc(p.title)}</h3>
            <p>${esc(p.description)}</p>
            <ul class="chips">${p.tech.map(t => `<li>${esc(t)}</li>`).join("")}</ul>
            <div class="project__links">
              ${p.live ? `<a class="icon-link" href="${esc(p.live)}" target="_blank" rel="noopener">${ICON.external}Live demo</a>` : ""}
              ${p.code ? `<a class="icon-link" href="${esc(p.code)}" target="_blank" rel="noopener">${ICON.github}Code</a>` : ""}
            </div>
          </div>
        </div>
      </article>`;
    }).join("");

    $("#filters").addEventListener("click", e => {
      const btn = e.target.closest(".filter");
      if (!btn) return;
      $$(".filter").forEach(f => f.setAttribute("aria-pressed", f === btn));
      const f = btn.dataset.f;
      const cards = $$(".project");

      // FLIP: record first positions
      const first = new Map(cards.map(c => [c, c.getBoundingClientRect()]));
      cards.forEach(c => {
        const show = f === "All" || c.dataset.cat === f;
        c.classList.toggle("hidden", !show);
        if (show) c.classList.add("in");
      });
      if (reduceMotion) return;
      cards.forEach(c => {
        if (c.classList.contains("hidden")) return;
        const a = first.get(c), b = c.getBoundingClientRect();
        if (a.width === 0) { // was hidden: pop in
          c.animate([{ opacity: 0, transform: "scale(.85) translateY(30px)" }, { opacity: 1, transform: "none" }],
            { duration: 600, easing: "cubic-bezier(.22,1,.36,1)" });
        } else {
          const dx = a.left - b.left, dy = a.top - b.top, sx = a.width / b.width, sy = a.height / b.height;
          if (dx || dy || sx !== 1 || sy !== 1) {
            c.animate([{ transformOrigin: "top left", transform: `translate(${dx}px,${dy}px) scale(${sx},${sy})` },
                       { transformOrigin: "top left", transform: "none" }],
              { duration: 650, easing: "cubic-bezier(.22,1,.36,1)" });
          }
        }
      });
    });
  }

  /* ======================================================================
     2. Hero particle name
     The name is drawn off-screen, sampled into dots, and every dot springs
     to its home. Move the pointer through it to scatter the letters.
     ====================================================================== */
  function heroParticles() {
    const canvas = $("#heroCanvas");
    const ctx = canvas.getContext("2d");
    const hero = $(".hero");
    let W, H, dpr, particles = [], stars = [];
    const mouse = { x: -9999, y: -9999, active: false };
    let running = true;

    function build() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = hero.clientWidth; H = hero.clientHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const mobile = W < 900;
      // Text box: the free space not taken by the character or the panel
      const girl = $("#girl"), panel = $(".hero__panel");
      const pad = parseFloat(getComputedStyle(hero).paddingLeft) || 24;
      const hasGirl = girl && girl.offsetParent !== null;
      let area;
      if (mobile) {
        area = { left: 16, right: W - 16, top: 76, bottom: hasGirl ? girl.offsetTop - 4 : panel.offsetTop - 16 };
      } else {
        area = { left: pad, right: hasGirl ? girl.offsetLeft - 24 : W - pad, top: 96, bottom: panel.offsetTop - 18 };
      }
      if (area.bottom - area.top < 60) area.bottom = area.top + 60;
      const maxW = area.right - area.left, maxH = area.bottom - area.top;

      const off = document.createElement("canvas");
      const o = off.getContext("2d");
      off.width = W; off.height = H;

      // pick one line or two, whichever lets the name be bigger
      const fit = lines => {
        let size = 260;
        o.font = `800 ${size}px Syne, sans-serif`;
        const w = Math.max(...lines.map(l => o.measureText(l).width));
        size = Math.min(size * maxW / w, maxH / (lines.length * 0.98));
        return { lines, size: Math.max(20, Math.floor(size)) };
      };
      const options = [fit([D.name])];
      if (D.name.includes(" ")) {
        const parts = D.name.split(" ");
        const half = Math.ceil(parts.length / 2);
        options.push(fit([parts.slice(0, half).join(" "), parts.slice(half).join(" ")]));
      }
      const { lines, size } = options.sort((a, b) => b.size - a.size)[0];

      o.font = `800 ${size}px Syne, sans-serif`;
      o.fillStyle = "#fff"; o.textAlign = mobile ? "center" : "left"; o.textBaseline = "middle";
      const lh = size * 0.98;
      const cy = (area.top + area.bottom) / 2;
      const x = mobile ? W / 2 : area.left;
      lines.forEach((l, i) => o.fillText(l, x, cy + (i - (lines.length - 1) / 2) * lh));

      const data = o.getImageData(0, 0, W, H).data;
      const gap = Math.max(3, Math.round(size / (mobile ? 26 : 36)));
      const pts = [];
      for (let y = 0; y < H; y += gap) {
        for (let x = 0; x < W; x += gap) {
          if (data[(y * W + x) * 4 + 3] > 128) pts.push([x, y]);
        }
      }
      const colorAt = x => {
        const t = x / W;
        const c = t < .5 ? mix([108, 240, 210], [140, 123, 255], t * 2) : mix([140, 123, 255], [255, 143, 163], (t - .5) * 2);
        return `rgb(${c[0]},${c[1]},${c[2]})`;
      };
      const r = Math.max(1.1, gap * 0.42);
      particles = pts.map(([x, y]) => ({
        hx: x, hy: y,
        x: reduceMotion ? x : Math.random() * W,
        y: reduceMotion ? y : Math.random() * H,
        vx: 0, vy: 0, r, c: colorAt(x),
        f: 0.06 + Math.random() * 0.04 // spring stiffness (slight variety = organic)
      }));

      // faint star field
      stars = Array.from({ length: mobile ? 50 : 110 }, () => ({
        x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.2 + .2,
        a: Math.random(), s: Math.random() * 0.02 + 0.004
      }));
    }

    function mix(a, b, t) { return a.map((v, i) => Math.round(v + (b[i] - v) * t)); }

    function frame() {
      if (!running) return requestAnimationFrame(frame);
      ctx.clearRect(0, 0, W, H);

      for (const s of stars) {
        s.a += s.s; const al = (Math.sin(s.a) + 1) / 2 * 0.6;
        ctx.fillStyle = `rgba(200,206,255,${al})`;
        ctx.fillRect(s.x, s.y, s.r, s.r);
      }

      const R = W < 900 ? 70 : 110;
      for (const p of particles) {
        // spring toward home
        p.vx += (p.hx - p.x) * p.f;
        p.vy += (p.hy - p.y) * p.f;
        // repel from pointer
        if (mouse.active) {
          const dx = p.x - mouse.x, dy = p.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < R * R) {
            const d = Math.sqrt(d2) || 1;
            const force = (1 - d / R) * 9;
            p.vx += (dx / d) * force;
            p.vy += (dy / d) * force;
          }
        }
        p.vx *= 0.82; p.vy *= 0.82;
        p.x += p.vx; p.y += p.vy;
        ctx.fillStyle = p.c;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }
      requestAnimationFrame(frame);
    }

    const setMouse = (x, y) => {
      const b = canvas.getBoundingClientRect();
      mouse.x = x - b.left; mouse.y = y - b.top; mouse.active = true;
    };
    window.addEventListener("pointermove", e => setMouse(e.clientX, e.clientY), { passive: true });
    window.addEventListener("touchmove", e => setMouse(e.touches[0].clientX, e.touches[0].clientY), { passive: true });
    window.addEventListener("touchend", () => (mouse.active = false));
    document.addEventListener("pointerleave", () => (mouse.active = false));

    // pause when hero is off-screen (saves battery)
    new IntersectionObserver(([e]) => (running = e.isIntersecting)).observe(hero);

    let rt;
    let lastW = 0;
    window.addEventListener("resize", () => {
      clearTimeout(rt);
      rt = setTimeout(() => {
        if (Math.abs(hero.clientWidth - lastW) < 2) return; // ignore mobile URL-bar height changes
        lastW = hero.clientWidth;
        build();
      }, 200);
    });

    // explode the name on click / tap
    hero.addEventListener("click", e => {
      if (e.target.closest("a,button,.hero__girl")) return;
      const b = canvas.getBoundingClientRect();
      const cx = e.clientX - b.left, cy = e.clientY - b.top;
      for (const p of particles) {
        const dx = p.x - cx, dy = p.y - cy, d = Math.hypot(dx, dy) || 1;
        const f = Math.min(40, 2400 / d);
        p.vx += dx / d * f; p.vy += dy / d * f;
      }
    });

    lastW = hero.clientWidth;
    build();
    frame();
  }

  /* ======================================================================
     2b. Hero character
     Eyes and head follow the pointer, she blinks/breathes (CSS), and she
     talks through a speech bubble. Click her for a wink and a new line.
     ====================================================================== */
  function girlFx() {
    const girl = $("#girl");
    if (!girl || !D.girl || D.girl.enabled === false) return;
    const head = $(".g-head", girl), back = $(".g-back", girl);
    const irises = $$(".iris", girl), bubble = $("#girlBubble");
    const lines = D.girl.lines && D.girl.lines.length ? D.girl.lines : ["Hi!"];

    /* --- look at the pointer --- */
    let tx = 0, ty = 0, cx = 0, cy = 0, visible = true, lastMove = 0;
    const clamp = v => Math.max(-1, Math.min(1, v));
    const aim = (x, y) => {
      const b = girl.getBoundingClientRect();
      tx = clamp((x - (b.left + b.width / 2)) / (window.innerWidth * 0.45));
      ty = clamp((y - (b.top + b.height * 0.42)) / (window.innerHeight * 0.5));
      lastMove = performance.now();
    };
    window.addEventListener("pointermove", e => aim(e.clientX, e.clientY), { passive: true });
    new IntersectionObserver(([e]) => (visible = e.isIntersecting)).observe(girl);

    if (!reduceMotion) {
      // on touch screens (or when the pointer rests) she glances around by herself
      setInterval(() => {
        if (performance.now() - lastMove < 4000) return;
        tx = (Math.random() * 2 - 1) * 0.7;
        ty = (Math.random() * 2 - 1) * 0.4;
      }, 2600);

      (function loop() {
        if (visible) {
          cx = lerp(cx, tx, 0.08); cy = lerp(cy, ty, 0.08);
          head.style.transform = `translate(${cx * 6}px, ${cy * 4}px) rotate(${cx * 4}deg)`;
          back.style.transform = `translate(${cx * 2.5}px, ${cy * 1.5}px)`;
          irises.forEach(i => (i.style.transform = `translate(${cx * 4.5}px, ${cy * 4}px)`));
        }
        requestAnimationFrame(loop);
      })();
    }

    /* --- speech bubble --- */
    let idx = 0, typing, hideT;
    const say = text => {
      clearInterval(typing); clearTimeout(hideT);
      bubble.textContent = "";
      bubble.classList.add("show");
      girl.classList.add("talking");
      if (reduceMotion) {
        bubble.textContent = text;
        girl.classList.remove("talking");
      } else {
        let i = 0;
        typing = setInterval(() => {
          bubble.textContent = text.slice(0, ++i);
          if (i >= text.length) { clearInterval(typing); girl.classList.remove("talking"); }
        }, 30);
      }
      hideT = setTimeout(() => bubble.classList.remove("show"), 1400 + text.length * 30 + 2600);
    };
    const next = () => say(lines[idx++ % lines.length]);

    let auto = setInterval(() => { if (visible) next(); }, 9000);
    setTimeout(next, 2300); // first line right after the intro

    /* --- click / tap: wink, hop, talk --- */
    $("#girlHit").addEventListener("click", () => {
      girl.classList.remove("hop"); void girl.offsetWidth;
      girl.classList.add("wink", "hop");
      setTimeout(() => girl.classList.remove("wink"), 650);
      setTimeout(() => girl.classList.remove("hop"), 600);
      next();
      clearInterval(auto);
      auto = setInterval(() => { if (visible) next(); }, 9000);
    });
  }

  /* ======================================================================
     3. Typing roles
     ====================================================================== */
  function typeRoles() {
    const el = $("#typed");
    if (reduceMotion) { el.textContent = D.roles[0]; return; }
    let r = 0, i = 0, deleting = false;
    const tick = () => {
      const word = D.roles[r];
      i += deleting ? -1 : 1;
      el.textContent = word.slice(0, i);
      let delay = deleting ? 35 : 70 + Math.random() * 50;
      if (!deleting && i === word.length) { delay = 1800; deleting = true; }
      else if (deleting && i === 0) { deleting = false; r = (r + 1) % D.roles.length; delay = 350; }
      setTimeout(tick, delay);
    };
    tick();
  }

  /* ======================================================================
     4. Utilities: count-up, split headings, reveal on scroll
     ====================================================================== */
  function countUp(el, to, dur = 1600, suffix = "", delay = 0) {
    if (reduceMotion) { el.textContent = to.toLocaleString() + suffix; return; }
    const start = performance.now() + delay;
    const step = now => {
      const t = Math.min(1, Math.max(0, (now - start) / dur));
      const e = 1 - Math.pow(1 - t, 4);
      el.textContent = Math.round(to * e).toLocaleString() + suffix;
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  function splitHeadings() {
    $$(".split").forEach(h => {
      const words = h.textContent.trim().split(/\s+/);
      let ci = 0;
      h.setAttribute("aria-label", h.textContent.trim());
      h.innerHTML = words.map(w =>
        `<span class="word" aria-hidden="true">${[...w].map(ch => `<span class="char" style="--ci:${ci++}">${esc(ch)}</span>`).join("")}</span>`
      ).join(" ");
    });
  }

  function observeReveals() {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        el.classList.add("in");
        io.unobserve(el);

        // count-ups inside newly revealed blocks
        $$("[data-count]", el).forEach(n => countUp(n, +n.dataset.count));
        // profile rings
        $$(".meter", el).forEach(m => {
          m.style.strokeDashoffset = m.dataset.c * (1 - m.dataset.progress / 100);
        });
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
    $$(".reveal, .split").forEach(el => io.observe(el));

    // skills panel: fill bars the first time it is seen
    new IntersectionObserver(([e], obs) => {
      if (e.isIntersecting) { skillsSeen = true; fillBars(); obs.disconnect(); }
    }, { threshold: 0.1 }).observe($(".skills__panel"));
  }

  /* ---------- Timeline lines that draw as you scroll ---------- */
  function scrollLines() {
    const tracks = [
      { wrap: $("#eduTimeline"), fill: $("#eduTimeline .timeline__fill"), items: $$("#eduTimeline .t-item") },
      { wrap: $("#expList"), fill: $("#expList .exp__fill"), items: $$("#expList .exp-item") }
    ];
    const update = () => {
      const mid = window.innerHeight * 0.6;
      tracks.forEach(({ wrap, fill, items }) => {
        const r = wrap.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (mid - r.top) / r.height));
        fill.style.transform = `scaleY(${p})`;
        items.forEach(it => it.classList.toggle("lit", it.getBoundingClientRect().top + 36 < mid));
      });
    };
    return update;
  }

  /* ======================================================================
     5. Scroll-linked chrome: progress bar, nav hide/show, active link
     ====================================================================== */
  function scrollChrome() {
    const bar = $("#progress");
    const nav = $("#nav");
    const lines = scrollLines();
    let lastY = 0, ticking = false;

    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
      if (!nav.classList.contains("open")) nav.classList.toggle("hide", y > lastY && y > 400);
      lastY = y;
      lines();
      ticking = false;
    };
    window.addEventListener("scroll", () => {
      if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
    }, { passive: true });
    onScroll();

    // highlight the nav link for the section in view
    const links = $$(".nav__links a");
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        links.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + e.target.id));
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    $$("main section[id]").forEach(s => io.observe(s));

    // mobile menu
    const burger = $("#burger");
    burger.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      burger.setAttribute("aria-expanded", open);
      burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    links.forEach(l => l.addEventListener("click", () => {
      nav.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
    }));
  }

  /* ======================================================================
     6. Pointer effects: custom cursor, magnetic buttons, tilt, spotlight
     ====================================================================== */
  function pointerFx() {
    if (!finePointer || reduceMotion) return;
    document.body.classList.add("has-cursor");
    const dot = $(".cursor-dot"), ring = $(".cursor-ring");
    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
    window.addEventListener("pointermove", e => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
    }, { passive: true });
    (function loop() {
      rx = lerp(rx, mx, 0.16); ry = lerp(ry, my, 0.16);
      ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
      requestAnimationFrame(loop);
    })();
    document.addEventListener("pointerover", e => {
      document.body.classList.toggle("cursor-hover", !!e.target.closest("a,button,.tab,.filter,input,textarea"));
    });

    // magnetic buttons
    document.addEventListener("pointermove", e => {
      $$(".magnetic").forEach(m => {
        const b = m.getBoundingClientRect();
        const cx = b.left + b.width / 2, cy = b.top + b.height / 2;
        const dx = e.clientX - cx, dy = e.clientY - cy;
        const near = Math.abs(dx) < b.width / 2 + 30 && Math.abs(dy) < b.height / 2 + 30;
        m.style.transform = near ? `translate(${dx * 0.25}px,${dy * 0.3}px)` : "";
      });
    }, { passive: true });

    // 3D tilt + glare
    document.addEventListener("pointermove", e => {
      const card = e.target.closest(".tilt");
      $$(".tilt.tilting").forEach(t => { if (t !== card) { t.classList.remove("tilting"); t.style.transform = ""; } });
      if (!card) return;
      card.classList.add("tilting");
      const b = card.getBoundingClientRect();
      const px = (e.clientX - b.left) / b.width, py = (e.clientY - b.top) / b.height;
      card.style.transform = `rotateX(${(0.5 - py) * 10}deg) rotateY(${(px - 0.5) * 12}deg) translateZ(0)`;
      card.style.setProperty("--gx", px * 100 + "%");
      card.style.setProperty("--gy", py * 100 + "%");
    }, { passive: true });

    // spotlight on timeline cards
    document.addEventListener("pointermove", e => {
      const c = e.target.closest(".spot");
      if (!c) return;
      const b = c.getBoundingClientRect();
      c.style.setProperty("--mx", e.clientX - b.left + "px");
      c.style.setProperty("--my", e.clientY - b.top + "px");
    }, { passive: true });
  }

  /* ======================================================================
     7. Resume preview + contact form
     ====================================================================== */
  function resumeModal() {
    const modal = $("#resumeModal"), frame = $("#resumeFrame");
    let lastFocus;
    const open = () => {
      lastFocus = document.activeElement;
      frame.src = D.resume;
      modal.hidden = false;
      document.body.style.overflow = "hidden";
      $(".modal__close", modal).focus();
    };
    const close = () => {
      modal.hidden = true;
      frame.src = "about:blank";
      document.body.style.overflow = "";
      lastFocus && lastFocus.focus();
    };
    $("#resumeView").addEventListener("click", () => {
      // phones can't show PDFs inline reliably — open in a new tab instead
      if (window.innerWidth < 700) window.open(D.resume, "_blank", "noopener");
      else open();
    });
    modal.addEventListener("click", e => { if (e.target.closest("[data-close]")) close(); });
    document.addEventListener("keydown", e => { if (e.key === "Escape" && !modal.hidden) close(); });
  }

  function contactForm() {
    const form = $("#contactForm"), status = $("#formStatus"), label = $("#sendLabel");
    form.addEventListener("submit", async e => {
      e.preventDefault();
      const fields = [$("#f-name"), $("#f-email"), $("#f-msg")];
      let ok = true;
      fields.forEach(f => {
        const bad = !f.value.trim() || (f.type === "email" && !/^\S+@\S+\.\S+$/.test(f.value));
        f.parentElement.classList.toggle("error", bad);
        if (bad) ok = false;
      });
      status.className = "form__status";
      if (!ok) {
        status.textContent = "Add your name, a valid email and a message, then send again.";
        status.classList.add("err");
        return;
      }
      const [name, email, message] = fields.map(f => f.value.trim());

      if (!D.formspreeId) {
        const subject = encodeURIComponent(`Hello from ${name}`);
        const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
        window.location.href = `mailto:${D.email}?subject=${subject}&body=${body}`;
        status.textContent = "Your email app is opening with the message filled in.";
        status.classList.add("ok");
        return;
      }

      label.textContent = "Sending…";
      try {
        const res = await fetch(`https://formspree.io/f/${D.formspreeId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ name, email, message })
        });
        if (!res.ok) throw new Error();
        form.reset();
        status.textContent = "Message sent. I'll reply soon.";
        status.classList.add("ok");
        label.textContent = "Sent ✓";
        setTimeout(() => (label.textContent = "Send message"), 3000);
      } catch {
        status.textContent = `Couldn't send right now. Email me directly at ${D.email}.`;
        status.classList.add("err");
        label.textContent = "Send message";
      }
    });
    $$("input, textarea", form).forEach(f => f.addEventListener("input", () => f.parentElement.classList.remove("error")));
  }

  /* ======================================================================
     8. Boot: loader → hero intro
     ====================================================================== */
  function boot() {
    render();
    splitHeadings();

    const loader = $("#loader"), countEl = $("#loaderCount");
    const fontsReady = document.fonts ? document.fonts.load('800 100px "Syne"').catch(() => {}) : Promise.resolve();
    const minTime = new Promise(r => setTimeout(r, reduceMotion ? 0 : 1300));

    // fake-but-honest progress: counts toward 90 until assets are ready
    let n = 0;
    const iv = setInterval(() => { n = Math.min(90, n + Math.ceil((90 - n) / 8)); countEl.textContent = n; }, 60);

    Promise.all([fontsReady, minTime]).then(() => {
      clearInterval(iv);
      countEl.textContent = 100;
      setTimeout(() => {
        loader.classList.add("done");
        document.body.classList.remove("is-loading");
        document.body.classList.add("ready");
        heroParticles();
        girlFx();
        typeRoles();
        $$("#heroStats [data-count]").forEach((el, i) => countUp(el, +el.dataset.count, 1800, "", 1400 + i * 120));
        observeReveals();
        scrollChrome();
        pointerFx();
        resumeModal();
        contactForm();
      }, 250);
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
