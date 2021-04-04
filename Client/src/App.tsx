import { useEffect, useState } from 'react';
import './App.css';
const socket = new WebSocket('ws://localhost:5000');

function App() {

  const [data, setData] = useState<string[]>([])

  const initSocket = () => {

    // socket.on("",() => {

    // })
    socket.onmessage = event => {
      console.log(event);
    }
    // socket.onmessage = (event) => {
    //   console.log("Message: ", event.data);
    //   const temp = event.data.substr(0, event.data.indexOf(","));
    //   const humidity = event.data.substr(event.data.indexOf(",") + 1);
    //   const humidityWithoutLastChar = humidity.substr(0, humidity.length - 2);
    //   const info = {
    //     temperature: temp,
    //     humidity: humidityWithoutLastChar,
    //   }
    //   data.push(info as any);
    //   console.log(data);
    // }
  }

  useEffect(() => {
    socket.onmessage = event => {
      // console.log(event);
      const newData = event.data;
      console.log([...data,newData]);
      setData([...data,newData]);
    }
    //eslint-disable-next-line
  }, []);


  return (
    <div className="App">
      {data.map(string => <div key={string}>{string}</div>)}
    </div>
  );

}


export default App;
