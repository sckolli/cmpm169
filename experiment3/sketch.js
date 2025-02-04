'use strict';

let sunflowers = [];
let numSunflowers = 5; // Number of sunflowers
let sun;

function setup() {
  createCanvas(720, 720);
  
  // Create sunflowers in random positions
  for (let i = 0; i < numSunflowers; i++) {
    let x = random(100, width - 100); // Make sure flowers are within the canvas width
    let y = random(height - 200, height - 150); // Ensure flowers are not drawn below the sand
    sunflowers.push(new Sunflower(x, y));
  }

  sun = new Sun(100, 100, 80); // Sun position and size
}

function draw() {
  drawBackground(); // Custom background function
  drawSand();

  // Draw the sun
  sun.display();

  // Draw sunflowers
  for (let sunflower of sunflowers) {
    sunflower.display();
  }
}

// Draw background with gradient sky
function drawBackground() {
  // Gradient sky
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let colorTop = color(135, 206, 250); // Light blue
    let colorBottom = color(30, 144, 255); // Darker blue
    let skyColor = lerpColor(colorTop, colorBottom, inter);
    stroke(skyColor);
    line(0, y, width, y);
  }

  // Clouds
  drawCloud(200, 150, 50);
  drawCloud(400, 100, 70);
  drawCloud(550, 200, 40);
}

// Draw sand
function drawSand() {
  noStroke();
  fill(237, 201, 175); // Sandy color
  rect(0, height - 100, width, 100);
}

// Function to draw clouds
function drawCloud(x, y, size) {
  fill(255); // White color for clouds
  noStroke();
  ellipse(x, y, size, size * 0.7);
  ellipse(x + size * 0.5, y - size * 0.3, size * 0.8, size * 0.6);
  ellipse(x - size * 0.5, y - size * 0.2, size * 0.7, size * 0.5);
}

// Sunflower class
function Sunflower(x, y) {
  this.x = x;
  this.y = y;
  
  this.display = function() {
    // Draw the stem
    stroke(34, 139, 34); // Green stem
    strokeWeight(6);
    line(this.x, this.y, this.x, this.y + 80);

    // Draw the leaves
    noStroke();
    fill(34, 139, 34);
    ellipse(this.x - 10, this.y + 40, 20, 10);
    ellipse(this.x + 10, this.y + 40, 20, 10);

    // Draw sunflower petals
    fill(255, 204, 0); // Yellow
    for (let i = 0; i < 12; i++) {
      let angle = TWO_PI / 12 * i;
      let petalX = this.x + cos(angle) * 20;
      let petalY = this.y + sin(angle) * 20;
      ellipse(petalX, petalY, 15, 30);
    }

    // Draw sunflower center
    fill(139, 69, 19); // Brown center
    ellipse(this.x, this.y, 30, 30);
  }
}

// Sun class
class Sun {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
  }

  display() {
    noStroke();
    fill(255, 223, 0); // Bright yellow sun
    ellipse(this.x, this.y, this.size, this.size);

    // Animated sun rays
    stroke(255, 223, 0, 150); // Slightly transparent rays
    strokeWeight(2);
    for (let i = 0; i < 12; i++) {
      let angle = TWO_PI / 12 * i + frameCount * 0.01; // Rays rotate slightly
      let rayX = this.x + cos(angle) * (this.size + 20);
      let rayY = this.y + sin(angle) * (this.size + 20);
      line(this.x, this.y, rayX, rayY);
    }
  }
}
