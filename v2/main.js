window.addEventListener('load', (event) => {
  c = document.getElementById("canvas");
  ctx = c.getContext("2d");
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
  sim = new Simulation()
  /*sim.addBody(new Body("Earth", 100, 500, 1e13, "#00FF00", new Vector(12.93,Math.PI*0.5), true))
  sim.addBody(new Body("Sun", 500, 500, 1e15, "#FFFF00", new Vector(0,0), false))*/
  sim.addBody(new Body("Body1", 200+0, 200+0, 1e14, "#00FF00", new Vector(5,Math.PI/4), true))
  sim.addBody(new Body("Body2", 200+100*5, 200+0, 1e14, "#00FF00", new Vector(2,0), true))
  sim.addBody(new Body("Body3", 200+50*5, 200+86.6*5, 1e14, "#00FF00", new Vector(5,0), true))
}

function update() {
  sim.tick(document.getElementById("simTimePerSec").value)
  sim.draw(ctx)

  for (var i = 0; i < sim.bodies.length; i++) {
    console.log(sim.bodies[i].toString())
  }

  setTimeout(update, 1000/document.getElementById("framerate").value)
}

function STPSUpdate() {
  document.getElementById("simTimePerSecInfo").innerText = "Simulated Time Per Second: "+document.getElementById("simTimePerSec").value*document.getElementById("framerate").value+" seconds"
}
