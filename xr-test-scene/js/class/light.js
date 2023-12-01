class Light {
    constructor() {
        this.pos = createVector();
        this.vel = createVector();
        this.acc = createVector();
        this.scl = createVector(1, 1, 1);
        this.mass = this.scl.x * this.scl.y * this.scl.z;
        this.rot = createVector();
        this.rotVel = createVector();
        this.rotAcc = createVector();

        // this.mesh = getSphere();
        this.light = getLight();
        // this.mesh.scale.set(20, 20, 20);

        this.group = new THREE.Group();
        // this.group.add(this.mesh); // for debug
        this.group.add(this.light);

        scene.add(this.group);
    }
    setPosition(x, y, z) {
        this.pos = createVector(x, y, z);
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
        let freq = frame * 0.01; // also angle
        let radialDistance = 30;
        this.pos.x = cos(freq) * radialDistance;
        this.pos.z = sin(freq) * radialDistance;
    }
    update() {
        this.group.position.set(this.pos.x, this.pos.y, this.pos.z);
        this.group.rotation.set(this.rot.x, this.rot.y, this.rot.z);
        this.group.scale.set(this.scl.x, this.scl.y, this.scl.z);
    }
}