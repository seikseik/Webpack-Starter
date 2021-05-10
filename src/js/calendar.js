var width = 960,
    height = 136,
    cellSize = 17; // cell size

var percent = d3.format(".1%"),
    format = d3.timeFormat("%Y-%m-%d");

let colore = d3.scaleLinear().range(["#FF6375", '#A8E8EC'])
        .domain([0, 1])
let svg_calendar = d3.select("#calendar").selectAll("svg")
    .data(d3.range(2018, 2022))
  .enter().append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "RdYlGn")
  .append("g")
    .attr("transform", "translate(" + ((width - cellSize * 53) / 2) + "," + (height - cellSize * 7 - 1) + ")");

svg_calendar.append("text")
    .attr("transform", "translate(-6," + cellSize * 3.5 + ")rotate(-90)")
    .style("text-anchor", "middle")
    .text(function(d) { return d; });

var rect = svg_calendar.selectAll(".day")
    .data(function(d) { return d3.timeDays(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
  .enter().append("rect")
    .attr("class", "day")
    .attr("width", cellSize)
    .attr("height", cellSize)
    .attr("x", function(d) { return d3.timeWeek.count(d3.timeYear(d), d) * cellSize; })
    .attr("y", function(d) { return d.getDay() * cellSize; })
    .datum(format);

rect.append("title")
    .text(function(d) { return d; });

svg_calendar.selectAll(".month")
    .data(function(d) { return d3.timeMonths(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
  .enter().append("path")
    .attr("class", "month")
    .attr("d", monthPath);

d3.csv("./data/calendar.csv", function(error, csv) {
  if (error) throw error;

  var Comparison_Type_Max = d3.max(csv, function(d) { return d.avg_sentiment; });

  var data = d3.nest()
    .key(function(d) { return d.day; })
    .rollup(function(d) { return  Math.sqrt(d[0].avg_sentiment / Comparison_Type_Max); })
    .map(csv);


  rect.filter(function(d) { return data.has(d); })
    .attr("fill", function(d) {
       return colore(data.get(d));
     })
    .attr("class", "filled")
    .select("title")
      .text(function(d) { return d + ": " + data.get(d); });

});

function monthPath(t0) {
  var t1 = new Date(t0.getFullYear(), t0.getMonth() + 1, 0),
      d0 = t0.getDay(), w0 = d3.timeWeek.count(d3.timeYear(t0), t0)
      d1 = t1.getDay(), w1 = d3.timeWeek.count(d3.timeYear(t1), t1);
  return "M" + (w0 + 1) * cellSize + "," + d0 * cellSize
      + "H" + w0 * cellSize + "V" + 7 * cellSize
      + "H" + w1 * cellSize + "V" + (d1 + 1) * cellSize
      + "H" + (w1 + 1) * cellSize + "V" + 0
      + "H" + (w0 + 1) * cellSize + "Z";
}
