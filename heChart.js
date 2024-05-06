function createHourlyChart(labels, values1, values2) {
    // Reverse the labels and values arrays
    labels.reverse();
    values1.reverse();
    values2.reverse();

    

    const ctx = document.getElementById('heChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'bar', // Set the default type to 'bar'
        data: {
            labels: labels,
            datasets: [{
                label: 'Hourly Earnings (left)',
                data: values1,
                yAxisID: 'earningsAxis', // Assigning this dataset to the 'earningsAxis'
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2,
                pointRadius: 0 // Remove the dots
            },
            {
                label: 'YoY Change (right)',
                data: values2,
                yAxisID: 'yoyAxis', // Assigning this dataset to the 'yoyAxis'
                type: 'line', // Specify 'line' type for values2 dataset
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
                    text: 'Hourly Earnings for all Private Industries',
                    font: {
                        size: 25
                    }
                },
                subtitle: {
                    display: true,
                    text: 'In USD and Seasonally Adjusted',
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
                earningsAxis: { // Customizing the 'earningsAxis'
                    beginAtZero: false,
                    type: 'linear', // 'linear' for numerical values, 'category' for strings
                    position: 'left', // Positioning the axis on the left
                    grid: {
                        drawOnChartArea: false
                    },
                    ticks: {
                        stepSize: 1,
                        // Customizing tick marks
                        callback: function(value, index, values) {
                            return '$' + value; // Add '$' before each tick
                        }
                    }
                },
                yoyAxis: { // Customizing the 'yoyAxis'
                    beginAtZero: false, 
                    type: 'linear',
                    position: 'right', // Positioning the axis on the right
                    grid: {
                        drawOnChartArea: false
                    },
                    ticks: {
                      stepSize: 0.25,
                        // Customizing tick marks
                      callback: function(value, index, values) {
                            return value + '%'; // Add '%' after each tick
                        }
                    }
                }
            }
        }
    });
}
