"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Modaldelete({activeID, setShowModal}){
   
    const router = useRouter();
    const [productInfo, setProductInfo] = useState();

    const id = activeID;
    useEffect(() => {
        axios.get('/api/products?id='+id).then(response => {
            setProductInfo(response.data)
        });
    },[id])

    async function deleteProduct() {
        await axios.delete('/api/products?id='+id);
        router.refresh();
        setShowModal(false)
    }   


    return (
        <>
            
       
        <div className="w-full h-full fixed top-0 left-0 z-10 bg-dark bg-opacity-70 items-center">
            <div className="w-96 md:w-[600px] absolute top-1/2 left-1/2 z-20 bg-white rounded-lg
                -translate-x-1/2 -translate-y-1/2 p-5">
                            <div className="p-6 text-center">
                               
                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                    Apakah kamu yakin hapus product {productInfo?.nama_barang}
                                    </h3>
                                <button onClick={deleteProduct} className="text-white bg-red-600
                                 hover:bg-red-800  dark:focus:ring-red-800 
                                 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5
                                  text-center mr-2">
                                    Yes, Hapus
                                </button>
                                <button onClick={()=> setShowModal(false)} 
                                type="button" className="text-gray-500 bg-white hover:bg-gray-100 
                                 rounded-lg border
                                 border-gray-200 text-sm font-medium px-5 py-2.5">Tidak</button>
                            </div>

                <button onClick={()=> setShowModal(false)} className="w-[1.8rem] h-[1.8rem] text-white
                bg-dark absolute top-[-0.5rem] right-[-0.5rem] text-lg rounded-lg
                flex items-center justify-center cursor-pointer leading-0
                ">
                        &times;
                </button>

            </div>
      
        </div>

        </>


    );
}