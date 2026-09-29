import { create } from 'zustand'

export const useCameraStore = create((set) => ({
  cameraPos: [0, 15, 15],
  cameraLookAt: 'player', // 'player' ou array [x, y, z]
  setCamera: (pos, lookAt = 'player') => set({ cameraPos: pos, cameraLookAt: lookAt })
}))

// Estado global mutável para evitar re-renders no React a cada frame
import * as THREE from 'three'
export const playerState = {
  position: new THREE.Vector3(0, 0, 0)
}
