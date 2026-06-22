const seedData = {
  "appState": {
    "selectedProductId": "product-3",
    "totalPrintedCount": 0
  },
  "customers": [
    {"column":1,"id":"customer-0","location":"新莊","name":"新莊","sortOrder":0},
    {"column":1,"id":"customer-1","location":"宜蘭","name":"鑫","sortOrder":1},
    {"column":1,"id":"55F8F5CA-EC49-4C49-A0FC-E6CDF5D1D609","location":"力行","name":"P","sortOrder":2},
    {"column":1,"id":"customer-2","location":"力行","name":"153","sortOrder":3},
    {"column":1,"id":"customer-3","location":"力行","name":"42","sortOrder":4},
    {"column":1,"id":"customer-18","location":"板橋","name":"傳真","sortOrder":5},
    {"column":1,"id":"customer-19","location":"板橋","name":"得意","sortOrder":6},
    {"column":1,"id":"customer-20","location":"板橋","name":"原","sortOrder":7},
    {"column":1,"id":"customer-21","location":"板橋","name":"大象","sortOrder":8},
    {"column":2,"id":"customer-4","location":"基隆","name":"雙隆","sortOrder":0},
    {"column":2,"id":"customer-5","location":"基隆","name":"鴻順","sortOrder":1},
    {"column":2,"id":"customer-6","location":"基隆","name":"福山","sortOrder":2},
    {"column":2,"id":"customer-7","location":"基隆","name":"裕成","sortOrder":3},
    {"column":2,"id":"customer-8","location":"基隆","name":"5號","sortOrder":4},
    {"column":2,"id":"customer-9","location":"基隆","name":"進發","sortOrder":5},
    {"column":2,"id":"customer-10","location":"基隆","name":"貴","sortOrder":6},
    {"column":2,"id":"customer-11","location":"基隆","name":"善吉","sortOrder":7},
    {"column":2,"id":"customer-12","location":"基隆","name":"家慶","sortOrder":8},
    {"column":2,"id":"customer-13","location":"基隆","name":"建隆","sortOrder":9},
    {"column":2,"id":"customer-33","location":"基隆","name":"信隆","sortOrder":10},
    {"column":2,"id":"customer-14","location":"基隆","name":"玉英","sortOrder":11},
    {"column":2,"id":"customer-15","location":"基隆","name":"永成","sortOrder":12},
    {"column":2,"id":"customer-16","location":"基隆","name":"20","sortOrder":13},
    {"column":2,"id":"customer-17","location":"基隆","name":"12","sortOrder":14},
    {"column":3,"id":"customer-22","location":"台北","name":"宏昌","sortOrder":0},
    {"column":3,"id":"customer-23","location":"台北","name":"木山","sortOrder":1},
    {"column":3,"id":"customer-24","location":"台北","name":"649","sortOrder":2},
    {"column":3,"id":"customer-25","location":"台北","name":"648","sortOrder":3},
    {"column":3,"id":"customer-26","location":"台北","name":"630","sortOrder":4},
    {"column":3,"id":"customer-27","location":"台北","name":"623","sortOrder":5},
    {"column":3,"id":"customer-28","location":"台北","name":"577","sortOrder":6},
    {"column":3,"id":"customer-29","location":"台北","name":"509","sortOrder":7},
    {"column":3,"id":"customer-30","location":"台北","name":"399","sortOrder":8},
    {"column":3,"id":"customer-31","location":"台北","name":"338","sortOrder":9},
    {"column":3,"id":"customer-32","location":"台北","name":"A","sortOrder":10},
    {"column":3,"id":"6FBF5AC7-D17A-453C-B313-A5C9261F8EC7","location":"台北","name":"393","sortOrder":11},
    {"column":3,"id":"3CA32952-C7EC-48BF-930D-2135CCA42F6E","location":"台北","name":"阿賢","sortOrder":12}
  ],
  "products": [
    {"id":"product-0","isBlank":false,"name":"青蔥","sortOrder":0},
    {"id":"product-1","isBlank":false,"name":"小白","sortOrder":1},
    {"id":"product-2","isBlank":false,"name":"Ａ菜","sortOrder":2},
    {"id":"product-3","isBlank":false,"name":"青江","sortOrder":3},
    {"id":"product-4","isBlank":false,"name":"格蘭","sortOrder":4},
    {"id":"product-5","isBlank":false,"name":"小刈","sortOrder":5},
    {"id":"product-6","isBlank":false,"name":"空心","sortOrder":6},
    {"id":"product-7","isBlank":false,"name":"大土","sortOrder":7},
    {"id":"product-8","isBlank":false,"name":"油菜","sortOrder":8},
    {"id":"product-9","isBlank":false,"name":"大陸妹","sortOrder":9},
    {"id":"product-10","isBlank":true,"name":"空白","sortOrder":10}
  ]
};

