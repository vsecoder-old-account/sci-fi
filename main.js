let SCENE;
let CAMERA;
let RENDERER;
let CSSRENDERER;
let LOADING_MANAGER;
let IMAGE_LOADER;
let OBJ_LOADER;
let CONTROLS;
let MOUSE;
let RAYCASTER, material;

let TEXTURE;
let OBJECT;

const _IS_ANIMATED = Symbol('is animated');
const _IS_VISIBLE = Symbol('is visible');

main();


function main() {
    init();
    animate();
}


function init() {
    initScene();
    initCamera();
    initRenderer();
    initCSSRenderer();
    initLoaders();
    //initControls();
    initRaycaster();
    //initWorld();
    initTexture();

    loadModel();

    initEventListeners();

    document.querySelector('.nav').appendChild(RENDERER.domElement);
    document.querySelector('.nav').appendChild(CSSRENDERER.domElement);
}


function initScene() {
    SCENE = new THREE.Scene();
    SCENE.background = new THREE.Color( 0xa0a0a0 );
	SCENE.fog = new THREE.Fog( 0xa0a0a0, 200, 1000 );

    initLights();
}


function initLights() {
    const hemiLight = new THREE.HemisphereLight( 0x000000, 0xffffff );
    hemiLight.position.set( 50, 100, 0 );
    SCENE.add( hemiLight );

    const dirLight = new THREE.DirectionalLight( 0x000000 );
    dirLight.position.set( 50, 200, 100 );
    dirLight.castShadow = true;
    dirLight.shadow.camera.top = 180;
    dirLight.shadow.camera.bottom = - 100;
    dirLight.shadow.camera.left = - 120;
    dirLight.shadow.camera.right = 120;
    SCENE.add( dirLight );
    //SCENE.add( new THREE.CameraHelper( dirLight.shadow.camera ) );

    const mesh = new THREE.Mesh( new THREE.PlaneGeometry( 2000, 2000 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
	mesh.rotation.x = - Math.PI / 2;
	mesh.receiveShadow = true;
	SCENE.add( mesh );

    const grid = new THREE.GridHelper( 2000, 20, 0x000000, 0x000000 );
	grid.material.opacity = 0.2;
	grid.material.transparent = true;
	SCENE.add( grid );
}


function initCamera() {
    CAMERA = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
    CAMERA.position.x = 60;
    CAMERA.position.z = 30;
    CAMERA.position.y = 40;
}


function initRenderer() {
    RENDERER = new THREE.WebGLRenderer({ canvas: document.querySelector("canvas"), antialias: true });
    RENDERER.setPixelRatio(window.devicePixelRatio);
    RENDERER.setSize(window.innerWidth, window.innerHeight);
    RENDERER.shadowMap.enabled = true;
    RENDERER.shadowMapSort = true;
}


function initCSSRenderer() {
    CSSRENDERER = new THREE.CSS3DRenderer();
    CSSRENDERER.setSize(window.innerWidth, window.innerHeight);
    CSSRENDERER.domElement.style.position = 'absolute';
    CSSRENDERER.domElement.style.top = 0;
}


function initLoaders() {
    LOADING_MANAGER = new THREE.LoadingManager();
    IMAGE_LOADER = new THREE.ImageLoader(LOADING_MANAGER);
    OBJ_LOADER = new THREE.OBJLoader(LOADING_MANAGER);
}


function initControls() {
    CONTROLS = new THREE.OrbitControls(CAMERA);
    CONTROLS.minPolarAngle = Math.PI * 1 / 4;
    CONTROLS.maxPolarAngle = Math.PI * 3 / 4;
    CONTROLS.minDistance = 10;
    CONTROLS.maxDistance = 150;
    CONTROLS.autoRotate = true;
    CONTROLS.autoRotateSpeed = -2.0;
    CONTROLS.update();

    //MOUSE = new THREE.Vector2();
}


function initRaycaster() {
    //RAYCASTER = new THREE.Raycaster();
}


function initTexture() {
    TEXTURE = new THREE.Texture();
}


function initWorld() {
    const sphere = new THREE.SphereGeometry(500, 64, 64);
    sphere.scale(-1, 1, 1);

    const texture = new THREE.Texture();

    const material = new THREE.MeshBasicMaterial({
        map: texture
    });

    IMAGE_LOADER.load('./world2.jpg', (image) => {
        texture.image = image;
        texture.needsUpdate = true;
    });

    SCENE.add(new THREE.Mesh(sphere, material));
}


function loadTexture() {
    var mtlLoader = new THREE.MTLLoader();
    const textu = new THREE.Texture();

    mtlLoader.load('1.mtl', (image) => {
        textu.image = image;
        textu.needsUpdate = true;
        OBJ_LOADER.setMaterials(image)
    });
}


function loadModel() {
    loadTexture();
    OBJ_LOADER.load('./1.obj', (object) => {
        object.traverse(function(child) {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });

        object.scale.x = 5;
        object.scale.y = 5;
        object.scale.z = 5;
        //object.rotation.x = Math.PI / 20;
        object.position.y = 9;
        object.position.z = 0;

        OBJECT = object;
        SCENE.add(OBJECT);
    });
}


function initEventListeners() {
    //window.addEventListener('resize', onWindowResize);
    //window.addEventListener('mousemove', onMouseMove);

    //onWindowResize();
}


function onWindowResize() {
    //CAMERA.aspect = window.innerWidth / window.innerHeight;
    //CAMERA.updateProjectionMatrix();

    //RENDERER.setSize(window.innerWidth, window.innerHeight);
    //CSSRENDERER.setSize(window.innerWidth, window.innerHeight);
}


function onMouseMove(event) {
    //MOUSE.x = (event.clientX / window.innerWidth) * 2 - 1;
    //MOUSE.y = -(event.clientY / window.innerHeight) * 2 + 1;
}


function animate() {
    requestAnimationFrame(animate);
    //CONTROLS.update();
    render();
}

function render() {
    CAMERA.lookAt(SCENE.position);

    //RAYCASTER.setFromCamera(MOUSE, CAMERA);
    updatePopups();
    OBJECT.rotation.y += 0.01

    RENDERER.render(SCENE, CAMERA);
    CSSRENDERER.render(SCENE, CAMERA);
}


function updatePopups() {
}

