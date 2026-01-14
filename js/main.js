const passwordInput = document.getElementById("password");
const strengthFill = document.getElementById("strengthFill");
const strengthLabel = document.getElementById("strengthLabel");
const togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("click", () => {
  const type =
    passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);
  togglePassword.classList.toggle("visible");
});

const checks = {
  length: document.getElementById("lengthCheck"),
  uppercase: document.getElementById("uppercaseCheck"),
  lowercase: document.getElementById("lowercaseCheck"),
  number: document.getElementById("numberCheck"),
  special: document.getElementById("specialCheck"),
};

function validatePassword(password) {
  return {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
  };
}

function updateStrength(password) {
  const validation = validatePassword(password);
  const metRequirements = Object.values(validation).filter(Boolean).length;

  // Update checklist
  checks.length.classList.toggle("active", validation.length);
  checks.uppercase.classList.toggle("active", validation.uppercase);
  checks.lowercase.classList.toggle("active", validation.lowercase);
  checks.number.classList.toggle("active", validation.number);
  checks.special.classList.toggle("active", validation.special);

  // Update strength bar
  const fillPercentage = (metRequirements / 5) * 100;
  strengthFill.style.width = fillPercentage + "%";

  // Update strength label and color
  if (password.length === 0) {
    strengthLabel.textContent = "-";
    strengthFill.style.backgroundColor = "#e0e0e0";
  } else if (metRequirements <= 2) {
    strengthLabel.textContent = "Weak";
    strengthLabel.style.color = "#e74c3c";
    strengthFill.style.backgroundColor = "#e74c3c";
  } else if (metRequirements <= 4) {
    strengthLabel.textContent = "Medium";
    strengthLabel.style.color = "#f39c12";
    strengthFill.style.backgroundColor = "#f39c12";
  } else {
    strengthLabel.textContent = "Strong";
    strengthLabel.style.color = "#27ae60";
    strengthFill.style.backgroundColor = "#27ae60";
  }
}

passwordInput.addEventListener("input", (e) => {
  updateStrength(e.target.value);
});
