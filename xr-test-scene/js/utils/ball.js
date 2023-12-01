function getBall() {
    geometry = new THREE.IcosahedronGeometry(5, 0);
    material = new THREE.MeshPhongMaterial({ color: 0xa06afc });
    smallSphere = new THREE.Mesh(geometry, material);
    scene.add(smallSphere);
    return smallSphere;
}