import { CollectionReference, collection, DocumentData } from "firebase/firestore";
import { FirebaseDB } from "./config";


// This is just a helper to add the type to the db responses
const createCollection = <T = DocumentData>(collectionName: string) => {
    return collection(FirebaseDB, collectionName) as CollectionReference<T>
  }


  export { createCollection } ;

