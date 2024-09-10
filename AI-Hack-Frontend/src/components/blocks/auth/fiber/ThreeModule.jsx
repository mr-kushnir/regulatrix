import React from 'react';
import {Canvas} from "@react-three/fiber";
import {
    OrbitControls,
    Environment,
    Center,
} from '@react-three/drei'
import {Box, CircularProgress} from '@mui/material'
import {Model} from "./Sphere.jsx";
import {transformToRadian} from "./threeModule.functions"

const ThreeModule = React.memo(() => {

    return (
        <Canvas shadows camera={{position: [0, 8, 30], fov: 12, rotation: [transformToRadian(-10), 0, 0]}}>
            <color attach="background" args={['#f0f0f0']}/>
            <ambientLight intensity={0.6}/>
            <directionalLight position={[30, 30, -10]}
                              castShadow
                              intensity={2}
                              shadow-mapSize={[2048, 2048]} shadow-bias={-0.00001}/>
            <OrbitControls autoRotateSpeed={0.4} maxPolarAngle={transformToRadian(90)} maxDistance={30}
                           minDistance={20}/>
            <React.Suspense fallback={<CircularProgress/>}>
                <Center>
                    <group position={[0, 0, 0]}>
                        <Model/>
                        <mesh rotation={[transformToRadian(-90), 0, 0]} receiveShadow castShadow>
                            <planeGeometry args={[100, 100, 1]}/>
                            <shadowMaterial transparent color="#251005" opacity={0.2}/>
                        </mesh>
                    </group>
                </Center>
            </React.Suspense>
            <Environment preset='forest'/>
        </Canvas>
    )
        ;
});

export default ThreeModule