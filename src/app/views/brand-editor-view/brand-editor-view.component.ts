import {Component, OnInit} from '@angular/core';
import {Brand} from "../../models/brand.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BrandService} from "../../services/brand/brand.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-brand-editor-view',
    templateUrl: './brand-editor-view.component.html',
    styleUrls: ['./brand-editor-view.component.css']
})
export class BrandEditorViewComponent implements OnInit {

    brand: Brand;

    errorMsg: string;

    editBrandForm: FormGroup;

    constructor(private formBuilder: FormBuilder, private brandService: BrandService,
                private router: Router, private route: ActivatedRoute) {

        this.brand = new Brand('');

    }

    ngOnInit(): void {
        const id = this.route.snapshot.params.id;

        this.brandService.getById(id)
            .then((brand: Brand) => this.brand = brand);

        this._initForm();
    }

    /**
     * Method for init all the forms
     * @private
     */
    _initForm() {
        this.editBrandForm = this.formBuilder.group({
            'name': ['', Validators.required],
        });
    }

    /**
     * Method called when the user try to signin
     */
    onSubmitEditedBrandForm() {

        this.errorMsg = null;

        this.brandService.edit(this.brand)
            .then(() => {
              this.router.navigate(['brands']);
            })
            .catch(errMsg => this.errorMsg = errMsg);
    }

}
