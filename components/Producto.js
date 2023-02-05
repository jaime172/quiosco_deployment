import useQuiosco from '../hook/useQuiosco'
import Image from "next/image";
import {formatearDinero} from '../helpers'



const Producto = ({producto}) => {
    const {handleSetProducto, handleChangeModal} = useQuiosco()
    
    const {nombre, imagen, precio} = producto;
    return(
       <div className="border p-3">
            <Image
             width={400}
             height={500}
            src={`/assets/img/${imagen}.jpg`}
            alt={`imagen del producto ${nombre}`}
            />
            <div className="p-3">
                <h3 className="text-2xl font-bold">{nombre}</h3>
                <p className="mt-5 font-black text-4xl text-amber-500">
                    {formatearDinero(precio)}
                </p>
                <button
                  type="button"
                 className="bg-indigo-500 hover:bg-indigo-800
                  text-white font-bold w-full p-3 mt-4 mb-0
                  
                 "
                 onClick={()=>
                    {handleSetProducto(producto)
                    handleChangeModal();}
                }
                 >
                    Agregar
                </button>
            </div>
       </div>
    )
}

export default Producto;