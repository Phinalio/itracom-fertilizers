// Mobile Navigation Toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', function () {
    navLinks.classList.toggle('active');
  });

  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('active');
    });
  });
}

// Product Category Filter Buttons
const filterButtons = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    const selectedFilter = button.getAttribute('data-filter');

    filterButtons.forEach(function (btn) {
      btn.classList.remove('active');
    });
    button.classList.add('active');

    productCards.forEach(function (card) {
      const cardCategory = card.getAttribute('data-category');
      if (selectedFilter === 'all' || cardCategory === selectedFilter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// 50 kg Bag & Metric Tonnage Estimator
const calcCrop = document.getElementById('calcCrop');
const calcAcres = document.getElementById('calcAcres');
const calcProduct = document.getElementById('calcProduct');
const calcOutput = document.getElementById('calcOutput');
const useEstimateBtn = document.getElementById('useEstimateBtn');

function updateBagEstimate() {
  if (!calcCrop || !calcAcres || !calcOutput) return;

  const kgPerAcre = parseFloat(calcCrop.value) || 100;
  const acres = Math.max(0.5, parseFloat(calcAcres.value) || 0.5);
  const totalKg = kgPerAcre * acres;
  const bags50kg = Math.ceil(totalKg / 50);
  const metricTons = (bags50kg * 50) / 1000;

  calcOutput.textContent = `${bags50kg} Bags (50 kg each) • ${metricTons.toFixed(2)} Metric Tons`;
}

if (calcCrop && calcAcres) {
  calcCrop.addEventListener('change', updateBagEstimate);
  calcAcres.addEventListener('input', updateBagEstimate);
  updateBagEstimate();
}

if (useEstimateBtn) {
  useEstimateBtn.addEventListener('click', function () {
    const productSelect = document.getElementById('productSelect');
    const messageField = document.getElementById('message');

    if (productSelect && calcProduct) {
      productSelect.value = calcProduct.value;
    }

    if (messageField && calcOutput && calcAcres) {
      const acresValue = Math.max(0.5, parseFloat(calcAcres.value) || 0.5);
      const chosenProduct = calcProduct ? calcProduct.value : 'FOMI Fertilizer';
      messageField.value = `Inquiry for ${chosenProduct} covering ${acresValue} acres — Estimated requirement: ${calcOutput.textContent}.`;
    }

    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  });
}

// Bulk Order & Distributor Inquiry Form
const inquiryForm = document.getElementById('inquiryForm');
const formStatus = document.getElementById('form-status');

if (inquiryForm && formStatus) {
  inquiryForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const fullName = document.getElementById('fullName').value.trim();
    const phoneOrEmail = document.getElementById('phoneOrEmail').value.trim();
    const region = document.getElementById('region').value.trim();
    const product = document.getElementById('productSelect').value;
    const message = document.getElementById('message').value.trim();

    if (!fullName || !phoneOrEmail || !region || !message) {
      formStatus.textContent = 'Please complete all required fields before submitting.';
      formStatus.className = 'form-status error';
      return;
    }

    formStatus.textContent = `Thank you, ${fullName}. Your inquiry for ${product} (${region}) has been recorded for our commercial team.`;
    formStatus.className = 'form-status success';
    inquiryForm.reset();
    updateBagEstimate();
  });
}

// Product Specification Modal
const fomiDetails = {
  'FOMI Otesha': {
    tag: 'Basal Planting',
    formula: 'NPK + Organic Matter + CaO + MgO',
    desc: 'Formulated for planting to stimulate vigorous root development, early nutrient availability, and strong seedling establishment.',
    crops: 'Maize, Sorghum, Beans, Sunflower, Irish Potatoes, Vegetables',
    rate: '100 – 150 kg per acre (2 to 3 bags) applied at planting'
  },
  'FOMI Kuzia': {
    tag: 'Vegetative Growth',
    formula: 'High Nitrogen + Organic Base',
    desc: 'Supplies readily available nitrogen paired with organic carbon to drive rapid canopy growth and deep green leaf chlorophyll.',
    crops: 'Maize, Paddy Rice, Leafy Vegetables, Sugarcane',
    rate: '100 – 150 kg per acre (2 to 3 bags) at 3–4 weeks after emergence'
  },
  'FOMI Nenepesha': {
    tag: 'Fruiting & Grain Fill',
    formula: 'Potassium-Enriched Organic-Mineral',
    desc: 'Promotes flowering, grain weight, fruit sweetness, and improved shelf life during reproductive growth.',
    crops: 'Cereals, Tomatoes, Onions, Bananas, Horticulture',
    rate: '100 – 150 kg per acre (2 to 3 bags) at flowering / booting stage'
  },
  'FOMI Imarisha': {
    tag: 'Soil Conditioning',
    formula: 'Calcium + Magnesium + Humic Organic',
    desc: 'Corrects soil acidity, restores beneficial soil microbes, and improves water retention in tired or acidic soils.',
    crops: 'All arable crops on acidic or depleted soils',
    rate: '150 – 250 kg per acre incorporated before or at planting'
  },
  'FOMI T-Blend': {
    tag: 'Specialty & Tea',
    formula: 'Custom NPK + Sulfur + Organic Base',
    desc: 'Balanced organic-mineral nutrition engineered for sustained tea leaf plucking cycles and bush vitality.',
    crops: 'Tea Estates & Outgrower Plantations',
    rate: '150 – 200 kg per acre split across rainy seasons'
  },
  'FOMI Green Cocoa': {
    tag: 'Cash & Tree Crops',
    formula: 'Potassium + Boron + Zinc + Organic',
    desc: 'Micronutrient-fortified formulation supporting healthy flowering, pod retention, and dense cocoa bean development.',
    crops: 'Cocoa, Coffee, Cashew, Avocado, Fruit Orchards',
    rate: '150 kg per acre applied around the tree drip line'
  }
};

const modal = document.getElementById('productModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const modalQuoteBtn = document.getElementById('modalQuoteBtn');
let activeModalProduct = '';

function openProductModal() {
  if (!modal) return;
  modal.setAttribute('aria-hidden', 'false');
  modal.classList.add('open');
}

function closeProductModal() {
  if (!modal) return;
  if (document.activeElement && modal.contains(document.activeElement)) {
    document.activeElement.blur();
  }
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}

document.querySelectorAll('.product-card').forEach(function (card) {
  card.addEventListener('click', function () {
    const title = card.querySelector('h3').textContent.trim();
    const info = fomiDetails[title];
    if (!info || !modal) return;

    activeModalProduct = title;
    document.getElementById('modalTag').textContent = info.tag;
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalFormula').textContent = info.formula;
    document.getElementById('modalDesc').textContent = info.desc;
    document.getElementById('modalCrops').textContent = info.crops;
    document.getElementById('modalRate').textContent = info.rate;

    openProductModal();
  });
});

if (closeModalBtn && modal) {
  closeModalBtn.addEventListener('click', function () {
    closeProductModal();
  });

  modal.addEventListener('click', function (event) {
    if (event.target === modal) {
      closeProductModal();
    }
  });
}

if (modalQuoteBtn && modal) {
  modalQuoteBtn.addEventListener('click', function () {
    closeProductModal();
    const productSelect = document.getElementById('productSelect');
    if (productSelect && activeModalProduct) {
      productSelect.value = activeModalProduct;
    }
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  });
}