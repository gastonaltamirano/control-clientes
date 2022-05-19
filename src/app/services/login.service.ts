import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { map } from "rxjs/operators";

@Injectable()
export class LoginService {

    constructor (private authService : AngularFireAuth) {

    }

    login (email : string, password : string) {
        return new Promise ((res, rej) => {
            this.authService.signInWithEmailAndPassword(email, password)
                .then(data => res(data))
                .catch(err => rej(err));
        })
    }

    getAuth () {
        return this.authService.authState.pipe(
            map (auth => auth)
        );
    }

    logout () {
        this.authService.signOut();
    }

    register (email : string, password : string) {
        return new Promise ((res, rej) => {
            this.authService.createUserWithEmailAndPassword(email, password)
                .then(data => res(data))
                .catch(err => rej(err));
        })
    }
}