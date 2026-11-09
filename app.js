"use strict";

let RECS = [], NAMES = [], S = {};
const NAME = { "heavy cream": "Heavy Whipping Cream" };
const BOOK = [
  ["Evaporated Milk", "evaporated milk", "Evaporated milk is a fatty, shelf stable milk that has had 60% of the water removed from it"],
  ["Butter", "", "Butter is made of the fat and protein of churned cream"],
  ["Milk", "", "Milk is a nutritious food product from mammals"],
  ["Coconut Cream", "", "Coconut cream is a thick and creamy unsweetened ingredient. The sweetened version is called cream of coconut."],
  ["Cornstarch", "cornstarch", "Cornstarch is the starch powder from the corn grain, used to thicken dishes and make syrups"],
  ["Greek Yogurt", "", "Greek yogurt is a thick, protein-rich nutritious yogurt with various kinds to choose from"],
  ["Heavy Whipping Cream", "heavy cream", "Heavy whipping cream is a rich cream with a milk fat content of about 36% or more"],
  ["Self-Rising Flour", "self-rising flour", "Self-rising flour is all-purpose flour with baking powder and salt already mixed in"]
];

const $ = id => document.getElementById(id);
const ld = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) || d } catch (e) { return d } };
const sv = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)) } catch (e) {} };
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const norm = s => s.toLowerCase().replace(/[^a-z]/g, "");
const reEsc = s => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const FR = ["", "⅛", "¼", "⅜", "½", "⅝", "¾", "⅞"];
function f(n) {
  const t = Math.round(n * 3) / 3;
  if (Math.abs(n - t) < .02 && Math.abs(t * 3 - Math.round(t * 3)) < .01 && Math.round(t * 3) % 3) {
    const w = Math.floor(t + 1e-9);
    return (w ? w : "") + ["", "⅓", "⅔"][Math.round((t - w) * 3)];
  }
  const e = Math.round(n * 8), w = Math.floor(e / 8), r = e % 8;
  return (w || !r ? w : "") + FR[r];
}
const fq = (q, u) => f(q) + (u ? " " + (u === "cup" && q > 1 ? "cups" : u) : "");

let applied = ld("sf.applied", {}), checked = ld("sf.checked", {});

const lt = i => (i.q == null ? (i.raw ? i.raw + " " : "") : fq(i.q, i.u) + " ") + i.t;
const can = i => !!S[i.k] && i.q != null && (!S[i.k].u || S[i.k].u === i.u);
const ex = (i, p) => fq(p[1] * (i.q == null ? 1 : i.q), p[2]);
const opt = (k, n) => S[k].o.find(o => o.n === n);
const tag = o => `<div class="tag ${o.lac ? "" : "ok"}">${o.lac ? "Contains lactose" : "Lactose free" + (o.vg ? " · Vegan" : "")}</div>`;

const DATA_ERR = "<p>Could not load data/recipes.json. Run this site from a web server (for example, python -m http.server), not by opening the file.</p>";
function loadData() {
  return Promise.all([
    fetch("data/recipes.json").then(r => r.json()),
    fetch("data/substitutions.json").then(r => r.json())
  ]).then(([r, s]) => {
    // the data spells tablespoons both "Tbsp" and "tblsp"; treat them the same
    r.forEach(x => x.ing.forEach(i => { if (i.u === "tblsp") i.u = "Tbsp"; }));
    RECS = r; S = s; NAMES = r.map(x => x.name);
  });
}

function highlightNav() {
  const here = document.body.dataset.nav || location.pathname.split("/").pop() || "main.html";
  document.querySelectorAll(".nav-links a").forEach(a => {
    if (a.getAttribute("href") === here) a.setAttribute("aria-current", "page");
  });
}

/*  Home  */
function initHome() {
  const st = { q: "", chosen: null, rid: null };
  const input = $("recipe-search"), list = $("matches"), cook = $("cook-btn");

  function matches() {
    const q = st.q.trim().toLowerCase();
    if (st.chosen || !q) return "";
    const m = NAMES.filter(n => n.toLowerCase().includes(q)).slice(0, 8);
    return m.length
      ? `<div class="ml">${m.map(n => `<button type="button" data-n="${esc(n)}">${esc(n)}</button>`).join("")}</div>`
      : `<p class="mu sm">No recipe matches that yet.</p>`;
  }

  input.addEventListener("input", () => {
    st.q = input.value; st.chosen = null; cook.hidden = true;
    list.innerHTML = matches();
  });
  list.addEventListener("click", e => {
    const b = e.target.closest("[data-n]"); if (!b) return;
    const r = RECS.find(x => x.name === b.dataset.n); if (!r) return;
    st.chosen = r.name; st.rid = r.id; st.q = r.name;
    input.value = r.name;
    cook.textContent = "Let’s Cook: " + r.name;
    cook.hidden = false;
    list.innerHTML = matches();
  });
  cook.addEventListener("click", () => {
    location.href = "recipe.html?id=" + encodeURIComponent(st.rid);
  });
  loadData().catch(() => { list.innerHTML = DATA_ERR; });
}

