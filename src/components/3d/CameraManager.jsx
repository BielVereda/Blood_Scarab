import { useFrame, useThree } from '@react-three/fiber'
import { useCameraStore, playerState } from '../../store/useCameraStore'
import * as THREE from 'three'
import { useRef, useEffect } from 'react'

export default function CameraManager() {
  const cameraPos = useCameraStore((state) => state.cameraPos)
  const cameraLookAt = useCameraStore((state) => state.cameraLookAt)
  const { camera } = useThree()
  
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0))

  useFrame((state, delta) => {
    // 1. Move a câmera suavemente para a posição alvo
    const targetPos = new THREE.Vector3(...cameraPos)
    camera.position.lerp(targetPos, delta * 3) // Velocidade de transição

    // 2. Define o alvo de visão (LookAt)
    const targetLookAt = new THREE.Vector3()
    
    if (cameraLookAt === 'player') {
      targetLookAt.copy(playerState.position)
    } else if (Array.isArray(cameraLookAt)) {
      targetLookAt.set(...cameraLookAt)
    }

    // 3. Interpola suavemente a rotação da câmera (LookAt)
    currentLookAt.current.lerp(targetLookAt, delta * 5)
    camera.lookAt(currentLookAt.current)
  })

  return null
}
