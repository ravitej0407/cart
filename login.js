/* ========================================
   QuickMart - Login & Authentication Logic
   ======================================== */

// --- Storage Keys ---
const THEME_STORAGE_KEY = 'quickmart_theme';
const USER_STORAGE_KEY = 'quickmart_user';

// --- State ---
let pendingPhone = '';
let generatedOtp = '4829';
let timerInterval = null;

// --- DOM Elements ---
const elements = {
  themeToggle: document.getElementById('themeToggle'),
  loggedInCard: document.getElementById('loggedInCard'),
  authCard: document.getElementById('authCard'),
  activeAvatar: document.getElementById('activeAvatar'),
  activeName: document.getElementById('activeName'),
  activeDetail: document.getElementById('activeDetail'),
  switchAccountBtn: document.getElementById('switchAccountBtn'),
  activeLogoutBtn: document.getElementById('activeLogoutBtn'),

  // Tabs
  tabOtpBtn: document.getElementById('tabOtpBtn'),
  tabPasswordBtn: document.getElementById('tabPasswordBtn'),
  tabSignupBtn: document.getElementById('tabSignupBtn'),
  tabOtpContent: document.getElementById('tabOtpContent'),
  tabPasswordContent: document.getElementById('tabPasswordContent'),
  tabSignupContent: document.getElementById('tabSignupContent'),

  // OTP Flow
  otpPhoneForm: document.getElementById('otpPhoneForm'),
  authMobileInput: document.getElementById('authMobileInput'),
  authMobileError: document.getElementById('authMobileError'),
  otpVerifyForm: document.getElementById('otpVerifyForm'),
  otpDisplayPhone: document.getElementById('otpDisplayPhone'),
  changePhoneBtn: document.getElementById('changePhoneBtn'),
  otpDigits: document.querySelectorAll('.otp-digit'),
  timerText: document.getElementById('timerText'),
  resendTimer: document.getElementById('resendTimer'),
  resendOtpBtn: document.getElementById('resendOtpBtn'),
  otpError: document.getElementById('otpError'),

  // Password Flow
  passwordLoginForm: document.getElementById('passwordLoginForm'),
  authEmailInput: document.getElementById('authEmailInput'),
  authPasswordInput: document.getElementById('authPasswordInput'),
  passwordLoginError: document.getElementById('passwordLoginError'),
  forgotPasswordBtn: document.getElementById('forgotPasswordBtn'),

  // Sign Up Flow
  signupForm: document.getElementById('signupForm'),
  signupName: document.getElementById('signupName'),
  signupPhone: document.getElementById('signupPhone'),
  signupEmail: document.getElementById('signupEmail'),
  signupPassword: document.getElementById('signupPassword'),
  signupError: document.getElementById('signupError'),

  // Social
  googleLoginBtn: document.getElementById('googleLoginBtn'),
  appleLoginBtn: document.getElementById('appleLoginBtn')
};

// --- Toast Notification ---
function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// --- Theme Management ---

function initTheme() {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
  applyTheme(isDark ? 'dark' : 'light');

  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(THEME_STORAGE_KEY)) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }
}

function applyTheme(theme) {
  const isDark = theme === 'dark';
  if (isDark) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
  updateThemeToggleUI(isDark);
}

function toggleTheme() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const newTheme = isDark ? 'light' : 'dark';
  localStorage.setItem(THEME_STORAGE_KEY, newTheme);
  applyTheme(newTheme);
  showToast(`Switched to ${newTheme} mode`);
}

function updateThemeToggleUI(isDark) {
  if (!elements.themeToggle) return;
  const moonIcon = elements.themeToggle.querySelector('.icon-moon');
  const sunIcon = elements.themeToggle.querySelector('.icon-sun');

  if (moonIcon && sunIcon) {
    if (isDark) {
      moonIcon.classList.add('hidden');
      sunIcon.classList.remove('hidden');
      elements.themeToggle.setAttribute('aria-label', 'Switch to light mode');
      elements.themeToggle.title = 'Switch to light mode';
    } else {
      moonIcon.classList.remove('hidden');
      sunIcon.classList.add('hidden');
      elements.themeToggle.setAttribute('aria-label', 'Switch to dark mode');
      elements.themeToggle.title = 'Switch to dark mode';
    }
  }
}

// --- User Session Management ---

