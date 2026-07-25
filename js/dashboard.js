// console.log("dashboard.js loaded");
import { loadRoom, loadExpenses, saveExpenses } from "./storage.js";
const room = loadRoom();
const expenses = loadExpenses();
// console.log(expenses);

// console.log(room);

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

  //creating expenses object
  const expense = {
    title: expenseTitleVal,
    amount: Number(expenseAmountVal),
    paidBy: expensePaidByVal,
    category: expenseCategoryVal,
  };
  expenses.push(expense);
  saveExpenses(expenses);
  clearExpenseForm();
  console.log(expenses);
});

//function to clear values of a form
function clearExpenseForm() {
  expenseTitle.value = "";
  expenseAmount.value = "";
  expensePaidBy.value = "";
  expenseCategory.value = "";
}

//making calculation on total spent
const spent = expenses.reduce((total, exp) => {
  return total + exp.amount;
}, 0);

//selecting total spent and putting spent value on it
const totalSpent = document.getElementById("totalSpent");
totalSpent.textContent = `RS. ${spent}`;

//calculating remaining bbudget
const remaining = room.budget - spent;
////selecting remainingBudget and putting spent value on it
const remainingBudget = document.getElementById("remainingBudget");
remainingBudget.textContent = `RS. ${remaining}`;

//calculating usage percentage
const usage = (spent / room.budget) * 100;
const budgetUsage = document.getElementById("budgetUsage");
budgetUsage.textContent = `${usage.toFixed(2)}%`;
