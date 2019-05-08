const todoList = document.querySelector('#todo-item');
const form = document.querySelector('#todo-form');

//render the data to front end
const renderItem = doc => {
    let li = document.createElement('li');
    let item = document.createElement('b');
    let time = document.createElement('h5');
    //cross mark to delete the task from database
    let del = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    item.textContent = doc.data().Task;
    time.textContent = doc.data().Priority;
    del.textContent = 'x'

    li.appendChild(item)
    li.appendChild(time)
    li.appendChild(del)

    todoList.appendChild(li)

    //To delete the data from database
    del.addEventListener('click', e => {
        //get the unique data-id of entry from firebase
        let id = e.target.parentElement.getAttribute('data-id');
        //delete the record with the data-id
        db.collection('tasks').doc(id).delete()
    })
}

// Get the data from database
db.collection('tasks').get().then( snapshot => {
    snapshot.docs.forEach( doc => {
        renderItem(doc)
    })
}) 

//save the data into database
form.addEventListener('submit', e => {
    e.preventDefault() //To prevent page reloading
    db.collection('tasks').add({
        Task: form.task.value,
        Priority: form.priority.value
    })
    form.task.value = '';
    form.priority.value = '';
})