function loadUser() {
  try {
    const saved = localStorage.getItem(USER_STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

function completeLogin(user, successMessage = 'Login successful!') {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  sessionStorage.setItem('quickmart_login_toast', successMessage);
  showToast(successMessage);
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 500);
}

function checkActiveSession() {
  const user = loadUser();
  if (user && elements.loggedInCard && elements.authCard) {
    elements.loggedInCard.classList.remove('hidden');
    elements.authCard.classList.add('hidden');

    const name = user.name || 'QuickMart Member';
    elements.activeAvatar.textContent = name.charAt(0).toUpperCase();
    elements.activeName.textContent = `Welcome, ${name}!`;
    elements.activeDetail.textContent = `Signed in with ${user.phone || user.email || 'your account'}`;
  } else if (elements.loggedInCard && elements.authCard) {
    elements.loggedInCard.classList.add('hidden');
    elements.authCard.classList.remove('hidden');
  }
}

// --- Tab Navigation ---

function switchTab(activeTabName) {
  const tabs = [
    { name: 'otp', btn: elements.tabOtpBtn, content: elements.tabOtpContent },
    { name: 'password', btn: elements.tabPasswordBtn, content: elements.tabPasswordContent },
    { name: 'signup', btn: elements.tabSignupBtn, content: elements.tabSignupContent }
  ];

  tabs.forEach(tab => {
    const isActive = tab.name === activeTabName;
    tab.btn.classList.toggle('active', isActive);
    tab.btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    tab.content.classList.toggle('hidden', !isActive);
  });
}

// --- Mobile OTP Flow ---

function startOtpTimer(seconds = 28) {
  clearInterval(timerInterval);
  let timeLeft = seconds;
  elements.resendTimer.textContent = timeLeft;
  elements.timerText.classList.remove('hidden');
  elements.resendOtpBtn.classList.add('hidden');

  timerInterval = setInterval(() => {
    timeLeft -= 1;
    elements.resendTimer.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      elements.timerText.classList.add('hidden');
      elements.resendOtpBtn.classList.remove('hidden');
    }
  }, 1000);
}

function sendOtp(phone) {
  pendingPhone = phone;
  // Generate random 4-digit code
  generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();

  elements.otpPhoneForm.classList.add('hidden');
  elements.otpVerifyForm.classList.remove('hidden');
  elements.otpDisplayPhone.textContent = `+91 ${phone}`;

  // Clear previous digits
  elements.otpDigits.forEach(input => input.value = '');
  elements.otpError.classList.add('hidden');

  // Focus first digit box
  setTimeout(() => {
    if (elements.otpDigits[0]) elements.otpDigits[0].focus();
  }, 100);

  startOtpTimer(30);

  // Friendly toast showing simulated OTP so user never gets stuck!
  showToast(`Your QuickMart Verification Code is: ${generatedOtp}`);
}

function resetOtpPhoneForm() {
  clearInterval(timerInterval);
  elements.otpVerifyForm.classList.add('hidden');
  elements.otpPhoneForm.classList.remove('hidden');
  elements.authMobileInput.focus();
}

function initOtpInputs() {
  elements.otpDigits.forEach((digitInput, index) => {
    digitInput.addEventListener('input', (e) => {
      const val = e.target.value.replace(/[^0-9]/g, '');
      e.target.value = val;

      if (val && index < elements.otpDigits.length - 1) {
        elements.otpDigits[index + 1].focus();
      }
    });

    digitInput.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !digitInput.value && index > 0) {
        elements.otpDigits[index - 1].focus();
      }
    });

    // Handle paste event (e.g. pasting 4-digit code)
    digitInput.addEventListener('paste', (e) => {
      e.preventDefault();
      const pasteData = (e.clipboardData || window.clipboardData).getData('text').trim();
      const numbers = pasteData.replace(/[^0-9]/g, '').slice(0, 4);

      if (numbers.length > 0) {
        numbers.split('').forEach((num, i) => {
          if (elements.otpDigits[i]) elements.otpDigits[i].value = num;
        });
        const nextIdx = Math.min(numbers.length, elements.otpDigits.length - 1);
        elements.otpDigits[nextIdx].focus();
      }
    });
  });
}

// --- Password Visibility Toggle ---

function initPasswordToggles() {
  document.querySelectorAll('.toggle-password-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const wrapper = btn.closest('.password-input-wrapper');
      const input = wrapper.querySelector('input');
      const isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';

      btn.innerHTML = isPassword
        ? `<svg class="icon icon-eye-off" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
             <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22"/>
           </svg>`
        : `<svg class="icon icon-eye" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
             <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
             <circle cx="12" cy="12" r="3"/>
           </svg>`;
    });
  });
}

