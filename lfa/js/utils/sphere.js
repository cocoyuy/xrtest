function getSphere() {
    const geometry = new THREE.SphereGeometry(random(1, 3));
    const material = new THREE.MeshBasicMaterial({
        color: 0x0c83fa,
        transparent: true,
        opacity: 0.5
    });
    const mesh = new THREE.Mesh(geometry, material);
    return mesh;
}