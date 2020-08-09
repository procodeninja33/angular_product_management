import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalstorageService } from 'src/app/localStorage.service';
declare const $: any;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public id;
  public product;

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private localStorageService: LocalstorageService) { }

  public ngOnInit() {
    this.id = this.activeRoute.snapshot.params.id;
    this.getProduct();
  }

  // get product
  public getProduct() {
    const product = this.localStorageService.getProductById(this.id);
    if (product) {
      this.product = product;
    } else {
      this.router.navigate(['/']);
    }
  }

}
