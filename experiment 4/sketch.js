class GrowthFrame {
    constructor(container, stage) {
        this.stage = stage;
        this.canvas = document.createElement('canvas');
        this.canvas.className = 'frame';
        container.appendChild(this.canvas);
        
        // Set canvas size maintaining aspect ratio
        const size = 180;
        this.canvas.width = size;
        this.canvas.height = size * 1.5;
        
        this.ctx = this.canvas.getContext('2d');
        this.raindrops = this.createRain();
        this.plant = this.createPlant(stage);
        this.animate();
    }

    createRain() {
        return Array(30).fill().map(() => ({
            x: Math.random() * this.canvas.width,
            y: Math.random() * -this.canvas.height,
            speed: 2 + Math.random() * 5,
            length: 5 + Math.random() * 10
        }));
    }

    createPlant(stage) {
        const height = 20 + (stage * 15);
        const leaves = Array(Math.floor(stage * 0.8)).fill().map((_, i) => ({
            x: this.canvas.width/2 + (Math.random() * 20 - 10),
            y: this.canvas.height - (height - (i * 15)),
            angle: Math.random() * Math.PI/2 - Math.PI/4
        }));
        
        return {
            height,
            leaves,
            hasFlower: stage >= 7
        };
    }

    drawRain() {
        this.ctx.strokeStyle = '#77b5fe';
        this.ctx.lineWidth = 1.5;
        this.raindrops.forEach(drop => {
            this.ctx.beginPath();
            this.ctx.moveTo(drop.x, drop.y);
            this.ctx.lineTo(drop.x, drop.y + drop.length);
            this.ctx.stroke();
            
            drop.y += drop.speed;
            if (drop.y > this.canvas.height) {
                drop.y = -20;
                drop.x = Math.random() * this.canvas.width;
            }
        });
    }

    drawPlant() {
        // Draw stem
        this.ctx.strokeStyle = `hsl(120, ${40 + this.stage * 8}%, 25%)`;
        this.ctx.lineWidth = 3 + (this.stage * 0.5);
        this.ctx.beginPath();
        this.ctx.moveTo(this.canvas.width/2, this.canvas.height);
        this.ctx.lineTo(this.canvas.width/2, this.canvas.height - this.plant.height);
        this.ctx.stroke();

        // Draw leaves
        this.ctx.fillStyle = `hsl(120, ${40 + this.stage * 8}%, 30%)`;
        this.plant.leaves.forEach(leaf => {
            this.ctx.beginPath();
            this.ctx.ellipse(leaf.x, leaf.y, 8, 3, leaf.angle, 0, Math.PI * 2);
            this.ctx.fill();
        });

        // Draw flower
        if (this.plant.hasFlower) {
            this.ctx.fillStyle = '#f1c40f';
            this.ctx.beginPath();
            this.ctx.arc(this.canvas.width/2, 
                       this.canvas.height - this.plant.height - 10, 
                       8, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }

    animate() {
        const loop = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.drawRain();
            this.drawPlant();
            requestAnimationFrame(loop);
        };
        loop();
    }
}

// Main application
const framesContainer = document.getElementById('framesContainer');
const growBtn = document.getElementById('growBtn');
const stageCounter = document.getElementById('stageCounter');
let currentStage = 0;

function addNewFrame() {
    if (currentStage >= 10) return;
    
    new GrowthFrame(framesContainer, currentStage);
    currentStage++;
    stageCounter.textContent = currentStage;
    
    if (currentStage >= 10) {
        growBtn.disabled = true;
    }
}

// Initialize first frame
addNewFrame();

// Grow button click
growBtn.addEventListener('click', addNewFrame);

// Auto-advance every 4 seconds
const autoGrowth = setInterval(() => {
    if (currentStage < 10) {
        addNewFrame();
    } else {
        clearInterval(autoGrowth);
    }
}, 4000);