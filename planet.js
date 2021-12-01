class Planet {
    constructor(xPos, yPos, mass, color, startingVel) { // xPos/yPos is in meters, mass is in kg
        this.x = xPos;
        this.y = yPos;
        this.mass = mass;
        this.velocity = startingVel
        this.acceleration = new Vector(0,0)
        this.color = color
    }

    gravity(otherPlanet) {
      let G = 6.6743e-11
      let distance = this.distance(otherPlanet)
      let force = G*(this.mass*otherPlanet.mass)/Math.pow(distance,2)

      this.acceleration.magnitude = force/this.mass
      this.acceleration.direction = Math.atan2(otherPlanet.y-this.y, otherPlanet.x-this.x)
    }

    distance(otherPlanet) {
      return distance(this.x, this.y, otherPlanet.x, otherPlanet.y)
    }

    tick(tickRate) { // tickRate is in seconds.
      this.velocity = this.velocity.add(this.acceleration.scale(tickRate))
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
      let out = ""
      out += "Position: ("+this.x.toFixed(precision)+","+this.y.toFixed(precision)+")\n"
      out += "Mass: "+this.mass+"\n"
      out += "Velocity: "+ this.velocity.magnitude.toFixed(precision)+" m/s "+(this.velocity.direction/Math.PI*180).toFixed(precision)+" degrees\n"
      out += "Acceleration: "+ this.acceleration.magnitude.toFixed(precision)+" m/s^2 "+(this.acceleration.direction/Math.PI*180).toFixed(precision)+" degrees\n"
      out += "Color: "+this.color
      return out
    }
}
