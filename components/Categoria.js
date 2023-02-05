import Image from "next/image";
import useQuiosco from "@/hook/useQuiosco";

const Categoria = ({categoria}) => {
    const {categoriaActual, handlerClickCategoria} = useQuiosco();
    const {nombre,icono, id} = categoria;
    
  return (
       
       

        <button
        type="button"
        className=" text-2xlg font-bold hover:cursor-pointer md:text-normal w-full"
        onClick={() => handlerClickCategoria(id)}
        >
           <div className={`${categoriaActual?.id === id ? 'bg-amber-400' : ''}flex items-center gap-2  border p-5 hover:bg-amber-400`}> 
           <Image
            width={70}
            height={70}
            src={`/assets/img/icono_${icono}.svg`}
            alt='Icono del producto'
        />
          {nombre}
          </div>
        </button>
    
  )
}

export default Categoria