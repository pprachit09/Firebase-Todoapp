const todoList = document.querySelector('#todo-item');

//render the data to front end
const renderItem = doc => {
    let li = document.createElement('li');
    let item = document.createElement('b');
    let time = document.createElement('h5');

    li.setAttribute('data-id', doc.id);
    item.textContent = doc.data().Task;
    time.textContent = doc.data().Time.seconds;

    li.appendChild(item)
    li.appendChild(time)

    todoList.appendChild(li)
}

// Get the data from database
db.collection('tasks').get().then( snapshot => {
    snapshot.docs.forEach( doc => {
        renderItem(doc)
    })
}) 