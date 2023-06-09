import mongooseConnect from '@/lib/mongoose'
import Product from '@/models/Product';


export default async function handler(req, res) {
    const {method} = req;
    await mongooseConnect();

    if(method === 'GET') {
        if(req.query?.id){
            res.json(await Product.findOne({_id:req.query.id}))
        }else{
            res.json(await Product.find());
        }

    }

    if(method === 'POST'){
        const {nama_barang, harga_beli, harga_jual, stok} = req.body;
        const productDoc =  await Product.create({
            nama_barang, harga_beli, harga_jual, stok
        });
        res.json(productDoc);
    }

    if(method === 'PUT'){
        const {nama_barang, harga_beli, harga_jual, stok, _id} = req.body;
        await Product.updateOne({_id},{nama_barang, harga_beli, harga_jual, stok});
        res.json(true);
    }

    if(method === 'DELETE'){
        if(req.query?.id){
            await Product.deleteOne({_id:req.query.id});
            res.json(true);
        }
    }
}
  