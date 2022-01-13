import {useState} from "react";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const onChange = (e) => {setTodo(e.target.value)};
  const onSubmit = (e) => {
    e.preventDefault()
    if (todo === "") {
      return;
    }
    setTodos((currenArray) => 
    [...currenArray, todo]
    );
    setTodo("");
  };

  return (
    <div className="App">
      <h1>My todos ({todos.length})</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="하고 싶은 일을 쓰세요..."
          value={todo}
          onChange={onChange}
        />
        <button>Todo Submit</button>
      </form>
<hr/>
{todos.map( (data, index) => (<li key={index}>{data}</li>) )}
    </div>
  );
}

export default App;
