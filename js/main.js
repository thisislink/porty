/* Header Typing Effect */
let getTextElement = document.querySelector(".hero-subtitle");
let getText = getTextElement.innerText || getTextElement.textContent;

let index = 1;
 
const typeText = () => {
    getTextElement.innerText = getText.slice(0, index);
    index++;
 
    //check if end of string and can stop text typing
    if(index > getText.length) {
        index = 1;
    }
 
    setTimeout(typeText, 200);
}
 
typeText();
 
/* Notes */

const addNotesButton = document.querySelector(".addNote-button");
const notes = JSON.parse(localStorage.getItem("notes"));

if(notes) {
    notes.forEach(note => addNewNote(note));
}

addNotesButton.addEventListener("click", () => addNewNote());

function addNewNote(data = "This small notes app saves your notes to local storage.\n\nTo delete a note from local storage, click the trash can icon at the top right of the note.\n\nThis default text can be deleted.") {
    const note = document.querySelector(".all-notes"); 
    const newNote = document.createElement('section');
    newNote.classList.add('notes-container');

    newNote.innerHTML = `        
        <div class="note-toolbar">
            <button class="delete-note"><span class="fas fa-trash-alt"></span></button>
        </div>
        <div>
        <textarea class="notes-textarea ${data}"></textarea>
        </div>
    `;   

    const deleteNoteButton = newNote.querySelector('.delete-note');
    const main = newNote.querySelector('.notes-textarea');
    const textarea = newNote.querySelector('textarea');

    main.innerHTML = data;

    deleteNoteButton.addEventListener("click", () => {
        newNote.remove();
        updateLocalStorage();
    })

    textarea.addEventListener("input", (e) => {
        const { value } = e.target;
        updateLocalStorage();
    })

    note.appendChild(newNote);    
}

function updateLocalStorage() {
    const noteText = document.querySelectorAll('textarea');

    const notes = [];

    noteText.forEach(note => notes.push(note.value));

    localStorage.setItem('notes', JSON.stringify(notes));
}