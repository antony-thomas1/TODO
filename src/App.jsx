import React, { useEffect, useState } from 'react'
import Title from './components/Title'
import "./App.css"
import AddTodo from './components/AddTodo'
import Footer from './components/Footer'
import Todo from './components/TodoList'
import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from './firebase'

const App = () => {

  const [todos, setTodos] = useState([]);
  const [totalTodos, setTotalTodos] = useState('');
  const [completedTodos, setCompletedTodos] = useState('');
  
  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let todosArray = [];
      let completedCount = 0;
      querySnapshot.forEach((doc) => {
        const todo = { ...doc.data(), id: doc.id };
        todosArray.push(todo);
        if (todo.completed) {
          completedCount++;
        }
      });
      setTodos(todosArray);
      setTotalTodos(todosArray.length);
      setCompletedTodos(completedCount);
    });
    return () => unsub();
  }, []);

  const handleEdit = async (todo, title) => {
    await updateDoc(doc(db, 'todos', todo.id), { title: title });
  };

  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed
    })
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'todos', id));
  };


  return (
    <div className='App'>
      <div>
        <Title/>
      </div>
      <div className='App_container'>
        <div>
          <div>
            <AddTodo/>
          </div>
          <div className='todo_container'>
            {todos.map((todo) => (
              <Todo
                key={todo.id}
                todo={todo}
                toggleComplete={toggleComplete}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            ))}
          </div>
        </div>
        <div>
          <div>
            <p className='p1'>{totalTodos}</p>
            <p className='p2'>Total todos</p>
          </div>
          <div>
            <p className='p1'>{completedTodos}</p>
            <p className='p2'>Completed Todos</p>
          </div>
        </div>
      </div>
      
      <div className='footer'>
        <Footer/>
      </div>
    </div>
  )
}

export default App