function getPlane() {
    let geometry = new THREE.PlaneGeometry(WORLD_HALF * 3, WORLD_HALF * 3, 100, 100).toNonIndexed(); // changed
    const colors = [];
    let posArray = geometry.attributes.position.array;
    for (let i = 0; i < posArray.length; i += 3) {
        let x = posArray[i + 0];
        let y = posArray[i + 1];
        let z = posArray[i + 2];
        let temp = x ** 2 + y ** 2;
        if (temp > MOUNTAIN ** 2) {
            // if (x < -MOUNTAIN || x > MOUNTAIN || y < -MOUNTAIN || y > MOUNTAIN) {
            // 4500000
            let xOffset = (x + WORLD_HALF) * 0.005;
            let yOffset = (y + WORLD_HALF) * 0.005;
            // let amp = 8.5; // 9
            let amp = map(temp, MOUNTAIN * 2, 4500000, 8.0, 10.0);
            let noiseValue = (noise(xOffset, yOffset) * amp) ** 3;
            posArray[i + 2] = noiseValue;

            // set colors
            let rVal = map(noiseValue, 5, 160, 0.0, 1.0);
            colors.push(rVal, 145 / 250, 1.0);
        } else {
            posArray[i + 2] = 0;
            colors.push(0.0, random(145 / 250, 200 / 250), 1.0);
        }
    }

    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    let material = new THREE.MeshPhongMaterial({
        // wireframe: true,
        vertexColors: true,
        side: THREE.DoubleSide
    });
    let mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh);
    return mesh;
}