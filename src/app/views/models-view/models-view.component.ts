import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalConfirmDeleteComponent} from "../../components/modal-confirm-delete/modal-confirm-delete.component";
import {Model} from "../../models/model.model";
import {ModelService} from "../../services/model/model.service";
import {Brand} from "../../models/brand.model";
import {BrandService} from "../../services/brand/brand.service";

@Component({
    selector: 'app-models-view',
    templateUrl: './models-view.component.html',
    styleUrls: ['./models-view.component.css']
})
export class ModelsViewComponent implements OnInit {

    models: Array<Model>;
    modelsShowable: Array<Model>;
    brands: Array<Brand>;

    alert: any;

    brandsSub: Subscription;
    modelsSub: Subscription;

    constructor(private modelService: ModelService, private brandService: BrandService,
                private modalService: NgbModal) {

        this.alert = {
            isVisible: false,
            message: '',
            type: ''
        };

    }

    ngOnInit(): void {

        this.modelsSub = this.modelService.models.subscribe(
            models => {
                this.models = models;
                this.modelsShowable = models;
            }
        );

        this.brandsSub = this.brandService.brands.subscribe(
            brands => this.brands = brands
        )

        this.modelService.getAll();
        this.brandService.getAll();

        this.authService.isCurrentUserAdmin().then((isAdmin: boolean) => this.isAdmin = isAdmin);

    }

    /**
     * Method for retrieve the name of the brand by his id
     * @param brandId
     */
    getBrandName(brandId) {
        if (this.brands) {
            return this.brands.find(s => s.id === brandId).name;
        }
    }

    /**
     * Method for filter the content of the array
     * @param brandId
     */
    onClickFilterByBrand(brandId) {
        if(brandId === 'all') {
            this.modelsShowable = this.models.slice(0);
        }
        else {
            this.modelsShowable = this.models.filter(model => model.brandId === brandId);
        }
    }

    /**
     * Method called when the user ask for delete a model
     * @param modelId
     */
    onClickDeleteModel(modelId) {

        const confirmModal = this.modalService.open(ModalConfirmDeleteComponent).result;

        confirmModal
            .then(() => {
                this.modelService.delete(modelId)
                    .then(() => {
                        this.alert.isVisible = true;
                        this.alert.message = 'Modèle supprimé avec succès !';
                        this.alert.type = 'success';
                        setTimeout(() => this.alert.isVisible = false, 2500);
                    })
                    .catch(() => {
                        this.alert.isVisible = true;
                        this.alert.message = 'Une erreure est survenue lors de la suppression !';
                        this.alert.type = 'error';
                        setTimeout(() => this.alert.isVisible = false, 25000);
                    });
            });

    }

    ngOnDestroy() {
        this.modelsSub.unsubscribe();
        this.brandsSub.unsubscribe();
    }

}