const STORAGE_KEY = "yongfang-label-web-state-v1";
const state = loadState();

const productSelect = document.getElementById("productSelect");
const customerColumns = document.getElementById("customerColumns");
const totalCount = document.getElementById("totalCount");
const details = document.getElementById("details");
const previewCanvas = document.getElementById("previewCanvas");
const output = document.getElementById("output");
const historyDateSelect = document.getElementById("historyDateSelect");
const historySummary = document.getElementById("historySummary");
const historyList = document.getElementById("historyList");
const webFontScale = document.getElementById("webFontScale");
const webFontScaleText = document.getElementById("webFontScaleText");
const printArea = document.getElementById("printArea");

if (!Array.isArray(state.records)) state.records = [];
if (!state.fontScale) state.fontScale = 100;

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }
  return {
    selectedProductId: seedData.appState.selectedProductId,
    quantities: {},
    records: [],
    fontScale: 100
  };
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function todayKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function selectedProduct() {
  return seedData.products.find(product => product.id === state.selectedProductId) || seedData.products[0];
}

function sortedProducts() {
  return [...seedData.products].sort((a, b) => a.sortOrder - b.sortOrder);
}

function customersInColumn(column) {
  return seedData.customers
    .filter(customer => customer.column === column)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

function printItems() {
  const product = selectedProduct();
  return seedData.customers
    .map(customer => ({
      customer: customer.name,
      location: customer.location,
      product: product.isBlank ? "" : product.name,
      quantity: Number(state.quantities[customer.id] || 0)
    }))
    .filter(item => item.quantity > 0);
}

function totalQuantity() {
  return printItems().reduce((sum, item) => sum + item.quantity, 0);
}

function renderProducts() {
  productSelect.innerHTML = "";
  sortedProducts().forEach(product => {
    const option = document.createElement("option");
    option.value = product.id;
    option.textContent = product.name;
    productSelect.append(option);
  });
  productSelect.value = state.selectedProductId;
}

function renderCustomers() {
  customerColumns.innerHTML = "";
  for (let column = 1; column <= 3; column += 1) {
    const columnEl = document.createElement("div");
    columnEl.className = "column";
    columnEl.innerHTML = `<div class="column-title">第 ${column} 列</div>`;

    customersInColumn(column).forEach(customer => {
      const row = document.createElement("div");
      row.className = "customer-row";
      row.innerHTML = `
        <button class="customer-name" type="button" aria-label="${customer.name} 加一">${verticalNameHTML(customer.name)}</button>
        <div class="qty-controls">
          <input class="qty" type="number" min="0" inputmode="numeric" value="${state.quantities[customer.id] || ""}" placeholder="0" aria-label="${customer.name} 件數">
          <button class="minus" type="button" aria-label="${customer.name} 減一">−</button>
        </div>
      `;

      const nameButton = row.querySelector(".customer-name");
      const input = row.querySelector(".qty");
      const minus = row.querySelector(".minus");

      nameButton.addEventListener("click", () => {
        state.quantities[customer.id] = Number(state.quantities[customer.id] || 0) + 1;
        saveState();
        render();
      });

      input.addEventListener("input", event => {
        state.quantities[customer.id] = Math.max(0, Number(event.target.value || 0));
        saveState();
        updateSummary();
      });

      minus.addEventListener("click", () => {
        state.quantities[customer.id] = Math.max(0, Number(state.quantities[customer.id] || 0) - 1);
        saveState();
        render();
      });

      columnEl.append(row);
    });

    customerColumns.append(columnEl);
  }
}

function verticalNameHTML(name) {
  return [...name].slice(0, 3).map(char => `<span>${escapeHTML(char)}</span>`).join("");
}

function escapeHTML(text) {
  return String(text).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

function updateSummary() {
  totalCount.textContent = `總 ${totalQuantity()} 張`;
  document.documentElement.style.setProperty("--font-scale", state.fontScale / 100);
  renderDetails();
  renderPreview();
  renderHistory();
  updatePrintArea();
}

function renderDetails() {
  const items = printItems();
  details.className = items.length ? "details" : "details empty";
  details.innerHTML = "";
  if (!items.length) {
    details.textContent = "尚未輸入件數";
    return;
  }

  items.forEach(item => {
    const line = document.createElement("div");
    line.className = "detail-line";
    line.innerHTML = `
      <strong>${escapeHTML(item.customer)}</strong>
      <span>${escapeHTML(item.location)}</span>
      <span></span>
      <span>${escapeHTML(item.product || "空白")}</span>
      <strong>${item.quantity} 張</strong>
    `;
    details.append(line);
  });
}

function renderPreview() {
  const first = printItems()[0] || {
    customer: "測試",
    location: "地點",
    product: selectedProduct()?.isBlank ? "" : selectedProduct()?.name || "",
    quantity: 1
  };
  drawLabel(previewCanvas, first);
}

function updatePrintArea() {
  if (!printArea) return;
  printArea.innerHTML = "";
  let items = expandedPrintItems();
  if (!items.length) {
    items = [{
      customer: "測試",
      location: "地點",
      product: selectedProduct()?.isBlank ? "" : selectedProduct()?.name || "",
      quantity: 1
    }];
  }

  items.forEach((item, index) => {
    const canvas = document.createElement("canvas");
    canvas.width = 1000;
    canvas.height = 600;
    drawLabel(canvas, item);
    const image = document.createElement("img");
    image.src = canvas.toDataURL("image/png");
    image.alt = `標籤 ${index + 1}`;
    printArea.append(image);
  });
}

function drawLabel(canvas, item) {
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, width, height);
  drawHalf(ctx, item, 0, 0, width / 2, height);
  drawHalf(ctx, item, width / 2, 0, width / 2, height);
}

function drawHalf(ctx, item, x, y, width, height) {
  const customerW = width * 0.68;
  const infoW = width * 0.32;
  const customerRect = { x, y: y + 8, w: customerW, h: height - 16 };
  const infoRect = { x: x + customerW, y: y + 8, w: infoW - 8, h: height - 16 };

  drawCustomer(ctx, item.customer, customerRect);
  drawInfoBox(ctx, item.location, item.product, infoRect);
}

function drawInfoBox(ctx, location, product, rect) {
  ctx.strokeStyle = "black";
  ctx.lineWidth = 5;
  ctx.strokeRect(rect.x, rect.y, rect.w, rect.h);
  ctx.beginPath();
  ctx.moveTo(rect.x, rect.y + rect.h / 2);
  ctx.lineTo(rect.x + rect.w, rect.y + rect.h / 2);
  ctx.stroke();

  const top = { x: rect.x, y: rect.y, w: rect.w, h: rect.h / 2 };
  const bottom = { x: rect.x, y: rect.y + rect.h / 2, w: rect.w, h: rect.h / 2 };
  const dateRect = { x: top.x, y: top.y + top.h - 70, w: top.w, h: 44 };
  drawVertical(ctx, location, { x: top.x + 4, y: top.y + 12, w: top.w - 8, h: dateRect.y - top.y - 14 }, 116, 4);
  drawCentered(ctx, String(dayOfYear(new Date())), dateRect, 40);
  drawVertical(ctx, product || "", { x: bottom.x + 3, y: bottom.y + 3, w: bottom.w - 6, h: bottom.h - 6 }, 128, 8);
}

function drawCustomer(ctx, text, rect) {
  if (/^[0-9.]+$/.test(text.trim())) {
    drawRotated(ctx, text, rect, customerFontSize(text));
  } else {
    drawVertical(ctx, text, rect, customerFontSize(text), 8);
  }
}

function drawVertical(ctx, text, rect, requestedSize, spacing) {
  const chars = [...text];
  if (!chars.length) return;
  let size = requestedSize;
  const maxByHeight = (rect.h * 0.9 - spacing * Math.max(chars.length - 1, 0)) / chars.length;
  size = Math.min(size, maxByHeight);
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `900 ${size}px -apple-system, BlinkMacSystemFont, "PingFang TC", sans-serif`;
  const lineH = size + spacing;
  const totalH = chars.length * size + (chars.length - 1) * spacing;
  let currentY = rect.y + rect.h / 2 - totalH / 2 + size / 2;
  chars.forEach(char => {
    ctx.fillText(char, rect.x + rect.w / 2, currentY);
    currentY += lineH;
  });
}

function drawRotated(ctx, text, rect, requestedSize) {
  ctx.save();
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  let size = requestedSize;
  ctx.font = `900 ${size}px ui-monospace, SFMono-Regular, Menlo, monospace`;
  const measured = ctx.measureText(text);
  const textW = measured.width;
  const scale = Math.min((rect.h * 0.88) / textW, (rect.w * 0.72) / size, 1);
  size *= scale;
  ctx.font = `900 ${size}px ui-monospace, SFMono-Regular, Menlo, monospace`;
  ctx.translate(rect.x + rect.w / 2, rect.y + rect.h / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText(text, 0, 0);
  ctx.restore();
}

function drawCentered(ctx, text, rect, size) {
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `800 ${size}px -apple-system, BlinkMacSystemFont, sans-serif`;
  ctx.fillText(text, rect.x + rect.w / 2, rect.y + rect.h / 2);
}

function customerFontSize(text) {
  if (text.length <= 2) return 300;
  if (text.length === 3) return 210;
  if (text.length === 4) return 160;
  return 120;
}

function dayOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 0);
  return Math.floor((date - start) / 86400000);
}

