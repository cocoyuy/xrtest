function getText(content, font) {
    const geometry = new TextGeometry(content, {
        font: font,
        size: random(10, 15),
        height: 5,
    });
    const material = new THREE.MeshBasicMaterial({
        color: 0x923e96,
    });
    const text = new THREE.Mesh(geometry, material);
    text.position.y = random(100, 200);
    text.position.x = random(-400, 400);
    text.position.z = random(-400, 600);
    text.lookAt(0, 0, 100);
    // scene.add(text);
    return text;
}