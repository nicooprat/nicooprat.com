function Curve(points) {
  this.points = points;
}

Curve.prototype.draw = function(ctx, color, scrollY) {
  var W = ctx.canvas.width,
      H = ctx.canvas.height;

  ctx.save();

  ctx.beginPath();
  ctx.moveTo(this.points[0].x, this.points[0].y);

  ctx.quadraticCurveTo(
    this.points[1].x,
    this.points[1].y - scrollY, // Force curve to stay at center
    this.points[2].x,
    this.points[2].y
  );

  ctx.lineTo(W, this.points[2].y);
  ctx.lineTo(W, H);
  ctx.lineTo(0, H);
  ctx.lineTo(0, this.points[0].y);
  
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();

  ctx.restore();
}

Array.prototype.slice.call( document.querySelectorAll('.wave') ).forEach(function(canvas) {
  var bottomColor = canvas.getAttribute('bottom'),
      topColor = canvas.getAttribute('top'),
      ctx = canvas.getContext('2d'),
      W = canvas.width,
      H = canvas.height,
      points = [],
      curve,
      deltaScroll = 0,
      scrollY = 0,
      lastScrollY = 0,
      newScroll = document.body.scrollTop || document.documentElement.scrollTop, // Cross browser check
      oldScroll = newScroll,
      deceleration = 0.7;

  // Draw 3 points horizontally
  for (var x = 0; x <= W; x += W/2) {
    points.push({
      x: x,
      y: H / 2
    });
  }

  // Create curve object
  curve = new Curve(points);

  window.addEventListener('scroll', function() {
    newScroll = document.body.scrollTop || document.documentElement.scrollTop; // Cross browser check
  }, false);

  window.addEventListener('resize', function() {
    W = canvas.width;
    H = canvas.height;
  }, false);

  function drawCurve(curve, scrollY) {
    // Move only 1st and 3rd points
    [curve.points[0], curve.points[2]].forEach(function(point) {
      point.y = (H/2) + scrollY;
    });

    curve.draw(ctx, bottomColor, scrollY);
  }

  (function drawFrame(){
    window.requestAnimationFrame(drawFrame);

    // Get new coordinates
    deltaScroll = (newScroll - oldScroll);
    oldScroll = newScroll;

    // Inertia
    if( Math.abs(deltaScroll) > 1 )
      scrollY += deltaScroll;

    // Avoid curve outside canvas bounds
    scrollY = Math.min(H/2, scrollY);
    scrollY = Math.max(-H/2, scrollY);

    // Avoid infinite decimals
    scrollY = Math.floor(scrollY);

    // Remember last value to save perfs
    lastScrollY = scrollY;

    // Deceleration
    scrollY *= deceleration;

    // Draw only if necessary
    if( scrollY != lastScrollY ) {

      // Draw bottom
      if(topColor == 'transparent') {
        ctx.clearRect(0, 0, W, H);
      } else {
        ctx.fillStyle = topColor;
        ctx.fillRect(0, 0, W, H);
      }

      // Draw top
      drawCurve(curve, scrollY);
    }

  }());
});