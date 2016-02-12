var sugarPerJuice = {};
var data = [];
d3.json("./juice_orders.json", function(d) {
  data = d;
  data.forEach(function(juice){sugarPerJuice[juice.drinkName] =  {withSugar:0,  sugarLess:0 }});
  data.forEach(function(juice){
    if(juice.isSugarless)
      sugarPerJuice[juice.drinkName].sugarLess = sugarPerJuice[juice.drinkName].sugarLess +1
    sugarPerJuice[juice.drinkName].withSugar = sugarPerJuice[juice.drinkName].withSugar+1;
  })
  Object.keys(sugarPerJuice).forEach(function(juice){visualizeIt(sugarPerJuice[juice],juice)});
});

var visualizeIt = function(data,juice){
  var w = 200;
  var h = 200;
  var r = h/2-10;
  var color = d3.scale.category20c();
  var vis = d3.select('#chart')
              .data([Object.keys(data)])
              .append("div")
              .attr("class","fruit")
              .text(juice)
              .append("svg")
              .attr("width", w)
              .attr("height", h)
              .append("g")
              .attr("transform", "translate(" + r + "," + r+ ")")

  var pie = d3.layout.pie().value(function(d){
    return data[d]
  });

  var arc = d3.svg.arc().outerRadius(r);

  var arcs = vis.selectAll("g.slice").data(pie).enter().append("svg:g").attr("class", "slice");
  arcs.append("path")
    .attr("fill", function(d, i){
        return color(i);
    })
    .attr("d", function (d) {
        return arc(d);
    });

    arcs.append("svg:text").attr("transform", function(d){
      d.innerRadius = 0;
      d.outerRadius = r;
    return "translate(" + arc.centroid(d) + ")";}).attr("text-anchor", "middle").text( function(d, i) {
      var total = data.withSugar + data.sugarLess;
    return Math.round((d.value/total) * 100) + "%";}
  ).attr("fill","white")
  .attr("font-size","11");
}
