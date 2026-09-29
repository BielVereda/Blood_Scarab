import { create } from 'zustand'
import * as THREE from 'three'

export const useCameraStore = create((set) => ({
  // Ângulos orbitais da câmera (radianos)
  yaw: 0,           // Rotação horizontal (em torno do eixo Y)
  pitch: 0.3,       // Rotação vertical (0 = nível do chão, positivo = olhando de cima)

  // Distância e offset do ombro
  distance: 4,       // Distância da câmera ao jogador
  shoulderOffset: 0.8, // Offset lateral (positivo = ombro direito)
  heightOffset: 1.8,   // Altura do ponto de foco acima do jogador

  // Sensibilidade do mouse
  sensitivity: 0.003,

  // Limites do pitch
  minPitch: -0.5,    // Olhando de baixo (limite)
  maxPitch: 1.2,     // Olhando de cima (limite)

  // Atualiza yaw e pitch com delta do mouse
  rotate: (deltaX, deltaY) => set((state) => {
    const newYaw = state.yaw - deltaX * state.sensitivity
    const newPitch = THREE.MathUtils.clamp(
      state.pitch + deltaY * state.sensitivity,
      state.minPitch,
      state.maxPitch
    )
    return { yaw: newYaw, pitch: newPitch }
  }),

  setDistance: (d) => set({ distance: d }),
}))

// Estado global mutável para evitar re-renders no React a cada frame
export const playerState = {
  position: new THREE.Vector3(0, 0, 0),
  quaternion: new THREE.Quaternion(),
}
