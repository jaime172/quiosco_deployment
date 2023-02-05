import axios from "axios";
import Image from "next/image";
import { toast } from "react-toastify";
import {formatearDinero} from '../helpers'

const Orden = ({orden}) => {
   const {id,nombre,total,pedido} = orden;

  const completarOrden = async () => {
   try {
    await axios.post(`/api/ordenes/${id}`);
   
     toast.success('Orden lista');
  
   } catch (error) {
     
     toast.error('Hubo un error')
   }
  }
  return (
    <div className="border p-10 space-y-5 mb-5">
         <h3 className="font-bold text-xl">Orden: {id}</h3>
         <p className="text-base font-bold">cliente: {nombre}</p>
         <div>
            {pedido.map(platillo => (
                <div key={platillo.id} className="flex py-3 border-b last-of-type:border-0 items-center">
                    <div className="w-32">
                        <Image
                         width={400}
                         height={500}
                         alt={`Imagen producto ${nombre}`}
                         src={`/assets/img/${platillo.imagen}.jpg`}
                        />
                    </div>
                    <div className="p-5 space-y-2">
                        <p className="text-xl font-bold text-amber-500">
                            {platillo.nombre}
                        </p>
                        <p className="text-lg font-bold">Cantidad: {platillo.cantidad}</p>
                    </div>
                </div>
            ))}
         </div>
         <div className="md:flex md:items-center md:justify-between my-10">
            <p className="mt-5 font-black text-4xl text-amber-500">
            Total a pagar: {formatearDinero(total)}
            </p>
            <button 
             className="bg-indigo-600 hover:bg-indigo-800 text-white mt-5 md:mt-0 py-3 px-10 uppercase font-bold rounded-lg"
             type="button"
             onClick={completarOrden}
            >completar Orden</button>
        </div>
    </div>
  )
}

export default Orden