
// Database for registered users (to get and store )
function CreateUsersDB(name){

    this.name = name

    this.init = function(){
        let result = JSON.parse(localStorage.getItem(this.name))
        if(!result){
            this.updateDB([])
        }
    }

    this.updateDB = function(data){
        localStorage.setItem(this.name,JSON.stringify(data))
    }

    this.allData = function(){
        this.init()
        return JSON.parse(localStorage.getItem(this.name))
    }

}


CreateUsersDB.prototype.create = function (userData){
    let userDatas = this.allData()
    if(userDatas.length === 0){
        userData['id'] = 1
        userData['flag'] = true
    }
    else{
        userData['id'] = userDatas[userDatas.length - 1]['id'] + 1
        userData['flag'] = true
    }
    userDatas.push(userData)
    this.updateDB(userDatas)
}



// the current user details
function CurrentUserOrBook(name){

    this.name = name

    this.init = function(){
        var res = JSON.parse(localStorage.getItem(this.name))
        if (!res) {
            this.updateDB({})
        }
    }

    this.updateDB = function(data) {
        localStorage.setItem(name, JSON.stringify(data))
    }
}


CurrentUser.prototype.addToDB = function(data){
    this.updateDB(data)
}

CurrentUser.prototype.getFromDB = function(){
    return JSON.parse(localStorage.getItem(this.name))
}




// Database for individual user offered books
function CreateBookDB(name){
    this.name = name

    this.init = function(){
        let result = JSON.parse(localStorage.getItem(this.name))
        if(!result){
            this.updateDB([])
        }
    }

    this.updateDB = function(data){
        localStorage.setItem(this.name, JSON.stringify(data))
    }

    this.allData = function(){
        this.init()
        return JSON.parse(localStorage.getItem(this.name))
    }

}


CreateBookDB.prototype.offer = function(postBook){
    let data = this.allData()
    if(data.length === 1){
        let offerData = {
            offer:[postBook]
        }
        data.push(offerData)
        this.updateDB(data)
    }
    else{
        data[1].offer.push(postBook)
        this.updateDB(data)
    }
}




let usersDetails = new CreateUsersDB ("AllUsers")
let loggedUser = new CurrentUserOrBook('User')
let selectedBook = new CurrentUserOrBook('Book')

let admin = {name:'diffuser', password:"block"}
