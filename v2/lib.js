function lineIntersectTest(x1, y1, x2, y2, x3, y3, x4, y4) { // based on intersectLineLine from http://www.kevlindev.com/gui/math/intersection/Intersection.js
  var ua_t = (x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3);
  var ub_t = (x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3);
  var u_b  = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);

  if ( u_b != 0 ) {
    var ua = ua_t / u_b;
    var ub = ub_t / u_b;

    return (0 <= ua && ua <= 1 && 0 <= ub && ub <= 1)
  }
  return false
}
