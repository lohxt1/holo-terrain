import * as THREE from 'three';
import React from 'react';
import dynamic from 'next/dynamic';

const StatsUtils = (props) => {
	const Stats = dynamic(() =>
		import('@react-three/drei').then((drei) => drei.Stats)
	);

	return <Stats showPanel={0} />;
};

export default StatsUtils;
