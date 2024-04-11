const addBtn = document.querySelector(".add-note");
const textList = JSON.parse(localStorage.getItem("text"));
function retrieveLS() {
  textList.forEach((text) => {
    addNote(text);
    console.log("addNote called");
  });
}

retrieveLS();

function addNote(text = "") {
  const newNote = document.createElement("div");
  newNote.classList.add("notes-container");
  newNote.innerHTML = `<div class="head-tools">
      <div>
        <button class="edit">
          <i class="fa-regular fa-pen-to-square"></i>
        </button>
        <button class="delete">
          <i class="fa-sharp fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
    <div class="notes ${text ? "" : "hidden"}"></div>
    <textarea class="textarea ${text ? "hidden" : ""}">${text}</textarea>
  </div>`;
  const closeBtn = newNote.querySelector(".delete");
  const editBtn = newNote.querySelector(".edit");
  const textArea = newNote.querySelector(".textarea");
  const notesEle = newNote.querySelector(".notes");
  notesEle.innerHTML = marked.parse(textArea.value);
  editBtn.addEventListener("click", () => {
    notesEle.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
    updateLS();
  });
  closeBtn.addEventListener("click", () => {
    newNote.remove();
    updateLS();
  });
  textArea.addEventListener("input", (e) => {
    const { value } = e.target;
    notesEle.innerHTML = marked.parse(value);
  });
  document.body.appendChild(newNote);
}
addBtn.addEventListener("click", () => {
  addNote();
});
function updateLS() {
  const allText = document.querySelectorAll("textarea");
  const textList = [];
  allText.forEach((text) => {
    textList.push(text.value);
  });
  localStorage.setItem("text", JSON.stringify(textList));
}
