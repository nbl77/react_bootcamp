import React, {
	useState
} from 'react';
import {
	useSelector
} from 'react-redux';
import {
	useFirebaseConnect,
	isLoaded,
	useFirebase,
	isEmpty
} from 'react-redux-firebase';

function App() {
	const firebase = useFirebase();
	useFirebaseConnect( [ {
		path: "todos"
	} ] )
	let todos = useSelector( state => state.firebase.ordered.todos );
	const [ todo, setTodo ] = useState( "" );
	const handleChange = e => { //save data to state
		switch ( e.target.name ) {
		case "todo":
			setTodo( e.target.value );
			break;
		}
	}
	const addTodo = _ => { // Add Data
		const todoData = {
			text: todo
		}
		setTodo( "" );
		return firebase.push( 'todos', todoData, _ => alert( "Berhasil menambah data" ) );
	}
	if ( !isLoaded( todos ) ) {
		return <h1>Loading...</h1>
	}
	if ( isEmpty( todos ) ) {
		todos = [];
	}
	const deleteTodo = e => {
		const key = e.target.value;
		firebase.remove( `todos/${key}`, _ => alert( "Berhasil menghapus data" ) )
	}
	const editHandler = e => {
		const key = e.target.value;
		const val = document.querySelector( `#todo-${key}` )
			.value;
		const todoData = {
			text: val
		}
		firebase.update( `todos/${key}`, todoData, _ => alert( "Berhasil Merubah data" ) );
	}
	return (
		<div>
      <h1>Selamat Datang</h1>
      {todos.length < 1 ? <h4>Data Kosong</h4> : null}
      {todos.map(item=>(
        <li key={item.key}>
          {item.value.text}
          <button onClick={deleteTodo} value={item.key}>Hapus</button>
          <input type="text" defaultValue={item.value.text} id={`todo-${item.key}`}/>
          <button onClick={editHandler} value={item.key}>Edit</button>
        </li>
      ))}
      <hr/>
      <input type="text" value={todo} onChange={handleChange} name="todo"/>
      <button onClick={addTodo}>Add Todo</button>
    </div>
	);
}
export default App;
