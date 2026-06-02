---
title: "Publications"
description: "Liste complète des publications de Jean-Daniel Zucker — 240+ articles, livres et chapitres, 25 000+ citations, h-index 57."
showTableOfContents: false
showReadingTime: false
---

{{< lead >}}
240+ publications · 25 000+ citations · h-index 57 · i10-index 137
{{< /lead >}}

<div style="margin:1.5rem 0; display:flex; gap:1rem; flex-wrap:wrap;">
  <a href="https://scholar.google.com/citations?user=bcrbZrEAAAAJ&hl=fr&sortby=citations" target="_blank" style="display:inline-flex; align-items:center; gap:0.4rem; padding:0.5rem 1rem; border-radius:0.5rem; background:rgba(249,115,22,0.1); border:1px solid rgba(249,115,22,0.4); text-decoration:none; font-size:0.875rem; font-weight:600;">
    📚 Google Scholar
  </a>
  <a href="https://www.researchgate.net/profile/Jean-Daniel-Zucker" target="_blank" style="display:inline-flex; align-items:center; gap:0.4rem; padding:0.5rem 1rem; border-radius:0.5rem; background:rgba(249,115,22,0.1); border:1px solid rgba(249,115,22,0.4); text-decoration:none; font-size:0.875rem; font-weight:600;">
    🔬 ResearchGate
  </a>
  <a href="https://dblp.org/search?q=zucker+jean-daniel" target="_blank" style="display:inline-flex; align-items:center; gap:0.4rem; padding:0.5rem 1rem; border-radius:0.5rem; background:rgba(249,115,22,0.1); border:1px solid rgba(249,115,22,0.4); text-decoration:none; font-size:0.875rem; font-weight:600;">
    📖 DBLP
  </a>
</div>

---

<div style="margin:1rem 0;">
  <input id="pubSearch" type="text" placeholder="🔍 Rechercher par titre, revue, année..." style="width:100%; padding:0.75rem 1rem; border-radius:0.5rem; border:1px solid rgba(249,115,22,0.4); background:transparent; font-size:0.9rem; outline:none; box-sizing:border-box;" oninput="filterPubs()">
</div>

<div style="display:flex; gap:0.5rem; flex-wrap:wrap; margin-bottom:1rem; font-size:0.8rem;">
  <button onclick="sortPubs('citations')" style="padding:0.35rem 0.75rem; border-radius:0.4rem; border:1px solid rgba(249,115,22,0.4); background:rgba(249,115,22,0.1); cursor:pointer; font-size:0.8rem;">
    ↓ Citations
  </button>
  <button onclick="sortPubs('year_desc')" style="padding:0.35rem 0.75rem; border-radius:0.4rem; border:1px solid rgba(249,115,22,0.4); background:rgba(249,115,22,0.1); cursor:pointer; font-size:0.8rem;">
    ↓ Année (récent)
  </button>
  <button onclick="sortPubs('year_asc')" style="padding:0.35rem 0.75rem; border-radius:0.4rem; border:1px solid rgba(249,115,22,0.4); background:rgba(249,115,22,0.1); cursor:pointer; font-size:0.8rem;">
    ↑ Année (ancien)
  </button>
  <span id="pubCount" style="margin-left:auto; padding:0.35rem 0; opacity:0.6;"></span>
</div>

<div id="pubsContainer" style="font-size:0.9rem;">
  <div style="text-align:center; padding:2rem; opacity:0.6;">Chargement des publications…</div>
</div>

<script>
var allPubs = [];
var currentSort = 'citations';

function buildScholarLink(authorPubId) {
  return 'https://scholar.google.com/citations?view_op=view_citation&hl=fr&user=bcrbZrEAAAAJ&citation_for_view=' + authorPubId;
}

function renderPubs(pubs) {
  var container = document.getElementById('pubsContainer');
  document.getElementById('pubCount').textContent = pubs.length + ' publication(s)';
  if (pubs.length === 0) {
    container.innerHTML = '<div style="text-align:center;padding:2rem;opacity:0.6;">Aucune publication trouvée.</div>';
    return;
  }
  var html = '';
  for (var i = 0; i < pubs.length; i++) {
    var p = pubs[i];
    var title = p.bib && p.bib.title ? p.bib.title : '(Sans titre)';
    var year = p.bib && p.bib.pub_year ? p.bib.pub_year : '—';
    var venue = p.bib && p.bib.citation ? p.bib.citation : '';
    var citations = p.num_citations || 0;
    var link = buildScholarLink(p.author_pub_id);
    var citBadge = citations > 0
      ? '<span style="display:inline-block;padding:0.15rem 0.5rem;border-radius:999px;background:rgba(249,115,22,0.15);color:#f97316;font-size:0.75rem;font-weight:700;white-space:nowrap;">' + citations.toLocaleString() + ' cit.</span>'
      : '';
    html += '<div style="border-bottom:1px solid rgba(249,115,22,0.1);padding:0.9rem 0;display:flex;gap:1rem;align-items:baseline;">';
    html += '<div style="min-width:2.5rem;text-align:right;opacity:0.45;font-size:0.8rem;font-variant-numeric:tabular-nums;">' + year + '</div>';
    html += '<div style="flex:1;">';
    html += '<a href="' + link + '" target="_blank" style="font-weight:600;text-decoration:none;color:inherit;line-height:1.4;">' + title + '</a>';
    if (venue) {
      html += '<div style="margin-top:0.2rem;opacity:0.6;font-size:0.8rem;line-height:1.3;">' + venue + '</div>';
    }
    html += '</div>';
    if (citBadge) html += '<div style="flex-shrink:0;">' + citBadge + '</div>';
    html += '</div>';
  }
  container.innerHTML = html;
}

function sortPubs(method) {
  currentSort = method;
  var sorted = allPubs.slice();
  if (method === 'citations') {
    sorted.sort(function(a,b) { return (b.num_citations||0) - (a.num_citations||0); });
  } else if (method === 'year_desc') {
    sorted.sort(function(a,b) { return parseInt(b.bib&&b.bib.pub_year||0) - parseInt(a.bib&&a.bib.pub_year||0); });
  } else if (method === 'year_asc') {
    sorted.sort(function(a,b) { return parseInt(a.bib&&a.bib.pub_year||0) - parseInt(b.bib&&b.bib.pub_year||0); });
  }
  allPubs = sorted;
  filterPubs();
}

function filterPubs() {
  var q = (document.getElementById('pubSearch').value || '').toLowerCase();
  if (!q) { renderPubs(allPubs); return; }
  var filtered = allPubs.filter(function(p) {
    var title = (p.bib && p.bib.title || '').toLowerCase();
    var venue = (p.bib && p.bib.citation || '').toLowerCase();
    var year = (p.bib && p.bib.pub_year || '').toString();
    return title.indexOf(q) >= 0 || venue.indexOf(q) >= 0 || year.indexOf(q) >= 0;
  });
  renderPubs(filtered);
}

fetch('/citation_data.json')
  .then(function(r) { return r.json(); })
  .then(function(data) {
    allPubs = (data.publications || []).filter(function(p) { return p.bib && p.bib.title; });
    sortPubs('citations');
  })
  .catch(function(e) {
    document.getElementById('pubsContainer').innerHTML = '<div style="padding:1rem;color:#ef4444;">Erreur de chargement. <a href="https://scholar.google.com/citations?user=bcrbZrEAAAAJ" target="_blank">Voir sur Google Scholar</a>.</div>';
    console.error(e);
  });
</script>
