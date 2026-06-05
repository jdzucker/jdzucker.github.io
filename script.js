/* Publications loader */
var CITATION_DATA_PATH = window.CITATION_DATA_PATH || 'citation_data.json';
var allPubs = [];
var currentSort = 'citations';

function pubLink(p) {
  if (p.url) return p.url;
  return 'https://scholar.google.com/citations?view_op=view_citation&hl=fr&user=bcrbZrEAAAAJ&citation_for_view=' + p.author_pub_id;
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
    h += '<a href="' + pubLink(p) + '" target="_blank" class="pub-title">' + escHtml(title) + '</a>';
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

  var recentPath = CITATION_DATA_PATH.replace('citation_data.json', 'recent_pubs.json');

  Promise.all([
    fetch(CITATION_DATA_PATH).then(function(r) { return r.json(); }).catch(function() { return {}; }),
    fetch(recentPath).then(function(r) { return r.json(); }).catch(function() { return []; })
  ]).then(function(results) {
    var scholarPubs = (results[0].publications || []).filter(function(p) { return p.bib && p.bib.title; });
    var recentPubs  = (results[1] || []).filter(function(p) { return p.bib && p.bib.title; });
    /* Deduplicate: skip scholar entries already in recentPubs (match by title) */
    var recentTitles = {};
    recentPubs.forEach(function(p) { recentTitles[p.bib.title.toLowerCase()] = true; });
    var filtered = scholarPubs.filter(function(p) { return !recentTitles[p.bib.title.toLowerCase()]; });
    allPubs = applySort(recentPubs.concat(filtered), currentSort);
    if (document.querySelector('[data-sort="citations"]')) {
      document.querySelector('[data-sort="citations"]').classList.add('active');
    }
    filterPubs();
  }).catch(function() {
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

/* Email obfuscation — assembled by JS, never as plain text in HTML */
function initEmails() {
  document.querySelectorAll('[data-email-user]').forEach(function(el) {
    var addr = el.dataset.emailUser + '@' + el.dataset.emailDomain;
    if (el.tagName === 'A') {
      el.href = 'mailto:' + addr;
      if (!el.dataset.emailLabel) el.textContent = addr;
    } else {
      var a = document.createElement('a');
      a.href = 'mailto:' + addr;
      a.textContent = el.dataset.emailLabel || addr;
      a.className = el.className;
      el.parentNode.replaceChild(a, el);
    }
  });
}

/* Dark mode toggle */
function initDarkMode() {
  var btn = document.getElementById('darkToggle');
  if (!btn) return;
  var stored = localStorage.getItem('theme');
  if (stored !== 'light') {
    document.body.classList.add('dark');
    btn.textContent = '☀';
  }
  btn.addEventListener('click', function() {
    var isDark = document.body.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    btn.textContent = isDark ? '☀' : '☽';
  });
}

/* Citation chart */
function initCitationChart() {
  var canvas = document.getElementById('citationsChart');
  if (!canvas || typeof Chart === 'undefined') return;
  fetch(CITATION_DATA_PATH)
    .then(function(r) { return r.json(); })
    .then(function(data) {
      var cpy = data.cites_per_year || {};
      var years = Object.keys(cpy).sort();
      var vals = years.map(function(y) { return cpy[y]; });
      new Chart(canvas.getContext('2d'), {
        type: 'bar',
        data: {
          labels: years,
          datasets: [{ data: vals, backgroundColor: 'rgba(100,116,139,.6)', borderColor: 'rgba(100,116,139,.9)', borderWidth: 1, borderRadius: 3 }]
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false } },
          scales: {
            x: { grid: { display: false }, ticks: { font: { size: 10 } } },
            y: { beginAtZero: true, ticks: { font: { size: 10 } } }
          }
        }
      });
    }).catch(function() {});
}

document.addEventListener('DOMContentLoaded', function() {
  initPublications();
  initFormerStudents();
  initEmails();
  initDarkMode();
  initCitationChart();
});
