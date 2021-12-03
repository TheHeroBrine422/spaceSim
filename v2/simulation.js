class Simulation {
    constructor(c, walls, velocityCap, collisionMode) { // xPos/yPos is in meters, mass is in kg
      this.masterBodies = []
      this.bodies = []
      this.c = c
      this.ctx = this.c.getContext("2d");
      this.walls = walls
      this.velocityCap = velocityCap
      this.time = 0
      this.collisionMode = collisionMode // 0/not recognized = no collisions, 1 = combine on collision
    }

    addBody(body) {
      for (var i = 0; i < this.masterBodies.length; i++) { // force unique names
        if (body.name == this.masterBodies[i].name) {
          return false
        }
      }
      this.masterBodies.push(body)
      return true
    }

    tick(tickRate) { // tickRate is in seconds.
      this.time += Number(tickRate)

      for (var i = 0; i < this.masterBodies.length; i++) {
        if (this.masterBodies[i].startSecond < this.time) {
          this.bodies.push(this.masterBodies[i])
          this.masterBodies.splice(i,1)
          i--
          //debugger
        }
      }

      for (var i = 0; i < this.bodies.length; i++) { // gravityTicks
        let tempArr = []
        for (var j = 0; j < this.bodies.length; j++) { // generate array of bodies not including currently ticking body
          if (this.bodies[i].name != this.bodies[j].name) {
            tempArr.push(this.bodies[j])
          }
        }
        this.bodies[i].gravityTick(tempArr)
      }

      for (var i = 0; i < this.bodies.length; i++) { // normal Ticks
        this.bodies[i].tick(tickRate, this.walls, this.velocityCap, this.c)
      }

      if (this.collisionMode == 1) { // collisions
        for (var i = 0; i < this.bodies.length; i++) {
          for (var j = 0; j < i; j++) {
            if (this.bodies[i].distance(this.bodies[j]) < this.bodies[i].radius+this.bodies[j].radius) {
              let combinedBody = this.bodies[i].combine(this.bodies[j])

              this.bodies.splice(j, 1)
              this.bodies.splice(i-1, 1)
              this.bodies.push(combinedBody)
              i = 0 // reset to make sure no more bodies need to be combined and to make sure i and j dont go out of bounds
              j = 0
            }
          }
        }
      }
    }

    draw(ctx) {
      this.ctx.clearRect(0, 0, this.c.width, this.c.height);
      for (var i = 0; i < this.bodies.length; i++) {
        this.bodies[i].draw(this.ctx)
      }
    }

    /*toString(precision) {
      let out = ""
      out += "Position: ("+this.x.toFixed(precision)+","+this.y.toFixed(precision)+")\n"
      out += "Mass: "+this.mass+"\n"
      out += "Velocity: "+ this.velocity.magnitude.toFixed(precision)+" m/s "+(this.velocity.direction/Math.PI*180).toFixed(precision)+" degrees\n"
      out += "Acceleration: "+ this.acceleration.magnitude.toFixed(precision)+" m/s^2 "+(this.acceleration.direction/Math.PI*180).toFixed(precision)+" degrees\n"
      out += "Color: "+this.color
      return out
    }*/
}
