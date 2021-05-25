// Set the marginss
let margins = {top: 10, right: 30, bottom: 30, left: 60},
    width = 860 - margins.left - margins.right,
    height = 400 - margins.top - margins.bottom;

// Parse the month variable
var parseMonth = d3.timeParse("%Y");
var formatMonth = d3.timeFormat("%Y");

// var formatYear = d3.timeFormat("%Y");
// var parseYear = d3.timeParse("%Y");
var parseTime = d3.timeParse("%Y");

// Set the ranges
var x = d3.scaleTime().domain([parseMonth("2029"), parseMonth("2044")]).range([0, width]);
var y = d3.scaleLinear().range([height, 0]);


// Define the line
var valueLine = d3.line()
    .x(function(d) { return x(d.year); })
    .y(function(d) { return y(+d.avg_sentiment); })

// Create the svg canvas in the "graph" div
var svg_product = d3.select("#graph")
        .append("svg")
        .style("width", width + margins.left + margins.right + "px")
        .style("height", height + margins.top + margins.bottom + "px")
        .attr("width", width + margins.left + margins.right)
        .attr("height", height + margins.top + margins.bottom)
        .append("g")
        .attr("transform","translate(" + margins.left + "," + margins.top + ")")
        .attr("class", "svg");

// Import the CSV data
d3.csv("./data/product_semester.csv", function(error, data) {
  if (error) throw error;
   // Format the data
  data.forEach(function(d) {
      d.year = parseMonth(d.year);
      // d.year = parseTime(d.year);
      d.avg_sentiment = +d.avg_sentiment;
      d.product = d.product;
      d.topic = d.topic;
  });

  var nest = d3.nest()
	    .key(function(d){
	    	return d.product;
	    })
		.rollup(function(leaves){
            var max = d3.max(leaves, function(d){
            	return d.avg_sentiment
            })
            var topic = d3.nest().key(function(d){
            	return d.topic
            })
            .entries(leaves);
            return {max:max, topic:topic};
            })
	  .entries(data)
  // Scale the range of the data
  x.domain(d3.extent(data, function(d) { return d.year; }));
  // y.domain([0, d3.max(data, function(d) { return d.avg_sentiment; })]);

  // Set up the x axis
  var xaxis = svg_product.append("g")
       .attr("transform", "translate(0," + height + ")")
       .attr("class", "x axis")
       .call(d3.axisBottom(x)
          .ticks(d3.timeYear)
          .tickSize(0, 0)
          .tickFormat(d3.timeFormat("%Y"))
          .tickSizeInner(0)
          .tickPadding(10));




  // Create 1st dropdown
    var productMenu = d3.select("#productDropdown")

    productMenu
		.append("select")
		.selectAll("option")
        .data(nest)
        .enter()
        .append("option")
        .attr("value", function(d){
            return d.key;
        })
        .text(function(d){
            return d.key;
        })

    // Create 2nd dropdown
    var yearMenu = d3.select("#yearDropdown")
    yearMenu
    .data(nest)
		.append("select")
		.selectAll("option")
        .data(function(d) {
           return d.value.topic;
         })
       	.enter()
        .append("option")
        .attr("value", function(d){
            return d.key;
        })
        .text(function(d){
            return d.key;
        })


 	// Function to create the initial graph
 	var initialGraph = function(fruit){
 		// Filter the data to include only fruit of interest
 		var selectFruit = nest.filter(function(d){
          return d.key == fruit;
      })

	    var selectFruitGroups = svg_product.selectAll(".fruitGroups")
		    .data(selectFruit, function(d){
		      return d ? d.key : this.key;
		    })
		    .enter()
		    .append("g")
		    .attr("class", "fruitGroups")
		    .each(function(d){
                y.domain([0, d.value.max])
            });

		var initialPath = selectFruitGroups.selectAll(".line")
			.data(function(d) { return d.value.topic; })
			.enter()
			.append("path")

		initialPath
			.attr("d", function(d){
				return valueLine(d.values)
			})
			.attr("class", "line")

      var selectedYear = d3.select("#yearDropdown")
        .select("select")
        .property("value")
      // Change the class of the matching line to "selected"
      var selLine = svg_product.selectAll(".line")
              // de-select all the lines
              .classed("selected", false)
              .filter(function(d) {
                  // console.log(+d.key === +selectedYear)
                  // return +d.key === +selectedYear
                  if(d.key === selectedYear){
                    return d.key
                  }
              })
              // Set class to selected for matching line
              .classed("selected", true)
              .raise()

		  // Add the Y Axis
		   var yaxis = svg_product.append("g")
		       .attr("class", "y axis")
		       .call(d3.axisLeft(y)
		          .ticks(5)
		          .tickSizeInner(0)
		          .tickPadding(6)
		          .tickSize(0, 0));

		  // Add a label to the y axis
		  svg_product.append("text")
		        .attr("transform", "rotate(-90)")
		        .attr("y", 0 - 60)
		        .attr("x", 0 - (height / 2))
		        .attr("dy", "1em")
		        .style("text-anchor", "middle")
		        .text("Avg Sentiment")
		        .attr("class", "y axis label");

 	}

 	// Create initial graph
 	initialGraph("DISHWASHERS")

 	// Update the data
 	var updateGraph = function(fruit){
 		// Filter the data to include only fruit of interest
 		var selectFruit = nest.filter(function(d){
                return d.key == fruit;
              })
 		// Select all of the grouped elements and update the data
	    var selectFruitGroups = svg_product.selectAll(".fruitGroups")
		    .data(selectFruit)
		    .each(function(d){
                y.domain([0, d.value.max])

            });

		    // Select all the lines and transition to new positions
            selectFruitGroups.selectAll("path.line")
               .data(function(d) { return d.value.topic; },
               		function(d){ return d.key; })
               .transition()
                  .duration(1000)
                  .attr("d", function(d){
                    return valueLine(d.values)
                  })

        // Update the Y-axis
            d3.select(".y")
                    .transition()
                    .duration(1500)
                    .call(d3.axisLeft(y)
                      .ticks(5)
                      .tickSizeInner(0)
                      .tickPadding(6)
                      .tickSize(0, 0));


 	}


 	// Run update function when dropdown selection changes
 	productMenu.on('change', function(){
 		// Find which fruit was selected from the dropdown
 		var selectedFruit = d3.select(this)
            .select("select")
            .property("value")
        // Run update function with the selected fruit
        updateGraph(selectedFruit)

    });


    // Change color of selected line when year dropdown changes
    yearMenu.on('change', function(){
    	// Find which year was selected
    	var selectedYear = d3.select(this)
    		.select("select")
    		.property("value")
    	// Change the class of the matching line to "selected"
    	var selLine = svg_product.selectAll(".line")
              // de-select all the lines
              .classed("selected", false)
              .filter(function(d) {
                  // console.log(+d.key === +selectedYear)
                  // return +d.key === +selectedYear
                  if(d.key === selectedYear){
                    return d.key
                  }
              })
              // Set class to selected for matching line
              .classed("selected", true)
              .raise()
    })

})
