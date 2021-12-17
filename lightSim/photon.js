class Photon {
    constructor(xPos, yPos, startingVel, gravity) { // xPos/yPos is in meters, mass is in kg
      this.x = xPos;
      this.y = yPos;
      this.velocity = startingVel
      this.velocity.magnitude = 1e10
      this.acceleration = new Vector(0,0)
      this.gravityEnabled = gravity
      this.mass = 1 // this is to make gravity work. It doesn't really make sense with how gravity should work, but its the best way to do it without implementing general relativity.
    }

    gravity(otherBody) {
      let G = 6.6743e-11
      let distance = this.distance(otherBody)
      let force = G*(this.mass*otherBody.mass)/Math.pow(distance,2)

      return new Vector(force/this.mass, Math.atan2(otherBody.y-this.y, otherBody.x-this.x))
    }

    distance(otherBody) {
      return Math.sqrt(Math.pow(this.x-otherBody.x, 2)+Math.pow(this.y-otherBody.y, 2))
    }

    gravityTick(bodies) {
      if (this.gravityEnabled) {
        let combinedVector = new Vector(0,0)

        for (var i = 0; i < bodies.length; i++) {
          let temp = this.gravity(bodies[i])

          combinedVector = combinedVector.add(temp)
        }

        this.acceleration = combinedVector
      } else {
        this.acceleration = new Vector(0,0)
      }
    }

    tick(tickRate, walls, velCap, c) { // tickRate is in seconds.
      this.velocity = this.velocity.add(this.acceleration.scale(tickRate))

      if (this.velocity.magnitude > velCap) {
        this.velocity.magnitude = velCap
      }

      if (walls) {
        if (this.x+this.velocity.x()*tickRate < 0) {
          this.velocity.direction = this.velocity.direction*-1+Math.PI
        } else if (this.x+this.velocity.x()*tickRate > c.width) {
          this.velocity.direction = this.velocity.direction*-1+Math.PI
        } else if (this.y+this.velocity.y()*tickRate < 0) {
          this.velocity.direction = this.velocity.direction*-1
        } else if (this.y+this.velocity.x()*tickRate > c.height) {
          this.velocity.direction = this.velocity.direction*-1
        }
      }

      this.x += this.velocity.x()*tickRate
      this.y += this.velocity.y()*tickRate
    }

    draw(ctx) {
      ctx.fillStyle = this.color
      ctx.beginPath();
      ctx.arc(this.x*1, this.y*1, this.radius*this.radiusScale, 0, 2 * Math.PI);
      ctx.fill();
    }

    toString(precision) {
      var out = "Position: ("+this.x.toFixed(precision)+","+this.y.toFixed(precision)+")\n"
      out += "Velocity: "+ this.velocity.magnitude.toFixed(precision)+" m/s "+(this.velocity.direction/Math.PI*180).toFixed(precision)+" degrees\n"
      out += "Acceleration: "+ this.acceleration.magnitude.toFixed(precision)+" m/s^2 "+(this.acceleration.direction/Math.PI*180).toFixed(precision)+" degrees\n"
      return out
    }
}