/* Recipe view  */
function initRecipe() {
  const app = $("app");
  const id = new URLSearchParams(location.search).get("id");
  const st = { pick: null, lac: false };
  const R = () => RECS.find(r => String(r.id) === id) || RECS[0];

  function lines() {
    return R().ing.map(i => {
      if (applied[i.k]) {
        const o = opt(i.k, applied[i.k]);
        return o.p.map(p => `<li class="chg">${ex(i, p)} ${p[0]}</li>`).join("");
      }
      const c = can(i);
      return `<li class="${c ? "sw" : "no"}"><button type="button" data-a="line" data-k="${i.k}" ${c ? "" : 'title="No supported alternative"'}>${lt(i)}</button></li>`;
    }).join("");
  }
  function banner() {
    const ks = Object.keys(applied); if (!ks.length) return "";
    return `<div class="ban" role="status">${ks.length} substitution${ks.length > 1 ? "s" : ""} applied. ${ks.map(k => `${NAME[k] || k} → ${esc(applied[k])}<button type="button" data-a="undo" data-k="${k}">Undo</button>`).join(" ")}</div>`;
  }
  function steps() {
    const r = R();
    return r.steps.map(s => {
      if (s.uses && applied[s.uses]) {
        const o = opt(s.uses, applied[s.uses]), i = r.ing.find(x => x.k === s.uses);
        const t = o.st || s.t.replace(new RegExp(reEsc(i.t), "ig"), o.p.map(p => p[0]).join(" and "));
        return `<li class="chg">${t}</li>`;
      }
      return `<li>${s.t}</li>`;
    }).join("");
  }
  function panel() {
    const k = st.pick;
    if (!k) return `<p class="mu">Tap an orange ingredient to see alternatives.</p>`;
    const i = R().ing.find(x => x.k === k), s = can(i) ? S[k] : null, nm = NAME[k] || i.t;
    if (!s) return `<h2>Alternatives to <em>${esc(nm)}</em></h2><div class="card no"><div><h3>No supported alternative yet</h3><p class="mu">SubstiFood has no researched substitute for ${esc(i.t)}, so it stays in the recipe.</p></div></div>`;
    const os = s.o.filter(o => !st.lac || !o.lac);
    return `<h2>Alternatives to <em>${esc(nm)}</em></h2><button type="button" class="chip" data-a="lac" aria-pressed="${st.lac}">Lactose free only</button>` +
      (st.lac ? `<p class="mu sm">Showing ${os.length} of ${s.o.length} · <button type="button" class="lk" data-a="lac">Clear</button></p>` : "") +
      (os.map(o => `<div class="card">${tag(o)}<div><h3>${o.n}</h3><p class="amt">Use ${o.p.map(p => ex(i, p) + " " + p[0]).join(" + ")}</p><p class="mu sm">Ratio ${o.r}</p><p>${o.c}</p><button type="button" class="prim" data-a="use" data-k="${k}" data-n="${o.n}">Use this</button></div></div>`).join("")
        || `<p class="mu">No lactose free option is supported for this ingredient yet.</p>`);
  }
  function render() {
    const r = R();
    document.title = r.name + " | SubstiFood";
    app.innerHTML = `<div class="recipe-layout"><section><h1>${r.name}</h1><p class="mu">${[r.servings ? "Makes " + r.servings + " Servings" : "", r.minutes ? r.minutes + " Minutes" : "", r.cuisine, r.meal].filter(Boolean).join(" | ")}</p>${banner()}<h2>Ingredients</h2><ul class="ing">${lines()}</ul><h2>Steps</h2><ol>${steps()}</ol></section><aside class="side-panel" aria-live="polite">${panel()}</aside></div>`;
  }

  app.addEventListener("click", e => {
    const t = e.target.closest("[data-a]"); if (!t) return;
    const d = t.dataset, a = d.a;
    if (a === "line") st.pick = d.k;
    else if (a === "lac") st.lac = !st.lac;
    else if (a === "use") { applied[d.k] = d.n; sv("sf.applied", applied); st.pick = null; }
    else if (a === "undo") { delete applied[d.k]; sv("sf.applied", applied); }
    else return;
    render();
  });
  loadData().then(render).catch(() => { app.innerHTML = DATA_ERR; });
}

