import logo from "./logo.svg";
import { useEffect, useState, useRef } from "react";
import "./App.css";
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  CartesianGrid,
  YAxis,
  ResponsiveContainer,
} from "recharts";
function App() {
  let eventSource = new EventSource("http://localhost:5000/events");
  const [data, setData] = useState([]);
  const dataRef = useRef(data);
  useEffect(() => {
    eventSource.onmessage = (e) => updateFlightState(JSON.parse(e.data));
  }, []);
  const updateFlightState = (newData) => {
    dataRef.current.push(newData);
    setData([...dataRef.current]);
  };
  return (
    <ResponsiveContainer width="100%" height={600}>
      <LineChart
        width={800}
        height={400}
        data={data}
        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
      >
        <XAxis dataKey="id" />
        <YAxis dataKey="price" />
        <Tooltip />
        <CartesianGrid stroke="#f5f5f5" />
        <Line type="monotone" dataKey="price" stroke="#ff7300" yAxisId={0} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default App;
