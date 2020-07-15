let User = loggedUser.getFromDB()


window.addEventListener('load', function(){
    pageLoad()
})


const pageLoad = () =>{
    let specificUserDB = new CreateBookDB(User.name)
    let data = specificUserDB.allData()
    let display = document.getElementById('result')
    display.innerHTML = ""
    display.innerHTML += `<div class="col-lg-12 col-md-12 col-sm-12">
        <div class="card w-75" id="dp">
            <div class="d-flex justify-content-between">
                <i class="fa fa-user mt-2 ml-1 rounded-circle bg-white  pl-2" style="font-size:24px"></i>
                <div class="card-title mt-2 pr-2 ml-3 mr-2">Hi! ${User.fullName}</div>
            </div>
        </div>
        <i class="fa fa-arrow-left text-white mt-3" onclick="goBack()" aria-hidden="true"></i>
    </div>`

    moreInfo = document.getElementById("more_info")
    moreInfo.innerHTML = ""
    if(data[1] === undefined){
        moreInfo.innerHTML +=`<div class="col-lg-12 col-md-12 col-sm-12">
        <div class="card">
            <h5 class="card-title mt-2 ml-2"><u>Offer</u></h5>
            <div class="card-body d-flex justify-content-between py-1">
                <p class="mb-2">no offers</p>
            </div>
        </div>
        </div>`
    }
    else{
        var colDiv = document.createElement('div')
        colDiv.setAttribute('class', "col-lg-12 col-md-12 col-sm-12")
        var cardDiv = document.createElement('div')
        cardDiv.setAttribute('class', 'card')
        var titleCard = document.createElement('h5')
        titleCard.setAttribute('class', 'card-title mt-2 ml-2')
        titleCard.innerHTML += `<u>Offer</u>`
        cardDiv.append(titleCard)
        let bodyDiv;
        for (var i = 0; i < data[1].offer.length; i++){
            var temp = data[1].offer
            // console.log(temp)
            bodyDiv = document.createElement('div')
            bodyDiv.setAttribute('class', 'card-body d-flex justify-content-between py-1')
            bodyDiv.innerHTML += `<p class="mb-2">${temp[i].book}</p>
            <i class="fa fa-trash mt-1 text-danger" aria-hidden="true" onclick="deleteBook(${i})"></i>`
            cardDiv.append(bodyDiv)
        }
        
        colDiv.append(cardDiv)
        moreInfo.append(colDiv)
    }

}


const goBack = () => {
    setTimeout(function () {
        location.href = "../html/userHomepage.html"
    }, 500)
}


const deleteBook = (number) =>{
    console.log(number)
    let specificUserDB = new CreateBookDB(User.name)
    let data = specificUserDB.allData()
    let books = data[1].offer
    let temp = [...books]
    // console.log(temp.splice(number,1))
    console.log(temp)
    specificUserDB.rmBooks()
    temp.splice(number, 1)
    temp.map((ele) =>{
        specificUserDB.offer(ele)
    })
    pageLoad()
}