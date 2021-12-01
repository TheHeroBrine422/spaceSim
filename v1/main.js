window.addEventListener('load', (event) => {
  c = document.getElementById("canvas");
  ctx = c.getContext("2d");
  c.width = document.body.clientWidth;
  c.height = document.body.clientHeight;

  document.getElementById("framerate").addEventListener("change", STPSUpdate);
  document.getElementById("simTimePerSec").addEventListener("change", STPSUpdate);
  document.getElementById("earthMass").addEventListener("change", function(){earth.mass=Number(document.getElementById("earthMass").value)});
  document.getElementById("earthColor").addEventListener("change", function(){earth.color=document.getElementById("earthColor").value});
  document.getElementById("sunMass").addEventListener("change", function(){sun.mass=Number(document.getElementById("sunMass").value)});
  document.getElementById("sunColor").addEventListener("change", function(){sun.color=document.getElementById("sunColor").value});

  reset()
  update()
  STPSUpdate()
});

function reset() {
  earth = new Planet(Number(document.getElementById("earthXStartingPos").value),Number(document.getElementById("earthYStartingPos").value),Number(document.getElementById("earthMass").value), document.getElementById("earthColor").value,new Vector(Number(document.getElementById("earthStartingVelMag").value),Math.PI*Number(document.getElementById("earthStartingVelDir").value))) // roughly perfect orbit: 12.93
  sun = new Planet(Number(document.getElementById("sunXStartingPos").value),Number(document.getElementById("sunYStartingPos").value),Number(document.getElementById("sunMass").value), document.getElementById("sunColor").value,new Vector(Number(document.getElementById("sunStartingVelMag").value),Math.PI*Number(document.getElementById("sunStartingVelDir").value))) // roughly perfect orbit: 12.93
}

function update() {
  if (document.getElementById("earthGravity").checked) {
    earth.gravity(sun)
  } else {
    earth.acceleration = new Vector(0,0)
  }
  if (document.getElementById("sunGravity").checked) {
    sun.gravity(earth)
  } else {
    sun.acceleration = new Vector(0,0)
  }

  earth.tick(document.getElementById("simTimePerSec").value)
  sun.tick(document.getElementById("simTimePerSec").value)
  
  ctx.clearRect(0, 0, c.width, c.height);
  earth.draw(ctx)
  sun.draw(ctx)

  earthInfo = "Earth:<br />"
  earthInfo += "Position: ("+earth.x.toFixed(2)+","+earth.y.toFixed(2)+")<br />"
  earthInfo += "Velocity: "+ earth.velocity.magnitude.toFixed(2)+" m/s "+(earth.velocity.direction/Math.PI*180).toFixed(2)+" degrees<br />"
  earthInfo += "Acceleration: "+ earth.acceleration.magnitude.toFixed(2)+" m/s^2 "+(earth.acceleration.direction/Math.PI*180).toFixed(2)+" degrees<br />"
  document.getElementById("earthInfo").innerHTML = earthInfo

  sunInfo = "Sun:<br />"
  sunInfo += "Position: ("+sun.x.toFixed(2)+","+sun.y.toFixed(2)+")<br />"
  sunInfo += "Velocity: "+ sun.velocity.magnitude.toFixed(2)+" m/s "+(sun.velocity.direction/Math.PI*180).toFixed(2)+" degrees<br />"
  sunInfo += "Acceleration: "+ sun.acceleration.magnitude.toFixed(2)+" m/s^2 "+(sun.acceleration.direction/Math.PI*180).toFixed(2)+" degrees<br />"
  document.getElementById("sunInfo").innerHTML = sunInfo

  setTimeout(update, 1000/document.getElementById("framerate").value)
}

function resetEarthVelocity() {
  earth.velocity = new Vector(0,0)
}

function resetSunVelocity() {
  sun.velocity = new Vector(0,0)
}


function STPSUpdate() {
  document.getElementById("simTimePerSecInfo").innerText = "Simulated Time Per Second: "+document.getElementById("simTimePerSec").value*document.getElementById("framerate").value+" seconds"
}
