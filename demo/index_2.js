console.log(this);

function percentX(percent) {
  return Math.round(percent/100 * window.innerWidth);
}

function percentY(percent) {
  return Math.round(percent/100 * window.innerHeight);
}

Matter.use('matter-wrap');

var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse;

var engine = Engine.create();

var render = Render.create({
  // element: document.getElementById("ok"),
  element: document.body,
  // element: document.getElementById("fuckerbitch"),
  engine: engine
});



var boxA = Bodies.rectangle(350, 200, 80, 80, {isStatic: true});
var boxB = Bodies.rectangle(400, 200, 80, 80, {isStatic: true});

var ground = Bodies.rectangle(400, 600, 800, 30, {isStatic: true});



var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false
        }
      }
    });
// render.mouse = mouse;
World.add(engine.world, [boxA, boxB, ground, mouseConstraint]);

Engine.run(engine);

Render.run(render);


var button = document.getElementById('fuck');

button.addEventListener("click", fuckinClick, false);

function fuckinClick() {
  World.clear(engine.world);
  Engine.clear(engine);
  boxA = Bodies.rectangle(350, 200, 80, 80, {isStatic: false});

  World.add(engine.world, [boxA, boxB, ground, mouseConstraint]);

  Engine.run(engine);

  Render.run(render);
}
