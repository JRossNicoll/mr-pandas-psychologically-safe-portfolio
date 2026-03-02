import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useKTX2Texture } from "../utils/ktxLoader";
import { useFrame } from "@react-three/fiber";
import { gsap } from "gsap";
import MeshHtmlOverlay from "../components/MeshHtmlOverlay";
import "../../styles/overlay-cards.scss";

import * as THREE from "three";

export default function Model({ scrollProgress, ...props }) {
  const { nodes, materials } = useGLTF("/models/scene_3.glb");

  const pyramidDoorRef = useRef();
  const lastScrollState = useRef(null);

  const firstJobRef = useRef(null);
  const secondJobRef = useRef(null);

  const firstJobHovered = useRef(false);
  const secondJobHovered = useRef(false);

  const firstJobOriginalZ = -2.754;
  const secondJobOriginalZ = -2.754;

  const firstJobHoverZ = firstJobOriginalZ + 5;
  const secondJobHoverZ = secondJobOriginalZ + 5;

  const lerpFactor = 0.08;

  const scene_3 = useKTX2Texture("/textures/scene_3.ktx2");

  useFrame(() => {
    if (pyramidDoorRef.current) {
      const currentProgress = scrollProgress.current;
      const isAbove052 = currentProgress >= 0.51;

      if (
        lastScrollState.current !== null &&
        lastScrollState.current !== isAbove052
      ) {
        if (isAbove052) {
          gsap.to(pyramidDoorRef.current.rotation, {
            x: Math.PI / 1.4,
            duration: 1,
            ease: "power2.out",
          });
        } else {
          gsap.to(pyramidDoorRef.current.rotation, {
            x: 0,
            duration: 1,
            ease: "power2.out",
          });
        }
      }

      lastScrollState.current = isAbove052;
    }

    if (firstJobRef.current) {
      const targetZ = firstJobHovered.current
        ? firstJobHoverZ
        : firstJobOriginalZ;
      firstJobRef.current.position.z +=
        (targetZ - firstJobRef.current.position.z) * lerpFactor;
    }

    if (secondJobRef.current) {
      const targetZ = secondJobHovered.current
        ? secondJobHoverZ
        : secondJobOriginalZ;
      secondJobRef.current.position.z +=
        (targetZ - secondJobRef.current.position.z) * lerpFactor;
    }
  });

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Plane072.geometry}
        material={scene_3}
        position={[13.378, 2.616, -2.127]}
        rotation={[Math.PI / 2, 0.026, 0]}
      />
      <mesh
        geometry={nodes.Plane073.geometry}
        material={scene_3}
        position={[9.987, 2.4, -2.5]}
        rotation={[Math.PI / 2, -0.051, 0]}
      />
      <mesh
        geometry={nodes.Plane095.geometry}
        material={scene_3}
        position={[11.683, 2.326, -2.296]}
        rotation={[Math.PI / 2, -0.072, 0]}
      />
      <mesh
        geometry={nodes.Plane096.geometry}
        material={scene_3}
        position={[12.548, 2.414, -2.296]}
        rotation={[Math.PI / 2, 0.023, 0]}
      />
      <mesh
        geometry={nodes.Plane111.geometry}
        material={scene_3}
        position={[10.511, 2.48, -2.362]}
        rotation={[Math.PI / 2, 0.023, 0]}
      />
      <mesh
        geometry={nodes.Plane112.geometry}
        material={scene_3}
        position={[8.405, 4.947, -2.744]}
        rotation={[Math.PI / 2, 0.023, 0]}
      >
        <MeshHtmlOverlay geometry={nodes.Plane112.geometry}>
          <div className="overlay-heading">Socials & Contact</div>
        </MeshHtmlOverlay>
      </mesh>
      <mesh
        ref={firstJobRef}
        geometry={nodes.Human_Resarcher.geometry}
        material={scene_3}
        position={[8.363, 3.436, firstJobOriginalZ]}
        rotation={[Math.PI / 2, 0.073, 0]}
        onPointerEnter={() => (firstJobHovered.current = true)}
        onPointerLeave={() => (firstJobHovered.current = false)}
      >
        <MeshHtmlOverlay geometry={nodes.Human_Resarcher.geometry}>
          <a
            className="overlay-card overlay-card--fill social-card"
            href="https://x.com/yourhandle"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="social-icon social-icon--x">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </div>
            <div className="social-info">
              <span className="social-name">X (Twitter)</span>
              <span className="social-handle">@yourhandle</span>
            </div>
          </a>
        </MeshHtmlOverlay>
      </mesh>
      <mesh
        ref={secondJobRef}
        geometry={nodes.Senior_Human_Researcher.geometry}
        material={scene_3}
        position={[10.062, 3.516, secondJobOriginalZ]}
        rotation={[Math.PI / 2, -0.127, 0]}
        onPointerEnter={() => (secondJobHovered.current = true)}
        onPointerLeave={() => (secondJobHovered.current = false)}
      >
        <MeshHtmlOverlay geometry={nodes.Senior_Human_Researcher.geometry}>
          <a
            className="overlay-card overlay-card--fill social-card"
            href="https://t.me/yourhandle"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="social-icon social-icon--telegram">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
              </svg>
            </div>
            <div className="social-info">
              <span className="social-name">Telegram</span>
              <span className="social-handle">@yourhandle</span>
            </div>
          </a>
        </MeshHtmlOverlay>
      </mesh>
      <mesh
        geometry={nodes.Plane115.geometry}
        material={scene_3}
        position={[10.712, 2.177, -0.262]}
      />
      <mesh
        geometry={nodes.Plane117.geometry}
        material={scene_3}
        position={[-20.599, 4.634, -2.755]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        geometry={nodes.Plane118.geometry}
        material={scene_3}
        position={[12.525, 2.178, -1.07]}
      />
      <mesh
        ref={pyramidDoorRef}
        geometry={nodes.Pyramid_Door.geometry}
        material={scene_3}
        position={[12.525, 3.395, -0.222]}
      />
    </group>
  );
}

useGLTF.preload("/models/scene_3.glb");
