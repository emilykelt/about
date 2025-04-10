import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

  // Set up the scene, camera, and renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();
  renderer.shadowMap.enabled = true; // Enable shadows
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Soft shadows
  const loader = new GLTFLoader();

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Create a cube
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.05); 
scene.add(ambientLight);



const directionalLight = new THREE.DirectionalLight(0xffffff, 0.1);
        directionalLight.position.set(10, 10, 10);
        directionalLight.castShadow = true; 
        directionalLight.shadow.mapSize.width = 1024;
        directionalLight.shadow.mapSize.height = 1024;
        directionalLight.shadow.camera.near = 0.5;
        directionalLight.shadow.camera.far = 50;

        scene.add(directionalLight);


        const light = new THREE.PointLight( 0xffffff, 30, 100 );
        light.position.set( 0, 3, 4 );
        scene.add( light );

        const candlelight = new THREE.PointLight( 0xffffff, 5, 10);
        candlelight.position.set( 1.8, -0.5, 0.4);
        scene.add( candlelight );

        const picLight = new THREE.PointLight( 0xffffff, 5, 10);
        picLight.position.set( -7, 1.5, 0.4);
        scene.add( picLight );


  //scene.add(cube);

  let bookcase;
loader.load('./bookcase.glb', function (gltf) {
    bookcase = gltf.scene;
    bookcase.rotation.y = Math.PI; 
    console.log(bookcase)
    scene.add(bookcase);




}, undefined, function (error) {
    console.error(error);
});

  // Position the camera
  camera.position.z = 7;

// OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = false;
controls.maxPolarAngle = Math.PI / 2; 
controls.minPolarAngle = Math.PI / 2; 
controls.maxAzimuthAngle = Math.PI/4;
controls.minAzimuthAngle = -Math.PI/4 ;




// Raycasting setup
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const intersects = [];

const textPopup = document.createElement('div');
textPopup.style.position = 'absolute';
textPopup.style.top = '10%';
textPopup.style.left = '10%';
textPopup.style.padding = '10px';
textPopup.style.backgroundColor = 'rgba(250, 236, 195, 0.9)';
textPopup.style.color = 'brown';
textPopup.style.padding = '5%';
textPopup.style.marginLeft = 'auto';
textPopup.style.marginRight = 'auto';
textPopup.style.maxWidth = "60%";
textPopup.style.display = 'none';  // Hide initially
textPopup.style.fontFamily = 'Courier New';
textPopup.style.borderRadius = '2rem';


// Mouse click event listener
window.addEventListener('click', onMouseClick, false);

