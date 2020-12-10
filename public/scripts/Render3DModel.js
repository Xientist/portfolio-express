import { GLTFLoader } from '/scripts/GLTFLoader.js';
import { OrbitControls } from '/scripts/OrbitControls.js';

const canvas = document.querySelector('#c');
const renderer = new THREE.WebGLRenderer({canvas});

if(typeof(modelName) == 'undefined') {
    const modelName = 'default';
}

const fov = 45;
const aspect = 2;  // the canvas default
const near = 0.1;
const far = 100;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 10, 20);

const controls = new OrbitControls(camera, canvas);
controls.target.set(0, 5, 0);
controls.update();

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x070710);

{
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(5, 10, 2);
    scene.add(light);
    scene.add(light.target);
}

const gltfLoader = new GLTFLoader();
gltfLoader.load('/resources/models/'+ modelName +'.glb', (gltf) => {
    const mesh = gltf.scene;
    mesh.position.y = 10;
    scene.add(mesh);
}, (xhr) => {
    console.log("[Info]: modèle " + (xhr.loaded / xhr.total * 100) + "% chargé.");
}, (err) => {
    console.log("[Erreur]: modèle nommé '" + modelName + "' non trouvé.");
});

function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
    renderer.setSize(width, height, false);
    }
    return needResize;
}

function render() {
    if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera);

    requestAnimationFrame(render);
}

render();