console.log("Script loaded and running");
const expenseForm = document.getElementById("expenseForm");
const expenseList = document.getElementById("expenseList");
const totalAmount = document.getElementById("totalAmount");

let expenses = [];

// Load expenses from localStorage
function loadExpenses() {
  const stored = localStorage.getItem("expenses");
  if (stored) {
    expenses = JSON.parse(stored);
  } else {
    expenses = [];
  }
}

// Save expenses to localStorage
function saveExpenses() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

// Render expenses on page
function renderExpenses() {
  expenseList.innerHTML = "";

  expenses.forEach((expense, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div>${expense.category} - ₹${expense.amount.toFixed(2)}</div>
      <div>${expense.date}</div>
    `;
    expenseList.appendChild(li);
  });

  // Calculate total
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  totalAmount.textContent = total.toFixed(2);
}

// Handle form submit
expenseForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const amount = parseFloat(document.getElementById("amount").value);
  const category = document.getElementById("category").value.trim();
  const date = document.getElementById("date").value;

  if (!amount || !category || !date) {
    alert("Please fill all fields correctly.");
    return;
  }

  expenses.push({ amount, category, date });

  saveExpenses();
  renderExpenses();

  // Clear form
  expenseForm.reset();
});

// Initialize
loadExpenses();
renderExpenses();
