import {Injectable} from '@angular/core';
import {Car} from "../../models/car.model";
import {AngularFirestore} from "@angular/fire/firestore";

@Injectable({
    providedIn: 'root'
})
export class CarService {

    constructor(private afs: AngularFirestore) {
    }

    /**
     * Method for add a new car and download the picture
     * @param car
     */
    add(car: Car) {
        return new Promise(
            (res, rej) => {
                this.afs
                    .collection('cars')
                    .add(car.toPlainObj())
                    .then(() => res())
                    .catch(err => rej(err));
            }
        )
    }

}
