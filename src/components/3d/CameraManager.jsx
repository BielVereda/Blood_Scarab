import { useFrame, useThree } from '@react-three/fiber'
import { useCameraStore, playerState } from '../../store/useCameraStore'
import * as THREE from 'three'
import { useRef, useEffect, useCallback } from 'react'

export default function CameraManager() {
  const { camera, gl } = useThree()
  const currentPos = useRef(new THREE.Vector3(0, 5, 10))
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0))

  const rotate = useCameraStore((s) => s.rotate)

  // ============================================================
  // Pointer Lock: ao clicar no canvas, trava o mouse para rotação
  // ============================================================
  useEffect(() => {
    const canvas = gl.domElement

    const requestLock = () => {
      canvas.requestPointerLock()
    }

    const onMouseMove = (e) => {
      // Só rotaciona se o ponteiro estiver travado
      if (document.pointerLockElement === canvas) {
        rotate(e.movementX, e.movementY)
      }
    }

    // Scroll para zoom
    const onWheel = (e) => {
      const store = useCameraStore.getState()
      const newDist = THREE.MathUtils.clamp(store.distance + e.deltaY * 0.01, 2, 12)
      useCameraStore.getState().setDistance(newDist)
    }

    canvas.addEventListener('click', requestLock)
    document.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('wheel', onWheel, { passive: true })

    return () => {
      canvas.removeEventListener('click', requestLock)
      document.removeEventListener('mousemove', onMouseMove)
      canvas.removeEventListener('wheel', onWheel)
    }
  }, [gl, rotate])

  // ============================================================
  // A cada frame: calcula posição orbital + offset de ombro
  // ============================================================
  useFrame((state, delta) => {
    const {
      yaw, pitch, distance, shoulderOffset, heightOffset
    } = useCameraStore.getState()

    const playerPos = playerState.position

    // Ponto de foco: posição do player + altura do pescoço/cabeça
    const focusPoint = new THREE.Vector3(
      playerPos.x,
      playerPos.y + heightOffset,
      playerPos.z
    )

    // Posição orbital da câmera (esférica → cartesiana)
    const cameraOffset = new THREE.Vector3(
      Math.sin(yaw) * Math.cos(pitch) * distance,
      Math.sin(pitch) * distance,
      Math.cos(yaw) * Math.cos(pitch) * distance
    )

    // Offset lateral (ombro) — perpendicular à direção da câmera no plano XZ
    const shoulderDir = new THREE.Vector3(
      Math.sin(yaw + Math.PI / 2),
      0,
      Math.cos(yaw + Math.PI / 2)
    ).multiplyScalar(shoulderOffset)

    const targetPos = focusPoint.clone().add(cameraOffset).add(shoulderDir)

    // Interpola suavemente a posição e o lookAt
    const lerpSpeed = 8
    currentPos.current.lerp(targetPos, 1 - Math.exp(-lerpSpeed * delta))
    currentLookAt.current.lerp(focusPoint, 1 - Math.exp(-lerpSpeed * delta))

    camera.position.copy(currentPos.current)
    camera.lookAt(currentLookAt.current)
  })

  return null
}
