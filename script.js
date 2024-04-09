// Function to fetch JOLTS data from API
async function fetchJOLTSData() {
    const response = await fetch('https://api.bls.gov/publicAPI/v2/timeseries/data/JTU00000000',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'registrationkey': 'YOUR_BLS_API_KEY',
                'seriesid': ['JTU00000000']
            })
        });
    const data = await response.json();
    return data;
}

// Function to parse JOLTS data and prepare it for chart
function parseData(data) {
    const series = data.Results.series[0];
    const dates = series.data.map(entry => entry.period);
    const values = series.data.map(entry => parseInt(entry.value));

    return { dates, values };
}

// Function to create and render the chart
function renderChart(dates, values) {
    const ctx = document.getElementById('chart-container').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Job Openings',
                data: values,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

// Main function to fetch data, parse it, and render chart
async function main() {
    try {
        const rawData = await fetchJOLTSData();
        const { dates, values } = parseData(rawData);
        renderChart(dates, values);
    } catch (error) {
        console.error('Error fetching or parsing data:', error);
    }
}

// Call main function to start the process
main();
