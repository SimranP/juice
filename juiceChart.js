var data = [];
var juiceCounts = {};

d3.json("./juice_orders.json", function(data) {
  var data = data;
  data = data.filter(function(data){return !(data.drinkName=='CTL'||data.drinkName=='Register User'||data.drinkName=='ctl'||data.drinkName=='Fruits'||data.isFruit)})
  data.forEach(function(juice){juiceCounts[juice.drinkName] = juiceCounts[juice.drinkName]+1 || 0; });
  visualizeIt(juiceCounts);
});


var visualizeIt = function(data){
  var chart  = d3.select('popularity_chart')
               .data(Object.keys(data))
               .enter()
               .append('svg')
               .attr("width",50)
               .attr("height",1000);

          chart.append("text")
               .attr("x",30)
               .attr("y",700)
               .text(function(d) { return d; })
               .attr("transform","rotate(105 54 680)")

          chart.append("rect")
               .attr("class" , "item")
               .attr("x",15)
               .attr("y",10)
               .attr("width",20)
               .attr("height",function(d){return data[d]/8})
               .attr("transform","rotate(180 35 300)")
               .style("fill","steelblue");
}
// var visualizeIt = function(data){
//   d3.select('popularity_chart')
//       .data(Object.keys(data))
//       .enter()
//       .append("div")
//       .style("width",function(d){return (data[d]*5+"px")})
//       .attr("class","item")
//       .style("height","20px")
//       .text(function(d) { return d; });
// };
