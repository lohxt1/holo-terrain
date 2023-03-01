import * as THREE from "three";
import React, { Suspense, lazy } from "react";
import { Canvas } from "@react-three/fiber";
import StatsUtils from "../three-components/stats";
import Controls from "../three-components/controls";
import TerrainBlock from "../three-components/terrain";
import {
  EffectComposer,
  DepthOfField,
  Noise,
  Bloom,
} from "@react-three/postprocessing";

const near = 0.1;
const far = 10000;
const width = 1024;
const height = 1024;

const Terrain = (props) => {
  return (
    <>
      <Canvas
        resize={{ scroll: false }}
        camera={{
          zoom: 1.1,
          near,
          far,
          left: -width / 2,
          right: width / 2,
          top: height / 2,
          bottom: -height / 2,
          position: [256, 256, 256],
          // position: [256, 512, 256]
        }}
        style={{
          height: "100%",
          width: "100%",
          background: "#000",
          position: "fixed",
          // filter: 'invert(1)'
        }}
        orthographic
      >
        <TerrainBlock position={[0, 0, 0]} />
        <ambientLight color={0xffffff} intensity={1} />
        <Suspense fallback={null}>
          <EffectComposer>
            <DepthOfField
              focusDistance={0}
              focalLength={0.02}
              bokehScale={0.5}
              height={1000}
            />
            <Bloom
              luminanceThreshold={0}
              luminanceSmoothing={0.1}
              height={700}
              intensity={0.5}
            />
            {/* <Noise opacity={0.5} /> */}
          </EffectComposer>
        </Suspense>
        <Suspense fallback={null}>
          {/* <StatsUtils /> */}
          <Controls />
        </Suspense>
      </Canvas>
    </>
  );
};

export default Terrain;
