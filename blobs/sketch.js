let svgContainer;
let pathGroups = [];
let rawSvg;

// View state: 'home', 'left', 'center', 'right'
let currentView = 'home';

// Toggle state for showing/hiding labels (disables the last two paths)
let showLabels = true;

// Artboard Dimensions: 24" x 12.5"
let originalViewBox = { x: 0, y: 0, width: 1584, height: 825 };

// Section configuration fixed to first 15 customizable paths (5 per section)
const sections = {
  left: { title: 'Left (Paths 1–5)', start: 0, end: 5 },
  center: { title: 'Center (Paths 6–10)', start: 5, end: 10 },
  right: { title: 'Right (Paths 11–15)', start: 10, end: 15 }
};

let individualPieces = [];

const palette = [
  { name: 'Red', hex: '#FF0019' },
  { name: 'Teal', hex: '#298D70' },
  { name: 'Lime', hex: '#8DDE5D' },
  { name: 'Gold', hex: '#FFC107' },
  { name: 'Purple', hex: '#8250DF' },
  { name: 'Dark', hex: '#2C3E50' }
];

// Array storing current hex fills for the first 15 paths
let pathColors = [];
// History stack for randomizer undo functionality
let colorHistory = [];

// Cart & Pricing Data
let cart = [];

let controlsDiv;
let activePopoverIndex = null; // Track open popover

// Form input references
let nameInput, emailInput;

async function setup() {
  createCanvas(768, 1250);

  // Outer Wrapper
  let stageWrapper = createDiv();
  stageWrapper.position(30, 60);
  stageWrapper.style('position', 'absolute');
  stageWrapper.style('width', '708px');

  // 1. Container for SVG Graphic
  svgContainer = createDiv();
  svgContainer.parent(stageWrapper);
  svgContainer.style('width', '708px');
  svgContainer.style('height', '368px'); // Base height for home view
  svgContainer.style('display', 'flex');
  svgContainer.style('justify-content', 'center');
  svgContainer.style('align-items', 'center');
  svgContainer.style('background', '#ffffff');
  svgContainer.style('border-radius', '12px');
  svgContainer.style('box-shadow', '0 4px 14px rgba(0,0,0,0.08)');
  svgContainer.style('overflow', 'hidden');
  svgContainer.style('transition', 'height 0.25s ease');

  svgContainer.html(mySVG);

  rawSvg = select('svg', svgContainer);
  if (rawSvg) {
    rawSvg.style('width', '100%');
    rawSvg.style('height', '100%');
    rawSvg.attribute('preserveAspectRatio', 'xMidYMid meet');

    let vb = rawSvg.attribute('viewBox');
    if (vb) {
      let coords = vb.split(' ').map(Number);
      originalViewBox = { x: coords[0], y: coords[1], width: coords[2], height: coords[3] };
    }
  }

  // Select all SVG paths in DOM order
  pathGroups = selectAll('path', svgContainer);

  // Initialize initial colors ONLY for the first 15 paths
  for (let i = 0; i < 15; i++) {
    pathColors[i] = palette[i % palette.length].hex;
  }

  // Generate individual purchasing items for total paths
  const basePrices = [1200, 900, 600];
  for (let i = 0; i < pathGroups.length; i++) {
    individualPieces.push({
      id: i + 1,
      name: `Piece ${String(i + 1).padStart(2, '0')} (Path ${i + 1})`,
      price: basePrices[i % basePrices.length]
    });
  }

  updatePathFills();

  // 2. Control Panel Container
  controlsDiv = createDiv();
  controlsDiv.parent(stageWrapper);

  renderUI();
}

function updatePathFills() {
  let totalPaths = pathGroups.length;

  // Apply fills ONLY to the first 15 paths
  for (let i = 0; i < 15 && i < totalPaths; i++) {
    pathGroups[i].style('fill', pathColors[i]);
  }

  // Handle label visibility toggle on the final two paths of the SVG
  for (let i = 0; i < totalPaths; i++) {
    if (i >= totalPaths - 2) {
      pathGroups[i].style('display', showLabels ? 'inline' : 'none');
    }
  }
}

function toggleLabels() {
  showLabels = !showLabels;
  updatePathFills();
  renderUI();
}

