var margin = { top: 20, right: 10, bottom: 100, left: 50 };
var width = 700 - margin.right - margin.left;
var height = 500 - margin.top - margin.bottom;
var data = [0, 0];
var labelVal = ["Arrested", "Not Arrested"];

var svg = d3.select("body").append("svg")
    .attr({
        "width": width + margin.right + margin.left,
        "height": height + margin.top + margin.bottom
    })
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.right + ")");


var xscale = d3.scale.ordinal()
    .rangeRoundBands([0, width], 0.5, 0.5);

var yscale = d3.scale.linear()
    .range([height, 0]);

var xaxis = d3.svg.axis()
    .scale(xscale)
    .orient("bottom");

var yaxis = d3.svg.axis()
    .scale(yscale)
    .orient("left");



d3.csv("sampledata.csv", function (error, dp) {
    if (error) throw error;

    dp.forEach(function (d) {
        d.Arrest = d.Arrest;
        //console.log(d.Arrest);

        if (d.Arrest == "TRUE") {
            data[0] = data[0] + 1;
        }
        else if (d.Arrest == "FALSE") {
            data[1] = data[1] + 1;
        }
    });

    data.sort(function (a, b) { return a - b; });
    //domains of xaxis and yscale
    xscale.domain(labelVal, (function (d) { return d }));
    yscale.domain([0, d3.max(data, function (d) { return d })]);

    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("height", 0)
        .attr("y", height)
        .attr({
            "x": function (d, i) {
                return xscale(labelVal[i]);
            },
            "y": function (d) { return yscale(d) },
            "width": xscale.rangeBand(),
            //"width": function(d){return d*100;},
            "height": function (d) { return height - yscale(d) }
        })
        .style("fill", function (d, i) { return 'rgb(20, 20, ' + ((i * 30) + 100) + ')' });


    svg.selectAll('text')
        .data(data)
        .enter()
        .append('text')
        .text(function (d) {
            return d;
        })
        .attr({
            "x": function (d, i) { return xscale(labelVal[i]) + xscale.rangeBand() / 2; },
            "y": function (d) { return yscale(d) + 12; },
            "font-family": 'sans-serif',
            "font-size": '13px',
            //"font-weight": 'bold',
            "fill": 'white',
            "text-anchor": 'middle'
        });

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xaxis)
        .selectAll("text")
        .attr("dx", "-.8em")
        .attr("dy", ".25em")
        .attr("transform", "rotate(-0)")
        .style("text-anchor", "right")
        .attr("font-size", "15px")
        //.attr("font-weight", 'bold')
        .attr("y", 15)
        .attr("fill", "red");


    // Draw yAxis and postion the label
    svg.append("g")
        .attr("class", "y axis")
        .call(yaxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("dy", "-2em")
        .attr("fill", "red")
        .style("text-anchor", "middle")
        //.attr("font-weight", 'bold')
        .text("Number of Arrests vs No Arrests");
});