import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function ProductForm({
    _id,
    nama_barang:existingnama_barang, 
    harga_beli:existingharga_beli, 
    harga_jual:existingharga_jual,
    stok:existingstok,
}){
    const [nama_barang, setnama_barang] = useState(existingnama_barang || '');
    const [harga_beli, setharga_beli] = useState(existingharga_beli || '');
    const [harga_jual, setharga_jual] = useState(existingharga_jual || '');
    const [stok, setstok] = useState(existingstok || '');

    const [goToProduct, setGoToProduct] = useState('');
    const router = useRouter();


    const saveProduct = async (ev) => {
        ev.preventDefault(); 
        const data = {nama_barang,harga_beli,harga_jual,stok};
        if(_id){
            //jika ada id maka update
            await axios.put('/api/products', {...data, _id})
        }else{
            await axios.post('/api/products', data);
        }
        setGoToProduct(true);
    }

    if(goToProduct){
        router.push('/products');
    }

    

    return (
            <div className="w-full lg:w-1/2">
                <form onSubmit={saveProduct}>
                        <div>
                            <label className="text-base">Nama barang</label>
                            <input  type="text" placeholder="Jane Doe"
                            value={nama_barang} 
                            onChange={ev => setnama_barang(ev.target.value) } />
                        </div>



                        <div>
                            <label className="text-base">Harga beli</label>
                            <input  type="text" placeholder="Jane Doe" pattern="[0-9]*"
                            value={harga_beli} 
                            onChange={ev => setharga_beli(ev.target.value.replace(/\D/g, "")) }
                             />
                        </div>

                        <div>
                            <label className="text-base">Harga jual</label>
                            <input  type="text" placeholder="Jane Doe"
                            value={harga_jual} 
                            onChange={ev => setharga_jual(ev.target.value.replace(/\D/g, "")) }
                             />
                        </div>

                        <div>
                            <label className="text-base">Stok</label>
                            <input  type="text" placeholder="Jane Doe"
                            value={stok} 
                            onChange={ev => setstok(ev.target.value.replace(/\D/g, "")) }
                             />
                        </div>
                     

                        


                        <Link href={'/products'} className="btn-red mr-2">Back</Link>

                        <button type="submit" className="btn-default">Save</button>
                </form>

             
 
            </div>

    );
}