window.onload = function() {
    fetchJOLTSData("Monthly Job Openings");
    fetchJOLTSData("Quits and Layoffs Over Time");
    fetchJOLTSData("Monthly Change in Employment");
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
  } else if (title == "Monthly Change in Employment") {
      var industries_dictionary = {
      'Manufacturing' : 'CES3000000001',
      'Government' : 'CES9000000001',
      'Construction' : 'CES2000000001',
      'Professional and business services' : 'CES6000000001',
      'Leisure and hospitality' : 'CES7000000001',
      'Other services' : 'CES8000000001',
      'Mining and logging' : 'CES1000000001',
      'Financial activities' : 'CES5500000001',
      'Information' : 'CES5000000001',
      'Health care and social assistance' : 'CES6562000001',
      'Private educational services' : 'CES6561000001',
      'Trade, transportation, and utilities' : 'CES4000000001'
    };

    var industry_data = {
        'Manufacturing' : null,
        'Government' : null,
        'Construction' : null,
        'Professional and business services' : null,
        'Leisure and hospitality' : null,
        'Other services' : null,
        'Mining and logging' : null,
        'Financial activities' : null,
        'Information' : null,
        'Health care and social assistance' : null,
        'Private educational services' : null,
        'Trade, transportation, and utilities' : null
    };

    const month_dictionary = {
      1: 'January',
      2: 'February',
      3: 'March',
      4: 'April',
      5: 'May',
      6: 'June',
      7: 'July',
      8: 'August',
      9: 'September',
      10: 'October',
      11: 'November',
      12: 'December'
    };

    var month;

    // Array to store all fetch promises
    var fetchPromises = [];

    // employment by industry data pull
    for (const ind in industries_dictionary) {
      const url = `https://api.bls.gov/publicAPI/v2/timeseries/data/${industries_dictionary[ind]}?registrationkey=${API_KEY}&startyear=2024&endyear=2030`;

      // Push each fetch promise into the array
      fetchPromises.push(
        fetch(url)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            let change = data.Results.series[0].data[0].value - data.Results.series[0].data[1].value
            industry_data[ind] = change;
            month = month_dictionary[data.Results.series[0].data.length % 12];
          })
          .catch(error => {
            console.error('Error fetching BLS data:', error);
          })
      );
    }

    // Wait for all fetch requests to complete
    Promise.all(fetchPromises)
      .then(() => {
        // create chart
        const labels = Object.keys(industry_data);
        const values = Object.values(industry_data);
        
        console.log(industry_data)
        createEChart(labels, values, month);
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

function createEChart(labels, values, month) {
    data = {
      labels: labels,
      datasets: [{
        label: 'Change in Employment',
        data: values,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    };


    const ctx = document.getElementById('empChart').getContext('2d');
    const chart = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: {
        indexAxis: 'y',
        // Elements options apply to all of the options unless overridden in a dataset
        // In this case, we are setting the border of each horizontal bar to be 2px wide
        elements: {
          bar: {
            borderWidth: 2,
          }
        },
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Change in Employment in ' + month,
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
            display: true, // Ensure x-axis labels are displayed
            beginAtZero: false
          },
          y: {
            beginAtZero: false,
            grid: {
              drawOnChartArea: false
            }
          }
        }
      }
    });
}
