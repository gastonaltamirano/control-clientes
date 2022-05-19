import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore'
import { Observable } from "rxjs";
import { Client } from "../models/Client.model";
import { map } from 'rxjs/operators';

@Injectable()
export class ClienteService {
    private clientsCollection : AngularFirestoreCollection<Client>;
    clients : Observable<Client[]>;
    private clientDoc : AngularFirestoreDocument<Client> | undefined;
    client : Observable<Client | null> | undefined;
    

    constructor (private db : AngularFirestore) {
        this.clientsCollection = this.db.collection<Client>('clientes', ref => ref.orderBy('nombre', 'asc'));
        this.clients = this.clientsCollection.valueChanges();
    }

    getClients () : Observable<Client[]> {
        this.clients = this.clientsCollection.snapshotChanges().pipe(
            map( actions => {
                return actions.map( action => {
                    const data = action.payload.doc.data() as Client;
                    const id = action.payload.doc.id;
                    return { id, ...data };
                })
            } )
        );

        return this.clients;
    };

    addClient (client : Client) {
        this.clientsCollection.add(client);
    };

    getClient (id : string) {
        this.clientDoc = this.db.doc<Client>(`clientes/${id}`) || undefined;
        this.client = this.clientDoc.snapshotChanges().pipe(
            map( action => {
                if(action.payload.exists == false) {
                    return null;
                } else {
                    const data = action.payload.data() as Client;
                    const id = action.payload.id;

                    return {id, ...data};
                }
            } )
        )
        return this.client;
    }

    updateClient (client : Client) {
        this.clientDoc = this.db.doc(`clientes/${client.id}`);
        this.clientDoc.update(client);
    }

    deleteClient (client : Client) {
      this.clientDoc = this.db.doc(`clientes/${client.id}`);
      this.clientDoc.delete();
    }
};