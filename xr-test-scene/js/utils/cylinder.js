function getCylinder() {
    const geometry = new THREE.CylinderGeometry(1, 1, 1, 32);
    const material = new THREE.MeshBasicMaterial({ // Phong
        color: 0xf189f5,
        // wireframe: true
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true; //default is false
    mesh.receiveShadow = true; //default is false
    scene.add(mesh);
    return mesh;
}