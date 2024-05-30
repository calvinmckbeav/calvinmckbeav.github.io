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
                backgroundColor: '#CA61FF',
                borderColor: '#CA61FF',
                borderWidth: 3,
                pointRadius: 1 // Remove the dots
            },
                      {
                label: 'Layoffs',
                data: values2,
                borderColor: '#FF781F',
                backgroundColor: '#FF781F',
                borderWidth: 3,
                pointRadius: 1 // Remove the dots
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Quits and Layoffs Over Time',
                    font: {
                        size: 25
                    },
                    color: '#FF2F59'
                },
                subtitle: {
                    display: true,
                    text: 'Represented in thousands',
                    font: {
                        size: 14
                    },
                    color: '#676767'
                },
                footer: {
                    display: true,
                    text: 'Source: Bureau of Labor Statistics',
                    font: {
                        size: 12
                    },
                    color: '#454545'
                },
                legend: {
                    display: true,
                    color: '#454545'
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