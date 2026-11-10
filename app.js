"use strict";
/*  Shared data & helpers l */
let RECS = [], NAMES = [], S = {}, ALIAS = {};
const NAME = { "heavy cream": "Heavy Whipping Cream" };
const BOOK = [
  ["Evaporated Milk", "evaporated milk", "Evaporated milk is a fatty, shelf stable milk that has had 60% of the water removed from it"],
  ["Butter", "butter", "Butter is made of the fat and protein of churned cream"],
  ["Milk", "milk", "Milk is a nutritious food product from mammals"],
  ["Coconut Cream", "coconut cream", "Coconut cream is a thick and creamy unsweetened ingredient. The sweetened version is called cream of coconut."],
  ["Cornstarch", "cornstarch", "Cornstarch is the starch powder from the corn grain, used to thicken dishes and make syrups"],
  ["Greek Yogurt", "greek yogurt", "Greek yogurt is a thick, protein-rich nutritious yogurt with various kinds to choose from"],
  ["Heavy Whipping Cream", "heavy cream", "Heavy whipping cream is a rich cream with a milk fat content of about 36% or more"],
  ["Self-Rising Flour", "self-rising flour", "Self-rising flour is all-purpose flour with baking powder and salt already mixed in"],
  ["Sugar", "sugar", "Granulated sugar is refined cane or beet sugar, used to sweeten and to help baked goods brown and stay tender"],
  ["Brown Sugar", "brown sugar", "Brown sugar is white sugar with molasses, which makes it moist and gives it a caramel flavor"],
  ["Honey", "honey", "Honey is a thick, sweet syrup made by bees from flower nectar"],
  ["Salt", "salt", "Table salt is fine-grained sodium chloride, used to season food and sharpen other flavors"],
  ["Kosher Salt", "kosher salt", "Kosher salt is a coarse, flaky salt that is easy to pinch and measures lighter than table salt"],
  ["Olive Oil", "olive oil", "Olive oil is pressed from olives and is used for sautéing, roasting and dressings"],
  ["Vegetable Oil", "vegetable oil", "Vegetable oil is a neutral, liquid cooking oil used for frying and baking"],
  ["Cream Cheese", "cream cheese", "Cream cheese is a soft, tangy fresh cheese made from milk and cream"],
  ["Egg", "egg", "Eggs bind, thicken and help baked goods rise and set"],
  ["Baking Powder", "baking powder", "Baking powder is a mix of baking soda and a dry acid that makes batters rise"],
  ["All-Purpose Flour", "flour", "All-purpose flour is a medium-protein wheat flour used for everything from cakes to sauces"],
  ["Vanilla Extract", "vanilla extract", "Vanilla extract is made by soaking vanilla beans in alcohol and gives a warm, sweet aroma"],
  ["Soy Sauce", "soy sauce", "Soy sauce is a salty, savory sauce made from fermented soybeans and wheat"],
  ["Lemon Juice", "lemon juice", "Lemon juice adds bright acidity to sauces, dressings and baked goods"],
  ["Garlic", "garlic", "Garlic is a pungent bulb whose cloves are minced, sliced or crushed to flavor savory dishes"],
  ["Onion", "onion", "Onion is a savory, slightly sweet base flavor for soups, sauces and stir-fries"],
  ["Chicken Stock", "chicken stock", "Chicken stock is a savory liquid simmered from chicken and aromatics"],
  ["White Wine", "white wine", "White wine adds acidity and depth to sauces and is often used to deglaze a pan"],
  ["Cilantro", "cilantro", "Cilantro is a fresh, citrusy herb used in Mexican, Indian and Southeast Asian cooking"],
  ["Paprika", "paprika", "Paprika is a ground red pepper spice that adds color and mild, sweet flavor"],
  ["Ground Cinnamon", "ground cinnamon", "Ground cinnamon is a warm, sweet spice made from dried tree bark"],
  ["Nutmeg", "nutmeg", "Nutmeg is a warm, nutty spice ground from the seed of a tropical tree"],
  ["Buttermilk", "buttermilk", "Buttermilk is a tangy, cultured milk that makes baked goods tender and helps them rise"],
  ["Sour Cream", "sour cream", "Sour cream is cream thickened and soured with bacteria, used in dips, sauces and baking"],
  ["Half-and-Half", "half-and-half", "Half-and-half is equal parts whole milk and cream, richer than milk and lighter than cream"],
  ["Mayonnaise", "mayonnaise", "Mayonnaise is an emulsion of oil, egg yolk and acid used in sandwiches, dressings and salads"],
  ["Ricotta Cheese", "ricotta cheese", "Ricotta is a soft, mild, slightly sweet fresh cheese made from whey"],
  ["Cottage Cheese", "cottage cheese", "Cottage cheese is a fresh cheese of soft white curds in a light cream"],
  ["Parmesan", "parmesan", "Parmesan is a hard, salty, nutty aged cheese, usually grated"],
  ["Mozzarella", "mozzarella", "Mozzarella is a mild, stretchy cheese that melts well"],
  ["Cheddar Cheese", "cheddar cheese", "Cheddar is a firm, sharp cheese that melts smoothly"],
  ["Powdered Sugar", "powdered sugar", "Powdered sugar is finely ground sugar, used for frostings, glazes and dusting"],
  ["Maple Syrup", "maple syrup", "Maple syrup is a sweet syrup boiled down from the sap of maple trees"],
  ["Corn Syrup", "corn syrup", "Corn syrup is a thick, mild syrup that keeps sweets smooth and stops sugar crystallizing"],
  ["Baking Soda", "baking soda", "Baking soda is a leavener that needs an acid in the recipe to make batters rise"],
  ["Cream of Tartar", "cream of tartar", "Cream of tartar is a mild acid used to stabilize whipped egg whites and activate baking soda"],
  ["Vanilla Pod", "vanilla pod", "A vanilla pod, or bean, is the cured seed pod of an orchid, with seeds that give a rich vanilla flavor"],
  ["Egg White", "egg white", "Egg white is the clear protein part of the egg, whipped for meringues and used to bind and lighten"],
  ["Breadcrumbs", "breadcrumbs", "Breadcrumbs are dried, crushed bread used for coating, binding and topping"],
  ["Vegetable Shortening", "vegetable shortening", "Vegetable shortening is a solid, flavorless fat that makes pastry and baked goods tender"],
  ["Cocoa Powder", "cocoa powder", "Cocoa powder is ground, defatted roasted cacao used for chocolate flavor in baking"],
  ["Dark Chocolate", "dark chocolate", "Dark chocolate has a high percentage of cacao and little to no milk"],
  ["Marzipan", "marzipan", "Marzipan is a sweet paste of ground almonds and sugar used in confections and cakes"],
  ["Tomato Paste", "tomato paste", "Tomato paste is cooked-down, concentrated tomato that adds deep flavor"],
  ["Tomato Puree", "tomato puree", "Tomato puree is cooked, strained tomatoes with a smooth, thick texture"],
  ["Mustard", "mustard", "Mustard is a tangy paste of ground mustard seeds, vinegar and spices"],
  ["Rice Vinegar", "rice vinegar", "Rice vinegar is a mild, slightly sweet vinegar used in Asian dressings and sushi rice"],
  ["Red Wine Vinegar", "red wine vinegar", "Red wine vinegar is a tangy vinegar with a fruity flavor, used in dressings and marinades"],
  ["Lime Juice", "lime juice", "Lime juice is a sharp, fragrant citrus juice used in dressings, marinades and drinks"],
  ["Orange Juice", "orange juice", "Orange juice is a sweet, tangy citrus juice used in drinks, glazes and baking"],
  ["Oyster Sauce", "oyster sauce", "Oyster sauce is a thick, savory-sweet sauce made from cooked oysters"],
  ["Fish Sauce", "fish sauce", "Fish sauce is a salty, pungent sauce of fermented fish used across Southeast Asian cooking"],
  ["Worcestershire Sauce", "worcestershire sauce", "Worcestershire is a tangy, savory sauce of fermented ingredients used in marinades and stews"],
  ["Shaoxing Wine", "shaoxing wine", "Shaoxing wine is a Chinese rice wine used to add depth to stir-fries and braises"],
  ["Coconut Milk", "coconut milk", "Coconut milk is made from grated coconut flesh and water, thinner than coconut cream"],
  ["Vegetable Stock", "vegetable stock", "Vegetable stock is a light liquid simmered from vegetables and herbs"],
  ["Tahini", "tahini", "Tahini is a paste of ground sesame seeds used in hummus and dressings"],
  ["Peanut Butter", "peanut butter", "Peanut butter is a spread of ground roasted peanuts"],
  ["Shallot", "shallot", "Shallots are small, mild, slightly sweet members of the onion family"],
  ["Green Onion", "green onion", "Green onions, also called scallions, are mild onions eaten raw or cooked, both the white and green parts"],
  ["Kale", "kale", "Kale is a sturdy, leafy green that holds up to long cooking"],
  ["Brown Rice", "brown rice", "Brown rice is whole-grain rice with the bran left on, chewier and nuttier than white"],
  ["Jasmine Rice", "jasmine rice", "Jasmine rice is a fragrant long-grain rice that cooks up soft and slightly sticky"],
  ["Ground Ginger", "ground ginger", "Ground ginger is dried ginger root, warm and spicy, common in baking"],
  ["Cumin", "cumin", "Cumin is an earthy, warm spice used in Mexican, Indian and Middle Eastern cooking"],
  ["Dill", "dill", "Dill is a feathery herb with a fresh, grassy, slightly anise flavor"],
  ["Black Pepper", "black pepper", "Black pepper is a pungent, sharp spice from dried peppercorns"],
  ["Red Pepper Flakes", "red pepper flakes", "Red pepper flakes are crushed dried chiles that add heat"],
  ["Allspice", "allspice", "Allspice is a warm spice that tastes like cinnamon, nutmeg and clove together"],
  ["Thyme", "thyme", "Thyme is a small-leaved herb with an earthy, slightly minty flavor"],
  ["Oregano", "oregano", "Oregano is a robust, peppery herb common in Italian and Greek cooking"],
  ["Rosemary", "rosemary", "Rosemary is a piney, aromatic herb that pairs with roasts and potatoes"],
  ["Sage", "sage", "Sage is an earthy, peppery herb often used with poultry and pork"]
];
BOOK.sort((x, y) => x[0].localeCompare(y[0]));   // alphabetical

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
const fq = (q, u) => f(q) + (u ? " " + (u === "cup" && q > 1.001 ? "cups" : u) : "");

