class Particle {
    constructor(x, y) {
        this.pos = createVector();
        this.vel = createVector();
        this.acc = createVector();
        this.scl = createVector(1, 1, 1);
        this.mass = this.scl.x * this.scl.y * this.scl.z;

        this.lifespan = 1.0;
        this.lifeReduction = random(0.001, 0.005);
        this.isDone = false;
    }
    setPosition(x, y, z) {
        this.pos = createVector(x, y, z);
        return this;
    }
    setVelocity(x, y, z) {
        this.vel = createVector(x, y, z);
        return this;
    }
    setScale(w, h = w, d = w) {
        const minScale = 0.01;
        if (w < minScale) w = minScale;
        if (h < minScale) h = minScale;
        if (d < minScale) d = minScale;
        this.scl = createVector(w, h, d);
        this.mass = this.scl.x * this.scl.y * this.scl.z;
        return this;
    }
    move() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }
    adjustVelocity(amount) {
        this.vel.mult(1 + amount);
        // this.vel.sub(0, (0.1 + random() * 0.1), 0);
    }
    age() {
        this.lifespan -= this.lifeReduction;
        if (this.lifespan <= 0) {
            this.lifespan = 0;
            this.isDone = true;
        }
    }
    // checkBoundaries() {
    //   // y
    //   if (this.pos.y < 0) {
    //     this.pos.y = 0;
    //     this.vel.y = -this.vel.y;
    //   } else if (this.pos.y > height) {
    //     this.pos.y = height;
    //     this.vel.y = -this.vel.y;
    //   }
    // }
}