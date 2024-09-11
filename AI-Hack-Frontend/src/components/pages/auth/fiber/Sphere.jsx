import React, {useRef, useState} from 'react'
import {Float, useGLTF, MeshDistortMaterial, Sparkles} from '@react-three/drei'
import {useFrame} from "@react-three/fiber";


export function Model(props) {
    const {nodes} = useGLTF('/sphere.glb')
    const [isMeshFocused, setIsMeshFocused] = useState(false)
    const torus1 = useRef(null)
    const torus2 = useRef(null)
    const torus3 = useRef(null)
    const torus4 = useRef(null)
    const levitationTable = useRef(null)

    useFrame(({clock}) => {
        const elapsedTime = clock.getElapsedTime();

        if (torus1.current) torus1.current.rotation.y = elapsedTime;
        if (torus2.current) torus2.current.rotation.y = elapsedTime;
        if (torus3.current) torus3.current.rotation.x = elapsedTime;
        if (torus4.current) torus4.current.rotation.y = elapsedTime;
        if (levitationTable.current) levitationTable.current.rotation.y = elapsedTime;
    });

    const setHovered = (bool) => {
        setIsMeshFocused(bool)
    }

    React.useEffect(() => {
        if (isMeshFocused) {
            document.body.style.cursor = 'none'
            return
        }
        document.body.style.cursor = 'default'
    }, [isMeshFocused])


    return (
        <group {...props} dispose={null}>
            <mesh geometry={nodes.Rocket.geometry} material={nodes.Rocket.material} position={[0, -1.2, 0]}
                  scale={[0.95, 2.18, 0.95]} castShadow receiveShadow>
                <meshStandardMaterial color='black' emissive='orange' emissiveIntensity={30}/>

            </mesh>

            <mesh geometry={nodes.Table.geometry} material={nodes.Table.material} castShadow receiveShadow>
                <meshStandardMaterial color='white'/>

            </mesh>
            <group position={[0, 0.13, 0]}>
                <mesh ref={levitationTable} geometry={nodes.Circle010.geometry} material={nodes.Circle010.material}
                      castShadow receiveShadow>
                    <meshStandardMaterial/>
                </mesh>
                <mesh geometry={nodes.Circle010_1.geometry} material={nodes.Circle010_1.material} castShadow
                      receiveShadow>
                    <meshStandardMaterial/>
                </mesh>
            </group>
            <Sparkles/>
            <mesh onPointerOver={() => setHovered(true)}
                  onPointerOut={() => setHovered(false)}
                  position={[0, 3.2, 0]}
                  scale={0.98} castShadow receiveShadow>
                <sphereGeometry args={[1, 30, 30]}/>
                <MeshDistortMaterial color={isMeshFocused ? 'white' : 'black'} speed={6} distort={0.3}
                                     clearcoat={isMeshFocused ? 0 : 1}
                                     clearcoatRoughness={0} metalness={1} roughness={0}/>
            </mesh>
            <mesh ref={torus1} geometry={nodes.Torus001.geometry}
                  position={[0, 3.22, 0]} rotation={[1.98, -0.63, 2.49]} scale={[0.7, 1.2, 0.7]} castShadow
                  receiveShadow>
                <meshStandardMaterial/>
            </mesh>
            <mesh ref={torus2} geometry={nodes.Torus002.geometry} material={nodes.Torus002.material}
                  position={[0, 3.22, 0]} rotation={[-2.8, 0.27, -2.28]} scale={[0.77, 1.32, 0.77]} castShadow
                  receiveShadow>
                <meshStandardMaterial color='black'/>

            </mesh>
            <mesh ref={torus3} geometry={nodes.Torus003.geometry} material={nodes.Torus003.material}
                  position={[0, 3.22, 0]} rotation={[-2.92, -0.18, 2.83]} scale={[0.88, 1.2, 0.88]} castShadow
                  receiveShadow>
                <meshStandardMaterial/>

            </mesh>
            <mesh ref={torus4} geometry={nodes.Torus004.geometry} material={nodes.Torus004.material}
                  position={[0, 3.22, 0]} rotation={[-0.73, -0.84, 2.43]} scale={[0.98, 1.18, 0.98]} castShadow
                  receiveShadow>
                <meshStandardMaterial/>
            </mesh>
        </group>
    )
}

useGLTF.preload('/sphere.glb')
