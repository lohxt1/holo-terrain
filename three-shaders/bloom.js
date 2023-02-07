import * as THREE from 'three';
import React, { useEffect, useRef, lazy, Suspense, useMemo } from 'react';
import { useFrame, useThree, extend } from '@react-three/fiber';

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';

extend({ EffectComposer, RenderPass, UnrealBloomPass, ShaderPass });

const Bloom = (props) => {
	const { intensity } = props;
	const composer = useRef();
	const { scene, gl, size, camera } = useThree();
	const aspect = useMemo(() => new THREE.Vector2(size.width, size.height), []);
	useEffect(() => void composer.current.setSize(size.width, size.height), [size]);
	useFrame(() => composer?.current?.render?.(), 2);
	return (
		<effectComposer ref={composer} args={[gl]}>
			<renderPass attachArray="passes" scene={scene} camera={camera} />
			{/* <shaderPass
				attachArray="passes"
				args={[FXAAShader]}
				material-uniforms-resolution-value={[0.1 / size.width, 0.1 / size.height]}
				renderToScreen
			/> */}
			<unrealBloomPass
				attachArray="passes"
				args={[aspect, intensity || 1.5, 1, 0]}
				clearColor={new THREE.Color(0xffffff)}
				oldClearColor={new THREE.Color(0xffffff)}
				// bloomTintColors={new THREE.Vector3(1, 1, 1)}
			/>
		</effectComposer>
	);
};

export default Bloom;
