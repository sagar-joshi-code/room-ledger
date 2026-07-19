console.log("dashboard.js loaded");
import { loadRoom } from "./storage.js";
const room = loadRoom();
console.log(room);

//selecting elements
const roomName = document.getElementById("roomName");
const roomMember = document.getElementById("roomMember");
const showDate = document.getElementById("showDate");
const roomBudget = document.getElementById("roomBudget");
roomName.textContent = room.name;
roomMember.textContent = `👥 ${room.members.length} Members`;
roomBudget.textContent = `Rs. ${room.budget}`;
showDate.textContent = `📅 ${new Date().toLocaleDateString()}`;
