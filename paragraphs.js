function findAverage(arr) {
    var sum = 0;
    for (var i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum / arr.length;
}

function checkFirstElement(arr) {
    if (arr.length === 0) {
        return [-1, -1]; // Return [-1, -1] if the array is empty
    }

    let firstElement = arr[0];
    let greaterIndex = -1;
    let smallerIndex = -1;

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > firstElement) {
            greaterIndex = i;
            break;
        }
    }

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < firstElement) {
            smallerIndex = i;
            break;
        }
    }

    return [greaterIndex, smallerIndex];
}

function writeParagraph(title, month, values1, values2 = []) {
  values1.reverse();
  values2.reverse();
  var myString = ''; // Declare myString outside of the if block

  if (title == "Monthly Job Openings") {
    myString = 'This ' + month + ', monthly job openings in the US ';
    if (values1[0] > values1[1]) {
      myString += "increased by " + (values1[0] - values1[1]) + ' thousand openings.';
      pct_inc = Math.round(((values1[0] - values1[1]) / values1[1] * 100) * 100) / 100;
      myString += ' Thats a ' + pct_inc + "% increase.<br>";
    } else if (values1[0] < values1[1]) { // Use else if here
      myString += "decreased by " + (values1[1] - values1[0]) + ' thousand openings.';
      pct_dec = Math.round(((values1[1] - values1[0]) / values1[1] * 100) * 100) / 100;
      myString += " That's a " + pct_dec + "% decrease.<br>";
    }
    yearAVG = Math.round(findAverage(values1.slice(0, 12)));
    myString += "<br>Over the past year, the average monthly job openings in the US has been " + yearAVG + " thousand openings.<br>";
    if (checkFirstElement(values1) == 'G') {
      myString += '<br>' + month + ' has had the most job openings in the US since at least 2018';
    } else if (checkFirstElement(values1) == 'S') {
      myString += '<br>' + month + ' has had the fewest job openings in the US since at least 2018';
    }
    document.getElementById("mjoCommentary").innerHTML = myString;
  } else if (title == "Quits and Layoffs Over Time") {
      console.log('received')
    // Handle "Quits and Layoffs Over Time" case
      myString = "At the time of the Covid-19 pandemic, you can see a large spike in layoffs and drop in quits. <br><br>Since then, layoffs have been relatively steady (";
      if (values2[0] > values2[11]) {
          pct_inc = Math.round(((values2[0] - values2[11]) / values2[11] * 100) * 100) / 100;
          myString += "increasing by " + (values2[0] - values2[11]) + " thousand (+" + pct_inc + "%) in the past year) "
      } else if (values2[0] < values2[11]) {
          pct_dec = Math.round(((values2[11] - values2[0]) / values2[11] * 100) * 100) / 100;
        myString += "decreasing by " + (values2[11] - values2[0]) + " thousand (-" + pct_dec + "%) in the past year) "
      }
      myString += 'while quits have had slightly greater change (';
      if (values1[0] > values1[11]) {
            pct_inc = Math.round(((values1[0] - values1[11]) / values1[11] * 100) * 100) / 100;
            myString += "increasing by " + (values1[0] - values1[11]) + " thousand (+" + pct_inc + "%) in the past year)."
        } else if (values1[0] < values1[11]) {
            pct_dec = Math.round(((values1[11] - values1[0]) / values1[11] * 100) * 100) / 100;
          myString += "decreasing by " + (values1[11] - values1[0]) + " thousand (-" + pct_dec + "%) in the past year)."
        }

      
      document.getElementById("qalCommentary").innerHTML = myString;
  } else if (title == "Monthly Change in Employment") {
        myString = "This " + month + ", the industry with the greatest increase in employment is '" + values1[11] + "' with '" + values1[10] + "' and '" + values1[9] + "' in second and third.<br>"
      count = 0
      value = -1
      while (value < 0) {
          value = values2[count]
          count++
      }
      count -= 1
      myString += "<br>There were " + count + " industries that saw a drop in employment in " + month + ", "
      sum = 0
      for (let i = 0; i < values2.length; i++) {
          sum += values2[i]
      }
      // figure out case for sum == 0
      if (sum > 0) {
          myString += "though employment across all industries still increased by " + Math.round(sum) + " thousand workers."
      } else if (sum < 0) {
          myString += "and this would cause employment to drop by " + Math.round(sum) + " thousand workers across all industries."
      }
      
      document.getElementById("empCommentary").innerHTML = myString;
  } else if (title == "Hourly Earnings") {
      allInc = true
      for (let i = 0; i < values1.length; i++) {
          if (i == 0) {
              
          } else {
              if (values1[i] > values1[i - 1]) {
                  allInc = false
              }
          }
      }
      if (allInc) {
          totalDif = Math.round((values1[0]-values1[11]) *100) / 100
          avgDif = Math.round((totalDif / 12) *100) / 100
          myString = "In the past year, the average hourly earnings in private industries of the US have been consistent in increasing every month. <br><br>The average hourly earnings increased by $" + totalDif + " in the last year, on average $" + avgDif + " every month."
      }
      document.getElementById("heCommentary").innerHTML = myString;
  }
}