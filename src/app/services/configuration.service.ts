import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { Observable } from "rxjs";
import { Configuration } from "../models/Configuration.model";

@Injectable()
export class ConfigurationService {
    configurationDoc : AngularFirestoreDocument<Configuration> | undefined;
    configuration : Observable<Configuration | undefined> | undefined;

    //unique configuration id
    readonly id='1';

    constructor (private db : AngularFirestore) {

    };

    getConfiguration () : Observable<Configuration | undefined> {
        this.configurationDoc = this.db.doc<Configuration>(`configuracion/${this.id}`);
        this.configuration = this.configurationDoc.valueChanges();
        return this.configuration;
    };

    toggleConfiguration (config : Configuration) {
        this.configurationDoc = this.db.doc<Configuration>(`configuracion/${this.id}`);
        this.configurationDoc.update(config);
    };

}