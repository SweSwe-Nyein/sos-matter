var Engine = Matter.Engine;

engine = Engine.create();
world = engine.world;

class Particle {
  constructor(x, y, r, word) {

    var options = {
      friction: 0,
      restitution: 0,
    }

    this.body = Bodies.circle(x, y, r, options);
    this.r = r;
    Composite.add(world, this.body);

    this.isOffScreen = function () {
      var pos = this.body.position;
      return (pos.y > height + 100);
    }

    this.removeFromWorld = function () {
      World.remove(world, this.body);
    }

    this.show = function () {
      var pos = this.body.position;
      push();
      translate(pos.x, pos.y);
      fill(255)
      textAlign(CENTER, CENTER);
      textFont('Verdana');
      textSize(18);
      text(word, 0, 0);
      pop();
    };
  }
}