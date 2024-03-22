import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import {IoAddCircle} from 'react-icons/io5';
// url = https://api.escuelajs.co/api/v1/categories

function App() {
  const [dataCategorias, setDataCategorias] = useState([])
  const [contador, setContador] = useState(0)

  const getCategorias = async () => {
    const url = "https://api.escuelajs.co/api/v1/categories"
    const result = await axios.get(url)
    setDataCategorias(result.data)
    console.log(result)
  }


  useEffect(() => {
    getCategorias()
  }, [contador])

  return (
    <div className="App">

      <div className='container mt-5'>
        <div className='row'>
          <div className='col-12'>
            <div class="d-grid gap-2 col-4 mx-auto">
              <button class="btn btn-primary" type="button">Agregar <IoAddCircle/></button>
            </div>
          </div>
        </div>
      </div>

      <div className='container mt-5 mb-5'>
        <div className='row'>
          {
            dataCategorias.map((item) => (
              <div key={item.id} className='col-3'>
                <div className="card mt-5">
                  <img src={item.image} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default App;
