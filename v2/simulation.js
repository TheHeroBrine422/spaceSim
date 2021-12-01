class Simulation {
    constructor(c, walls, velocityCap) { // xPos/yPos is in meters, mass is in kg
        this.bodies = []
        this.c = c
        this.ctx = this.c.getContext("2d");
        this.walls = walls
        this.velocityCap = velocityCap
    }

    addBody(body) {
      this.bodies.push(body)
    }

    tick(tickRate) { // tickRate is in seconds.
      for (var i = 0; i < this.bodies.length; i++) {
        let tempArr = []
        for (var j = 0; j < this.bodies.length; j++) {
          if (this.bodies[i].name != this.bodies[j].name) {
            tempArr.push(this.bodies[j])
          }
        }
        this.bodies[i].gravityTick(tempArr)
      }
      for (var i = 0; i < this.bodies.length; i++) {
        this.bodies[i].tick(tickRate, this.walls, this.velocityCap)
      }
    }

    draw(ctx) {
      this.ctx.clearRect(0, 0, this.c.width, this.c.height);
      for (var i = 0; i < this.bodies.length; i++) {
        this.bodies[i].draw(this.ctx)
      }
    }

    dynamicSTPS() {
      let closestBodies = Infinity
      for (var i = 0; i < this.bodies.length; i++) {
        for (var j = 0; j < i; j++) {
          let len = this.bodies[i].distance(this.bodies[j])
          if (len < closestBodies) {
            closestBodies = len
          }
        }
      }
      document.getElementById("simTimePerSec").value = Math.min(0.25, Math.max(Math.log10(closestBodies/10), 0.01))
    }

    toString(precision) {
      let out = ""
    /*  out += "Position: ("+this.x.toFixed(precision)+","+this.y.toFixed(precision)+")\n"
      out += "Mass: "+this.mass+"\n"
      out += "Velocity: "+ this.velocity.magnitude.toFixed(precision)+" m/s "+(this.velocity.direction/Math.PI*180).toFixed(precision)+" degrees\n"
      out += "Acceleration: "+ this.acceleration.magnitude.toFixed(precision)+" m/s^2 "+(this.acceleration.direction/Math.PI*180).toFixed(precision)+" degrees\n"
      out += "Color: "+this.color*/
      return out
    }
}
