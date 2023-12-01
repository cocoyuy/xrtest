function getLight() {
    const light = new THREE.PointLight(0xffffff, 2, 1800, 0.1); // ( color , intensity, distance (0=infinite), decay )

    light.castShadow = true; // default false
    // can't manipulate the mapSize in realtime.
    light.shadow.mapSize.width = 512; // default
    light.shadow.mapSize.height = 512; // default

    return light;
}