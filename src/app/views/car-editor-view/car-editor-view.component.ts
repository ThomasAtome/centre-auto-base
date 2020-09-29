import {Component, OnInit} from '@angular/core';
import {Car} from "../../models/car.model";
import {Brand} from "../../models/brand.model";
import {Model} from "../../models/model.model";
import {Subscription} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CarService} from "../../services/car/car.service";
import {ModelService} from "../../services/model/model.service";
import {BrandService} from "../../services/brand/brand.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-car-editor-view',
    templateUrl: './car-editor-view.component.html',
    styleUrls: ['./car-editor-view.component.css']
})
export class CarEditorViewComponent implements OnInit {

    car: Car;
    brands: Array<Brand>;
    models: Array<Model>;
    modelsForBrandId: Array<Model>;

    brandsSub: Subscription;
    modelsSub: Subscription;

    errorMsg: string;

    editCarForm: FormGroup;

    energyTypes = ['Essence', 'Diesel', 'Hybride', 'Electrique', 'GPL', 'Autre'];
    numbers = [1, 2, 3, 4, 5];

    constructor(private carService: CarService, private modelService: ModelService,
                private brandService: BrandService, private formBuilder: FormBuilder,
                private router: Router, private route: ActivatedRoute) {
        this.car = new Car();
        this.modelsForBrandId = [];
    }

    ngOnInit(): void {
        const id = this.route.snapshot.params.id;

        this.carService.getById(id)
            .then((car: Car) => {
                this.car = car;
                this.getModelsForBrandId(car.brandId);
            });

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
        this.editCarForm = this.formBuilder.group({
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
     * Method called when the user want to add a new car
     */
    onSubmiteditCarForm() {

        this.errorMsg = null;

        this.carService.edit(this.car)
            .then(() => {
                this.router.navigate(['dashboard']);
            })
            .catch(errMsg => this.errorMsg = errMsg);
    }

    ngOnDestroy() {
        this.brandsSub.unsubscribe();
        this.modelsSub.unsubscribe();
    }
}
