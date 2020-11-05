let User = loggedUser.getFromDB();
// console.log(User)
let specificUserDB = new CreateBookDB(User.name);
let time = Date().split("").slice(0, 24).join("");
specificUserDB.activity(time);
let wlMsg = document.getElementById("wl_msg");
wlMsg.innerText = "Hi!" + "  " + User.fullName;

// CreateBookDB to CreateBookDB

window.addEventListener("load", function () {
  let form = document.querySelector("form");
  form.addEventListener("submit", postBooks);
  preRequisite();
});

const preRequisite = () => {
  let userNos = usersDetails.allData();
  for (let i = 0; i < userNos.length; i++) {
    let name = userNos[i].name;
    let specificUserDB = new CreateBookDB(name);
    let books = specificUserDB.allData();
    if (books.length > 1) {
      getBooks();
      break;
    } else {
      continue;
    }
  }
  let rld = document.getElementById("rld");
  rld.addEventListener("click", function () {
    setTimeout(function () {
      getBooks();
    }, 1000);
  });
};

const postBooks = () => {
  event.preventDefault();
  let data = new FormData(event.target);
  let book = data.get("book");
  let description = data.get("description");
  let genre = data.get("genre");
  let location = data.get("location");
  let picture = data.get("picture");
  let picPsd = imgProcess(picture);
  let uniQueNumber = createUN();
  let dataObj = {
    fullName: User.fullName,
    book: book,
    description: description,
    genre: genre,
    location: location,
    picture: picPsd.getAttribute("src"),
    uniqueNumber: uniQueNumber,
    bookHolderId: User.id,
    flag: true,
  };
  specificUserDB.offer(dataObj);
};

const imgProcess = (data) => {
  let imgUrl = URL.createObjectURL(data);
  let image = new Image(200);
  image.src = imgUrl;
  return image;
};

const createUN = () => {
  let number = Math.floor(10000000 + Math.random() * 90000000);
  return number;
};

const getBooks = () => {
  let display = document.getElementById("result");
  display.innerHTML = "";
  let userNos = usersDetails.allData();
  for (let i = 0; i < userNos.length; i++) {
    let name = userNos[i].name;
    if (name === User.name) {
      continue;
    } else {
      let specificUserDB = new CreateBookDB(name);
      let books = specificUserDB.allData();
      if (books[1] === undefined) {
        continue;
      } else {
        for (var j = 0; j < books[1].offer.length; j++) {
          if (books[1].offer[j].flag === false) {
            continue;
          } else {
            renderDOM(books[1].offer[j], userNos[i].id);
          }
        }
      }
    }
  }
};

const renderDOM = (data, id) => {
  // console.log(data, name)
  let display = document.getElementById("result");
  display.innerHTML += `<div class="card mt-3 shadow book_cards gradBg flex-row flex-wrap" onclick="goToBook(${data.uniqueNumber}, ${id})">
        <div class="card-header border-0">
            <img src="../Resources/book.jpg" alt="bookImage" class="img_flt border rounded">
        </div>
        <div class="card-block px-2">
            <h5 class="card-title mt-2">${data.book}</h5>
        </div>
    </div>`;
};

const goToBook = (number, id) => {
  let userDatas = usersDetails.allData();
  let specificUserDB = new CreateBookDB(userDatas[id - 1].name);
  let book = specificUserDB.allData();
  let temp = book[1].offer;
  let passingData;
  for (var i = 0; i < temp.length; i++) {
    if (temp[i].uniqueNumber === number) {
      passingData = temp[i];
      break;
    }
  }
  selectedBook.addToDB(passingData);
  setTimeout(function () {
    location.href = "../html/book.html";
  }, 500);
};

const logout = () => {
  window.location.reload(true);
  window.location.replace("../html/login.html");
};

const profile = () => {
  setTimeout(function () {
    location.href = "../html/profilePage.html";
  }, 500);
};
