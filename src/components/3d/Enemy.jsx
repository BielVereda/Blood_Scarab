import { RigidBody, CuboidCollider } from '@react-three/rapier'
import { useState, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGameStore } from '../../store/useGameStore'

export default function Enemy({ position = [0, 1, -10] }) {
  const [hp, setHp] = useState(100)
  const addIcor = useGameStore((state) => state.addIcor)
  const materialRef = useRef()

  // Função chamada quando a espada do player atinge o inimigo
  const handleHit = (damage) => {
    if (hp <= 0) return
    setHp((prev) => prev - damage)
    addIcor(10) // Ganha 10 de Icor por acerto!
    
    // Pisca vermelho ao tomar dano
    if (materialRef.current) {
      materialRef.current.color.set('red')
      setTimeout(() => {
        if (materialRef.current) materialRef.current.color.set('#880000') // Volta à cor normal
      }, 200)
    }
  }

  return (
    <group position={position}>
      {hp > 0 && (
        <RigidBody type="dynamic" mass={5} enabledRotations={[false, false, false]}>
          <CuboidCollider 
            args={[0.6, 1, 0.6]} 
            name="enemy"
            onIntersectionEnter={(e) => {
              // Se a hitbox que bateu tiver o nome 'sword', aplica dano
              if (e.other.colliderObject?.name === 'sword') {
                handleHit(20) // Ataque causa 20 de dano
              }
            }}
          />
          <mesh castShadow>
            <boxGeometry args={[1.2, 2, 1.2]} />
            <meshStandardMaterial ref={materialRef} color="#880000" />
          </mesh>
          
          {/* Barra de Vida Flutuante (In-world) */}
          <mesh position={[0, 1.5, 0]}>
            <planeGeometry args={[1.5, 0.2]} />
            <meshBasicMaterial color="#333333" />
            <mesh position={[-(1.5 - (1.5 * (hp / 100))) / 2, 0, 0.01]}>
              <planeGeometry args={[1.5 * (hp / 100), 0.2]} />
              <meshBasicMaterial color="red" />
            </mesh>
          </mesh>
        </RigidBody>
      )}
    </group>
  )
}
