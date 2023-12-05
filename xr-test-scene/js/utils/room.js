function getRoom() {
    const geometry = new THREE.SphereGeometry(1000, 32, 32); // 6
    const material = new THREE.MeshBasicMaterial({
        color: 0xfa9bdf, //color7
        side: THREE.DoubleSide
    });
    const mesh = new THREE.Mesh(geometry, material);
    return mesh;
}