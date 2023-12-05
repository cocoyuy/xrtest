function getBuilding() {
    let geometry = new THREE.BoxGeometry(30, random(60, 180), 30);
    const material = new THREE.MeshBasicMaterial({
        color: 0x080808,
    });
    const mesh = new THREE.Mesh(geometry, material);
    // scene.add(mesh);
    return mesh;
}