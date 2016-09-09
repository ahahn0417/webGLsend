var camera, light, control, container, scene, renderer;

init();
animate();

function init() {
    var x, y, z;

    var width = window.innerWidth;
    var height = window.innerHeight;

    camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    //camera.position.y = 3;
    camera.position.z = 10;

    control = new THREE.OrbitControls(camera);
    control.addEventListener('change', render);

    scene = new THREE.Scene();

    x = 2;
    y = 1;
    z = 3;

    light = new THREE.AmbientLight(0xffffff, 1);
    scene.add(light);

    var geometry = new THREE.BoxGeometry(x, y, z);
    var material = new THREE.MeshLambertMaterial({ color: 0xdd00dd });
    //material.wireframe = true;
    //material.wireframeLinewidth = 3;

    var box = new THREE.Mesh(geometry, material);
    scene.add(box);

    var gridHelper = new THREE.GridHelper(6, 6, 0xad00ff, 0xcccccc);
    gridHelper.position.y = -y / 2;
    scene.add(gridHelper);

    renderer = new THREE.CanvasRenderer();
    //renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);

    container = document.getElementById('container');
    container.appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize, false);
    render();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    control.handleResize();
    render();
}

function animate() {
    requestAnimationFrame(animate);
    control.update();
}

function render() {
    renderer.render(scene, camera);
}