// Detect clicks on any mesh in the scene
function onMouseClick(event) {
    // Convert mouse click position to normalized device coordinates (-1 to +1) for both components
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    // Calculate intersections with the whole scene
    intersects.length = 0; // Reset intersections
    raycaster.intersectObjects(scene.children, true, intersects);

    if (intersects.length > 0) {
        // Debug: Log all intersected objects and their names
        console.log("Intersected objects:");
        intersects.forEach((intersect) => {
            console.log(intersect.object.name || "Unnamed object");
        });


        // CHANGE THIS SO THAT IT IS A FUNCTION RATHER THAN REPEATED CODE!!!!
        const aboutIntersect = intersects.find(
            (intersect) => intersect.object.name === "About"
        );

        const academicIntersect = intersects.find(
            (intersect) => intersect.object.name === "Academic"
        );

        const experienceIntersect = intersects.find(
            (intersect) => intersect.object.name === "Experience"
        );

        const contactIntersect = intersects.find(
            (intersect) => intersect.object.name === "Contact"
        );

        const skillsIntersect = intersects.find(
            (intersect) => intersect.object.name === "Skills"
        );

        if (aboutIntersect) {
            textPopup.innerHTML = 'Hi, I\'m Emily Kelt, <br> 🎓 I am studying Computer Science at the University of Cambridge, at Pembroke College. <br><br> I am in my first year, expecting to graduate in 2027. <br><br> 🖼️ My hobbies inlcude: art & design, travel, reading, climbing, writing & hiking';
            document.body.appendChild(textPopup);
            // Toggle popup
            if (textPopup.style.display === "none") {
                textPopup.style.display = "block";
            } else {
          
                textPopup.style.display = "none";
            }
        } else if (experienceIntersect){
            textPopup.innerHTML = ` 
            <h1> 💻 Freelance Software Development </h1> Variety of different full-stack software was been developed independently for clients. Recently, I have developed a for a private medical practice to manage their report system and visualise historical patient data involving creating a custom library to draw visually pleasing graphs for the company’s high-value clients. The software was developed using Flask, AWS, posgreSQL, JavaScript, gitHub actions, and involved adhering to strict legal compliance. <br> Other interesting projects include: a password manager software with RSA encryption and database storage and secure logins, BMI calculator used by NHS practices, interactive workbook for the psychology department at Edinburgh University.  
            <h1>🔭 Astronomy Technology - UKATC</h1>  Used python in analysing images from satellites developed at the UKATC, such as correcting images. Analysed the data of stars from the Gaia mission and used machine learning to isolate different star clusters. Experiencing project management encouraged me to apply it and become project manager of the team for the CANSAT engineering team (as well as designing the CAD model, circuit, and codebase for the project). 
            <h1>📈 Jane Street WiSE Insight Program</h1> Attended talks on a variety of topics to do with economics, game theory, and computer science. Worked on challenging maths and logic problems within a group, valuing everyone\'s contributions. Worked out the ideal game of a card game based on how the market works with expected probabilities. Learned about the OCaml programming language and how it has been optimised for the software created by the company. ` ;
            document.body.appendChild(textPopup);

            if (textPopup.style.display === "none") {
                textPopup.style.display = "block";
            } else {
          
                textPopup.style.display = "none";
            }
        } else if (academicIntersect){
            textPopup.innerHTML = '<h1>🏫 Currently attending Cambridge University, studying Computer Science. </h1> <br><br> <h2><em>Craigmount High School, Edinburgh:</em></h2> <br> <h3>Advanced Highers:</h3> <br> A1 in Maths <br> A1 in Computer Science - for my project I developed a full stack password manager with RSA encryption, only lost 1 mark <br> A1 in Physics - involved a scientific investigation involving 3 or more experiements and analysis. I investiaged the polarisation of light, including reading scientific journals.   <br><br> <h3>Highers: </h3><br> A1 in Maths   <br> A1 in Computer Science  <br> A1 in Physics  <br> A1 in English  <br> A1 in Graphic Communication - CAD/Engineering Drawings, Architecture, Graphic Design <br> A1 in Art - Expressive/Design projects <br><br> <h3>National 5:</h3> <br> A1 in: Maths, English, Computer Science, Physics, Graphic Communication, Engineering Science, Cyber Security <br><br> - A1 is equivalent to A* - awarded for 85%+ score <br> Consistently scored top of school for Maths, Computer Science, Physics, Engineering Science, Graphic Communication ' ;
            document.body.appendChild(textPopup);

            if (textPopup.style.display === "none") {
                textPopup.style.display = "block";
            } else {
          
                textPopup.style.display = "none";
            }
    } else if (contactIntersect){
        textPopup.innerHTML = '👥 personal email: emilykelt@icloud.com <br> 🎓 acadmeic email: emk50@cam.ac.uk ' ;
        document.body.appendChild(textPopup);

        if (textPopup.style.display === "none") {
            textPopup.style.display = "block";
        } else {
      
            textPopup.style.display = "none";
        }
    } else if (skillsIntersect){
        textPopup.innerHTML = `
        
        <progress value="90" max="100"></progress>python
        <br>
        <progress value="85" max="100"></progress>SQL
        <br>
        <progress value="70" max="100"></progress>JavaScript
        <br>
        <progress value="70" max="100"></progress>Flask
        <br>
        <progress value="70" max="100"></progress>HTML/CSS
        <br>
        <progress value="65" max="100"></progress>PHP
        <br>
        <progress value="65" max="100"></progress>AWS
        <br>
        <progress value="50" max="100"></progress>Java
        <br>
        <progress value="40" max="100"></progress>OCaml
        <br>
        <progress value="40" max="100"></progress>React



        `;
        document.body.appendChild(textPopup);

        if (textPopup.style.display === "none") {
            textPopup.style.display = "block";
        } else {
      
            textPopup.style.display = "none";
        }
}
}}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
  