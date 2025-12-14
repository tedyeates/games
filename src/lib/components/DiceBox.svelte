<script lang="ts" >
	import { render } from 'svelte/server';
    import * as THREE from 'three';
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
    import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
    

    type DiceType = {
        sides: string[];
        result: number;
        color: string;
    }

    type PropType = {
        dice: DiceType[];
    }

    let { dice }: PropType = $props();

    let diceBox = $state<HTMLCanvasElement | null>(null);

    let renderer: THREE.WebGLRenderer | null = null;
    const scene = new THREE.Scene();
    let camera: THREE.PerspectiveCamera;

    $effect(() => {
        if (!diceBox) return;

        camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerWidth,
            0.1,
            1000
        );

        renderer = new THREE.WebGLRenderer({
            canvas: diceBox,
        });

        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        camera.position.setZ(30);

        renderer.render(scene, camera);

        const geometry = new RoundedBoxGeometry(10, 10, 10, 5, 0.7);
        const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
        const die = new THREE.Mesh(geometry, material);
        scene.add(die);

        const thresholdAngle = 11;
        const edges = new THREE.EdgesGeometry( geometry, thresholdAngle );
        const line = new THREE.LineSegments( edges );
        scene.add( line );

        const pointLight = new THREE.PointLight(0xffffff, 1, 100);
        pointLight.position.set(10, 10, 10);

        const ambientLight = new THREE.AmbientLight(0xffffff);
        scene.add(pointLight, ambientLight);

        const lightHelper = new THREE.PointLightHelper(pointLight);
        const gridHelper = new THREE.GridHelper(200, 50);
        scene.add(lightHelper, gridHelper);

        const controls = new OrbitControls(camera, renderer.domElement);

        function animate() {
            requestAnimationFrame(animate);

            die.rotation.x += 0.01;
            die.rotation.y += 0.005;
            die.rotation.z += 0.01;

            line.rotation.x += 0.01;
            line.rotation.y += 0.005;
            line.rotation.z += 0.01;

            controls.update();

            renderer?.render(scene, camera);
        }

        animate();

        return () => {
            renderer?.dispose();
            renderer = null;
        };
    });


</script>
<canvas bind:this={diceBox}></canvas>