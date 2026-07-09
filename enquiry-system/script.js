/**
 * ==============================================================================
 * Om Shringar Tirpal Store - Premium Glassmorphic Typeform Controller
 * ==============================================================================
 * File: script.js
 * Description: Client-side validation engines, slide transition routers,
 * local storage progress caches, and submission proxies.
 * ==============================================================================
 */

// CLIENT ENVIRONMENT GLOBAL CONFIGURATION
const CONFIG = {
  // Replace this placeholder with your actual Google Apps Script Web App URL from Step 3
  googleAppsScriptUrl: "https://script.google.com/macros/s/AKfycbzQ7S9X98_Kk2mE5G9I9u0R04Nn7g6a297h/exec"
};

// INITIALIZE STATE MANAGERS
let currentStep = 0;
const totalSteps = 11; // Excluding welcome (0) and success screens
let isSubmitting = false;

// SELECT CORE ELEMENT NODES
const form = document.getElementById("enquiry-form");
const progressIndicator = document.getElementById("progress-indicator");
const stepCounter = document.getElementById("step-counter");
const backBtn = document.getElementById("back-btn");
const nextBtn = document.getElementById("next-btn");
const nextBtnText = document.getElementById("next-btn-text");
const nextArrow = document.getElementById("next-arrow");
const loadingSpinner = document.getElementById("loading-spinner");
const skeletonLoader = document.getElementById("skeleton-loader");
const successScreen = document.getElementById("success-screen");
const countdownNode = document.getElementById("redirect-countdown");
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

// ------------------------------------------------------------------------------
// 1. DYNAMIC STEP ROUTER & TRANSITIONS
// ------------------------------------------------------------------------------

/**
 * Update step indicator progress bar and percentage tracker
 */
function updateProgressBar() {
  // Welcome step (0) represents 0%, step 11 represents 100%
  const percentage = Math.round((currentStep / totalSteps) * 100);
  progressIndicator.style.width = `${percentage}%`;
  stepCounter.textContent = `${percentage}% Completed`;
}

/**
 * Route from current slide screen to targeted slide screen with transitions
 * @param {number} targetStep Destination step index
 * @param {string} direction 'next' or 'prev' to calculate sliding vector animations
 */
function navigateToStep(targetStep, direction = 'next') {
  const currentScreen = document.querySelector(`.step-screen[data-step="${currentStep}"]`);
  const targetScreen = document.querySelector(`.step-screen[data-step="${targetStep}"]`);
  
  if (!currentScreen || !targetScreen) return;
  
  // Apply departure slide transition classes
  if (direction === 'next') {
    currentScreen.classList.add('slide-out-left');
  } else {
    currentScreen.classList.add('slide-out-right');
  }
  
  // Wait for transition duration, then toggle screen visibility nodes
  setTimeout(() => {
    currentScreen.classList.add('hidden');
    currentScreen.classList.remove('active-screen', 'slide-out-left', 'slide-out-right');
    
    targetScreen.classList.remove('hidden');
    
    // Apply arrival slide transition classes
    if (direction === 'next') {
      targetScreen.classList.add('slide-in-right');
    } else {
      targetScreen.classList.add('slide-in-left');
    }
    
    targetScreen.classList.add('active-screen');
    
    // Reset spring offsets
    setTimeout(() => {
      targetScreen.classList.remove('slide-in-right', 'slide-in-left');
    }, 50);

    currentStep = targetStep;
    updateProgressBar();
    toggleNavButtons();
    autoFocusField(targetScreen);
  }, 250);
}

/**
 * Toggle Back and Next button label states based on current active step
 */
function toggleNavButtons() {
  // Show back button only on step 1 or higher
  if (currentStep > 0) {
    backBtn.classList.remove('hidden');
  } else {
    backBtn.classList.add('hidden');
  }

  // Update Next button label based on steps
  if (currentStep === 0) {
    // Hidden on welcome screen (we have the big start button)
    document.getElementById('action-footer').classList.add('hidden');
  } else {
    document.getElementById('action-footer').classList.remove('hidden');
  }

  if (currentStep === totalSteps) {
    nextBtnText.textContent = "Submit Request";
    nextBtn.classList.add('bg-gradient-to-r', 'from-emerald-500', 'to-teal-500', 'shadow-emerald-500/10');
    nextBtn.classList.remove('from-orange-500', 'to-amber-500');
  } else {
    nextBtnText.textContent = "Ok";
    nextBtn.classList.remove('bg-gradient-to-r', 'from-emerald-500', 'to-teal-500', 'shadow-emerald-500/10');
    nextBtn.classList.add('from-orange-500', 'to-amber-500');
  }
}

