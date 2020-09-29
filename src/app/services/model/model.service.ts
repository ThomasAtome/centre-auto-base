import {Injectable} from '@angular/core';
import {ReplaySubject} from "rxjs";
import {AngularFirestore} from "@angular/fire/firestore";
import {map} from "rxjs/operators";
import {Model} from "../../models/model.model";
import {CarService} from "../car/car.service";

@Injectable({
    providedIn: 'root'
})
export class ModelService {

    models: ReplaySubject<Array<Model>>;

    constructor(private afs: AngularFirestore, private carsService: CarService) {

        this.models = new ReplaySubject<Array<Model>>();

    }

    /**
     * Method for retrieve all the models in DB
     */
    getAll() {
        this.afs
            .collection('models')
            .snapshotChanges()
            .pipe(
                map(actions => {
                    return actions.map(a => {
                        const model = a.payload.doc.data() as Model;
                        model.id = a.payload.doc.id;
                        return model;
                    });
                })
            )
            .subscribe(
                (models: Array<Model>) => this.models.next(models)
            );
    }

    /**
     * Method for retrieve a model by his id
     * @param modelId
     */
    getById(modelId) {
        return new Promise(
            (res, rej) => {

                this.afs
                    .collection('models')
                    .doc(modelId)
                    .get()
                    .pipe(
                        map(data => {
                            const model = data.data() as Model;
                            model.id = data.id;
                            return model;
                        })
                    )
                    .subscribe((model: Model) => res(model));
            }
        )
    }

    /**
     * Method for add a new model on the DB
     * @param model
     */
    add(model: Model) {
        return new Promise(
            (res, rej) => {

                this.afs
                    .collection('models')
                    .add(model.toPlainObj())
                    .then(() => res())
                    .catch(err => rej(err));

            }
        )
    }

    /**
     * Method for edit an existing model on the DB
     * @param model
     */
    edit(model: Model) {
        return new Promise(
            (res, rej) => {

                this.afs
                    .collection('models')
                    .doc(model.id)
                    .update({
                        name: model.name,
                        brandId: model.brandId
                    })
                    .then(() => res())
                    .catch(err => rej(err));

            }
        )
    }

    /**
     * Method for delete an existing model on the DB
     * @param modelId
     */
    delete(modelId) {
        return new Promise(
            (res, rej) => {

                // Before delete the model we have to delete all the cars associated
                this.carsService.deleteWhere('modelId', '==', modelId)
                    .then(() => {
                        this.afs
                            .collection('models')
                            .doc(modelId)
                            .delete()
                            .then(res)
                            .catch((err) => rej(err));
                    })
            }
        )
    }

    /**
     * Method for delete all the models by a where clause
     * @param fieldPath
     * @param opStr
     * @param value
     */
    deleteWhere(fieldPath, opStr, value) {
        return new Promise(
            (res, rej) => {
                this.afs
                    .collection('models', ref => ref.where(fieldPath, opStr, value))
                    .get()
                    .subscribe(models => {
                        models.forEach(model => model.ref.delete());
                    });
                res();
            });
    }

}