async function canvasToFile(canvas, name) {
  const blob = await new Promise(resolve => canvas.toBlob(resolve, "image/png"));
  return new File([blob], name, { type: "image/png" });
}

async function shareCanvas(canvas, name) {
  const file = await canvasToFile(canvas, name);
  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    await navigator.share({ files: [file], title: name });
    return true;
  }
  return false;
}

function expandedPrintItems() {
  const expanded = [];
  printItems().forEach(item => {
    for (let i = 0; i < item.quantity; i += 1) {
      expanded.push({ ...item, quantity: 1 });
    }
  });
  return expanded;
}

async function generateAllImages() {
  output.innerHTML = "";
  const expanded = expandedPrintItems();

  if (!expanded.length) {
    alert("請至少輸入一筆件數。");
    return;
  }

  recordPrint();

  expanded.forEach((item, index) => {
    const canvas = document.createElement("canvas");
    canvas.width = 1000;
    canvas.height = 600;
    drawLabel(canvas, item);
    const url = canvas.toDataURL("image/png");

    const card = document.createElement("div");
    card.className = "output-card";
    card.innerHTML = `
      <img src="${url}" alt="標籤 ${index + 1}">
      <a download="永芳標籤-${index + 1}.png" href="${url}">下載 PNG</a>
    `;
    const shareBtn = document.createElement("button");
    shareBtn.className = "secondary";
    shareBtn.textContent = "分享";
    shareBtn.addEventListener("click", async () => {
      const ok = await shareCanvas(canvas, `永芳標籤-${index + 1}.png`);
      if (!ok) alert("此瀏覽器不支援直接分享檔案，請先下載或長按圖片分享。");
    });
    card.append(shareBtn);
    output.append(card);
  });
}

