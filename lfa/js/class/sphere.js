class Sphere {
    constructor() {
        this.pos = createVector();
        this.vel = createVector();
        this.acc = createVector();
        this.scl = createVector(1, 1, 1);
        this.mass = this.scl.x * this.scl.y * this.scl.z;
        this.rot = createVector();
        this.rotVel = createVector();
        this.rotAcc = createVector();
        this.mesh = getSphere();
    }
    setPosition(x, y, z) {
        this.pos = createVector(x, y, z);
        return this;
    }
    setTranslation(x, y, z) {
        this.mesh.geometry.translate(x, y, z);
        return this;
    }
    setVelocity(x, y, z) {
        this.vel = createVector(x, y, z);
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
        this.acc.mult(0);
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
    update() {
        this.mesh.position.set(this.pos.x, this.pos.y, this.pos.z);
        this.mesh.rotation.set(this.rot.x, this.rot.y, this.rot.z);
        this.mesh.scale.set(this.scl.x, this.scl.y, this.scl.z);
    }
}