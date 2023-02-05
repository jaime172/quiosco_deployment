import {useState, useEffect, createContext} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';


const  QuioscoContext = createContext();

const QuioscoProvider = ({children}) => {

  const [categorias,setCategorias] = useState([]);
  const [categoriaActual, setCategoriaActual] = useState({});
  const [producto, setProducto] = useState({});
  const [modal, setModal] = useState(false);
  const [pedido, setPedido] = useState([]);
  const [nombre, setNombre] = useState('');
  const [total,setTotal] = useState(0);

  const router = useRouter();
  
  const obtenerCategorias = async () => {
      const {data} = await axios('/api/categorias');

      setCategorias(data.categorias);
  }

  const handlerClickCategoria = (id) => {
     const categoria = categorias.filter(cat => cat.id === id);
     setCategoriaActual(categoria[0]);
     router.push('/');
  }

  useEffect(() => {
      obtenerCategorias();
  },[])

  useEffect(() => {
    setCategoriaActual(categorias[0]);
  },[categorias]);

  const handleSetProducto = (producto) =>{
    setProducto(producto)
   
  }

  useEffect(() => {
    const nuevoTotal = pedido.reduce((total,producto) => (producto.precio * producto.cantidad) + total, 0);
    setTotal(nuevoTotal);
  },[pedido]);

  const handleChangeModal = () => {
    setModal(!modal)
  }

  const handleAgregarPedido = ({categoriaId,...producto}) => {
    if(pedido.some(productoState => productoState.id === producto.id)){
      //actualizar cantidad
       const pedidoActualizado = pedido.map(productoState => productoState.id === producto.id ? producto : productoState);
       setPedido(pedidoActualizado);
       toast.success('Guardado Correctamente')
    }else{
      setPedido([...pedido, producto]);
      toast.success('Agregado al pedido');
    }
   
     setModal(false);
  }

  const handleEditarCantidad = (id) => {
       const productoActualizar = pedido.filter(producto => producto.id === id)
        setProducto(productoActualizar[0]);
        console.log(id)
        setModal(!modal);
  }

  const handleEliminarProducto = (id) => {
     const pedidoActualizado = pedido.filter(producto => producto.id !== id);
     setPedido(pedidoActualizado);
  }

  const colocarOrden = async (e) => {
    e.preventDefault();
    try {
       const {data} = await axios.post('/api/ordenes',{pedido,total,nombre,fecha: Date.now().toString()});
   
       //reiniciar app
      setCategoriaActual(categorias[0]);
      setPedido([]);
      setNombre('');
      setTotal(0);

      toast.success('Pedido realizado correctamente');

      setTimeout(() => {
        router.push('/');
      }, 3000);
    } catch (error) {
      console.log(error)
    }
    console.log(pedido)
}

  return(
    <QuioscoContext.Provider
         value={{
          categorias,
          categoriaActual,
          setCategoriaActual,
          handlerClickCategoria, 
          producto,
          handleSetProducto,
          modal,
          handleChangeModal,
          handleAgregarPedido, 
          pedido,
          handleEditarCantidad,
          handleEliminarProducto,
          nombre,
          setNombre,
          colocarOrden,
          total
         }}
    >
       {children}
    </QuioscoContext.Provider>
  )
}

export {
  QuioscoProvider
}

export default QuioscoContext;