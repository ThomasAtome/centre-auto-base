import {Injectable} from '@angular/core';
import * as firebase from "firebase";
import {User} from "../../models/user.model";
import {AngularFirestore} from "@angular/fire/firestore";
import {BehaviorSubject} from "rxjs";
import {AngularFireAuth} from "@angular/fire/auth";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    token: BehaviorSubject<string>;

    constructor(private afs: AngularFirestore, private afa: AngularFireAuth) {
        this.token = new BehaviorSubject<string>(null);
    }

    /**
     * Method for request API in order to try to signup the user
     * @param newUser
     */
    signUp(newUser: User) {

        return new Promise(
            (res, rej) => {

                firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
                    .then((currentUser) => {

                        this.token.next(currentUser.user.refreshToken);

                        newUser.id = currentUser.user.uid;

                        this.afs
                            .collection('users')
                            .doc(currentUser.user.uid)
                            .set(newUser.toPlainObj())
                            .then(() => res());
                    })
                    .catch((err) => {

                        if (err.code === 'auth/email-already-in-use') {
                            rej("L'adresse email est déjà utilisée.");
                        }

                        if (err.code === 'auth/invalid-email') {
                            rej("L'adresse email est invalide.");
                        }

                        if (err.code === 'auth/operation-not-allowed') {
                            rej("Une erreur est survenue.");
                        }

                        if (err.code === 'auth/weak-password') {
                            rej("Le mot de passe n'est pas sécurisé.");
                        }

                        rej("Une erreur est survenue.");
                    });

            }
        )

    }

    /**
     * Method for request API in order to check if creds are okay
     * @param email
     * @param password
     */
    signIn(email: string, password: string) {

        return new Promise(
            (res, rej) => {

                firebase.auth().signInWithEmailAndPassword(email, password)
                    .then((currentUser) => {
                        this.token.next(currentUser.user.refreshToken);
                        res();
                    })
                    .catch((err) => {

                        if (err.code === 'auth/invalid-email') {
                            rej("L'adresse email est invalide.");
                        }

                        if (err.code === 'auth/user-disabled') {
                            rej("L'utilisateur a été banni.");
                        }

                        if (err.code === 'auth/user-not-found') {
                            rej("L'utilisateur n'existe pas.");
                        }

                        if (err.code === 'auth/wrong-password') {
                            rej("Le mot de passe est incorrect.");
                        }

                        rej("Une erreur est survenue.");
                    });

            }
        )

    }

    /**
     * Method for logout the user
     */
    logout() {

        return new Promise(
            (res, rej) => {
                firebase.auth().signOut()
                    .then(() => {
                        this.token.next(null);
                        res();
                    });
            }
        )
    }

    /**
     * Method for retrieve the current token if exist
     */
    getToken() {
        if(!this.token.getValue()) {
            this.afa.authState.subscribe((user) => {
                if(user && user.uid) {
                    this.token.next(user.refreshToken);
                    return this.token;
                }
            });
        }
        return this.token;
    }
}
