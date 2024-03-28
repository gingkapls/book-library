const colorPalette = [
  "#FFEBEE",
  "#FCE4EC",
  "#F3E5F5",
  "#EDE7F6",
  "#E8EAF6",
  "#E3F2FD",
  "#E1F5FE",
  "#E0F7FA",
  "#E0F2F1",
  "#E8F5E9",
  "#F1F8E9",
  "#F9FBE7",
  "#FFF8E1",
  "#FFFDE7",
  "#FFF3E0",
  "#FBE9E7",
  "#EFEBE9",
];

const generateRandomColor = () =>
  colorPalette.at(Math.floor(Math.random() * colorPalette.length));

function Book(title, author, pages, read = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.color = generateRandomColor();
}

Book.prototype.info = function () {
  // return `${this.title} by ${this.author}, ${this.pages} pages, ${
  // this.read ? "read" : "not read yet"
  // }`;

  return {
    title: this.title,
    author: this.author,
    pages: this.pages,
    read: this.read,
  };
};

const myLibrary = [
  new Book("The Hobbit", "J.R.R Tolkien", 296, true),
  new Book("The Rabbit", "R.R Man", 392, false),
  new Book("The Wabbit", "M.R Falken", 255, false),
  new Book("The Jammit", "J. Tol", 142, true),
  new Book("The Jammit", "J. Tol", 142, true),
  new Book("The Jammit", "J. Tol", 142, true),
  new Book("The Jammit", "J. Tol", 142, true),
  new Book("The Jammit", "J. Tol", 142, true),
];

const createCard = (book, id) => {
  const div = document.createElement("div");
  div.dataset.id = id;
  div.style.backgroundColor = book.color;
  const table = document.createElement("table");
  const tbody = document.createElement("tbody");
  table.appendChild(tbody);
  div.appendChild(table);

  const btnDelete = document.createElement("button");
  btnDelete.classList.add("btn-close", "btn-delete-book");
  btnDelete.textContent = "x";
  btnDelete.addEventListener("click", (event) => {
    if (!confirm("Do you want to delete this book?")) return;
    myLibrary.splice(id, 1);
    renderLibrary();
    console.log(`deleted book ${id}`);
  });

  div.appendChild(btnDelete);

  let tr, td, checkbox;
  div.classList.add("card");

  for (const key in book.info()) {
    // Category names
    tr = document.createElement("tr");
    td = document.createElement("td");
    td.textContent = key.charAt(0).toUpperCase() + key.substring(1);
    tr.appendChild(td);

    // Category values
    td = document.createElement("td");
    if (key === "read") {
      checkbox = document.createElement("input");
      checkbox.setAttribute("type", "checkbox");

      const stateCheckbox =
        myLibrary[id].read === true ? "checked" : "unchecked";

      checkbox.setAttribute(stateCheckbox, stateCheckbox);

      checkbox.addEventListener("change", () => {
        // console.log(`toggling status of book ${id}`);
        // console.log(`before: ${myLibrary[id].read}`);
        myLibrary[id].read = !myLibrary[id].read;
        // console.log(`after: ${myLibrary[id].read}`);
      });

      td.appendChild(checkbox);
    } else {
      td.textContent = book[key];
    }
    tr.appendChild(td);
    tbody.appendChild(tr);
  }

  return div;
};

const renderLibrary = () => {
  libraryContainer.replaceChildren();

  myLibrary.forEach((book, index) => {
    const card = createCard(book, index);
    libraryContainer.appendChild(card);
  });
};

const validateForm = (formData) => {
  if (formData.get("bookAuthor") === "" || formData.get("bookTitle") === "")
    return false;

  let pages = formData.get("bookPages");
  formData.set("bookPages", pages.replaceAll(/\D/g, ""));
  return true;
};

const addToLibrary = (event) => {
  event.preventDefault();
  const form = document.querySelector("#form-book-add");
  const newFormData = new FormData(form);

  if (!validateForm(newFormData)) {
    alert("Required fields are empty");
    return;
  }

  const newBook = new Book(
    (title = newFormData.get("bookTitle")),
    (author = newFormData.get("bookAuthor")),
    (pages = newFormData.get("bookPages")),
    (read = newFormData.get("bookIsRead") === "true" ? true : false)
  );
  myLibrary.push(newBook);
  form.reset();
  dialogAddBook.close();
  renderLibrary();
};

const btnOpenDialog = document.querySelector("#btn-show-dialog");
const btnCloseDialog = document.querySelector("#btn-close-dialog");
const dialogAddBook = document.querySelector("#dialog-add-book");
const libraryContainer = document.querySelector("#library-container");

btnOpenDialog.addEventListener("click", () => dialogAddBook.showModal());
btnCloseDialog.addEventListener("click", () => dialogAddBook.close());

// dialogAddBook.showModal();

const btnBookAdd = document.querySelector("#btn-book-add");
btnBookAdd.addEventListener("click", addToLibrary);

renderLibrary();
