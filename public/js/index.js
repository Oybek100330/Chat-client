// const token = window.localStorage.getItem('token')
if(!token) window.location = '/login'

function createElements (...array) {
	return array.map(el => document.createElement(el))
}

async function renderUsers () {
    let users = await request('/users')
    const userNumber = window.localStorage.getItem('userId')
    const user = users.find(user => user.userId == userNumber)
    profileImg.setAttribute('src', hostname + user.profileImg)

    users = users.filter(user => user.userId != userNumber)
    let interId
    let usersRecorder = ''
    for (let user of users) {

        const [
            div1,
            div2,
            div3,
            img,
            div4,
            div5,
            div6,
            span1,
            div7,
            span2,
        ] = createElements('div', 'div', 'div', 'img', 'div', 'div', 'div', 'span', 'div', 'span')

        div1.className = 'row sideBar-body'
        div2.className = 'col-sm-3 col-xs-3 sideBar-avatar'
        div3.className = 'avatar-icon'
        img.setAttribute('src', hostname + user.profileImg)
        div4.className = 'col-sm-9 col-xs-9 sideBar-main'
        div5.className = 'row'
        div6.className = 'col-sm-8 col-xs-8 sideBar-name'
        span1.className = 'name-meta'
        span1.textContent = user.username
        div7.className = 'col-sm-4 col-xs-4 pull-right sideBar-time'
        span2.className = 'time-meta pull-right'
        span2.textContent = '18:20'

        div6.append(span1)
        div7.append(span2)
        div5.append(div6, div7)
        div4.append(div5)
        div3.append(img)
        div2.append(div3)
        div1.append(div2, div4)

        usersList.append(div1)
        // contacts.innerHTML(usersList)
        div1.onclick = () => {
            // if(interId)
            // clearInterval(interId)
            if(interId) clearInterval(interId)
            // console.log(interId);
            interId = setInterval(() => renderMessages(user.userId), 500)
            // clearInterval(interId, 5000)
            // console.log(interId);
        }

        
        // let userStr = `
        //     <div onclick="
        //     const intervalId = setInterval( renderMessages(${user.userId}), 1000)

        //     clearInterval( intervalId )
        //         // renderMessages(${user.userId})
        //     " class="row sideBar-body">
        //         <div class="col-sm-3 col-xs-3 sideBar-avatar">
        //             <div class="avatar-icon">
        //                 <img src="${hostname + user.profileImg}">
        //             </div>
        //         </div>
        //         <div class="col-sm-9 col-xs-9 sideBar-main">
        //             <div class="row">
        //                 <div class="col-sm-8 col-xs-8 sideBar-name">
        //                     <span class="name-meta">${user.username}
        //                 </span>
        //                 </div>
        //                 <div class="col-sm-4 col-xs-4 pull-right sideBar-time">
        //                     <span class="time-meta pull-right">18:18
        //                 </span>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // `
        // usersRecorder += userStr
    }
    // usersList.innerHTML = usersRecorder
    // contacts.innerHTML = usersRecorder
    // console.log(users)
}

async function renderMessages(id){
    const users = await request('/users')
    const user = users.find(user => user.userId == id)
    onlineAvatarImage.setAttribute('src', hostname + user.profileImg)
    onlineAvatarName.textContent = user.username

    const userNumber = window.localStorage.getItem('userId')
    const messageto = id

    let messages = await request('/messages')
    messagesList.innerHTML = null
    let messageRecorder = `
        <div class="row message-previous">
            <div class="col-sm-12 previous">
                <a onclick="previous(this)" id="ankitjain28" name="20">
                Show Previous Message!
                </a>
            </div>
        </div>
    `
    messages = messages.filter(message => (message.from == userNumber || message.from == messageto) && (message.to == userNumber || message.to == messageto))
    for (let message of messages) {
        const typer = (message.from == userNumber) ? 'sender' : 'receiver'
        let messageStr = `
            <div class="row message-body">
                <div class="col-sm-12 message-main-receiver">
                    <div class="${typer}">
                        <div class="message-text">
                            ${message.messageText || hostname + message.messageFile.filepath}
                        </div>
                        <span class="message-time pull-right">
                            ${message.data}
                        </span>
                    </div>
                </div>
            </div>
        `
        messageRecorder += messageStr
    }
    messagesList.innerHTML = messageRecorder
    sendButton.onclick = async () => {
        const newMessage = {
            to: messageto,
            messageText: inputMessage.value
        }
        let response = await request('/messages', 'POST', newMessage)
        // console.log(response);
        
    }
}



renderUsers()