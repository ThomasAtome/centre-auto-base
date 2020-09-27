import {Component, OnDestroy, OnInit} from '@angular/core';
import {Car} from "../../models/car.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CarService} from "../../services/car/car.service";
import {ModelService} from "../../services/model/model.service";
import {Brand} from "../../models/brand.model";
import {BrandService} from "../../services/brand/brand.service";
import {Model} from "../../models/model.model";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {AngularFireStorage} from "@angular/fire/storage";
import {finalize} from "rxjs/operators";

@Component({
    selector: 'app-car-creator-view',
    templateUrl: './car-creator-view.component.html',
    styleUrls: ['./car-creator-view.component.css']
})
export class CarCreatorViewComponent implements OnInit, OnDestroy {

    car: Car;
    brands: Array<Brand>;
    models: Array<Model>;
    modelsForBrandId: Array<Model>;

    brandsSub: Subscription;
    modelsSub: Subscription;

    fileSelected: any;

    errorMsg: string;

    newCarForm: FormGroup;

    energyTypes = ['Essence', 'Diesel', 'Hybride', 'Electrique', 'GPL', 'Autre'];
    numbers = [1, 2, 3, 4, 5];

    constructor(private carService: CarService, private modelService: ModelService,
                private brandService: BrandService, private formBuilder: FormBuilder,
                private router: Router, private afs: AngularFireStorage) {
        this.car = new Car();
        this.modelsForBrandId = [];
    }

    ngOnInit(): void {
        this._initSubs();

        this.brandService.getAll();
        this.modelService.getAll();

        this._initForm();
    }

    /**
     * Method for initialize all the subs
     * @private
     */
    _initSubs() {
        this.brandsSub = this.brandService.brands.subscribe(
            brands => this.brands = brands
        );

        this.modelsSub = this.modelService.models.subscribe(
            models => this.models = models
        );
    }

    /**
     * Method for initialize all the form
     * @private
     */
    _initForm() {
        this.newCarForm = this.formBuilder.group({
            'brandId': ['', Validators.required],
            'modelId': ['', Validators.required],
            'dateFirstRelease': ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[012])\/\d{4}$/)]],
            'mileage': ['', Validators.required],
            'energyType': ['', Validators.required],
            'gearboxType': ['', Validators.required],
            'doorsNb': ['', Validators.required],
            'placesNb': ['', Validators.required],
            'horsePower': ['', Validators.required],
            'color': ['', Validators.required]
        })
    }

    /**
     * Feed the array of models with the brand id associated
     * @param brandId
     */
    getModelsForBrandId(brandId) {
        this.modelsForBrandId = this.models.filter(model => model.brandId === brandId);
    }

    /**
     * Method for handle when the user add or remove a file on the input file
     * @param e
     */
    onFileSelected(e) {
        this.fileSelected = null;
        if (e.target.files.length > 0) {
            this.fileSelected = e.target.files[0];
        }
    }

    /**
     * Method called when the user want to add a new car
     */
    onSubmitNewCarForm() {

        this.errorMsg = null;

        // First upload the file
        const filename = this.fileSelected.name.split('.')[0] + '_' + new Date().getTime().toString() + '.' + this.fileSelected.name.split('.')[1];

        const fileRef = this.afs.ref(filename);
        const task = this.afs
            .upload(filename, this.fileSelected);

        task.snapshotChanges()
            .pipe(
                finalize(() => {
                    fileRef.getDownloadURL().subscribe(
                        (url) => {
                            this.car.imgPath = url;

                            this.carService.add(this.car)
                                .then(() => {
                                    this.router.navigate(['dashboard']);
                                })
                                .catch(errMsg => this.errorMsg = errMsg);
                        }
                    )
                })
            ).subscribe();
    }

    ngOnDestroy() {
        this.brandsSub.unsubscribe();
        this.modelsSub.unsubscribe();
    }

}