// Substitutions live only in memory, so leaving (or reloading) a recipe discards them.
let applied = {}, checked = ld("sf.checked", {});
try { localStorage.removeItem("sf.applied"); } catch (e) {}  // clear any older saved substitutions

const lt = i => (i.q == null ? (i.raw ? i.raw + " " : "") : fq(i.q, i.u) + " ") + i.t;
// A substitution's "u" is one unit or a list of units. A part unit of "=" means "same unit as the recipe line".
const du = s => [].concat(s.u)[0] || "";                       // default unit (used by the Ingredient Book)
const dl = s => du(s) === "cup" ? "cups" : du(s);
const pu = (p, s) => p[2] === "=" ? du(s) : p[2];
const can = i => !!S[i.k] && i.q != null && (!S[i.k].u || [].concat(S[i.k].u).includes(i.u));
// Substitution amounts step down to a smaller unit when they'd round badly (3/16 cup -> 3 Tbsp).
const off = q => Math.min(Math.abs(q - Math.round(q * 8) / 8), Math.abs(q - Math.round(q * 3) / 3)) / q;
const fs = (q, u) => { if (q > 0 && u === "cup" && q < 1 && (q < .25 || off(q) > .04)) { q *= 16; u = "Tbsp"; } if (q > 0 && u === "Tbsp" && q < 1) { q *= 3; u = "tsp"; } return fq(q, u); };
const ex = (i, p) => fs(p[1] * (i.q == null ? 1 : i.q), p[2] === "=" ? i.u : p[2]);
const opt = (k, n) => S[k].o.find(o => o.n === n);
const tag = o => `<div class="tag ${o.lac ? "" : "ok"}">${o.lac ? "Contains lactose" : "Lactose free" + (o.vg ? " · Vegan" : "")}</div>`;

