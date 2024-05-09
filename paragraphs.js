function writeParagraph(title, month, values1, values2 = []) {
  values1.reverse();
  values2.reverse();
  if (title == "Monthly Job Openings") {
    string = 'This ' + month + ', monthly job openings in the US '
    if (values1[0] > values1[1]) {
      string += "increased by " + (values1[0] - values1[1]) + ' thousand openings.\n'
      pct_inc =  Math.round(((values1[0] - values1[1]) / values1[1] * 100) * 100) / 100
      string += 'Thats a ' + pct_inc + "% increase.\n"
      document.getElementById("mjoCommentary").innerHTML = string
    } else {
      string += "decreased by " + (values1[1] - values1[0]) + ' thousand openings.\n'
      pct_inc = Math.round(((values1[1] - values1[0]) / values1[1] * 100) * 100) / 100
      string += "That's a " + pct_inc + "% decrease.\n"
      document.getElementById("mjoCommentary").innerHTML = string
    }
  }
}
