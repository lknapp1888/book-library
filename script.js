// book add and table population *******************************************
const TABLE_BODY = document.getElementById('table-body');
const TABLE_ROW = document.getElementsByTagName('tr');
myLibrary = [];

function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = false;
}

Book.prototype.toggleRead = function() {
    (this.read === false) ? this.read = true : this.read = false;   
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
        NEW_ROW.classList.add(`entry-${i}`);
        NEW_ROW.classList.add(`table-row`);
        NEW_ROW.setAttribute('data-id', `${i}`);

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
        //NEW_CELL_FOUR.textContent = book[i].read;
        NEW_CELL_ONE.classList.add(`read-${i}`)

        let tempReadToggle = document.createElement('button')
        if (book[i].read === true) {
            tempReadToggle.textContent = 'Read'
            tempReadToggle.classList.add('read');}
        if (book[i].read === false) {
            tempReadToggle.textContent = 'Not read';
            tempReadToggle.classList.add('not-read');}
        tempReadToggle.classList.add(`toggle-btn`);
        tempReadToggle.setAttribute('data-id', `${i}`);
        NEW_CELL_FOUR.appendChild(tempReadToggle);

        let NEW_CELL_FIVE = document.createElement('td');
        NEW_ROW.appendChild(NEW_CELL_FIVE);
        let deleteBox = document.createElement('button')
        deleteBox.textContent = 'delete entry';
        deleteBox.classList.add(`delete-btn`);
        deleteBox.classList.add(`std-btn`);
        deleteBox.setAttribute('data-id', `${i}`);
        NEW_CELL_FIVE.appendChild(deleteBox);


    }
    const deleteBtns = document.querySelectorAll('.delete-btn');
    deleteBtns.forEach(e => {
        e.addEventListener('click', () => {
            let bookIndexNum = e.dataset.id;
            myLibrary.splice(bookIndexNum, 1);
            tableCompile(myLibrary);
        }
        )
    })
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    toggleBtns.forEach(e => {
        e.addEventListener('click', () => {
            let bookIndexNum = e.dataset.id;
            myLibrary[bookIndexNum].toggleRead()
            tableCompile(myLibrary);
        }
        )
    })
}

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

//*******************************

const SUBMIT_BOOK = document.getElementById('form-submit')
const TITLE_INPUT = document.getElementById('title')
const AUTHOR_INPUT = document.getElementById('author')
const PAGES_INPUT = document.getElementById('pages')
const READ_INPUT = document.getElementById('read')

SUBMIT_BOOK.addEventListener('click', e => {
    //if author invalid, add validation message
    //if title invalid or blank, add validation message
    ///if pages blank, add validation message
    let tempBook = new Book(e.path[3][0].value, e.path[3][1].value, 
        e.path[3][2].value);
    if (READ_INPUT.checked) {tempBook.toggleRead()};
    addBookToLibrary(tempBook);
    closeModal();
    //reset the form so it is blank
    TITLE_INPUT.value = "";
    AUTHOR_INPUT.value = "";
    PAGES_INPUT.value = "";
    READ_INPUT.checked = false;
})