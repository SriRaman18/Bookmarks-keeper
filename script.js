const addbtn = document.querySelector(".add");
const modal = document.querySelector(".modal");

const closemodalbtn = document.querySelector(".close-modal");

const websitename = document.querySelector(".website-name");
const websiteurl = document.querySelector(".website-url");
const form = document.querySelector(".form");
const bookmarkcontainer = document.querySelector(".bookmark-container");

let bookmarks = [];

// show model and focus on input
addbtn.addEventListener("click", () => {
  modal.classList.add("active");
  websitename.focus();
});

//close modal
closemodalbtn.addEventListener("click", () => {
  modal.classList.remove("active");
});

//close the modal when user clicked outside modal
window.addEventListener("click", (e) => {
  e.target === modal ? modal.classList.remove("active") : false;
});

// build bookmarks
function buildbookmarks() {
  bookmarkcontainer.textContent = "";
  bookmarks.forEach((bookmark) => {
    const { name, url } = bookmark;
    const div = document.createElement("div");
    div.classList.add("bookmark");

    div.innerHTML = `
        <img
          src="https://s2.googleusercontent.com/s2/favicons?domain=${url}"
          alt="fevicon"
        />

        <a href="${url}" target="_blank"> ${name}</a>
        <i class="fa-solid fa-xmark xmark" onclick="deletebookmark('${url}')"></i>

      `;

    bookmarkcontainer.appendChild(div);
  });
}

// fetch bookmarks from local storage
function fetchbookmarks() {
  if (localStorage.getItem("bookmarks")) {
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  } else {
    bookmarks = [
      {
        name: "design",
        url: "http://designlap.com",
      },
    ];

    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }
  buildbookmarks();
}

// valitate form
function ValidityState(namevalue, urlvalue) {
  const expression =
    /(https)?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g;
  const regex = new RegExp(expression);
  if (!namevalue || !urlvalue) {
    alert("Please submit values for both fields.");
    return false;
  }
  if (!urlvalue.match(regex)) {
    alert("Please provide a valid web address.");
    return false;
  }
  // Valid
  return true;
}

//  delete bookmark
function deletebookmark(url) {
  bookmarks.forEach((bookmark, index) => {
    if (bookmark.url === url) {
      bookmarks.splice(index, 1);
    }
  });
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  fetchbookmarks();
}

function storebookmarks(e) {
  e.preventDefault();
  const namevalue = websitename.value;
  let urlvalue = websiteurl.value;

  if (!urlvalue.includes("http://", "https://")) {
    urlvalue = `https://${urlvalue}`;
  }

  // validate
  if (!ValidityState(namevalue, urlvalue)) {
    return false;
  }

  //create a bookmark object then add it to bookmarks array
  const bookmark = {
    name: namevalue,
    url: urlvalue,
  };

  bookmarks.push(bookmark);

  // set bookmarks in local storage , fetch. reset input field
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

  fetchbookmarks();
  form.reset();
  websitename.focus();
}

//event listener

form.addEventListener("submit", storebookmarks);

//on load, fetch bookmarks from local storage
fetchbookmarks();
