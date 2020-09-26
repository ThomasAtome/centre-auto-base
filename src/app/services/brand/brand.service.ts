import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {Brand} from "../../models/brand.model";
import {ReplaySubject} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class BrandService {

    brands: ReplaySubject<Array<Brand>>;

    constructor(private afs: AngularFirestore) {

        this.brands = new ReplaySubject<Array<Brand>>();

    }

    /**
     * Method for retrieve all the brands in DB
     */
    getAll() {

        this.afs
            .collection('brands')
            .snapshotChanges()
            .pipe(
                map(actions => {
                    return actions.map(a => {
                        const brand = a.payload.doc.data() as Brand;
                        brand.id = a.payload.doc.id;
                        return brand;
                    });
                })
            )
            .subscribe(
                (brands: Array<Brand>) => this.brands.next(brands)
            );

    }

    /**
     * Method for retrieve a brand by his id
     * @param brandId
     */
    getById(brandId) {

        return new Promise(
            (res, rej) => {

                this.afs
                    .collection('brands')
                    .doc(brandId)
                    .get()
                    .pipe(
                        map(data => {
                            const brand = data.data() as Brand;
                            brand.id = data.id;
                            return brand;
                        })
                    )
                    .subscribe((brand:Brand) => res(brand));


            }
        )

    }

    /**
     * Method for add a new brand on the DB
     * @param brand
     */
    add(brand: Brand) {
        return new Promise(
            (res, rej) => {

                this.afs
                    .collection('brands')
                    .add(brand.toPlainObj())
                    .then(() => res())
                    .catch(err => rej(err));

            }
        )
    }

    /**
     * Method for edit an existing brand on the DB
     * @param brand
     */
    edit(brand: Brand) {
        return new Promise(
            (res, rej) => {

                this.afs
                    .collection('brands')
                    .doc(brand.id)
                    .update({
                        name: brand.name
                    })
                    .then(() => res())
                    .catch(err => rej(err));

            }
        )
    }


    /**
     * Method for delete an existing brand on the DB
     * @param brandId
     */
    delete(brandId) {
        return new Promise(
            (res, rej) => {

                this.afs
                    .collection('brands')
                    .doc(brandId)
                    .delete()
                    .then(res)
                    .catch((err) => rej(err));

            }
        )
    }
}
