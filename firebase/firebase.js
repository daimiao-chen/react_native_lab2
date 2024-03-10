// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, set, ref, onValue, push, update } from "firebase/database";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkIESw3G7GUywRHQmV1ybHBV-txZc5kzs",
  authDomain: "reactnativeadv.firebaseapp.com",
  projectId: "reactnativeadv",
  storageBucket: "reactnativeadv.appspot.com",
  messagingSenderId: "224285463861",
  appId: "1:224285463861:web:72d4eb2dd027741350a87c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const db = getDatabase(app);

export const addTask = (task) => {
  const newTaskRef = push(ref(db, 'task'));
  set(newTaskRef, {
    task: task,
    taskStatus: 'due'
  });
}

export const deleteTask = (id) => {
  set(ref(db, 'task/' + id), null);
}

export const updateTask = (id, taskStatus) => {
  update(ref(db, 'task/' + id), {
    taskStatus: taskStatus
  });
}

export const getTasks = (dispatch) => {
  const tasksRef = ref(db, 'task');
  onValue(tasksRef, (snapshot) => {
    console.log('getTasks');
    console.log(snapshot.val());
    console.log("finished getTasks")
    const data = snapshot.val();
    const todo_list = [];
    for (let id in data) {
      todo_list.push({id, ...data[id]});
    }
    try {
      dispatch(todo_list);
    } catch (error) {
      console.log(error);
    }
  });
}


