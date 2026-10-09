// =========================================================
// HVAIV — INTERACTIONS / SIMULATIONS
// Replace configuration values here when real project data
// becomes available. Until then, the dashboard stays explicit
// about simulation / preliminary / validation states.
// =========================================================

const projectConfig = {
  projectStatus: "ACTIVE DEVELOPMENT",

  speed: {
    value: "~4 m/s",
    status: "PRELIMINARY"
  },

  payload: {
    value: "5 kg",
    status: "DESIGN REQUIREMENT"
  },

  github: "#",

  hardware: [
    { id: "01", name: "ESP32-S3", role: "Primary embedded controller for the current bring-up; the team reported the board obtained on 6 October.", status: "OBTAINED / SETUP CHECK", spec: "Exact board / pinout to verify", note: "Do not assume a final GPIO map" },
    { id: "02", name: "IR SENSOR ARRAY", role: "Immediate line-sensing bring-up route. The chat describes an eight-channel arrangement: 3 left, 2 centre and 3 right.", status: "CHANNEL RETEST", spec: "One sensor reported faulty", note: "Check all channels and output levels" },
    { id: "03", name: "DC GEAR MOTORS", role: "Rear propulsion via two gear motors. The previously discussed motor was questioned for insufficient torque / wrong selection.", status: "SELECTION OPEN", spec: "Final motor TBD", note: "Validate torque under load" },
    { id: "04", name: "MOTOR DRIVER", role: "High-current motor-control circuit. BTN8982TA / BTN8986TA, BTS7960, L293D and Cytron-type options appeared in discussion; none is confirmed final.", status: "MODEL TBD", spec: "Check exact module and ratings", note: "Match topology/current to motors" },
    { id: "05", name: "STEERING SERVO", role: "One servo is intended to move the front Ackermann linkage. Linkage geometry and PWM pin mapping need verification.", status: "BENCH / LINKAGE TEST", spec: "Final torque/rating TBD", note: "GPIO assignment is not final" },
    { id: "06", name: "WHEEL ENCODERS", role: "Planned feedback for RPM measurement and odometry; pulse counting still needs integration/validation.", status: "INTEGRATION TASK", spec: "Encoder details TBD", note: "Verify counts and direction" },
    { id: "07", name: "PHONE CAMERA", role: "Experimental vision path using wireless video; not the only current bring-up path.", status: "R&D BRANCH", spec: "Latency / frame rate TBD", note: "Mounting and CG risk" },
    { id: "08", name: "BATTERY + BUCKS", role: "Power distribution discussion includes buck converters for control/servo rails and a main switch.", status: "REVIEW REQUIRED", spec: "Battery / rails TBD", note: "Verify current, ground and switch ratings" },
    { id: "09", name: "CHASSIS / PAYLOAD", role: "Ackermann chassis and payload platform being fabricated/adjusted; roughly 20 × 30 cm was mentioned as an estimate, not a final drawing.", status: "FABRICATION", spec: "Dimensions not final", note: "Keep CG low under up to 5 kg" }
  ],

  components: {
    camera: {
      title: "PHONE CAMERA / R&D",
      description: "Mobile phone vision is an experimental path. Wireless stream latency, frame production, processing load, camera orientation and the weight/height of the mount need testing before relying on it for control.",
      data: ["VISION R&D", "NOT VALIDATED", "45° / 20–35 CM ARE CONCEPTS"]
    },
    esp: {
      title: "ESP32-S3",
      description: "The board was reported obtained by the team. Confirm the exact board variant, pinout, power arrangement and PWM/LEDC assignment before final wiring or soldering.",
      data: ["EMBEDDED CONTROL", "SETUP / PIN CHECK", "GPIO MAP NOT FINAL"]
    },
    servo: {
      title: "STEERING SERVO",
      description: "One servo is intended to actuate the front Ackermann linkage. The team discussed a GPIO assignment and then questioned it, so the mapping must be verified from official ESP32-S3 docs and tested on the actual board.",
      data: ["STEERING ACTUATOR", "BENCH / LINKAGE TEST", "PIN + RATING TO VERIFY"]
    },
    motors: {
      title: "REAR DC GEAR MOTORS",
      description: "Rear gear motors provide propulsion. The earlier motor was questioned for torque / suitability and alternatives were discussed; there is no confirmed final motor specification in the chat export.",
      data: ["PROPULSION", "SELECTION OPEN", "TORQUE / RPM TBD"]
    },
    encoders: {
      title: "WHEEL ENCODERS",
      description: "The team discussed encoder code for RPM and odometry. Validate electrical connection, pulse counts and direction before using readings for closed-loop control.",
      data: ["RPM / ODOMETRY", "INTEGRATION TASK", "COUNTS PER REV TBD"]
    },
    ir: {
      title: "IR SENSOR ARRAY",
      description: "The latest chat prioritises IR-based bring-up. An eight-channel layout (3 left, 2 centre, 3 right) was discussed, but one sensor was reported not working and the array needs a full channel test.",
      data: ["IMMEDIATE BRING-UP", "RETEST REQUIRED", "OUTPUT VOLTAGE VERIFY"]
    },
    battery: {
      title: "BATTERY / POWER DISTRIBUTION",
      description: "Battery configuration and buck-converter rails were discussed along with a main switch. Confirm the actual battery, converter ratings, servo rail, ESP32 power and shared ground from the reviewed schematic.",
      data: ["POWER", "SCHEMATIC REVIEW", "RAILS / SWITCH TBD"]
    },
    driver: {
      title: "MOTOR DRIVER",
      description: "Several driver / IC options came up in chat, but none is confirmed final. Verify the exact module, H-bridge topology, voltage range, continuous and stall current and cooling before connecting the selected motors.",
      data: ["MOTOR CONTROL", "UNDER SELECTION", "MODEL / CURRENT TBD"]
    },
    payload: {
      title: "PAYLOAD PLATFORM",
      description: "The design requirement is up to 5 kg. Actual chassis strength, centre of gravity, traction and turning stability must be tested with a secured payload before high-speed runs.",
      data: ["LOAD REQUIREMENT", "DESIGN / FABRICATION", "UP TO 5 KG"]
    }
  },

  architecture: {
    camera: ["PHONE CAMERA / R&D", "Mobile phone provides a wireless visual input in the experimental path; stream delay and capture behavior need measurement.", "NOT VALIDATED"],
    stream: ["WIRELESS VIDEO STREAM", "The proposed vision path relies on wireless frame transfer. Measure end-to-end delay, frame rate and dropped frames before closed-loop use.", "MEASURE LATENCY"],
    esp: ["ESP32-S3", "The team reported obtaining the controller. Verify the board variant, pinout, PWM mapping and power arrangement before wiring.", "BOARD SETUP / PIN CHECK"],
    vision: ["VISION PROCESSING", "Concept: grayscale/preprocessing, region of interest, path extraction and centroid. The processing location and compute feasibility remain to be validated.", "VISION R&D"],
    error: ["PATH / ERROR", "Compute error as desired path center minus detected path center. The sign convention must match the actual camera image and control direction.", "SIMULATION / TO VALIDATE"],
    pid: ["PID CONTROL", "PID can be applied after a reliable sensor/error signal is available. Tune conservatively on a safe bench/low-speed setup; the webpage values are simulations only.", "SIMULATION ONLY"],
    actuation: ["SERVO + REAR DRIVE", "One servo is intended for front Ackermann steering and two DC gear motors for rear propulsion. Motor driver selection and wiring remain open.", "INTEGRATION PENDING"]
  },
  workflow: [
    "Problem Definition", "Research", "Mechanical Design", "CAD",
    "Electronics", "Embedded Setup", "Vision Pipeline", "PID Control",
    "Integration", "Testing", "Optimization"
  ],

  testing: [
    ["IR array channel check", "Eight-channel concept / 3L–2C–3R", "All channels individually verified", "TESTING"],
    ["Sensor output-level check", "IR board outputs to ESP32-S3 GPIO", "Safe logic levels confirmed", "IN PROGRESS"],
    ["Servo + Ackermann linkage", "Bench movement / full steering travel", "Clear, repeatable movement", "TESTING"],
    ["ESP32-S3 PWM pin map", "Exact board and selected servo GPIO", "Official pin map verified", "IN PROGRESS"],
    ["Motor / driver compatibility", "Final motor, driver and power source", "Current / topology compatible", "NOT STARTED"],
    ["Power rails + main switch", "Battery, buck converters, servo and ESP32", "Rails and switching verified", "IN PROGRESS"],
    ["Encoder RPM / odometry", "Wheel rotation pulse feedback", "Pulse counts and direction verified", "IN PROGRESS"],
    ["Unloaded straight-line", "No payload", "Record actual baseline", "NOT STARTED"],
    ["Loaded straight-line", "Secured payload up to 5 kg", "Record behavior safely", "NOT STARTED"],
    ["Gentle curve", "Marked track / moderate curvature", "Record tracking and stability", "NOT STARTED"],
    ["Sharp-turn test", "Marked track / high curvature", "Record safe speed response", "NOT STARTED"],
    ["Phone-camera latency", "Wireless stream / vision R&D", "Measure end-to-end delay", "NOT STARTED"],
    ["Vision frame rate", "Capture and processing path", "Measure real FPS", "NOT STARTED"],
    ["Full-course integration", "Chassis + power + control + sensing", "End-to-end run documented", "NOT STARTED"]
  ],

  statusGroups: [
    { title: "MECHANICAL", items: [["CAD / chassis envelope", "IN PROGRESS"], ["Fabrication", "IN PROGRESS"], ["Ackermann linkage", "TESTING"], ["Payload stability", "NOT STARTED"]] },
    { title: "ELECTRONICS", items: [["Schematic draft / review", "IN PROGRESS"], ["IR board / channel retest", "TESTING"], ["Motor driver selection", "NOT STARTED"], ["Power rails / main switch", "IN PROGRESS"]] },
    { title: "EMBEDDED", items: [["ESP32-S3 board setup", "IN PROGRESS"], ["Servo PWM pin mapping", "IN PROGRESS"], ["Motor control", "IN PROGRESS"], ["Encoder RPM / odometry", "IN PROGRESS"]] },
    { title: "VISION R&D", items: [["Phone stream communication", "IN PROGRESS"], ["Frame capture / latency", "NOT STARTED"], ["ROI / path detection", "NOT STARTED"], ["Vision + PID integration", "NOT STARTED"]] },
    { title: "INTEGRATION", items: [["IR + steering bench test", "TESTING"], ["Drive motor rotation test", "IN PROGRESS"], ["Payload trial", "NOT STARTED"], ["Full assembled-course run", "NOT STARTED"]] }
  ]
};

