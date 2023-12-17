function getDesert() {
    let geometry = new THREE.PlaneGeometry(WORLD_SIZE * 2, WORLD_SIZE * 2, 100, 100);
    const material = new THREE.MeshBasicMaterial({
        color: 0x080808,
        side: THREE.DoubleSide
    });
    const mesh = new THREE.Mesh(geometry, material);
    let posArray = geometry.attributes.position.array;
    for (let i = 0; i < posArray.length; i += 3) {
        let x = posArray[i + 0];
        let y = posArray[i + 1];
        let z = posArray[i + 2];
        let temp = x ** 2 + y ** 2;
        let xOffset = (x + WORLD_HALF) * 0.005;
        let yOffset = (y + WORLD_HALF) * 0.005;
        let amp = 12;
        let noiseValue = (noise(xOffset, yOffset) * amp) ** 2;
        posArray[i + 2] = noiseValue;
    }
    mesh.rotation.x = PI / 2 * 3;
    mesh.position.y = FLOOR;
    // scene.add(mesh);
    return mesh;
}