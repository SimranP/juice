var data = [];
var juiceCounts = {};

d3.json("./juice_orders.json", function(d) {
  data = d;
  console.log(data[0]);
  data = data.filter(function(data){return !(data.drinkName=='CTL'||data.drinkName=='Register User'||data.drinkName=='ctl'||data.drinkName=='Fruits'||data.isFruit)})
  data.forEach(function(juice){juiceCounts[juice.drinkName] = juiceCounts[juice.drinkName]+juice.quantity || 0; });
  visualizeIt(juiceCounts);
});


var visualizeIt = function(data){
  var x = d3.scale.ordinal()
            .rangeRoundBands([70, 1400])
            .domain(Object.keys(data))

  var y = d3.scale.linear()
            .domain([6000,0])
            .range([60,680]);

  var xAxis =d3.svg.axis()
               .scale(x)
               .orient("bottom")

  var yAxis =d3.svg.axis()
                .scale(y)
                .orient("right")

  d3.select('body')
    .append('svg')
    .attr('class','yAxis')
    .attr("width",50)
    .attr("height",950)
    .call(yAxis)

  d3.select('body')
    .append('svg')
    .attr('class','xAxis')
    .attr("width",1500)
    .attr("height",200)
    .call(xAxis)
    .selectAll('text')
    .attr("transform", "rotate(100)")
    .attr("dx","100")

  var chart =d3.select('popularity_chart')
               .data(Object.keys(data))
               .enter()
               .append('svg')
               .attr("width",50)
               .attr("height",1000);

          chart.append("rect")
               .attr("class" , "item")
               .attr("x",15)
               .attr("y",10)
               .attr("width",20)
               .attr("height",function(d){return data[d]/8})
               .attr("transform","rotate(180 35 300)")
               .style("fill","steelblue");
}
