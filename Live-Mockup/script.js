// Real-time Backend Data Integration (localhost:3000)
let socket;

function renderDashboard(data) {
  const container = document.getElementById("dashboard-container");
  container.innerHTML = ""; // Clear for refresh

  Object.keys(data).forEach((lineName) => {
    const lineData = data[lineName];
    const rooms = Object.keys(lineData);

    let totalDrop = 0;

    const lineEl = document.createElement("div");
    lineEl.className = "line-container";

    // Header
    lineEl.innerHTML = `
            <div class="line-header">
                <span>+VE</span>
                <span>RJT-VL-KJ${lineName.split("-")[1]}</span>
                <span>-VE</span>
            </div>
            <div class="rooms-wrapper">
                ${rooms
                  .map(
                    (room) => `
                    <div class="room-column">
                        <div class="room-title">${room}</div>
                        <div class="station-chain">
                            ${Object.keys(lineData[room])
                              .map((station) => {
                                const val = parseFloat(lineData[room][station]);
                                totalDrop += val;
                                return `
                                    <div class="station-node">
                                        <div class="station-box">${station}</div>
                                        <div class="station-value">#${val}</div>
                                    </div>
                                `;
                              })
                              .join("")}
                        </div>
                    </div>
                `,
                  )
                  .join("")}
            </div>
            <div class="footer-stats">
                <span>Total Drop(mv)</span>
                <span>#${totalDrop.toFixed(2)}</span>
            </div>
            <div class="line-label">${lineName}</div>
        `;

    container.appendChild(lineEl);
  });
}

// Load Socket.io client dynamically
function loadSocketIo(callback) {
  if (typeof io !== "undefined") {
    callback();
    return;
  }
  const script = document.createElement("script");
  script.src = "http://localhost:3000/socket.io/socket.io.js";
  script.onload = callback;
  script.onerror = () => {
    console.warn("Socket.io failed, falling back to polling");
    startPolling();
  };
  document.head.appendChild(script);
}

function fetchData() {
  fetch("http://localhost:3000/api/data")
    .then((res) => res.json())
    .then((data) => renderDashboard(data))
    .catch((err) => console.error("Fetch error:", err));
}

function startPolling() {
  fetchData(); // Initial
  setInterval(fetchData, 1000);
}

function initRealTime() {
  loadSocketIo(() => {
    socket = io("http://localhost:3000");
    socket.on("connect", () => {
      console.log("Socket.io connected - real-time active");
      socket.on("dataUpdate", (data) => {
        renderDashboard(data);
      });
    });
    socket.on("disconnect", () => {
      console.log("Socket.io disconnected, starting polling fallback");
      startPolling();
    });
    // Request initial data
    socket.emit("requestData");
  });
}

// Initialize real-time connection
initRealTime();