// Randomize colors ensuring NO repeats ONLY across the first 15 paths (0-4, 5-9, 10-14)
function randomizeSectionColors() {
  colorHistory.push([...pathColors]);

  let ranges = [
    [0, 5],   // Left Section
    [5, 10],  // Center Section
    [10, 15]  // Right Section
  ];

  ranges.forEach(range => {
    let shuffled = [...palette].sort(() => Math.random() - 0.5);
    for (let i = range[0], j = 0; i < range[1]; i++, j++) {
      pathColors[i] = shuffled[j].hex;
    }
  });

  updatePathFills();
  renderUI();
}

// Undo last randomization step
function undoColorRandomize() {
  if (colorHistory.length > 0) {
    pathColors = colorHistory.pop();
    updatePathFills();
    renderUI();
  }
}

function addToCart(item) {
  cart.push(item);
  renderUI();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  renderUI();
}

function submitOrder() {
  if (cart.length === 0) {
    console.log('Order submission failed: Cart is empty.');
    return;
  }

  let customerName = nameInput ? nameInput.value().trim() : '';
  let customerEmail = emailInput ? emailInput.value().trim() : '';

  if (!customerName || !customerEmail) {
    console.log('Order submission failed: Missing name or email.');
    return;
  }

  let totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  let orderPayload = {
    customer: {
      name: customerName,
      email: customerEmail
    },
    items: [...cart],
    total: totalPrice,
    pathColors: [...pathColors],
    labelsEnabled: showLabels,
    createdAt: new Date().toISOString()
  };

  console.log('=== ARTBOARD STUDIO ORDER LOGGED ===', orderPayload);

  // Clear cart and customer details after submission
  cart = [];
  if (nameInput) nameInput.value('');
  if (emailInput) emailInput.value('');
  renderUI();
}

function renderUI() {
  let savedName = nameInput ? nameInput.value() : '';
  let savedEmail = emailInput ? emailInput.value() : '';

  controlsDiv.html('');

  if (currentView === 'home') {
    svgContainer.style('height', '368px');

    controlsDiv.style('position', 'absolute');
    controlsDiv.style('top', '384px');
    controlsDiv.style('left', '0');
    controlsDiv.style('width', '708px');
    controlsDiv.style('z-index', '1');
    controlsDiv.style('background', 'transparent');
    controlsDiv.style('backdrop-filter', 'none');
    controlsDiv.style('padding', '0');
    controlsDiv.style('border-radius', '0');
    controlsDiv.style('box-shadow', 'none');

    renderHomeDashboard(savedName, savedEmail);
  } else {
    svgContainer.style('height', '736px');

    controlsDiv.style('position', 'absolute');
    controlsDiv.style('top', '12px');
    controlsDiv.style('left', '12px');
    controlsDiv.style('width', '177px');
    controlsDiv.style('z-index', '10');
    controlsDiv.style('background', 'rgba(44, 62, 80, 0.92)');
    controlsDiv.style('backdrop-filter', 'blur(6px)');
    controlsDiv.style('padding', '10px');
    controlsDiv.style('border-radius', '10px');
    controlsDiv.style('box-shadow', '0 4px 16px rgba(0,0,0,0.25)');

    renderSectionControls(sections[currentView]);
  }
}

