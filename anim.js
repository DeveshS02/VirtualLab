// Create a Three.js scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 300);

// Create a Three.js renderer and add it to the DOM
const renderer = new THREE.WebGLRenderer();
renderer.setSize(1200,600);
document.getElementById("canvas-container").appendChild(renderer.domElement);

// Create a coil geometry and material
const coilRadius = 50;
const coilHeight = 300;
const coilTurns = 10;
const coilResistance = 100;
const coilGeometry = new THREE.CylinderGeometry(coilRadius, coilRadius, coilHeight, 32, coilTurns, true);
const coilMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe: true});
const coilMesh = new THREE.Mesh(coilGeometry, coilMaterial);
coilMesh.rotation.z = Math.PI / 2; // Rotate the coil so it is perpendicular to the plane of the screen
scene.add(coilMesh);


let magnetVelocity = 0;
// Create a magnet geometry and material
// const magnetWidth = 70;
// const magnetHeight = 20;
// const magnetGeometry = new THREE.PlaneGeometry(magnetWidth, magnetHeight);
// const magnetMaterial = new THREE.MeshBasicMaterial({color: 0xff0000});
// const magnetMesh = new THREE.Mesh(magnetGeometry, magnetMaterial);
// magnetMesh.position.y = 0; // Place the magnet at the center of the coil along the y-axis
// magnetMesh.position.z = coilRadius; // Place the magnet at the top of the coil along the z-axis
// scene.add(magnetMesh);

// Create a magnet geometry and material
const magnetWidth = 70;
const magnetHeight = 20;
const magnetGeometry = new THREE.PlaneGeometry(magnetWidth, magnetHeight);

// Create the gradient texture for the material
const gradientCanvas = document.createElement('canvas');
gradientCanvas.width = 256;
gradientCanvas.height = 1;
const gradientContext = gradientCanvas.getContext('2d');
const gradient = gradientContext.createLinearGradient(0, 0, 256, 0);
gradient.addColorStop(0, 'red');
gradient.addColorStop(0.5, 'red');
gradient.addColorStop(0.5, 'blue');
gradient.addColorStop(1, 'blue');
gradientContext.fillStyle = gradient;
gradientContext.fillRect(0, 0, 256, 1);
const gradientTexture = new THREE.CanvasTexture(gradientCanvas);

// Create the magnet material with the gradient texture
const magnetMaterial = new THREE.MeshBasicMaterial({
  map: gradientTexture,
  side: THREE.DoubleSide,
});

// Create the magnet mesh with the geometry and material
const magnetMesh = new THREE.Mesh(magnetGeometry, magnetMaterial);

// Position the magnet at the center of the coil along the y-axis and at the top of the coil along the z-axis
magnetMesh.position.y = 0;
magnetMesh.position.z = coilRadius;

// Add the magnet mesh to the scene
scene.add(magnetMesh);

// Get a reference to the canvas container element
const canvasContainer = document.getElementById("canvas-container");

// Define variables to track magnet position and time of last magnet movement
let magnetPosition = magnetMesh.position.x;
const magnetMoment = 40;
let lastMagnetMoveTime = Date.now();

// Define variables to track induced EMF and current in the coil
let inducedEmf = 0;
let inducedCurrent = 0;

// Define text elements for displaying induced EMF and current on the screen
const emfText = document.createElement("div");
emfText.style.position = "relative";
emfText.style.color = "white";
emfText.style.left = "47%";
document.body.appendChild(emfText);

const currentText = document.createElement("div");
currentText.style.position = "relative";
currentText.style.color = "white";
currentText.style.left = "47%";
document.body.appendChild(currentText);

const velocityText = document.createElement("div");
velocityText.style.position = "relative";
velocityText.style.left = "47%";
velocityText.style.color = "white";
document.body.appendChild(velocityText);

// Add event listener for mouse movement on the canvas container element
canvasContainer.addEventListener("mousemove", updateMagnetPosition);

// Update the magnet position based on mouse movement along the x axis
function updateMagnetPosition(event) {
  const mouseX = event.clientX - canvasContainer.offsetWidth / 2; // get the x-position of the mouse relative to the center of the screen
  magnetPosition = mouseX; // set the x-position of the magnet to the x-position of the mouse

}

// Render the scene
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  
  // Calculate time since last magnet movement
  const currentTime = Date.now();
  const deltaTime = (currentTime - lastMagnetMoveTime) / 1000; // convert from milliseconds to seconds
  
  
  // Only update induced EMF and current if the magnet has// moved since the last frame

  if (magnetPosition !== magnetMesh.position.x) {
    // Calculate change in magnetic flux through the coil
    const deltaFlux = calculateDeltaFlux(deltaTime);
    // Calculate induced EMF in the coil
inducedEmf = calculateInducedEmf(deltaFlux, deltaTime);

// Calculate induced current in the coil
inducedCurrent = calculateInducedCurrent(inducedEmf, coilResistance);

// Update the magnet position and last movement time
magnetMesh.position.x = magnetPosition;
lastMagnetMoveTime = currentTime;
emfText.innerHTML = `Induced EMF: ${inducedEmf.toFixed(2)} mV`;
currentText.innerHTML = `Induced Current: ${inducedCurrent.toFixed(2)} mA`;
velocityText.innerHTML = `Velocity: ${(magnetVelocity*100000000).toFixed(2)} px/s`;
}
// Update text elements on the screen
}


// Calculate change in magnetic flux through the coil
function calculateDeltaFlux(deltaTime) {
magnetVelocity = (magnetMesh.position.x - magnetPosition) / (deltaTime*100000000);
const coilArea = Math.PI * coilRadius * coilHeight;
const deltaFlux = magnetVelocity * coilArea;
return deltaFlux;
}

// Calculate induced EMF in the coil
function calculateInducedEmf(deltaFlux, deltaTime) {
const inducedEmf = -1 * deltaFlux / deltaTime;
return inducedEmf;
}

// Calculate induced current in the coil
function calculateInducedCurrent(inducedEmf, coilResistance) {
const inducedCurrent = inducedEmf / coilResistance;
return inducedCurrent;
}

animate();