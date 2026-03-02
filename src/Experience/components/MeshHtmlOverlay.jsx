import React, { useMemo } from "react";
import { Html } from "@react-three/drei";
import * as THREE from "three";

/**
 * Renders an Html overlay that exactly covers the parent mesh's bounding box.
 * Must be placed as a child of a <mesh>.
 *
 * drei <Html transform distanceFactor={df}> applies:
 *   internalScale = 1 / ((df || 10) / 400)
 *
 * df=10 -> scale=40 -> 1 CSS-px = 1/40 world unit
 *
 * We measure the mesh bounding box, convert to CSS pixels at this ratio,
 * and render the content inside a wrapper of exactly that size.
 */
export default function MeshHtmlOverlay({ geometry, children }) {
  const { cssW, cssH } = useMemo(() => {
    if (!geometry) return { cssW: 200, cssH: 120 };
    geometry.computeBoundingBox();
    const box = geometry.boundingBox;
    const size = new THREE.Vector3();
    box.getSize(size);

    // Parent mesh is rotated [PI/2, ..., 0]:
    //   local X -> screen width, local Z -> screen height, local Y -> depth
    const worldW = size.x;
    const worldH = size.z > 0.01 ? size.z : size.y;

    // distanceFactor and PX_PER_UNIT must be consistent:
    // internalScale = 400 / df, so 1 CSS-px = 1/internalScale world units
    // Therefore PX_PER_UNIT = 400 / df
    const DF = 5;
    const PX_PER_UNIT = 400 / DF; // = 80
    console.log("[v0] overlay dims:", { worldW, worldH, cssW: Math.round(worldW * PX_PER_UNIT), cssH: Math.round(worldH * PX_PER_UNIT) });
    return {
      cssW: Math.round(worldW * PX_PER_UNIT),
      cssH: Math.round(worldH * PX_PER_UNIT),
    };
  }, [geometry]);

  return (
    <Html
      transform
      distanceFactor={5}
      zIndexRange={[0, 0]}
      position={[0, 0, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      style={{ pointerEvents: "none" }}
    >
      <div
        style={{
          width: `${cssW}px`,
          height: `${cssH}px`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {children}
      </div>
    </Html>
  );
}
