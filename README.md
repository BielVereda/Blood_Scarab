# 🪲 Escaravelho de Sangue (Blood Scarab)

**Gênero:** Hack 'n' Slash 3D / Survival Horror & Puzzle / Ação Narrativa  
**Plataforma:** Web Browser (Desktop)  
**Estilo Visual:** Transição progressiva de Gótico/Body Horror para Fantasia Mitológica Dourada  
**Tom Narrativo:** Ação épica, horror visceral, sarcasmo/humor ácido focado no esgotamento corporativo/divino.

---

## 📖 Visão Geral e Lore

A balança de Ma'at foi fraudada pela vaidade do panteão. **Ammit**, a besta devoradora de corações, contraiu uma anomalia abissal e voltou suas mandíbulas para o topo da hierarquia divina. Um por um, Rá, Hórus, Ísis e Ptah foram caçados e engolidos. A massa orgânica de Ammit cresceu a proporções titânicas, fundindo-se às entranhas do deserto e dando origem à Pirâmide Negra de Akhet. O cenário do jogo é o próprio sistema digestivo vivo da besta.

Você joga como **Kebeh (Qebehsenuef)**, o deus menor dos intestinos e da mumificação, antes a piada recorrente dos banquetes de Osíris. Cuspidos num fosso de dejetos sacros por Ammit, Kebeh desperta milênios depois, parasitado pelo **Escaravelho de Sangue** (relíquia deixada por Thoth). Kebeh não busca justiça: ele busca revanche.

### Os Atos da História
1. **O Despertar no Lixo (Body Blood):** Puzzles e horror de sobrevivência nas catacumbas de tecido necrosado.
2. **A Avalanche de Revolta (Quimera de Guerra):** Metroidvania e Ação roubando as relíquias de Ptah e Néftis.
3. **O Julgamento de Rá (Faraó Infausto):** Boss Battle na Câmara Solar humilhando o Rei dos Deuses.
4. **A Erupção de Ammit:** Fuga e batalha titânica no deserto.

---

## 🛠️ Tecnologias e Stack (Engine Base)

O jogo está sendo construído inteiramente para rodar direto no navegador, usando as melhores tecnologias de renderização 3D e física para React:

- **React + Vite:** Para UI (HUD, Inventário) e build rápido.
- **React Three Fiber (R3F):** Abstração declarativa do `Three.js` para renderizar o 3D.
- **Drei (`@react-three/drei`):** Utilitários de câmera, controles de teclado e helpers 3D.
- **Rapier 3D (`@react-three/rapier`):** Motor de física WebAssembly super rápido para hitboxes e gravidade.
- **Zustand:** Gerenciamento de estado global (Vida, Icor e Ângulos de Câmera).

---

## ⚙️ Como Instalar e Rodar Localmente

Certifique-se de ter o [Node.js](https://nodejs.org/) instalado em sua máquina.

1. Clone o repositório:
   ```bash
   git clone https://github.com/BielVereda/Blood_Scarab.git
   cd Blood_Scarab
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

4. Abra o navegador no endereço: `http://localhost:5173/`

---

## 🎮 Controles Atuais (Keyboard Only)

- **W, A, S, D** ou **Setas:** Movimentar Kebeh pelo cenário.
- **J:** Ataque Leve (Aciona Hitbox Frontal).
- **K:** Ataque Pesado (Dano Maior e maior tempo de recuperação).

*Nota: Durante os ataques, a movimentação é momentaneamente travada para garantir o peso (Hit Stop) clássico de Hack 'n' Slash.*

---

## 🗺️ Status de Desenvolvimento (Fases)

- [x] **Fase I (Engine Base):** Projeto configurado, física (Rapier) estruturada com player (Cápsula) dinâmico e colisões. UI (HUD) conectada com Zustand.
- [x] **Fase II (Câmeras Cinematográficas):** Sistema robusto de _Camera Triggers_ implementado (estilo God of War/Resident Evil clássico), transicionando suavemente dependendo da zona onde o jogador pisa.
- [x] **Fase III (Combate Básico):** Rotação dinâmica via matemática (Quaternion), spawns de _Sensor Colliders_ (Hitboxes da Espada) sincronizados com as teclas J/K. Inimigo "Dummy" programado para receber dano e encher barra de ICOR.
- [ ] **Fase IV (Modelos 3D & Animação):** Substituir a cápsula padrão por `kebeh.glb` no `<PlayerModel />` e habilitar a Máquina de Estados do Mixamo (Idle, Walk, Slash).
- [ ] **Fase V (Inventário e Puzzles):** Interface no React com renderizador R3F secundário para inspecionar Vasos Canópicos.
- [ ] **Fase VI (Polimento Final):** Boss final (Ammit), Partículas emissivas (Shaders), e Áudio 3D.