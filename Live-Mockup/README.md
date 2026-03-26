# Workshop Digital Twin - Industry 4.0 Dashboard

A real-time monitoring solution designed to track voltage drops across multiple manufacturing stations.

## ✨ Features
- **Real-time Updates:** Powered by Socket.io for sub-second latency.
- **Interactive Map:** Visual representation of stations (PROPELLIA/SUBPROPELLIA).
- **Data Simulation:** Integrated `dataGenerator.js` for testing without physical hardware.
- **Responsive UI:** Optimized for workshop floor displays.

<a name="setup"></a>
## 🚀 Setup & Execution

### Backend
1. Navigate to the backend directory:
   ```bash
   cd Live-Mockup/backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
   *Server listener: http://localhost:3000*

### Frontend
- Open `Live-Mockup/index.html` directly in any modern web browser.
- The dashboard will automatically attempt to connect to the backend.

## 📁 Key Components
- `server.js`: Express server with Socket.io integration.
- `dataGenerator.js`: Logic for simulating industrial voltage telemetry.
- `script.js`: Frontend logic for real-time visualization.
