'use strict';

let flowers = [];
let raindrops = [];
const numFlowers = 6; // Number of flowers in the scene
const numRaindrops = 100; // Number of raindrops
let windSpeed = 0.5; // Wind strength
let sun;

function setup() {
  let canvas = createCanvas(720, 720);
  canvas.parent("canvas-container"); // Attach canvas to the div if using HTML layout

  // Create flowers in random positions
  for (let i = 0; i < numFlowers; i++) {
    flowers.push(new Flower(random(100, width - 100), height - random(80, 150)));
  }

  // Create initial raindrops
  for (let i = 0; i < numRaindrops; i++) {
    raindrops.push(new Raindrop(random(width), random(-500, 0)));
  }

  sun = new Sun(100, 100, 80); // Sun position and size
}

function draw() {
  background(30, 30, 50); // Dark blue sky

  // Draw the sand
  noStroke();
  fill(237, 201, 175); // Sandy color
  rect(0, height - 100, width, 100);

  // Draw the sun
  sun.display();

  // Draw flowers
  for (let flower of flowers) {
    flower.grow();
    flower.sway(); // Add swaying due to wind
    flower.display();
  }

  // Draw rain
  for (let drop of raindrops) {
    drop.fall();
    drop.display();
  }

  // Randomly change wind direction every 2 seconds
  if (frameCount % 120 === 0) {
    windSpeed = random(-1, 1); // Wind changes direction
  }
}

// Flower class
class Flower {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 10; // Initial flower size
    this.maxSize = random(40, 60); // Maximum size of the flower
    this.petalCount = int(random(6, 10)); // Number of petals
    this.growthRate = 0.1; // Growth speed
    this.swayOffset = 0; // Offset for swaying effect
  }

  grow() {
    if (this.size < this.maxSize) {
      this.size += this.growthRate;
    }
  }

  sway() {
    // Simulate swaying effect due to wind
    this.swayOffset = sin(frameCount * 0.05) * windSpeed * 10;
  }

  display() {
    push();
    translate(this.x + this.swayOffset, this.y);

    // Draw stem
    stroke(34, 139, 34); // Green stem
    strokeWeight(4);
    line(0, 0, 0, 50);

    // Draw petals
    noStroke();
    fill(255, 204, 0); // Yellow petals
    for (let i = 0; i < this.petalCount; i++) {
      let angle = TWO_PI / this.petalCount * i;
      let petalX = cos(angle) * this.size;
      let petalY = sin(angle) * this.size;
      ellipse(petalX, petalY, this.size / 2, this.size);
    }

    // Draw center (seed head)
    fill(102, 51, 0); // Brown center
    ellipse(0, 0, this.size / 2);

    pop();
  }
}

// Raindrop class
class Raindrop {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = random(4, 8); // Falling speed
  }

  fall() {
    this.y += this.speed;
    this.x += windSpeed; // Raindrops are affected by wind

    // Reset raindrop to the top if it falls below the canvas
    if (this.y > height) {
      this.y = random(-50, 0);
      this.x = random(width);
    }
  }

  display() {
    stroke(173, 216, 230); // Light blue raindrop
    strokeWeight(2);
    line(this.x, this.y, this.x, this.y + 10);
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
    ellipse(this.x, this.y, this.size);

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
