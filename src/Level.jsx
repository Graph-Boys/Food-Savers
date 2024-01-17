import * as THREE from "three";
import {CuboidCollider, RigidBody} from '@react-three/rapier'
import {useState, useRef, useMemo} from "react";
import {useFrame} from "@react-three/fiber";
import {Float, Text, useGLTF} from "@react-three/drei";

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const floor1Material = new THREE.MeshStandardMaterial({color: "limegreen"});
const floor2Material = new THREE.MeshStandardMaterial({color: "greenyellow"});
const obstacleMaterial = new THREE.MeshStandardMaterial({color: "orangered"});
const wallMaterial = new THREE.MeshStandardMaterial({color: "slategray"});


export function BlockStart({position = [0, 0, 0]}) {
    return <group position={position}>
        <Float floatIntensity={2} rotationIntensity={0.25}>
            <Text
                font="/bebas-neue-v9-latin-regular.woff"
                scale={1.5}
                maxWidth={0.25}
                lineHeight={0.75}
                textAlign={"center"}
                position={[0, 1.5, 0]}
                rotation-y={-0.25}
            >
                Food Savers
                <meshBasicMaterial toneMapped={false}/>
            </Text>
        </Float>
        {/* Floor */}

    </group>
}

export function BlockEnd({position = [0, 0, 0]}) {
    const hamburger = useGLTF('./hamburger.glb');

    hamburger.scene.children.forEach((mesh) => {
        mesh.castShadow = true;
    })

    return <group position={position}>
        <Text
            font="/bebas-neue-v9-latin-regular.woff"
            scale={1}
            position={[0, 2.25,2]}
        >
            FINISH
            <meshBasicMaterial toneMapped={false}/>
        </Text>

        {/* Floor */}

        {/* Hamburger */}
        <RigidBody type={"fixed"} colliders={"hull"} position={[0, 0.25, 0]} restitution={0.2} friction={0}>
            <primitive object={hamburger.scene} scale={0.2}/>
        </RigidBody>
    </group>
}

export function BlockSpinner({position = [0, 0, 0]}) {
    const obstacle = useRef();
    const [speed] = useState(() => (Math.random() + 0.2) * (Math.random() > 0.5 ? 1 : -1));

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        const rotation = new THREE.Quaternion();
        rotation.setFromEuler(new THREE.Euler(0, time * speed, 0));
        obstacle.current.setNextKinematicRotation(rotation);

        //console.log("time: ", time);
    })

    return <group position={position}>
        {/* Floor */}

        {/* Obstacle */}
        <RigidBody ref={obstacle} type={"kinematicPosition"} position={[0, 0.3, 0]} restitution={0.2} friction={0}>
            <mesh geometry={boxGeometry} material={obstacleMaterial} scale={[3.5, 0.3, 0.3]} castShadow receiveShadow/>
        </RigidBody>
    </group>
}

export function BlockLimbo({position = [0, 0, 0]}) {
    const obstacle = useRef();
    const [timeOffset] = useState(() => Math.random() * 2 * Math.PI);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        const y = Math.sin(time + timeOffset) + 1.15;

        obstacle.current.setNextKinematicTranslation({x: position[0], y: position[1] + y, z: position[2]});

        //console.log("time: ", time);
    })

    return <group position={position}>
        {/* Floor */}

        {/* Obstacle */}
        <RigidBody ref={obstacle} type={"kinematicPosition"} position={[0, 0.3, 0]} restitution={0.2} friction={0}>
            <mesh geometry={boxGeometry} material={obstacleMaterial} scale={[3.5, 0.3, 0.3]} castShadow receiveShadow/>
        </RigidBody>
    </group>
}

export function BlockAxe({position = [0, 0, 0]}) {
    const obstacle = useRef();
    const [timeOffset] = useState(() => Math.random() * 2 * Math.PI);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        const x = Math.sin(time + timeOffset) * 1.25;

        obstacle.current.setNextKinematicTranslation({x: position[0] + x, y: position[1] + 0.75, z: position[2]});

        //console.log("time: ", time);
    })

    return <group position={position}>
        {/* Floor */}

        {/* Obstacle */}
        <RigidBody ref={obstacle} type={"kinematicPosition"} position={[0, 0.3, 0]} restitution={0.2} friction={0}>
            <mesh geometry={boxGeometry} material={obstacleMaterial} scale={[1.5, 1.5, 0.3]} castShadow receiveShadow/>
        </RigidBody>
    </group>
}

function Bounds({length = 1}) {
    return <>
        <RigidBody type={"fixed"} restitution={0.2} friction={0}>
            <mesh
                position={[2.15, 0.75, 50-(length * 2) + 2]}
                geometry={boxGeometry}
                material={wallMaterial}
                scale={[0.3, 1.5, length * 4]}
                castShadow
            />
            <mesh
                position={[-2.15, 0.75, 50-(length * 2) + 2]}
                geometry={boxGeometry}
                material={wallMaterial}
                scale={[0.3, 1.5, length * 4]}
                receiveShadow
            />
            <mesh
                position={[0, 0.75, 50-(length * 4) + 2]}
                geometry={boxGeometry}
                material={wallMaterial}
                scale={[4, 1.5, 0.3]}
                receiveShadow
            />
            <CuboidCollider
                args={[2, 0.1, 2 * length]}
                position={[0, -0.1, -(length * 2) + 2]}
                restitution={0.2}
                friction={1}
            />
        </RigidBody>
    </>
}

export function Level({count = 5, types = [BlockSpinner, BlockLimbo, BlockAxe], seed = 0}) {

    const blocks = useMemo(() => {
        const blocks = [];

        for (let i = 0; i < count; i++) {
            const type = types[Math.floor(Math.random() * types.length)];

            blocks.push(type)
        }

        return blocks;
    }, [count, types, seed])

    return <>

        <BlockStart position={[0, 0, 50]}/>
        {blocks.map((Block, index) => <Block key={index} position={[0, 0, 50-(4 * (index + 1))]}/>)}
        <BlockEnd position={[0, 0, 50-(4 * (count + 1))]}/>
        {<Bounds length={count + 2}/>}


    </>
}