import { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

// Este componente vai gerenciar o modelo 3D e suas animações
export default function PlayerModel({ isAttacking, attackType, isMoving }) {
  const group = useRef()
  
  // =====================================================================
  // QUANDO VOCÊ TIVER O SEU MODELO (kebeh.glb):
  // 1. Coloque o arquivo em public/assets/models/kebeh.glb
  // 2. Descomente as duas linhas abaixo
  // 3. Apague a tag <mesh> lá no final e descomente a tag <primitive>
  // =====================================================================
  
  // const { scene, animations } = useGLTF('/assets/models/kebeh.glb')
  // const { actions } = useAnimations(animations, group)

  // MÁQUINA DE ESTADOS DAS ANIMAÇÕES
  /*
  useEffect(() => {
    // Decide qual animação deve tocar com base no estado do jogador
    let actionName = 'Idle' // Parado por padrão
    
    if (isAttacking) {
      actionName = attackType === 'light' ? 'AttackLight' : 'AttackHeavy' // Nomes que você dará no Mixamo
    } else if (isMoving) {
      actionName = 'Run' // Ou 'Walk'
    }

    // Se a animação existir no arquivo, nós tocamos com uma transição (crossfade) de 0.2s
    if (actions[actionName]) {
      actions[actionName].reset().fadeIn(0.2).play()
      // Quando o estado mudar, fazemos o fadeOut da animação atual para a próxima entrar
      return () => actions[actionName].fadeOut(0.2)
    }
  }, [isAttacking, attackType, isMoving, actions])
  */

  return (
    <group ref={group} position={[0, -0.5, 0]}>
      {/* 
        BONECO TEMPORÁRIO (Apague depois!) 
      */}
      <mesh castShadow>
        <capsuleGeometry args={[0.5, 1, 4, 16]} />
        <meshStandardMaterial color="#333333" />
        {/* Olhos que piscam */}
        <mesh position={[0, 0.5, 0.4]}>
          <boxGeometry args={[0.4, 0.2, 0.4]} />
          <meshStandardMaterial color={isAttacking ? (attackType === 'light' ? 'cyan' : 'red') : '#8a2be2'} />
        </mesh>
      </mesh>

      {/* 
        MODELO OFICIAL (Descomente quando tiver o arquivo!) 
        <primitive object={scene} />
      */}
    </group>
  )
}

// Pre-carrega o modelo para evitar travadinhas quando o jogo abrir
// useGLTF.preload('/assets/models/kebeh.glb')
