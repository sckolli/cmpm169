'use strict';

// Constants - User-servicable parts
const VALUE1 = 1;
const VALUE2 = 2;

// Globals
let myInstance;
let canvasContainer;
var centerHorz, centerVert;

var shapes = [];
var minRadius = 5;
var maxRadius = 250;
var density = 5;
var backgroundColor;
var lineColor;

class MyClass {
    constructor(param1, param2) {
        this.property1 = param1;
        this.property2 = param2;
    }

    myMethod() {
        // code to run when method is called
    }
}

function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
  console.log("Resizing...");
}

// Constructor for the stacked shapes
function Shape(x, y, r) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.shapeType = random(['square', 'circle', 'triangle', 'ellipse']); // Randomly choose a shape
  this.alpha = 150; // Initial transparency for the shape
  this.fadeSpeed = 5; // The speed at which the shapes fade
}

Shape.prototype.draw = function () {
  // Adjust the transparency based on the alpha value
  this.alpha = max(0, this.alpha - this.fadeSpeed); // Reduce alpha to make the shape more faded

  stroke(lineColor);
  strokeWeight(2); // Set a fixed stroke weight

  // Draw shapes with transparency applied
  if (this.shapeType === 'square') {
    for (var i = 0; i < this.r; i += density) {
      fill(lineColor.levels[0], lineColor.levels[1], lineColor.levels[2], this.alpha); // Apply alpha transparency
      rect(this.x - i / 2, this.y - i / 2, i, i); // Draw squares
    }
  } else if (this.shapeType === 'circle') {
    for (var i = 0; i < this.r; i += density) {
      fill(lineColor.levels[0], lineColor.levels[1], lineColor.levels[2], this.alpha); // Apply alpha transparency
      ellipse(this.x, this.y, i, i); // Draw circles
    }
  } else if (this.shapeType === 'triangle') {
    for (var i = 0; i < this.r; i += density) {
      fill(lineColor.levels[0], lineColor.levels[1], lineColor.levels[2], this.alpha); // Apply alpha transparency
      triangle(
        this.x, this.y - i / 2, 
        this.x - i / 2, this.y + i / 2, 
        this.x + i / 2, this.y + i / 2
      ); // Draw triangles
    }
  } else if (this.shapeType === 'ellipse') {
    for (var i = 0; i < this.r; i += density) {
      fill(lineColor.levels[0], lineColor.levels[1], lineColor.levels[2], this.alpha); // Apply alpha transparency
      ellipse(this.x, this.y, i, i / 2); // Draw ellipses
    }
  }
};

// setup() function is called once when the program starts
function setup() {
  // Disable p5.js logo
  p5.disableFriendlyErrors = true;

  // Create canvas and append it to the container
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");

  // Create an instance of the class
  myInstance = new MyClass("VALUE1", "VALUE2");

  // Set initial background and line colors
  backgroundColor = color(255);
  lineColor = color(0);

  // Add the first shape (square)
  shapes.push(new Shape(width / 2, height / 2, width));

  // Handle window resizing
  $(window).resize(function() {
    resizeScreen();
  });

  resizeScreen(); // Ensure the initial resize works
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  // Update background color dynamically
  background(backgroundColor);    

  // Call a method on the instance
  myInstance.myMethod();

  // Update shape sizes dynamically based on mouseX position
  shapes.forEach(function (shape) {
    shape.r = map(mouseX, 0, width, minRadius, maxRadius); // Change shape size based on mouseX
    shape.draw();
  });

  // Draw the rotating square in the center
  push(); // Save the current drawing context
  translate(centerHorz, centerVert); // Move the origin to the rectangle's center
  rotate(frameCount / 100.0); // Rotate by frameCount to animate the rotation
  fill(234, 31, 81);
  noStroke();
  rect(-125, -125, 250, 250); // Draw the rectangle centered on the new origin
  pop(); // Restore the original drawing context

  // Display the text
  fill(255);
  textStyle(BOLD);
  textSize(140);
  text("p5*", centerHorz - 105, centerVert + 40);

  // Draw the radiating lines based on mouse position
  translate(width / 2, height / 2);
  var squareResolution = int(map(mouseY, 0, height, 2, 80));
  var radius = mouseX - width / 2;
  var angle = TAU / squareResolution;

  stroke(lineColor);
  strokeWeight(mouseY / 20);

  for (var i = 0; i <= squareResolution; i++) {
    var x = cos(angle * i) * radius;
    var y = sin(angle * i) * radius;
    line(0, 0, x, y);
  }
}

// Add a new random shape when the mouse is clicked
function mouseReleased() {
  shapes.push(new Shape(mouseX, mouseY, random(minRadius, maxRadius)));
  changeColors(); // Change colors on click
}

// Change the background and line colors randomly
function changeColors() {
  backgroundColor = color(random(255), random(255), random(255));
  lineColor = color(random(255), random(255), random(255));
}

// Key press to save canvas as an image
function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas('interactive_visual', 'png');
}
