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
    document.getElementById('milk')?.addEventListener('submit', (event) => {
        event.preventDefault(); // this prevents the standard action that is taken when certain things happen. 
                                // Forms automatically send stuff to the server when submitted, and redirect to a new page.
                                // We don't want that.
const pageName = document.body.dataset.pageName; 
        let form = document.getElementById('milk');
        let formData = new FormData(form);                   // find the form, and transform the data inside of it.

        formData.append('page_name', pageName)
        formData.append('author_name', document.getElementById('author_name').value)
        formData.append('message', document.getElementById('message').value)

        fetch('/api/insert_comments', {
            method: 'POST',
            body: formData,
        }) 
        .then(response => response.json())
        .then(data => {
            if (data.status == 'success') {
            
              console.log(data.message);
            }
            else {
              console.error(data.message);
            }
        })
        .catch(error => {
            console.error(error);
        })
    });