const width = window.innerWidth < window.innerHeight ?
  window.innerWidth - 10 :
  window.innerHeight - 10;
const height = width;

var gridLength = 25;
var blockSize = width / gridLength;

function setup() {
  createCanvas(width, height);
}

function draw() {

  background(255);

  var mySprite = [
    []
  ];

  for (var i = 0; i < gridLength; i++) {
    mySprite.push([]);
  }
  for (var i = 0; i < gridLength; i++) {
    for (var j = mySprite[i].length; j < gridLength; j++) {
      mySprite[i].push(round(random(0, 2)));
    }
  }

  function drawSprite(sprite) {

    for (var i = 0; i < sprite[0].length; i++) {
      for (var j = 0; j < sprite[1].length; j++) {
        noStroke();
        if (sprite[i][j] === 0) {
          fill(255 / 1.5);
          rect(i * blockSize, j * blockSize, blockSize, blockSize);
        }
        if (sprite[i][j] === 1) {
          fill(255 / 5);
          rect(i * blockSize, j * blockSize, blockSize, blockSize);
        }
      }
    }

  };

  drawSprite(mySprite);
};
