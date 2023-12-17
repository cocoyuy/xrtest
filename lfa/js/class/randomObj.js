class Rand {
    constructor() {
        this.pos = createVector();
        this.vel = createVector();
        this.acc = createVector();

        this.scl = createVector(1, 1, 1);
        this.mass = this.scl.x * this.scl.y * this.scl.z;

        this.rot = createVector();
        this.rotVel = createVector();
        this.rotAcc = createVector();

        this.lifespan = 1.0;
        this.lifeReduction = random(0.005, 0.010);
        this.isDone = false;

        //
        // this.mesh = getBox();
        let rand = Math.floor(Math.random() * 2);
        if (rand == 0) {
            this.mesh = getClone(fb);
        } else {
            this.mesh = getClone(bb); //
        }
        scene.add(this.mesh);
    }
    setPosition(x, y, z) {
        this.pos = createVector(x, y, z);
        return this;
    }
    setVelocity(x, y, z) {
        this.vel = createVector(x, y, z);
        return this;
    }
    setAcc(x, y, z) {
        this.acc = createVector(x, y, z);
        return this;
    }
    setRotationAngle(x, y, z) {
        this.rot = createVector(x, y, z);
        return this;
    }
    setRotationVelocity(x, y, z) {
        this.rotVel = createVector(x, y, z);
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
        // this.acc.mult(0);
    }
    rotate() {
        this.rotVel.add(this.rotAcc);
        this.rot.add(this.rotVel);
        this.rotAcc.mult(0);
    }
    applyForce(f) {
        let force = f.copy();
        force.div(this.mass);
        this.acc.add(force);
    }
    age() {
        this.lifespan -= this.lifeReduction;
        if (this.lifespan <= 0) {
            this.lifespan = 0;
            this.isDone = true;
        }
    }
    update() {
        if (this.pos.y < FLOOR + BALL_SIZE / 3 * 2) {
            this.pos.y = FLOOR + BALL_SIZE / 3 * 2;
            this.vel.y *= -1;
            this.acc.y -= 0.001;
        }
        if (this.lifespan <= 0) {
            this.lifespan = 0;
            this.rotVel = createVector(0, 0, 0);
        }
        this.mesh.position.set(this.pos.x, this.pos.y, this.pos.z);
        this.mesh.rotation.set(this.rot.x, this.rot.y, this.rot.z);
    }
}
