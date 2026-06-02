---
title: "Jean-Daniel Zucker"
description: "Directeur de Recherche DRCE · IRD/Sorbonne Université · Intelligence Artificielle · Systèmes Complexes · Métagénomique"
---

Jean-Daniel Zucker est ingénieur ISAE-SUPAERO et Docteur en Apprentissage Machine (Sorbonne Université, 1996). Ses recherches portent sur l'IA et le Machine Learning supervisés et non-supervisés pour la modélisation de systèmes complexes et l'aide à la décision médicale. Ses applications couvrent la métagénomique, la nutrigénomique, l'épidémiologie et les sciences de l'environnement.

**25 000+ citations · h-index 57 · 300+ publications** · [Google Scholar](https://scholar.google.com/citations?user=bcrbZrEAAAAJ&hl=fr) · [ResearchGate](https://www.researchgate.net/profile/Jean-Daniel-Zucker)

---

## Intérêts de Recherche

**Intelligence Artificielle & Abstraction** — Apprentissage inductif, changements de représentation, classification multi-instance, scoring interprétable, NLP biomédical (AliBERT), apprentissage profond.

**Modélisation Multi-Agents & Systèmes Complexes** — Simulation à base d'agents, plateforme GAMA, modélisation multi-échelle, évacuation de populations, aide à la décision environnementale.

**Métagénomique & Microbiote Intestinal** — Analyse du microbiome humain, intégration multi-omics, obésité, maladies cardiométaboliques, chirurgie bariatrique.

**Médecine de Précision** — Prédiction de rémission du diabète (Advanced-DiaRem), stratification de patients, cardiologie et ECG par deep learning.

---

## Publications Représentatives

| Référence | Revue | Année | Citations |
|:----------|:------|:-----:|----------:|
| Le Chatelier *et al.* — Richness of human gut microbiome correlates with metabolic markers | *Nature* 500 | 2013 | 5 000+ |
| Cotillard *et al.* — Dietary intervention impact on gut microbial gene richness | *Nature* 500 | 2013 | 2 100+ |
| Dao *et al.* — *Akkermansia muciniphila* and improved metabolic health during dietary intervention in obesity | *Gut* 65 | 2016 | 1 900+ |
| Cancello *et al.* — Reduction of macrophage infiltration in white adipose tissue after weight loss | *Diabetes* 54 | 2005 | 1 400+ |
| Wang & Zucker — Solving multiple-instance problem: A lazy learning approach | ICML | 2000 | 830+ |
| Vieira-Silva *et al.* — Statin therapy associated with lower prevalence of gut microbiota dysbiosis | *Nature* 581 | 2020 | 390+ |
| Forslund *et al.* — Combinatorial, additive and dose-dependent drug–microbiome associations | *Nature* 600 | 2021 | 171+ |
| Fromentin *et al.* — Microbiome and metabolome features of the cardiometabolic disease spectrum | *Nature Medicine* 28 | 2022 | 151+ |

{{< button href="/publications/" target="_self" >}}
Toutes les publications →
{{< /button >}}

---

## Évolution des Citations (Google Scholar)

<div style="max-width:680px; margin:1.5rem auto 1rem;">
  <canvas id="citationsChart"></canvas>
</div>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
(function() {
  fetch('/citation_data.json')
    .then(function(r) { return r.json(); })
    .then(function(data) {
      var cpy = data.cites_per_year || {};
      var years = Object.keys(cpy).sort();
      var vals = years.map(function(y){ return cpy[y]; });
      var ctx = document.getElementById('citationsChart').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: years,
          datasets: [{
            data: vals,
            backgroundColor: 'rgba(100,116,139,0.65)',
            borderColor: 'rgba(100,116,139,0.9)',
            borderWidth: 1,
            borderRadius: 3
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
            title: { display: true, text: 'Citations par année (Google Scholar)', font: { size: 13 } }
          },
          scales: {
            x: { title: { display: true, text: 'Année' } },
            y: { title: { display: true, text: 'Citations' }, beginAtZero: true }
          }
        }
      });
    })
    .catch(function(e){ console.error(e); });
})();
</script>

---

## UMI UMMISCO — Institutions Partenaires

| Institution | Pays |
|:------------|:-----|
| Sorbonne Université | 🇫🇷 France |
| Université Cadi Ayyad | 🇲🇦 Maroc |
| Université Cheikh Anta Diop | 🇸🇳 Sénégal |
| Université Gaston Berger | 🇸🇳 Sénégal |
| Université de Yaoundé I | 🇨🇲 Cameroun |
| USTH Hanoï | 🇻🇳 Vietnam |
