/* Publications loader */
var CITATION_DATA_PATH = window.CITATION_DATA_PATH || 'citation_data.json';
var allPubs = [];
var currentSort = 'citations';

/* UI strings, localised by <html lang> */
var DOC_LANG = (document.documentElement.lang || 'fr').slice(0, 2);
var SCHOLAR_URL = 'https://scholar.google.com/citations?user=bcrbZrEAAAAJ';
var I18N = {
  fr: {
    former: '▶ Voir les 27 anciens doctorants', hide: '▲ Masquer',
    none: 'Aucun résultat.',
    count: function(n) { return n + ' publication' + (n > 1 ? 's' : ''); },
    error: 'Erreur de chargement. <a href="' + SCHOLAR_URL + '" target="_blank">Voir sur Google Scholar</a>.'
  },
  en: {
    former: '▶ Show 27 former PhD students', hide: '▲ Hide',
    none: 'No results.',
    count: function(n) { return n + ' publication' + (n > 1 ? 's' : ''); },
    error: 'Loading error. <a href="' + SCHOLAR_URL + '" target="_blank">View on Google Scholar</a>.'
  },
  zh: {
    former: '▶ 查看27位已畢業博士生', hide: '▲ 收起',
    none: '無結果。',
    count: function(n) { return n + ' 篇論文'; },
    error: '載入錯誤。<a href="' + SCHOLAR_URL + '" target="_blank">在 Google Scholar 上查看</a>。'
  }
};
var T = I18N[DOC_LANG] || I18N.fr;

/* Single shared fetch of citation_data.json (publications, chart, metrics) */
var citationDataPromise = null;
function getCitationData() {
  if (!citationDataPromise) {
    citationDataPromise = fetch(CITATION_DATA_PATH).then(function(r) { return r.json(); });
  }
  return citationDataPromise;
}

function pubLink(p) {
  if (p.url) return p.url;
  return 'https://scholar.google.com/citations?view_op=view_citation&hl=fr&user=bcrbZrEAAAAJ&citation_for_view=' + p.author_pub_id;
}

function renderPubs(list) {
  var el = document.getElementById('pubsContainer');
  var countEl = document.getElementById('pubCount');
  if (countEl) countEl.textContent = T.count(list.length);
  if (!el) return;
  if (!list.length) {
    el.innerHTML = '<p style="color:#6b7280;padding:.75rem 0;">' + T.none + '</p>';
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
    if (cit) h += '<span class="pub-cit">' + cit.toLocaleString(DOC_LANG) + ' cit.</span>';
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
    getCitationData().catch(function() { return {}; }),
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
    container.innerHTML = '<p style="color:#ef4444;">' + T.error + '</p>';
  });
}

/* Former students toggle */
function initFormerStudents() {
  var btn = document.getElementById('formerToggle');
  var panel = document.getElementById('formerPanel');
  if (!btn || !panel) return;
  btn.addEventListener('click', function() {
    var hidden = panel.classList.toggle('hidden');
    btn.textContent = hidden ? T.former : T.hide;
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

/* Dark mode toggle — the `dark` class is set pre-paint by an inline
   <body> script (anti-FOUC); here we only wire the button and icon. */
function initDarkMode() {
  var btn = document.getElementById('darkToggle');
  if (!btn) return;
  btn.textContent = document.body.classList.contains('dark') ? '☀' : '☽';
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
  getCitationData()
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

/* Scholar metrics injected from citation_data.json into [data-metric] spans;
   the hard-coded values in the HTML stay as fallback if the fetch fails. */
function initMetrics() {
  getCitationData().then(function(data) {
    if (!data || !data.citedby) return;
    var vals = {
      'citedby': Number(data.citedby).toLocaleString(DOC_LANG),
      'citedby-k': Math.floor(data.citedby / 1000) + 'k+',
      'hindex': data.hindex,
      'npubs': (data.publications || []).length
    };
    document.querySelectorAll('[data-metric]').forEach(function(el) {
      var v = vals[el.dataset.metric];
      if (v) el.textContent = v;
    });
  }).catch(function() {});
}

document.addEventListener('DOMContentLoaded', function() {
  initPublications();
  initMetrics();
  initFormerStudents();
  initEmails();
  initDarkMode();
  initCitationChart();
});
