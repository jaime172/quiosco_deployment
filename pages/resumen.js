import ResumenProducto from "@/components/ResumenProducto";
import useQuiosco from "@/hook/useQuiosco";
import Layout from "@/layout/Layout";


export default function Resumen() {
    const {pedido} = useQuiosco();
    return(
        <Layout pagina='Resumen'>
            <h1 className="font-black text-2xl">Resumen</h1>
            <p className="text-2xl font-bold">Revisa tu pedido</p>
            {pedido.lenght === 0 ? (
                <p className="text-2xl font-bold">No hay producto pedidos aun</p>
            ) : (
                pedido.map(producto => (
                    <ResumenProducto 
                      key={producto.id}
                      producto={producto}
                    />
                ))
            )}
        </Layout>
    )
}
