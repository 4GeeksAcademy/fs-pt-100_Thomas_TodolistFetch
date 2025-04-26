import React, { useState, useEffect } from "react";

const Home = () => {
	const [task, setTask] = useState("")
	const [data, setData] = useState([])

	useEffect(() => {
		getUserTodos()
	}, [])

	const userCreate = () => {
		fetch('https://playground.4geeks.com/todo/users/tmosley', {
			method: "POST"
		})
		.then(resp => {
			if (!resp.ok) throw new Error(`error code: ${resp.status}`)
			return resp.json()
		})
		.then(data => getUserTodos())
		.catch(err => console.log(err))
	}

	const getUserTodos = () => {
		fetch('https://playground.4geeks.com/todo/users/tmosley')
			.then(resp => {
				if (!resp.ok) throw new Error(`error code: ${resp.status}`)
				return resp.json()
			})
			.then(data => setData(data.todos))
			.catch(err => userCreate())
	}

	const handleSubmit = e => {
		e.preventDefault();
		fetch('https://playground.4geeks.com/todo/todos/tmosley', {
			method: "POST",
			body: JSON.stringify({label: task, is_done: false}),
			headers:{
				"Content-Type": "application/json"
			}
		})
		.then(resp => {
			if (!resp.ok) throw new Error(`error code: ${resp.status}`)
			return resp.json()
		})
		.then(data => {
			setTask("")
			getUserTodos()
		})
		.catch(err => console.log(err))
	}

	const deleteTodo = (todoIndex) => {
		const newTodos = data.filter((_, index) => index !== todoIndex);
		setData(newTodos);
	}


	return (
		<div className="container col-6">
			<h1 className="my-3">My Dynamic To-Do List</h1>
			<form onSubmit={handleSubmit}>
				<input
					className="form-control"
					type="text"
					name="input"
					placeholder="What do you need to do?"
					onChange={(e) => setTask(e.target.value)}
					value={task}
				/>
			</form>
			<h6 className="mt-4 text-center">Pending tasks:</h6>
			<ul className="list-group">
				{data.map((todoItem, index) => (
					<li key={index} className="list-group-item">
						<div className="d-flex justify-content-between align-items-center">
							<p>{todoItem.label}</p>
							<span className="fas fa-trash" onClick={() => deleteTodo(index)}></span>
						</div>
					</li>
				))}
			</ul>
			<p className="text-center">Tasks to do: {data.length}</p>
		</div>
	);

};

export default Home;