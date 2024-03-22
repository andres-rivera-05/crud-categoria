import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { IoAddCircle } from 'react-icons/io5';
import { BsCardImage } from 'react-icons/bs'
import { FaPenToSquare } from "react-icons/fa6";
import { FaTrashCan } from "react-icons/fa6";
import { FaMarker } from "react-icons/fa6";
import { alertaWarning } from './funcionAlert.js';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
// url = https://api.escuelajs.co/api/v1/categories

function App() {
  const [dataCategorias, setDataCategorias] = useState([])
  const [contador, setContador] = useState(0)
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [id, setId] = useState('')
  const [op, setOp] = useState('')
  const [isloadind, setIsLoading] = useState(false)
  const [mensaje, setMensaje] = useState('')
  const [ title, setTitle] =  useState('')

  const getCategorias = async () => {
    const url = "https://api.escuelajs.co/api/v1/categories"
    const result = await axios.get(url)
    setDataCategorias(result.data)
  }

  useEffect(() => {
    getCategorias()
  }, [contador])

  const openModal = (operacion, id, name, image) => {
    if (operacion === 1) {
      setOp(operacion)
      setTitle('Añadir Categoria')
      setName('')
      setImage('')
    } else if(operacion === 2) {
      setTitle('Editar Categoria')
      setOp(operacion)
      setId(id)
      setName(name)
      setImage(image)
    }
  }

  const enviar = async () => {
    if (op === 2) {
      if (name === '') {
        alertaWarning('Completa el campo nombre', 'nombre')
      } else if (image === '') {
        alertaWarning('Ingresa la url de la imagen', 'urlImagen')
      } else {
        const url = `https://api.escuelajs.co/api/v1/categories/${id}`
        const data = { name: name, image: image }
        try {
          setIsLoading(true)
          await axios.put(url, data)
          setContador(contador + 1)
          setMensaje("Actulizado!")
        } catch (err) {
          console.error(err, "No se puede modificar las categorias por defecto!")
        } finally {
          setIsLoading(false)
        }
      }
    } else {
      if (name === '') {
        alertaWarning('Completa el campo nombre', 'nombre')
      } else if (image === '') {
        alertaWarning('Ingresa la url de la imagen', 'urlImagen')
      } else {
        const url = "https://api.escuelajs.co/api/v1/categories/"
        const data = { name: name, image: image }
        try {
          setIsLoading(true)
          await axios.post(url, data)
          setMensaje('Publicacion Exitosa')
          setContador(contador + 1)
        } catch (err) {
          console.error(err)
        }finally{
          setIsLoading(false)
        }
      }
    }
  }

  const cloceModal = () => {
    setMensaje('')
    setTitle('')
  }

  const deleteCategory = (id) => {
    const url = `https://api.escuelajs.co/api/v1/categories/${id}`

    const MySwal = withReactContent(Swal)
    MySwal.fire({
      title: 'Estas seguro de eliminar esta categoria?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'si, Eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await  axios.delete(url)
        setContador(contador + 1)
      }
    }).catch((error) => {
      console.log(error)
    })
  }

  return (
    <div className="App">

      <div className='container mt-5'>
        <div className='row'>
          <div className='col-12'>
            <div className="d-grid gap-2 col-4 mx-auto">
              <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" type="button" onClick={() => openModal(1)}>Agregar <IoAddCircle /></button>
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
                    <div className="d-grid gap-2 d-md-flex">
                      <button className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => openModal(2, item.id, item.name, item.image)} type="button"><FaPenToSquare /></button>
                      <button className="btn btn-danger" onClick={() => deleteCategory(item.id)} type="button"><FaTrashCan /></button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">{title}</h1>
              <button type="button" className="btn-close" onClick={() => cloceModal()} data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3 input-group">
                <span className="input-group-text" id="basic-addon1"><FaMarker /></span>
                <input type="text" placeholder='Nombre de la categoria' className="form-control" id="nombre" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="mb-3 input-group">
                <span className="input-group-text" id="basic-addon1"><BsCardImage /></span>
                <input type="text" placeholder='url de la imagen .jpg, .png' className="form-control" id="urlImagen" value={image} onChange={(e) => setImage(e.target.value)} />
              </div>
            </div>
            {
              isloadind ? (
                <div className="d-flex text-info justify-content-center mb-3">
                  <div className="spinner-border text-info" role="status">
                    <span className="visually-hidden"></span>
                  </div>
                </div>
              ) : (
                <div className='text-black text-center mb-3'>{mensaje}</div>
              )
            }
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => cloceModal()} data-bs-dismiss="modal">Cerrar</button>
              <button type="button" className="btn btn-primary" onClick={() => enviar()}>Guardar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
