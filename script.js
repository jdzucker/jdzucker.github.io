/* Publications loader */
var CITATION_DATA_PATH = window.CITATION_DATA_PATH || 'citation_data.json';
var allPubs = [];
var currentSort = 'citations';

function scholarLink(id) {
  return 'https://scholar.google.com/citations?view_op=view_citation&hl=fr&user=bcrbZrEAAAAJ&citation_for_view=' + id;
}

function renderPubs(list) {
  var el = document.getElementById('pubsContainer');
  var countEl = document.getElementById('pubCount');
  if (countEl) countEl.textContent = list.length + ' publication' + (list.length > 1 ? 's' : '');
  if (!el) return;
  if (!list.length) {
    el.innerHTML = '<p style="color:#6b7280;padding:.75rem 0;">Aucun résultat.</p>';
    return;
  }
  var h = '';
  list.forEach(function(p) {
    var title = (p.bib && p.bib.title) || '—';
    var year  = (p.bib && p.bib.pub_year) || '—';
    var venue = (p.bib && p.bib.citation) || '';
    var cit   = p.num_citations || 0;
    h += '<div class="pub-item">';
    h += '<span class="pub-year">' + year + '</span>';
    h += '<div class="pub-body">';
    h += '<a href="' + scholarLink(p.author_pub_id) + '" target="_blank" class="pub-title">' + escHtml(title) + '</a>';
    if (venue) h += '<div class="pub-venue">' + escHtml(venue) + '</div>';
    h += '</div>';
    if (cit) h += '<span class="pub-cit">' + cit.toLocaleString('fr') + ' cit.</span>';
    h += '</div>';
  });
  el.innerHTML = h;
}

function escHtml(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function applySort(list, method) {
  var s = list.slice();
  if (method === 'citations') s.sort(function(a,b){ return (b.num_citations||0)-(a.num_citations||0); });
  else if (method === 'year_desc') s.sort(function(a,b){ return parseInt(b.bib&&b.bib.pub_year||0) - parseInt(a.bib&&a.bib.pub_year||0); });
  else s.sort(function(a,b){ return parseInt(a.bib&&a.bib.pub_year||0) - parseInt(b.bib&&b.bib.pub_year||0); });
  return s;
}

function sortPubs(method) {
  currentSort = method;
  document.querySelectorAll('.sort-btn').forEach(function(b) { b.classList.remove('active'); });
  var btn = document.querySelector('[data-sort="' + method + '"]');
  if (btn) btn.classList.add('active');
  allPubs = applySort(allPubs, method);
  filterPubs();
}

function filterPubs() {
  var q = ((document.getElementById('pubSearch') || {}).value || '').toLowerCase();
  var list = q ? allPubs.filter(function(p) {
    return ((p.bib&&p.bib.title||'')+(p.bib&&p.bib.citation||'')+(p.bib&&p.bib.pub_year||'')).toLowerCase().indexOf(q) >= 0;
  }) : allPubs;
  renderPubs(list);
}

function initPublications() {
  var container = document.getElementById('pubsContainer');
  if (!container) return;

  document.querySelectorAll('.sort-btn').forEach(function(btn) {
    btn.addEventListener('click', function() { sortPubs(btn.dataset.sort); });
  });

  fetch(CITATION_DATA_PATH)
    .then(function(r) { return r.json(); })
    .then(function(data) {
      allPubs = applySort(
        (data.publications || []).filter(function(p) { return p.bib && p.bib.title; }),
        currentSort
      );
      if (document.querySelector('[data-sort="citations"]')) {
        document.querySelector('[data-sort="citations"]').classList.add('active');
      }
      filterPubs();
    })
    .catch(function() {
      container.innerHTML = '<p style="color:#ef4444;">Erreur de chargement. <a href="https://scholar.google.com/citations?user=bcrbZrEAAAAJ" target="_blank">Voir sur Google Scholar</a>.</p>';
    });
}

/* Former students toggle */
function initFormerStudents() {
  var btn = document.getElementById('formerToggle');
  var panel = document.getElementById('formerPanel');
  if (!btn || !panel) return;
  btn.addEventListener('click', function() {
    var hidden = panel.classList.toggle('hidden');
    btn.textContent = hidden ? '▶ Voir les 27 anciens doctorants' : '▲ Masquer';
  });
}

document.addEventListener('DOMContentLoaded', function() {
  initPublications();
  initFormerStudents();
});
