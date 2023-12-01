function getSphere() {
    const c = new THREE.Color(random(0.0, 1.0), 0, random(0.0, 1.0));
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshPhongMaterial({
        color: c,
    });
    const sphere = new THREE.Mesh(geometry, material);
    let scale = random(5, 15);
    sphere.scale.x = scale;
    sphere.scale.y = scale;
    sphere.scale.z = scale;
    sphere.position.y = random(120, 250);
    // sphere.position.x = 150;
    sphere.position.x = random(-400, 400);
    sphere.position.z = random(-400, 600);
    scene.add(sphere);
    return sphere;
}