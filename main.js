// main.js
// Prototipo de práctica: "Danza de cubos"
// Usa three.js + tween.js y OrbitControls

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as TWEEN from "@tweenjs/tween.js";

let scene, camera, renderer, controls;
const cubes = [];

init();
createChoreography(); // definimos la animación
animationLoop();

// ------------------------------------------------------
// Inicialización de escena
// ------------------------------------------------------
function init() {
  const container = document.getElementById("app") || document.body;

  // Escena
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x050510);

  // Cámara
  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.set(0, 5, 10);

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;
  container.appendChild(renderer.domElement);

  // Controles
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;

  // Luces
  const ambient = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambient);

  const dirLight = new THREE.DirectionalLight(0xffffff, 0.9);
  dirLight.position.set(5, 10, 5);
  dirLight.castShadow = true;
  dirLight.shadow.mapSize.set(2048, 2048);
  scene.add(dirLight);

  // Suelo
  const floorGeom = new THREE.PlaneGeometry(20, 20);
  const floorMat = new THREE.MeshStandardMaterial({
    color: 0x111133,
    metalness: 0.1,
    roughness: 0.8,
  });
  const floor = new THREE.Mesh(floorGeom, floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);

  // Cubos
  const cubeGeom = new THREE.BoxGeometry(1, 1, 1);
  const palette = [0xff0080, 0x00e0ff, 0xffff00, 0x00ff88, 0xff8800];

  for (let i = 0; i < 5; i++) {
    const mat = new THREE.MeshStandardMaterial({
      color: palette[i % palette.length],
      metalness: 0.5,
      roughness: 0.3,
    });

    const cube = new THREE.Mesh(cubeGeom, mat);
    cube.position.set(-4 + i * 2, 0.5, 0);
    cube.castShadow = true;

    scene.add(cube);
    cubes.push(cube);
  }

  // Eventos
  window.addEventListener("resize", onWindowResize);

  // Reiniciar coreografía con la barra espaciadora
  document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
      createChoreography(true);
    }
  });
}

// ------------------------------------------------------
// Coreografía con tween.js
// ------------------------------------------------------
function resetCubes() {
  cubes.forEach((cube, i) => {
    cube.position.set(-4 + i * 2, 0.5, 0);
    cube.rotation.set(0, 0, 0);
    cube.scale.set(1, 1, 1);
  });
}

function createChoreography(restart = false) {
  if (restart) {
  }

  resetCubes();
  camera.position.set(0, 5, 10);
  camera.lookAt(0, 1, 0);

  const baseDuration = 900;

  // Tweens por cubo: sube + baja, se repiten en bucle, con desfase
  cubes.forEach((cube, index) => {
    const delay = index * 150;

    // Fase 1: subir, girar y escalar
    const up = new TWEEN.Tween({
      y: cube.position.y,
      ry: 0,
      s: 1,
    })
      .to(
        {
          y: 2,
          ry: Math.PI,
          s: 1.2,
        },
        baseDuration
      )
      .delay(delay)
      .easing(TWEEN.Easing.Back.Out)
      .onUpdate((state) => {
        cube.position.y = state.y;
        cube.rotation.y = state.ry;
        cube.scale.set(state.s, state.s, state.s);
      });

    // Fase 2: bajar con rebote y giro
    const down = new TWEEN.Tween({
      y: 2,
      ry: Math.PI,
      s: 1.2,
    })
      .to(
        {
          y: 0.5,
          ry: Math.PI * 2,
          s: 1,
        },
        baseDuration
      )
      .easing(TWEEN.Easing.Bounce.Out)
      .onUpdate((state) => {
        cube.position.y = state.y;
        cube.rotation.y = state.ry;
        cube.scale.set(state.s, state.s, state.s);
      });

    // Encadenamos las fases y hacemos cíclicas
    up.chain(down);
    down.chain(up);

    // Arrancamos el primer tween
    up.start();
  });

  // Tween de cámara orbita alrededor
  const cameraTween = new TWEEN.Tween({ angle: 0 })
    .to({ angle: Math.PI * 2 }, 8000)
    .easing(TWEEN.Easing.Sinusoidal.InOut)
    .onUpdate((state) => {
      const radius = 10;
      camera.position.x = Math.cos(state.angle) * radius;
      camera.position.z = Math.sin(state.angle) * radius;
      camera.position.y = 5 + Math.sin(state.angle * 2) * 1.5;
      camera.lookAt(0, 1, 0);
    })
    .repeat(Infinity);

  cameraTween.start();
}

// -----------------------------------------------
// Bucle de animación
// ------------------------------------------------
function animationLoop(time) {
  requestAnimationFrame(animationLoop);
  TWEEN.update();

  controls.update();

  renderer.render(scene, camera);
}

// ------------------------------------------------
// Resize
// -----------------------------------------------
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
