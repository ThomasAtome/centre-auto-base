import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Brand} from "../../models/brand.model";
import {BrandService} from "../../services/brand/brand.service";

@Component({
    selector: 'app-brand-creator-view',
    templateUrl: './brand-creator-view.component.html',
    styleUrls: ['./brand-creator-view.component.css']
})
export class BrandCreatorViewComponent implements OnInit {

    brand: Brand;

    errorMsg: string;

    newBrandForm: FormGroup;

    constructor(private formBuilder: FormBuilder, private brandService: BrandService,
                private router: Router) {

        this.brand = new Brand('');

    }

    ngOnInit(): void {
        this._initForm();
    }

    /**
     * Method for init all the forms
     * @private
     */
    _initForm() {
        this.newBrandForm = this.formBuilder.group({
            'name': ['', Validators.required],
        });
    }

    /**
     * Method called when the user try to add a new brand
     */
    onSubmitNewBrandForm() {

        this.errorMsg = null;

        this.brandService.add(this.brand)
            .then(() => {
                this.router.navigate(['brands']);
            })
            .catch(errMsg => this.errorMsg = errMsg);
    }

}
