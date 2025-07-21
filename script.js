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
  let container = document.querySelector("section");
  let note = document.createElement("div");
  note.innerHTML = `<div class="card">
  <div class="card-header">
    <h2>${inputNote}</h2>
    <button class="close-btn">X</button>
  </div>
  <p>
  ${inputDes}</p>
</div>`;
  let card = note.firstElementChild;
  container.append(card);
  document.getElementById("input-note").value = "";
  document.getElementById("input-des").value = "";
  dialog.classList.remove("active");
}

document.querySelector("section").addEventListener("click", (e) => {
  if (e.target.classList.contains("close-btn")) {
    const card = e.target.closest(".card");
    if (card) {
      card.remove();
    }
  }
});
