import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalstorageService } from 'src/app/localStorage.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css']
})
export class AddProductComponent implements OnInit {

  public productForm: FormGroup;
  public submitted: boolean;
  public id;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private localStorageService: LocalstorageService) { }

  public ngOnInit() {
    this.buildProductForm();
  }

  // build product form
  public buildProductForm() {
    this.productForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      image_url: ['', [Validators.required, Validators.pattern(/(https?:\/\/.*\.(?:png|jpg))/i)]],
      description: ['', [Validators.required, Validators.minLength(150), Validators.maxLength(800)]],
      price: [1000, [Validators.required]],
      rating: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      location_available: [[]],
      in_stock: [true]
    });
  }

  // on change product location checkbox
  public toggleCity(city) {
    const index = this.productForm.value.location_available.indexOf(city);
    if (index > -1) {
      this.productForm.value.location_available.splice(index, 1);
    } else {
      this.productForm.value.location_available.push(city);
    }
  }

  // on submit product form
  onSubmit() {
    this.submitted = true;
    if (this.productForm.invalid) {
      return;
    } else {
      this.localStorageService.addProduct(this.productForm.value);
      this.router.navigate(['/']);
    }
  }

}

@Component({
  selector: 'app-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  public productForm: FormGroup;
  public submitted: boolean;
  public id;

  constructor(
    private formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private localStorageService: LocalstorageService) { }

  public ngOnInit() {
    this.id = this.activeRoute.snapshot.params.id;
    this.buildProductForm();
    this.getProduct();
  }

  // build product form
  public buildProductForm() {
    this.productForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(64)]],
      image_url: ['', [Validators.required, Validators.pattern(/(https?:\/\/.*\.(?:png|jpg))/i)]],
      description: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(800)]],
      price: [1000, [Validators.required]],
      rating: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      location_available: [[]],
      in_stock: [true]
    });
  }

  // get product
  public getProduct() {
    const product = this.localStorageService.getProductById(this.id);
    if (product) {
      this.productForm.patchValue(product);
    } else {
      this.router.navigate(['/']);
    }
  }

  // on change product location checkbox
  public toggleCity(city) {
    const index = this.productForm.value.location_available.indexOf(city);
    if (index > -1) {
      this.productForm.value.location_available.splice(index, 1);
    } else {
      this.productForm.value.location_available.push(city);
    }
  }

  // on submit product form
  onSubmit() {
    this.submitted = true;
    if (this.productForm.invalid) {
      return;
    } else {
      this.localStorageService.editProductById(this.id, this.productForm.value);
      this.router.navigate(['/']);
    }
  }

}
