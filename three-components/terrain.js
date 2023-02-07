import { Suspense, useMemo, useRef } from 'react';
import { Cloud } from '@react-three/drei';
import { TerrainMaterial } from '../three-shaders/terrain';
import { useFrame } from '@react-three/fiber';

const Terrain = (props) => {
	const { position } = props;
	const clonedMaterial = useMemo(() => TerrainMaterial.clone(), []);

	const ref = useRef();

	useFrame((state, delta) => {
		if (ref?.current) {
			// ref.current.rotation.y += delta * 1;
		}
	});

	return (
		<group position={position} ref={ref}>
			<Suspense fallback={null}>
				{Array.from({ length: 5 }).map((_) => (
					<Cloud
						scale={Math.random() * 7}
						position={[Math.random() * 500 - 250, 100, Math.random() * 500 - 250]}
						speed={1}
						segments={20}
					/>
				))}
				<Cloud
					scale={Math.random() * 5 + 3}
					position={[Math.random() * 500 - 250, 100, Math.random() * 500 - 250]}
					speed={1}
					segments={20}
				/>
				<Cloud scale={1} position={[-250, 0, 0]} speed={1} segments={30} />
				<Cloud scale={1} position={[0, 0, -250]} speed={1} segments={30} />
			</Suspense>
			<mesh position={[0, 15, 0]} rotation={[Math.PI / 2, 0, Math.PI / 100]}>
				<planeBufferGeometry attach="geometry" args={[512, 512, 100, 100]} />
				<shaderMaterial attach="material" args={[clonedMaterial]} />
				{/* <meshStandardMaterial attach="material" color={'0xffffff'} wireframe={true} /> */}
			</mesh>
			<mesh position={[0, -150, 0]} rotation={[Math.PI / 2, 0, 0]}>
				<planeBufferGeometry attach="geometry" args={[700, 700, 20, 15]} />
				<meshStandardMaterial attach="material" wireframe={true} color={0x353535} />
			</mesh>
		</group>
	);
};

export default Terrain;
