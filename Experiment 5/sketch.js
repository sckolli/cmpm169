'use strict';

let currentStructure = 1;
let angle = 0;
let autoRotate = true;
let camDistance = 400;

function setup() {
    createCanvas(800, 800, WEBGL);
    describe('Interactive 3D scene with impossible geometries inspired by M.C. Escher');
    strokeWeight(2);
}

function draw() {
    background(255);
    
    // Camera controls
    orbitControl(1, 1, 0.1);
    if (autoRotate) angle += 0.01;
    
    // Lighting
    directionalLight(255, 255, 255, 0, -1, -1);
    ambientLight(128);

    // Draw selected structure
    push();
    rotateX(-PI/6);
    rotateY(angle);
    
    switch(currentStructure) {
        case 1:
            drawPenroseTriangle();
            break;
        case 2:
            drawImpossibleStairs();
            break;
        case 3:
            drawShiftingCubes();
            break;
    }
    pop();
}

function drawPenroseTriangle() {
    // Draw three mutually perpendicular beams forming an impossible triangle
    for (let i = 0; i < 3; i++) {
        push();
        rotateY(i * TWO_PI/3);
        translate(0, 0, 100);
        box(50, 50, 200);
        pop();
    }
}

function drawImpossibleStairs() {
    // Create an endless staircase illusion
    let steps = 8;
    let stepHeight = 30;
    let stepDepth = 40;
    
    for (let i = 0; i < steps; i++) {
        push();
        rotateY(i * TWO_PI/steps);
        translate(0, -i*stepHeight, i*stepDepth);
        box(100, stepHeight, stepDepth);
        pop();
    }
}

function drawShiftingCubes() {
    // Cubes that shift between possible and impossible configurations
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            push();
            translate(i * 120, j * 120, 0);
            rotateX(frameCount * 0.01);
            rotateY(frameCount * 0.02);
            box(50 + 20 * sin(frameCount * 0.1));
            pop();
        }
    }
}

function keyPressed() {
    // Change structures
    if (key >= '1' && key <= '3') currentStructure = parseInt(key);
    // Toggle auto-rotation
    if (key === ' ') autoRotate = !autoRotate;
}

function mouseWheel(event) {
    // Zoom control
    camDistance += event.delta * 0.5;
    camDistance = constrain(camDistance, 200, 800);
    camera(0, 0, camDistance, 0, 0, 0, 0, 1, 0);
    return false;
}