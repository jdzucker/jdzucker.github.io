# Code review — jdzucker.github.io

Date : 10 juillet 2026. Périmètre : pages HTML (FR/EN/ZH), `script.js`, `style.css`, workflows GitHub Actions, script Python de récupération Scholar, configuration git.

Verdict global : le site statique lui-même (HTML/CSS/JS) est propre, léger et bien organisé. Les problèmes sérieux sont concentrés dans la chaîne de mise à jour automatique des citations (`fetch_citation_data.py` + `fetch_citation_data.yml`), qui est aujourd'hui cassée à plusieurs niveaux, et dans deux modifications locales non commitées qui introduisent des régressions.

---

## 🔴 Critique

### 1. `fetch_citation_data.py` écrase les données par un JSON invalide
`assets/scripts/fetch_citation_data.py:60-66`

Le script écrit d'abord le profil Scholar complet dans `citation_data.json` (ligne 32-33), ce qui est le bon format, puis il l'écrase avec :

```python
data = json.dumps({"citations_per_year": citations_per_year})
with open(OUTPUT_FILE, "w") as f:
    json.dump(data, f, indent=4)   # json.dump d'une chaîne déjà encodée
```

Trois problèmes cumulés :
- **Double encodage** : `json.dump` appliqué à une chaîne produite par `json.dumps` produit une chaîne JSON, pas un objet. Côté front, `r.json()` renverrait une string, et `results[0].publications` serait `undefined`.
- **Mauvaise clé** : le front (`script.js:106,170`) attend `publications` et `cites_per_year`; le script écrit `citations_per_year` et rien d'autre.
- **Perte des publications** : la liste des publications disparaît du fichier.

Si le cron du dimanche aboutissait, il **casserait la section Publications et le graphique de citations du site**. Le fichier `static/citation_data.json` actuellement en ligne est correct uniquement parce qu'il a été généré autrement. Correctif : supprimer la seconde écriture (lignes 47-68) et ne garder que le dump du profil complet.

### 2. Le workflow n'installe pas les dépendances du script
`.github/workflows/fetch_citation_data.yml:22`

Le workflow fait `pip install scholarly` alors que le script importe `matplotlib` (et `requests`/`bs4`, tirés indirectement par scholarly). `matplotlib` n'étant pas une dépendance de scholarly, le script plante à l'import (`ImportError`) avant même le `try`. Un fichier `assets/scripts/requirements.txt` existe (matplotlib, scholarly) mais n'est pas utilisé.

Correctif recommandé : soit `pip install -r assets/scripts/requirements.txt`, soit (mieux) retirer complètement matplotlib du script, le tracé `Visu.png` ne sert à rien en CI, et `plt.show()` est inopérant en environnement headless (`fetch_citation_data.py:37-46`).

### 3. `[skip ci]` empêche la publication des données mises à jour
`.github/workflows/fetch_citation_data.yml:36`

