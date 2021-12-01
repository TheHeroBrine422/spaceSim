window.addEventListener('load', (event) => {
  c = document.getElementById("canvas");
  c.width = document.body.clientWidth;
  c.height = document.body.clientHeight;

  document.getElementById("framerate").addEventListener("change", STPSUpdate);
  document.getElementById("simTimePerSec").addEventListener("change", STPSUpdate);
  /*document.getElementById("earthMass").addEventListener("change", function(){earth.mass=Number(document.getElementById("earthMass").value)});
  document.getElementById("earthColor").addEventListener("change", function(){earth.color=document.getElementById("earthColor").value});
  document.getElementById("sunMass").addEventListener("change", function(){sun.mass=Number(document.getElementById("sunMass").value)});
  document.getElementById("sunColor").addEventListener("change", function(){sun.color=document.getElementById("sunColor").value});*/

  reset()
  update()
  STPSUpdate()
});

function reset() {
  sim = new Simulation(document.getElementById("canvas"), document.getElementById("walls").checked, Number(document.getElementById("velCap").value))
  /*sim.addBody(new Body("Earth", 100, 500, 1e13, "#00FF00", new Vector(12.93,Math.PI*0.5), true))
  sim.addBody(new Body("Sun", 500, 500, 1e15, "#FFFF00", new Vector(0,0), false))*/
  /*sim.addBody(new Body("Body1", 200+0, 200+0, 1e14, "#00FF00", new Vector(3,Math.PI/4), true))
  sim.addBody(new Body("Body2", 200+100*4, 200+0, 1e14, "#00FF00", new Vector(2,Math.PI*1/2), true))
  sim.addBody(new Body("Body3", 200+50*7, 200+86.6*7, 1e14, "#00FF00", new Vector(5,Math.PI*3/2), true))
  sim.addBody(new Body("Body4", 2000, 500, 1e14, "#00FF00", new Vector(3,Math.PI*2/2), true))
  sim.addBody(new Body("Body5", 1000, 700, 1e14, "#00FF00", new Vector(3,Math.PI*3/2), true))
  sim.addBody(new Body("Body6", 1500, 500, 1e14, "#00FF00", new Vector(3,Math.PI*2/2), true))*/

  /*sim.addBody(new Body("Body1", 200+0, 200+0, 1e14, "#00FF00", new Vector(3,Math.PI/4), true))
  sim.addBody(new Body("Body2", 200+100*4, 200+0, 1e14, "#00FF00", new Vector(2,Math.PI*1/2), true))*/

  sim.addBody(new Body("Body1", 200+0, 200+0, 1e14, "#00FF00", new Vector(5,Math.PI/4), true))
  sim.addBody(new Body("Body2", 200+100*5, 200+0, 1e14, "#0000FF", new Vector(2,0), true))
  sim.addBody(new Body("Body3", 200+50*5, 200+86.6*5, 1e14, "#FF0000", new Vector(5,0), true))

  /*for (var i = 0; i < 10; i++) {
    sim.addBody(new Body("Body"+i, Math.random()*(c.width-200)+100, Math.random()*(c.height-200)+100, 1e14, "#"+Math.floor(Math.random()*16777215).toString(16), new Vector(Math.random()*5,Math.PI*Math.random()*2), true))

  }*/

}

function update() {
  if (document.getElementById("dyanmicSTPS").checked) {
    sim.dynamicSTPS()
  }
  sim.tick(document.getElementById("simTimePerSec").value)
  sim.draw()

  infoBox = "<h1>Info:</h1>"
  for (var i = 0; i < sim.bodies.length; i++) {
    //console.log(sim.bodies[i].toString(2))
    infoBox += "<p>"+sim.bodies[i].name+":<br />"
    infoBox += "Position: ("+sim.bodies[i].x.toFixed(2)+","+sim.bodies[i].y.toFixed(2)+")<br />"
    infoBox += "Velocity: "+ sim.bodies[i].velocity.magnitude.toFixed(2)+" m/s "+(sim.bodies[i].velocity.direction/Math.PI*180).toFixed(2)+" degrees<br />"
    infoBox += "Acceleration: "+ sim.bodies[i].acceleration.magnitude.toFixed(2)+" m/s^2 "+(sim.bodies[i].acceleration.direction/Math.PI*180).toFixed(2)+" degrees<br /></p>"
  }
  document.getElementById("infoBox").innerHTML = infoBox

  //console.log("framewait: "+1000/Number(document.getElementById("framerate").value))
  setTimeout(update, 1000/Number(document.getElementById("framerate").value))
}

function STPSUpdate() {
  document.getElementById("simTimePerSecInfo").innerText = "Simulated Time Per Second: "+document.getElementById("simTimePerSec").value*document.getElementById("framerate").value+" seconds"
}