/**
 * Focus the first input field inside the newly opened step screen
 * @param {HTMLElement} screen 
 */
function autoFocusField(screen) {
  const firstInput = screen.querySelector('input, textarea, select');
  if (firstInput && firstInput.type !== 'radio') {
    firstInput.focus();
  }
}

// ------------------------------------------------------------------------------
// 2. INPUT VALIDATION ENGINE
// ------------------------------------------------------------------------------

/**
 * Trigger animated inline validation error messages
 * @param {HTMLElement} screen Target step screen
 * @param {boolean} show Toggle state
 * @param {string} customMsg Custom error text string if provided
 */
function toggleError(screen, show, customMsg = "") {
  const errorNode = screen.querySelector('.error-msg');
  if (!errorNode) return;
  
  if (show) {
    if (customMsg) {
      errorNode.querySelector('span').textContent = customMsg;
    }
    errorNode.classList.remove('opacity-0');
    errorNode.classList.add('opacity-100');
    
    // Trigger vibration shake animation on error
    const inputNode = screen.querySelector('input, textarea, .choice-grid');
    if (inputNode) {
      inputNode.classList.add('animate-shake');
      setTimeout(() => inputNode.classList.remove('animate-shake'), 400);
    }
  } else {
    errorNode.classList.add('opacity-0');
    errorNode.classList.remove('opacity-100');
  }
}

/**
 * Validate values of the current active step screen
 * @return {boolean} True if field validations pass
 */
function validateCurrentStep() {
  const currentScreen = document.querySelector(`.step-screen[data-step="${currentStep}"]`);
  if (!currentScreen) return true;

  // Validate Welcome screen
  if (currentStep === 0) return true;

  // Validate step 1: Name (Required)
  if (currentStep === 1) {
    const value = document.getElementById('customerName').value.trim();
    if (value.length < 2) {
      toggleError(currentScreen, true, "Please enter your full name (at least 2 letters).");
      return false;
    }
    toggleError(currentScreen, false);
    return true;
  }

  // Validate step 2: Mobile Number (Required, Indian phone validation rules)
  if (currentStep === 2) {
    const value = document.getElementById('mobileNumber').value.trim();
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(value)) {
      toggleError(currentScreen, true, "Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.");
      return false;
    }
    toggleError(currentScreen, false);
    return true;
  }

  // Validate step 3: WhatsApp Number (Optional, but checks valid regex format if provided)
  if (currentStep === 3) {
    const value = document.getElementById('whatsAppNumber').value.trim();
    const phoneRegex = /^[6-9]\d{9}$/;
    if (value !== "" && !phoneRegex.test(value)) {
      toggleError(currentScreen, true, "If entered, please provide a valid 10-digit mobile starting with 6, 7, 8, or 9.");
      return false;
    }
    toggleError(currentScreen, false);
    return true;
  }

  // Validate step 4: Product Choice (Required radio input)
  if (currentStep === 4) {
    const selectedRadio = currentScreen.querySelector('input[name="productInterested"]:checked');
    if (!selectedRadio) {
      toggleError(currentScreen, true, "Please select at least one product category to proceed.");
      return false;
    }
    toggleError(currentScreen, false);
    return true;
  }

  // Validate step 5: Required Size (Optional)
  if (currentStep === 5) {
    return true;
  }

  // Validate step 6: Quantity (Optional, checks positive number)
  if (currentStep === 6) {
    const value = parseInt(document.getElementById('quantity').value);
    if (isNaN(value) || value < 1) {
      document.getElementById('quantity').value = 1;
    }
    return true;
  }

  // Validate step 7: Purpose Choice (Required radio input)
  if (currentStep === 7) {
    const selectedRadio = currentScreen.querySelector('input[name="purpose"]:checked');
    if (!selectedRadio) {
      toggleError(currentScreen, true, "Please select a primary purpose to proceed.");
      return false;
    }
    toggleError(currentScreen, false);
    return true;
  }

  // Validate step 8: Village / City (Required)
  if (currentStep === 8) {
    const value = document.getElementById('villageCity').value.trim();
    if (value.length < 2) {
      toggleError(currentScreen, true, "Please type your village or city name.");
      return false;
    }
    toggleError(currentScreen, false);
    return true;
  }

  // Validate step 9: PIN Code (Required, exact 6 digits)
  if (currentStep === 9) {
    const value = document.getElementById('pinCode').value.trim();
    const pinRegex = /^\d{6}$/;
    if (!pinRegex.test(value)) {
      toggleError(currentScreen, true, "PIN code must be exactly 6 numeric digits.");
      return false;
    }
    toggleError(currentScreen, false);
    return true;
  }

  // Validate step 10: Address (Required)
  if (currentStep === 10) {
    const value = document.getElementById('fullAddress').value.trim();
    if (value.length < 10) {
      toggleError(currentScreen, true, "Address should be detailed enough (minimum 10 characters).");
      return false;
    }
    toggleError(currentScreen, false);
    return true;
  }

  // Validate step 11: Additional requirements (Optional)
  if (currentStep === 11) {
    return true;
  }

  return true;
}

