var towerImg, tower;
var door, doorGroup, doorImg;
var climber, climberImg, climberGroup;
var ghost, ghostJumpImg, ghostStandImg
var invisibleClimber, invisbleClimberGroup
var PLAY = 1
var END = 2
var gameState = PLAY
var spookySound

function preload() {
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png")
  climberImg = loadImage("climber.png")
  ghostJumpImg = loadImage("ghost-jumping.png")
  ghostStandImg = loadImage("ghost-standing.png")
  spookySound = loadSound("spooky.wav")
}

function setup() {
  createCanvas(600, 600)
  tower = createSprite(300, 300, 10, 10)
  tower.addImage("tower", towerImg)
  tower.velocityY = 1
  doorGroup = new Group()
  climberGroup = new Group()
  invisibleClimberGroup = new Group()
  ghost = createSprite(300, 300, 10, 10)
  ghost.addImage("ghostjump", ghostJumpImg);
  ghost.addImage("ghoststand", ghostStandImg);
  ghost.scale = 0.35
  spookySound.loop()
}

function draw() {
  background("black")
  if (gameState === PLAY) {
    if (tower.y > 400) {
      tower.y = 300
    }
    spawnDoors();
    drawSprites();
    ghost.velocityY = ghost.velocityY + 0.5
    if (keyDown("space")) {
      ghost.velocityY = -5
    }
    if (keyDown("left")) {
      ghost.x = ghost.x - 3
    }
    if (keyDown("right")) {
      ghost.x = ghost.x + 3
    }
    if (ghost.isTouching(climberGroup)) {
      ghost.velocityY = 0
    }
    if (ghost.isTouching(invisibleClimberGroup) || ghost.y > 600) {
      ghost.destroy()
      gameState = END
    }
  } else if (gameState === END){
    stroke("yellow")
    fill("yellow")
    textSize(30)
    text("Game Over", 225, 300)
  }

}

function spawnDoors() {
  if (frameCount % 250 === 0) {
    door = createSprite(Math.round(random(120, 450)), -60, 10, 10)
    climber = createSprite(door.x, 10, 10, 10)
    climber.addImage("climber", climberImg)
    invisibleClimber = createSprite(door.x, 17, climber.width, 5)
    invisibleClimber.visible = false
    door.addImage("door", doorImg);
    door.velocityY = 1
    climber.velocityY = 1
    invisibleClimber.velocityY = 1
    door.lifetime = 750
    climber.lifetime = 750
    invisibleClimber.lifetime = 750
    door.depth = ghost.depth - 1
    doorGroup.add(door)
    climberGroup.add(climber)
    invisibleClimberGroup.add(invisibleClimber)
  }
}