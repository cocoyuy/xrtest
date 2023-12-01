function getSofa() {
    sphereGroup = new THREE.Object3D();
    scene.add(sphereGroup);

    geometry = new THREE.CylinderGeometry(0.1, 15 * Math.cos(Math.PI / 180 * 30), 0.1, 24, 1);
    material = new THREE.MeshPhongMaterial({ color: 0x78add6 });
    const sphereCap = new THREE.Mesh(geometry, material);
    sphereCap.position.y = - 15 * Math.sin(Math.PI / 180 * 30) - 0.05;
    sphereCap.rotateX(- Math.PI);

    geometry = new THREE.SphereGeometry(15, 24, 24, Math.PI / 2, Math.PI * 2, 0, Math.PI / 180 * 120);
    const halfSphere = new THREE.Mesh(geometry, material);
    halfSphere.add(sphereCap);
    halfSphere.rotateX(- Math.PI / 180 * 135);
    halfSphere.rotateZ(- Math.PI / 180 * 20);
    halfSphere.position.y = 60;

    sphereGroup.add(halfSphere);
    return sphereGroup;
}