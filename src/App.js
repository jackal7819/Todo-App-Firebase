import { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import Todo from './components/Todo';
import { database } from './components/firebase';
import {
    query,
    collection,
    onSnapshot,
    updateDoc,
    doc,
    addDoc,
    deleteDoc,
} from 'firebase/firestore';

const App = () => {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');

    // Create todo
    const createTodo = async (e) => {
        e.preventDefault(e);
        if (input === '') {
            alert('Please enter a valid todo');
            return;
        }
        await addDoc(collection(database, 'todos'), {
            text: input,
            completed: false,
        });
        setInput('');
    };

    // Read todo from firebase
    useEffect(() => {
        const queryData = query(collection(database, 'todos'));
        const unsubscribe = onSnapshot(queryData, (querySnapshot) => {
            let todosArr = [];
            querySnapshot.forEach((doc) => {
                todosArr.push({ ...doc.data(), id: doc.id });
            });
            setTodos(todosArr);
        });
        return () => unsubscribe();
    }, []);

    // Update todo in firebase
    const toggleComplete = async (todo) => {
        await updateDoc(doc(database, 'todos', todo.id), {
            completed: !todo.completed,
        });
    };

    // Delete todo
    const deleteTodo = async (id) => {
        await deleteDoc(doc(database, 'todos', id));
    };

    return (
        <div className='h-screen w-screen p-4 bg-gradient-to-r from-[#784BA0] to-[#2B86C5]'>
            <div className='bg-slate-200 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4'>
                <h3 className='text-3xl font-bold text-center text-gray-800 p-2'>
                    Todo App
                </h3>
                <form onSubmit={createTodo} className='flex justify-between'>
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className='border p-2 w-full text-xl'
                        type='text'
                        placeholder='Add Todo'
                    />
                    <button className='border p-4 ml-2 bg-purple-500 text-slate-200'>
                        <FaPlus size={28} />
                    </button>
                </form>
                <ul>
                    {todos.map((todo, index) => (
                        <Todo
                            key={index}
                            todo={todo}
                            toggleComplete={toggleComplete}
                            deleteTodo={deleteTodo}
                        />
                    ))}
                </ul>
                {todos.length < 1 ? null : (
                    <p className='text-center p-2'>
                        You have {todos.length}{' '}
                        {todos.length === 1 ? 'todo' : 'todos'}
                    </p>
                )}
            </div>
        </div>
    );
};

export default App;
