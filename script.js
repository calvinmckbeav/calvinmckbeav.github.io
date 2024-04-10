window.onload = function() {
    fetchJOLTSData();
};

const API_KEY = 'YOUR_API_KEY'; // Replace 'YOUR_API_KEY' with your actual API key

function fetchJOLTSData() {
    const url = https://api.bls.gov/publicAPI/v2/timeseries/data/JTU000000000000000JOL?registrationkey=${API_KEY}`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        const series = data.Results.series[0];
        const monthlyData = series.data.filter(item => parseInt(item.year) >= 2013);
        const labels = monthlyData.map(item => {
            if (item.period === 'M01') {
                return `${item.year}`;
            } else {
                return '';
            }
        });
        const values = monthlyData.map(item => parseInt(item.value));

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
            labels: labels,
            datasets: [{
                label: 'Job Openings',
                data: values,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                pointRadius: 0 // Remove the dots
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
