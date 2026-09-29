import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import { KeyboardControls, Stats } from '@react-three/drei'
import Player from './components/3d/Player'
import Environment from './components/3d/Environment'
import CameraManager from './components/3d/CameraManager'
import HUD from './components/ui/HUD'
import { useMemo } from 'react'

export default function App() {
  const keyboardMap = useMemo(() => [
    { name: 'forward', keys: ['ArrowUp', 'w', 'W'] },
    { name: 'backward', keys: ['ArrowDown', 's', 'S'] },
    { name: 'left', keys: ['ArrowLeft', 'a', 'A'] },
    { name: 'right', keys: ['ArrowRight', 'd', 'D'] },
    { name: 'jump', keys: ['Space'] },
    { name: 'attackLight', keys: ['j', 'J'] },
    { name: 'attackHeavy', keys: ['k', 'K'] },
  ], [])

  return (
    <>
      <HUD />
      <KeyboardControls map={keyboardMap}>
        <Canvas shadows camera={{ position: [0, 10, 15], fov: 50 }}>
          <CameraManager />
          <Stats />
          <Physics debug> {/* debug mode ativado para vermos as hitboxes por enquanto */}
            <Environment />
            <Player />
          </Physics>
        </Canvas>
      </KeyboardControls>
    </>
  )
}
