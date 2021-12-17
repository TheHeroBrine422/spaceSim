window.addEventListener('load', (event) => {
  document.getElementById("framerate").addEventListener("change", STPSUpdate);
  document.getElementById("simTimePerSec").addEventListener("change", STPSUpdate);
  /*document.getElementById("earthMass").addEventListener("change", function(){earth.mass=Number(document.getElementById("earthMass").value)});
  document.getElementById("earthColor").addEventListener("change", function(){earth.color=document.getElementById("earthColor").value});
  document.getElementById("sunMass").addEventListener("change", function(){sun.mass=Number(document.getElementById("sunMass").value)});
  document.getElementById("sunColor").addEventListener("change", function(){sun.color=document.getElementById("sunColor").value});*/

  resizeCanvas()
  innerPlanetsRogueStarSim()
  update()
  STPSUpdate()
});

window.onresize = resizeCanvas;

function resizeCanvas() {
  c = document.getElementById("canvas");
  c.width = c.getBoundingClientRect().width;
  c.height = c.getBoundingClientRect().height;
}

/*
sim.addBody(new Body("Earth", 100, 500, 1e10, 26, "#00FF00", new Vector(40,Math.PI*0.5), true)) // earth sun orbit
sim.addBody(new Body("Sun", 500, 500, 1e16, 34, "#FFFF00", new Vector(0,0), false))

// constructor(name, xPos, yPos, mass, radius, radiusDisplayScale, color, startingVel, gravity) { // xPos/yPos is in meters, mass is in kg

sim.addBody(new Body("Earth", 100, 500, 1e10, 26, "#00FF00", new Vector(40, 0.75*Math.PI), true)) // earth sun declining
sim.addBody(new Body("Sun", 500, 500, 1e16, 34, "#FFFF00", new Vector(0,0), false))

sim.addBody(new Body("Body1", 200+0, 200+0, 1e14, "#00FF00", new Vector(3,Math.PI/4), true)) // out of date constructor
sim.addBody(new Body("Body2", 200+100*4, 200+0, 1e14, "#00FF00", new Vector(2,Math.PI*1/2), true))
sim.addBody(new Body("Body3", 200+50*7, 200+86.6*7, 1e14, "#00FF00", new Vector(5,Math.PI*3/2), true))
sim.addBody(new Body("Body4", 2000, 500, 1e14, "#00FF00", new Vector(3,Math.PI*2/2), true))
sim.addBody(new Body("Body5", 1000, 700, 1e14, "#00FF00", new Vector(3,Math.PI*3/2), true))
sim.addBody(new Body("Body6", 1500, 500, 1e14, "#00FF00", new Vector(3,Math.PI*2/2), true))

sim.addBody(new Body("Body1", 200+0, 200+0, 1e14, "#00FF00", new Vector(3,Math.PI/4), true)) // out of date constructor
sim.addBody(new Body("Body2", 200+100*4, 200+0, 1e14, "#00FF00", new Vector(2,Math.PI*1/2), true))
*/

function innerPlanetsRogueStarSim() {
  sim = new Simulation(document.getElementById("canvas"), document.getElementById("walls").checked, Number(document.getElementById("velCap").value), 1)

  sim.addBody(new Body("Sun", 500, 500, 1e16, 50, 1, "#FFFF00", new Vector(0,0), true, 0)) // Inner Planets
  sim.addBody(new Body("Mercury", 200+(300*(1-0.4)), 500, 1e16*(3.28e23/2e30), 10*(2.4/696), 250, "#949494", new Vector(75,Math.PI*0.5), true, 0))
  sim.addBody(new Body("Venus", 200+300*(1-0.72), 500, 1e16*(4.85e24/2e30), 10*(6.05/696), 250, "#eed053", new Vector(56,Math.PI*0.5), true, 0))
  sim.addBody(new Body("Earth", 200+300*(1-1), 500, 1e16*(5.97e24/2e30), 10*(6.37/696), 250, "#00FF00",  new Vector(47.5,Math.PI*0.5), true, 0))
  sim.addBody(new Body("Mars", 200+300*(1-1.5), 500, 1e16*(6.41e23/2e30), 10*(3.4/696), 250, "#FF0000", new Vector(38.6,Math.PI*0.5), true, 0))
  sim.addBody(new Body("Rogue Star", 2000, 700, 1e16, 50, 1, "#FFFF00", new Vector(100/5,Math.PI), true, 100))
}

