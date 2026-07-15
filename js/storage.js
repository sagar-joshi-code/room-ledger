//save data to localstorage
export function saveRoom(data) {
  localStorage.setItem("roomData", JSON.stringify(data));
}

// load data from localstorage
export function loadRoom() {
  return JSON.parse(localStorage.getItem("roomData"));
}
