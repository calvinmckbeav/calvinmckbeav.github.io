window.onload = function() {
    fetchJOLTSData();
};

const API_KEY = '312e520ae86546fb86b64e51a4e7e7c8';

function fetchJOLTSData() {
    const url = `https://api.bls.gov/publicAPI/v2/timeseries/data/JTU000000000000000JOL?registrationkey=${API_KEY}&startyear=2018&endyear=2030`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        const series = data.Results.series[0];
        const labels = series.data.map(item => {
            if (item.period === 'M01') {
                return `${item.year}`;
            } else {
                return '';
            }
        });
        const values = series.data.map(item => parseInt(item.value));
        console.log(labels);

        createChart(labels, values);
    })
    .catch(error => {
        console.error('Error fetching JOLTS data:', error);
    });
}

function createChart(labels, values) {
    // Reverse the labels and values arrays
    labels.reverse();
    values.reverse();
    
    const ctx = document.getElementById('joltsChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: '',
                data: values,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                pointRadius: 0 // Remove the dots
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Monthly Job Openings',
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
                },
                xAxes: 
                      {
                        scaleLabel: {
                          display: false,
                          labelString: 'Source: Bureau of Labor Statistics',
                          fontColor: '#C7C7CC',
                          fontSize: 11
                        }
                      }
            
            }
        }
    });
}
