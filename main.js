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

// Full-page overlay system - Cozy Terminal Style
const fullPageOverlay = document.createElement('div');
fullPageOverlay.style.position = 'fixed';
fullPageOverlay.style.top = '0';
fullPageOverlay.style.left = '0';
fullPageOverlay.style.width = '100%';
fullPageOverlay.style.height = '100%';
fullPageOverlay.style.backgroundColor = '#2d1b0e';
fullPageOverlay.style.background = 'linear-gradient(135deg, #2d1b0e 0%, #3d2815 50%, #2d1b0e 100%)';
fullPageOverlay.style.color = '#d4af37';
fullPageOverlay.style.padding = '0';
fullPageOverlay.style.display = 'none';  // Hide initially
fullPageOverlay.style.fontFamily = 'Monaco, "Courier New", monospace';
fullPageOverlay.style.overflow = 'auto';
fullPageOverlay.style.zIndex = '1000';
fullPageOverlay.style.border = '2px solid #8b4513';

// Terminal header bar
const terminalHeader = document.createElement('div');
terminalHeader.style.width = '100%';
terminalHeader.style.height = '30px';
terminalHeader.style.backgroundColor = '#4a3429';
terminalHeader.style.borderBottom = '1px solid #8b4513';
terminalHeader.style.display = 'flex';
terminalHeader.style.alignItems = 'center';
terminalHeader.style.padding = '0 15px';
terminalHeader.style.fontSize = '12px';
terminalHeader.style.color = '#d4af37';

// Terminal title
const terminalTitle = document.createElement('div');
terminalTitle.innerHTML = 'emilykelt@terminal:~$ portfolio.exe';
terminalTitle.style.flex = '1';

// Terminal controls
const terminalControls = document.createElement('div');
terminalControls.style.display = 'flex';
terminalControls.style.gap = '8px';

const minimizeBtn = document.createElement('div');
minimizeBtn.innerHTML = '−';
minimizeBtn.style.width = '12px';
minimizeBtn.style.height = '12px';
minimizeBtn.style.backgroundColor = '#d4af37';
minimizeBtn.style.borderRadius = '50%';
minimizeBtn.style.display = 'flex';
minimizeBtn.style.alignItems = 'center';
minimizeBtn.style.justifyContent = 'center';
minimizeBtn.style.fontSize = '10px';
minimizeBtn.style.cursor = 'pointer';
minimizeBtn.style.color = '#2d1b0e';

const closeBtn = document.createElement('div');
closeBtn.innerHTML = '×';
closeBtn.style.width = '12px';
closeBtn.style.height = '12px';
closeBtn.style.backgroundColor = '#cd853f';
closeBtn.style.borderRadius = '50%';
closeBtn.style.display = 'flex';
closeBtn.style.alignItems = 'center';
closeBtn.style.justifyContent = 'center';
closeBtn.style.fontSize = '10px';
closeBtn.style.cursor = 'pointer';
closeBtn.style.color = '#2d1b0e';

terminalControls.appendChild(minimizeBtn);
terminalControls.appendChild(closeBtn);
terminalHeader.appendChild(terminalTitle);
terminalHeader.appendChild(terminalControls);

// Back button - Cozy Terminal style
const backButton = document.createElement('button');
backButton.innerHTML = '$ exit';
backButton.style.position = 'fixed';
backButton.style.top = '40px';
backButton.style.left = '20px';
backButton.style.padding = '8px 16px';
backButton.style.backgroundColor = '#4a3429';
backButton.style.color = '#d4af37';
backButton.style.border = '1px solid #8b4513';
backButton.style.borderRadius = '0';
backButton.style.fontFamily = 'Monaco, "Courier New", monospace';
backButton.style.fontSize = '14px';
backButton.style.cursor = 'pointer';
backButton.style.zIndex = '1001';
backButton.style.textShadow = '0 0 3px #d4af37';