const DATA_ERR = "<p>Could not load data/recipes.json. Run this site from a web server (for example, python -m http.server), not by opening the file.</p>";
function loadData() {
  return Promise.all([
    fetch("data/recipes.json").then(r => r.json()),
    fetch("data/substitutions.json").then(r => r.json()),
    fetch("data/aliases.json").then(r => r.json()).catch(() => ({}))   // optional
  ]).then(([r, s, a]) => {
    ALIAS = a;
    r.forEach(x => {
      // the data spells tablespoons both "Tbsp" and "tblsp"; treat them the same
      // and fold spelling variants ("unsalted butter", "eggs", ...) onto one substitution key
      x.ing.forEach(i => { if (i.u === "tblsp") i.u = "Tbsp"; i.k = ALIAS[i.k] || i.k; });
      x.steps.forEach(st => { if (st.uses) st.uses = ALIAS[st.uses] || st.uses; });
    });
    RECS = r; S = s; NAMES = r.map(x => x.name);
  });
}

function highlightNav() {
  const here = document.body.dataset.nav || location.pathname.split("/").pop() || "main.html";
  document.querySelectorAll(".nav-links a").forEach(a => {
    if (a.getAttribute("href") === here) a.setAttribute("aria-current", "page");
  });
}

/* Home */
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
      if (applied[i.k] && can(i)) {
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
    app.innerHTML = `<div class="recipe-layout">
      <header class="recipe-head"><h1>${r.name}</h1><p class="mu">${[r.servings ? "Makes " + r.servings + " Servings" : "", r.minutes ? r.minutes + " Minutes" : "", r.cuisine, r.meal].filter(Boolean).join(" | ")}</p>${banner()}</header>
      <section class="recipe-left">${r.thumb ? `<img class="recipe-img" src="${esc(r.thumb)}" alt="${esc(r.name)}" onerror="this.remove()">` : ""}<h2>Ingredients</h2><ul class="ing">${lines()}</ul></section>
      <section class="recipe-steps"><h2>Steps</h2><ol>${steps()}</ol></section>
      <aside class="side-panel" aria-live="polite">${panel()}</aside></div>`;
  }

  app.addEventListener("click", e => {
    const t = e.target.closest("[data-a]"); if (!t) return;
    const d = t.dataset, a = d.a;
    if (a === "line") st.pick = d.k;
    else if (a === "lac") st.lac = !st.lac;
    else if (a === "use") { applied[d.k] = d.n; st.pick = null; }
    else if (a === "undo") { delete applied[d.k]; }
    else return;
    render();
  });
  // Back/forward can restore this page from the browser's cache with its old state; start fresh instead.
  window.addEventListener("pageshow", e => { if (e.persisted) location.reload(); });
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
  const grid = $("ingredient-grid"), side = $("side"), search = $("ingredient-search"), pager = $("pager");
  const PER = 9;   // 3 x 3 flashcards per page
  const st = { sel: null, open: null, amt: {}, iq: "", page: 0 };
  const arr = d => `<svg width="38" height="22" viewBox="0 0 38 22" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" aria-hidden="true"><path d="${d ? "M2 11 13 2v5h23v8H13v5z" : "M36 11 25 2v5H2v8h23v5z"}"/></svg>`;
  const arrow = `<svg width="16" height="16" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1" stroke-linejoin="round"><path d="M2 1.5v9l8-4.5z"/></svg>`;

  function parts() {
    const b = BOOK[st.sel], k = b[1], s = S[k], o = s.o[st.open], a = st.amt[k] ?? 1;
    const ids = o.p.map(p => o.n + "|" + p[0]);
    const n = ids.filter(i => checked[i]).length;
    return `<p class="mu sm">${n} of ${ids.length} ready</p>` + o.p.map((p, j) =>
      `<label class="ck"><input type="checkbox" data-a="chk" data-id="${esc(ids[j])}" ${checked[ids[j]] ? "checked" : ""}> ${fs(p[1] * a, pu(p, s))} ${p[0]}</label>`).join("");
  }
  function cards() {
    const q = norm(st.iq);
    const all = BOOK.map((b, i) => [b, i]).filter(([b]) => !q || norm(b[0]).includes(q));
    const pages = Math.max(1, Math.ceil(all.length / PER));
    st.page = Math.min(Math.max(st.page, 0), pages - 1);
    const from = st.page * PER, to = Math.min(all.length, from + PER);
    pager.hidden = pages < 2;
    pager.innerHTML = `<button type="button" class="arrow" data-a="page" data-d="-1" aria-label="Previous ingredients" ${st.page === 0 ? "disabled" : ""}>${arr(1)}</button>` +
      `<span class="mu sm" aria-live="polite">${from + 1}\u2013${to} of ${all.length}</span>` +
      `<button type="button" class="arrow" data-a="page" data-d="1" aria-label="Next ingredients" ${st.page === pages - 1 ? "disabled" : ""}>${arr(0)}</button>`;
    return all.slice(from, to).map(([b, i]) =>
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
      (st.open === j ? `<div><p>${o.c}</p><label>How much do you need? <input class="fi" type="number" min="0" step=".25" value="${st.amt[b[1]] ?? 1}" data-a="amt" style="width:5.5em"> ${dl(s) ? dl(s) + " of " : ""}${b[0].toLowerCase()}</label><div id="parts">${parts()}</div></div>` : "") +
      `</div>`).join("");
  }

  document.querySelector("main").addEventListener("click", e => {
    const t = e.target.closest("[data-a]"); if (!t) return;
    const d = t.dataset;
    if (d.a === "sel") { st.sel = +d.i; st.open = 0; grid.innerHTML = cards(); renderSide(); }
    else if (d.a === "exp") { st.open = st.open === +d.j ? null : +d.j; renderSide(); }
    else if (d.a === "page") { st.page += +d.d; grid.innerHTML = cards(); }
  });
  search.addEventListener("input", () => { st.iq = search.value; st.page = 0; grid.innerHTML = cards(); });
  // left / right arrow keys also turn the page (unless typing in a field)
  document.addEventListener("keydown", e => {
    if (/^(INPUT|SELECT|TEXTAREA)$/.test(e.target.tagName) || (e.key !== "ArrowLeft" && e.key !== "ArrowRight")) return;
    st.page += e.key === "ArrowRight" ? 1 : -1; grid.innerHTML = cards();
  });
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

/*  Boot  */
highlightNav();
({ home: initHome, recipe: initRecipe, book: initBook, ingredients: initIngredients }[document.body.dataset.page] || (() => {}))();