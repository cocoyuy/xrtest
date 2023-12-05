function getPoints(objects, user) {
    const vertices = [];
    const colors = [];

    for (let obj of objects) {
        vertices.push(obj.pos.x, obj.pos.y, obj.pos.z);
        colors.push(1.0, 1.0, 1.0);
    }
    // geometry
    const geometry = new THREE.BufferGeometry();
    // attributes
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    // draw range
    const drawCount = objects.length; // draw the whole objects
    geometry.setDrawRange(0, drawCount);
    // geometry
    const texture = new THREE.TextureLoader().load('assets/particle_texture.jpg');
    const material = new THREE.PointsMaterial({
        //color: 0xFF9911,
        vertexColors: true,
        size: 3,
        sizeAttenuation: true, // default
        opacity: 0.9,
        transparent: true,
        depthTest: false,
        blending: THREE.AdditiveBlending,
        map: texture
    });
    if (user) {
        // const c = new THREE.Color(0x66e6ff); 
        const c = new THREE.Color(random(0, 1), random(0, 1), random(0, 1));
        material.color.set(c);
    }
    // Points
    const points = new THREE.Points(geometry, material);
    return points;
}