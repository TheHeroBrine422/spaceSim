class Vector {
    constructor(magnitude, direction) {
        this.magnitude = magnitude;
        this.direction = direction
    }

    add(v2) {
      let x = this.x()+v2.x()
      let y = this.y()+v2.y()

      return this.combine(x,y)
    }

    scale(scalar) {
      return new Vector(this.magnitude*scalar,this.direction)
    }

    y() {
      return this.magnitude*Math.sin(this.direction)
    }

    x() {
      return this.magnitude*Math.cos(this.direction)
    }

    combine(x,y) {
      let out = new Vector(0,0)
      out.magnitude = Math.sqrt(Math.pow(x, 2)+Math.pow(y, 2))
      out.direction = Math.atan2(y,x)
      return out
    }

    toString() {
      return this.magnitude+" units "+(this.direction/Math.PI*180)+" degrees"
    }
}
