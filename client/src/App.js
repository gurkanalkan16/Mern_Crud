import './App.css';
import { Card, CardBody, CardTitle, Input, Button, Label, Table } from 'reactstrap';
import { useEffect, useState } from 'react';
import Axios from 'axios';
function App() {

  const [name, setName] = useState("");
  const [daySince, setDaySince] = useState(0);
  const [dataList, setDataList] = useState([]);
  const [newName, setNewName] = useState("");
  const [newDaysince, setNewDaySince] = useState(0);
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    Axios.get('http://localhost:3001/read').then((response) => {
      setDataList(response.data);
    })
  }, [])
  const addFunction = () => {
    console.log(dataList);
    setDataList(dataList => [...dataList, {
      name:name,
      daySince:daySince}]);
    Axios.post("http://localhost:3001/insert",
      {
        name: name,
        daySince: daySince
      });
  };
  console.log(dataList)
  const updateFunction = (id) => {
    
    if(hidden) {
      let a = [];
    a.push(dataList)
    for(var i = 0; i< Object.keys(dataList).length;i++)
    {
        if(a[0][i]._id === id ) {
            a[0][i].name = newName;
            a[0][i].daySince = newDaysince;
        }
    }
    setDataList(a[0])
      const body = {
        id:id,
        newName:newName,
        newDaysince:newDaysince,
      }

      Axios.put("http://localhost:3001/update",body).then((res) =>{
        setHidden(false);
      });
    }
      
      setHidden(true)
  }
  const deleteFunction = (id) => {
    let a = [];
    for(var i = 0; i< Object.keys(dataList).length;i++)
    {
        if(dataList[i]._id !== id) {
            a.push(dataList[i]);
        }
    }
    setDataList(a)
    Axios.delete('http://localhost:3001/delete/'+id);
  }

  return (
    <div className="App">
      <h1>Mern Crud Uygulaması</h1>
      <Card style={{ width: "25rem", height: "20rem", marginLeft: "3rem" }}>
        <CardTitle>Mern Form</CardTitle>
        <CardBody>
          <Label>Name</Label>
          <Input
            type="text"
            onChange={(event) => {
              setName(event.target.value);
            }}>

          </Input>
          <br></br>
          <Label>Number </Label>
          <Input
            type="number"
            onChange={(event) => {
              setDaySince(event.target.value);
            }}
          ></Input>
          <br></br>
          <Button
            color="primary"
            onClick={addFunction}
          >Kaydet</Button>
        </CardBody>
      </Card>
      <hr>
      </hr>
      <Table>
        <thead>
          <tr>
            <th> Name</th>
            <th>DaySince </th>
            <th>İşlem </th>
          </tr>
        </thead>
        <tbody>
          {dataList.map((val, key) => {
            return (
              <tr key={key}>
                <td>{val.name}<br></br>{hidden ? <input
                  onChange={(event) => {
                    setNewName(event.target.value);
                  }} type="text"  ></input> : null}</td>
                <td>{val.daySince} <br></br> {hidden ? <input
                  onChange={(event) => {
                    setNewDaySince(event.target.value);
                  }} type="text"  ></input> : null}</td>
                <td>
                  <Button onClick={() => deleteFunction(val._id)} color="danger">Sil</Button>
                  <Button style={{ marginLeft: "1rem" }} onClick={() => {
                   updateFunction(val._id )}} color="warning"><i className="far fa-edit"></i> Güncelle</Button>
                  <Button style={{ marginLeft: "1rem" }} onClick={() => { setHidden(false) }}>Kapat</Button>
                </td>
              </tr>

            )
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default App;
