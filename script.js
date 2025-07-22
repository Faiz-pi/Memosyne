let createBtn = document.getElementById("create-btn");
createBtn.addEventListener("click", () => {
  dialog.classList.add("active");
});

let cancelBtn = document.getElementById("closeDialog-btn");
cancelBtn.addEventListener("click", () => {
  dialog.classList.remove("active");
});

function save() {
  let inputNote = document.getElementById("input-note").value;
  let inputDes = document.getElementById("input-des").value;

  if (inputNote === "" || inputDes === "") {
    alert("Enter a Valid Note");
    return null;
  }

  const noteObj = {
    id: Date.now(),
    title: inputNote,
    description: inputDes,
  };

  let notesArr = JSON.parse(localStorage.getItem("notes")) || [];

  notesArr.push(noteObj);

  localStorage.setItem("notes", JSON.stringify(notesArr));
  createCard(noteObj);

  document.getElementById("input-note").value = "";
  document.getElementById("input-des").value = "";
  dialog.classList.remove("active");
}

function createCard(noteObj) {
  console.log(noteObj);
  let container = document.querySelector("section");
  let note = document.createElement("div");

  note.innerHTML = `<div class="card" data-id="${noteObj.id}">
  <div class="card-header">
    <h2>${noteObj.title}</h2>
    <span>
    <button class="edit-btn">
      <svg>
        <use href="/public/pencil-solid.svg"></use>
      </svg>
    </button>
    <button class="close-btn">X</button>
    <span>
  </div>
  <p>
  ${noteObj.description}</p>
</div>`;

  let card = note.firstElementChild;
  container.append(card);
  checkEmptyMessage();
}

document.querySelector("section").addEventListener("click", (e) => {
  if (e.target.classList.contains("close-btn")) {
    const card = e.target.closest(".card");
    if (card) {
      const cardId = card.getAttribute("data-id");
      let notes = JSON.parse(localStorage.getItem("notes")) || [];
      notes = notes.filter((note) => note.id != cardId);

      localStorage.setItem("notes", JSON.stringify(notes));

      card.remove();
      checkEmptyMessage();
    }
  }
});

window.addEventListener("DOMContentLoaded", () => {
  const notesArr = JSON.parse(localStorage.getItem("notes")) || [];
  notesArr.forEach((elem) => {
    createCard(elem);
    checkEmptyMessage();
  });
});

function checkEmptyMessage() {
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  const msg = document.getElementById("empty-msg");

  if (notes.length === 0) {
    msg.style.display = "block";
  } else {
    msg.style.display = "none";
  }
}