/* Recipe book */
function initBook() {
  const list = $("recipe-list"), sortEl = $("sort"), grpEl = $("grp"), qEl = $("recipe-filter");

  function render() {
    const q = qEl.value.trim().toLowerCase();
    const rs = RECS.filter(r => !q || r.name.toLowerCase().includes(q));
    const key = {
      az: (a, b) => a.name.localeCompare(b.name),
      za: (a, b) => b.name.localeCompare(a.name),
      cnt: (a, b) => a.ing.length - b.ing.length,
      min: (a, b) => (a.minutes ?? 1e9) - (b.minutes ?? 1e9)
    }[sortEl.value];
    rs.sort(key);
    const g = {};
    rs.forEach(r => {
      const h = grpEl.value === "cuisine" ? r.cuisine : grpEl.value === "meal" ? r.meal : r.name[0].toUpperCase();
      (g[h || "Other"] = g[h || "Other"] || []).push(r);
    });
    list.innerHTML = Object.keys(g).map(h => `<h2>${h}</h2>` + g[h].map(r =>
      `<a href="recipe.html?id=${encodeURIComponent(r.id)}">${[r.name, r.minutes ? r.minutes + " min" : "", r.cuisine, r.meal, r.ing.length + " ingredients"].filter(Boolean).join(" · ")}</a>`
    ).join("")).join("") || `<p class="mu">No recipe matches that.</p>`;
  }

  [sortEl, grpEl].forEach(el => el.addEventListener("change", render));
  qEl.addEventListener("input", render);
  loadData().then(render).catch(() => { list.innerHTML = DATA_ERR; });
}

/* Ingredient book */
function initIngredients() {
  const grid = $("ingredient-grid"), side = $("side"), search = $("ingredient-search");
  const st = { sel: null, open: null, amt: {}, iq: "" };
  const arrow = `<svg width="16" height="16" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1" stroke-linejoin="round"><path d="M2 1.5v9l8-4.5z"/></svg>`;

  function parts() {
    const b = BOOK[st.sel], k = b[1], o = S[k].o[st.open], a = st.amt[k] ?? 1;
    const ids = o.p.map(p => o.n + "|" + p[0]);
    const n = ids.filter(i => checked[i]).length;
    return `<p class="mu sm">${n} of ${ids.length} ready</p>` + o.p.map((p, j) =>
      `<label class="ck"><input type="checkbox" data-a="chk" data-id="${esc(ids[j])}" ${checked[ids[j]] ? "checked" : ""}> ${fq(p[1] * a, p[2])} ${p[0]}</label>`).join("");
  }
  function cards() {
    const q = norm(st.iq);
    return BOOK.map((b, i) => [b, i]).filter(([b]) => !q || norm(b[0]).includes(q)).map(([b, i]) =>
      `<button type="button" class="ingredient-card" data-a="sel" data-i="${i}" aria-pressed="${st.sel === i}"><h2>${b[0]}</h2><p>${b[2]}</p>${arrow}</button>`
    ).join("") || `<p class="mu">No ingredient matches that.</p>`;
  }
  function renderSide() {
    if (st.sel === null) { side.innerHTML = `<p class="mu">Pick an ingredient to see what can replace it.</p>`; return; }
    const b = BOOK[st.sel], s = S[b[1]];
    const head = `<div class="card"><div class="src">${b[0]}</div><div><p>${b[2]}</p></div></div>`;
    if (!s) { side.innerHTML = head + `<div class="card no"><div><h3>No supported substitutions yet</h3><p class="mu">SubstiFood has no researched substitute for ${b[0]} yet.</p></div></div>`; return; }
    side.innerHTML = head + s.o.map((o, j) =>
      `<div class="card">${tag(o)}<button type="button" class="o" data-a="exp" data-j="${j}" aria-expanded="${st.open === j}"><h3>${o.n}</h3><span class="mu sm">Ratio ${o.r}</span></button>` +
      (st.open === j ? `<div><p>${o.c}</p><label>How much do you need? <input class="fi" type="number" min="0" step=".25" value="${st.amt[b[1]] ?? 1}" data-a="amt" style="width:5.5em"> ${s.u === "cup" ? "cups" : (s.u || "")} of ${b[0].toLowerCase()}</label><div id="parts">${parts()}</div></div>` : "") +
      `</div>`).join("");
  }

  document.querySelector("main").addEventListener("click", e => {
    const t = e.target.closest("[data-a]"); if (!t) return;
    const d = t.dataset;
    if (d.a === "sel") { st.sel = +d.i; st.open = 0; grid.innerHTML = cards(); renderSide(); }
    else if (d.a === "exp") { st.open = st.open === +d.j ? null : +d.j; renderSide(); }
  });
  search.addEventListener("input", () => { st.iq = search.value; grid.innerHTML = cards(); });
  side.addEventListener("input", e => {
    if (e.target.dataset.a === "amt") {
      st.amt[BOOK[st.sel][1]] = Math.max(0, parseFloat(e.target.value) || 0);
      $("parts").innerHTML = parts();
    }
  });
  side.addEventListener("change", e => {
    if (e.target.dataset.a === "chk") {
      checked[e.target.dataset.id] = e.target.checked; sv("sf.checked", checked);
      $("parts").innerHTML = parts();
    }
  });

  loadData().then(() => { grid.innerHTML = cards(); renderSide(); })
    .catch(() => { grid.innerHTML = DATA_ERR; });
}

highlightNav();
({ home: initHome, recipe: initRecipe, book: initBook, ingredients: initIngredients }[document.body.dataset.page] || (() => {}))();