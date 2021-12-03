class Body {
    constructor(name, xPos, yPos, mass, radius, radiusDisplayScale, color, startingVel, gravity, startSecond) { // xPos/yPos is in meters, mass is in kg
    //  debugger
      this.name = name
      this.x = xPos;
      this.y = yPos;
      this.mass = mass;
      this.radius = radius;
      this.radiusScale = radiusDisplayScale
      this.velocity = startingVel
      this.acceleration = new Vector(0,0)
      this.color = color
      this.gravityEnabled = gravity
      this.startSecond = startSecond
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



      /*if (walls) {
        if (this.x+this.velocity.x()*tickRate < 0) {
          this.velocity.direction = this.velocity.direction*-1+Math.PI
        } else if (this.x+this.velocity.x()*tickRate > c.width) {
          this.velocity.direction = this.velocity.direction*-1+Math.PI
        } else if (this.y+this.velocity.y()*tickRate < 0) {
          this.velocity.direction = this.velocity.direction*-1
        } else if (this.y+this.velocity.x()*tickRate > c.height) {
          this.velocity.direction = this.velocity.direction*-1
        }
      }*/

      this.x += this.velocity.x()*tickRate
      this.y += this.velocity.y()*tickRate
    }

    combine(otherBody) { // (name, xPos, yPos, mass, radius, color, startingVel, gravity)
      let density1 = this.mass/(Math.PI*this.radius*this.radius) // kg/m^2
      let density2 = otherBody.mass/(Math.PI*otherBody.radius*otherBody.radius) // kg/m^2
      let combinedDensity = (this.mass*density1+otherBody.mass*density2)/(this.mass+otherBody.mass) // kg/m^2
      let area = (this.mass+otherBody.mass)/combinedDensity // m^2
      let radius = Math.sqrt(area/Math.PI) // m

      /*let density1DisplayScale = this.mass/(Math.PI*this.radiusScale*this.radiusScale) // kg/m^2
      let density2DisplayScale = otherBody.mass/(Math.PI*otherBody.radiusScale*otherBody.radiusScale) // kg/m^2
      let combinedDensityDisplayScale = (this.mass*density1DisplayScale+otherBody.mass*density2DisplayScale)/(this.mass+otherBody.mass) // kg/m^2
      let areaDisplayScale = (this.mass+otherBody.mass)/combinedDensityDisplayScale // m^2
      let radiusDisplayScale = Math.sqrt(areaDisplayScale/Math.PI) // m*/
      //debugger

      return new Body(this.name, (this.x*this.mass+otherBody.x*otherBody.mass)/(otherBody.mass+this.mass), (this.y*this.mass+otherBody.y*otherBody.mass)/(otherBody.mass+this.mass), this.mass+otherBody.mass, radius, (this.radiusScale*this.mass+otherBody.radiusScale*otherBody.mass)/(otherBody.mass+this.mass), this.color, this.velocity.add(otherBody.velocity.scale(otherBody.mass/this.mass)), this.gravityEnabled && otherBody.gravityEnabled)
    }

    draw(ctx) {
      ctx.fillStyle = this.color
      ctx.beginPath();
      ctx.arc(this.x*1, this.y*1, this.radius*this.radiusScale, 0, 2 * Math.PI);
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
