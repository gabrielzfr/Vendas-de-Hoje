import { useContext } from "react";
import { SalesContext } from "../../common/contexts/Sales/SalesProvider";
import { Sale } from "./Sale";

interface DaySalesProps {
    setShowReport: (type: boolean) => void
}


export function DaySales(props: DaySalesProps) {
    const {sales, setSales} = useContext(SalesContext)
    
    function deleteSale(id: string) {
        const salesNewArray = [...sales]
        const salesNewArrayFiltered = salesNewArray.filter(sale => sale.id != id)

        setSales(salesNewArrayFiltered)

        localStorage.setItem('Sales', JSON.stringify(salesNewArrayFiltered))
    }


    return (
        <section className="flex flex-col items-center gap-6">
        <h1 className="sm:text-7xl text-5xl font-semibold text-center">
            Vendas do Dia
        </h1>
        <article className="md:w-[48rem] h-[42rem] bg-grayBg sm:px-10 px-5 py-6 overflow-y-auto w-[95vw]">
            <ul className="w-full flex sm:gap-8 gap-5 flex-wrap justify-center">
            {sales.map((sale) => {
                    return (
                       <Sale saleType={sale.type} value={sale.value}
                       key={sale.id} id={sale.id}

                       deleteSale={deleteSale}
                       />
                    )
                })}
            </ul>
        </article>
            <input 
            type="button" 
            value="Gerar Relátorio"
            className="bg-aquaBlue sm:w-[32rem] h-[5rem] text-4xl cursor-pointer hover:opacity-80 transition-opacity w-[95vw] "
            onClick={() => props.setShowReport(true)}
            />
    </section>
    )
}