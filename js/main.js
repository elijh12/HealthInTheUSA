console.log("Hello world");

const displayNames = getDisplayNames();

var globalData;

d3.csv('data/data.csv')
  .then(data => {
  	console.log('Data loading complete. Work with dataset.');

		data.forEach(d => {
			d.poverty_perc = +d.poverty_perc;
			d.median_household_income = +d.median_household_income;
			d.education_less_than_high_school_percent = +d.education_less_than_high_school_percent;
			d.air_quality = +d.air_quality;
			d.park_access = +d.park_access;
			d.percent_inactive = +d.percent_inactive;
			d.percent_smoking = +d.percent_smoking;
			d.elderly_percentage = +d.elderly_percentage;
			d.number_of_hospitals = +d.number_of_hospitals;
			d.number_of_primary_care_physicians = +d.number_of_primary_care_physicians;
			d.percent_no_heath_insurance = +d.percent_no_heath_insurance;
			d.percent_high_blood_pressure = +d.percent_high_blood_pressure;
			d.percent_coronary_heart_disease = +d.percent_coronary_heart_disease;
			d.percent_stroke = +d.percent_stroke;
			d.percent_high_cholesterol = +d.percent_high_cholesterol;
			d.display_name = d.display_name.substring(1, d.display_name.length-1);
			d.value1 = d.poverty_perc;
			d.value2 = d.air_quality;
			if (d.urban_rural_status === "Small City"){
				d.urban_rural_status = "SmallCity";
			};
		});

		console.log(data);

	divName1 = "#main1";
	divName2 = "#main2";
	divNameScatter = "#scatter";

  drawChart1(data, divName1, "poverty_perc");
	drawChart2(data, divName2, "air_quality");

	dataScatter = data.filter(function(d) {return d.air_quality != -1; })

	drawScatter(dataScatter, divNameScatter, "poverty_perc", "air_quality");

	drawChoropleth1("poverty_perc", "Poverty Rate %");
	drawChoropleth2("air_quality", "Air Quality");

	globalData = data;

})
.catch(error => {
    console.log(error)
});

function drawChart1(data, divName, chosenCode){
	// set the dimensions and margins of the graph
	var margin = {top: 10, right: 30, bottom: 50, left: 60},
	width = 600 - margin.left - margin.right,
	height = 400 - margin.top - margin.bottom;

	// append the svg object to the body of the page
	const svg = d3.select(divName)
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          `translate(${margin.left}, ${margin.top})`);

	// X axis: scale and draw:
	const x = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return +d.value1 })])
      .range([0, width]);
  svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x));

	// set the parameters for the histogram
	var histogram = d3.histogram()
	.value(function(d) { return d.value1; })   // I need to give the vector of value
	.domain(x.domain())  // then the domain of the graphic
	.thresholds(x.ticks(30)); // then the numbers of bins

	// And apply this function to data to get the bins
	var bins = histogram(data);

	// Y axis: scale and draw:
	var y = d3.scaleLinear()
	.range([height, 0]);
	y.domain([0, d3.max(bins, function(d) { return d.length; })]);   // d3.hist has to be called before the Y axis obviously
	svg.append("g")
	.call(d3.axisLeft(y));

	// append the bar rectangles to the svg element
	svg.selectAll("rect")
      .data(bins)
      .join("rect")
        .attr("x", 1)
        .attr("transform", function(d) { return `translate(${x(d.x0)}, ${y(d.length)})`})
        .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
        .attr("height", function(d) { return height - y(d.length); })
        .style("fill", "#69b3a2")
        // Show tooltip on hover
        .on('mouseover', (event,d) => {
					d3.select('#tooltip')
						.style('display', 'block')
						.style('left', (event.pageX + 15 + 'px'))  
						.style('top', (event.pageY + 15 + 'px'))
						.html(`
							<div># of Counties Between ${d.x0}% - ${d.x1}%: <strong>${d.length}</strong></div>
					`)})
        .on('mouseleave', () => {
					d3.select('#tooltip').style('display', 'none')})

		var displayName = "";
		displayNames.forEach(d => {
			if (d.code === chosenCode){
				displayName = d.displayname;
			};
		});

		// X axis label
		svg.append("text")
			.attr("text-anchor", "end")
			.attr("x", (width / 2) + margin.left)
			.attr("y", height + margin.top + 30)
			.text(displayName);
		
		// Y axis label:
		svg.append("text")
			.attr("text-anchor", "end")
			.attr("transform", "rotate(-90)")
			.attr("y", -margin.left+20)
			.attr("x", -margin.top)
			.text("# of counties")
}