Le commit automatique porte le message `chore: update citation data [skip ci]`. Or le déploiement GitHub Pages (`gh-pages.yml`) se déclenche sur `push` vers `main`. Résultat : même si la récupération fonctionnait, **les nouvelles données ne seraient jamais déployées** avant le prochain push manuel. Correctif : retirer `[skip ci]` (le déploiement est justement l'effet voulu), ou déclencher explicitement le workflow Pages via `workflow_call`/`repository_dispatch`.

### 4. Échec silencieux du fetch : le workflow reste vert
`assets/scripts/fetch_citation_data.py:70-71` et `fetch_citation_data.yml:29`

Le `try/except Exception` se contente d'un `print` et sort avec le code 0. Combiné au `[ -f citation_data.json ] && mv ... || true` du workflow, un échec de scraping (fréquent : Google Scholar bloque régulièrement les IP GitHub) passe totalement inaperçu. Correctif : `raise` ou `sys.exit(1)` dans le `except`, et supprimer le `|| true` pour que l'étape échoue franchement.

### 5. `.gitignore` : la règle `*.md` (non commitée) ignore toute la documentation
`.gitignore:4`

La ligne `*.md` ajoutée localement ignore README.md, PourMAJ.md, QuickStart.md et tout futur fichier Markdown (y compris ce rapport). Les fichiers déjà suivis (README.md, PourMAJ.md) restent versionnés, mais `QuickStart.md` n'est **pas suivi** et ne pourra jamais être commité. C'est très probablement involontaire : à retirer, ou à restreindre au fichier précis visé.

---

## 🟠 Important

### 6. `gh-pages.yml` : modifications locales redondantes
`.github/workflows/gh-pages.yml:33-34` (diff non commité)

Les deux lignes ajoutées dupliquent des copies déjà présentes juste au-dessus : `cp recent_pubs.json _site/` (déjà ligne 31) et la copie de `img/` (déjà ligne 32, avec le même effet). Elles n'apportent rien et l'une a du whitespace en fin de ligne. Recommandation : `git checkout -- .github/workflows/gh-pages.yml`.

### 7. Chart.js chargé sans version épinglée ni SRI
`index.html:236`, `en/index.html:225`, `zh/index.html:530`

`https://cdn.jsdelivr.net/npm/chart.js` sert **la dernière version majeure publiée** : une future v5 avec rupture d'API pourrait casser le graphique du jour au lendemain, sans aucun commit de votre part. Le script est aussi chargé de façon bloquante au milieu du `<body>`. Correctif :

```html
<script defer src="https://cdn.jsdelivr.net/npm/chart.js@4.4.9/dist/chart.umd.min.js"
        integrity="sha384-…" crossorigin="anonymous"></script>
```

placé dans le `<head>` avec `defer` (l'init est déjà dans `DOMContentLoaded`, donc compatible). Alternative plus robuste : vendorer le fichier dans le dépôt.

### 8. Valeurs injectées dans le HTML sans échappement complet
`script.js:54,52,57`

`renderPubs` échappe `title` et `venue` via `escHtml`, mais pas :
- l'attribut `href` (`pubLink(p)` : `p.url` ou `p.author_pub_id` bruts) ;
- `year` (`p.bib.pub_year`).

Les données viennent de vos propres JSON, le risque réel est donc faible, mais un guillemet dans une URL suffirait à casser le markup, et une entrée `url` malveillante permettrait un XSS. Échapper systématiquement (`escHtml` sur tout ce qui entre dans le HTML) et valider que `p.url` commence par `http`.

### 9. SEO multilingue incomplet
`index.html`, `en/index.html`, `zh/index.html` (têtes de document)

Pour un site en trois langues, il manque :
- `<link rel="alternate" hreflang="fr|en|zh" href="…">` + `hreflang="x-default"` sur chaque page ;
- `<link rel="canonical">` ;
- `sitemap.xml` et `robots.txt` ;
- balises Open Graph / Twitter Card (`og:title`, `og:image`, etc.) pour le partage sur les réseaux, dommage vu la qualité du JSON-LD déjà en place.

Sans hreflang, Google peut indexer la mauvaise langue pour un utilisateur donné.

### 10. Compteur « 27 anciens doctorants » codé en dur à 5 endroits
`script.js:11,17,23` + libellé du bouton dans `index.html:373` (idem EN/ZH)

À la prochaine soutenance, il faudra penser à mettre à jour 3 chaînes i18n + 3 boutons HTML + le tableau. Correctif simple : compter les lignes du tableau au chargement (`document.querySelectorAll('#formerPanel tbody tr').length`) et injecter ce nombre dans le libellé.

---

## 🟡 Mineur

### 11. `citation_data.json` (216 Ko) téléchargé deux fois
`script.js:103` et `script.js:167` : `initPublications` et `initCitationChart` font chacun leur `fetch` du même fichier. Le cache navigateur limite la casse, mais un seul fetch partagé (promesse mémoïsée) serait trivial.

### 12. Échec total de chargement affiché comme « 0 résultat »
`script.js:103-104` : les `.catch` par fichier renvoient `{}`/`[]`, donc si les deux fetch échouent, l'utilisateur voit « Aucun résultat » au lieu du message d'erreur avec lien Scholar (`script.js:117-119`), qui est de fait inatteignable. Détecter le cas « les deux vides » et afficher `T.error`.

### 13. Métriques codées en dur alors que les données existent
« 25 229 cit. · h 57 » apparaît en dur dans la sidebar, la section Publications et les meta descriptions, × 3 langues (`index.html:7,101,265`…). `citation_data.json` contient `citedby` et `hindex` : les injecter au chargement éviterait la dérive (ou au minimum, documenter dans PourMAJ.md la liste des endroits à mettre à jour).

### 14. Détails i18n
- `script.js:57` : `toLocaleString('fr')` en dur, sur la page EN cela affiche « 25 229 » avec espace insécable française au lieu de « 25,229 ». Utiliser `DOC_LANG`.
- `script.js:33` : `hl=fr` en dur dans les liens Scholar, y compris pour EN/ZH.
- `script.js:23` : les chaînes ZH sont en caractères traditionnels (查看…已畢業) alors qu'une partie du contenu de `zh/index.html` est en simplifié, à harmoniser selon le public visé.

### 15. `target="_blank"` sans `rel="noopener noreferrer"`
~92 occurrences sur les 3 pages + liens générés par JS (`script.js:54`). Les navigateurs modernes appliquent `noopener` implicitement, mais l'ajouter explicitement reste la bonne pratique (et `noreferrer` évite de fuiter le referer).

### 16. Obfuscation email partiellement illusoire
`index.html:110-112` : l'adresse figure en clair dans `data-email-user`/`data-email-domain` et dans le texte « jean-daniel.zucker [at] ird.fr ». Tout harvester correct la reconstituera. Le commentaire de `script.js:133` (« never as plain text in HTML ») ne correspond pas à la réalité. Soit assumer (l'adresse est publique par ailleurs), soit encoder réellement (ex. ROT13 assemblé par JS).

### 17. Preconnect incomplet pour Google Fonts
`index.html:11` : preconnect vers `fonts.googleapis.com` seulement. Les fichiers de police viennent de `fonts.gstatic.com` : ajouter `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>`.

### 18. Prévisualisation locale cassée pour les publications
En local, `citation_data.json` n'existe qu'en `static/`, alors que les pages le cherchent à la racine (copie faite seulement au déploiement, `gh-pages.yml:30`). Un `ln -s static/citation_data.json citation_data.json` local ou une note dans QuickStart.md éviterait la confusion.

### 19. Nettoyage du script Python
`fetch_citation_data.py` : imports inutilisés (`requests`, `BeautifulSoup`, constante `URL`), double import de datetime (`import datetime` puis `from datetime import datetime`, le second masquant le premier), et le calcul « new citations this month » (lignes 49-58) soustrait le total de l'année N-1 au total de l'année N, ce qui ne mesure pas un flux mensuel. À élaguer, le script n'a besoin que de scholarly + json.

### 20. Duplication trilingue des pages
Choix assumé (3 fichiers HTML complets), acceptable pour un CV, mais chaque correction structurelle doit être reportée 3 fois : la présente review a par exemple relevé que le FR ne définit pas `window.CITATION_DATA_PATH` (comportement par défaut correct, mais asymétrique avec EN/ZH). Si la maintenance devient pesante, un mini-générateur (templates + JSON de contenu) serait rentable.

---

## Points positifs

- JS vanilla sans framework, lisible, avec i18n propre pilotée par `<html lang>` ; pas de dépendance hormis Chart.js.
- Anti-FOUC dark mode bien fait (classe posée avant le premier paint, `localStorage` dans un `try/catch`).
- `escHtml` présent pour les champs principaux ; dédoublonnage recent_pubs/Scholar par titre malin.
- JSON-LD `Person` complet avec ORCID/Scopus/Scholar, rare sur un site de CV.
- Workflow Pages moderne (artifact + `deploy-pages@v4`, permissions minimales, concurrency).
- CSS bien structuré : variables, dark mode par surcharge de `:root`-like sur `body.dark`, responsive à deux breakpoints.

## Actions recommandées, par ordre de priorité

1. Réparer `fetch_citation_data.py` (supprimer la seconde écriture) et le workflow (dépendances, `[skip ci]`, échec silencieux), puis déclencher un run manuel pour valider.
2. Retirer `*.md` du `.gitignore` et annuler le diff redondant de `gh-pages.yml`.
3. Épingler la version de Chart.js (+ `defer` + SRI).
4. Ajouter hreflang/canonical/OG sur les 3 pages.
5. Le reste (mineurs) au fil de l'eau.
