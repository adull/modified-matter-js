
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Common = Matter.Common,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    World = Matter.World,
    Vertices = Matter.Vertices,
    Svg = Matter.Svg,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Composites = Matter.Composites,
    Events = Matter.Events;

// create engine
var engine = Engine.create(),
    world = engine.world;

// create renderer
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: 800,
        height: 600,
        wireframes: false
    }
});

// Render.run(render);

// create runner
var runner = Runner.create();
Runner.run(runner, engine);

// add bodies
var svgs = [
    'guther'
    // 'mustafa'
];

var bodyArray = [];

for (var i = 0; i < svgs.length; i += 1) {
    (function(i) {
        $.get('./svg/' + svgs[i] + '.svg').done(function(data) {
          var vertexSets = [];

            $(data).find('path').each(function(i, path) {
                var points = Svg.pathToVertices(path, 30);
                vertexSets.push(Vertices.scale(points, 0.4, 0.4));
            });
            // createBg(svgs[i], vertexSets);
            var body = Bodies.fromVertices(100 + i * 150, 200 + i * 50, vertexSets, {
                render: {
                    // fillStyle: 'background-image: url("./png/guther.png")',
                    // fillStyle: pattern,
                    fillStyle: null,
                    // opacity: 0.5,
                    sprite: {
                      texture: './png/guther.png',
                      xScale: 0.4,
                      yScale: 0.4,
                    }
                }
            }, true);
            // console.log(body);
            // console.log(body.parts.length)
            for(var j = 2; j < body.parts.length; j ++) {
              body.parts[j].render.sprite = null;
            }

            // console.log(body);
            // var fuck = Composite.create({
            //   bodies: body
            // });

            // console.log(fuck)
            World.add(world, body);
            console.log(body);

            // World.add(world, fuck);
        });
    })(i);
}

World.add(world, [
    Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
    Bodies.rectangle(400, 600, 800, 50, { isStatic: true }),
    Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
    Bodies.rectangle(0, 300, 50, 600, { isStatic: true })
]);

// add mouse control
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

// console.log(world);

World.add(world, mouseConstraint);

// keep the mouse in sync with rendering
render.mouse = mouse;

// fit the render viewport to the scene
Render.lookAt(render, {
    min: { x: 0, y: 0 },
    max: { x: 800, y: 600 }
});

Engine.run(engine);

Render.run(render);
