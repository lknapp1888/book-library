// book add and table population *******************************************

const TABLE_BODY = document.getElementById('table-body');
const TABLE_ROW = document.getElementsByTagName('tr');
myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    tableCompile(myLibrary)
}

function tableCompile(book) {
    while (TABLE_BODY.firstChild) {
        TABLE_BODY.removeChild(TABLE_BODY.firstChild);
    }
    for (let i = 0; i < myLibrary.length; i++) {
        let NEW_ROW = document.createElement('tr');
        TABLE_BODY.appendChild(NEW_ROW);
        let NEW_CELL_ONE = document.createElement('td');
        NEW_ROW.appendChild(NEW_CELL_ONE);
        NEW_CELL_ONE.textContent = book[i].title;
        let NEW_CELL_TWO = document.createElement('td');
        NEW_ROW.appendChild(NEW_CELL_TWO);
        NEW_CELL_TWO.textContent = book[i].author;
        let NEW_CELL_THREE = document.createElement('td');
        NEW_ROW.appendChild(NEW_CELL_THREE);
        NEW_CELL_THREE.textContent = book[i].pages;
        let NEW_CELL_FOUR = document.createElement('td');
        NEW_ROW.appendChild(NEW_CELL_FOUR);
        NEW_CELL_FOUR.textContent = book[i].read;
    }
}

let exampleBook = new Book('new book title', 'Lewis', 250, 'yes');
let exampleBookTwo = new Book('title 2', 'Lewis', 250, 'yes');

document.addEventListener('click', addBookToLibrary(exampleBook));
document.addEventListener('click', addBookToLibrary(exampleBookTwo));

// modal functions and buttons*******************************************

const openModalButton = document.querySelectorAll('[data-modal-target]')
const closeModalButton = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

openModalButton.forEach(button => {
    button.addEventListener('click', () => {
        openModal();
    })
})

closeModalButton.forEach(button => {
    button.addEventListener('click', () => {
        closeModal();
    })
})

overlay.addEventListener('click', () => {
    closeModal();
}
)

function openModal() {
    document.getElementById('modal').classList.add('active');
    document.getElementById('overlay').classList.add('active');
}

function closeModal() {
    document.getElementById('modal').classList.remove('active');
    document.getElementById('overlay').classList.remove('active');
}