async function shareAllLabels() {
  const expanded = expandedPrintItems();
  if (!expanded.length) {
    alert("請至少輸入一筆件數。");
    return;
  }

  const files = [];
  for (let index = 0; index < expanded.length; index += 1) {
    const canvas = document.createElement("canvas");
    canvas.width = 1000;
    canvas.height = 600;
    drawLabel(canvas, expanded[index]);
    files.push(await canvasToFile(canvas, `永芳標籤-${index + 1}.png`));
  }

  if (navigator.canShare && navigator.canShare({ files })) {
    recordPrint();
    await navigator.share({ files, title: "永芳標籤" });
    return;
  }

  await generateAllImages();
  alert("此瀏覽器不支援一次分享全部標籤，已產生圖片，請逐張按分享。");
}

function recordPrint() {
  const now = new Date();
  const newRecords = printItems().map(item => ({
    id: `${Date.now()}-${Math.random()}`,
    timestamp: now.toISOString(),
    dateKey: todayKey(now),
    customer: item.customer,
    location: item.location,
    product: item.product,
    quantity: item.quantity
  }));
  state.records = [...newRecords, ...(state.records || [])];
  saveState();
  renderHistory();
}

function renderHistoryDateOptions() {
  if (!historyDateSelect) return;
  const selected = historyDateSelect.value || "today";
  const dates = [...new Set((state.records || []).map(record => record.dateKey || todayKey(new Date(record.timestamp))))].sort().reverse();
  historyDateSelect.innerHTML = `
    <option value="today">今天</option>
    <option value="all">全部日期</option>
  `;
  dates.forEach(key => {
    if (key === todayKey()) return;
    const option = document.createElement("option");
    option.value = key;
    option.textContent = key;
    historyDateSelect.append(option);
  });
  historyDateSelect.value = [...historyDateSelect.options].some(option => option.value === selected) ? selected : "today";
}

