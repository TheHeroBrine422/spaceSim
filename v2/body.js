class Body {
    constructor(name, xPos, yPos, mass, color, startingVel, gravity) { // xPos/yPos is in meters, mass is in kg
        this.name = name
        this.x = xPos;
        this.y = yPos;
        this.mass = mass;
        this.velocity = startingVel
        this.acceleration = new Vector(0,0)
        this.color = color
        this.gravityEnabled = gravity
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

    tick(tickRate, walls) { // tickRate is in seconds.
      this.velocity = this.velocity.add(this.acceleration.scale(tickRate))

      if (walls) {
        if (this.x+this.velocity.x()*tickRate < 0) { // direction can be -pi*1/2 to -pi*2/2 and pi*1/2 to pi*2/2
          this.velocity.direction = this.velocity.direction*-1+Math.PI

        } else if (this.x+this.velocity.x()*tickRate > c.width) { // direction can be -pi*1/2 to pi*1/2
          this.velocity.direction = this.velocity.direction*-1+Math.PI

        } else if (this.y+this.velocity.y()*tickRate < 0) {
          this.velocity.direction = this.velocity.direction*-1
        } else if (this.y+this.velocity.x()*tickRate > c.height) {
          this.velocity.direction = this.velocity.direction*-1

        }//
      }

      this.x += this.velocity.x()*tickRate
      this.y += this.velocity.y()*tickRate
    }

    draw(ctx) {
      ctx.fillStyle = this.color
      ctx.beginPath();
      ctx.arc(this.x*1, this.y*1, Math.log10(this.mass)*2, 0, 2 * Math.PI);
      ctx.fill();
    }

    toString(precision) {
      let out = "Name: "+this.name+"\n"
      out += "Position: ("+this.x.toFixed(precision)+","+this.y.toFixed(precision)+")\n"
      out += "Mass: "+this.mass+"\n"
      out += "Velocity: "+ this.velocity.magnitude.toFixed(precision)+" m/s "+(this.velocity.direction/Math.PI*180).toFixed(precision)+" degrees\n"
      out += "Acceleration: "+ this.acceleration.magnitude.toFixed(precision)+" m/s^2 "+(this.acceleration.direction/Math.PI*180).toFixed(precision)+" degrees\n"
      out += "Color: "+this.color
      return out
    }
}
