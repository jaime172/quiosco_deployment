
import Producto from '../components/Producto';

import Layout from '../layout/Layout'
import useQuiosco from '@/hook/useQuiosco'


export default function Home() {
   const {categoriaActual} = useQuiosco();
  return (
   <>
     <Layout pagina={`Menú ${categoriaActual?.nombre}`}>
     <h1 className="text-4xl font-bold">{categoriaActual?.nombre}</h1>
     <p className='text-2xl my-10'>
      Pesonaliza tu pedido y disfruta nuevas experiencias
     </p>
     <div className=" grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
     {categoriaActual?.productos?.map(producto => (
        <Producto key={producto.id} producto={producto}/>
     ))}
     </div>
     
     </Layout>
     
   </>
  )
}


