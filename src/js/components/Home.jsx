import React, { useState } from "react";

//create your first component
const Home = () => {
	const [ inputValue, setInputValue ] = useState("")
	const [ todos, setTodos ] = useState([])
	const deleteTodo = (todoIndex) => {
		const newTodos = todos.filter((_, index) => index !== todoIndex);
		setTodos(newTodos);
	}
	return (
		<div className="container col-6">
			<h1 className="my-3">My Dynamic To-Do List</h1>
			<ul>
				<li>
					<input
						type="text"
						name="input"
						placeholder="What do you need to do?"
						onChange={(e) => setInputValue(e.target.value)}
						value={inputValue}
						onKeyDown={(e) => {
							if (e.key == "Enter" && e.target.value !== "") {
								setTodos(todos.concat(inputValue));
								setInputValue("");
							}
						}}
					></input>
				 </li>
				 {todos.map((todoItem, index) => (
					<li key={index}>
						<div className="d-flex justify-content-between align-items-center">
							<p>{todoItem}</p>
							<span className="fas fa-trash" onClick={() => deleteTodo(index)}></span>
						</div>
					</li>
				))}
			</ul>
			<div>Tasks to do: {todos.length}</div>
		</div>
	);

};

export default Home;