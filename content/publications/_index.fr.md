---
title: "Publications"
description: "Liste complète des publications de Jean-Daniel Zucker — 300+ articles, 25 000+ citations, h-index 57."
type: "page"
showTableOfContents: false
showReadingTime: false
---

{{< lead >}}
300+ publications · 25 000+ citations · h-index 57 · i10-index 137
{{< /lead >}}

<div style="margin:1.5rem 0; display:flex; gap:0.75rem; flex-wrap:wrap;">
  <a href="https://scholar.google.com/citations?user=bcrbZrEAAAAJ&hl=fr&sortby=citations" target="_blank" style="display:inline-flex;align-items:center;gap:0.4rem;padding:0.5rem 1rem;border-radius:0.5rem;background:rgba(100,116,139,0.1);border:1px solid rgba(100,116,139,0.4);text-decoration:none;font-size:0.875rem;font-weight:600;">Google Scholar</a>
  <a href="https://www.researchgate.net/profile/Jean-Daniel-Zucker" target="_blank" style="display:inline-flex;align-items:center;gap:0.4rem;padding:0.5rem 1rem;border-radius:0.5rem;background:rgba(100,116,139,0.1);border:1px solid rgba(100,116,139,0.4);text-decoration:none;font-size:0.875rem;font-weight:600;">ResearchGate</a>
  <a href="https://dblp.org/search?q=zucker+jean-daniel" target="_blank" style="display:inline-flex;align-items:center;gap:0.4rem;padding:0.5rem 1rem;border-radius:0.5rem;background:rgba(100,116,139,0.1);border:1px solid rgba(100,116,139,0.4);text-decoration:none;font-size:0.875rem;font-weight:600;">DBLP</a>
</div>

---

<input id="pubSearch" type="text" placeholder="Rechercher par titre, revue, année…" style="width:100%;padding:0.65rem 1rem;border-radius:0.5rem;border:1px solid rgba(100,116,139,0.4);background:transparent;font-size:0.9rem;outline:none;box-sizing:border-box;" oninput="filterPubs()">

<div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin:0.75rem 0;font-size:0.8rem;">
  <button onclick="sortPubs('citations')" style="padding:0.3rem 0.75rem;border-radius:0.4rem;border:1px solid rgba(100,116,139,0.4);background:rgba(100,116,139,0.1);cursor:pointer;font-size:0.8rem;">↓ Citations</button>
  <button onclick="sortPubs('year_desc')" style="padding:0.3rem 0.75rem;border-radius:0.4rem;border:1px solid rgba(100,116,139,0.4);background:rgba(100,116,139,0.1);cursor:pointer;font-size:0.8rem;">↓ Récent</button>
  <button onclick="sortPubs('year_asc')" style="padding:0.3rem 0.75rem;border-radius:0.4rem;border:1px solid rgba(100,116,139,0.4);background:rgba(100,116,139,0.1);cursor:pointer;font-size:0.8rem;">↑ Ancien</button>
  <span id="pubCount" style="margin-left:auto;padding:0.3rem 0;opacity:0.6;font-size:0.8rem;"></span>
</div>

<div id="pubsContainer" style="font-size:0.875rem;">
  <div style="text-align:center;padding:2rem;opacity:0.6;">Chargement…</div>
</div>

<script>
var allPubs = [];
function scholarLink(id) {
  return 'https://scholar.google.com/citations?view_op=view_citation&hl=fr&user=bcrbZrEAAAAJ&citation_for_view=' + id;
}
function renderPubs(list) {
  var el = document.getElementById('pubsContainer');
  document.getElementById('pubCount').textContent = list.length + ' publication(s)';
  if (!list.length) { el.innerHTML = '<div style="padding:2rem;text-align:center;opacity:0.6;">Aucun résultat.</div>'; return; }
  var h = '';
  list.forEach(function(p) {
    var title = (p.bib && p.bib.title) || '—';
    var year  = (p.bib && p.bib.pub_year) || '—';
    var venue = (p.bib && p.bib.citation) || '';
    var cit   = p.num_citations || 0;
    var badge = cit ? '<span style="flex-shrink:0;padding:0.15rem 0.5rem;border-radius:999px;background:rgba(100,116,139,0.15);font-size:0.75rem;font-weight:700;white-space:nowrap;">' + cit.toLocaleString() + ' cit.</span>' : '';
    h += '<div style="border-bottom:1px solid rgba(100,116,139,0.15);padding:0.8rem 0;display:flex;gap:1rem;align-items:baseline;">';
    h += '<div style="min-width:2.5rem;text-align:right;opacity:0.4;font-size:0.78rem;">' + year + '</div>';
    h += '<div style="flex:1;"><a href="' + scholarLink(p.author_pub_id) + '" target="_blank" style="font-weight:600;text-decoration:none;color:inherit;line-height:1.4;">' + title + '</a>';
    if (venue) h += '<div style="margin-top:0.2rem;opacity:0.55;font-size:0.78rem;">' + venue + '</div>';
    h += '</div>' + badge + '</div>';
  });
  el.innerHTML = h;
}
function sortPubs(m) {
  var s = allPubs.slice();
  if (m === 'citations') s.sort(function(a,b){ return (b.num_citations||0)-(a.num_citations||0); });
  else if (m === 'year_desc') s.sort(function(a,b){ return parseInt(b.bib&&b.bib.pub_year||0)-parseInt(a.bib&&a.bib.pub_year||0); });
  else s.sort(function(a,b){ return parseInt(a.bib&&a.bib.pub_year||0)-parseInt(b.bib&&b.bib.pub_year||0); });
  allPubs = s; filterPubs();
}
function filterPubs() {
  var q = (document.getElementById('pubSearch').value||'').toLowerCase();
  renderPubs(q ? allPubs.filter(function(p){ return ((p.bib&&p.bib.title||'')+(p.bib&&p.bib.citation||'')+(p.bib&&p.bib.pub_year||'')).toLowerCase().indexOf(q) >= 0; }) : allPubs);
}
fetch('/citation_data.json').then(function(r){return r.json();}).then(function(d){
  allPubs = (d.publications||[]).filter(function(p){return p.bib&&p.bib.title;});
  sortPubs('citations');
}).catch(function(){ document.getElementById('pubsContainer').innerHTML='<div style="padding:1rem;color:#ef4444;">Erreur de chargement. <a href="https://scholar.google.com/citations?user=bcrbZrEAAAAJ" target="_blank">Voir sur Google Scholar</a>.</div>'; });
</script>
