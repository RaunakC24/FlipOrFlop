import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const GlobeComponent = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;

    // Scene, Camera, Renderer Setup
    const scene = new THREE.Scene();

    // Set the background of the scene to white
    scene.background = new THREE.Color(0xffffff);  // Set background to white

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    // Globe Geometry and Material
    const geometry = new THREE.SphereGeometry(5, 32, 32);  // Starting size
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('/textures/globe.jpg');  // Replace with the correct path
    const material = new THREE.MeshBasicMaterial({ map: texture });

    // Create the Globe Mesh
    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);

    camera.position.set(0, -4, 15);  // Set Z for distance, Y for vertical centering
    

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      globe.rotation.y += 0.005;  // Rotate the globe
      renderer.render(scene, camera);
    };

    animate();

    // Handle Scroll Event
    const handleScroll = () => {
      const scrollY = window.scrollY;  // Get the scroll value
      console.log('ScrollY:', scrollY);  // Log to verify scroll value

      // Adjust the scale based on scroll position (adjust multiplier to control scale sensitivity)
      const scale = Math.min(1 + scrollY * 0.004, 10);  // Max scale of 10, feel free to adjust
      globe.scale.set(scale, scale, scale);  // Update globe's scale
    };

    // Add event listener for scroll
    window.addEventListener('scroll', handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="Globe-container" style={{ height: '100vh' }} />;
};

export default GlobeComponent;
