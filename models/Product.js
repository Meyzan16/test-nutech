import { Schema, model,models } from "mongoose";

const ModelSchema = new Schema({
    nama_barang: {type:String, required:true},
    harga_beli: {type:Number, required:true},
    harga_jual: {type:Number, required:true},
    stok: {type:Number, required:true},
});



const Product = models.Product || model('Product', ModelSchema);

export default Product;