﻿// set-up for three.js
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var control = new THREE.OrbitControls(camera);

control.addEventListener('change', render);

var renderer = new THREE.CanvasRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// cube set-up
var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);
camera.position.z = 5;

render();

// renders scene to screen
function render() {
    requestAnimationFrame(render);

    //cube.rotation.x += 0.02; // x-axis rotation
    //cube.rotation.y += 0.02; // y-axis rotation
    renderer.render(scene, camera);
}