import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Model} from "../../models/model.model";
import {ModelService} from "../../services/model/model.service";
import {Brand} from "../../models/brand.model";
import {BrandService} from "../../services/brand/brand.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-model-creator-view',
  templateUrl: './model-creator-view.component.html',
  styleUrls: ['./model-creator-view.component.css']
})
export class ModelCreatorViewComponent implements OnInit, OnDestroy {

  model: Model;
  brands: Array<Brand>;

  brandsSub: Subscription;

  errorMsg: string;

  newModelForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private modelService: ModelService,
              private brandService: BrandService, private router: Router) {

    this.model = new Model('', '');

  }

  ngOnInit(): void {
    this.brandsSub = this.brandService.brands.subscribe(
        brands => this.brands = brands
    );

    this.brandService.getAll();

    this._initForm();
  }

  /**
   * Method for init all the forms
   * @private
   */
  _initForm() {
    this.newModelForm = this.formBuilder.group({
      'name': ['', Validators.required],
      'brandId': ['', Validators.required],
    });
  }

  /**
   * Method called when the user try to add a new brand
   */
  onSubmitNewModelForm() {

    this.errorMsg = null;

    this.modelService.add(this.model)
        .then(() => {
          this.router.navigate(['models']);
        })
        .catch(errMsg => this.errorMsg = errMsg);
  }

  ngOnDestroy() {
    this.brandsSub.unsubscribe();
  }

}
