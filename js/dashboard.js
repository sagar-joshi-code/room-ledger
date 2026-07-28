let editingIndex = null;
// console.log("dashboard.js loaded");
import { loadRoom, loadExpenses, saveExpenses } from "./storage.js";
const room = loadRoom();
const expenses = loadExpenses();

//making showing members in expenses form
const paidBySelect = document.getElementById("expensePaidBy");
room.members.forEach((member) => {
  // console.log(member);

  const option = document.createElement("option");
  option.textContent = member;
  option.value = member;
  paidBySelect.appendChild(option);
});

//selecting elements
const roomName = document.getElementById("roomName");
const roomMember = document.getElementById("roomMember");
const showDate = document.getElementById("showDate");
const roomBudget = document.getElementById("roomBudget");
roomName.textContent = room.name;
roomMember.textContent = `👥 ${room.members.length} Members`;
roomBudget.textContent = `Rs. ${room.budget}`;
showDate.textContent = `📅 ${new Date().toLocaleDateString()}`;

// selecting expenses form
const expenseTitle = document.getElementById("expenseTitle");
const expenseAmount = document.getElementById("expenseAmount");
const expensePaidBy = document.getElementById("expensePaidBy");
const expenseCategory = document.getElementById("expenseCategory");
const addExpenseBtn = document.getElementById("addExpenseBtn");

addExpenseBtn.addEventListener("click", () => {
  const expenseTitleVal = expenseTitle.value.trim();
  const expenseAmountVal = expenseAmount.value;
  const expensePaidByVal = expensePaidBy.value;
  const expenseCategoryVal = expenseCategory.value;

  // validating expenses form value
  if (!expenseTitleVal) {
    alert("Please add expenses title");
    return;
  }
  if (!expenseAmountVal) {
    alert("Please add expense amount");
    return;
  }
  if (!expensePaidByVal) {
    alert("Please select member member");
    return;
  }
  if (!expenseCategoryVal) {
    alert("Please select category");
    return;
  }

  const now = new Date();
  //creating expenses object
  const expense = {
    title: expenseTitleVal,
    amount: Number(expenseAmountVal),
    paidBy: expensePaidByVal,
    category: expenseCategoryVal,
    date: now.toLocaleDateString(),
    time: now.toLocaleTimeString(),
  };
  if (editingIndex === null) {
    // adding new expense
    expenses.push(expense);
  } else {
    // updating existing expense
    expenses[editingIndex] = expense;
    editingIndex = null;
    addExpenseBtn.textContent = "Add Expense";
  }

  saveExpenses(expenses);
  clearExpenseForm();
  refreshUI();
});

//function to clear values of a form
function clearExpenseForm() {
  expenseTitle.value = "";
  expenseAmount.value = "";
  expensePaidBy.value = "";
  expenseCategory.value = "";
}
//helper function
function refreshUI() {
  renderExpenses();
  updateDashboard();
}

//updating dashboard
function updateDashboard() {
  //making calculation on total spent
  const spent = expenses.reduce((total, exp) => {
    return total + exp.amount;
  }, 0);

  //selecting total spent and putting spent value on it
  const totalSpent = document.getElementById("totalSpent");
  totalSpent.textContent = `RS. ${spent.toLocaleString()}`;

  //calculating remaining bbudget
  const remaining = room.budget - spent;
  ////selecting remainingBudget and putting spent value on it
  const remainingBudget = document.getElementById("remainingBudget");
  remainingBudget.textContent = `RS. ${remaining.toLocaleString()}`;

  //calculating usage percentage
  const usage = (spent / room.budget) * 100;
  const budgetUsage = document.getElementById("budgetUsage");
  budgetUsage.textContent = `${usage.toFixed(2)}%`;
  const progressText = document.getElementById("progressText");
  progressText.textContent = `${usage.toFixed(2)}%`;
  //selecting progress bar
  const progressBar = document.getElementById("progressBar");
  const progressWidth = Math.min(usage, 100);
  progressBar.style.width = `${progressWidth}%`;

  if (usage <= 50) {
    progressBar.style.backgroundColor = "green";
  } else if (usage <= 80) {
    progressBar.style.backgroundColor = "yellow";
  } else {
    progressBar.style.backgroundColor = "red";
  }

  //selecting budget status
  const budgetStatus = document.getElementById("budgetStatus");
  if (usage <= 50) {
    budgetStatus.textContent = "✅ Excellent! Budget is healthy.";
  } else if (usage <= 80) {
    budgetStatus.textContent = "⚠️ Be careful. You're nearing the budget.";
  } else if (usage <= 100) {
    budgetStatus.textContent = "🚨 Almost out of budget!";
  } else {
    budgetStatus.textContent = `❌ Over budget by Rs. ${(spent - room.budget).toLocaleString()}`;
  }
}

//selecting expenseList
const expenseList = document.getElementById("expenseList");
//rendering function
function renderExpenses() {
  //clearing old data
  expenseList.innerHTML = "";
  //looping on expense list
  expenses.forEach((exp, idx) => {
    const card = document.createElement("div");

    card.className = `
bg-white 
p-5 
rounded-2xl 
shadow-md 
border 
border-slate-100
hover:shadow-lg
hover:-translate-y-1
transition
`;

    card.innerHTML = `
<div class="flex justify-between items-center">

  <div>
    <h3 class="text-xl font-bold text-slate-800">
      🍛 ${exp.title}
    </h3>

    <span class="inline-block mt-2 px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700">
      🏷️ ${exp.category}
    </span>
  </div>


  <span class="px-4 py-2 rounded-xl bg-red-100 text-red-600 font-bold">
    Rs. ${exp.amount.toLocaleString()}
  </span>

</div>


<div class="mt-4 space-y-2 text-slate-600">

<p>
🙋 Paid By:
<span class="font-semibold">
${exp.paidBy}
</span>
</p>

<p class="text-sm text-slate-400">
📅 ${exp.date} • 🕒 ${exp.time}
</p>

</div>
`;
    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️ Edit";
    editBtn.className = `
mt-4
px-4
py-2
rounded-xl
bg-blue-500
text-white
font-semibold
hover:bg-blue-600
transition
`;
    editBtn.addEventListener("click", () => {
      editingIndex = idx;

      expenseTitle.value = exp.title;
      expenseAmount.value = exp.amount;
      expensePaidBy.value = exp.paidBy;
      expenseCategory.value = exp.category;

      addExpenseBtn.textContent = "Update Expense";
    });
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑 Delete";
    deleteBtn.className = `
ml-4    
mt-4
px-4
py-2
rounded-xl
bg-red-500
text-white
font-semibold
hover:bg-red-600
transition
`;
    deleteBtn.addEventListener("click", () => {
      expenses.splice(idx, 1);
      saveExpenses(expenses);
      refreshUI();
    });
    card.appendChild(editBtn);
    card.appendChild(deleteBtn);
    expenseList.appendChild(card);
  });
}
refreshUI();
