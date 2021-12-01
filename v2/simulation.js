class Simulation {
    constructor() { // xPos/yPos is in meters, mass is in kg
        this.bodies = []
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
        console.log(tempArr)
        this.bodies[i].tick(tickRate, tempArr)
      }
    }

    draw(ctx) {
      ctx.clearRect(0, 0, c.width, c.height);
      for (var i = 0; i < this.bodies.length; i++) {
        this.bodies[i].draw(ctx)
      }
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
