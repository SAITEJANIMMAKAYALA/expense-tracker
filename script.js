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
      <div>
        ${expense.category} - ₹${expense.amount.toFixed(2)}<br/>
        <small>${expense.date}</small>
      </div>
      <button class="delete-btn" onclick="deleteExpense(${index})">🗑️</button>
    `;

    expenseList.appendChild(li);
  });

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  totalAmount.textContent = total.toFixed(2);
}

// Delete expense
function deleteExpense(index) {
  if (confirm("Are you sure you want to delete this expense?")) {
    expenses.splice(index, 1);
    saveExpenses();
    renderExpenses();
  }
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

  expenseForm.reset();
});

// Initialize
loadExpenses();
renderExpenses();
