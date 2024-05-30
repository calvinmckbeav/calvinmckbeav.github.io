function createMJOChart(labels, values) {
    // Reverse the labels and values arrays
    labels.reverse();
    values.reverse();

    const ctx = document.getElementById('mjoChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: '',
                data: values,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: '#CA61FF',
                borderWidth: 3,
                pointRadius: 1 // Remove the dots
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Monthly Job Openings',
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
                    display: false
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