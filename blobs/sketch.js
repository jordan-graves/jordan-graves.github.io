let svgContainer;
let pathGroups = [];
let rawSvg;

// View state: 'home', 'left', 'center', 'right'
let currentView = 'home';

// Toggle state for showing/hiding labels (disables the last two paths)
let showLabels = false;

// Artboard Dimensions: 24" x 12.5"
let originalViewBox = { x: 0, y: 0, width: 1584, height: 825 };

// Section configuration fixed to first 15 customizable paths (5 per section)
const sections = {
  left: { title: 'Left Section Colors', start: 0, end: 5 },
  center: { title: 'Center Section Colors', start: 5, end: 10 },
  right: { title: 'Right Section Colors', start: 10, end: 15 }
};

let individualPieces = [];

const palette = [
  { name: 'Lime', hex: '#8dde5d' },
  { name: 'Cyan', hex: '#2f8edd' },
  { name: 'Blue', hex: '#0203d1' },
  { name: 'Black', hex: '#000000' },
  { name: 'Teal', hex: '#298d70' },
  { name: 'Red', hex: '#ff0019' },
  { name: 'Light Blue', hex: '#9ccbf2' }
];

// Array storing current hex fills for the first 15 paths
let pathColors = [];
// History stack for randomizer undo functionality
let colorHistory = [];

// Cart & Pricing Data
let cart = [];

let controlsDiv, shopPanelDiv;
let activePopoverIndex = null; // Track open popover

// Persistent Form input references
let nameInput, emailInput;

