import { RigidBody, CuboidCollider } from '@react-three/rapier'
import { useCameraStore } from '../../store/useCameraStore'
import Enemy from './Enemy'

// Componente auxiliar para definir as zonas de câmera
function CameraTrigger({ args, position, cameraPos, cameraLookAt = 'player', name }) {
  const setCamera = useCameraStore((state) => state.setCamera)

  return (
    <CuboidCollider 
      args={args} 
      position={position} 
      sensor 
      onIntersectionEnter={() => {
        console.log(`Entrou na zona de câmera: ${name}`)
        setCamera(cameraPos, cameraLookAt)
      }}
    />
  )
}

export default function Environment() {
  return (
    <group>
      {/* Inimigo de Teste */}
      <Enemy position={[0, 5, -8]} />

      {/* Luzes */}
      <ambientLight intensity={0.3} />
      <directionalLight 
        position={[20, 30, 20]} 
        intensity={1.5} 
        castShadow 
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
      />

      {/* ================= TRIGGERS DE CÂMERA ================= */}
      {/* Zona 1: Sala Inicial (Câmera Padrão) */}
      <CameraTrigger 
        name="Sala Inicial"
        args={[10, 5, 10]} 
        position={[0, 2.5, 0]} 
        cameraPos={[0, 15, 15]} 
      />

      {/* Zona 2: O Corredor Estreito (Câmera Lateral Fixa) */}
      <CameraTrigger 
        name="Corredor Estreito"
        args={[5, 5, 10]} 
        position={[0, 2.5, -20]} 
        cameraPos={[15, 5, -20]} // Câmera fica na lateral
        cameraLookAt="player" // Acompanha o jogador passando
      />

      {/* Zona 3: Salão Principal (Câmera Alta Cinemática) */}
      <CameraTrigger 
        name="Salão Principal"
        args={[20, 5, 20]} 
        position={[0, 2.5, -50]} 
        cameraPos={[20, 25, -30]} 
        cameraLookAt={[0, 0, -50]} // Câmera fixa olhando pro centro da sala
      />
      {/* ======================================================= */}

      {/* ================= ARQUITETURA DA FASE ================= */}
      
      {/* --- SALA INICIAL --- */}
      {/* Chão */}
      <RigidBody type="fixed" colliders={false}>
        <CuboidCollider args={[10, 0.5, 11]} position={[0, -0.5, 0]} /> {/* O Z é 11 pra transpassar pro próximo chão e evitar buracos */}
        <mesh receiveShadow position={[0, -0.5, 0]}>
          <boxGeometry args={[20, 1, 20]} />
          <meshStandardMaterial color="#4a4a4a" />
        </mesh>
      </RigidBody>
      {/* Parede Fundo (bloqueando a volta) */}
      <RigidBody type="fixed" colliders={false} position={[0, 2.5, 10]}>
        <CuboidCollider args={[10, 2.5, 0.5]} />
        <mesh receiveShadow castShadow>
          <boxGeometry args={[20, 5, 1]} />
          <meshStandardMaterial color="#2d2d2d" />
        </mesh>
      </RigidBody>

      {/* --- CORREDOR --- */}
      {/* Chão */}
      <RigidBody type="fixed" colliders={false}>
        <CuboidCollider args={[5, 0.5, 12]} position={[0, -0.5, -20]} /> {/* Sobrepõe a sala 1 e a sala 3 */}
        <mesh receiveShadow position={[0, -0.5, -20]}>
          <boxGeometry args={[10, 1, 20]} />
          <meshStandardMaterial color="#3a3a3a" />
        </mesh>
      </RigidBody>
      
      {/* Parede Esquerda do Corredor */}
      <RigidBody type="fixed" colliders={false} position={[-5.5, 2.5, -20]}>
        <CuboidCollider args={[0.5, 2.5, 10]} />
        <mesh receiveShadow castShadow>
          <boxGeometry args={[1, 5, 20]} />
          <meshStandardMaterial color="#2d2d2d" />
        </mesh>
      </RigidBody>
      {/* A Parede Direita foi removida para não tampar a câmera lateral (efeito "Quarta Parede") */}

      {/* --- SALÃO PRINCIPAL --- */}
      {/* Chão */}
      <RigidBody type="fixed" colliders={false}>
        <CuboidCollider args={[20, 0.5, 21]} position={[0, -0.5, -50]} /> {/* Sobrepõe o corredor */}
        <mesh receiveShadow position={[0, -0.5, -50]}>
          <boxGeometry args={[40, 1, 40]} />
          <meshStandardMaterial color="#5a4a4a" />
        </mesh>
      </RigidBody>
      {/* Ponto de Interesse no Centro (Onde a câmera vai focar) */}
      <RigidBody type="fixed" colliders={false} position={[0, 1, -50]}>
        <CuboidCollider args={[2, 2, 2]} />
        <mesh receiveShadow castShadow>
          <boxGeometry args={[4, 4, 4]} />
          <meshStandardMaterial color="#ffd700" /> {/* Bloco dourado (Tumba/Altar) */}
        </mesh>
      </RigidBody>

    </group>
  )
}
