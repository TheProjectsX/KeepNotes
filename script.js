// Const Variables
const showAddNote = document.getElementById("showAddNote");

const addNoteField = document.querySelector(".addNote");
const newNoteTitle = document.getElementById("newNoteTitle");
const newNoteBody = document.getElementById("newNoteBody");

const hideAddNote = document.getElementById("hideAddNote");
const newNoteAdd = document.getElementById("newNoteAdd");


const editNoteField = document.querySelector(".editNote");

const editNoteTitle = document.getElementById("editNoteTitle");
const editNoteBody = document.getElementById("editNoteBody");
const editNoteEditButton = document.getElementById("editNoteEditButton");
const editNoteCloseButton = document.getElementById("editNoteCloseButton");

const noteList = document.querySelector(".noteList");

// Script helper variables
let currentNotes, inEdit;

// Set notes from LocalStorage
function setNotes() {
    currentNotes = localStorage.getItem("keepNotesData");
    if (currentNotes == null) {
        currentNotes = { "data": [] }
        return;
    }

    currentNotes = JSON.parse(currentNotes);

    for (let i = 0; i < currentNotes.data.length; i++) {
        let note = currentNotes.data[i];
        let noteTitle = note.noteTitle; // 36
        let noteBody = note.noteBody; // 108

        let titleLimit = noteTitle.length > 36 ? noteTitle.substr(0, 32) + "..." : noteTitle;
        let bodyLimit = noteBody.length > 108 ? noteBody.substr(0, 32) + "..." : noteBody;


        let noteHtml = `<div class="noteItem">
        <p class="noteTitle">${titleLimit}</p>
        <p class="noteBody">${bodyLimit}</p>
        <div class="buttons">
            <button class="noteView" onclick="viewtNote(this)">View</button>
            <button class="noteEdit" onclick="editNote(this)">Edit</button>
            <button class="noteDelete" onclick="deleteNote(this)">Delete</button>
        </div>
    </div>`

        noteList.innerHTML += noteHtml;
    }
}


// Update Note List
function updateNoteList() {
    localStorage.setItem("keepNotesData", JSON.stringify(currentNotes));
}

// View Note
function viewtNote(element) {
    let noteIndex = Array.from(noteList.children).indexOf(element.parentElement.parentElement);
    inEdit = noteIndex;

    let noteData = currentNotes.data[noteIndex];

    editNoteTitle.value = noteData.noteTitle;
    editNoteBody.value = noteData.noteBody;
    editNoteEditButton.innerHTML = "Edit";

    editNoteField.style.display = "flex";
}

// Edit Note
function editNote(element) {
    let noteIndex = Array.from(noteList.children).indexOf(element.parentElement.parentElement);
    inEdit = noteIndex;

    let noteData = currentNotes.data[noteIndex];

    editNoteTitle.value = noteData.noteTitle;
    editNoteBody.value = noteData.noteBody;

    editNoteTitle.disabled = false;
    editNoteBody.disabled = false;

    editNoteEditButton.innerText = "Save";

    editNoteField.style.display = "flex";
}

// Turn on Edit Option and if isEditing, save it
editNoteEditButton.addEventListener("click", (e) => {
    if (e.target.innerHTML == "Edit") {
        e.target.innerHTML = "Save";

        editNoteTitle.disabled = false;
        editNoteBody.disabled = false;
        editNoteBody.focus()

        return
    }

    editNoteTitle.disabled = true;
    editNoteBody.disabled = true;

    editNoteEditButton.innerHTML = "Edit";

    let noteTitle = editNoteTitle.value;
    let noteBody = editNoteBody.value;

    currentNotes.data.splice(inEdit, 1);
    noteList.removeChild(noteList.children[inEdit]);


    let titleLimit = noteTitle.length > 36 ? noteTitle.substr(0, 32) + "..." : noteTitle;
    let bodyLimit = noteBody.length > 108 ? noteBody.substr(0, 32) + "..." : noteBody;


    let noteHtml = `<div class="noteItem">
        <p class="noteTitle">${titleLimit}</p>
        <p class="noteBody">${bodyLimit}</p>
        <div class="buttons">
            <button class="noteView" onclick="viewtNote(this)">View</button>
            <button class="noteEdit" onclick="editNote(this)">Edit</button>
            <button class="noteDelete" onclick="deleteNote(this)">Delete</button>
        </div>
    </div>`

    noteList.innerHTML += noteHtml;

    currentNotes.data.push({ "noteTitle": noteTitle, "noteBody": noteBody})
    updateNoteList();


})

// Close pop up View Menu
editNoteCloseButton.addEventListener("click", () => {
    editNoteField.style.display = "none";
})


// Delete Note Data
function deleteNote(element) {
    let noteIndex = Array.from(noteList.children).indexOf(element.parentElement.parentElement);
    noteList.removeChild(element.parentElement.parentElement);

    currentNotes.data.splice(noteIndex, 1);

    updateNoteList();
}

// Main Event Listeners

// Show "Add Note" Menu
showAddNote.addEventListener("click", () => {
    showAddNote.style.display = "none";

    addNoteField.style.display = "flex";
})


hideAddNote.addEventListener("click", () => {
    addNoteField.style.display = "none";

    showAddNote.style.display = "inline";
})

// Add New Note
newNoteAdd.addEventListener("click", () => {
    if (newNoteTitle.value == "" && newNoteBody.value == "") {
        newNoteBody.placeholder = "No Note to Save!"

        setTimeout(() => {
            newNoteBody.placeholder = "Enter your Note"
        }, 1500);

        return
    }

    let noteTitle = newNoteTitle.value;
    let noteBody = newNoteBody.value;

    newNoteTitle.value = "";
    newNoteBody.value = "";

    let titleLimit = noteTitle.length > 36 ? noteTitle.substr(0, 32) + "..." : noteTitle;
    let bodyLimit = noteBody.length > 108 ? noteBody.substr(0, 32) + "..." : noteBody;


    let noteHtml = `<div class="noteItem">
        <p class="noteTitle">${titleLimit}</p>
        <p class="noteBody">${bodyLimit}</p>
        <div class="buttons">
            <button class="noteView" onclick="viewtNote(this)">View</button>
            <button class="noteEdit" onclick="editNote(this)">Edit</button>
            <button class="noteDelete" onclick="deleteNote(this)">Delete</button>
        </div>
    </div>`

    noteList.innerHTML += noteHtml;

    currentNotes.data.push({ "noteTitle": noteTitle, "noteBody": noteBody})
    updateNoteList();
})

// Set Notes
setNotes();
