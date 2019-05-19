//listen for the lgoin and logout events
auth.onAuthStateChanged( user => {
    if(user){
        console.log(`logged in as ${user.email}`);
        db.collection('users').where("User", "==", user.uid).onSnapshot( snapshot => {
            let detectChange = snapshot.docChanges();
            detectChange.forEach(change => {
                if (change.type == 'added') {
                    renderItem(change.doc);
                }else if(change.type == 'removed'){
                    let li = todoList.querySelector('[data-id='+ change.doc.id +']');
                    todoList.removeChild(li);
                }
            })        
        })

        //save the data into database
        form.addEventListener('submit', e => {
            e.preventDefault() //To prevent page reloading
            db.collection('users').add({
                User: user.uid,
                Task: form.task.value,
                Priority: form.priority.value,
            })
            form.task.value = '';
            form.priority.value = '';
        })

    }
    else{
        console.log('logged out');
    }
})

const todoList = document.querySelector('#todo-item');
const form = document.querySelector('#todo-form');

//render the data to front end
const renderItem = doc => {
    let li = document.createElement('li');
    let item = document.createElement('span');
    let priority = document.createElement('span')
    //cross mark to delete the task from database
    let del = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    item.textContent = doc.data().Task;
    priority.textContent  = doc.data().Priority;
    del.textContent = 'x'

    li.appendChild(item)
    li.appendChild(priority)
    li.appendChild(del)

    todoList.appendChild(li)

    //To delete the data from database
    del.addEventListener('click', e => {
        //get the unique data-id of entry from firebase
        let id = e.target.parentElement.getAttribute('data-id');
        //delete the record with the data-id
        db.collection('users').doc(id).delete()
    })
} 

//logout functionality
const logout = () => {
    auth.signOut().then( () => {
        console.log('user logged out')
        window.location.replace('index.html')
    })
}