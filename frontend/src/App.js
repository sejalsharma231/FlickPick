import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from "react"

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
        fetch("http://localhost:3000/")
          .then((res) => res.json())
          .then((data) => {
      console.log(data);
      setMessage(data.message)
    });
      }, []);

  return (
    <div>
      <h1>
        {message}
      </h1>
    </div>
  );
}

export default App;