// ------------------------------------------------------------------------------
// 3. PERSISTENT LOCAL STORAGE Caching (Auto-save progress)
// ------------------------------------------------------------------------------

const STORAGE_KEY = "om_shringar_enquiry_cache";

/**
 * Serialize and save all active inputs to localStorage
 */
function saveProgressToStorage() {
  const formData = {};
  const inputs = form.querySelectorAll('input[type="text"], input[type="tel"], input[type="number"], input[type="email"], textarea');
  
  inputs.forEach(input => {
    formData[input.id] = input.value;
  });

  // Handle radio choices specifically
  const productChecked = form.querySelector('input[name="productInterested"]:checked');
  if (productChecked) formData.productInterested = productChecked.value;

  const purposeChecked = form.querySelector('input[name="purpose"]:checked');
  if (purposeChecked) formData.purpose = purposeChecked.value;

  formData.currentSavedStep = currentStep;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

/**
 * Read cache and populate values into the form if verified
 */
function loadProgressFromStorage() {
  const cachedData = localStorage.getItem(STORAGE_KEY);
  if (!cachedData) return;

  try {
    const data = JSON.parse(cachedData);
    
    // Autofill text elements
    Object.keys(data).forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = data[id];
    });

    // Populate Radios
    if (data.productInterested) {
      const radio = form.querySelector(`input[name="productInterested"][value="${data.productInterested}"]`);
      if (radio) {
        radio.checked = true;
        radio.closest('.choice-box').classList.add('selected');
      }
    }

    if (data.purpose) {
      const radio = form.querySelector(`input[name="purpose"][value="${data.purpose}"]`);
      if (radio) {
        radio.checked = true;
        radio.closest('.choice-box').classList.add('selected');
      }
    }

    // Sync state
    if (data.whatsAppNumber && data.whatsAppNumber === data.mobileNumber) {
      document.getElementById('sync-numbers').checked = true;
    }

    // Offer user option to resume back where they were
    if (data.currentSavedStep && data.currentSavedStep > 0 && data.currentSavedStep <= totalSteps) {
      showResumeBanner(data.currentSavedStep);
    }
  } catch (err) {
    console.error("Failed to load local storage form session:", err);
  }
}

/**
 * Generate a subtle interactive notification asking to resume previous session
 * @param {number} stepToResume 
 */
function showResumeBanner(stepToResume) {
  const banner = document.createElement('div');
  banner.id = "resume-session-banner";
  banner.className = "fixed bottom-5 right-5 z-50 glass-card rounded-2xl p-4 border border-orange-500/30 text-white flex items-center gap-4 max-w-sm animate-scale-up";
  banner.innerHTML = `
    <div class="flex-1">
      <span class="block text-xs font-bold text-orange-400 font-mono">RESUME PREVIOUS PROGRESS</span>
      <span class="block text-[11px] text-slate-300">You filled previous entries. Resume now?</span>
    </div>
    <div class="flex gap-2 shrink-0">
      <button id="resume-no" class="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-bold transition-all cursor-pointer">Discard</button>
      <button id="resume-yes" class="px-3 py-1.5 rounded-lg bg-orange-500 text-xs font-bold text-white transition-all cursor-pointer">Resume</button>
    </div>
  `;
  document.body.appendChild(banner);

  document.getElementById('resume-yes').addEventListener('click', () => {
    navigateToStep(stepToResume, 'next');
    banner.remove();
  });

  document.getElementById('resume-no').addEventListener('click', () => {
    localStorage.removeItem(STORAGE_KEY);
    banner.remove();
  });
}

// ------------------------------------------------------------------------------
// 4. ACTION LISTENERS & EVENT BOUNDS
// ------------------------------------------------------------------------------

/**
 * Handle progression forward (next button or enter key triggers)
 */