// Content container - Cozy Terminal style
const contentContainer = document.createElement('div');
contentContainer.style.marginTop = '80px';
contentContainer.style.padding = '20px 30px';
contentContainer.style.backgroundColor = 'transparent';
contentContainer.style.border = 'none';
contentContainer.style.maxWidth = '90%';
contentContainer.style.marginLeft = 'auto';
contentContainer.style.marginRight = 'auto';
contentContainer.style.lineHeight = '1.6';
contentContainer.style.textShadow = '0 0 1px #d4af37';

fullPageOverlay.appendChild(terminalHeader);
fullPageOverlay.appendChild(backButton);
fullPageOverlay.appendChild(contentContainer);


// Mouse click event listener
window.addEventListener('click', onMouseClick, false);

// Back button functionality
backButton.addEventListener('click', () => {
    fullPageOverlay.style.display = 'none';
    document.body.removeChild(fullPageOverlay);
});


// Function to show content page
function showContentPage(content) {
    // Clear existing content
    contentContainer.innerHTML = '';
    
    // Create main content window
    const mainWindow = document.createElement('div');
    mainWindow.style.cssText = `
        background: rgba(45, 27, 14, 0.85);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(212, 175, 55, 0.3);
        border-radius: 15px;
        padding: 25px;
        margin: 20px auto;
        max-width: 90%;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        color: #d4af37;
        font-family: Monaco, 'Courier New', monospace;
        text-shadow: 0 0 1px #d4af37;
        line-height: 1.6;
    `;
    
    mainWindow.innerHTML = content;
    contentContainer.appendChild(mainWindow);
    
    document.body.appendChild(fullPageOverlay);
    fullPageOverlay.style.display = 'block';
}


// Helper function to create glass effect windows
function createGlassWindow(content) {
    const window = document.createElement('div');
    window.style.cssText = `
        background: rgba(45, 27, 14, 0.75);
        backdrop-filter: blur(15px);
        border: 1px solid rgba(212, 175, 55, 0.4);
        border-radius: 12px;
        padding: 20px;
        margin: 15px auto;
        max-width: 85%;
        box-shadow: 0 6px 24px rgba(0, 0, 0, 0.2);
        color: #d4af37;
        font-family: Monaco, 'Courier New', monospace;
        text-shadow: 0 0 1px #d4af37;
        line-height: 1.5;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
    `;
    
    window.innerHTML = content;
    
    // Add hover effect
    window.addEventListener('mouseenter', () => {
        window.style.transform = 'translateY(-2px)';
        window.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
    });
    
    window.addEventListener('mouseleave', () => {
        window.style.transform = 'translateY(0)';
        window.style.boxShadow = '0 6px 24px rgba(0, 0, 0, 0.2)';
    });
    
    return window;
}

