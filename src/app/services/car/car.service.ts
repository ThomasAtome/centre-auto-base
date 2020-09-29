import {Injectable} from '@angular/core';
import {Car} from "../../models/car.model";
import {AngularFirestore} from "@angular/fire/firestore";
import {map} from "rxjs/operators";
import {ReplaySubject} from "rxjs";
import {AngularFireStorage} from "@angular/fire/storage";

@Injectable({
    providedIn: 'root'
})
export class CarService {

    cars: ReplaySubject<Array<Car>>;

    constructor(private afs: AngularFirestore, private afStorage: AngularFireStorage) {
        this.cars = new ReplaySubject<Array<Car>>();
    }

    /**
     * Method for retrieve all the models in DB
     */
    getAll() {
        this.afs
            .collection('cars')
            .snapshotChanges()
            .pipe(
                map(actions => {
                    return actions.map(a => {
                        const car = a.payload.doc.data() as Car;
                        car.id = a.payload.doc.id;
                        return car;
                    });
                })
            )
            .subscribe(
                (cars: Array<Car>) => this.cars.next(cars)
            );
    }

    /**
     * Method for retrieve a car by his id
     * @param carId
     */
    getById(carId) {
        return new Promise(
            (res, rej) => {
                this.afs
                    .collection('cars')
                    .doc(carId)
                    .get()
                    .pipe(
                        map(data => {
                            const car = data.data() as Car;
                            car.id = data.id;
                            return car;
                        })
                    )
                    .subscribe((car: Car) => res(car));
            }
        )
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

    /**
     * Method for edit an existing car on the DB
     * @param car
     */
    edit(car: Car) {
        return new Promise(
            (res, rej) => {

                this.afs
                    .collection('cars')
                    .doc(car.id)
                    .update({
                        dateFirstRelease: car.dateFirstRelease,
                        energyType: car.energyType,
                        gearboxType: car.gearboxType,
                        horsePower: car.horsePower,
                        mileage: car.mileage,
                        doorsNb: car.doorsNb,
                        placesNb: car.placesNb,
                        color: car.color,
                        brandId: car.brandId,
                        modelId: car.modelId
                    })
                    .then(() => res())
                    .catch(err => rej(err));

            }
        )
    }

    /**
     * Method for delete an existing car on the DB
     * @param carId
     * @param carImgPath
     */
    delete(carId, carImgPath) {
        let imgPathSplit = carImgPath.split('/');
        const imgName = imgPathSplit[imgPathSplit.length - 1].split('?')[0];

        this.afStorage.ref(imgName).delete()
            .subscribe(() => {
                this.afs
                    .collection('cars')
                    .doc(carId)
                    .delete()
                    .then()
                    .catch((err) => console.log(err));
            });
    }

    /**
     * Method for delete all the cars by a where clause
     * @param fieldPath
     * @param opStr
     * @param value
     */
    deleteWhere(fieldPath, opStr, value) {
        return new Promise(
            (res, rej) => {
                this.afs
                    .collection('cars', ref => ref.where(fieldPath, opStr, value))
                    .get()
                    .subscribe(cars => {
                        cars.forEach(car => {
                            // First delete the image
                            let imgPathSplit = car.data().imgPath.split('/');
                            const imgName = imgPathSplit[imgPathSplit.length - 1].split('?')[0];

                            this.afStorage.ref(imgName).delete()
                                .subscribe(() => {
                                    // Then delete data in DB
                                    car.ref.delete();
                                });
                        });
                        res();
                    });
            }
        );
    }

}
