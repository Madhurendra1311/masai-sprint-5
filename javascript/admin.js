window.addEventListener('load', function(){
    loadPage()
})


const loadPage = () =>{
    let allUsers = users.allData()
    let display = document.getElementById('users')
    display.innerHTML = ""
    for (let i = 0; i < allUsers.length; i++){
        let clr = ''
        if(allUsers[i].flag === true){
            clr = 'text-danger'
        }
        else{
            clr = 'text-success'
        }
        display.innerHTML += `<div class="col-lg-6 col-md-6 col-sm-6 offset-lg-3 offset-md-3">
        <div class="card w-100 badge-pill p-2 mt-2" id="dp">
            <div class="d-flex justify-content-between">
                <div class="d-flex mt-2">
                    <i class="fa fa-user rounded-circle bg-secondary mr-2 p-2 ml-1 fa-lg mb-2" aria-hidden="true"></i>
                    <div class="card-title mt-1">${allUsers[i].name}</div>
                </div>
                <i class="fa fa-ban fa-lg ${clr} mt-3 mr-3" aria-hidden="true" onclick="block(${allUsers[i].id})"></i>
            </div>
        </div>
    </div>`
    }
}

const block = (id) =>{
    users.blockUser(id)
    let temp = event.target
    temp.removeAttribute('onclick')
    temp.removeAttribute('class')
    temp.setAttribute('onclick', 'unblock('+id+')')
    temp.setAttribute('class', "fa fa-ban fa-lg text-success mt-3 mr-3")
}

const unblock = (id) =>{
    users.unBlockUser(id)
    let temp = event.target
    temp.removeAttribute('onclick')
    temp.removeAttribute('class')
    temp.setAttribute('onclick', 'block('+id+')')
    temp.setAttribute('class', "fa fa-ban fa-lg text-danger mt-3 mr-3")
}


const logout = () =>{
    window.location.reload(true);
    window.location.replace('../html/homepage.html');
}