// --- Event Listeners ---

function initEventListeners() {
  // Theme Toggle
  if (elements.themeToggle) {
    elements.themeToggle.addEventListener('click', toggleTheme);
  }

  // Active Session actions
  if (elements.switchAccountBtn) {
    elements.switchAccountBtn.addEventListener('click', () => {
      elements.loggedInCard.classList.add('hidden');
      elements.authCard.classList.remove('hidden');
    });
  }

  if (elements.activeLogoutBtn) {
    elements.activeLogoutBtn.addEventListener('click', () => {
      localStorage.removeItem(USER_STORAGE_KEY);
      showToast('Logged out of QuickMart');
      checkActiveSession();
    });
  }

  // Tabs
  elements.tabOtpBtn.addEventListener('click', () => switchTab('otp'));
  elements.tabPasswordBtn.addEventListener('click', () => switchTab('password'));
  elements.tabSignupBtn.addEventListener('click', () => switchTab('signup'));

  // Mobile OTP Request Form
  elements.otpPhoneForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const phone = elements.authMobileInput.value.trim();

    if (!/^[6-9]\d{9}$/.test(phone)) {
      elements.authMobileError.classList.remove('hidden');
      return;
    }

    elements.authMobileError.classList.add('hidden');
    sendOtp(phone);
  });

  // Change phone button
  elements.changePhoneBtn.addEventListener('click', resetOtpPhoneForm);

  // Resend OTP button
  elements.resendOtpBtn.addEventListener('click', () => {
    if (pendingPhone) {
      sendOtp(pendingPhone);
    }
  });

  // Verify OTP Form
  elements.otpVerifyForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const enteredCode = Array.from(elements.otpDigits).map(d => d.value.trim()).join('');

    if (enteredCode.length < 4) {
      elements.otpError.textContent = 'Please enter all 4 digits.';
      elements.otpError.classList.remove('hidden');
      return;
    }

    elements.otpError.classList.add('hidden');
    const user = {
      name: `User ${pendingPhone.slice(-4)}`,
      phone: `+91 ${pendingPhone}`,
      email: `user${pendingPhone.slice(-4)}@quickmart.in`
    };

    completeLogin(user, `Welcome to QuickMart! Verified +91 ${pendingPhone}`);
  });

  // Password Login Form
  elements.passwordLoginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = elements.authEmailInput.value.trim();
    const password = elements.authPasswordInput.value.trim();

    if (!email || !password) {
      elements.passwordLoginError.classList.remove('hidden');
      return;
    }

    elements.passwordLoginError.classList.add('hidden');
    const displayName = email.includes('@')
      ? email.split('@')[0].replace(/[._-]/g, ' ')
      : email;

    const user = {
      name: displayName.charAt(0).toUpperCase() + displayName.slice(1),
      phone: '+91 98765 43210',
      email: email
    };

    completeLogin(user, `Welcome back, ${user.name}!`);
  });

  // Sign Up Form
  elements.signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = elements.signupName.value.trim();
    const phone = elements.signupPhone.value.trim();
    const email = elements.signupEmail.value.trim();
    const password = elements.signupPassword.value.trim();

    if (!name || !/^[6-9]\d{9}$/.test(phone) || !email || password.length < 6) {
      elements.signupError.classList.remove('hidden');
      return;
    }

    elements.signupError.classList.add('hidden');
    const user = {
      name: name,
      phone: `+91 ${phone}`,
      email: email
    };

    completeLogin(user, `Account created! Welcome, ${name}`);
  });

  // Social Logins
  elements.googleLoginBtn.addEventListener('click', () => {
    const googleUser = {
      name: 'Priya Patel',
      phone: '+91 98123 45678',
      email: 'priya.patel@gmail.com'
    };
    completeLogin(googleUser, 'Signed in with Google as Priya Patel!');
  });

  elements.appleLoginBtn.addEventListener('click', () => {
    const appleUser = {
      name: 'Rohan Verma',
      phone: '+91 97890 12345',
      email: 'rohan.verma@icloud.com'
    };
    completeLogin(appleUser, 'Signed in with Apple ID as Rohan Verma!');
  });

  // Forgot password
  elements.forgotPasswordBtn.addEventListener('click', () => {
    showToast('Password reset link sent to registered email');
  });
}

// --- Initialize Login Page ---
function init() {
  initTheme();
  checkActiveSession();
  initOtpInputs();
  initPasswordToggles();
  initEventListeners();
}

document.addEventListener('DOMContentLoaded', init);

