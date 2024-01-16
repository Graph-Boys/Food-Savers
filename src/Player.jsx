import {useRapier, RigidBody} from "@react-three/rapier";
import {useFrame, extend} from "@react-three/fiber";
import {shaderMaterial ,useKeyboardControls} from "@react-three/drei";
import {useState, useEffect, useRef} from "react";
import * as THREE from "three";
import useGame from "./stores/useGame.jsx";
import portalVertexShader from './shaders/portal/vertex.glsl'
import portalFragmentShader from './shaders/portal/fragment.glsl'

const PortalMaterial = shaderMaterial(
    {
        uTime: 0,
        uColorStart: new THREE.Color('#ffffff'),
        uColorEnd: new THREE.Color('#000000')
    },
    portalVertexShader,
    portalFragmentShader
)

extend({ PortalMaterial })

export default function Player() {

    const portalMaterial = useRef()

    const body = useRef()
    const [subscribeKeys, getKeys] = useKeyboardControls()
    const {rapier, world} = useRapier()
    const rapierWorld = world

    const [smoothedCameraPosition] = useState(() => new THREE.Vector3(100, 100, 100))
    const [smoothedCameraTarget] = useState(() => new THREE.Vector3())

    const start = useGame(state => state.start)
    const end = useGame(state => state.end)
    const restart = useGame(state => state.restart)
    const blocksCount = useGame(state => state.blocksCount)

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

    const reset = () => {
        console.log("reset")
        body.current.setTranslation({x: 0, y: 1, z: 0})
        body.current.setLinvel({x: 0, y: 0, z: 0})
        body.current.setAngvel({x: 0, y: 0, z: 0})
    }

    useEffect(() => {
        const unsubscribeReset = useGame.subscribe(
            (state) => state.phase,
            (value) => {
                if (value === 'ready')
                    reset()
            }
        )

        const unsubscribeJump = subscribeKeys(
            (state) => state.jump,
            (value) => {
                if (value)
                    jump()
            })

        const unsubscribeAny = subscribeKeys(() => {
            //console.log("Any key pressed")
            start()
        })

        return () => {
            unsubscribeReset()
            unsubscribeJump()
            unsubscribeAny()
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

        /**
         * Phases
         */
        if (bodyPosition.z < -(blocksCount * 4 + 2)) {
            end()
            //console.log("end")
        }

        if (bodyPosition.y < -5) {
            restart()
            //console.log("restart")
        }

        /**
         * Portal Shader
         */
        portalMaterial.current.uTime += delta
    })

    return <RigidBody ref={body} canSleep={false} colliders={"ball"} restitution={0.2} friction={1} linearDamping={0.5}
                      angularDamping={0.5} position={[0, 1, 0]}>
        <mesh castShadow>
            <icosahedronGeometry args={[0.3, 1]}/>
            <portalMaterial ref={portalMaterial}/>
        </mesh>
    </RigidBody>
}