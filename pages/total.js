import Layout from "@/layout/Layout";
import { useEffect, useCallback } from "react";
import useQuiosco from "@/hook/useQuiosco";
import {formatearDinero} from '../helpers'

export default function Total(params) {
    const  {pedido,nombre, setNombre, colocarOrden,total} = useQuiosco();

    const comprobarPedido = useCallback( () => {
        return pedido.length === 0 || nombre === '' ||  nombre.length < 3;
    },[pedido,nombre])

    useEffect(() => {
       comprobarPedido()
    }, [pedido, comprobarPedido])
    
    return(
        <Layout pagina='Total y Paga pedido'>
            <h1 className="text-4xl font-black">Datos y Total</h1>
            <p className="text-2xl font-blod">Total a pagar es:</p>

            <form onSubmit={colocarOrden}>
                <div>
                    <label
                    htmlFor="nombre"
                    className="font-bold text-slate-800 text-xl uppercase block" 
                    >
                        Nombre
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      className=" text-base bg-slate-200 w-full lg:w-1/3 mt-3 p-1 rounded-md uppercase"
                      placeholder="Ingresa tu nombre"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                    />
                </div>
                <div className="mt-10">
                    <p className="text-2xl">
                        Total a pagar {''}
                      <span className="font-bold ">
                        {formatearDinero(total)}
                      </span>
                     </p>
                </div>

                <div className="mt-5">
                    <input
                      type="submit"
                      className={`${comprobarPedido() ? 'bg-indigo-100 hover:bg-none cursor-none': 'bg-indigo-600 hover:bg-indigo-800'} cursor-pointer uppercase text-white w-full lg:w-auto px-5 py-2 font-bold rounded`}
                      value="Confirmar pedido"
                      disabled={comprobarPedido()}
                    />
                </div>
            </form>
        </Layout>
    )
}