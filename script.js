window.onload = function() {
    fetchJOLTSData("Monthly Job Openings");
    fetchJOLTSData("Quits and Layoffs Over Time");
    fetchJOLTSData("Monthly Change in Employment");
    fetchJOLTSData("Hourly Earnings");
};

// const API_KEY = '312e520ae86546fb86b64e51a4e7e7c8';
// const API_KEY = '22d13e6633eb41729d1621c4b2453a77';
// const API_KEY = 'f43e483f132f4bcda8c91946e7cc2fee';
const API_KEY = 'b5743abeddb54ab58c45608fff0bb69e';
// const API_KEY = ''

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
          month = month_dictionary[data.Results.series[0].data.length % 12];

          createMJOChart(labels, values);
          writeParagraph(title, month, values)
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
        month = month_dictionary[data.Results.series[0].data.length % 12];

        // Layoffs Data Pull
        const url2 = `https://api.bls.gov/publicAPI/v2/timeseries/data/JTS000000000000000LDL?registrationkey=${API_KEY}&startyear=2018&endyear=2030`;

        fetch(url2)
        .then(response => response.json())
        .then(data => {
            const layoffs = data.Results.series[0];
            const lvalues = layoffs.data.map(item => parseInt(item.value));

            // Call createChart function with retrieved data
            createQALChart(labels, qvalues, lvalues);
            writeParagraph(title, month, qvalues, lvalues)
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
        // Sort industry_data by value in descending order
        const sortedData = Object.entries(industry_data).sort((a, b) => b[1] - a[1]);

        // Extract sorted labels and values
        const labels = sortedData.map(entry => entry[0]);
        const values = sortedData.map(entry => entry[1]);

        console.log(industry_data)
        createEChart(labels, values, month);
        writeParagraph(title, month, labels, values)
      });
  } else if (title == "Hourly Earnings") {
      // Earnings data pull
    const url1 = `https://api.bls.gov/publicAPI/v2/timeseries/data/	CES0500000003?registrationkey=${API_KEY}&startyear=2018&endyear=2030`;

    fetch(url1)
    .then(response => response.json())
    .then(data => {
      // Object for each month
      earningsArr = data.Results.series[0].data.slice(0, 12);
        month = month_dictionary[data.Results.series[0].data.length % 12];

      // labels
      labels = earningsArr.map(item => item.periodName.slice(0, 3) + ' ' + item.year)
      // hourly earnings values
      earningsValues = earningsArr.map(item => parseFloat(item.value))
      // YoY change
      yoyChange = []
      for (let i = 0; i < 12; i++) {
        yoyChange.push(100 * (parseFloat(data.Results.series[0].data[i].value) / parseFloat(data.Results.series[0].data[i+12].value) - 1));
      }
      console.log(labels)
      console.log(earningsValues)
      console.log(yoyChange)
      createHourlyChart(labels, earningsValues, yoyChange);
      writeParagraph(title, month, earningsValues, yoyChange)
    })
    .catch(error => {
        console.error('Error fetching BLS Data', error);
    });
  }
}