function innerPlanetsSim() {
  sim = new Simulation(document.getElementById("canvas"), document.getElementById("walls").checked, Number(document.getElementById("velCap").value), 1)

  sim.addBody(new Body("Sun", 500, 500, 1e16, 50, 1, "#FFFF00", new Vector(0,0), true, 0)) // Inner Planets
  sim.addBody(new Body("Mercury", 200+(300*(1-0.4)), 500, 1e16*(3.28e23/2e30), 10*(2.4/696), 250, "#949494", new Vector(75,Math.PI*0.5), true, 0))
  sim.addBody(new Body("Venus", 200+300*(1-0.72), 500, 1e16*(4.85e24/2e30), 10*(6.05/696), 250, "#eed053", new Vector(56,Math.PI*0.5), true, 0))
  sim.addBody(new Body("Earth", 200+300*(1-1), 500, 1e16*(5.97e24/2e30), 10*(6.37/696), 250, "#00FF00",  new Vector(47.5,Math.PI*0.5), true, 0))
  sim.addBody(new Body("Mars", 200+300*(1-1.5), 500, 1e16*(6.41e23/2e30), 10*(3.4/696), 250, "#FF0000", new Vector(38.6,Math.PI*0.5), true, 0))
}

function randomSim() {
  sim = new Simulation(document.getElementById("canvas"), document.getElementById("walls").checked, Number(document.getElementById("velCap").value), 1)

  for (var i = 0; i < 6; i++) {
    sim.addBody(new Body("Body"+i, Math.random()*(c.width-100)+50, Math.random()*(c.height-100)+50, 1e14, 15, 1, "#"+Math.floor(Math.random()*16777215).toString(16), new Vector(Math.random()*5,Math.PI*Math.random()*2), true, 0))
  }
}

function threeBodyUnstable() {
  sim = new Simulation(document.getElementById("canvas"), document.getElementById("walls").checked, Number(document.getElementById("velCap").value), 1)

  sim.addBody(new Body("Body1", 200+0, 200+0, 3e14, 30, 1, "#00FF00", new Vector(5,Math.PI*2/3), true, 0))
  sim.addBody(new Body("Body2", 200+100*5, 200+0, 3e14, 30, 1, "#0000FF", new Vector(5,Math.PI*4/3), true, 0))
  sim.addBody(new Body("Body3", 200+50*5, 200+86.6*5, 3e14, 30,  1, "#FF0000", new Vector(5,Math.PI*6/3), true, 0))
}

function threeBodySemiStable() {
  sim = new Simulation(document.getElementById("canvas"), document.getElementById("walls").checked, Number(document.getElementById("velCap").value), 1)

  //     constructor(name, xPos, yPos, mass, radius, radiusDisplayScale, color, startingVel, gravity, startSecond) { // xPos/yPos is in meters, mass is in kg
  sim.addBody(new Body("Body1", 200+200+0, 200+0, 3e14, 30, 1, "#00FF00", new Vector(5,Math.PI/4), true, 0))
  sim.addBody(new Body("Body2", 200+200+100*5, 200+0, 3e14, 30, 1, "#0000FF", new Vector(2,0), true, 0))
  sim.addBody(new Body("Body3", 200+200+50*5, 200+86.6*5, 3e14, 30,  1, "#FF0000", new Vector(7,-Math.PI), true, 0))
}

function update() {
  sim.tick(document.getElementById("simTimePerSec").value)
  sim.draw()

  infoBox = "<h1>Info:</h1>"
  for (var i = 0; i < sim.bodies.length; i++) {
    //console.log(sim.bodies[i].toString(2))
    infoBox += "<p>"+sim.bodies[i].name+":<br />"
    infoBox += "Position: ("+sim.bodies[i].x.toFixed(2)+","+sim.bodies[i].y.toFixed(2)+")<br />"
    infoBox += "Velocity: "+ sim.bodies[i].velocity.magnitude.toFixed(2)+" m/s "+(sim.bodies[i].velocity.direction/Math.PI*180).toFixed(2)+" degrees<br />"
    infoBox += "Acceleration: "+ sim.bodies[i].acceleration.magnitude.toFixed(2)+" m/s^2 "+(sim.bodies[i].acceleration.direction/Math.PI*180).toFixed(2)+" degrees<br />"
    infoBox += "Mass: "+ sim.bodies[i].mass.toFixed(2)+" kg Radius: "+sim.bodies[i].radius.toFixed(2)+" m<br /></p>"
  }
  document.getElementById("infoBox").innerHTML = infoBox

  //console.log("framewait: "+1000/Number(document.getElementById("framerate").value))
  setTimeout(update, 1000/Number(document.getElementById("framerate").value))
}

function STPSUpdate() {
  document.getElementById("simTimePerSecInfo").innerText = "Simulated Time Per Second: "+document.getElementById("simTimePerSec").value*document.getElementById("framerate").value+" seconds"
}
