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
