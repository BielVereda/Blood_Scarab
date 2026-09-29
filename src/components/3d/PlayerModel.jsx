import { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

const MODEL_PATH = '/3dModels/Kebeh_Defunto_Parasitado.glb'

// Este componente gerencia o modelo 3D do Kebeh e suas animações
export default function PlayerModel({ isAttacking, attackType, isMoving }) {
  const group = useRef()
  
  const { scene, animations } = useGLTF(MODEL_PATH)
  const { actions } = useAnimations(animations, group)

  // O modelo projeta sombra
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
  }, [scene])

  // MÁQUINA DE ESTADOS DAS ANIMAÇÕES
  useEffect(() => {
    // Decide qual animação deve tocar com base no estado do jogador
    let actionName = 'Idle' // Parado por padrão
    
    if (isAttacking) {
      actionName = attackType === 'light' ? 'AttackLight' : 'AttackHeavy'
    } else if (isMoving) {
      actionName = 'Run'
    }

    // Se a animação existir no arquivo, tocamos com crossfade de 0.2s
    if (actions[actionName]) {
      actions[actionName].reset().fadeIn(0.2).play()
      return () => actions[actionName].fadeOut(0.2)
    }
  }, [isAttacking, attackType, isMoving, actions])

  return (
    <group ref={group} position={[0, -0.5, 0]}>
      <primitive object={scene} />
    </group>
  )
}

// Pre-carrega o modelo para evitar travadas quando o jogo abrir
useGLTF.preload(MODEL_PATH)
