window.addEventListener('load', function(){
    
})

const registerUser = () =>{
    event.preventDefault()
    let fullName = document.getElementById("full_name").value
    let userEmail = document.getElementById("email").value
    let userPassword = document.getElementById("password").value
    let userNo = document.getElementById("user_name").value
    if(userNo === "" || userPassword === "" || userPassword === "" || fullName === ""){
        alert('All the inputs must be filled')
    }
    else{
        let userData = {
            name:userNo,
            fullName:fullName,
            password:hash(userPassword),
            email:userEmail
        }
        let flag = false
        let userDatas = usersDetails.allData()
        if(!userDatas.length){
            let count = 1
            console.log(userData, count)
            usersDetails.create(userData)
        }
        else if (userDatas.length > 0){
            for (var i = 0; i < userDatas.length; i++){
                if (userDatas[i].name === userData.name){
                    alert('The userNo is not available')
                }
                else if (userDatas[i].email === userData.email){
                    alert('The email is already used')
                }
                else if(i === userDatas.length - 1){
                    flag = true
                    break
                }
            }
            if(flag){
                usersDetails.create(userData)
            }
            
        }
    }
}


const loginUser = () => {
    event.preventDefault()
    let userDatas = usersDetails.allData()
    let userName = document.getElementById("login_user_name").value
    let userPassword = document.getElementById("login_user_password").value
    if(userName === "" || userPassword === ""){
        alert('All the input must be filled')
    }
    else if(userName === admin.name && userPassword === admin.password)(
        setTimeout(function () {
            location.href = "../html/admin.html"
        }, 500)
    )
    else{
        let userData = {
            name:userName,
            password:userPassword,
        }
        for (var i = 0; i < userDatas.length; i++){
            if(userDatas[i].email === userData.name && userDatas[i].password !== hash(userData.password)){
                alert('Wrong Password')
            }
            else if (userDatas[i].email === userData.name && userDatas[i].password === hash(userData.password)){
                if(userDatas[i].flag === true){
                    loggedUser.addToDB(userDatas[i])
                    setTimeout(function () {
                        location.href = "../html/userHomePage.html"
                    }, 500)
                    break
                }
                else{
                    alert('You are blocked')
                    break
                }
            }
            else if(i === userDatas.length - 1){
                alert('Please register')
            }
        }
    }
}

// userName chg to userNo

const hash = (password) =>{
    password = password+""
    // console.log(data)
    let result = encrypt(0, password.length - 1, password)
    return result
}

const encrypt = (first, last, string) => {
    // console.log(string)
    if(first === last){
        return string[first]
    }
    else if(first <= last){
        var middle = Math.floor((first + last)/ 2)
        return string[middle] + encrypt(first, middle - 1, string) + encrypt(middle + 1, last, string)
    }
    else{
        return ""
    }
}