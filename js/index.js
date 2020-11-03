document.addEventListener("DOMContentLoaded", function() {
    const bookList = document.querySelector("#list")
    const showPanel = document.querySelector("#show-panel")

    function getBooks(){
        return fetch("http://localhost:3000/books")
        .then(resp => resp.json())
        .then(books => renderBooks(books))
    }

    function renderBook(book){
        const li = document.createElement("li")
        li.textContent = book.title
        li.dataset.id = book.id
        bookList.append(li)

        li.addEventListener("click", function(){
            const card = document.createElement("div")
        card.dataset.id = book.id

        const thumbnail = document.createElement("img")
        thumbnail.src = book.img_url

        const description = document.createElement("p")
        description.textContent = book.description

        const likeBtn = document.createElement("button")
        likeBtn.classList.add("like-btn")
        likeBtn.textContent = "Like"
        
        const likersList = document.createElement("ul")
        likersList.classList.add("likers-list")
        

        likeBtn.addEventListener("click", function(event){
            const users = book.users
            users.push({
                "id": 1,
                "username": "pouros"
            })
           
            
            return fetch(`http://localhost:3000/books/${book.id}`,{
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'accepts': 'application/json'
                },
                body: JSON.stringify({
                    users
                })
            })
            .then(response => response.json)
            .then(function(){
                const likerLi = document.createElement("li")
                likerLi.dataset.id = 1
                likerLi.textContent = "pouros"
                likersList.append(likerLi)
                console.log(likerLi)
            })
        })

        
        book.users.forEach(liker =>{
            const likerLi = document.createElement("li")
            likerLi.dataset.id = liker.id
            likerLi.textContent = liker.username
            likersList.append(likerLi)
        })

        card.append(thumbnail, description, likersList, likeBtn)
        showPanel.append(card)
        })
    }

    function renderCard(book){
        
    }

    function likeBook(book){
       

    }

    function renderBooks(books){
        books.forEach(renderBook)
    }



    getBooks()

});