async function setup() {
  // Prevent mobile double-tap / gesture zoom
  let mobileFixStyle = document.createElement('style');
  mobileFixStyle.innerHTML = `
    html, body {
      touch-action: manipulation;
      -webkit-text-size-adjust: 100%;
    }
  `;
  document.head.appendChild(mobileFixStyle);

  createCanvas(820, 1350);

  // Outer Wrapper
  let stageWrapper = createDiv();
  stageWrapper.position(30, 40);
  stageWrapper.style('position', 'absolute');
  stageWrapper.style('width', '760px');

  // 1. Container for SVG Graphic
  svgContainer = createDiv();
  svgContainer.parent(stageWrapper);
  svgContainer.style('width', '760px');
  svgContainer.style('height', '397px'); // Base height for home view
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


  pathColors = [palette[3].hex,palette[2].hex,palette[4].hex,palette[1].hex,palette[0].hex,
palette[3].hex,palette[0].hex,palette[5].hex,palette[2].hex,palette[4].hex,
palette[6].hex,palette[5].hex,palette[4].hex,palette[1].hex,palette[2].hex ];

  // Generate individual purchasing items for total paths
  const basePrices = [900, 1200, 1200,1200,1200,900,600,900,1200,1200,600,1200,1200,900,600,900,1200,900,900,1200];
  for (let i = 0; i < 20; i++) {
    individualPieces.push({
      id: i + 1,
      name: `Piece ${String(i + 1)}`,
      price: basePrices[i]
    });
  }

  updatePathFills();

  // 2. Control Panel Container
  controlsDiv = createDiv();
  controlsDiv.parent(stageWrapper);

  // 3. Persistent Shop / Cart Panel Container (Always stays below canvas)
  shopPanelDiv = createDiv();
  shopPanelDiv.parent(stageWrapper);
  shopPanelDiv.style('position', 'absolute');
  shopPanelDiv.style('top', '413px');
  shopPanelDiv.style('left', '0');
  shopPanelDiv.style('width', '760px');

  // Create input fields once globally so they persist across re-renders
  nameInput = createInput('');
  nameInput.attribute('placeholder', 'Your Name');
  nameInput.style('width', '100%');
  nameInput.style('padding', '6px');
  nameInput.style('font-size', '12px');
  nameInput.style('border', '1px solid #ccc');
  nameInput.style('border-radius', '4px');

  emailInput = createInput('');
  emailInput.attribute('placeholder', 'Your Email Address');
  emailInput.style('width', '100%');
  emailInput.style('padding', '6px');
  emailInput.style('font-size', '12px');
  emailInput.style('border', '1px solid #ccc');
  emailInput.style('border-radius', '4px');

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

// Randomizer: randomizes either the active section or all sections if on home view
function randomizeSectionColors() {
  colorHistory.push([...pathColors]);

  let rangesToRand = [];
  if (currentView === 'home') {
    rangesToRand = [[0, 5], [5, 10], [10, 15]];
  } else {
    rangesToRand = [[sections[currentView].start, sections[currentView].end]];
  }

  rangesToRand.forEach(range => {
    let shuffled = [...palette].sort(() => Math.random() - 0.5);
    for (let i = range[0], j = 0; i < range[1]; i++, j++) {
      pathColors[i] = shuffled[j % palette.length].hex;
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

// function submitOrder() {
//   // Force keyboard dismissal immediately on iOS/iPadOS
//   if (nameInput) nameInput.elt.blur();
//   if (emailInput) emailInput.elt.blur();
//   if (document.activeElement) document.activeElement.blur();

//   if (cart.length === 0) {
//     console.log('Order submission failed: Cart is empty.');
//     return;
//   }

//   let customerName = nameInput ? nameInput.value().trim() : '';
//   let customerEmail = emailInput ? emailInput.value().trim() : '';

//   if (!customerName || !customerEmail) {
//     console.log('Order submission failed: Missing name or email.');
//     return;
//   }

//   let totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

//   let orderPayload = {
//     customer: {
//       name: customerName,
//       email: customerEmail
//     },
//     items: [...cart],
//     total: totalPrice,
//     pathColors: [...pathColors],
//     labelsEnabled: showLabels,
//     createdAt: new Date().toISOString()
//   };

//   console.log('=== ARTBOARD STUDIO ORDER LOGGED ===', orderPayload);

//   // Clear cart and customer details
//   cart = [];
//   if (nameInput) nameInput.value('');
//   if (emailInput) emailInput.value('');

//   renderUI();
// }

async function submitOrder() {
  // Force keyboard dismissal immediately on iOS/iPadOS
  if (nameInput) nameInput.elt.blur();
  if (emailInput) emailInput.elt.blur();
  if (document.activeElement) document.activeElement.blur();

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

  try {
    // Push new order to 'orders' node in Firebase Realtime Database
    const newOrderRef = db.ref('orders').push();
    await newOrderRef.set(orderPayload);

    console.log('=== ORDER SAVED TO FIREBASE ===', newOrderRef.key, orderPayload);

    // Clear cart and customer details
    cart = [];
    if (nameInput) nameInput.value('');
    if (emailInput) emailInput.value('');

    renderUI();
  } catch (error) {
    console.error('Firebase order submission failed:', error);
  }
}

function renderUI() {
  controlsDiv.html('');
  shopPanelDiv.html('');

  if (currentView === 'home') {
    svgContainer.style('height', '397px');

    controlsDiv.style('position', 'absolute');
    controlsDiv.style('top', '413px');
    controlsDiv.style('left', '0');
    controlsDiv.style('width', '760px');
    controlsDiv.style('z-index', '1');
    controlsDiv.style('background', 'transparent');
    controlsDiv.style('backdrop-filter', 'none');
    controlsDiv.style('padding', '0');
    controlsDiv.style('border-radius', '0');
    controlsDiv.style('box-shadow', 'none');

    shopPanelDiv.style('top', '505px');

    renderHomeDashboardTools();
  } else {
    svgContainer.style('height', '736px');

    controlsDiv.style('position', 'absolute');
    controlsDiv.style('top', '12px');
    controlsDiv.style('left', '12px');
    controlsDiv.style('width', '222px');
    controlsDiv.style('z-index', '10');
    controlsDiv.style('background', 'rgba(30, 70, 56, 0.94)');
    controlsDiv.style('backdrop-filter', 'blur(6px)');
    controlsDiv.style('padding', '13px');
    controlsDiv.style('border-radius', '12px');
    controlsDiv.style('box-shadow', '0 4px 16px rgba(0,0,0,0.25)');

    shopPanelDiv.style('top', '760px');

    renderSectionControls(sections[currentView]);
  }

  renderShopPanel();
}

// Home Navigation & Tools Toolbar (Two Rows with Spaced Section Buttons)
function renderHomeDashboardTools() {
  let container = createDiv();
  container.parent(controlsDiv);
  container.style('display', 'flex');
  container.style('flex-direction', 'column');
  container.style('gap', '8px');

  // Top Row: Spaced Section View Buttons without 'Section:' label
  let row1 = createDiv();
  row1.parent(container);
  row1.style('display', 'flex');
  row1.style('justify-content', 'space-between');
  row1.style('gap', '8px');
  row1.style('width', '100%');

  const sectionKeys = [
    { key: 'left', label: 'View Left Section' },
    { key: 'center', label: 'View Center Section' },
    { key: 'right', label: 'View Right Section' }
  ];

  sectionKeys.forEach(sec => {
    let btn = createButton(sec.label);
    btn.parent(row1);
    btn.style('flex', '1');
    btn.style('padding', '8px 4px');
    btn.style('font-size', '12px');
    btn.style('font-weight', 'bold');
    btn.style('background', '#1e4638');
    btn.style('color', '#FFFFFF');
    btn.style('border', '1px solid rgba(255,255,255,0.2)');
    btn.style('border-radius', '6px');
    btn.style('cursor', 'pointer');
    btn.style('text-align', 'center');
    btn.mousePressed(() => setView(sec.key));
  });

  // Bottom Row: Action Controls (Randomize, Undo, Labels)
  let row2 = createDiv();
  row2.parent(container);
  row2.style('display', 'flex');
  row2.style('gap', '8px');
  row2.style('align-items', 'center');
  

  let randBtn = createButton('Randomize');
  randBtn.parent(row2);
  randBtn.style('flex', '1');
  randBtn.style('padding', '6px 12px');
  randBtn.style('font-size', '13px');
  randBtn.style('font-weight', 'bold');
  randBtn.style('background', '#298d70');
  randBtn.style('color', '#FFFFFF');
  randBtn.style('border', '1px solid rgba(255,255,255,0.2)');
  randBtn.style('border-radius', '6px');
  randBtn.style('cursor', 'pointer');
  randBtn.mousePressed(() => randomizeSectionColors());


  let undoBtn = createButton('Undo');
  undoBtn.parent(row2);
  undoBtn.style('flex', '1');
  undoBtn.style('padding', '6px 12px');
  undoBtn.style('font-size', '13px');
  undoBtn.style('font-weight', 'bold');
  undoBtn.style('background', colorHistory.length > 0 ? '#356554' : '#1a2f26');
  undoBtn.style('color', '#FFFFFF');
  undoBtn.style('border', '1px solid rgba(255,255,255,0.2)');
  undoBtn.style('border-radius', '6px');
  undoBtn.style('cursor', colorHistory.length > 0 ? 'pointer' : 'default');
  
  undoBtn.mousePressed(() => {
    if (colorHistory.length > 0) {
      undoColorRandomize();
    }
  });

  let labelToggleBtn = createButton(showLabels ? 'Hide Individual Labels' : 'Show Individual Labels');
  labelToggleBtn.parent(row2);
  labelToggleBtn.style('flex', '1');
  labelToggleBtn.style('padding', '6px 12px');
  labelToggleBtn.style('font-size', '13px');
  labelToggleBtn.style('font-weight', 'bold');
  labelToggleBtn.style('background', showLabels ? '#298d70' : '#1e4638');
  labelToggleBtn.style('color', '#FFFFFF');
  labelToggleBtn.style('border', '1px solid rgba(255,255,255,0.2)');
  labelToggleBtn.style('border-radius', '6px');
  labelToggleBtn.style('cursor', 'pointer');
  labelToggleBtn.mousePressed(() => toggleLabels());
}

// Persistent Shopping & Cart Panel
function renderShopPanel() {
  let shopPanel = createDiv();
  shopPanel.parent(shopPanelDiv);
  shopPanel.style('display', 'flex');
  shopPanel.style('gap', '14px');
  shopPanel.style('background', '#ffffff');
  shopPanel.style('padding', '16px');
  shopPanel.style('border-radius', '12px');
  shopPanel.style('box-shadow', '0 2px 10px rgba(0,0,0,0.06)');

  // Left Column: Purchase Options
  let optionsCol = createDiv();
  optionsCol.parent(shopPanel);
  optionsCol.style('flex', '1.3');
  optionsCol.style('display', 'flex');
  optionsCol.style('flex-direction', 'column');
  optionsCol.style('gap', '8px');

  let storeTitle = createP('Purchase Sections w/ 10ft Custom Wallpaper');
  storeTitle.parent(optionsCol);
  storeTitle.style('font-size', '15px');
  storeTitle.style('font-weight', 'bold');
  storeTitle.style('color', '#1e4638');
  storeTitle.style('margin', '0 0 2px 0');

  let pkgRow = createDiv();
  pkgRow.parent(optionsCol);
  pkgRow.style('display', 'flex');
  pkgRow.style('gap', '6px');

  let fullBtn = createButton('Full Design $15,000');
  fullBtn.parent(pkgRow);
  fullBtn.style('flex', '1.2');
  fullBtn.style('padding', '8px 6px');
  fullBtn.style('font-size', '12px');
  fullBtn.style('font-weight', 'bold');
  fullBtn.style('background', '#298d70');
  fullBtn.style('color', '#fff');
  fullBtn.style('border', 'none');
  fullBtn.style('border-radius', '6px');
  fullBtn.style('cursor', 'pointer');
  fullBtn.mousePressed(() => addToCart({ name: 'Full Design (All 3 Sections)', price: 15000 }));

  ['Left', 'Center', 'Right'].forEach(secName => {
    let sBtn = createButton(`${secName} Section $6000`);
    sBtn.parent(pkgRow);
    sBtn.style('flex', '1');
    sBtn.style('padding', '8px 6px');
    sBtn.style('font-size', '12px');
    sBtn.style('font-weight', 'bold');
    sBtn.style('background', '#1e4638');
    sBtn.style('color', '#fff');
    sBtn.style('border', 'none');
    sBtn.style('border-radius', '6px');
    sBtn.style('cursor', 'pointer');
    sBtn.mousePressed(() => addToCart({ name: `${secName} Section`, price: 6000 }));
  });

  let piecesHeader = createP('Purchase Individual Pieces w/ Wallpaper Cut-outs');
  piecesHeader.parent(optionsCol);
  piecesHeader.style('font-size', '13px');
  piecesHeader.style('font-weight', 'bold');
  piecesHeader.style('color', '#444');
  piecesHeader.style('margin', '4px 0 0 0');

  let piecesListDiv = createDiv();
  piecesListDiv.parent(optionsCol);
  piecesListDiv.style('max-height', currentView === 'home' ? '180px' : '120px');
  piecesListDiv.style('overflow-y', 'auto');
  piecesListDiv.style('border', '1px solid #e0e0e0');
  piecesListDiv.style('border-radius', '6px');
  piecesListDiv.style('padding', '6px');
  piecesListDiv.style('display', 'flex');
  piecesListDiv.style('flex-direction', 'column');
  piecesListDiv.style('gap', '4px');

  individualPieces.forEach(piece => {
    let pRow = createDiv();
    pRow.parent(piecesListDiv);
    pRow.style('display', 'flex');
    pRow.style('justify-content', 'space-between');
    pRow.style('align-items', 'center');
    pRow.style('background', '#f9f9f9');
    pRow.style('padding', '4px 8px');
    pRow.style('border-radius', '4px');

    let pLabel = createP(`${piece.name} — $${piece.price}`);
    pLabel.parent(pRow);
    pLabel.style('font-size', '12px');
    pLabel.style('margin', '0');
    pLabel.style('color', '#333');

    let addBtn = createButton('+ Add');
    addBtn.parent(pRow);
    addBtn.style('padding', '3px 8px');
    addBtn.style('font-size', '11px');
    addBtn.style('background', '#1e4638');
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
  cartCol.style('padding-left', '14px');
  cartCol.style('gap', '6px');

  let cartTitle = createP(`Cart (${cart.length})`);
  cartTitle.parent(cartCol);
  cartTitle.style('font-size', '15px');
  cartTitle.style('font-weight', 'bold');
  cartTitle.style('color', '#1e4638');
  cartTitle.style('margin', '0 0 2px 0');

  let cartItemsDiv = createDiv();
  cartItemsDiv.parent(cartCol);
  cartItemsDiv.style('display', 'flex');
  cartItemsDiv.style('flex-direction', 'column');
  cartItemsDiv.style('gap', '4px');
  cartItemsDiv.style('max-height', '110px');
  cartItemsDiv.style('overflow-y', 'auto');

  if (cart.length === 0) {
    let emptyMsg = createP('Cart is empty.');
    emptyMsg.parent(cartItemsDiv);
    emptyMsg.style('font-size', '12px');
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
      itemRow.style('font-size', '12px');
      itemRow.style('background', '#f4f6f8');
      itemRow.style('padding', '3px 6px');
      itemRow.style('border-radius', '4px');

      let desc = createP(`${item.name} ($${item.price})`);
      desc.parent(itemRow);
      desc.style('margin', '0');
      desc.style('flex', '1');
      desc.style('padding-right', '6px');
      desc.style('color', '#333333');
      desc.style('font-size', '12px');

      let remBtn = createButton('✕');
      remBtn.parent(itemRow);
      remBtn.style('background', 'none');
      remBtn.style('border', 'none');
      remBtn.style('color', '#298d70');
      remBtn.style('font-weight', 'bold');
      remBtn.style('cursor', 'pointer');
      remBtn.mousePressed(() => removeFromCart(idx));
    });
  }

  let totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
  
  let totalLabel = createP(`Total: $${totalPrice.toLocaleString()}`);
  totalLabel.parent(cartCol);
  totalLabel.style('font-size', '14px');
  totalLabel.style('font-weight', 'bold');
  totalLabel.style('color', '#1e4638');
  totalLabel.style('margin', '2px 0');

  // Re-attach persistent input elements to avoid DOM recreation bugs on mobile
  nameInput.parent(cartCol);
  emailInput.parent(cartCol);

  let submitOrderBtn = createButton('Submit Request for Commission');
  submitOrderBtn.parent(cartCol);
  submitOrderBtn.style('width', '100%');
  submitOrderBtn.style('padding', '8px');
  submitOrderBtn.style('font-size', '13px');
  submitOrderBtn.style('font-weight', 'bold');
  submitOrderBtn.style('background', '#298d70');
  submitOrderBtn.style('color', '#ffffff');
  submitOrderBtn.style('border', 'none');
  submitOrderBtn.style('border-radius', '6px');
  submitOrderBtn.style('cursor', 'pointer');
  submitOrderBtn.mousePressed(() => submitOrder());
}

// Zoomed Section Overlay Controls
function renderSectionControls(sectionConfig) {
  let navRow = createDiv();
  navRow.parent(controlsDiv);
  navRow.style('display', 'flex');
  navRow.style('gap', '5px');
  navRow.style('margin-bottom', '8px');

  let fullBtn = createButton('Home');
  fullBtn.parent(navRow);
  fullBtn.style('flex', '1.2');
  fullBtn.style('padding', '6px 4px');
  fullBtn.style('font-size', '12px');
  fullBtn.style('font-weight', 'bold');
  fullBtn.style('background', '#ffffff');
  fullBtn.style('color', '#1e4638');
  fullBtn.style('border', 'none');
  fullBtn.style('border-radius', '6px');
  fullBtn.style('cursor', 'pointer');
  fullBtn.mousePressed(() => {
    activePopoverIndex = null;
    setView('home');
  });

  const switchTargets = [
    { key: 'left', label: 'Left' },
    { key: 'center', label: 'Center' },
    { key: 'right', label: 'Right' }
  ];

  switchTargets.forEach(t => {
    let tBtn = createButton(t.label);
    tBtn.parent(navRow);
    tBtn.style('width', '55px');
    tBtn.style('padding', '6px 0');
    tBtn.style('font-size', '12px');
    tBtn.style('font-weight', 'bold');
    tBtn.style('background', currentView === t.key ? '#298d70' : '#1e4638');
    tBtn.style('color', '#FFFFFF');
    tBtn.style('border', 'rgba(255, 255, 255, 0.2) solid 1px');
    tBtn.style('border-radius', '6px');
    tBtn.style('cursor', 'pointer');
    tBtn.mousePressed(() => {
      activePopoverIndex = null;
      setView(t.key);
    });
  });

  let randBtn = createButton('Randomize Section');
  randBtn.parent(controlsDiv);
  randBtn.style('width', '100%');
  randBtn.style('padding', '7px 5px');
  randBtn.style('margin-bottom', '6px');
  randBtn.style('font-size', '12px');
  randBtn.style('font-weight', 'bold');
  randBtn.style('background', '#298d70');
  randBtn.style('color', '#FFFFFF');
  randBtn.style('border', 'rgba(255, 255, 255, 0.2) solid 1px');
  randBtn.style('border-radius', '6px');
  randBtn.style('cursor', 'pointer');
  randBtn.mousePressed(() => randomizeSectionColors());

  let undoBtn = createButton('Undo');
  undoBtn.parent(controlsDiv);
  undoBtn.style('width', '100%');
  undoBtn.style('padding', '7px 5px');
  undoBtn.style('margin-bottom', '6px');
  undoBtn.style('font-size', '12px');
  undoBtn.style('font-weight', 'bold');
  undoBtn.style('background', colorHistory.length > 0 ? '#356554' : '#1a2f26');
  undoBtn.style('color', '#FFFFFF');
  undoBtn.style('border', 'rgba(255, 255, 255, 0.2) solid 1px');
  undoBtn.style('border-radius', '6px');
  undoBtn.style('cursor', colorHistory.length > 0 ? 'pointer' : 'default');
  if (colorHistory.length > 0) {
    undoBtn.mousePressed(() => undoColorRandomize());
  }

  let labelToggleBtn = createButton(showLabels ? 'Hide Individual Labels' : 'Show Individual Labels');
  labelToggleBtn.parent(controlsDiv);
  labelToggleBtn.style('width', '100%');
  labelToggleBtn.style('padding', '7px 5px');
  labelToggleBtn.style('margin-bottom', '10px');
  labelToggleBtn.style('font-size', '12px');
  labelToggleBtn.style('font-weight', 'bold');
  labelToggleBtn.style('background', showLabels ? '#298d70' : '#1e4638');
  labelToggleBtn.style('color', '#FFFFFF');
  labelToggleBtn.style('border', 'rgba(255, 255, 255, 0.2) solid 1px');
  labelToggleBtn.style('border-radius', '6px');
  labelToggleBtn.style('cursor', 'pointer');
  labelToggleBtn.mousePressed(() => toggleLabels());

  let title = createP(sectionConfig.title);
  title.parent(controlsDiv);
  title.style('font-size', '13px');
  title.style('font-weight', 'bold');
  title.style('color', '#ffffff');
  title.style('margin', '0 0 10px 0');
  title.style('line-height', '1.3');

  let l = ["Background Color","Blob Color 1","Blob Color 2","Stripe Color 1","Stripe Color 2"]
  for (let pIndex = sectionConfig.start; pIndex < sectionConfig.end; pIndex++) {
    let rowWrapper = createDiv();
    rowWrapper.parent(controlsDiv);
    rowWrapper.style('position', 'relative');
    rowWrapper.style('margin-bottom', '8px');

    let row = createDiv();
    row.parent(rowWrapper);
    row.style('display', 'flex');
    row.style('align-items', 'center');
    row.style('justify-content', 'space-between');
    row.style('background', 'rgba(255, 255, 255, 0.12)');
    row.style('padding', '5px 10px');
    row.style('border-radius', '6px');

    let rowLabel = createP(l[pIndex%5]);
    rowLabel.parent(row);
    rowLabel.style('font-size', '13px');
    rowLabel.style('font-weight', 'bold');
    rowLabel.style('color', '#ffffff');
    rowLabel.style('margin', '0');

    let activeHex = pathColors[pIndex];

    let colorPill = createButton(`
      <span style="display:inline-block; width:16px; height:16px; background-color:${activeHex}; border-radius:50%; border:1px solid rgba(255,255,255,0.8); vertical-align:middle;"></span> ▾
    `);
    colorPill.parent(row);
    colorPill.style('padding', '3px 8px');
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
      popover.style('margin-left', '10px');
      popover.style('z-index', '100');
      popover.style('background', '#ffffff');
      popover.style('padding', '8px');
      popover.style('border-radius', '8px');
      popover.style('box-shadow', '0 4px 14px rgba(0,0,0,0.25)');
      popover.style('display', 'grid');
      popover.style('grid-template-columns', 'repeat(3, 1fr)');
      popover.style('gap', '6px');

      palette.forEach(color => {
        let isSelected = (color.hex === pathColors[pIndex]);
        let swatch = createButton('');
        swatch.parent(popover);
        swatch.size(32, 32);
        swatch.style('background-color', color.hex);
        swatch.style('border', isSelected ? '3px solid #1e4638' : 'none');
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

// Adjust SVG ViewBox with +20px right shift adjustment
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

    let shiftAdjustment = (60 + 20) * (originalViewBox.width / 760);
    offsetX -= shiftAdjustment;

    rawSvg.attribute(
      'viewBox',
      `${offsetX} ${originalViewBox.y} ${sliceWidth} ${originalViewBox.height}`
    );
  }

  renderUI();
}

function draw() {
  background('#1e4638');
}