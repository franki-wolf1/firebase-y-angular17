import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, 
    query, deleteDoc, doc, getDoc, orderBy, limitToLast, 
    where } from '@angular/fire/firestore';
import { from, map, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})

export class FirebaseService {

    firestore: Firestore = inject(Firestore); 
 
    addDocument(doc: any, paht: string) {
        const coll = collection(this.firestore, paht)
        return of(addDoc(coll, doc))
    }

    getDocuments(paht: string) {
        const coll = collection(this.firestore, paht)
        return collectionData(coll, {idField: 'idDoc'})
    }

    getDocumentsOrderBy(paht: string, param: string, condition: any) {
        const itemCollection = collection(this.firestore, paht);
        const itemsCollection = collectionData(
            query(
              itemCollection,
              orderBy(param, condition), //"desc" 'asc' <- ordenar por fecha de creación descendente
              limitToLast(5)
            ))
        //(this.firestore, paht)
        return itemsCollection
    }

    getDocument<tipo>(paht: string, id: string) {  
        return from(getDoc(doc(this.firestore, paht, id ))).pipe(
            map( (snapshot) => snapshot.data() as tipo)
        )
    } 

    deleteDocument(paht: string, id: string) { 
        const docRef = doc(this.firestore, paht, id );
        return deleteDoc(docRef)
    }

    getDocumentsWhere(paht: string, param: string, condition: any, valor: string) {
        const itemCollection = collection(this.firestore, paht);
        const itemsCollection = collectionData(
            query(
              itemCollection,
              where(param, condition, valor) //"desc" 'asc' <- ordenar por fecha de creación descendente
              
            )) 
        //(this.firestore, paht)
        return itemsCollection
    }

}  
