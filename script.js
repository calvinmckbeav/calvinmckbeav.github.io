window.onload = function() {
    fetchJOLTSData();
};
const API_KEY = '312e520ae86546fb86b64e51a4e7e7c8';

function fetchJOLTSData() {
    const url = `https://api.bls.gov/publicAPI/v2/timeseries/data/JTS000000000000000JOL?registrationkey=${API_KEY}&startyear=2013&endyear=2024`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        const series = data.Results.series[0];
        const labels = filteredData.map(item => `${item.year}-${item.period}`);
        const values = filteredData.map(item => parseInt(item.value));

        createChart(labels, values);
    })
    .catch(error => {
        console.error('Error fetching JOLTS data:', error);
    });
}

function createChart(labels, values) {
    const ctx = document.getElementById('joltsChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels.reverse(), // Reverse labels to show from oldest to newest
            datasets: [{
                label: 'Job Openings',
                data: values.reverse(), // Reverse values to match labels order
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