function drawChart2(data, divName, chosenCode){
	// set the dimensions and margins of the graph
	var margin = {top: 10, right: 30, bottom: 50, left: 60},
	width = 600 - margin.left - margin.right,
	height = 400 - margin.top - margin.bottom;

	// append the svg object to the body of the page
	const svg = d3.select(divName)
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          `translate(${margin.left}, ${margin.top})`);

	// X axis: scale and draw:
	const x = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return +d.value2 })])     // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
      .range([0, width]);
  svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x));

	// set the parameters for the histogram
	var histogram = d3.histogram()
	.value(function(d) { return d.value2; })   // I need to give the vector of value
	.domain(x.domain())  // then the domain of the graphic
	.thresholds(x.ticks(30)); // then the numbers of bins

	// And apply this function to data to get the bins
	var bins = histogram(data);

	// Y axis: scale and draw:
	var y = d3.scaleLinear()
	.range([height, 0]);
	y.domain([0, d3.max(bins, function(d) { return d.length; })]);   // d3.hist has to be called before the Y axis obviously
	svg.append("g")
	.call(d3.axisLeft(y));

	// append the bar rectangles to the svg element
	svg.selectAll("rect")
      .data(bins)
      .join("rect")
        .attr("x", 1)
        .attr("transform", function(d) { return `translate(${x(d.x0)}, ${y(d.length)})`})
        .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
        .attr("height", function(d) { return height - y(d.length); })
        .style("fill", "#69b3a2")
        // Show tooltip on hover
        .on('mouseover', (event,d) => {
					d3.select('#tooltip')
						.style('display', 'block')
						.style('left', (event.pageX + 15 + 'px'))  
						.style('top', (event.pageY + 15 + 'px'))
						.html(`
							<div># of Counties Between ${d.x0} - ${d.x1}: <strong>${d.length}</strong></div>
					`)})
        .on('mouseleave', () => {
					d3.select('#tooltip').style('display', 'none')
				})

		var displayName = "";
		displayNames.forEach(d => {
			if (d.code === chosenCode){
				displayName = d.displayname;
			};
		});

		// X axis label
		svg.append("text")
			.attr("text-anchor", "end")
			.attr("x", (width / 2) + margin.left)
			.attr("y", height + margin.top + 30)
			.text(displayName);
		
		// Y axis label:
		svg.append("text")
			.attr("text-anchor", "end")
			.attr("transform", "rotate(-90)")
			.attr("y", -margin.left+20)
			.attr("x", -margin.top)
			.text("# of counties")
}

