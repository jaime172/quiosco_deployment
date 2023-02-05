import Image from "next/image"
import useQuiosco from "@/hook/useQuiosco"
import {formatearDinero} from '../helpers'
import { useEffect, useState } from "react";




const ModalProducto = () => {
    const {producto,handleChangeModal, handleAgregarPedido, pedido} = useQuiosco();
    const {imagen,precio, nombre} = producto;
    const [cantidad, setCantidad] = useState(1);
    const [edicion, setEdicion] = useState(false);

    //comprobar si el modal actual esta en el pedido
    useEffect(() => {
        if(pedido.some(pedidoState =>  pedidoState.id === producto.id)){
            const productoEdicion = pedido.find(pedidoState => pedidoState.id === producto.id)
            setEdicion(true)
            setCantidad(productoEdicion.cantidad)
       }
    },[producto,pedido])
   
  return (
    <div className="md:flex gap-10 bg-amber-50" >
        <div className="md:1/3 h-auto">
           <Image
               width={'300'}
               height={'600'}
               alt={`Imagen de producto ${nombre}`}
               src={`/assets/img/${imagen}.jpg`}
           />
        </div>
        <div className="md:w-2/3">
            <div className="flex justify-end">
                <button
                  onClick={handleChangeModal}
                  className='p-2'
                >
                <svg xmlns="http://www.w3.org/2000/svg" fill="#cc0605" viewBox="0 0 24 24" strokeWidth={2.5} stroke="#9b111e" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>

                </button>
            </div>
           <h1 className="text-3xl font-bold mt-5">
            {nombre}
           </h1>
           <p className="mt-5 font-black text-3xl text-amber-600 p-1">
               {formatearDinero(precio)}
           </p> 
           <div className="flex align-items-center mt-3 p-3">
              <button
                type="button"
                onClick={() => {
                    if(cantidad <= 1) return
                    setCantidad(cantidad - 1)}
                }
              >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              </button>
                 <p className="mx-2 text-2xl font-bold">{cantidad}</p>
              <button
               type="button"
               onClick={() => {
                if(cantidad >= 5) return 
                setCantidad(cantidad + 1)
               }}
              >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              </button>
           </div>
           <button
             type="button"
             className="bg-indigo-600 hover:bg-indigo-800 text-2xl 
             text-white uppercase font-bold px-3 py-2 my-3 rounded"
             onClick={()=> handleAgregarPedido({...producto, cantidad})}
           >
            {edicion ? 'guardar cambios' : 'agregar pedido'}
           </button>
        </div>
    </div>
  )
}

export default ModalProducto