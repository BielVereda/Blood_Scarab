import { useGameStore } from '../../store/useGameStore'

export default function HUD() {
  const { health, icor, phase } = useGameStore()

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 10,
      padding: '20px',
      color: 'white',
      fontFamily: 'sans-serif'
    }}>
      {/* Canto Superior Esquerdo - Status do Jogador */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '300px' }}>
        <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
          KEBEH (Fase {phase})
        </div>
        
        {/* Barra de Vida */}
        <div>
          <div>HP</div>
          <div style={{ width: '100%', height: '15px', backgroundColor: '#333', border: '2px solid #222' }}>
            <div style={{ width: `${health}%`, height: '100%', backgroundColor: phase === 3 ? 'gold' : 'green', transition: 'width 0.2s' }}></div>
          </div>
        </div>

        {/* Barra de Icor (Fúria) */}
        <div>
          <div>ICOR</div>
          <div style={{ width: '100%', height: '10px', backgroundColor: '#333', border: '1px solid #222' }}>
            <div style={{ width: `${icor}%`, height: '100%', backgroundColor: phase === 3 ? 'orange' : '#8a2be2', transition: 'width 0.2s' }}></div>
          </div>
        </div>
      </div>

      {/* Crosshair Temporário (ajuda a focar) */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: '20px',
        opacity: 0.5
      }}>
        +
      </div>
    </div>
  )
}