function drawScatter (data, divName, chosenCode1, chosenCode2) {

	newData = data.filter( function(d) { return d.value1 != -1});
	finalData = newData.filter( function(d) { return d.value2 != -1});

	var displayName1 = "";
	var displayName2 = "";
		displayNames.forEach(d => {
			if (d.code === chosenCode1){
				displayName1 = d.displayname;
			};
			if (d.code === chosenCode2){
				displayName2 = d.displayname;
			};
		});

	// set the dimensions and margins of the graph
	var margin = {top: 50, right: 30, bottom: 100, left: 60},
	width = 1300 - margin.left - margin.right,
	height = 400 - margin.top - margin.bottom;

	// append the svg object to the body of the page
	var svg = d3.select(divName)
	.append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform",
		"translate(" + margin.left + "," + margin.top + ")");

	// Add X axis
	var x = d3.scaleLinear()
	.domain([0, d3.max(finalData, function(d) { return +d.value1 })])
	.range([ 0, width ]);
	svg.append("g")
	.attr("transform", "translate(0," + height + ")")
	.call(d3.axisBottom(x));

	// Add Y axis
	var y = d3.scaleLinear()
	.domain([0, d3.max(finalData, function(d) { return +d.value2 })])
	.range([ height, 0]);
	svg.append("g")
	.call(d3.axisLeft(y));

	// Color scale: give me a specie name, I return a color
	var color = d3.scaleOrdinal()
	.domain(["Rural", "SmallCity", "Suburban", "Urban"])
	.range(["#50723C", "#F3DE8A", "#007991", "#222E50"])

	// Add dots
	svg.append('g')
		.selectAll("dot")
		.data(finalData)
		.enter()
		.append("circle")
		.attr("class", function (d) { return "dot " + d.urban_rural_status } )
		.attr("cx", function (d) { return x(d.value1); } )
		.attr("cy", function (d) { return y(d.value2); } )
		.attr("r", 5)
		.style("fill", function (d) { return color(d.urban_rural_status) } )
		// Show tooltip on hover
		.on('mouseover', (event,d) => {
			d3.select('#tooltip')
				.style('display', 'block')
				.style('left', (event.pageX + 15 + 'px'))  
				.style('top', (event.pageY + 15 + 'px'))
				.html(`
				<div class="tooltip-title">County Name: ${d.display_name}</div>
				<div>Rural/Urban: ${d.urban_rural_status}</div>
				<div>${displayName1}: ${d.value1}</div>
				<div>${displayName2}: ${d.value2}</div>
			`)
			selected_status = d.urban_rural_status

			d3.selectAll(".dot")
				.transition()
				.duration(200)
				.style("fill", "lightgrey")
				.attr("r", 5)

			d3.selectAll("." + selected_status)
				.transition()
				.duration(200)
				.style("fill", color(selected_status))
				.attr("r", 7)
			})
		.on('mouseleave', () => {
			d3.select('#tooltip').style('display', 'none')
			d3.selectAll(".dot")
			.transition()
			.style("fill", function (d) { return color(d.urban_rural_status) } )
			.attr("r", 5 );
		})

	// X axis label
	svg.append("text")
		.attr("text-anchor", "end")
		.attr("x", (width / 2) + margin.left)
		.attr("y", height + margin.top)
		.text(displayName1);
	
	// Y axis label:
	svg.append("text")
		.attr("text-anchor", "end")
		.attr("transform", "rotate(-90)")
		.attr("y", -margin.left+20)
		.attr("x", -margin.top)
		.text(displayName2)

	svg.append("circle").attr("cx",10).attr("cy",height + margin.top - 2).attr("r", 6).style("fill", "#50723C")
	svg.append("circle").attr("cx",70).attr("cy",height + margin.top - 2).attr("r", 6).style("fill", "#F3DE8A")
	svg.append("circle").attr("cx",160).attr("cy",height + margin.top - 2).attr("r", 6).style("fill", "#007991")
	svg.append("circle").attr("cx",250).attr("cy",height + margin.top - 2).attr("r", 6).style("fill", "#222E50")
	svg.append("text").attr("x", 20).attr("y", height + margin.top).text("Rural").style("font-size", "15px").attr("alignment-baseline","middle")
	svg.append("text").attr("x", 80).attr("y", height + margin.top).text("Small City").style("font-size", "15px").attr("alignment-baseline","middle")
	svg.append("text").attr("x", 170).attr("y", height + margin.top).text("Suburban").style("font-size", "15px").attr("alignment-baseline","middle")
	svg.append("text").attr("x", 260).attr("y", height + margin.top).text("Urban").style("font-size", "15px").attr("alignment-baseline","middle")
		

}


function drawChoropleth1(chosenStat, display) {

	Promise.all([
		d3.json('data/counties-10m.json'),
		d3.csv('data/data.csv')
	]).then(data => {
		const geoData = data[0];
		//const povertyRateData = data[1].filter(function(d) { return d.value1 != -1; });

		var csvData = data[1];
		csvData.forEach(d => {
			d.poverty_perc = +d.poverty_perc;
			d.median_household_income = +d.median_household_income;
			d.education_less_than_high_school_percent = +d.education_less_than_high_school_percent;
			d.air_quality = +d.air_quality;
			d.park_access = +d.park_access;
			d.percent_inactive = +d.percent_inactive;
			d.percent_smoking = +d.percent_smoking;
			d.elderly_percentage = +d.elderly_percentage;
			d.number_of_hospitals = +d.number_of_hospitals;
			d.number_of_primary_care_physicians = +d.number_of_primary_care_physicians;
			d.percent_no_heath_insurance = +d.percent_no_heath_insurance;
			d.percent_high_blood_pressure = +d.percent_high_blood_pressure;
			d.percent_coronary_heart_disease = +d.percent_coronary_heart_disease;
			d.percent_stroke = +d.percent_stroke;
			d.percent_high_cholesterol = +d.percent_high_cholesterol;
			d.display_name = d.display_name.substring(1, d.display_name.length-1);
		}); 

		var finalData = processData(csvData, chosenStat, "poverty_perc");

		const povertyRateData = finalData.filter(function(d) { return d.value1 != -1; });
	
		// Combine both datasets by adding the population density to the TopoJSON file
		//console.log(geoData);
		geoData.objects.counties.geometries.forEach(d => {
			//console.log(d);  
			for (let i = 0; i < povertyRateData.length; i++) {
				if (d.id === povertyRateData[i].cnty_fips) {
					if (+povertyRateData[i].value1 != -1) {
						d.properties.value = +povertyRateData[i].value1;
					}
					else {
						d.properties.value = 0;
					}
				}
			}
		});
	
		const choroplethMap = new ChoroplethMap({ 
			parentElement: '#choro1',   
		}, geoData, display);
	})
	.catch(error => console.error(error));
}

