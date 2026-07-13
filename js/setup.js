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
  members.push(readMemberInput);
  console.log(members);
  memberInput.value = "";
}

//button click
addMemberBtn.addEventListener("click", addMember);

memberInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    addMember();
  }
});