// Home Dashboard
function renderHomeDashboard(savedName, savedEmail) {
  let mainContainer = createDiv();
  mainContainer.parent(controlsDiv);
  mainContainer.style('display', 'flex');
  mainContainer.style('flex-direction', 'column');
  mainContainer.style('gap', '12px');

  // 1. Navigation & Randomizer Row
  let topTools = createDiv();
  topTools.parent(mainContainer);
  topTools.style('display', 'flex');
  topTools.style('gap', '8px');
  topTools.style('align-items', 'center');

  let navHeader = createP('Section:');
  navHeader.parent(topTools);
  navHeader.style('font-size', '13px');
  navHeader.style('font-weight', 'bold');
  navHeader.style('color', '#444');
  navHeader.style('margin', '0');

  const sectionKeys = [
    { key: 'left', label: 'Left' },
    { key: 'center', label: 'Center' },
    { key: 'right', label: 'Right' }
  ];

  sectionKeys.forEach(sec => {
    let btn = createButton(sec.label);
    btn.parent(topTools);
    btn.style('padding', '6px 10px');
    btn.style('font-size', '13px');
    btn.style('font-weight', 'bold');
    btn.style('background', '#2C3E50');
    btn.style('color', '#FFFFFF');
    btn.style('border', 'none');
    btn.style('border-radius', '6px');
    btn.style('cursor', 'pointer');
    btn.mousePressed(() => setView(sec.key));
  });

  // Randomize Button
  let randBtn = createButton('🎲 Randomize');
  randBtn.parent(topTools);
  randBtn.style('padding', '6px 10px');
  randBtn.style('font-size', '13px');
  randBtn.style('font-weight', 'bold');
  randBtn.style('background', '#8250DF');
  randBtn.style('color', '#FFFFFF');
  randBtn.style('border', 'none');
  randBtn.style('border-radius', '6px');
  randBtn.style('cursor', 'pointer');
  randBtn.mousePressed(() => randomizeSectionColors());

  // Undo Button
  let undoBtn = createButton('↩ Undo');
  undoBtn.parent(topTools);
  undoBtn.style('padding', '6px 10px');
  undoBtn.style('font-size', '13px');
  undoBtn.style('font-weight', 'bold');
  undoBtn.style('background', colorHistory.length > 0 ? '#34495E' : '#bdc3c7');
  undoBtn.style('color', '#FFFFFF');
  undoBtn.style('border', 'none');
  undoBtn.style('border-radius', '6px');
  undoBtn.style('cursor', colorHistory.length > 0 ? 'pointer' : 'default');
  
  undoBtn.mousePressed(() => {
    if (colorHistory.length > 0) {
      undoColorRandomize();
    }
  });

  // Labels Toggle Button
  let labelToggleBtn = createButton(showLabels ? '🏷️ Labels: ON' : '🏷️ Labels: OFF');
  labelToggleBtn.parent(topTools);
  labelToggleBtn.style('padding', '6px 10px');
  labelToggleBtn.style('font-size', '13px');
  labelToggleBtn.style('font-weight', 'bold');
  labelToggleBtn.style('background', showLabels ? '#298D70' : '#E74C3C');
  labelToggleBtn.style('color', '#FFFFFF');
  labelToggleBtn.style('border', 'none');
  labelToggleBtn.style('border-radius', '6px');
  labelToggleBtn.style('cursor', 'pointer');
  labelToggleBtn.mousePressed(() => toggleLabels());

  // 2. Purchasing & Cart Split Panel
  let shopPanel = createDiv();
  shopPanel.parent(mainContainer);
  shopPanel.style('display', 'flex');
  shopPanel.style('gap', '12px');
  shopPanel.style('background', '#ffffff');
  shopPanel.style('padding', '12px');
  shopPanel.style('border-radius', '10px');
  shopPanel.style('box-shadow', '0 2px 8px rgba(0,0,0,0.06)');

  // Left Column: Purchase Options
  let optionsCol = createDiv();
  optionsCol.parent(shopPanel);
  optionsCol.style('flex', '1.3');
  optionsCol.style('display', 'flex');
  optionsCol.style('flex-direction', 'column');
  optionsCol.style('gap', '6px');

  let storeTitle = createP('Purchase & Commissions');
  storeTitle.parent(optionsCol);
  storeTitle.style('font-size', '14px');
  storeTitle.style('font-weight', 'bold');
  storeTitle.style('color', '#2C3E50');
  storeTitle.style('margin', '0 0 2px 0');

  let pkgRow = createDiv();
  pkgRow.parent(optionsCol);
  pkgRow.style('display', 'flex');
  pkgRow.style('gap', '4px');

  let fullBtn = createButton('Full Design ($12.5k)');
  fullBtn.parent(pkgRow);
  fullBtn.style('flex', '1.2');
  fullBtn.style('padding', '6px 4px');
  fullBtn.style('font-size', '11px');
  fullBtn.style('font-weight', 'bold');
  fullBtn.style('background', '#298D70');
  fullBtn.style('color', '#fff');
  fullBtn.style('border', 'none');
  fullBtn.style('border-radius', '6px');
  fullBtn.style('cursor', 'pointer');
  fullBtn.mousePressed(() => addToCart({ name: 'Full Design (All 3 Sections)', price: 12500 }));

  ['Left', 'Center', 'Right'].forEach(secName => {
    let sBtn = createButton(`${secName} ($5k)`);
    sBtn.parent(pkgRow);
    sBtn.style('flex', '1');
    sBtn.style('padding', '6px 4px');
    sBtn.style('font-size', '11px');
    sBtn.style('font-weight', 'bold');
    sBtn.style('background', '#34495E');
    sBtn.style('color', '#fff');
    sBtn.style('border', 'none');
    sBtn.style('border-radius', '6px');
    sBtn.style('cursor', 'pointer');
    sBtn.mousePressed(() => addToCart({ name: `${secName} Section`, price: 5000 }));
  });

  let piecesHeader = createP('Individual Pieces:');
  piecesHeader.parent(optionsCol);
  piecesHeader.style('font-size', '12px');
  piecesHeader.style('font-weight', 'bold');
  piecesHeader.style('color', '#555');
  piecesHeader.style('margin', '2px 0 0 0');

  let piecesListDiv = createDiv();
  piecesListDiv.parent(optionsCol);
  piecesListDiv.style('max-height', '120px');
  piecesListDiv.style('overflow-y', 'auto');
  piecesListDiv.style('border', '1px solid #e0e0e0');
  piecesListDiv.style('border-radius', '6px');
  piecesListDiv.style('padding', '4px');
  piecesListDiv.style('display', 'flex');
  piecesListDiv.style('flex-direction', 'column');
  piecesListDiv.style('gap', '3px');

  individualPieces.forEach(piece => {
    let pRow = createDiv();
    pRow.parent(piecesListDiv);
    pRow.style('display', 'flex');
    pRow.style('justify-content', 'space-between');
    pRow.style('align-items', 'center');
    pRow.style('background', '#f9f9f9');
    pRow.style('padding', '3px 6px');
    pRow.style('border-radius', '4px');

    let pLabel = createP(`${piece.name} — $${piece.price}`);
    pLabel.parent(pRow);
    pLabel.style('font-size', '11px');
    pLabel.style('margin', '0');
    pLabel.style('color', '#333');

    let addBtn = createButton('+ Add');
    addBtn.parent(pRow);
    addBtn.style('padding', '2px 6px');
    addBtn.style('font-size', '10px');
    addBtn.style('background', '#2C3E50');
    addBtn.style('color', '#fff');
    addBtn.style('border', 'none');
    addBtn.style('border-radius', '4px');
    addBtn.style('cursor', 'pointer');
    addBtn.mousePressed(() => addToCart({ name: piece.name, price: piece.price }));
  });

  // Right Column: Cart & Customer Info
  let cartCol = createDiv();
  cartCol.parent(shopPanel);
  cartCol.style('flex', '1');
  cartCol.style('display', 'flex');
  cartCol.style('flex-direction', 'column');
  cartCol.style('border-left', '1px solid #eee');
  cartCol.style('padding-left', '10px');
  cartCol.style('gap', '4px');

  let cartTitle = createP(`Cart (${cart.length})`);
  cartTitle.parent(cartCol);
  cartTitle.style('font-size', '14px');
  cartTitle.style('font-weight', 'bold');
  cartTitle.style('color', '#2C3E50');
  cartTitle.style('margin', '0 0 2px 0');

  let cartItemsDiv = createDiv();
  cartItemsDiv.parent(cartCol);
  cartItemsDiv.style('display', 'flex');
  cartItemsDiv.style('flex-direction', 'column');
  cartItemsDiv.style('gap', '3px');

  if (cart.length === 0) {
    let emptyMsg = createP('Cart is empty.');
    emptyMsg.parent(cartItemsDiv);
    emptyMsg.style('font-size', '11px');
    emptyMsg.style('color', '#888');
    emptyMsg.style('font-style', 'italic');
    emptyMsg.style('margin', '4px 0');
  } else {
    cart.forEach((item, idx) => {
      let itemRow = createDiv();
      itemRow.parent(cartItemsDiv);
      itemRow.style('display', 'flex');
      itemRow.style('justify-content', 'space-between');
      itemRow.style('align-items', 'center');
      itemRow.style('font-size', '11px');
      itemRow.style('background', '#f4f6f8');
      itemRow.style('padding', '2px 4px');
      itemRow.style('border-radius', '4px');

      let desc = createP(`${item.name} ($${item.price})`);
      desc.parent(itemRow);
      desc.style('margin', '0');
      desc.style('overflow', 'hidden');
      desc.style('text-overflow', 'ellipsis');
      desc.style('white-space', 'nowrap');
      desc.style('max-width', '100px');

      let remBtn = createButton('✕');
      remBtn.parent(itemRow);
      remBtn.style('background', 'none');
      remBtn.style('border', 'none');
      remBtn.style('color', '#FF0019');
      remBtn.style('font-weight', 'bold');
      remBtn.style('cursor', 'pointer');
      remBtn.mousePressed(() => removeFromCart(idx));
    });
  }

  let totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
  
  let totalLabel = createP(`Total: $${totalPrice.toLocaleString()}`);
  totalLabel.parent(cartCol);
  totalLabel.style('font-size', '13px');
  totalLabel.style('font-weight', 'bold');
  totalLabel.style('color', '#2C3E50');
  totalLabel.style('margin', '2px 0');

  // Customer Name & Email Inputs
  nameInput = createInput(savedName);
  nameInput.parent(cartCol);
  nameInput.attribute('placeholder', 'Your Name');
  nameInput.style('width', '100%');
  nameInput.style('padding', '4px');
  nameInput.style('font-size', '11px');
  nameInput.style('border', '1px solid #ccc');
  nameInput.style('border-radius', '4px');

  emailInput = createInput(savedEmail);
  emailInput.parent(cartCol);
  emailInput.attribute('placeholder', 'Your Email Address');
  emailInput.style('width', '100%');
  emailInput.style('padding', '4px');
  emailInput.style('font-size', '11px');
  emailInput.style('border', '1px solid #ccc');
  emailInput.style('border-radius', '4px');

  let submitOrderBtn = createButton('💾 Save Order to Console');
  submitOrderBtn.parent(cartCol);
  submitOrderBtn.style('width', '100%');
  submitOrderBtn.style('padding', '6px');
  submitOrderBtn.style('font-size', '12px');
  submitOrderBtn.style('font-weight', 'bold');
  submitOrderBtn.style('background', '#FFC107');
  submitOrderBtn.style('color', '#333');
  submitOrderBtn.style('border', 'none');
  submitOrderBtn.style('border-radius', '6px');
  submitOrderBtn.style('cursor', 'pointer');
  submitOrderBtn.mousePressed(() => submitOrder());
}

