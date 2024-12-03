document.getElementById("generate-btn").addEventListener("click", () => {
  const length = parseInt(document.getElementById("length").value);
  const includeUpperCase = document.getElementById("uppercase").checked;
  const includeLowerCase = document.getElementById("lowercase").checked;
  const includeNumbers = document.getElementById("inc-numbers").checked;
  const includeSymbols = document.getElementById("symbols").checked;

  const password = generatePassword(
    length,
    includeUpperCase,
    includeNumbers,
    includeLowerCase,
    includeSymbols
  );
  document.getElementById("password-output").value = password;

  updateStrength(
    password,
    includeLowerCase,
    includeUpperCase,
    includeSymbols,
    includeNumbers
  );
});

document.getElementById("copy-btn").addEventListener("click", () => {
    const password = document.getElementById("password-output").value;
    const copyStatus = document.getElementById("copy-status");
  
    if (password) {
      navigator.clipboard.writeText(password).then(() => {
        copyStatus.textContent = "COPIED!";
        copyStatus.style.visibility = "visible";
        copyStatus.style.opacity = "1";
  
        // Hide the message after 2 seconds
        setTimeout(() => {
          copyStatus.style.visibility = "hidden";
          copyStatus.style.opacity = "0";
        }, 2000);
      });
    } else {
      copyStatus.textContent = "NOTHING TO COPY!";
      copyStatus.style.visibility = "visible";
      copyStatus.style.opacity = "1";
  
      // Hide the message after 2 seconds
      setTimeout(() => {
        copyStatus.style.visibility = "hidden";
        copyStatus.style.opacity = "0";
      }, 2000);
    }
  });
  

function generatePassword(
  length,
  includeUpperCase,
  includeNumbers,
  includeLowerCase,
  includeSymbols
) {
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+=[]{}|;:,.<>?";

  let characters = lowercase;
  if (includeLowerCase) characters += lowercase;
  if (includeNumbers) characters += numbers;
  if (includeUpperCase) characters += uppercase;
  if (includeSymbols) characters += symbols;

  if (characters.length === 0) return "Select at least one option!";

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }
  return password;
}

function calculateStrength(
  password,
  includeLowerCase,
  includeUpperCase,
  includeSymbols,
  includeNumbers
) {
  let strength = 0;

  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;
  if (includeLowerCase) strength++;
  if (includeUpperCase) strength++;
  if (includeNumbers) strength++;
  if (includeSymbols) strength++;
  return strength;
}

function updateStrength(
  password,
  includeLowerCase,
  includeUpperCase,
  includeSymbols,
  includeNumbers
) {
  const strengthMeter = document.getElementById("strength-meter");
  const strengthLabel = document.getElementById("strength-label");
  const strength = calculateStrength(
    password,
    includeUpperCase,
    includeLowerCase,
    includeNumbers,
    includeSymbols
  );

  let strengthClass = "";
  let strengthText = "";

  if (strength <= 2) {
    strengthClass = "weak";
    strengthText = "WEAK";
  } else if (strength <= 4) {
    strengthClass = "medium";
    strengthText = "MEDIUM";
  } else {
    strengthClass = "strong";
    strengthText = "STRONG";
  }

  // Clear previous classes and apply new
  strengthMeter.innerHTML = `<div class="${strengthClass}"></div>`;
  strengthLabel.textContent = strengthText;
}
