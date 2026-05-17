// 太阳系 3D 探索 - app.js
(function() {
    'use strict';

    // ========== 配置与数据 ==========
    const CONFIG = {
        cameraFov: 45,
        nearPlane: 0.1,
        farPlane: 50000,
        orbitSpeedMultiplier: 1,
        rotationSpeedMultiplier: 1,
        teachScale: true,
        teachMotion: true,
        paused: false
    };

    const PLANETS = [
        {
            key: 'sun', name: '太阳 Sun', type: 'star', typeLabel: '恒星',
            radius: 15, distance: 0, orbitPeriod: 0, rotationPeriod: 25,
            color: 0xffaa00, emissive: 0xff8800, emissiveIntensity: 1,
            description: '太阳是太阳系的中心恒星，占太阳系总质量的99.86%。它是一颗黄矮星，表面温度约5500°C，核心温度高达1500万°C。',
            diameter: '1,392,700 km', distanceFromSun: '0 km', relativeSize: '109x',
            moons: [], texture: 'textures/sun.jpg'
        },
        {
            key: 'mercury', name: '水星 Mercury', type: 'terrestrial', typeLabel: '类地行星',
            radius: 1.2, distance: 35, orbitPeriod: 88, rotationPeriod: 59,
            color: 0xb5b5b5,
            description: '水星是太阳系中最小、最靠近太阳的行星。它的表面布满陨石坑，看起来像月球。由于几乎没有大气层，昼夜温差极大。',
            diameter: '4,879 km', distanceFromSun: '5,790万 km', relativeSize: '0.38x',
            moons: []
        },
        {
            key: 'venus', name: '金星 Venus', type: 'terrestrial', typeLabel: '类地行星',
            radius: 2.0, distance: 55, orbitPeriod: 225, rotationPeriod: 243,
            color: 0xe6c87a,
            description: '金星是太阳系中最热的行星，表面温度高达462°C。它被厚厚的二氧化碳大气层包围，产生强烈的温室效应。',
            diameter: '12,104 km', distanceFromSun: '1.08亿 km', relativeSize: '0.95x',
            moons: []
        },
        {
            key: 'earth', name: '地球 Earth', type: 'terrestrial', typeLabel: '类地行星',
            radius: 2.1, distance: 80, orbitPeriod: 365.25, rotationPeriod: 1,
            color: 0x6b93d6,
            description: '地球是太阳系中唯一已知存在生命的行星，拥有液态水和适宜的大气层。',
            diameter: '12,742 km', distanceFromSun: '1.5亿 km', relativeSize: '1x',
            moons: [{ name: '月球', diameter: '3,474 km' }],
            texture: 'textures/earth_daymap.jpg'
        },
        {
            key: 'moon', name: '月球 Moon', type: 'moon', typeLabel: '卫星',
            radius: 0.6, distance: 86, orbitPeriod: 27.3, rotationPeriod: 27.3,
            color: 0xaaaaaa, parent: 'earth',
            description: '月球是地球唯一的天然卫星，距离地球约38.4万公里。它影响着地球的潮汐，并稳定了地球自转轴的倾斜。',
            diameter: '3,474 km', distanceFromSun: '约1.5亿 km', relativeSize: '0.27x',
            moons: [], texture: 'textures/moon.jpg'
        },
        {
            key: 'mars', name: '火星 Mars', type: 'terrestrial', typeLabel: '类地行星',
            radius: 1.4, distance: 110, orbitPeriod: 687, rotationPeriod: 1.03,
            color: 0xc1440e,
            description: '火星被称为"红色星球"，因为它的表面覆盖着氧化铁（铁锈）。火星有太阳系最高的山峰——奥林匹斯山。',
            diameter: '6,779 km', distanceFromSun: '2.28亿 km', relativeSize: '0.53x',
            moons: [{ name: '火卫一', diameter: '22 km' }, { name: '火卫二', diameter: '12 km' }]
        },
        {
            key: 'ceres', name: '谷神星 Ceres', type: 'dwarf', typeLabel: '矮行星',
            radius: 0.5, distance: 160, orbitPeriod: 1682, rotationPeriod: 9,
            color: 0x9a9a8a,
            description: '谷神星是小行星带中最大的天体，也是唯一一颗位于小行星带内的矮行星。它可能含有大量的水冰。',
            diameter: '940 km', distanceFromSun: '4.14亿 km', relativeSize: '0.07x',
            moons: []
        },
        {
            key: 'jupiter', name: '木星 Jupiter', type: 'jovian', typeLabel: '类木行星',
            radius: 6.5, distance: 200, orbitPeriod: 4333, rotationPeriod: 0.41,
            color: 0xd8ca9d,
            description: '木星是太阳系最大的行星，质量是其他所有行星总和的2.5倍。它的大红斑是一个持续了数百年的巨大风暴。',
            diameter: '139,820 km', distanceFromSun: '7.78亿 km', relativeSize: '11.2x',
            moons: [{ name: '木卫一', diameter: '3,643 km' }, { name: '木卫二', diameter: '3,122 km' }, { name: '木卫三', diameter: '5,268 km' }, { name: '木卫四', diameter: '4,821 km' }]
        },
        {
            key: 'saturn', name: '土星 Saturn', type: 'jovian', typeLabel: '类木行星',
            radius: 5.5, distance: 280, orbitPeriod: 10759, rotationPeriod: 0.45,
            color: 0xead6b8, hasRings: true,
            description: '土星以其壮观的环系统而闻名，这些环主要由冰粒和岩石碎片组成。它是太阳系中密度最小的行星，甚至比水还轻。',
            diameter: '116,460 km', distanceFromSun: '14.3亿 km', relativeSize: '9.45x',
            moons: [{ name: '土卫六', diameter: '5,149 km' }, { name: '土卫二', diameter: '504 km' }]
        },
        {
            key: 'uranus', name: '天王星 Uranus', type: 'jovian', typeLabel: '类木行星',
            radius: 3.5, distance: 360, orbitPeriod: 30687, rotationPeriod: 0.72,
            color: 0xd1e7e7,
            description: '天王星是一颗冰巨星，其自转轴倾斜角度极大，几乎是"躺着"公转的。它的大气中含有甲烷，使其呈现蓝绿色。',
            diameter: '50,724 km', distanceFromSun: '28.7亿 km', relativeSize: '4.0x',
            moons: [{ name: '天卫五', diameter: '472 km' }]
        },
        {
            key: 'neptune', name: '海王星 Neptune', type: 'jovian', typeLabel: '类木行星',
            radius: 3.4, distance: 430, orbitPeriod: 60190, rotationPeriod: 0.67,
            color: 0x5b5ddf,
            description: '海王星是太阳系最远的大行星，拥有太阳系中最强烈的风暴，风速可达2100公里/小时。它的大气中也含有甲烷。',
            diameter: '49,244 km', distanceFromSun: '45亿 km', relativeSize: '3.88x',
            moons: [{ name: '海卫一', diameter: '2,707 km' }]
        },
        {
            key: 'pluto', name: '冥王星 Pluto', type: 'dwarf', typeLabel: '矮行星',
            radius: 0.6, distance: 500, orbitPeriod: 90560, rotationPeriod: 6.39,
            color: 0xc9b59a,
            description: '冥王星曾被认为是第九大行星，2006年被重新分类为矮行星。它有一颗较大的卫星——卡戎，两者形成了一个双星系统。',
            diameter: '2,377 km', distanceFromSun: '59亿 km', relativeSize: '0.19x',
            moons: [{ name: '卡戎', diameter: '1,212 km' }]
        },
        {
            key: 'haumea', name: '妊神星 Haumea', type: 'dwarf', typeLabel: '矮行星',
            radius: 0.4, distance: 540, orbitPeriod: 104025, rotationPeriod: 3.92,
            color: 0xd8d5ce,
            description: '妊神星是一颗位于柯伊伯带的矮行星，形状呈椭球形，自转速度极快。它有两颗已知的卫星。',
            diameter: '约1,560 km', distanceFromSun: '64亿 km', relativeSize: '0.12x',
            moons: [{ name: '妊卫一', diameter: '约310 km' }]
        },
        {
            key: 'makemake', name: '鸟神星 Makemake', type: 'dwarf', typeLabel: '矮行星',
            radius: 0.4, distance: 560, orbitPeriod: 111690, rotationPeriod: 22.5,
            color: 0xc87854,
            description: '鸟神星是柯伊伯带中的一颗矮行星，以其发现者所在文化的创造之神命名。它是太阳系中已知最亮的柯伊伯带天体之一。',
            diameter: '约1,430 km', distanceFromSun: '68亿 km', relativeSize: '0.11x',
            moons: []
        },
        {
            key: 'eris', name: '阋神星 Eris', type: 'dwarf', typeLabel: '矮行星',
            radius: 0.5, distance: 620, orbitPeriod: 204870, rotationPeriod: 25.9,
            color: 0xd6d6d6,
            description: '阋神星是太阳系中已知质量最大的矮行星，它的发现促使国际天文学联合会重新定义了"行星"的概念。',
            diameter: '约2,326 km', distanceFromSun: '102亿 km', relativeSize: '0.18x',
            moons: [{ name: '阋卫一', diameter: '约700 km' }]
        }
    ];

    const SATELLITES = [
        { key: 'voyager1', name: '旅行者1号', year: 1977, active: true, planet: '太阳系外', desc: '首个进入星际空间的人造物体' },
        { key: 'voyager2', name: '旅行者2号', year: 1977, active: true, planet: '太阳系外', desc: '唯一访问过四大巨行星的人造探测器' },
        { key: 'cassini', name: '卡西尼号', year: 1997, active: false, planet: '土星', desc: '详细研究了土星及其卫星系统' },
        { key: 'juno', name: '朱诺号', year: 2011, active: true, planet: '木星', desc: '正在研究木星的内部结构' },
        { key: 'newhorizons', name: '新视野号', year: 2006, active: true, planet: '冥王星', desc: '首个飞越冥王星的探测器' },
        { key: 'mars2020', name: '毅力号', year: 2020, active: true, planet: '火星', desc: '正在火星上寻找古代生命的迹象' },
        { key: 'changE5', name: '嫦娥五号', year: 2020, active: false, planet: '月球', desc: '中国首个实施无人月球采样返回的探测器' },
        { key: 'jamesWebb', name: '詹姆斯·韦伯', year: 2021, active: true, planet: '拉格朗日L2点', desc: '史上最强太空望远镜' },
        { key: 'tianwen1', name: '天问一号', year: 2020, active: true, planet: '火星', desc: '中国首个火星探测任务' },
        { key: 'viking1', name: '海盗1号', year: 1975, active: false, planet: '火星', desc: '首个成功在火星表面着陆并传回照片的探测器' },
        { key: 'hubble', name: '哈勃望远镜', year: 1990, active: true, planet: '地球轨道', desc: '改变了人类对宇宙的认知' }
    ];

    const TYPE_COLORS = {
        star: '#ff9800',
        terrestrial: '#deb887',
        jovian: '#87ceeb',
        dwarf: '#bdbdbd',
        moon: '#aaaaaa'
    };

    // ========== Three.js 全局变量 ==========
    let scene, camera, renderer, controls, clock;
    let planetMeshes = {};
    let orbitLines = {};
    let moonMeshes = [];
    let asteroidBelt;
    let selectedPlanet = null;
    let sunLight, sunMesh, sunGlow, sunFlare;
    let isRealScale = false;
    let isRealMotion = false;

    // ========== 初始化 ==========
    function init() {
        const container = document.getElementById('canvas-container');
        if (!container) return;

        // Scene
        scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x000000, 0.0005);

        // Camera
        camera = new THREE.PerspectiveCamera(CONFIG.cameraFov, window.innerWidth / window.innerHeight, CONFIG.nearPlane, CONFIG.farPlane);
        camera.position.set(0, 120, 280);

        // Renderer
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        container.appendChild(renderer.domElement);

        // Controls
        if (typeof THREE.OrbitControls !== 'undefined') {
            controls = new THREE.OrbitControls(camera, renderer.domElement);
        } else if (typeof OrbitControls !== 'undefined') {
            controls = new OrbitControls(camera, renderer.domElement);
        }
        if (controls) {
            controls.enableDamping = true;
            controls.dampingFactor = 0.05;
            controls.minDistance = 20;
            controls.maxDistance = 2000;
            controls.maxPolarAngle = Math.PI * 0.9;
        }

        // Lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
        scene.add(ambientLight);

        sunLight = new THREE.PointLight(0xffaa00, 2, 800, 1);
        sunLight.position.set(0, 0, 0);
        sunLight.castShadow = true;
        scene.add(sunLight);

        // Clock
        clock = new THREE.Clock();

        // Create objects
        createStarField();
        createSolarSystem();
        createAsteroidBelt();

        // Events
        window.addEventListener('resize', onWindowResize);
        setupUIInteractions();
        setupPlanetSelector();
        setupComparisonPanel();
        setupGuidePanel();
        setupSunStyleSelector();
        setupSatelliteStrip();

        // Start loop
        animate();

        // Hide loading
        setTimeout(() => {
            const loading = document.getElementById('loadingScreen');
            if (loading) loading.style.opacity = '0';
            setTimeout(() => { if (loading) loading.style.display = 'none'; }, 500);
        }, 1500);
    }

    // ========== 创建星空背景 ==========
    function createStarField() {
        const geometry = new THREE.BufferGeometry();
        const count = 6000;
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            const r = 3000 + Math.random() * 4000;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = r * Math.cos(phi);

            const starType = Math.random();
            if (starType < 0.7) {
                colors[i * 3] = 0.9 + Math.random() * 0.1;
                colors[i * 3 + 1] = 0.9 + Math.random() * 0.1;
                colors[i * 3 + 2] = 1.0;
            } else if (starType < 0.9) {
                colors[i * 3] = 1.0;
                colors[i * 3 + 1] = 0.8 + Math.random() * 0.2;
                colors[i * 3 + 2] = 0.6 + Math.random() * 0.2;
            } else {
                colors[i * 3] = 0.6 + Math.random() * 0.2;
                colors[i * 3 + 1] = 0.8 + Math.random() * 0.2;
                colors[i * 3 + 2] = 1.0;
            }
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 1.5,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            sizeAttenuation: true
        });

        const stars = new THREE.Points(geometry, material);
        scene.add(stars);
    }

    // ========== 创建太阳系 ==========
    function createSolarSystem() {
        const textureLoader = new THREE.TextureLoader();

        PLANETS.forEach(p => {
            // Planet mesh
            const geometry = new THREE.SphereGeometry(p.radius, 64, 64);
            let material;

            if (p.key === 'sun') {
                material = new THREE.MeshBasicMaterial({
                    color: p.color,
                    map: p.texture ? textureLoader.load(p.texture) : null
                });
                sunMesh = new THREE.Mesh(geometry, material);
                sunMesh.userData = p;
                scene.add(sunMesh);
                planetMeshes[p.key] = sunMesh;

                // Sun glow
                const glowGeo = new THREE.SphereGeometry(p.radius * 1.4, 32, 32);
                const glowMat = new THREE.MeshBasicMaterial({
                    color: 0xffaa00,
                    transparent: true,
                    opacity: 0.15,
                    side: THREE.BackSide
                });
                sunGlow = new THREE.Mesh(glowGeo, glowMat);
                scene.add(sunGlow);

                // Sun flare
                const flareGeo = new THREE.SphereGeometry(p.radius * 2.0, 32, 32);
                const flareMat = new THREE.MeshBasicMaterial({
                    color: 0xff8800,
                    transparent: true,
                    opacity: 0.05,
                    side: THREE.BackSide
                });
                sunFlare = new THREE.Mesh(flareGeo, flareMat);
                scene.add(sunFlare);
            } else {
                material = new THREE.MeshStandardMaterial({
                    color: p.color,
                    map: p.texture ? textureLoader.load(p.texture) : null,
                    roughness: 0.8,
                    metalness: 0.1
                });
                const mesh = new THREE.Mesh(geometry, material);
                mesh.castShadow = true;
                mesh.receiveShadow = true;
                mesh.userData = p;

                // Orbit group (for revolution)
                const orbitGroup = new THREE.Group();
                orbitGroup.add(mesh);
                mesh.position.x = p.distance;
                scene.add(orbitGroup);

                planetMeshes[p.key] = mesh;
                mesh.userData.orbitGroup = orbitGroup;
                mesh.userData.angle = Math.random() * Math.PI * 2;

                // Orbit line
                const orbitCurve = new THREE.EllipseCurve(
                    0, 0, p.distance, p.distance, 0, 2 * Math.PI, false, 0
                );
                const orbitPoints = orbitCurve.getPoints(128);
                const orbitGeometry = new THREE.BufferGeometry().setFromPoints(
                    orbitPoints.map(pt => new THREE.Vector3(pt.x, 0, pt.y))
                );
                const orbitMaterial = new THREE.LineBasicMaterial({
                    color: 0xffffff,
                    transparent: true,
                    opacity: 0.08
                });
                const orbitLine = new THREE.Line(orbitGeometry, orbitMaterial);
                orbitLine.rotation.x = Math.PI / 2;
                scene.add(orbitLine);
                orbitLines[p.key] = orbitLine;

                // Rings for Saturn
                if (p.hasRings) {
                    const ringGeo = new THREE.RingGeometry(p.radius * 1.3, p.radius * 2.2, 64);
                    const ringMat = new THREE.MeshBasicMaterial({
                        color: 0xc8b898,
                        transparent: true,
                        opacity: 0.6,
                        side: THREE.DoubleSide
                    });
                    const ring = new THREE.Mesh(ringGeo, ringMat);
                    ring.rotation.x = Math.PI / 2.5;
                    mesh.add(ring);
                }
            }
        });
    }

    // ========== 创建小行星带 ==========
    function createAsteroidBelt() {
        const count = 800;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const dist = 140 + Math.random() * 40;
            positions[i * 3] = Math.cos(angle) * dist;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
            positions[i * 3 + 2] = Math.sin(angle) * dist;

            const shade = 0.4 + Math.random() * 0.3;
            colors[i * 3] = shade;
            colors[i * 3 + 1] = shade * 0.9;
            colors[i * 3 + 2] = shade * 0.8;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 0.5,
            vertexColors: true,
            transparent: true,
            opacity: 0.5
        });

        asteroidBelt = new THREE.Points(geometry, material);
        scene.add(asteroidBelt);
    }

    // ========== 动画循环 ==========
    function animate() {
        requestAnimationFrame(animate);

        const delta = clock.getDelta();
        const elapsed = clock.getElapsedTime();

        if (!CONFIG.paused) {
            const speed = CONFIG.teachMotion ? 0.3 : 1.0;
            const orbitMult = isRealMotion ? 0.02 : 0.5;
            const rotMult = isRealMotion ? 1.0 : 0.5;

            PLANETS.forEach(p => {
                const mesh = planetMeshes[p.key];
                if (!mesh) return;

                // Self rotation
                mesh.rotation.y += delta * rotMult * (p.rotationPeriod ? 1 / p.rotationPeriod : 0.01);

                // Orbit revolution
                if (mesh.userData.orbitGroup && p.orbitPeriod > 0) {
                    mesh.userData.angle += delta * speed * orbitMult * (1 / p.orbitPeriod);
                    mesh.position.x = Math.cos(mesh.userData.angle) * p.distance;
                    mesh.position.z = Math.sin(mesh.userData.angle) * p.distance;
                }
            });

            // Asteroid belt rotation
            if (asteroidBelt) {
                asteroidBelt.rotation.y += delta * 0.02;
            }

            // Sun glow pulse
            if (sunGlow && sunFlare) {
                const pulse = 1 + Math.sin(elapsed * 0.5) * 0.05;
                sunGlow.scale.setScalar(pulse);
                sunFlare.scale.setScalar(1 + Math.sin(elapsed * 0.3) * 0.1);
            }
        }

        // Camera follow selected planet
        if (selectedPlanet && planetMeshes[selectedPlanet] && controls) {
            const mesh = planetMeshes[selectedPlanet];
            const worldPos = new THREE.Vector3();
            mesh.getWorldPosition(worldPos);
            controls.target.lerp(worldPos, 0.05);
        }

        if (controls) controls.update();
        renderer.render(scene, camera);
    }

    // ========== 窗口大小调整 ==========
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    // ========== UI 交互设置 ==========
    function setupUIInteractions() {
        // Show planet guide
        const showGuideBtn = document.getElementById('showPlanetGuide');
        const guidePanel = document.getElementById('planetGuidePanel');
        if (showGuideBtn && guidePanel) {
            showGuideBtn.addEventListener('click', () => {
                guidePanel.style.display = 'block';
                setTimeout(() => guidePanel.classList.add('active'), 10);
            });
        }

        // Close guide
        const closeGuide = document.getElementById('closePlanetGuide');
        if (closeGuide && guidePanel) {
            closeGuide.addEventListener('click', () => {
                guidePanel.classList.remove('active');
                setTimeout(() => guidePanel.style.display = 'none', 300);
            });
        }

        // Show comparison
        const showCompBtn = document.getElementById('showComparison');
        const compPanel = document.getElementById('sizeComparison');
        if (showCompBtn && compPanel) {
            showCompBtn.addEventListener('click', () => {
                compPanel.style.display = 'block';
                setTimeout(() => compPanel.classList.add('active'), 10);
            });
        }

        // Close comparison
        const closeComp = document.getElementById('closeSizeComparison');
        if (closeComp && compPanel) {
            closeComp.addEventListener('click', () => {
                compPanel.classList.remove('active');
                setTimeout(() => compPanel.style.display = 'none', 300);
            });
        }

        // Close planet info
        const closeInfo = document.getElementById('closePlanetInfo');
        const planetInfo = document.getElementById('planetInfo');
        if (closeInfo && planetInfo) {
            closeInfo.addEventListener('click', () => {
                planetInfo.classList.remove('active');
                selectedPlanet = null;
            });
        }

        // Mobile expand
        const mobileExpand = document.getElementById('mobileExpandBtn');
        if (mobileExpand && planetInfo) {
            mobileExpand.addEventListener('click', () => {
                planetInfo.classList.add('expanded');
            });
        }

        // Reset view
        const resetBtn = document.getElementById('resetView');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                selectedPlanet = null;
                if (controls) {
                    controls.target.set(0, 0, 0);
                }
                new TWEEN_CameraTo(camera, { x: 0, y: 120, z: 280 });
            });
        }

        // Toggle real scale
        const scaleBtn = document.getElementById('toggleRealScale');
        const scaleIndicator = document.getElementById('scaleValue');
        if (scaleBtn && scaleIndicator) {
            scaleBtn.addEventListener('click', () => {
                isRealScale = !isRealScale;
                scaleIndicator.textContent = isRealScale ? '真实比例' : '教学模式';
                scaleBtn.classList.toggle('active', isRealScale);
                updatePlanetScales();
            });
        }

        // Toggle real motion
        const motionBtn = document.getElementById('toggleRealMotion');
        if (motionBtn) {
            motionBtn.addEventListener('click', () => {
                isRealMotion = !isRealMotion;
                motionBtn.classList.toggle('active', isRealMotion);
            });
        }

        // Toggle pause
        const pauseBtn = document.getElementById('toggleMotionPause');
        if (pauseBtn) {
            pauseBtn.addEventListener('click', () => {
                CONFIG.paused = !CONFIG.paused;
                pauseBtn.setAttribute('aria-pressed', CONFIG.paused);
                pauseBtn.querySelector('.icon').textContent = CONFIG.paused ? '▶' : '⏸';
                pauseBtn.querySelector('.label').textContent = CONFIG.paused ? '继续转动' : '暂停转动';
            });
        }
    }

    // ========== 行星选择器 ==========
    function setupPlanetSelector() {
        const selector = document.getElementById('planetSelector');
        if (!selector) return;

        selector.querySelectorAll('.planet-dot').forEach(dot => {
            dot.addEventListener('click', () => {
                const planetKey = dot.dataset.planet;
                selectPlanet(planetKey);
            });
        });
    }

    function selectPlanet(key) {
        selectedPlanet = key;
        const p = PLANETS.find(x => x.key === key);
        if (!p) return;

        // Update info panel
        const info = document.getElementById('planetInfo');
        if (info) {
            document.getElementById('planetName').textContent = p.name;
            document.getElementById('planetType').textContent = p.typeLabel;
            document.getElementById('planetColorDot').style.background = TYPE_COLORS[p.type] || '#fff';
            document.getElementById('planetDiameter').textContent = p.diameter;
            document.getElementById('planetDistance').textContent = p.distanceFromSun;
            document.getElementById('planetOrbitPeriod').textContent = p.orbitPeriod ? p.orbitPeriod + ' 地球日' : '不适用';
            document.getElementById('planetRelativeSize').textContent = p.relativeSize;
            document.getElementById('planetDescription').textContent = p.description;

            // Moons
            const moonsDiv = document.getElementById('planetMoons');
            if (moonsDiv) {
                if (p.moons && p.moons.length > 0) {
                    moonsDiv.innerHTML = '<h3>🌙 卫星</h3><ul>' +
                        p.moons.map(m => '<li>' + m.name + ' — ' + m.diameter + '</li>').join('') +
                        '</ul>';
                    moonsDiv.style.display = 'block';
                } else {
                    moonsDiv.style.display = 'none';
                }
            }

            // Explore button
            const exploreBtn = document.getElementById('exploreBtn');
            if (exploreBtn) {
                if (key === 'earth') {
                    exploreBtn.href = 'earth.html';
                    exploreBtn.style.display = 'flex';
                } else if (key === 'sun') {
                    exploreBtn.href = 'sun.html';
                    exploreBtn.style.display = 'flex';
                } else if (key === 'moon') {
                    exploreBtn.href = 'moon.html';
                    exploreBtn.style.display = 'flex';
                } else if (key === 'mars') {
                    exploreBtn.href = 'mars.html';
                    exploreBtn.style.display = 'flex';
                } else if (key === 'jupiter') {
                    exploreBtn.href = 'jupiter.html';
                    exploreBtn.style.display = 'flex';
                } else if (key === 'saturn') {
                    exploreBtn.href = 'saturn.html';
                    exploreBtn.style.display = 'flex';
                } else {
                    exploreBtn.style.display = 'none';
                }
            }

            info.classList.add('active');
        }

        // Move camera
        const mesh = planetMeshes[key];
        if (mesh && camera) {
            const worldPos = new THREE.Vector3();
            mesh.getWorldPosition(worldPos);
            const offset = p.radius * 4;
            new TWEEN_CameraTo(camera, {
                x: worldPos.x + offset,
                y: worldPos.y + offset * 0.5,
                z: worldPos.z + offset
            });
        }
    }

    // ========== 相机平滑移动 ==========
    function TWEEN_CameraTo(cam, target) {
        const start = { x: cam.position.x, y: cam.position.y, z: cam.position.z };
        const duration = 1500;
        const startTime = Date.now();

        function step() {
            const elapsed = Date.now() - startTime;
            const t = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - t, 3);
            cam.position.x = start.x + (target.x - start.x) * ease;
            cam.position.y = start.y + (target.y - start.y) * ease;
            cam.position.z = start.z + (target.z - start.z) * ease;
            if (t < 1) requestAnimationFrame(step);
        }
        step();
    }

    // ========== 更新行星比例 ==========
    function updatePlanetScales() {
        PLANETS.forEach(p => {
            const mesh = planetMeshes[p.key];
            if (!mesh) return;
            const scale = isRealScale ? (p.radius / 15) * 0.5 : p.radius;
            mesh.scale.setScalar(scale / p.radius);
        });
    }

    // ========== 大小对比面板 ==========
    function setupComparisonPanel() {
        const row = document.getElementById('comparisonRow');
        const tabs = document.getElementById('diameterDetailTabs');
        if (!row) return;

        // Generate diameter comparison
        function renderDiameter() {
            row.innerHTML = '';
            row.className = 'planets-row';
            if (tabs) tabs.innerHTML = '';

            const earthRef = PLANETS.find(p => p.key === 'earth');
            const sorted = [...PLANETS].filter(p => p.key !== 'sun').sort((a, b) => b.radius - a.radius);
            const maxR = sorted[0].radius;

            sorted.forEach(p => {
                const size = Math.max(20, (p.radius / maxR) * 100);
                const earths = (p.radius / earthRef.radius).toFixed(2);
                const div = document.createElement('div');
                div.className = 'comparison-planet ' + p.type;
                div.innerHTML = '<div class="sphere" style="width:' + size + 'px;height:' + size + 'px;background:' + getColorString(p.color) + ';"></div>' +
                    '<div class="name">' + p.name.split(' ')[0] + '</div>' +
                    '<div class="size">' + p.diameter + '</div>' +
                    '<div class="earths">' + earths + 'x 地球</div>' +
                    (p.typeLabel ? '<div class="type-label ' + p.type + '">' + p.typeLabel + '</div>' : '');
                row.appendChild(div);
            });
        }

        renderDiameter();

        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                renderDiameter(); // Simplified: only diameter for now
            });
        });
    }

    function getColorString(hex) {
        return '#' + hex.toString(16).padStart(6, '0');
    }

    // ========== 太阳系介绍面板 ==========
    function setupGuidePanel() {
        const content = document.getElementById('planetGuideContent');
        if (!content) return;

        content.innerHTML = '<div class="planet-guide-section">' +
            '<h2>☀️ 太阳</h2><p>太阳是太阳系的中心，一颗黄矮星，占太阳系总质量的99.86%。</p>' +
            '</div>' +
            '<div class="planet-guide-section">' +
            '<h2>🪐 八大行星</h2><p>水星、金星、地球、火星（类地行星）；木星、土星、天王星、海王星（类木行星）。</p>' +
            '</div>' +
            '<div class="planet-guide-section">' +
            '<h2>🧊 矮行星</h2><p>谷神星、冥王星、妊神星、鸟神星、阋神星等。</p>' +
            '</div>' +
            '<div class="planet-guide-section">' +
            '<h2>🌙 卫星</h2><p>月球是地球唯一的天然卫星。木星和土星拥有最多的卫星。</p>' +
            '</div>' +
            '<div class="planet-guide-section">' +
            '<h2>☄️ 小行星带</h2><p>位于火星和木星轨道之间，包含数百万颗小行星。</p>' +
            '</div>';
    }

    // ========== 太阳样式选择器 ==========
    function setupSunStyleSelector() {
        const selector = document.querySelector('.sun-style-selector');
        if (!selector) return;

        selector.querySelectorAll('.sun-style-option').forEach(opt => {
            opt.addEventListener('click', () => {
                selector.querySelectorAll('.sun-style-option').forEach(o => o.classList.remove('active'));
                opt.classList.add('active');
                const style = opt.dataset.style;
                updateSunStyle(style);
            });
        });
    }

    function updateSunStyle(style) {
        if (!sunMesh) return;
        if (style === 'realistic') {
            sunMesh.material.color.setHex(0xff5500);
            if (sunGlow) sunGlow.material.color.setHex(0xff3300);
            if (sunFlare) sunFlare.material.color.setHex(0xff1100);
        } else {
            sunMesh.material.color.setHex(0xffaa00);
            if (sunGlow) sunGlow.material.color.setHex(0xffaa00);
            if (sunFlare) sunFlare.material.color.setHex(0xff8800);
        }
    }

    // ========== 卫星条 ==========
    function setupSatelliteStrip() {
        const track = document.getElementById('satelliteStripTrack');
        if (!track) return;

        track.innerHTML = SATELLITES.map(s =>
            '<div class="satellite-card" data-key="' + s.key + '">' +
            '<div class="satellite-name">' + s.name + '</div>' +
            '<div class="satellite-year">' + s.year + '年发射</div>' +
            '<div class="satellite-planet">' + s.planet + '</div>' +
            '<div class="satellite-desc">' + s.desc + '</div>' +
            '<span class="satellite-status ' + (s.active ? 'active' : 'inactive') + '">' +
            (s.active ? '🟢 运行中' : '⚪ 已退役') + '</span>' +
            '</div>'
        ).join('');
    }

    // ========== 启动 ==========
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