// Zoomed Section Overlay Controls (1/4 Width Top-Left)
function renderSectionControls(sectionConfig) {
  // Navigation & Toggle Header Row
  let navRow = createDiv();
  navRow.parent(controlsDiv);
  navRow.style('display', 'flex');
  navRow.style('gap', '6px');
  navRow.style('margin-bottom', '8px');

  let backBtn = createButton('← Full View');
  backBtn.parent(navRow);
  backBtn.style('flex', '1.2');
  backBtn.style('padding', '6px 4px');
  backBtn.style('font-size', '11px');
  backBtn.style('font-weight', 'bold');
  backBtn.style('background', '#ffffff');
  backBtn.style('color', '#2C3E50');
  backBtn.style('border', 'none');
  backBtn.style('border-radius', '6px');
  backBtn.style('cursor', 'pointer');

  backBtn.mousePressed(() => {
    activePopoverIndex = null;
    setView('home');
  });

  // Labels Toggle Button in Section Menu Bar
  let labelToggleBtn = createButton(showLabels ? '🏷️ Labels' : '🏷️ Hidden');
  labelToggleBtn.parent(navRow);
  labelToggleBtn.style('flex', '1');
  labelToggleBtn.style('padding', '6px 4px');
  labelToggleBtn.style('font-size', '11px');
  labelToggleBtn.style('font-weight', 'bold');
  labelToggleBtn.style('background', showLabels ? '#298D70' : '#E74C3C');
  labelToggleBtn.style('color', '#FFFFFF');
  labelToggleBtn.style('border', 'none');
  labelToggleBtn.style('border-radius', '6px');
  labelToggleBtn.style('cursor', 'pointer');
  labelToggleBtn.mousePressed(() => toggleLabels());

  let title = createP(sectionConfig.title);
  title.parent(controlsDiv);
  title.style('font-size', '12px');
  title.style('font-weight', 'bold');
  title.style('color', '#ECF0F1');
  title.style('margin', '0 0 10px 0');
  title.style('line-height', '1.3');

  for (let pIndex = sectionConfig.start; pIndex < sectionConfig.end; pIndex++) {
    let rowWrapper = createDiv();
    rowWrapper.parent(controlsDiv);
    rowWrapper.style('position', 'relative');
    rowWrapper.style('margin-bottom', '6px');

    let row = createDiv();
    row.parent(rowWrapper);
    row.style('display', 'flex');
    row.style('align-items', 'center');
    row.style('justify-content', 'space-between');
    row.style('background', 'rgba(255, 255, 255, 0.12)');
    row.style('padding', '4px 8px');
    row.style('border-radius', '6px');

    let rowLabel = createP(`P${pIndex + 1}`);
    rowLabel.parent(row);
    rowLabel.style('font-size', '12px');
    rowLabel.style('font-weight', 'bold');
    rowLabel.style('color', '#ffffff');
    rowLabel.style('margin', '0');

    let activeHex = pathColors[pIndex];

    let colorPill = createButton(`
      <span style="display:inline-block; width:14px; height:14px; background-color:${activeHex}; border-radius:50%; border:1px solid rgba(255,255,255,0.8); vertical-align:middle;"></span> ▾
    `);
    colorPill.parent(row);
    colorPill.style('padding', '2px 6px');
    colorPill.style('background', 'rgba(255, 255, 255, 0.2)');
    colorPill.style('border', 'none');
    colorPill.style('border-radius', '12px');
    colorPill.style('color', '#ffffff');
    colorPill.style('cursor', 'pointer');

    let currentIndex = pIndex;
    colorPill.mousePressed((e) => {
      e.stopPropagation();
      activePopoverIndex = (activePopoverIndex === currentIndex) ? null : currentIndex;
      renderUI();
    });

    if (activePopoverIndex === pIndex) {
      let popover = createDiv();
      popover.parent(rowWrapper);
      popover.style('position', 'absolute');
      popover.style('left', '100%');
      popover.style('top', '0');
      popover.style('margin-left', '8px');
      popover.style('z-index', '100');
      popover.style('background', '#ffffff');
      popover.style('padding', '6px');
      popover.style('border-radius', '8px');
      popover.style('box-shadow', '0 4px 14px rgba(0,0,0,0.25)');
      popover.style('display', 'grid');
      popover.style('grid-template-columns', 'repeat(3, 1fr)');
      popover.style('gap', '6px');

      palette.forEach(color => {
        let isSelected = (color.hex === pathColors[pIndex]);
        let swatch = createButton('');
        swatch.parent(popover);
        swatch.size(28, 28);
        swatch.style('background-color', color.hex);
        swatch.style('border', isSelected ? '3px solid #2C3E50' : 'none');
        swatch.style('border-radius', '4px');
        swatch.style('cursor', 'pointer');

        swatch.mousePressed(() => {
          pathColors[pIndex] = color.hex;
          updatePathFills();
          activePopoverIndex = null;
          renderUI();
        });
      });
    }
  }
}

// Adjust SVG ViewBox for 1/3 horizontal slice + shift artwork right by 60 units
function setView(viewKey) {
  currentView = viewKey;

  if (!rawSvg) return;

  if (viewKey === 'home') {
    rawSvg.attribute(
      'viewBox',
      `${originalViewBox.x} ${originalViewBox.y} ${originalViewBox.width} ${originalViewBox.height}`
    );
  } else {
    let sliceWidth = originalViewBox.width / 3;
    let offsetX = originalViewBox.x;

    if (viewKey === 'center') offsetX += sliceWidth;
    if (viewKey === 'right') offsetX += sliceWidth * 2;

    let shiftAdjustment = 60 * (originalViewBox.width / 708);
    offsetX -= shiftAdjustment;

    rawSvg.attribute(
      'viewBox',
      `${offsetX} ${originalViewBox.y} ${sliceWidth} ${originalViewBox.height}`
    );
  }

  renderUI();
}

function draw() {
  background(245);

  fill(44, 62, 80);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(20);
  text('Artboard Studio (24" × 12.5")', 30, 30);
}