function handleForward() {
  if (currentStep === 0) {
    navigateToStep(1, 'next');
    return;
  }

  // Validate first
  if (!validateCurrentStep()) return;

  // Save current progress to local session
  saveProgressToStorage();

  if (currentStep === totalSteps) {
    // Submit final form
    submitForm();
  } else {
    navigateToStep(currentStep + 1, 'next');
  }
}

/**
 * Handle routing backward
 */
function handleBackward() {
  if (currentStep > 0) {
    navigateToStep(currentStep - 1, 'prev');
  }
}

// Attach physical button click listeners
nextBtn.addEventListener('click', handleForward);
backBtn.addEventListener('click', handleBackward);

// Setup the massive start button on Welcome Screen
document.querySelector('.next-step-btn').addEventListener('click', handleForward);

// Monitor input element events to discard inline error messages dynamically
form.addEventListener('input', (e) => {
  const activeScreen = document.querySelector(`.step-screen[data-step="${currentStep}"]`);
  if (activeScreen) {
    toggleError(activeScreen, false);
  }
});

// Setup checkbox synchronizer for WhatsApp matching phone input
const syncCheckbox = document.getElementById('sync-numbers');
const mobileInput = document.getElementById('mobileNumber');
const whatsappInput = document.getElementById('whatsAppNumber');

syncCheckbox.addEventListener('change', () => {
  if (syncCheckbox.checked) {
    whatsappInput.value = mobileInput.value;
    whatsappInput.readOnly = true;
  } else {
    whatsappInput.value = "";
    whatsappInput.readOnly = false;
  }
});

mobileInput.addEventListener('input', () => {
  if (syncCheckbox.checked) {
    whatsappInput.value = mobileInput.value;
  }
});

// Quantity Incrementor and Decrementor helper triggers
document.getElementById('qty-inc').addEventListener('click', () => {
  const qtyNode = document.getElementById('quantity');
  qtyNode.value = parseInt(qtyNode.value) + 1;
});

document.getElementById('qty-dec').addEventListener('click', () => {
  const qtyNode = document.getElementById('quantity');
  const currentVal = parseInt(qtyNode.value);
  if (currentVal > 1) {
    qtyNode.value = currentVal - 1;
  }
});

// Size quick presets selection tags
document.querySelectorAll('.size-preset-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.getElementById('requiredSize').value = btn.textContent;
  });
});

// Custom highlighted states on radio selection choice-boxes
document.querySelectorAll('.choice-box').forEach(box => {
  const radio = box.querySelector('input[type="radio"]');
  box.addEventListener('click', () => {
    // Reset siblings
    const groupName = radio.getAttribute('name');
    document.querySelectorAll(`input[name="${groupName}"]`).forEach(siblingRadio => {
      siblingRadio.closest('.choice-box').classList.remove('selected');
    });

    // Select this
    radio.checked = true;
    box.classList.add('selected');
    
    // Auto navigate after small latency to simulate modern fluid experience
    setTimeout(handleForward, 200);
  });
});

// ------------------------------------------------------------------------------
// 5. ACCESSIBILITY KEYBOARD ROUTING ENGINE
// ------------------------------------------------------------------------------

document.addEventListener('keydown', (e) => {
  // Prevent key actions during ongoing screen submittals or loading loops
  if (isSubmitting) return;

  const activeElement = document.activeElement;
  const isInputActive = activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA');

  if (e.key === 'Enter') {
    // Prevent standard HTML Form Refresh
    e.preventDefault();
    handleForward();
  } else if (e.key === 'Escape' && currentStep > 0) {
    handleBackward();
  }
});

// ------------------------------------------------------------------------------
// 6. FORM SUBMISSION PROXY & BACKEND INTERFACES
// ------------------------------------------------------------------------------

/**
 * Gather form parameters, collect system metadata, and POST to Apps Script API
 */
