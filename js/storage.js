//save data to localstorage
export function saveRoom(data) {
  localStorage.setItem("roomData", JSON.stringify(data));
}

// load data from localstorage
export function loadRoom() {
  return JSON.parse(localStorage.getItem("roomData"));
}

//save expenses to localstorage
export function saveExpenses(roomExpense) {
  localStorage.setItem("roomExpenses",JSON.stringify(roomExpense))
}

//load expenses from localstorage
export function loadExpenses() {
  return JSON.parse(localStorage.getItem("roomExpenses"))
}