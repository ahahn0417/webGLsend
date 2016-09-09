var container;
var camera, controls, scene, renderer;
var spheres = [];
var plane;
var start = Date.now();

init();
animate();

function Sphere (radius, segments, x, y, z){
	this.sphere = new THREE.Mesh(new THREE.SphereGeometry(radius, segments, segments), new THREE.MeshLambertMaterial({color: 0xff0000}));
	this.sphere.position.x = x || 0;
	this.sphere.position.y = y || 0;
	this.sphere.position.z = z || 0;
}

function init (){
	var width = window.innerWidth;
	var height = window.innerHeight;
	
	container = document.createElement('div');
	document.body.appendChild(container);
	
	var info = document.createElement('div');
	info.style.position = 'absolute';
	info.style.top = '10px';
	info.style.width = '100%';
	info.style.textAlign = 'center';
	info.innerHTML = 'Drag Cube';
	container.appendChild(info);
	
	camera = new THREE.PerspectiveCamera(70, width/height, 1, 1000);
	camera.position.y = 150;
	camera.position.z = 500;
	
	controls = new THREE.OrbitControls(camera);
	
	scene = new THREE.Scene();
	
	var light = new THREE.PointLight(0xffffff);
	light.position.set(500, 500, 500);
	scene.add(light);
	
	var light = new THREE.PointLight(0xffffff, 0.25);
	light.position.set(-500, -500, -500);
	scene.add(light);
	
	for (var i = 0; i < 10; i++){
		spheres.push(new Sphere(100, 20, 0, 0, i * -70));
		scene.add(spheres[i].sphere);
	};
	
	geometry = new THREE.PlaneGeometry(400, 400);
	material = new THREE.MeshBasicMaterial({color: 0xe0e0e0});
	plane = new THREE.Mesh(geometry, material);
	plane.position.y = -200;
	plane.rotation.x = -Math.PI/2;
	scene.add(plane);
	
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(width, height);
	//container.appendChild(renderer.domElement);
	
	//effect = new THREE.AsciiEffect(renderer);
	effect = renderer;
	effect.setSize(width, height);
	container.appendChild(effect.domElement);
	
	//renderer.render(scene, camera);
	window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize (){
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
	effect.setSize(window.innerWidth, window.innerHeight);
	effect.render(scene, camera);
}

function animate (){
	requestAnimationFrame(animate);
	render()
}

function render (){
	var timer = Date.now() - start;
	
	for (var i = 0; i < spheres.length; i++){
		spheres[i].sphere.position.x = Math.sin(timer * 0.004 * (i/20 + 1)) * 150;
		spheres[i].sphere.rotation.y = timer * 0.0003;
		spheres[i].sphere.rotation.z = timer * 0.0002;
	}
	
	
	controls.update();
	effect.render(scene, camera);
}