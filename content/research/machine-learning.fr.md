---
title: "Machine Learning & Abstraction"
description: "Apprentissage machine, abstraction, représentation des connaissances, classification interprétable, NLP biomédical."
date: 2024-01-04
tags: ["machine-learning", "abstraction", "NLP", "classification"]
weight: 10
---

{{< lead >}}
De l'apprentissage inductif à l'interprétabilité — développer des modèles qui apprennent, généralisent et expliquent.
{{< /lead >}}

## Vue d'ensemble

Depuis sa thèse de doctorat (Paris 6, 1996), Jean-Daniel Zucker développe des méthodes d'apprentissage machine centrées sur deux questions fondamentales : **comment représenter l'information** pour apprendre efficacement, et **comment rendre les modèles interprétables** pour les utilisateurs experts.

Ces travaux couvrent un large spectre : induction de règles, classification multi-instance, systèmes de scoring, réseaux de neurones profonds pour données biomédicales, et modèles de langage (LLM) spécialisés.

## Contributions Clés

### Abstraction et Changements de Représentation

L'abstraction — la capacité à ignorer les détails non pertinents et à travailler à un niveau de description approprié — est au cœur de l'intelligence, naturelle comme artificielle. Zucker et Saitta ont développé une **théorie formelle de l'abstraction en IA** (livre Springer, 2013 ; *Philosophical Transactions of the Royal Society*, 2003), qui unifie différentes formes d'abstraction : sémantique, structurelle, approximation, etc.

- **"Representation changes for efficient learning in structural domains"** — ICML 1996 (76+ cit.)
- **"A grounded theory of abstraction in artificial intelligence"** — *Phil. Trans. Royal Society B*, 2003 (91+ cit.)
- **"Semantic abstraction for concept representation and learning"** — SARA 1998 (56+ cit.)

### Classification Multi-Instance

Le problème d'apprentissage multi-instance — où les exemples d'entraînement sont des ensembles d'observations plutôt que des observations individuelles — est crucial pour de nombreuses applications médicales et biologiques. Zucker et Wang ont proposé **une approche paresseuse (lazy learning)** qui reste une référence du domaine.

- **"Solving multiple-instance problem: A lazy learning approach"** — ICML 2000 (830+ cit.)
- **"A framework for learning rules from multiple instance data"** — ECML 2001 (55+ cit.)

### Systèmes de Scoring Interprétables

En collaboration avec Yann Chevaleyre (Paris Dauphine), développement de méthodes de classification linéaire entières et de scoring garantissant interprétabilité et performance.

- **"Rounding methods for discrete linear classification"** — ICML 2013 (26+ cit.)
- **"A provable algorithm for learning interpretable scoring systems"** — AISTATS 2018 (26+ cit.)
- **"The accuracy versus interpretability trade-off in fraud detection model"** — *Data & Policy*, 2021 (36+ cit.)

### NLP Biomédical & Modèles de Langage

- **AliBERT** : modèle de langue BERT pré-entraîné sur des corpus médicaux français, présenté au *Workshop on Biomedical NLP (BioNLP)* à ACL 2023.
- **"Interpretable and accurate prediction models for metagenomics data"** — *GigaScience*, 2020 (49+ cit.)

### Apprentissage pour la Robotique et la Perception

- **"Perceptual learning and abstraction in machine learning: an application to autonomous robotics"** — *IEEE Trans. Systems Man Cybernetics*, 2006 (46+ cit.)
- **"A meta-learning approach to ground symbols from visual percepts"** — *Robotics and Autonomous Systems*, 2003 (24+ cit.)

## Collaborateurs Principaux

- **Lorenza Saitta** (Università del Piemonte Orientale) — Abstraction en IA
- **Yann Chevaleyre** (Paris Dauphine PSL) — Classification et scoring
- **Blaise Hanczar** (Université Paris-Saclay) — Bioinformatique et évaluation
- **Edi Prifti** (UMMISCO, IRD) — Métagénomique et ML
