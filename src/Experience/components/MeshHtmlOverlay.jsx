import React, { useMemo } from "react";
import { Html } from "@react-three/drei";
import * as THREE from "three";

/**
 * Renders an Html overlay that exactly covers the parent mesh's bounding box.
 * Must be placed as a child of a <mesh>.
 *
 * @param {THREE.BufferGeometry} geometry - the mesh geometry to measure
 * @param {number} pxPerUnit - CSS pixels per three.js world unit (controls resolution)
 * @param {React.ReactNode} children - the HTML content to render
 */
export default function MeshHtmlOverlay({
  geometry,
  children,
  pxPerUnit = 100,
}) {
  const { width, height, distanceFactor } = useMemo(() => {
    if (!geometry) return { width: 200, height: 120, distanceFactor: 1 };
    geometry.computeBoundingBox();
    const box = geometry.boundingBox;
    const size = new THREE.Vector3();
    box.getSize(size);

    // The mesh is rotated ~[PI/2, ..., 0] which swaps y/z.
    // geometry bounding box is in local space before rotation.
    // x stays x, y (local) becomes the depth, z (local) becomes screen-height.
    const worldW = size.x;
    const worldH = size.z > 0.01 ? size.z : size.y; // pick whichever is the visible face

    const df = pxPerUnit;
    return {
      width: Math.round(worldW * df),
      height: Math.round(worldH * df),
      distanceFactor: df,
    };
  }, [geometry, pxPerUnit]);

  return (
    <Html
      transform
      distanceFactor={distanceFactor}
      zIndexRange={[0, 0]}
      position={[0, 0, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      style={{ pointerEvents: "none" }}
    >
      <div
        style={{
          width: `${width}px`,
          height: `${height}px`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </div>
    </Html>
  );
}