function drawChoropleth2(chosenStat, display) {

	Promise.all([
		d3.json('data/counties-10m.json'),
		d3.csv('data/data.csv')
	]).then(data => {
		const geoData = data[0];
		//const povertyRateData = data[1].filter(function(d) { return d.value1 != -1; });

		var newData = data[1];
		newData.forEach(d => {
			d.poverty_perc = +d.poverty_perc;
			d.median_household_income = +d.median_household_income;
			d.education_less_than_high_school_percent = +d.education_less_than_high_school_percent;
			d.air_quality = +d.air_quality;
			d.park_access = +d.park_access;
			d.percent_inactive = +d.percent_inactive;
			d.percent_smoking = +d.percent_smoking;
			d.elderly_percentage = +d.elderly_percentage;
			d.number_of_hospitals = +d.number_of_hospitals;
			d.number_of_primary_care_physicians = +d.number_of_primary_care_physicians;
			d.percent_no_heath_insurance = +d.percent_no_heath_insurance;
			d.percent_high_blood_pressure = +d.percent_high_blood_pressure;
			d.percent_coronary_heart_disease = +d.percent_coronary_heart_disease;
			d.percent_stroke = +d.percent_stroke;
			d.percent_high_cholesterol = +d.percent_high_cholesterol;
			d.display_name = d.display_name.substring(1, d.display_name.length-1);
			d.value1 = d.poverty_perc;
			d.value2 = d.air_quality;
		}); 

		var finalData = processData(newData, "poverty_perc", chosenStat);

		const povertyRateData = finalData.filter(function(d) { return d.value2 != -1; });

		// Combine both datasets by adding the population density to the TopoJSON file
		//console.log(geoData);
		geoData.objects.counties.geometries.forEach(d => {
			//console.log(d);  
			for (let i = 0; i < povertyRateData.length; i++) {
				if (d.id === povertyRateData[i].cnty_fips) {
					if (+povertyRateData[i].value2 != -1) {
						d.properties.value = +povertyRateData[i].value2;
					}
					else {
						d.properties.value = 0;
					}
				}
			}
		});
	
		const choroplethMap = new ChoroplethMap({ 
			parentElement: '#choro2',   
		}, geoData, display);
	})
	.catch(error => console.error(error));
}

//
// Create and maintain the dropdown options
//
var x, i, j, l, ll, selElmnt, a, b, c;
/* Look for any elements with the class "custom-select": */
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /* For each element, create a new DIV that will act as the selected item: */
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /* For each element, create a new DIV that will contain the option list: */
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < ll; j++) {
    /* For each option in the original select element,
    create a new DIV that will act as an option item: */
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /* When an item is clicked, update the original select box,
        and the selected item: */
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
    /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);

let dataSetsForm = document.getElementById("dataSets");

dataSetsForm.addEventListener("submit", (e) => {
	e.preventDefault();

	let dataSet1Selection = document.getElementById("dataSet1").value;
	let dataSet2Selection = document.getElementById("dataSet2").value;

	var displayName1 = "";
	var displayName2 = "";

	displayNames.forEach(d => {
		if (d.code === dataSet1Selection){
			displayName1 = d.displayname;
		};
		if (d.code === dataSet2Selection){
			displayName2 = d.displayname;
		}
	});

	var displayVS = `${displayName1} v. ${displayName2}`;

	document.getElementById("vs1").innerHTML = displayVS;
	document.getElementById("vs2").innerHTML = displayVS;
	document.getElementById("vs3").innerHTML = displayVS;
	document.getElementById("vs41").innerHTML = displayName1;
	document.getElementById("vs42").innerHTML = displayName2;

	d3.select("svg").remove();
	d3.select("svg").remove();
	d3.select("svg").remove();
	d3.select("svg").remove();
	d3.select("svg").remove();

	newData = processData(globalData, dataSet1Selection, dataSet2Selection);

	drawChart1(newData, "#main1", dataSet1Selection);
	drawChart2(newData, "#main2", dataSet2Selection);

	drawScatter(newData, "#scatter", dataSet1Selection, dataSet2Selection);

	drawChoropleth1(dataSet1Selection, displayName1);
	drawChoropleth2(dataSet2Selection, displayName2);
});