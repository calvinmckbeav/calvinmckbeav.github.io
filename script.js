window.onload = function() {
    fetchJOLTSData("Monthly Job Openings");
    fetchJOLTSData("Quits and Layoffs Over Time");
};

const API_KEY = '312e520ae86546fb86b64e51a4e7e7c8';

function fetchJOLTSData(title) {
    if (title == "Monthly Job Openings") {
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

          createMJOChart(labels, values);
      })
      .catch(error => {
          console.error('Error fetching JOLTS data:', error);
      });
    }
      
  else if (title == "Quits and Layoffs Over Time") {
    // Quits data pull
    const url1 = `https://api.bls.gov/publicAPI/v2/timeseries/data/JTS000000000000000QUL?registrationkey=${API_KEY}&startyear=2018&endyear=2030`;

    fetch(url1)
    .then(response => response.json())
    .then(data => {
        const quits = data.Results.series[0];
        const labels = quits.data.map(item => {
            if (item.period === 'M01') {
                return `${item.year}`;
            } else {
                return '';
            }
        });
        const qvalues = quits.data.map(item => parseInt(item.value));
        console.log(labels);

        // Layoffs Data Pull
        const url2 = `https://api.bls.gov/publicAPI/v2/timeseries/data/JTS000000000000000LDL?registrationkey=${API_KEY}&startyear=2018&endyear=2030`;

        fetch(url2)
        .then(response => response.json())
        .then(data => {
            const layoffs = data.Results.series[0];
            const lvalues = layoffs.data.map(item => parseInt(item.value));

            // Call createChart function with retrieved data
            createQALChart(labels, qvalues, lvalues);
        })
        .catch(error => {
            console.error('Error fetching JOLTS layoffs data:', error);
        });
    })
    .catch(error => {
        console.error('Error fetching JOLTS quits data:', error);
    });
  }
}

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
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2,
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
                }
            }
        }
    });
}

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
