import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux"
import { productosCollection } from "../firebase/collections";
import { RootState } from "../store/store"
import { Productos } from '@interfaces';
import { onAddNewProducto, onListProductos, onListProductosByNegocio } from "../store/productos/productosSlice";
import { FirebaseDB, FirebaseStorage } from "../firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";


export const useProductosStore = () => {

    const { productosByNegocio , productos, isLoading } = useSelector( ( state: RootState ) => state.productos );
    const dispatch = useDispatch();

    const startLoadingProductos = async () => {
        const q = query( productosCollection);
        const productos = await getDocs(q);
        const listProductos: Productos[] = [];
        productos.docs.forEach( ( productoDoc ) => {
            const producto = productoDoc.data();
            listProductos.push( producto );
        });

        dispatch( onListProductos( listProductos ));
    }

    const startLoadingProductosByNegocio = async ( negocioId:string ) => {
        //console.log(negocioId)
        const q = query(productosCollection,where("id_negocio","==",negocioId));
        const productos = await getDocs(q);
        const listProductos: Productos[] = [];
        productos.docs.forEach( ( productoDoc ) => {
            const producto = productoDoc.data();
            listProductos.push( producto );
        });

        dispatch( onListProductosByNegocio( listProductos ))
    }

    const startLoadingProductoByNegocioAndIdProducto = ( productoId: string ): Productos => {
        
       // const categoria = categoriasByNegocio.filter( categoria => categoria.descripcion === categoriaId)[0];
       const prod = productosByNegocio.filter( producto => producto.descripcion === productoId)[0]
       return prod;
    }

    const startSavingProductos = async ( data:Productos, file:Blob | ArrayBuffer, fileName:string ) => {
        let id: number;
        productos.length > 0 ? id = productos.length + 1 : id = 1;
        data.id = id.toString();
        const imageRef = ref( FirebaseStorage, `images/productos/${fileName}`)
        await uploadBytes(imageRef, file).catch( error => console.log( error ));
        const publicImageUrl = await getDownloadURL(imageRef)
        data.photoUrl = publicImageUrl;
        await addDoc(collection(FirebaseDB, "productos"), { ...data })
            .then( () => {
                dispatch( onAddNewProducto( data ))
            })
            .catch( error => console.log(error));
    }

    const startUpdateProducto = async ( data:Productos ) => {

        let docRef:any;
        const q = query(productosCollection,where("id","==",data.id));
        const producto = await getDocs(q);
        producto.docs.forEach( ( productoDoc ) => {
            docRef = productoDoc.id
        })

        const productoRef = doc(FirebaseDB,'productos', docRef);
        await updateDoc(productoRef, {...data}) 
            .then(() => console.log('updated record'))
            .catch( error => console.log( error ))

       // console.log(docRef);

    }

    const startDeleteProducto = async ( data:Productos ) => {
        let docRef:any;
        const q = query(productosCollection,where("id","==",data.id));
        const producto = await getDocs(q);
        producto.docs.forEach( ( productoDoc ) => {
            docRef = productoDoc.id
        })

        const productoRef = doc(FirebaseDB,'productos', docRef);
        await deleteDoc(productoRef)
            .then(() => console.log('deleted record'))
            .catch( error => console.log( error ))
    }

    return {
        isLoading,
        productos,
        productosByNegocio,
        startLoadingProductosByNegocio,
        startLoadingProductoByNegocioAndIdProducto,
        startLoadingProductos,
        startSavingProductos,
        startUpdateProducto,
        startDeleteProducto,
    }

}