# CubeDance---Tree.js
# S10 – Three.js + Tween.js Animation Prototype

This repository contains a small 3D animation prototype built with **three.js** and **tween.js** as part of a university assignment.

The final prototype is a **“cube dance”**: five coloured cubes arranged in a row perform a simple looping choreography while the camera orbits smoothly around them.

---

## Description

The goal of this assignment is to create a free-themed prototype in **three.js** that uses **tween.js** (and optionally other libraries such as ammo.js).

In this project:

* Five cubes are placed on a simple floor/ground plane.
* Each cube performs a sequence:

  * It jumps up.
  * It rotates.
  * It changes scale slightly.
  * It falls back down with a bounce.
* Cubes are animated using **tween.js** with easing functions and small delays so the movement looks like a wave.
* The camera moves around the cubes along a smooth orbit, also driven by tween.js.
* The user can **orbit the camera with the mouse** thanks to `OrbitControls`.
* Pressing **Space** resets the choreography.

The prototype is intentionally small and focused in order to clearly show the use of tween.js in a three.js scene.

---

## Features

* 3D scene with floor and dynamic lighting.
* Five coloured cubes performing a looping choreography.
* Animations built entirely with **tween.js**:

  * Position (jumping).
  * Rotation.
  * Scaling.
* Camera orbit animation using tween.js.
* Interactive camera control with the mouse (OrbitControls).
* Keyboard shortcut (**Space**) to restart the animation.

---

## Project structure

Relevant files:

* `index.html`
  Entry point for the assignment. It mounts the app into the `#app` element and loads `main.js`.
  Other files such as `script_41_tween.js` … `script_47_bones.js` are example scripts provided with the course and **do not belong to the final prototype**.

* `main.js`
  Main script of this project. It:

  * Sets up the three.js scene (renderer, camera, lights, floor).
  * Creates the cube meshes.
  * Configures `OrbitControls`.
  * Defines the choreography using **tween.js**.
  * Runs the animation loop (`requestAnimationFrame`) and updates `TWEEN`.

---

## Technologies

* [three](https://www.npmjs.com/package/three)
* [@tweenjs/tween.js](https://www.npmjs.com/package/@tweenjs/tween.js)

The setup follows the same development environment used in the course skeleton for this assignment.

---


## Controls

* **Mouse drag** – Orbit the camera around the scene.
* **Mouse wheel** – Zoom in / out.
* **Space bar** – Restart the cube choreography from the beginning.

---

## Demonstration
[VIDEO](demo.mp4)
[ANIMATION](https://msr9q3.csb.app/)

---

## Assignment context

This project was developed as part of the assignment:

* **Title:** S10 – Animation with three.js and tween.js
* **Course:** *Animacion Digital*
* **Degree:** *Grado en Ingeniería Informática*
* **Academic year:** *2024/2025*
* **University:** *Universidad de Las Palmas de Gran Canaria*

---

## Author: *Raul Reguera Bravo*
