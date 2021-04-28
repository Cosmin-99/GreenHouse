import { useEffect, useState } from 'react';
import './App.css';
import logo from "./logo.jpg";
import { StylesProvider } from "@material-ui/core/styles";
import { Paper } from '@material-ui/core';
import { ResponsiveBar } from '@nivo/bar';
import { dataChart } from "./data";
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const socket = new WebSocket('ws://localhost:5000');

function App() {

  useEffect(() => {
    document.title = "Green House"
  })

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
      console.log([...data, newData]);
      setData([...data, newData]);
    }
    //eslint-disable-next-line
  }, []);


  return (
    <StylesProvider injectFirst>
      <div className="container">
        {data.map(string => <div key={string}>{string}</div>)}
        {/* header */}
        <div className="header">
          <img className="logo" src={logo} alt="" />
          <p className="title">Green House</p>
        </div>

        <Paper style={{ margin: 20 }} className="chart">
          <div style={{ height: 500 }}>
            <ResponsiveBar
              data={dataChart}
              keys={['hot dog', 'burger', 'sandwich', 'kebab', 'fries', 'donut']}
              indexBy="country"
              margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
              padding={0.3}
              valueScale={{ type: 'linear' }}
              indexScale={{ type: 'band', round: true }}
              colors={{ scheme: 'nivo' }}
              defs={[
                {
                  id: 'dots',
                  type: 'patternDots',
                  background: 'inherit',
                  color: '#38bcb2',
                  size: 4,
                  padding: 1,
                  stagger: true
                },
                {
                  id: 'lines',
                  type: 'patternLines',
                  background: 'inherit',
                  color: '#eed312',
                  rotation: -45,
                  lineWidth: 6,
                  spacing: 10
                }
              ]}
              fill={[
                {
                  match: {
                    id: 'fries'
                  },
                  id: 'dots'
                },
                {
                  match: {
                    id: 'sandwich'
                  },
                  id: 'lines'
                }
              ]}
              borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
              axisTop={null}
              axisRight={null}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'country',
                legendPosition: 'middle',
                legendOffset: 32
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'food',
                legendPosition: 'middle',
                legendOffset: -40
              }}
              labelSkipWidth={12}
              labelSkipHeight={12}
              labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
              legends={[
                {
                  dataFrom: 'keys',
                  anchor: 'bottom-right',
                  direction: 'column',
                  justify: false,
                  translateX: 120,
                  translateY: 0,
                  itemsSpacing: 2,
                  itemWidth: 100,
                  itemHeight: 20,
                  itemDirection: 'left-to-right',
                  itemOpacity: 0.85,
                  symbolSize: 20,
                  effects: [
                    {
                      on: 'hover',
                      style: {
                        itemOpacity: 1
                      }
                    }
                  ]
                }
              ]}
              animate={true}
              motionStiffness={90}
              motionDamping={15}
            />
          </div>
        </Paper>

        <div>
          <Paper>

          </Paper>
          <Paper style={{ margin: 20 , width: 300}}>
            <div style={{ paddingLeft: 20 }}>
              <p className="card-title">Humidity</p>
              <div style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  verticalAlign: "middle"
              }}>
                <div style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  verticalAlign: "middle"
                }}>
                  <InvertColorsIcon style={{
                    fontSize: 40,
                    color: "#00e6e6"
                  }}/>
                  <span style={{
                    fontSize: 40,
                    fontWeight: "bold",
                    color: "#3e98d8"
                  }}>32%</span>
                </div>
                <div style={{ width: 70, height: 70, marginLeft: 40, marginBottom: 10}}>
                  <CircularProgressbar value={32} text={`${32}%`} />
                </div>
              </div>
            </div>
          </Paper>
        </div>
      </div>
    </StylesProvider>
  );

}


export default App;