function renderHistory() {
  if (!historyDateSelect || !historySummary || !historyList) return;
  renderHistoryDateOptions();
  const filter = historyDateSelect.value || "today";
  const records = (state.records || []).filter(record => {
    const key = record.dateKey || todayKey(new Date(record.timestamp));
    if (filter === "all") return true;
    if (filter === "today") return key === todayKey();
    return key === filter;
  });

  historySummary.textContent = `共 ${records.length} 筆，合計 ${records.reduce((sum, record) => sum + Number(record.quantity || 0), 0)} 張`;
  historyList.className = records.length ? "details" : "details empty";
  historyList.innerHTML = "";
  if (!records.length) {
    historyList.textContent = "尚無紀錄";
    return;
  }

  records.forEach(record => {
    const time = new Date(record.timestamp).toLocaleString("zh-TW", { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" });
    const line = document.createElement("div");
    line.className = "detail-line";
    line.innerHTML = `
      <strong>${escapeHTML(record.customer)}</strong>
      <span>${escapeHTML(record.location)}</span>
      <span>${escapeHTML(record.product || "空白")}</span>
      <span>${escapeHTML(time)}</span>
      <strong>${Number(record.quantity || 0)} 張</strong>
    `;
    historyList.append(line);
  });
}

function render() {
  document.documentElement.style.setProperty("--font-scale", state.fontScale / 100);
  if (webFontScale) webFontScale.value = state.fontScale;
  if (webFontScaleText) webFontScaleText.textContent = `${state.fontScale}%`;
  renderProducts();
  renderCustomers();
  updateSummary();
}

productSelect.addEventListener("change", event => {
  state.selectedProductId = event.target.value;
  saveState();
  updateSummary();
});

document.getElementById("resetBtn")?.addEventListener("click", () => {
  state.quantities = {};
  saveState();
  render();
});

document.getElementById("generateBtn")?.addEventListener("click", generateAllImages);

document.getElementById("systemPrintBtn")?.addEventListener("click", () => {
  if (!printItems().length) {
    alert("請至少輸入一筆件數。");
    return;
  }
  updatePrintArea();
  recordPrint();
  window.print();
});

document.getElementById("shareAllBtn")?.addEventListener("click", shareAllLabels);

document.getElementById("shareFirstBtn")?.addEventListener("click", async () => {
  const ok = await shareCanvas(previewCanvas, "永芳標籤-測試.png");
  if (!ok) alert("此瀏覽器不支援直接分享檔案，請先下載或長按圖片分享。");
});

window.addEventListener("beforeprint", updatePrintArea);

document.querySelectorAll(".tab-button").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".tab-button").forEach(item => item.classList.toggle("active", item === button));
    document.querySelectorAll(".tab-panel").forEach(panel => panel.classList.toggle("active", panel.id === button.dataset.tab));
    if (button.dataset.tab === "historyTab") renderHistory();
  });
});

historyDateSelect?.addEventListener("change", renderHistory);

document.getElementById("clearHistoryBtn")?.addEventListener("click", () => {
  if (!confirm("確定要清除全部列印紀錄嗎？")) return;
  state.records = [];
  saveState();
  renderHistory();
});

webFontScale?.addEventListener("input", event => {
  state.fontScale = Number(event.target.value);
  saveState();
  if (webFontScaleText) webFontScaleText.textContent = `${state.fontScale}%`;
  document.documentElement.style.setProperty("--font-scale", state.fontScale / 100);
});

render();