const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

function initSmoothScroll() {
  $$("[data-scroll]").forEach(btn => {
    btn.addEventListener("click", () => {
      const target = $(btn.dataset.scroll);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  $$(".main-nav a").forEach(link => {
    link.addEventListener("click", () => {
      $("#mainNav")?.classList.remove("open");
      $("#menuToggle")?.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    });
  });
}

function initMobileMenu() {
  const toggle = $("#menuToggle");
  const nav = $("#mainNav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("menu-open", open);
  });
}

function initArchitectureFlow() {
  const title = $("#architectureTitle");
  const desc = $("#architectureDescription");
  const state = $("#architectureState");

  $$(".flow-node").forEach((node, index) => {
    node.addEventListener("click", () => {
      $$(".flow-node").forEach(n => n.classList.remove("active"));
      node.classList.add("active");

      const content = projectConfig.architecture[node.dataset.architecture];
      if (!content) return;

      title.textContent = content[0];
      desc.textContent = content[1];
      state.textContent = content[2];
    });
  });
}

function initComponentInspector() {
  const title = $("#partTitle");
  const description = $("#partDescription");
  const data = $("#partData");

  function selectPart(key) {
    const c = projectConfig.components[key];
    if (!c) return;
    title.textContent = c.title;
    description.textContent = c.description;
    const labels = ["ROLE", "STATUS", "SPEC"];
    data.innerHTML = c.data.map((value, i) =>
      `<div><span>${labels[i] || "NOTE"}</span><strong>${value}</strong></div>`
    ).join("");
    $$(".component-hit").forEach(el => el.classList.toggle("active", el.dataset.part === key));
  }

  $$(".component-hit").forEach(hit => {
    hit.addEventListener("click", () => selectPart(hit.dataset.part));
  });

  $$(".bp-payload, .bp-esp, .bp-battery, .bp-servo, .bp-driver, .bp-camera, .bp-encoder, .bp-ir, .bp-wheel").forEach(el => {
    if (el.dataset.part) {
      el.addEventListener("click", () => selectPart(el.dataset.part));
    }
  });
}

function renderHardware() {
  const grid = $("#hardwareGrid");
  if (!grid) return;
  grid.innerHTML = projectConfig.hardware.map(item => `
    <article class="hardware-card">
      <span>${item.id}</span>
      <strong>${item.name}</strong>
      <p>${item.role}</p>
      <small>${item.status}</small>
    </article>
  `).join("");
}

function renderWorkflow() {
  const grid = $("#workflowGrid");
  if (!grid) return;
  grid.innerHTML = projectConfig.workflow.map((name, i) => `
    <div class="workflow-item">
      <span>${String(i + 1).padStart(2, "0")}</span>
      <strong>${name}</strong>
    </div>
  `).join("");
}

function readStoredJSON(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    console.warn(`Could not read saved dashboard data for ${key}.`, error);
    return fallback;
  }
}

function writeStoredJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Could not save dashboard data for ${key}.`, error);
  }
}

function renderTestingTable() {
  const tbody = $("#testTableBody");
  if (!tbody) return;

  const saved = readStoredJSON("hvaiv-test-results-v2", {});
  const statuses = ["NOT STARTED", "IN PROGRESS", "TESTING", "COMPLETED"];

  tbody.innerHTML = projectConfig.testing.map((row, i) => {
    const stored = saved[i] || {};
    const defaultStatus = row[3] || "NOT STARTED";
    return `
      <tr data-test-row="${i}">
        <td class="test-name">${row[0]}</td>
        <td>${row[1]}</td>
        <td>${row[2]}</td>
        <td><input class="editable measured-input" data-field="measured" aria-label="Measured value for ${row[0]}" placeholder="—" value="${escapeHTML(stored.measured || "")}"></td>
        <td>
          <select class="status-select test-status" data-field="status" aria-label="Status for ${row[0]}">
            ${statuses.map(s => `<option ${s === (stored.status || defaultStatus) ? "selected" : ""}>${s}</option>`).join("")}
          </select>
        </td>
        <td><input class="editable notes-input" data-field="notes" aria-label="Notes for ${row[0]}" placeholder="Add after testing" value="${escapeHTML(stored.notes || "")}"></td>
      </tr>
    `;
  }).join("");

  tbody.addEventListener("input", saveRow);
  tbody.addEventListener("change", saveRow);

  function saveRow(event) {
    const rowEl = event.target.closest("tr[data-test-row]");
    if (!rowEl) return;
    const index = rowEl.dataset.testRow;
    const current = readStoredJSON("hvaiv-test-results-v2", {});
    const record = current[index] || {};
    const field = event.target.dataset.field;
    if (!field) return;
    record[field] = event.target.value;
    current[index] = record;
    writeStoredJSON("hvaiv-test-results-v2", current);
  }
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[char]));
}

function renderStatusBoard() {
  const board = $("#statusBoard");
  if (!board) return;

  const statuses = ["NOT STARTED", "IN PROGRESS", "TESTING", "COMPLETED"];
  const saved = readStoredJSON("hvaiv-project-status-v2", {});

  board.innerHTML = projectConfig.statusGroups.map(group => `
    <article class="status-group">
      <h3>${group.title}</h3>
      ${group.items.map((item, idx) => {
        const itemName = Array.isArray(item) ? item[0] : item;
        const defaultStatus = Array.isArray(item) ? item[1] : "NOT STARTED";
        const key = `${group.title}::${itemName}`;
        const selected = saved[key] || defaultStatus;
        return `
          <div class="status-row">
            <span>${itemName}</span>
            <select class="status-control" data-status-key="${escapeHTML(key)}" aria-label="Status for ${escapeHTML(itemName)}">
              ${statuses.map(s => `<option ${s === selected ? "selected" : ""}>${s}</option>`).join("")}
            </select>
          </div>
        `;
      }).join("")}
    </article>
  `).join("");

  board.addEventListener("change", event => {
    const control = event.target.closest("select[data-status-key]");
    if (!control) return;
    const state = readStoredJSON("hvaiv-project-status-v2", {});
    state[control.dataset.statusKey] = control.value;
    writeStoredJSON("hvaiv-project-status-v2", state);
  });
}

function initVisionPipeline() {
  const labels = ["RAW FRAME", "GRAYSCALE", "ROI / CROPPED", "DETECTED PATH", "CENTROID", "TRACKING ERROR"];
  const stageLabel = $("#visionStageLabel");
  const frame = $(".vision-frame");
  const roi = $(".vision-roi");
  const centroid = $(".vision-centroid");
  const error = $(".vision-error");
  const road = $(".vision-road");
  const path = $(".vision-track-line");
  const centerline = $(".vision-centerline");

  function setStep(step) {
    stageLabel.textContent = labels[step] || labels[0];

    $$(".vision-tab, .vision-flow-item").forEach(el => {
      el.classList.toggle("active", Number(el.dataset.visionStep) === step);
    });

    frame.style.filter = step === 1 ? "grayscale(1) contrast(1.15)" : "none";
    roi.style.opacity = step >= 2 ? "1" : "0";
    centroid.style.opacity = step >= 4 ? "1" : "0";
    error.style.opacity = step >= 5 ? "1" : "0";
    path.style.opacity = step >= 3 ? "1" : ".7";
    centerline.style.opacity = step >= 5 ? "1" : ".35";

    if (step === 2) road.style.opacity = ".24";
    else road.style.opacity = ".45";
  }

  [...$$(".vision-tab"), ...$$(".vision-flow-item")].forEach(el => {
    el.addEventListener("click", () => setStep(Number(el.dataset.visionStep)));
  });

  setStep(0);
}

function initPIDLab() {
  const kp = $("#kp");
  const ki = $("#ki");
  const kd = $("#kd");
  const speed = $("#baseSpeed");
  const kpOut = $("#kpValue");
  const kiOut = $("#kiValue");
  const kdOut = $("#kdValue");
  const speedOut = $("#speedValue");
  const canvas = $("#pidCanvas");
  const ctx = canvas.getContext("2d");
  const statusText = $("#pidStatusText");

  const css = getComputedStyle(document.documentElement);
  const cyan = css.getPropertyValue("--cyan").trim() || "#3ee7ff";
  const muted = "#4e5f6a";
  const white = "#e4edf1";
  const amber = "#f4b64d";

  function updateValues() {
    kpOut.textContent = Number(kp.value).toFixed(2);
    kiOut.textContent = Number(ki.value).toFixed(2);
    kdOut.textContent = Number(kd.value).toFixed(2);
    speedOut.textContent = `${Number(speed.value).toFixed(1)} m/s`;
    const kpv = Number(kp.value), kiv = Number(ki.value), kdv = Number(kd.value);
    if (kpv > 2.1 && kdv < .25) {
      statusText.textContent = "FAST / OSCILLATORY";
      statusText.style.color = amber;
    } else if (kdv > 1.05) {
      statusText.textContent = "DAMPED RESPONSE";
      statusText.style.color = cyan;
    } else if (kiv > .3) {
      statusText.textContent = "INTEGRAL HEAVY";
      statusText.style.color = amber;
    } else {
      statusText.textContent = "STABLE RESPONSE";
      statusText.style.color = "#83d6aa";
    }
  }

  function drawGrid(w, h) {
    ctx.clearRect(0,0,w,h);
    ctx.fillStyle = "#0b1015";
    ctx.fillRect(0,0,w,h);

    ctx.strokeStyle = muted;
    ctx.lineWidth = 1;
    for (let x = 50; x < w; x += 70) {
      ctx.beginPath(); ctx.moveTo(x, 20); ctx.lineTo(x, h-30); ctx.stroke();
    }
    for (let y = 30; y < h-30; y += 60) {
      ctx.beginPath(); ctx.moveTo(35, y); ctx.lineTo(w-20, y); ctx.stroke();
    }

    ctx.strokeStyle = "#293841";
    ctx.beginPath(); ctx.moveTo(35, h/2); ctx.lineTo(w-20,h/2); ctx.stroke();

    ctx.fillStyle = "#596a75";
    ctx.font = "9px monospace";
    ctx.fillText("0", 23, h/2 + 3);
    ctx.fillText("+1", 18, 42);
    ctx.fillText("-1", 18, h-34);
  }

  function drawPID() {
    const w = canvas.width, h = canvas.height;
    drawGrid(w,h);

    const kpv = Number(kp.value);
    const kiv = Number(ki.value);
    const kdv = Number(kd.value);

    // Simulated step response. This is intentionally not a physical model.
    ctx.strokeStyle = white;
    ctx.lineWidth = 1.4;
    ctx.beginPath();

    for (let i = 0; i <= 360; i++) {
      const t = i / 360 * 8;
      const damping = Math.min(1.8, .55 + kdv * .8);
      const natural = 1.1 + kpv * .22;
      const integralBias = Math.min(.28, kiv * .55);
      let y = 1 - Math.exp(-damping*t) * Math.cos(natural*t);
      y += integralBias * (1 - Math.exp(-.65*t));
      y = Math.max(-.25, Math.min(1.35, y));

      const x = 45 + i / 360 * (w - 75);
      const py = h/2 - y * (h*.30);
      if (i === 0) ctx.moveTo(x,py); else ctx.lineTo(x,py);
    }
    ctx.stroke();

    // Target step
    ctx.strokeStyle = cyan;
    ctx.setLineDash([5,5]);
    ctx.beginPath();
    ctx.moveTo(45, h/2);
    ctx.lineTo(110, h/2);
    ctx.lineTo(w-22, h/2 - h*.30);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = "#6d808c";
    ctx.font = "9px monospace";
    ctx.fillText("ACTUAL / SIM", 52, 19);
    ctx.fillStyle = cyan;
    ctx.fillText("TARGET", 112, 19);
  }

  [kp,ki,kd,speed].forEach(input => input.addEventListener("input", () => {
    updateValues();
    drawPID();
  }));

  const resizeObserver = new ResizeObserver(() => drawPID());
  resizeObserver.observe(canvas.parentElement);
  updateValues();
  drawPID();
}

function initSpeedScenario() {
  const car = $("#speedCar");
  const run = $("#speedRun");
  const targetSpeed = $("#targetSpeed");
  const curvature = $("#curvatureState");
  if (!car || !run) return;

  let running = false;

  const stages = [
    { left: "7%", speed: "3.8", curve: "LOW" },
    { left: "28%", speed: "3.2", curve: "MODERATE" },
    { left: "56%", speed: "2.1", curve: "HIGH" },
    { left: "79%", speed: "3.6", curve: "LOW / EXIT" }
  ];

  async function scenario() {
    if (running) return;
    running = true;
    run.disabled = true;

    for (const stage of stages) {
      car.style.left = stage.left;
      targetSpeed.textContent = stage.speed;
      curvature.textContent = stage.curve;
      await new Promise(r => setTimeout(r, 1400));
    }

    run.disabled = false;
    running = false;
  }

  run.addEventListener("click", scenario);
}

function initTelemetry() {
  const values = {
    speed: $("#telemetrySpeed"),
    steering: $("#steeringValue"),
    error: $("#pathErrorValue"),
    fps: $("#fpsValue"),
    battery: $("#batteryValue")
  };

  const canvas = $("#telemetryCanvas");
  const ctx = canvas.getContext("2d");
  const css = getComputedStyle(document.documentElement);
  const cyan = css.getPropertyValue("--cyan").trim() || "#3ee7ff";
  const white = "#dfe8ec";

  const speedHistory = Array.from({length: 90}, (_,i) => 2.8 + Math.sin(i*.17)*.24 + i*.0015);
  const errorHistory = Array.from({length: 90}, (_,i) => 0.16*Math.sin(i*.21) + 0.04*Math.cos(i*.07));

  function renderChart() {
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0,0,w,h);
    ctx.fillStyle = "#0b1015";
    ctx.fillRect(0,0,w,h);

    ctx.strokeStyle = "#25333b";
    ctx.lineWidth = 1;
    for (let x=30; x<w; x+=90) {
      ctx.beginPath(); ctx.moveTo(x,20); ctx.lineTo(x,h-30); ctx.stroke();
    }
    for (let y=30; y<h-30; y+=50) {
      ctx.beginPath(); ctx.moveTo(20,y); ctx.lineTo(w-15,y); ctx.stroke();
    }

    function pathFrom(history, min, max, stroke) {
      ctx.strokeStyle = stroke;
      ctx.lineWidth = 2;
      ctx.beginPath();
      history.forEach((v,i) => {
        const x = 25 + i/(history.length-1)*(w-55);
        const y = 20 + (1-(v-min)/(max-min))*(h-55);
        if (i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
      });
      ctx.stroke();
    }

    pathFrom(speedHistory, 1.5, 4.2, cyan);
    pathFrom(errorHistory, -.3, .3, white);
  }

  function tick() {
    const lastSpeed = speedHistory[speedHistory.length - 1];
    const nextSpeed = Math.max(1.8, Math.min(3.8, lastSpeed + (Math.random()-.5)*.18));
    speedHistory.push(nextSpeed); speedHistory.shift();

    const nextErr = Math.max(-.29, Math.min(.29, errorHistory[errorHistory.length - 1] + (Math.random()-.5)*.08));
    errorHistory.push(nextErr); errorHistory.shift();

    const errPx = Math.round(nextErr * 110);
    values.speed.textContent = nextSpeed.toFixed(2);
    values.steering.textContent = `${(4.4 + nextErr*18).toFixed(1)}°`;
    values.error.textContent = `${errPx >= 0 ? "+" : ""}${errPx}`;
    values.fps.textContent = (29.3 + (Math.random()-.5)*.9).toFixed(1);
    values.battery.textContent = String(Math.max(70, 82 - Math.floor((Date.now()/1000/45)%10)));

    renderChart();
  }

  renderChart();
  window.setInterval(tick, 950);

  const resizeObserver = new ResizeObserver(renderChart);
  resizeObserver.observe(canvas.parentElement);
}

function initAckermannSlider() {
  const slider = $("#steeringAngle");
  const output = $("#steeringAngleValue");
  if (!slider || !output) return;

  slider.addEventListener("input", () => {
    output.textContent = `${slider.value}°`;
    const value = Number(slider.value);
    $$(".ack-wheel").forEach((wheel, index) => {
      if (index < 2) {
        wheel.style.transform = `rotate(${index === 0 ? -value * .55 : value * .35}deg)`;
        wheel.style.transformOrigin = "center";
      }
    });
  });
}

function initPayloadToggle() {
  const mass = $("#payloadMass");
  const label = $("#payloadMassText");
  const dot = $("#cogDot");
  if (!mass || !label || !dot) return;

  $$(".payload-toggle").forEach(btn => {
    btn.addEventListener("click", () => {
      $$(".payload-toggle").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const load = Number(btn.dataset.load);
      if (load === 5) {
        mass.classList.remove("hidden");
        label.textContent = "5 KG";
        dot.setAttribute("cx", "315");
        dot.setAttribute("cy", "221");
      } else {
        mass.classList.add("hidden");
        label.textContent = "EMPTY";
        dot.setAttribute("cx", "310");
        dot.setAttribute("cy", "212");
      }
    });
  });
}

function initTrajectoryAnimation() {
  const route = $("#routeMain");
  const dot = $("#trajectoryDot");
  if (!route || !dot) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return;

  const length = route.getTotalLength();
  let t = 0;

  function frame() {
    t += 0.0015;
    if (t > 1) t = 0;
    const pt = route.getPointAtLength(length * t);
    const c = $(".moving-dot circle", dot);
    c.setAttribute("cx", pt.x);
    c.setAttribute("cy", pt.y);
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

function initPlaceholders() {
  $$(".placeholder-link").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const original = link.textContent;
      link.textContent = "LINK PLACEHOLDER";
      window.setTimeout(() => link.textContent = original, 1100);
    });
  });
}

function initIntersectionReveal() {
  const elements = $$(".hardware-card, .team-card, .software-card, .workflow-item, .objective-row, .metric-card");
  if (!("IntersectionObserver" in window)) return;

  elements.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(8px)";
    el.style.transition = "opacity .45s ease, transform .45s ease";
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  elements.forEach(el => observer.observe(el));
}

document.addEventListener("DOMContentLoaded", () => {
  initSmoothScroll();
  initMobileMenu();
  initArchitectureFlow();
  initComponentInspector();
  renderHardware();
  renderWorkflow();
  renderTestingTable();
  renderStatusBoard();
  initVisionPipeline();
  initPIDLab();
  initSpeedScenario();
  initTelemetry();
  initAckermannSlider();
  initPayloadToggle();
  initTrajectoryAnimation();
  initPlaceholders();
  initIntersectionReveal();
});