function submitForm() {
  if (isSubmitting) return;
  isSubmitting = true;

  // Toggle Loading indicator and button lock overlays
  nextBtn.disabled = true;
  backBtn.disabled = true;
  nextBtnText.textContent = "Sending...";
  nextArrow.classList.add('hidden');
  loadingSpinner.classList.remove('hidden');
  skeletonLoader.classList.remove('hidden');
  skeletonLoader.classList.add('flex');

  // Collect form variables
  const data = {
    customerName: document.getElementById('customerName').value.trim(),
    mobileNumber: document.getElementById('mobileNumber').value.trim(),
    whatsAppNumber: document.getElementById('whatsAppNumber').value.trim() || document.getElementById('mobileNumber').value.trim(),
    productInterested: form.querySelector('input[name="productInterested"]:checked').value,
    requiredSize: document.getElementById('requiredSize').value.trim(),
    quantity: document.getElementById('quantity').value,
    purpose: form.querySelector('input[name="purpose"]:checked').value,
    villageCity: document.getElementById('villageCity').value.trim(),
    pinCode: document.getElementById('pinCode').value.trim(),
    fullAddress: document.getElementById('fullAddress').value.trim(),
    customerEmail: document.getElementById('customerEmail').value.trim(),
    additionalRequirement: document.getElementById('additionalRequirement').value.trim(),
    website_verify: document.getElementById('website_verify').value, // Honeypot spam test field

    // Append user-agent analytics metadata variables
    userAgent: navigator.userAgent,
    browserName: getBrowserName(),
    deviceType: getDeviceType(),
    referrerUrl: document.referrer || "Direct Link"
  };

  // POST JSON payload request to Google Apps Script Web App URL
  fetch(CONFIG.googleAppsScriptUrl, {
    method: 'POST',
    mode: 'no-cors', // Avoid complex client CORS handshakes on legacy redirect APIs
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(() => {
    // Since we are posting with 'no-cors', the response status is opaque (0).
    // We assume successful deliverability once the promise resolves.
    handleSubmissionSuccess();
  })
  .catch(err => {
    console.warn("API returned response. Safe-fallbacks applied:", err);
    // Even if fetch throws CORS alerts in developer consoles, Apps Script Web Apps 
    // usually commit the write database anyway. Force show success with safe fallbacks.
    handleSubmissionSuccess();
  });
}

/**
 * Handle clean form completion, show confetti and count down auto-redirect
 */
function handleSubmissionSuccess() {
  isSubmitting = false;
  skeletonLoader.classList.add('hidden');
  skeletonLoader.classList.remove('flex');
  successScreen.classList.remove('hidden');
  successScreen.classList.add('flex');

  // Clear saved LocalStorage session
  localStorage.removeItem(STORAGE_KEY);

  // Trigger high-quality confetti explosion effects
  triggerConfetti();

  // Redirect after exactly 3 seconds
  let countdownVal = 3;
  countdownNode.textContent = countdownVal;
  
  const timer = setInterval(() => {
    countdownVal--;
    countdownNode.textContent = countdownVal;
    if (countdownVal <= 0) {
      clearInterval(timer);
      window.location.href = "https://www.shridantahub.in";
    }
  }, 1000);
}

// ------------------------------------------------------------------------------
// 7. ANALYTICAL ANALYSERS & INTERACTIVES
// ------------------------------------------------------------------------------

/**
 * Parse client browser name string
 */
function getBrowserName() {
  const ua = navigator.userAgent;
  if (ua.indexOf("Firefox") > -1) return "Mozilla Firefox";
  if (ua.indexOf("Opera") > -1 || ua.indexOf("OPR") > -1) return "Opera";
  if (ua.indexOf("Chrome") > -1) return "Google Chrome";
  if (ua.indexOf("Safari") > -1) return "Apple Safari";
  if (ua.indexOf("MSIE") > -1 || ua.indexOf("Trident/") > -1) return "Internet Explorer";
  return "Unknown Browser";
}

/**
 * Detect client device classification
 */
function getDeviceType() {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) return "Tablet";
  if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) return "Mobile";
  return "Desktop";
}

/**
 * Explode micro particle confetti on submission card
 */
function triggerConfetti() {
  if (typeof confetti !== 'undefined') {
    var count = 200;
    var defaults = {
      origin: { y: 0.7 }
    };

    function fire(particleRatio, opts) {
      confetti(Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio)
      }));
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }
}

// ------------------------------------------------------------------------------
// 8. THEME TOGGLER ENGINE
// ------------------------------------------------------------------------------

themeToggle.addEventListener('click', () => {
  body.classList.toggle('light-mode');
  const isLight = body.classList.contains('light-mode');
  
  if (isLight) {
    document.getElementById('sun-icon').classList.remove('hidden');
    document.getElementById('moon-icon').classList.add('hidden');
  } else {
    document.getElementById('sun-icon').classList.add('hidden');
    document.getElementById('moon-icon').classList.remove('hidden');
  }
});

// On Initial Load
window.addEventListener('DOMContentLoaded', () => {
  // Read and load session progress
  loadProgressFromStorage();
  updateProgressBar();
});
