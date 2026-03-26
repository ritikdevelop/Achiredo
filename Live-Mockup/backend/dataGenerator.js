// Simulate physical devices at workstations - generates random values every 1s
let currentData = {};

function initializeData() {
  const lines = ["LINE-1", "LINE-2", "LINE-3", "LINE-4"];
  currentData = {};

  lines.forEach((line, index) => {
    const roomA = `Room ${5 + index * 2}`;
    const roomB = `Room ${6 + index * 2}`;

    currentData[line] = {};
    
    [roomA, roomB].forEach((room) => {
      currentData[line][room] = {
        "PROPELLIA-1": 0,
        "SUBPROPELLIA-1": 0,
        "PROPELLIA-2": 0,
        "SUBPROPELLIA-2": 0,
        "PROPELLIA-3": 0,
        "SUBPROPELLIA-3": 0,
        "PROPELLIA-4": 0,
        "SUBPROPELLIA-4": 0,
        "PROPELLIA-5": 0
      };
    });
  });
}

function updateData() {
  // Simulate physical device readings
  Object.keys(currentData).forEach(line => {
    Object.keys(currentData[line]).forEach(room => {
      Object.keys(currentData[line][room]).forEach(station => {
        // Random values similar to mock: Propellia 0-30, Subpropellia 0-10
        const maxVal = station.startsWith('PROPELLIA') ? 30 : 10;
        currentData[line][room][station] = (Math.random() * maxVal).toFixed(2);
      });
    });
  });
}

function getCurrentData() {
  return JSON.parse(JSON.stringify(currentData)); // Deep copy
}

module.exports = { initializeData, updateData, getCurrentData };

