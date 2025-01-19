import { useEffect, useRef } from "react";
import * as THREE from "three";

export const GlobeVisualization = () => {
  const globeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!globeRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, globeRef.current.clientWidth / globeRef.current.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    
    renderer.setSize(globeRef.current.clientWidth, globeRef.current.clientHeight);
    globeRef.current.appendChild(renderer.domElement);

    const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x00b4d8,
      wireframe: true,
    });
    const globe = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(globe);

    camera.position.z = 2;

    const animate = () => {
      requestAnimationFrame(animate);
      globe.rotation.y += 0.002;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      renderer.dispose();
      globeRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={globeRef} className="w-full h-[300px] mb-6 rounded-lg overflow-hidden" />;
};