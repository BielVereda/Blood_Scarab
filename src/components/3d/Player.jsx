import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { RigidBody, CapsuleCollider, CuboidCollider } from '@react-three/rapier'
import { useKeyboardControls } from '@react-three/drei'
import * as THREE from 'three'
import { playerState } from '../../store/useCameraStore'
import PlayerModel from './PlayerModel'

export default function Player() {
  const rigidBodyRef = useRef()
  const [subscribeKeys, getKeys] = useKeyboardControls()
  const [isAttacking, setIsAttacking] = useState(false)
  const [attackType, setAttackType] = useState(null)
  const [isMoving, setIsMoving] = useState(false)
  
  useEffect(() => {
    const unsubLight = subscribeKeys((state) => state.attackLight, (pressed) => {
      if (pressed && !isAttacking) triggerAttack('light')
    })
    const unsubHeavy = subscribeKeys((state) => state.attackHeavy, (pressed) => {
      if (pressed && !isAttacking) triggerAttack('heavy')
    })
    return () => { unsubLight(); unsubHeavy() }
  }, [isAttacking, subscribeKeys])

  const triggerAttack = (type) => {
    setIsAttacking(true)
    setAttackType(type)
    setTimeout(() => {
      setIsAttacking(false)
      setAttackType(null)
    }, type === 'light' ? 300 : 600)
  }

  useFrame((state, delta) => {
    if (!rigidBodyRef.current) return

    const { forward, backward, left, right } = getKeys()
    
    const speed = isAttacking ? 0 : 5
    const velocity = { x: 0, y: 0, z: 0 }

    if (forward) velocity.z -= speed
    if (backward) velocity.z += speed
    if (left) velocity.x -= speed
    if (right) velocity.x += speed

    const isMovingNow = (velocity.x !== 0 || velocity.z !== 0) && !isAttacking
    if (isMoving !== isMovingNow) setIsMoving(isMovingNow)

    const currentVel = rigidBodyRef.current.linvel()
    rigidBodyRef.current.setLinvel({ x: velocity.x, y: currentVel.y, z: velocity.z }, true)

    if (velocity.x !== 0 || velocity.z !== 0) {
      const angle = Math.atan2(velocity.x, velocity.z)
      const quaternion = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), angle)
      const currentQuat = new THREE.Quaternion().copy(rigidBodyRef.current.rotation())
      currentQuat.slerp(quaternion, delta * 10)
      rigidBodyRef.current.setRotation(currentQuat, true)
    }
    
    const pos = rigidBodyRef.current.translation()
    playerState.position.set(pos.x, pos.y, pos.z)
  })

  return (
    <RigidBody
      ref={rigidBodyRef}
      colliders={false}
      mass={1}
      type="dynamic"
      position={[0, 5, 0]}
      enabledRotations={[false, false, false]} 
    >
      <CapsuleCollider args={[0.5, 0.5]} />
      
      {isAttacking && (
        <CuboidCollider 
          args={attackType === 'light' ? [0.8, 1, 0.8] : [1.2, 1.2, 1.2]} 
          position={[0, 0, 1]} 
          sensor
          name="sword"
        />
      )}

      {/* COMPONENTE VISUAL DO JOGADOR COM ANIMAÇÕES */}
      <PlayerModel isAttacking={isAttacking} attackType={attackType} isMoving={isMoving} />
    </RigidBody>
  )
}
