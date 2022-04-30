import './App.css';
import { useState } from 'react';
import * as XLSX from "xlsx";
import axios from 'axios';

function App() {

  const [data, setData] = useState([])

  const onChange = (e) => {
    const [file] = e.target.files;
    const reader = new FileReader();

    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      data.shift()
      console.log(data);
      axios.post("http://localhost:5000/db", data).then(res => console.log(res))
    };
    reader.readAsBinaryString(file);
    // fetch("http://localhost:5000/db/users").then(res => console.log(res))

  };
  const getData = (e) => {
    axios.get("http://localhost:5000/db/users").then(res => setData(res.data))
    // axios.get("http://localhost:8080/users").then(res => setData(res.data))
  }
  return (
    <div>
      <input type="file" onChange={onChange} />
      <button onClick={getData}>Get Data</button>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {data.map((element, index) => {
            console.log(element)
            return (
              <tr key={index}>
                <td>{element.id}</td>
                <td>{element.name}</td>
                <td>{element.username}</td>
                <td>{element.email}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
