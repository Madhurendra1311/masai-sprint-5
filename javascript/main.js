
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


let users = new CreateUsersDB ("Users")

let admin = {name:'diffuser', password:"block"}
