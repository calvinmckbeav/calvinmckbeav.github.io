function createQALChart(labels, values1, values2) {
    // Reverse the labels and values arrays
    labels.reverse();
    values1.reverse();
    values2.reverse();


    const ctx = document.getElementById('qalChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Quits',
                data: values1,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2,
                pointRadius: 0 // Remove the dots
            },
                      {
                label: 'Layoffs',
                data: values2,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderWidth: 2,
                pointRadius: 0 // Remove the dots
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Quits and Layoffs Over Time',
                    font: {
                        size: 25
                    }
                },
                subtitle: {
                    display: true,
                    text: 'Represented in thousands',
                    font: {
                        size: 14
                    }
                },
                footer: {
                    display: true,
                    text: 'Source: Bureau of Labor Statistics',
                    font: {
                        size: 12
                    }
                },
                legend: {
                    display: true
                }
            },
            scales: {
                x: {
                    display: true // Ensure x-axis labels are displayed
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        drawOnChartArea: false
                    }
                }
            }
        }
    });
}
