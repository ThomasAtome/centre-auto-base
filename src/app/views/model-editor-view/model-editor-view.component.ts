import { Component, OnInit } from '@angular/core';
import {Brand} from "../../models/brand.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BrandService} from "../../services/brand/brand.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Model} from "../../models/model.model";
import {Subscription} from "rxjs";
import {ModelService} from "../../services/model/model.service";

@Component({
  selector: 'app-model-editor-view',
  templateUrl: './model-editor-view.component.html',
  styleUrls: ['./model-editor-view.component.css']
})
export class ModelEditorViewComponent implements OnInit {

  model: Model;
  brands: Array<Brand>;

  brandsSub: Subscription;

  errorMsg: string;

  editModelForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private modelService: ModelService,
              private brandService: BrandService, private router: Router, private route: ActivatedRoute) {

    this.model = new Model('', '');

  }

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;

    this.modelService.getById(id)
        .then((model: Model) => this.model = model);

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
    this.editModelForm = this.formBuilder.group({
      'name': ['', Validators.required],
      'brandId': ['', Validators.required],
    });
  }

  /**
   * Method called when the user try to signin
   */
  onSubmitEditedModelForm() {

    this.errorMsg = null;

    this.modelService.edit(this.model)
        .then(() => {
          this.router.navigate(['models']);
        })
        .catch(errMsg => this.errorMsg = errMsg);
  }

}
