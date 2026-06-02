---
title: "Jean-Daniel Zucker"
description: "Directeur de Recherche DRCE · IRD/Sorbonne Université · Intelligence Artificielle · Systèmes Complexes · Métagénomique"
---

{{< lead >}}
Directeur de Recherche de Classe Exceptionnelle — IRD / Sorbonne Université
{{< /lead >}}

---

Jean-Daniel Zucker est ingénieur ISAE-SUPAERO et Docteur en Apprentissage Machine de Sorbonne Université (1996). Ses recherches portent sur l'Intelligence Artificielle et le Machine Learning — interprétatifs ou non — pour la modélisation de systèmes complexes et l'aide à la décision médicale. Il développe des méthodes d'apprentissage statistique et profond pour des problèmes où l'intégration multi-échelle et multi-omique est essentielle. Ses domaines d'application couvrent la métagénomique, la nutrigénomique, l'épidémiologie et les sciences de l'environnement.

Directeur de l'[UMI UMMISCO](https://www.ummisco.fr/) (IRD/Sorbonne Université) de 2014 à 2024, il en est Directeur Adjoint depuis janvier 2025. Il dirige le groupe **Integromics** à l'IHU ICAN et est Professeur d'informatique à Sorbonne Université et Paris Dauphine (PSL).

**25 000+ citations · h-index 57 · 300+ publications** · [Google Scholar](https://scholar.google.com/citations?user=bcrbZrEAAAAJ&hl=fr) · [ResearchGate](https://www.researchgate.net/profile/Jean-Daniel-Zucker)

---

## Intérêts de Recherche

**Intelligence Artificielle & Abstraction** — Changements de représentation, apprentissage inductif, classification multi-instance, systèmes de scoring interprétables, NLP biomédical (AliBERT), apprentissage profond.

**Modélisation Multi-Agents & Systèmes Complexes** — Simulation à base d'agents, plateforme GAMA, modélisation multi-échelle, évacuation de populations, écosystèmes, aide à la décision environnementale.

**Métagénomique & Microbiote Intestinal** — Analyse du microbiome humain, intégration multi-omics, obésité, maladies cardiométaboliques, chirurgie bariatrique, deep learning sur données métagénomiques.

**Médecine de Précision** — Prédiction de rémission du diabète (score Advanced-DiaRem), stratification de patients, bioinformatique, pharmacovigilance, cardiologie (ECG et deep learning).

---

## Postes et Responsabilités

| Période | Poste | Institution |
|:--------|:------|:------------|
| 2025–présent | Directeur Adjoint, UMI UMMISCO | IRD / Sorbonne Université |
| 2014–2024 | Directeur, UMI UMMISCO (72 membres permanents) | IRD / Sorbonne Université |
| 2007–présent | Directeur de Recherche de Classe Exceptionnelle | IRD |
| 2007–présent | Professeur d'informatique | Sorbonne Université & Paris Dauphine PSL |
| 2018–2025 | Senior Consultant en Data Science | Quinten |
| 2010–2015 | Président du Conseil Scientifique (USTH) | Université des Sciences et Technol. de Hanoï |
| 2002–2007 | Professeur d'informatique, co-directeur LIM&BIO | Université Paris 13 |
| 2007–présent | Responsable Integromics (Bioinformatique) | IHU ICAN, Sorbonne Université |

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
Liste complète des publications →
{{< /button >}}

---

## Distinctions

- **Prix La Recherche** (Santé, 2014) — *Nature* 2013 sur la richesse du microbiome
- **Lauréat France-Berkeley Fund** (2003) — projet ObeLinks (obésité et génomique)
- **Lauréat APHP Interface Project** (2014) — APHP / IHU ICAN
- **Prix Möbius** du meilleur multimédia pédagogique (CNRS, 1995) — CD-ROM *Mattéo Ricci*
- **Best Paper Award** ICCE 1993 — Taipei, Taiwan

---

## Encadrement Doctoral

**33 doctorants encadrés** depuis 1997 (13 issus du Sud Global) · 27 thèses soutenues · 6 en cours  
Parmi les anciens : 3 Professeurs, 5 Maîtres de conférences  
Membre de 96 jurys de thèse (22 fois rapporteur, 8 fois président, 27 fois directeur)

{{< button href="/students/" target="_self" >}}
Liste des doctorants →
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
            backgroundColor: 'rgba(249,115,22,0.65)',
            borderColor: 'rgba(249,115,22,0.9)',
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

## Laboratoires Partenaires — UMI UMMISCO

L'UMI UMMISCO est supervisée par sept institutions partenaires (99 membres en 2026) :

| Institution | Pays |
|:------------|:-----|
| Sorbonne Université | 🇫🇷 France |
| Université Cadi Ayyad | 🇲🇦 Maroc |
| Université Cheikh Anta Diop | 🇸🇳 Sénégal |
| Université Gaston Berger | 🇸🇳 Sénégal |
| Université de Yaoundé I | 🇨🇲 Cameroun |
| USTH Hanoï | 🇻🇳 Vietnam |
| IRD | 🇫🇷 France |
