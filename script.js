const bookList = [
  {
    author: "Chinua Achebe",
    country: "Nigeria",
    imageLink: "images/things-fall-apart.jpg",
    language: "English",
    link: "https://en.wikipedia.org/wiki/Things_Fall_Apart\n",
    pages: 209,
    title: "Things Fall Apart",
    year: 1958,
  },
  {
    author: "Hans Christian Andersen",
    country: "Denmark",
    imageLink: "images/fairy-tales.jpg",
    language: "Danish",
    link: "https://en.wikipedia.org/wiki/Fairy_Tales_Told_for_Children._First_Collection.\n",
    pages: 784,
    title: "Fairy tales",
    year: 1836,
  },
  {
    author: "Dante Alighieri",
    country: "Italy",
    imageLink: "images/the-divine-comedy.jpg",
    language: "Italian",
    link: "https://en.wikipedia.org/wiki/Divine_Comedy\n",
    pages: 928,
    title: "The Divine Comedy",
    year: 1315,
  },
  {
    author: "Unknown",
    country: "Sumer and Akkadian Empire",
    imageLink: "images/the-epic-of-gilgamesh.jpg",
    language: "Akkadian",
    link: "https://en.wikipedia.org/wiki/Epic_of_Gilgamesh\n",
    pages: 160,
    title: "The Epic Of Gilgamesh",
    year: -1700,
  },
  {
    author: "Unknown",
    country: "Achaemenid Empire",
    imageLink: "images/the-book-of-job.jpg",
    language: "Hebrew",
    link: "https://en.wikipedia.org/wiki/Book_of_Job\n",
    pages: 176,
    title: "The Book Of Job",
    year: -600,
  },
  {
    author: "Unknown",
    country: "India/Iran/Iraq/Egypt/Tajikistan",
    imageLink: "images/one-thousand-and-one-nights.jpg",
    language: "Arabic",
    link: "https://en.wikipedia.org/wiki/One_Thousand_and_One_Nights\n",
    pages: 288,
    title: "One Thousand and One Nights",
    year: 1200,
  },
  {
    author: "Unknown",
    country: "Iceland",
    imageLink: "images/njals-saga.jpg",
    language: "Old Norse",
    link: "https://en.wikipedia.org/wiki/Nj%C3%A1ls_saga\n",
    pages: 384,
    title: "Njell's Saga",
    year: 1350,
  },
  {
    author: "Jane Austen",
    country: "United Kingdom",
    imageLink: "images/pride-and-prejudice.jpg",
    language: "English",
    link: "https://en.wikipedia.org/wiki/Pride_and_Prejudice\n",
    pages: 226,
    title: "Pride and Prejudice",
    year: 1813,
  },
  {
    author: "Fyodor Dostoevsky",
    country: "Russia",
    imageLink: "images/crime-and-punishment.jpg",
    language: "Russian",
    link: "https://en.wikipedia.org/wiki/Crime_and_Punishment\n",
    pages: 551,
    title: "Crime and Punishment",
    year: 1866,
  },
];

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

const Book = class {
  constructor({ title, author, pages, read = false }) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.color = generateRandomColor();
  }

  info = () => {
    return {
      title: this.title,
      author: this.author,
      pages: this.pages,
      read: this.read,
    };
  };

  toggleRead = () => (this.read = !this.read);
};

const myLibrary = bookList.map((book) => {
  return new Book({
    title: book.title,
    author: book.author,
    pages: book.pages,
    read: Math.random() > 0.5 ? true : false,
  });
});

const createCard = (book, id) => {
  const div = document.createElement("div");
  div.dataset.id = id;
  div.classList.add("card");
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
        myLibrary[id].toggleRead();
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

  const newBook = new Book({
    title: newFormData.get("bookTitle"),
    author: newFormData.get("bookAuthor"),
    pages: newFormData.get("bookPages"),
    read: newFormData.get("bookIsRead") === "true" ? true : false,
  });
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
