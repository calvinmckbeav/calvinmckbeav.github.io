window.onload = function() {
    fetchJOLTSData();
};

function fetchJOLTSData() {
    fetch('https://api.bls.gov/publicAPI/v2/timeseries/data/JTS000000000000000JOL')
    .then(response => response.json())
    .then(data => {
        const latestData = data.Results.series[0].data[0];
        displayData(latestData);
    })
    .catch(error => {
        console.error('Error fetching JOLTS data:', error);
    });
}

function displayData(data) {
    const dataContainer = document.getElementById('data-container');

    const html = `
        <p>Month: ${data.periodName} ${data.year}</p>
        <p>Job Openings: ${data.value}</p>
    `;

    dataContainer.innerHTML = html;
}
