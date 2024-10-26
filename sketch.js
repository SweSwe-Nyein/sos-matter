
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Constraint = Matter.Constraint,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint;

var engine, world, runner, render;
var particles = [];
var waveParticles = [];
var boundaries = [];
var mConstraint;
var w = window.innerWidth;
var h = window.innerHeight;
var landscape;

world = engine.world;
runner = Runner.create();

render = Render.create({
    engine: engine,
});

function setup() {
    var canvas = createCanvas(w, h);
    // Set Boundaries
    boundaries.push(new Boundary(w / 2, h, w, 20, 0));
    boundaries.push(new Boundary(w / 2, 0, w, 20, 0));
    boundaries.push(new Boundary(w, h / 2, h, 20, PI / 2));
    boundaries.push(new Boundary(0, h / 2, h, 20, PI / 2));
    
    var startX = w / 2;
    var startY = h / 10;
    lyrics.map((ly, index) => {
      var prev = null;
      for (var x = 0; x < lyrics[index].length; x += 1) {
        // Calculate Position
        var posX = startX + lyrics[index].length;
        var posY = startY + lyrics[index].length;
        // Create Particle
        var p = new Particle(posX, posY, 10, lyrics[index][x]);
        
        particles.push(p);
        
        if (prev) {
            var prevWidth = prev.body.bounds.max.x - prev.body.bounds.min.x;
            var currentWidth = p.body.bounds.max.x - p.body.bounds.min.x;
            
            // Create curved constraint
            var curveConstraint = Constraint.create({
                bodyA: prev.body,
                bodyB: p.body,
                pointA: { x: prevWidth/2, y: 0 },
                pointB: { x: -currentWidth/2, y: 0 },
                stiffness: 0.2,
                damping: 0.5,
                length: 30
            });
            
            // Add spring behavior
            var springOptions = {
                bodyA: prev.body,
                bodyB: p.body,
                stiffness: 0.01,
                damping: 0.1,
                length: 60
            };
            
            Composite.add(world, [
                curveConstraint,
                Constraint.create(springOptions)
            ]);
        }
        
        prev = p;
      }
  
      var canvasmouse = Mouse.create(canvas.elt);
      canvasmouse.pixelRatio = pixelDensity();
      mConstraint = MouseConstraint.create(engine, {
          mouse: canvasmouse,
          constraint: {
              stiffness: 0.2,
          }
      });
      
      Composite.add(world, mConstraint);
    })
    
    Render.run(render);
    Runner.run(runner, engine);
}

function preload() {
  landscape = loadImage('bg.jpg')
}

function draw() {
    background(0);
    imageMode(CENTER);
    image(landscape, w / 2,  h/2)
    
    // Draw particles with text
    for (var i = 0; i < particles.length; i++) {
        particles[i].show();
    }
}