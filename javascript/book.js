window.addEventListener('load', function(){
    let chosenBook = selectedBook.getFromDB()
    pageLoad(chosenBook)

})

const pageLoad = (data) => {
    let display = document.getElementById('result')
    display.innerHTML = ""
    let allUsers = usersDetails.allData()
    let uInfo = document.getElementById('info')
    uInfo.innerHTML = ""
    uInfo.innerText = 'Contact: ' + allUsers[data.bookHolderId - 1].email

    display.innerHTML += `<div class="col-lg-12 col-md-12 col-sm-12" id="box_1">
        <div class="d-flex">
            <i class="fa fa-user m-2 rounded-circle bg-white p-2" style="font-size:24px"></i>
            <div class="mt-3 text-white">Book offered by ${data.fullName}</div>
        </div>
        <img src="../Resources/innerBook.jpg" alt="innerBook" class="innerBook d-block d-sm-none rounded-top">
        <img src="../Resources/innerBook.jpg" alt="innerBook" class="innerBook w-100 h-25 d-none d-md-block d-lg-block rounded-top">
    </div>
    <div class="col-lg-12 col-md-12 col-sm-12" id="box_2">
        <div class="card border-top-0">
            <div class="card-body">
            <div class='d-flex justify-content-between'>
                <h5 class="card-title">${data.book}</h5>
                <small>${data.location}</small>
            </div>
                <p class="card-text">${data.description}</p>
                <btn class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Request</btn>
            </div>
        </div>
        <i class="fa fa-arrow-left text-white mt-3" onclick="goBack()" aria-hidden="true"></i>
    </div>`
}


const goBack = () => {
    setTimeout(function () {
        location.href = "../html/userHomepage.html"
    }, 500)
}