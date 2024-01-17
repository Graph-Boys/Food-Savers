// import {OrbitControls} from '@react-three/drei'
import {Physics,} from "@react-three/rapier";
import Lights from './Lights.jsx'
import {Level} from "./Level.jsx";
import Player from "./Player.jsx";
import useGame from "./stores/useGame.jsx";
import TerrainManager from "./components/TerrainManager";

export default function Experience() {
    const blocksCount = useGame(state => state.blocksCount)
    const blocksSeed = useGame(state => state.blocksSeed)

    return <>

        <color args={['#bdedfc']} attach={"background"}/>

        {/*<OrbitControls makeDefault/>*/}

        <Physics debug={false}>
            <Lights/>
            <Level count={blocksCount} seed={blocksSeed}/>
            <TerrainManager />
            <Player/>
        </Physics>

    </>
}