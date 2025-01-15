---
title: "Bienvenu à sur ma page! :hugs:"
description: "Pas encore sur de ce que je vais mettre ici."
---
{{< typeit >}}
La véritable science enseigne, par-dessus tout, à douter et à s'interroger. — Anatole France
{{< /typeit >}}

{{< lead >}}
诸葛梁
{{< /lead >}}


Je suis **Directeur de Recherche de Classe Exceptionnelle** à l'IRD (Institut de Recherche pour le Développement). Depuis 2014, je dirige le laboratoire international **UMI UMMISCO** (Unité Mixte Internationale sur la Modélisation Mathématique et Informatique des Systèmes Complexes). Ce laboratoire, financé par l'IRD et Sorbonne Université, est supervisé par cinq institutions partenaires :

- **Université Cadi Ayyad (Maroc)**
- **Université Cheikh Anta Diop (Sénégal)**
- **Université Gaston Berger (Sénégal)**
- **Université de Yaoundé I (Cameroun)**
- **Université des Sciences et Technologies de Hanoï (Vietnam)**



<div>
    <canvas id="citationsChart" width="400" height="200"></canvas>
</div>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
    fetch('/citation_data.json')
        .then(response => response.json())
        .then(data => {
            // Convert the object into arrays for years and citations
            const years = Object.keys(data.cites_per_year);
            const citations = Object.values(data.cites_per_year);

            // Create a chart
            const ctx = document.getElementById('citationsChart').getContext('2d');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: years,  // Using years as labels for x-axis
                    datasets: [{
                        label: 'Citations Per Year',
                        data: citations,  // Citation counts as data for y-axis
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderWidth: 2,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Year'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Citations'
                            },
                            beginAtZero: true
                        }
                    }
                }
            });
        })
        .catch(error => console.error("Error loading data:", error));
</script>


{{< github repo="jdzucker/densityClust" >}}

