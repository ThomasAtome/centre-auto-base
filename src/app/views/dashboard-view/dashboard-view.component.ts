import {Component, OnDestroy, OnInit} from '@angular/core';
import {CarService} from "../../services/car/car.service";
import {Car} from "../../models/car.model";
import {Subscription} from "rxjs";
import {Brand} from "../../models/brand.model";
import {Model} from "../../models/model.model";
import {BrandService} from "../../services/brand/brand.service";
import {ModelService} from "../../services/model/model.service";
import {AuthService} from "../../services/auth/auth.service";

@Component({
    selector: 'app-dashboard-view',
    templateUrl: './dashboard-view.component.html',
    styleUrls: ['./dashboard-view.component.css']
})
export class DashboardViewComponent implements OnInit, OnDestroy {

    cars: Array<Car>;
    brands: Array<Brand>;
    models: Array<Model>;

    carsSub: Subscription;
    brandsSub: Subscription;
    modelsSub: Subscription;
    isAdminSub: Subscription;

    isAdmin: boolean;

    constructor(private carsService: CarService, private brandService: BrandService,
                private modelService: ModelService, private authService: AuthService) {
    }

    ngOnInit(): void {
        this._initSubs();

        this.carsService.getAll();
        this.brandService.getAll();
        this.modelService.getAll();
    }

    /**
     * Retrieve the model name by his id
     * @param modelId
     */
    getModelName(modelId) {
        if (this.models) {
            return this.models.find(model => model.id === modelId).name;
        }
    }

    /**
     * Retrieve the brand name by his id
     * @param brandId
     */
    getBrandName(brandId) {
        if (this.brands) {
            return this.brands.find(brand => brand.id === brandId).name;
        }
    }

    /**
     * Method for initialize all the subs
     * @private
     */
    _initSubs() {
        this.carsSub = this.carsService.cars.subscribe(
            cars => this.cars = cars
        );

        this.brandsSub = this.brandService.brands.subscribe(
            brands => this.brands = brands
        );

        this.modelsSub = this.modelService.models.subscribe(
            models => this.models = models
        );

        this.isAdminSub = this.authService.isAdmin
            .subscribe((isAdmin: boolean) => this.isAdmin = isAdmin);
    }

    /**
     * Method called when the user ask for delete a car
     * @param carId
     * @param carImgPath
     */
    onClickDeleteCar(carId, carImgPath) {
        this.carsService.delete(carId, carImgPath)
    }

    ngOnDestroy() {
        this.carsSub.unsubscribe();
        this.brandsSub.unsubscribe();
        this.modelsSub.unsubscribe();
        this.isAdminSub.unsubscribe();
    }

}
