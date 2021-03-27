import { useState } from 'react';
import './App.css';

function App() {

  const socket = new WebSocket('ws://localhost:5000');

  const [data, setData] = useState<string[]>([])

  socket.addEventListener('message', (event) => {
    console.log("Message: ", event.data);
    data.push(event.data as string);
    console.log(data);
  })

  return (
    <div className="App">
      {data.map((el,i) => <p key={i}>{el}</p>)}
    </div>
  );
}

export default App;
