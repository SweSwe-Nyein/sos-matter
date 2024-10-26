var Engine = Matter.Engine;

engine = Engine.create();
world = engine.world;

class Boundary {
  constructor(x, y, w, h, a) {

    var options = {
      friction: 0,
      restitution: 1,
      isStatic: true,
      angle: a,
    }

    this.body = Bodies.rectangle(x, y, w, h, options);
    this.w = w;
    this.h = h;
    Composite.add(world, this.body);

    this.show = function () {
      var pos = this.body.position;
      var angle = this.body.angle;

      push();
      translate(pos.x, pos.y);
      rotate(angle);
      rectMode(CENTER);
      fill(0);
      noFill();
      noStroke();
      rect(0, 0, this.w, this.h);
      pop();
    };
  }
}