// Function to show experience page with glass windows
function showExperiencePage() {
    // Clear existing content
    contentContainer.innerHTML = '';
    
    // Create header window
    const headerWindow = createGlassWindow(`
        <h2 style="margin: 0 0 15px 0; color: #d4af37; text-align: center;">EXPERIENCE & PROJECTS</h2>
        <p style="margin: 0; text-align: center; opacity: 0.8;">Personal projects and professional experience</p>
    `);
    contentContainer.appendChild(headerWindow);
    
    // Create Personal Projects window first
    const projectsWindow = createGlassWindow(`
        <h3 style="margin: 0 0 15px 0; color: #d4af37; text-align: center;">PERSONAL PROJECTS</h3>
        <p style="margin: 0; text-align: center; opacity: 0.8;">[I'm working on making this section more interactive -- stay tuned! Meanwhile look at my LinkedIn/GitHub]</p>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 15px; margin-top: 15px;">
            <div style="padding: 12px; background: rgba(212, 175, 55, 0.1); border-radius: 8px; border: 1px solid rgba(212, 175, 55, 0.2);">
                <h4 style="margin: 0 0 8px 0; color: #d4af37; font-size: 0.95em;">🤖 Graph Machine Learning [IN PROGRESS]</h4>
                <p style="margin: 0 0 6px 0; font-size: 0.8em; opacity: 0.8; font-style: italic;">Python</p>
                <p style="margin: 0; font-size: 0.85em; line-height: 1.3;">Exploring graph machine learning with python by implementing a social network from scratch</p>
            </div>
            <div style="padding: 12px; background: rgba(212, 175, 55, 0.1); border-radius: 8px; border: 1px solid rgba(212, 175, 55, 0.2);">
                <h4 style="margin: 0 0 8px 0; color: #d4af37; font-size: 0.95em;">🏥 Medical Data Analysis</h4>
                <p style="margin: 0 0 6px 0; font-size: 0.8em; opacity: 0.8; font-style: italic;">Flask, PostgreSQL, AWS S3</p>
                <p style="margin: 0; font-size: 0.85em; line-height: 1.3;">Custom visualization library and tool for patient history medical practices with legal compliance</p>
            </div>
            <div style="padding: 12px; background: rgba(212, 175, 55, 0.1); border-radius: 8px; border: 1px solid rgba(212, 175, 55, 0.2);">
                <h4 style="margin: 0 0 8px 0; color: #d4af37; font-size: 0.95em;">🔐 Password Manager</h4>
                <p style="margin: 0 0 6px 0; font-size: 0.8em; opacity: 0.8; font-style: italic;">Python, Flask, RSA Encryption</p>
                <p style="margin: 0; font-size: 0.85em; line-height: 1.3;">Secure password storage with RSA encryption I learned & implemented myself and GUI interface</p>
            </div>
            <div style="padding: 12px; background: rgba(212, 175, 55, 0.1); border-radius: 8px; border: 1px solid rgba(212, 175, 55, 0.2);">
                <h4 style="margin: 0 0 8px 0; color: #d4af37; font-size: 0.95em;">☀️ Road Trip Weather Planner</h4>
                <p style="margin: 0 0 6px 0; font-size: 0.8em; opacity: 0.8; font-style: italic;">React Native, Weather API</p>
                <p style="margin: 0; font-size: 0.85em; line-height: 1.3;">Fully funcitonal weather app with live data that helps you plan road trips around the weather and gives warnings. Includes a real time map. </p>
            </div>
            <div style="padding: 12px; background: rgba(212, 175, 55, 0.1); border-radius: 8px; border: 1px solid rgba(212, 175, 55, 0.2);">
                <h4 style="margin: 0 0 8px 0; color: #d4af37; font-size: 0.95em;">👩‍💻 CamHack</h4>
                <p style="margin: 0 0 6px 0; font-size: 0.8em; opacity: 0.8; font-style: italic;">Python, Flask, HuggingFace</p>
                <p style="margin: 0; font-size: 0.85em; line-height: 1.3;">AI that analysed Instagram profiles, created fake personas (agents) who had a conversation with each other, then sentiment analysed this to gauge 'compatibility score'</p>
            </div>
            <div style="padding: 12px; background: rgba(212, 175, 55, 0.1); border-radius: 8px; border: 1px solid rgba(212, 175, 55, 0.2);">
                <h4 style="margin: 0 0 8px 0; color: #d4af37; font-size: 0.95em;">🛰️ CANSAT Project</h4>
                <p style="margin: 0 0 6px 0; font-size: 0.8em; opacity: 0.8; font-style: italic;">CAD, Electronics, Python, Arduino</p>
                <p style="margin: 0; font-size: 0.85em; line-height: 1.3;">Group engineering project with CAD modeling and circuit design. I was project manager, and software developer.</p>
            </div>
        </div>
    `);
    contentContainer.appendChild(projectsWindow);
    
    // Create Professional Experience header
    const expHeaderWindow = createGlassWindow(`
        <h3 style="margin: 0 0 15px 0; color: #d4af37; text-align: center;">PROFESSIONAL EXPERIENCE</h3>
        <p style="margin: 0; text-align: center; opacity: 0.8;">Work experience and internships</p>
    `);
    contentContainer.appendChild(expHeaderWindow);
    
    // Create experience windows
    const experiences = [
        {
            title: "🏢 Autodesk - Software Engineer Intern",
            period: "Jun-Sep 2025",
            location: "Birmingham, UK | Full-time in-office",
            highlights: [
                "Part of new scrum team developing CAD functionality for Sheet Metal",
                "C++ development in large OOP codebase for Autodesk Fusion", 
                "Created seperation of a specific type of geometry modelling (Flange) -- involving geometry and edge selection",
                "React, TypeScript, document databases for new libraries tool - worked on a new ambiguous project",
                "Streamlined team workflow and increased efficiency of the brand new team",
                "Only first-year undergraduate intern accepted"
            ]
        },
        {
            title: "💳 Fintech Startup - Tech & Strategy Intern",
            period: "Jun-Sep 2025", 
            location: "Remote | Part-time, Evening/Weekend",
            highlights: [
                "Developed hi-fidelity biometric payment system prototype",
                "Merchant dashboard and mock APIs with MySQL/AWS Aurora",
                "React Native app development, which synced with POS screen and dashboard",
                "Assisted with university deployment strategy",
                "Analyzed data for Gen Z marketing strategy"
            ]
        },
        {
            title: "📈 Jane Street WiSE & Insight Programs",
            period: "Aug 2024 & Apr 2025",
            location: "London, UK | Software Development/Trading Insight",
            highlights: [
                "Financial markets, game theory, computer science talks",
                "Market simulation games and probability calculations",
                "OCaml programming language exploration"
            ]
        },
        {
            title: "🏛️ Deloitte Spring Week",
            period: "Apr 2025",
            location: "Manchester, UK | Technology, Strategy, and Risk", 
            highlights: [
                "Case study of sustainable energy company",
                "Technology data insights for business planning",
                "Presented growth strategy to senior partners",
                "Highly commended presentation with key strategy I came up with"
            ]
        },
        {
            title: "💻 Freelance Software Development",
            period: "Jun 2022 - Aug 2024",
            location: "Remote | Medical Data Analysis",
            highlights: [
                "Medical practice data analysis software",
                "Custom graphing library for high-value clients", 
                "Flask, PostgreSQL, AWS S3, GitHub Actions",
                "Legal compliance adherence",
                "also a BMI calculator for NHS practices",
                "& Interactive workbook for Edinburgh University"
            ]
        },
        {
            title: "🔭 STFC Astronomy Technology",
            period: "Jun 2023",
            location: "Edinburgh, UK | Work Experience",
            highlights: [
                "Python image correction for UKATC satellites",
                "Gaia mission data analysis with machine learning",
                "Bayesian Mixture Modelling for star clusters", 
                "CANSAT project management & CAD development",
                "Electronic circuit design and 3D path modeling"
            ]
        },
        
        {
            title: "🏆 Competitions & Achievements",
            period: "2019-2025",
            location: "Various Locations",
            highlights: [
                "UKMT Maths Challenge: Golds & Best in School (2019-2023)",
                "Bebras Senior & Elite: Distinctions & Best in Schools (2019, 2024)",
                "UKMT Einstein Mad Hat: Runner up (2023)",
                "Future Assets Investment: Portfolio analysis (2022-2023)",
                "Institute of Physics Eurekas: Runner up (2022)",
                "Scottish Government Climate Writing: Winner (2020)"
            ]
        }
    ];
    
    experiences.forEach(exp => {
        const expWindow = createGlassWindow(`
            <h3 style="margin: 0 0 8px 0; color: #d4af37;">${exp.title}</h3>
            <p style="margin: 0 0 6px 0; font-size: 0.9em; opacity: 0.8; font-style: italic;">${exp.period}</p>
            <p style="margin: 0 0 12px 0; font-size: 0.85em; opacity: 0.7;">${exp.location}</p>
            <ul style="margin: 0; padding-left: 20px; font-size: 0.9em; line-height: 1.4;">
                ${exp.highlights.map(highlight => `<li style="margin-bottom: 4px;">${highlight}</li>`).join('')}
            </ul>
        `);
        contentContainer.appendChild(expWindow);
    });
    
    document.body.appendChild(fullPageOverlay);
    fullPageOverlay.style.display = 'block';
}

