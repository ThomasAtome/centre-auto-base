import {Component, OnDestroy, OnInit} from '@angular/core';
import {Brand} from "../../models/brand.model";
import {Subscription} from "rxjs";
import {BrandService} from "../../services/brand/brand.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalConfirmDeleteComponent} from "../../components/modal-confirm-delete/modal-confirm-delete.component";

@Component({
    selector: 'app-brands-view',
    templateUrl: './brands-view.component.html',
    styleUrls: ['./brands-view.component.css']
})
export class BrandsViewComponent implements OnInit, OnDestroy {

    brands: Array<Brand>;

    alert: any;

    brandsSub: Subscription;

    constructor(private brandService: BrandService, private modalService: NgbModal) {

        this.alert = {
            isVisible: false,
            message: '',
            type: ''
        };

    }

    ngOnInit(): void {

        this.brandsSub = this.brandService.brands.subscribe(
            brands => this.brands = brands
        );

        this.brandService.getAll();

    }

    /**
     * Method called when the user ask for delete a brand
     * @param brandId
     */
    onClickDeleteBrand(brandId) {

        const confirmModal = this.modalService.open(ModalConfirmDeleteComponent).result;

        confirmModal
            .then(() => {
                this.brandService.delete(brandId)
                    .then(() => {
                        this.alert.isVisible = true;
                        this.alert.message = 'Marque supprimée avec succès !';
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

        this.brandsSub.unsubscribe();

    }

}
