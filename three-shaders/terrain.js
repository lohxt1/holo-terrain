import * as THREE from 'three';
import * as LXRand from '../utils/random';

const planeSegments = 1000;

const TerrainMaterial = new THREE.ShaderMaterial({
	uniforms: {
		uNoiseFrequency: {
			value: new THREE.Vector3(10.0 - Math.random() * 5, 4.9, 1.3)
		},
		uOctaves: {
			value: new THREE.Vector3(
				// 2 + parseInt(Math.random() * 10),
				// 2 + parseInt(Math.random() * 10),
				// 3 + parseInt(Math.random() * 10)
				3,
				2,
				3
			)
		},
		uLacunarity: { value: new THREE.Vector3(4.0, 1.1, 2.2) },
		uGain: { value: new THREE.Vector3(0.2, 1.9, 1.1) },
		uSecondLayer: { value: true },
		uThirdLayer: { value: true },
		uHeight: { value: 100.0 },
		uResolution: { value: new THREE.Vector2(planeSegments, planeSegments) },
		uRandOffset: { value: LXRand.num(0, 512) }
		// uColor: { value: new THREE.Vector3(surfaceColor[0], surfaceColor[1], surfaceColor[2]) },
	},
	vertexShader: `
        
        precision highp int;

        uniform bool uSecondLayer;
        uniform bool uThirdLayer;

        uniform vec3 uNoiseFrequency;
        uniform ivec3 uOctaves;
        uniform vec3 uLacunarity;
        uniform vec3 uGain;
        uniform float uHeight;
        uniform float uRandOffset;

        varying vec3 vVertex;
        varying vec2 vUv;
        varying vec3 uPosition;

        float hash( uvec2 x )
        {
            uvec2 q = 1103515245U * ( ( x>>1U ) ^ ( x.yx ) );
            uint  n = 1103515245U * ( ( q.x   ) ^ ( q.y>>3U ) );
            return float( n ) * ( 1.0 / float( 0xffffffffU ) );
        }

        float noise( vec2 p ){

            // ----------UNIFORM----------
            // offset our random function for more variation 
            p += uRandOffset;

            uvec2 ip = uvec2( floor( p ) );
            vec2 u = fract( p );
            u = u * u * ( 3.0 - 2.0 * u );
            
            float res = mix(
                mix( hash( ip ), hash( ip + uvec2( 1, 0 ) ), u.x ),
                mix( hash( ip + uvec2( 0, 1 ) ), hash( ip + uvec2( 1,1 ) ), u.x ), u.y );
            return res * res;
        }

        float fBm( vec2 p, int octaves, float lacunarity, float gain ) {
            float freq = 1.0;
            float amp = 0.5;
            float sum = 0.;
            for( int i = 0; i < octaves; i++ ) {
                sum += noise( p * freq ) * amp;
                freq *= lacunarity;
                amp *= gain;
            }
            return sum;
        }

        void main() {

            vUv = uv;

            vec3 p = position; //just for convinience reasons
            float f = 1.0;

            if ( p.x < 256. && p.x >= -256. && p.y < 256. && p.y >= -256. ) {
                f = fBm( uv * uNoiseFrequency.x, 3, uLacunarity.x, uGain.x );
                f = fBm( vec2( uv.x * f, uv.y * f ) * uNoiseFrequency.y + vec2( 92.4, 0.221 ), 2, uLacunarity.y, uGain.y );
                f = fBm( vec2( uv.x * f, uv.y * f ) * uNoiseFrequency.z + vec2( 1.4, 3.221 ), 3, uLacunarity.z, uGain.z );
        
                p.z = f * uHeight;
            }

            p.z = f * 100.;

            // passing the vertex positions in eye space
            vVertex = ( modelViewMatrix * vec4( p, 1. ) ).xyz;

            uPosition = p;

			float strength = step(8.0,mod(p.x * 200.0, 0.5));
    		strength += step(8.0, mod(p.y * 200.0, 0.5)) * 100.0;

			// float strength = step(0.2, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
        
            gl_Position = projectionMatrix * modelViewMatrix * vec4( p , 1. );
        }
	`,
	fragmentShader: `

        varying vec3 vVertex;
        varying vec2 vUv;
        varying vec3 uPosition;

        void main() {
            // calculcate the normal vectors
            vec3 N = normalize( cross( dFdx( vVertex ), dFdy( vVertex ) ) );
        
            // arbitrary direction of the light
            const vec3 lightDir = vec3( 1., 0., -1. ); // og
        
            // normalize that as well
            vec3 L = normalize( lightDir );
        
            //------------- our purple color ------ no negative numbers ---
            // vec3 diffuse = vec3( 0.5, 0.0, 1.0 ) * max( dot( N, -L ), 0.0 ); // og
			vec3 diffuse = vec3( (1.3 - uPosition.z * 0.01), (1.5 - uPosition.z * 0.01), -(-1.0 - uPosition.z * 0.01) ) * (1.0 - uPosition.z * 0.01) * max( dot( N, -L ), 0.3 ) ;
			// vec3 diffuse = vec3( 1.0, 1.0, 1.0) * (1.0 - uPosition.z * 0.01) ;
			// vec3 diffuse = vec3( 1.0, 1.0, 1.0 ) * max( dot( N, -L ), 0.0 );
        
            gl_FragColor = vec4( diffuse, 1.0 );
        }
	`,
	// depthWrite: true,
	// depthTest: false,
	transparent: true,
	wireframe: true,
	side: THREE.DoubleSide
});

export { TerrainMaterial };
