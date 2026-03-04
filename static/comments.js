// separate function 

function displayComment(container, comment) { 

    let element = document.createElement('div'); 

    element.innerHTML = ` 

        <li class='comment'> 

            "${comment.message}"<br>
            -${comment.author_name} <br>

        </li> 

    `; 

    container.append(element); 

} 
 function loadStuff(arg1) {
    fetch(`/api/get_comments?page=${arg1}`)
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
               // into the "if (data.status === 'success') {" part 

list = document.getElementById('comment-container'); 

              list.innerHTML = ''; 

                  data.comments.forEach(comment => { 

                  displayComment(list, comment); 

                  }); 
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
 

document.addEventListener('DOMContentLoaded', () => { 

    const pageName = document.body.dataset.pageName;   

    if (pageName) { 

        loadStuff(pageName); 

    } 

}); 