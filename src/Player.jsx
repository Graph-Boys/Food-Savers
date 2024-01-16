import {useRapier, RigidBody} from "@react-three/rapier";
import {useFrame} from "@react-three/fiber";
import {useKeyboardControls} from "@react-three/drei";
import {useState, useEffect, useRef} from "react";
import * as THREE from "three";

export default function Player() {
    const body = useRef()
    const [subscribeKeys, getKeys] = useKeyboardControls()
    const {rapier, world} = useRapier()
    const rapierWorld = world

    const[smoothedCameraPosition] = useState(() => new THREE.Vector3(1000, 1000, 1000))
    const[smoothedCameraTarget] = useState(() => new THREE.Vector3())

    const jump = () => {
        const origin = body.current.translation()
        origin.y -= 0.31
        const direction = {x: 0, y: -1, z: 0}
        const ray = new rapier.Ray(origin, direction)
        const hit = rapierWorld.castRay(ray, 10, true)

        console.log("hit: ", hit.toi)

        if (hit.toi < 0.25)
            body.current.applyImpulse({x: 0, y: 0.5, z: 0})
    }

    useEffect(() => {
        const unsubscribeJump = subscribeKeys(
            (state) => state.jump,
            (value) => {
                if (value)
                    jump()
            })

        return () => {
            unsubscribeJump()
        }
    }, [])

    useFrame((state, delta) => {
        /**
         * Controls
         */
        const {forward, backward, left, right} = getKeys()

        const impulse = {x: 0, y: 0, z: 0}
        const torque = {x: 0, y: 0, z: 0}

        const impulseStrength = 0.6 * delta
        const torqueStrength = 0.2 * delta


        if (forward) {
            impulse.z -= impulseStrength
            torque.x -= torqueStrength
        }

        if (right) {
            impulse.x += impulseStrength
            torque.z -= torqueStrength
        }

        if (backward) {
            impulse.z += impulseStrength
            torque.x += torqueStrength
        }

        if (left) {
            impulse.x -= impulseStrength
            torque.z += torqueStrength
        }


        body.current.applyImpulse(impulse)
        body.current.applyTorqueImpulse(torque)

        /**
         * Camera
         */
        const bodyPosition = body.current.translation()

        const cameraPosition = new THREE.Vector3()
        cameraPosition.copy(bodyPosition)
        cameraPosition.y += 0.65
        cameraPosition.z += 2.25

        const cameraTarget = new THREE.Vector3()
        cameraTarget.copy(bodyPosition)
        cameraTarget.y += 0.25

        smoothedCameraPosition.lerp(cameraPosition, 5 * delta)
        smoothedCameraTarget.lerp(cameraTarget, 5 * delta)

        state.camera.position.copy(smoothedCameraPosition)
        state.camera.lookAt(smoothedCameraTarget)
    })

    return <RigidBody ref={body} canSleep={false} colliders={"ball"} restitution={0.2} friction={1} linearDamping={0.5}
                      angularDamping={0.5} position={[0, 1, 0]}>
        <mesh castShadow>
            <icosahedronGeometry args={[0.3, 1]}/>
            <meshStandardMaterial flatShading color={'hotpink'}/>
        </mesh>
    </RigidBody>
}