// Function to show academic page with glass windows
function showAcademicPage() {
    // Clear existing content
    contentContainer.innerHTML = '';
    
    // Create header window
    const headerWindow = createGlassWindow(`
        <h2 style="margin: 0 0 15px 0; color: #d4af37; text-align: center;">🎓 EDUCATION & QUALIFICATIONS</h2>
        <p style="margin: 0; text-align: center; opacity: 0.8;">University and high school achievements</p>
    `);
    contentContainer.appendChild(headerWindow);
    
    // Create University section
    const universityWindow = createGlassWindow(`
        <h3 style="margin: 0 0 15px 0; color: #d4af37; text-align: center;">🏫 UNIVERSITY EDUCATION</h3>
        <div style="padding: 15px; background: rgba(212, 175, 55, 0.1); border-radius: 8px; border: 1px solid rgba(212, 175, 55, 0.2);">
            <h4 style="margin: 0 0 8px 0; color: #d4af37; font-size: 1.1em;">University of Cambridge - Computer Science</h4>
            <p style="margin: 0 0 6px 0; font-size: 0.9em; opacity: 0.8; font-style: italic;">Oct 2024 – July 2027 | BA Computer Science, Pembroke College</p>
            <ul style="margin: 0; padding-left: 20px; font-size: 0.9em; line-height: 1.4;">
                <li style="margin-bottom: 4px;"><strong>Societies:</strong> CUCATS (Computer Science Society), Hackathon, Social Media/Events officer for University Scottish Society, Ski Society</li>
                <li style="margin-bottom: 4px;"><strong>Coursework:</strong> IA covered many courses such as Data Structures & Algorithms, OOP, Discrete Maths, Digital Electronics, Probability, and more</li>
            </ul>
        </div>
    `);
    contentContainer.appendChild(universityWindow);
    
    // Create High School section
    const highSchoolWindow = createGlassWindow(`
        <h3 style="margin: 0 0 15px 0; color: #d4af37; text-align: center;">🏫 HIGH SCHOOL EDUCATION</h3>
        <div style="padding: 15px; background: rgba(212, 175, 55, 0.1); border-radius: 8px; border: 1px solid rgba(212, 175, 55, 0.2);">
            <h4 style="margin: 0 0 8px 0; color: #d4af37; font-size: 1.1em;">Craigmount High School, Edinburgh</h4>
            <p style="margin: 0 0 12px 0; font-size: 0.9em; opacity: 0.8; font-style: italic;">August 2018 – April 2024 | SQA Qualifications</p>
            
            <div style="margin-bottom: 15px;">
                <h5 style="margin: 0 0 8px 0; color: #d4af37; font-size: 1em;">Advanced Highers (A1 = A* equivalent, 85%+)</h5>
                <ul style="margin: 0; padding-left: 20px; font-size: 0.9em; line-height: 1.4;">
                    <li style="margin-bottom: 4px;"><strong>Mathematics:</strong> A1</li>
                    <li style="margin-bottom: 4px;"><strong>Computer Science:</strong> A1 (Password manager project, 89/90)</li>
                    <li style="margin-bottom: 4px;"><strong>Physics:</strong> A1 (Light polarization investigation)</li>
                </ul>
            </div>
            
            <div style="margin-bottom: 15px;">
                <h5 style="margin: 0 0 8px 0; color: #d4af37; font-size: 1em;">Highers (A1)</h5>
                <ul style="margin: 0; padding-left: 20px; font-size: 0.9em; line-height: 1.4;">
                    <li style="margin-bottom: 4px;"><strong>Mathematics:</strong> A1</li>
                    <li style="margin-bottom: 4px;"><strong>Computer Science:</strong> A1</li>
                    <li style="margin-bottom: 4px;"><strong>Physics:</strong> A1</li>
                    <li style="margin-bottom: 4px;"><strong>English:</strong> A1</li>
                    <li style="margin-bottom: 4px;"><strong>Graphic Communication:</strong> A1 (CAD/Engineering/Architecture)</li>
                    <li style="margin-bottom: 4px;"><strong>Art:</strong> A1 (Expressive/Design projects)</li>
                </ul>
            </div>
            
            <div style="margin-bottom: 15px;">
                <h5 style="margin: 0 0 8px 0; color: #d4af37; font-size: 1em;">National 5 (A1)</h5>
                <p style="margin: 0 0 8px 0; font-size: 0.9em; line-height: 1.4;">Mathematics, English, Computer Science, Physics, Graphic Communication, Engineering Science, Cyber Security</p>
            </div>
            
            <div>
                <h5 style="margin: 0 0 8px 0; color: #d4af37; font-size: 1em;">Achievements</h5>
                <ul style="margin: 0; padding-left: 20px; font-size: 0.9em; line-height: 1.4;">
                    <li style="margin-bottom: 4px;">Consistently top of school awards for: Maths, Computer Science, Physics</li>
                    <li style="margin-bottom: 4px;">Engineering Science, Graphic Communication excellence</li>
                    <li style="margin-bottom: 4px;">A1 equivalent to A* (85%+ score requirement)</li>
                    <li style="margin-bottom: 4px;">Organised and led STEM clubs for juniors, and initiatives to get more young women involved</li>
                </ul>
            </div>
        </div>
    `);
    contentContainer.appendChild(highSchoolWindow);
    
    document.body.appendChild(fullPageOverlay);
    fullPageOverlay.style.display = 'block';
}

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

        // Content definitions - Terminal Style
        const contentData = {
            "About": `
<pre style="color: #d4af37; font-family: Monaco, 'Courier New', monospace; text-shadow: 0 0 1px #d4af37;">


$ cat about.txt
Hi, I'm Emily Kelt
🎓 Studying Computer Science at University of Cambridge, Pembroke College
📅 Second year, expecting to graduate in 2027

$ cat hobbies.txt
🖼️ Art & Design
✈️  Travel
📚 Reading
🧗 Climbing
✍️  Writing
🥾 Hiking

            </pre>`,
            
            "Experience": `
<pre style="color: #d4af37; font-family: Monaco, 'Courier New', monospace; text-shadow: 0 0 1px #d4af37;">
$ cat autodesk/README.md
🏢 AUTODESK - SOFTWARE ENGINEER INTERN (JUN-SEP 2025)
====================================================
Birmingham, UK | Full-time in-office

- Part of new scrum team developing CAD functionality for Sheet Metal
- C++ development in large OOP codebase for Autodesk Fusion
- React, TypeScript, document databases for new libraries tool
- Streamlined team workflow and increased efficiency
- Only first-year undergraduate intern accepted

═══════════════════════════════════════════════════════════════

$ cat fintech/README.md
💳 FINTECH STARTUP - TECH & STRATEGY INTERN (JUN-SEP 2025)
==========================================================
Remote | Part-time, Evening/Weekend

- Developed hi-fidelity biometric payment system prototype
- Merchant dashboard and mock APIs with MySQL/AWS Aurora
- Presented system during client meetings
- Assisted with university deployment strategy
- Analyzed data for Gen Z marketing strategy

═══════════════════════════════════════════════════════════════

$ cat deloitte/README.md
🏛️  DELOITTE SPRING WEEK (APR 2025)
===================================
Manchester, UK | Technology, Strategy, and Risk

- Case study of sustainable energy company
- Technology data insights for business planning
- Presented growth strategy to senior partners
- Highly commended presentation with on-spot strategy

═══════════════════════════════════════════════════════════════

$ cat freelance/README.md
💻 FREELANCE SOFTWARE DEVELOPMENT (JUN 2022 - AUG 2024)
======================================================
Remote | Medical Data Analysis

- Medical practice data analysis software
- Custom graphing library for high-value clients
- Flask, PostgreSQL, AWS S3, GitHub Actions
- Legal compliance adherence
- BMI calculator for NHS practices
- Interactive workbook for Edinburgh University

═══════════════════════════════════════════════════════════════

$ cat astronomy/README.md
🔭 STFC ASTRONOMY TECHNOLOGY (JUN 2023)
======================================
Edinburgh, UK | Work Experience

- Python image correction for UKATC satellites
- Gaia mission data analysis with machine learning
- Bayesian Mixture Modelling for star clusters
- CANSAT project management & CAD development
- Electronic circuit design and 3D path modeling

═══════════════════════════════════════════════════════════════

$ cat jane_street/README.md
📈 JANE STREET WiSE & INSIGHT PROGRAMS (AUG 2024 & APR 2025)
============================================================
London, UK | Software Development/Trading Insight

- Financial markets, game theory, computer science talks
- Market simulation games and probability calculations
- OCaml programming language exploration

═══════════════════════════════════════════════════════════════

$ cat competitions/README.md
🏆 COMPETITIONS & ACHIEVEMENTS
=============================
- UKMT Maths Challenge: Golds & Best in School (2019-2023)
- Bebras Senior & Elite: Distinctions & Best in Schools (2019, 2024)
- UKMT Einstein Mad Hat: Runner up (2023)
- Future Assets Investment: Portfolio analysis (2022-2023)
- Institute of Physics Eurekas: Runner up (2022)
- Scottish Government Climate Writing: Winner (2020)
            </pre>`,
            
            "Academic": `
<pre style="color: #d4af37; font-family: Monaco, 'Courier New', monospace; text-shadow: 0 0 1px #d4af37;">
$ cat education.txt
🏫 CURRENT: Cambridge University - Computer Science
📅 Expected Graduation: 2027

$ cat high_school.txt
🏫 Craigmount High School, Edinburgh

Advanced Highers (A1 = A* equivalent, 85%+):
├── Mathematics: A1
├── Computer Science: A1 (Password manager project, 89/90)
└── Physics: A1 (Light polarization investigation)

Highers (A1):
├── Mathematics: A1
├── Computer Science: A1
├── Physics: A1
├── English: A1
├── Graphic Communication: A1 (CAD/Engineering/Architecture)
└── Art: A1 (Expressive/Design projects)

National 5 (A1):
├── Mathematics, English, Computer Science
├── Physics, Graphic Communication
├── Engineering Science, Cyber Security

$ cat achievements.txt
- Consistently top of school awards for: Maths, Computer Science, Physics
- Engineering Science, Graphic Communication excellence
- A1 equivalent to A* (85%+ score requirement)
            </pre>`,
            
            "Contact": `
<pre style="color: #d4af37; font-family: Monaco, 'Courier New', monospace; text-shadow: 0 0 1px #d4af37;">
$ cat contact.txt
👥 Personal Email: <a href="mailto:emilykelt@icloud.com" style="color: #d4af37; text-decoration: underline;">emilykelt@icloud.com</a>
🎓 Academic Email: <a href="mailto:emk50@cam.ac.uk" style="color: #d4af37; text-decoration: underline;">emk50@cam.ac.uk</a>
🔗 LinkedIn: <a href="https://www.linkedin.com/in/emily-kelt-801697256" style="color: #d4af37; text-decoration: underline;">linkedin.com/in/emily-kelt-801697256</a>
🐙 GitHub: <a href="https://github.com/emilykelt" style="color: #d4af37; text-decoration: underline;">github.com/emilykelt</a>
🌐 Portfolio: <a href="https://emilykelt.github.io/about" style="color: #d4af37; text-decoration: underline;">emilykelt.github.io/about</a>


            </pre>`,
            
            "Skills": `
<pre style="color: #d4af37; font-family: Monaco, 'Courier New', monospace; text-shadow: 0 0 1px #d4af37;">
$ cat skills.txt
TECHNICAL SKILLS
================

Python        ████████████████████ 90%
SQL           ███████████████████  85%
JavaScript    ████████████████     70%
Flask         ████████████████     70%
HTML/CSS      ████████████████     70%
PHP           ███████████████      65%
C++           ███████████████      65%
AWS           ███████████████      65%
Java          ██████████           50%
OCaml         ████████             40%
React         ████████             40%


            </pre>`
        };

        // Find clicked object and show content
        for (const intersect of intersects) {
            const objectName = intersect.object.name;
            if (contentData[objectName]) {
                if (objectName === "Experience") {
                    showExperiencePage();
                } else if (objectName === "Academic") {
                    showAcademicPage();
        } else {
                    showContentPage(contentData[objectName]);
                }
                break; // Only show the first matching content
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
  
  