import { FormEvent, useContext, useState } from "react";
import { SalesContext } from "../../common/contexts/Sales/SalesProvider";
import { SaleType } from "../../common/types/SaleType";
import { SaleTypeButton } from "./SaleTypeButton";


export function AddSale() {

    const {sales, setSales} = useContext(SalesContext)

    const [selected, setSelected] = useState<SaleType>('Money')

    const [saleValue, setSaleValue] = useState('')
    
    async function RegisterSale(e: FormEvent) {
        e.preventDefault()
        if (Number(saleValue) == 0 || saleValue == '') {
            alert('Digite uma venda válida')
        } else {
            const salesNewArray = [...sales,
             {type: selected, value: Number(saleValue), id: self.crypto.randomUUID()}]

            setSales(salesNewArray)

            localStorage.setItem('Sales', JSON.stringify(salesNewArray))

            setSaleValue('')
        }
        
        
    }

    return (
        <aside className="flex items-center flex-col justify-center gap-12 mb-5 sm:w-[21.5rem] w-[75%]">
            <h1 className="font-semibold text-[2.6rem] text-center">Adicionar a Lista</h1>
            <form 
            action="submit"
            className="flex flex-col items-center gap-9"
            >
                <span className=" w-full sm:h-[7.25rem] h-[9rem] bg-grayBg px-3 sm:text-7xl text-[5rem] justify-center flex items-center gap-5">
                    <label className="text-aquaBlue">R$</label>
                    <input 
                        name="value"
                        value={saleValue}
                        onChange={(e) => setSaleValue(e.target.value)}
                        type="number" 
                        className=" h-full bg-transparent text-white w-full sm:text-start text-center placeholder:text-grayPlaceholde3r focus:outline-none "
                        placeholder="00,00" 
                        
                    />
                </span>
                <div className="flex sm:flex-col items-start sm:justify-start justify-between w-full gap-11 ">
                    <SaleTypeButton 
                        icon={'Money'} 
                        title={'Dinheiro'} 
                        selected={selected} 
                        setSelected={setSelected}
                    /> 
                    <SaleTypeButton 
                        icon={'CreditCard'} 
                        title={'Cartão'}
                        selected={selected} 
                        setSelected={setSelected}

                    /> 
                    <SaleTypeButton 
                        icon={'Pix'} 
                        title={'Pix'}
                        selected={selected}
                        setSelected={setSelected}

                     /> 
                </div>
                <input 
                type="submit" value="Adicionar Venda"
                className="w-full sm:h-[4.5rem] h-[6rem] bg-aquaBlue sm:text-2xl text-4xl cursor-pointer font-bold hover:opacity-80 transition-opacity
                    "
                onClick={RegisterSale}
                    />
            </form>
        </aside>
    )
}