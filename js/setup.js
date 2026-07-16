import { saveRoom } from "./storage.js";

//storing members temporary
let members = [];

// selecting element
const roomNameInput = document.getElementById("roomName");
const memberInput = document.getElementById("memberInput");
const addMemberBtn = document.getElementById("addMemberBtn");
const memberList = document.getElementById("memberList");
const budgetInput = document.getElementById("budget");
const createRoomBtn = document.getElementById("createRoomBtn");

//add member
function addMember() {
  const readMemberInput = memberInput.value.trim();

  if (readMemberInput === "") {
    alert("please enter member");
    return;
  }

  if (preventDuplicate(readMemberInput)) {
    alert("Member already exists!");
    return;
  } else {
    members.push(readMemberInput);
  }
  memberInput.value = "";
  renderMembers();
}

//function to prevent duplicate name
function preventDuplicate(name) {
  return members.some((member) => {
    return member.toLowerCase() === name.toLowerCase();
  });
}

//button click
addMemberBtn.addEventListener("click", addMember);

memberInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    addMember();
  }
});

//render members
function renderMembers() {
  memberList.innerHTML = "";
  members.forEach((member, idx) => {
    const memberCard = document.createElement("div");
    memberCard.className = "bg-slate-200 rounded-xl p-3 flex justify-between";

    const span = document.createElement("span");
    span.textContent = `👤 ${member} `;

    const removeBtn = document.createElement("button");
    removeBtn.className = "bg-blue-600 px-6 py-2 rounded text-white ";
    removeBtn.innerHTML = "Remove";

    removeBtn.addEventListener("click", () => {
      members.splice(idx, 1);
      renderMembers();
    });

    memberCard.appendChild(span);
    memberCard.appendChild(removeBtn);
    memberList.appendChild(memberCard);
  });
}

//adding functionality to create btn
createRoomBtn.addEventListener("click", () => {
  const roomName = roomNameInput.value.trim();
  const roomMembers = members;
  const roomBudget = Number(budgetInput.value);
  //validate roomName
  if (roomName === "") {
    alert("Please enter your room name");
    return;
  }
  if (roomMembers.length < 1) {
    alert("Please enter at least one member");
    return;
  }
  if (roomBudget < 1) {
    alert("Budget should be greater than 0");
    return;
  }
  //creating room object
  const room = {
    name: roomName,
    members: [...roomMembers],
    budget: roomBudget,
  };
  saveRoom(room);
  alert("Room created successfully");
  window.location.href = "index.html";
});
renderMembers();
