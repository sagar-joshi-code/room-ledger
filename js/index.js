console.log("index.js is running");
import { loadRoom } from "./storage.js";
const room = loadRoom();
console.log(room);

// validating if there is available room or not
if (!room) {
  console.log("No Room Found!");
} else {
  //selecting elements
  const roomNameElement = document.getElementById("displayRoomName");
  const membersElement = document.getElementById("displayMembers");
  const budgetElement = document.getElementById("displayBudget");

  // loading data on screen
  roomNameElement.textContent = room.name;
  membersElement.textContent = `${room.members.length} Members`;
  budgetElement.textContent = `Rs. ${room.budget}`;
}
