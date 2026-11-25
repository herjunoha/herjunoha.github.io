"use strict";
// Builds each page from content.ts. Edit text in content.ts, not here.
// This file owns structure: links, markup and which section comes first.
(function () {
    const C = window.CONTENT;
    const app = document.getElementById("app");
    if (!C || !app) {
        if (app)
            app.textContent = "content.js did not load. Open the browser console (F12) for the error.";
        return;
    }
    const S = C.site;
    const page = document.body.getAttribute("data-page");
    // ---- helpers ----------------------------------------------------------
    function esc(s) {
        return String(s)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;");
    }
    // Escape first, then turn the two markers into markup.
    function rich(s) {
        return esc(s)
            .replace(/\[\[([\s\S]+?)\]\](?!\])/g, '<span class="dummy" title="Dummy value">$1</span>')
            .replace(/\*\*([\s\S]+?)\*\*/g, '<span class="hit">$1</span>');
    }
    const KIND = { P: "", E: "empty", D: "defect", B: "blocked" };
    const LEGEND_CLASS = { pass: "", empty: "empty", defect: "defect", blocked: "blocked" };
    function strip(spec) {
        const code = spec.code.replace(/\s/g, "");
        const items = code.split("").map((ch) => {
            const k = KIND[ch];
            return k ? '<li class="' + k + '"></li>' : "<li></li>";
        }).join("");
        return '<ul class="strip" role="img" aria-label="' + esc(spec.aria) + '">' + items + "</ul>";
    }
    function recordLines(lines) {
        return lines.map(rich).join("\n");
    }
    function table(T) {
        const head = T.head.map((h) => "<th scope=\"col\">" + esc(h) + "</th>").join("");
        const rows = T.rows.map((r) => "<tr>" + r.map((c, i) => (i === 0 ? '<th scope="row">' : "<td>") + rich(c) + (i === 0 ? "</th>" : "</td>")).join("") + "</tr>").join("");
        return '<div class="tbl" tabindex="0"><table><thead><tr>' + head + "</tr></thead><tbody>" + rows + "</tbody></table></div>";
    }
    // ---- figures ----------------------------------------------------------
    // Each figure is drawn at a 360 wide scale and stretches to its column.
    // Colors come from the page tokens in style.css. The accent keeps
    // its one meaning: a defect, a miss caught or a rejected fault.
    function fx(n) { return String(Math.round(n * 10) / 10); }
    function fmt(v) { return v.toFixed(2); }
    function dots(F) {
        const W = 360, padL = 44, top = 14, bottom = 168, H = bottom - top;
        const y = (v) => bottom - ((v - F.min) / (F.max - F.min)) * H;
        const grid = F.ticks.map((t) => '<line class="gl" x1="' + padL + '" x2="' + (W - 6) + '" y1="' + fx(y(t)) + '" y2="' + fx(y(t)) + '"/>' +
            '<text class="ft" x="' + (padL - 6) + '" y="' + fx(y(t) + 3.5) + '" text-anchor="end">' + fmt(t) + "</text>").join("");
        const plotW = W - 6 - padL;
        const body = F.groups.map((g, gi) => {
            const c = padL + plotW * (gi + 0.5) / F.groups.length;
            const n = g.points.length;
            const pts = g.points.map((p, j) => {
                const x = c + (j - (n - 1) / 2) * 16, yy = y(p.v);
                return p.miss
                    ? '<rect class="miss" x="' + fx(x - 4.5) + '" y="' + fx(yy - 4.5) + '" width="9" height="9" rx="1.5"/>'
                    : '<circle class="hitdot" cx="' + fx(x) + '" cy="' + fx(yy) + '" r="5"/>';
            }).join("");
            return ('<line class="med" x1="' + fx(c - 46) + '" x2="' + fx(c + 46) + '" y1="' + fx(y(g.median)) + '" y2="' + fx(y(g.median)) + '"/>' +
                pts +
                '<text class="fl" x="' + fx(c) + '" y="' + (bottom + 24) + '" text-anchor="middle">' + esc(g.label) + "</text>" +
                '<text class="ft" x="' + fx(c) + '" y="' + (bottom + 40) + '" text-anchor="middle">' + esc(g.sub) + "</text>");
        }).join("");
        return '<svg viewBox="0 0 ' + W + " " + (bottom + 50) + '" role="img" aria-label="' + esc(F.aria) + '">' + grid + body + "</svg>";
    }
    function line(F) {
        const W = 360, padL = 40, right = 300, top = 30, bottom = 182, H = bottom - top;
        const n = F.x.length, step = (right - padL) / (n - 1);
        const xs = (i) => padL + i * step;
        const y = (v) => bottom - ((v - F.min) / (F.max - F.min)) * H;
        let out = F.ticks.map((t) => '<line class="gl" x1="' + padL + '" x2="' + right + '" y1="' + fx(y(t)) + '" y2="' + fx(y(t)) + '"/>' +
            '<text class="ft" x="' + (padL - 6) + '" y="' + fx(y(t) + 3.5) + '" text-anchor="end">' + fmt(t) + "</text>").join("");
        if (F.bar) {
            out += '<line class="thr" x1="' + padL + '" x2="' + right + '" y1="' + fx(y(F.bar.value)) + '" y2="' + fx(y(F.bar.value)) + '"/>' +
                '<text class="ft" x="' + (padL + 3) + '" y="' + fx(y(F.bar.value) - 4) + '">' + esc(F.bar.label) + "</text>";
        }
        if (F.split) {
            const sx = (xs(F.split.index - 1) + xs(F.split.index)) / 2;
            out += '<line class="sep" x1="' + fx(sx) + '" x2="' + fx(sx) + '" y1="' + (top - 6) + '" y2="' + (bottom + 4) + '"/>' +
                '<text class="ft" x="' + fx(sx - 5) + '" y="' + (top - 12) + '" text-anchor="end">' + esc(F.split.before) + "</text>" +
                '<text class="ft" x="' + fx(sx + 5) + '" y="' + (top - 12) + '">' + esc(F.split.after) + "</text>";
        }
        out += F.series.map((s, si) => {
            const pts = s.values.map((v, i) => fx(xs(i)) + "," + fx(y(v))).join(" ");
            const dots = s.values.map((v, i) => '<circle class="' + (si === 0 ? "ld0" : "ld1") + '" cx="' + fx(xs(i)) + '" cy="' + fx(y(v)) + '" r="3.5"/>').join("");
            const last = s.values.length - 1;
            return '<polyline class="' + (si === 0 ? "ln0" : "ln1") + (s.dashed ? " dash" : "") + '" points="' + pts + '"/>' + dots +
                '<text class="fl" x="' + fx(xs(last) + 9) + '" y="' + fx(y(s.values[last]) + 4 + (s.dy || 0)) + '">' + esc(s.label) + "</text>";
        }).join("");
        out += F.x.map((t, i) => '<text class="ft" x="' + fx(xs(i)) + '" y="' + (bottom + 20) + '" text-anchor="middle">' + esc(t) + "</text>").join("");
        return '<svg viewBox="0 0 ' + W + " " + (bottom + 30) + '" role="img" aria-label="' + esc(F.aria) + '">' + out + "</svg>";
    }
    function bars(F) {
        const rows = F.bars.map((b) => {
            const of = b.of || F.max;
            return ('<div class="hb' + (b.hit ? " hit" : "") + '">' +
                '<span class="bl">' + esc(b.label) + "</span>" +
                '<span class="bt"><i style="width:' + fx((b.value / of) * 100) + '%"></i></span>' +
                '<span class="bv">' + b.value + "/" + of + "</span>" +
                "</div>");
        }).join("");
        return '<div class="hbars" role="img" aria-label="' + esc(F.aria) + '">' + rows + "</div>";
    }
    function flow(F) {
        const items = F.items.map((it) => '<li' + (it.gate ? ' class="gate"' : "") + ">" +
            '<span class="who">' + esc(it.who) + "</span>" +
            "<span>" + esc(it.text) + "</span>" +
            (it.tag ? ' <span class="tag' + (it.tagHit ? " hit" : "") + '">' + esc(it.tag) + "</span>" : "") +
            "</li>").join("");
        return '<ol class="flow" aria-label="' + esc(F.aria) + '">' + items + "</ol>";
    }
    function figure(F) {
        const art = F.kind === "dots" ? dots(F) : F.kind === "line" ? line(F) : F.kind === "bars" ? bars(F) : flow(F);
        return '<figure class="fig">' + art + '<figcaption class="meta">' + rich(F.caption) + "</figcaption></figure>";
    }
    // ---- shared chrome ----------------------------------------------------
    // Each nav item is its own page. aria-current is "page" on the page itself
    // and "true" on a page that sits inside it (a case file inside Case files).
    function navLink(file, label, self, child) {
        const cur = page === self ? ' aria-current="page"' : page === child ? ' aria-current="true"' : "";
        return '<a href="' + file + '"' + cur + ">" + esc(label) + "</a>";
    }
    function header() {
        return ('<header class="bar">' +
            '<a class="brand" href="index.html">' + esc(S.name) + "</a>" +
            '<nav class="nav" aria-label="Main">' +
            navLink("cases.html", S.nav.cases, "cases", "case") +
            navLink("writing.html", S.nav.writing, "writing") +
            navLink("about.html", S.nav.about, "about") +
            navLink("contact.html", S.nav.contact, "contact") +
            "</nav>" +
            "</header>");
    }
    function footerSimple() {
        return ('<footer class="foot">' +
            "<p>" + rich(S.footerNote) + "</p>" +
            '<p class="fine">' + esc(S.footerFine) + "</p>" +
            "</footer>");
    }
    function pager(P, backHref) {
        return ('<nav class="pager" aria-label="' + esc(P.aria) + '">' +
            '<a href="' + backHref + '">' + esc(P.back) + "</a>" +
            (P.nextHref
                ? '<a href="' + esc(P.nextHref) + '">' + esc(P.next) + "</a>"
                : "<span>" + esc(P.next) + "</span>") +
            "</nav>");
    }
    function shell(main, footer) {
        const draft = S.draftNote ? '<p class="draft">' + esc(S.draftNote) + "</p>" : "";
        return ('<a class="skip" href="#main">' + esc(S.skipLink) + "</a>" +
            draft +
            '<div class="wrap">' + header() + '<main id="main">' + main + "</main>" + footer + "</div>");
    }
    function setHead(P) {
        document.title = P.pageTitle;
        let m = document.querySelector('meta[name="description"]');
        if (!m) {
            m = document.createElement("meta");
            m.setAttribute("name", "description");
            document.head.appendChild(m);
        }
        m.setAttribute("content", P.metaDescription);
    }
    // ---- stages -----------------------------------------------------------
    // One page per stage: home, cases, writing, about, contact. A visitor sees
    // one stage at a time and moves between them with the nav.
    function stage(which) {
        const H = C.home;
        const cases = H.cases.items.map((it) => {
            const file = C.caseFiles.find((f) => f.slug === it.slug);
            const title = '<a href="' + esc(it.slug) + '.html">' + esc(it.title) + "</a>";
            let tail = "";
            if (it.meta)
                tail += '<p class="meta">' + rich(it.meta) + "</p>";
            if (it.status)
                tail += '<p class="soon">' + esc(it.status) + "</p>";
            return ('<article class="row case">' +
                '<p class="label">' + esc(it.id) + "</p>" +
                "<div>" +
                "<h3>" + title + "</h3>" +
                "<p>" + esc(it.summary) + "</p>" +
                (file ? strip(file.strip) : "") +
                tail +
                "</div>" +
                "</article>");
        }).join("");
        const paras = H.about.paragraphs.map((p) => "<p>" + rich(p) + "</p>").join("");
        const jobs = H.about.experience.map((e) => '<p><span class="years">' + rich(e.years) + "</span><br>" + rich(e.role) + "</p>").join("");
        const email = H.contact.emailIsDummy ? "[[" + H.contact.email + "]]" : H.contact.email;
        // Stage heading: the h1 names the stage, a lede says what is in it.
        const head = (title, ledeHtml) => '<section class="stagehead"><h1 class="page-title">' + esc(title) + "</h1>" + ledeHtml + "</section>";
        const lede = (html) => '<p class="claim">' + html + "</p>";
        let main;
        let meta = H;
        if (which === "cases") {
            meta = H.cases;
            main = head(H.cases.label, lede(esc(H.cases.intro))) +
                '<section class="list" aria-label="' + esc(H.cases.label) + '">' + cases + "</section>";
        }
        else if (which === "writing") {
            meta = H.writing;
            main = head(H.writing.label, lede(esc(H.writing.intro))) +
                '<p class="soon">' + esc(H.writing.soon) + "</p>";
        }
        else if (which === "about") {
            meta = H.about;
            main = head(H.about.label, H.about.paragraphs.map((p) => lede(rich(p))).join("")) +
                '<section class="list" aria-label="' + esc(H.about.label) + '">' +
                '<div class="row"><p class="label">' + esc(H.about.stackLabel) + "</p>" +
                '<p class="stack">' + esc(H.about.stack) + "</p></div>" +
                '<div class="row"><p class="label">' + esc(H.about.experienceLabel) + "</p><div>" + jobs + "</div></div>" +
                "</section>";
        }
        else if (which === "contact") {
            meta = H.contact;
            const L = H.contact.linkedin;
            main = head(H.contact.label, lede(esc(H.contact.intro))) +
                '<section class="list" aria-label="' + esc(H.contact.label) + '">' +
                '<div class="row"><p class="label">' + esc(H.contact.emailLabel) + "</p>" +
                '<p><a href="mailto:' + esc(H.contact.email) + '">' + rich(email) + "</a></p></div>" +
                (L
                    ? '<div class="row"><p class="label">' + esc(L.label) + "</p>" +
                        '<p><a href="' + esc(L.url) + '" rel="noopener">' + esc(L.text) + "</a></p></div>"
                    : "") +
                "</section>";
        }
        else {
            main =
                '<section class="hero">' +
                    "<h1>" + esc(H.headline) + "</h1>" +
                    '<p class="lede">' + esc(H.lede).replace(/\n/g, "<br>") + "</p>" +
                    '<div class="excerpt">' +
                    '<p class="meta excerpt-cap">' + esc(H.excerptCaption) + "</p>" +
                    figure(H.excerptFigure) +
                    "</div>" +
                    '<p class="go"><a href="cases.html">' + esc(H.casesLink) + "</a>" +
                    '<a class="btn" href="' + esc(H.github.url) + '" rel="noopener">' + esc(H.github.label) + "</a></p>" +
                    "</section>";
        }
        setHead(meta);
        return shell(main, footerSimple());
    }
    // ---- case file --------------------------------------------------------
    function caseFile() {
        const slug = document.body.getAttribute("data-case");
        const F = C.caseFiles.find((f) => f.slug === slug) || C.caseFiles[0];
        const facts = F.facts.map((f) => {
            const body = (f.title ? '<p class="step-title">' + esc(f.title) + "</p>" : "") +
                (f.paragraphs || []).map((p) => "<p>" + rich(p) + "</p>").join("") +
                (f.record
                    ? '<div class="record record-inline"><p class="note">' + esc(f.record.note) + "</p>" +
                        "<pre>" + recordLines(f.record.lines) + "</pre></div>"
                    : "") +
                (f.figure ? figure(f.figure) : "") +
                (f.table ? table(f.table) : "") +
                (f.soon ? '<p class="soon">' + esc(f.soon) + "</p>" : "");
            return '<div class="row"><dt>' + esc(f.label) + "</dt><dd>" + body + "</dd></div>";
        }).join("");
        const legend = F.legend.map((l) => "<li><i" + (LEGEND_CLASS[l.kind] ? ' class="' + LEGEND_CLASS[l.kind] + '"' : "") + "></i>" + esc(l.label) + "</li>").join("");
        const main = '<p class="crumb"><a href="cases.html">' + esc(F.crumbLabel) + "</a> / " + rich(F.crumbTail) + "</p>" +
            '<h1 class="page-title">' + esc(F.title) + "</h1>" +
            '<p class="claim">' + esc(F.claim) + "</p>" +
            '<section class="stage" aria-label="' + esc(F.stageLabel) + '">' +
            strip(F.strip) +
            '<p class="meta strip-caption">' + esc(F.strip.caption) + "</p>" +
            '<ul class="legend">' + legend + "</ul>" +
            "</section>" +
            '<dl class="facts">' + facts + "</dl>" +
            pager(F.pager, "cases.html");
        setHead(F);
        return shell(main, footerSimple());
    }
    app.innerHTML = page === "case" ? caseFile() : stage(page || "home");
})();
