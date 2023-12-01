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
    text.position.y = random(10, 300);
    text.position.x = random(-600, 600);
    text.position.z = random(-600, 600);
    text.lookAt(0, 0, 100);
    // scene.add(text);
    return text;
}