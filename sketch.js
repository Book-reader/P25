const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var canvas;
var player, playerBase, playerArcher;
var arrow;
var baseimage;
var playerimage;
var playerArrows = [];

function preload() {
  backgroundImg = loadImage("./assets/background.png");
  baseimage = loadImage("./assets/base.png");
  playerimage = loadImage("./assets/player.png");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES);

  playerBase = new PlayerBase(300,500,180,150);
  player = new Player(285,playerBase.body.position.y-153,50,180);

  playerArcher = new PlayerArcher(
    340,
    playerBase.body.position.y - 180,
    120,
    120
  );

  board1 = new Board(width - 300, 330, 50, 200);
  board2 = new Board(width - 550, height - 300, 50, 200);
}

function draw() {
  background(backgroundImg );

  Engine.update(engine);
  playerArcher.display();

  board1.display();
  board2.display();
  playerBase.display();
  player.display();

  for (var i = 0; i < playerArrows.length; i++) {
    if (playerArrows[i] !== undefined) {
      playerArrows[i].display();
      }
    }
  }

function keyPressed(){
  if(keyCode === 32) {
    var posX = playerArcher.body.position.x;
    var posY = playerArcher.body.position.y;
    var angle = playerArcher.body.angle.x;
    var arrow = new PlayerArrow(posX,posY,100,10,angle);

    Matter.Body.setAngle(arrow.body,angle);
    playerArrows.push(arrow);
  }
}

function keyReleased(){
  if(keyCode === 32){
    if(playerArrows.length){
      var angle = PlayerArcher.body.angle;
      playerArrows[playerArrows.length - 1].shoot(angle);
    }
  }
}