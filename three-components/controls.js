import * as THREE from 'three';
import React from 'react';
import dynamic from 'next/dynamic';

const Controls = (props) => {
	const OrbitControls = dynamic(() =>
		import('@react-three/drei').then((drei) => drei.OrbitControls)
	);

	return <OrbitControls />;
};

export default Controls;
