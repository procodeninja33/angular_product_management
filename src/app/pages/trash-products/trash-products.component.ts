import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from 'src/app/localStorage.service';

@Component({
  selector: 'app-trash-products',
  templateUrl: './trash-products.component.html',
  styleUrls: ['./trash-products.component.css']
})
export class TrashProductsComponent implements OnInit {

  public products: any[] = [];

  constructor(private localStorageService: LocalstorageService) { }

  ngOnInit() {
    this.products = this.localStorageService.getProducts();
    this.products = this.products.filter((v) => v.is_deleted == 1);
  }

  restoreProduct(id) {
    this.localStorageService.toggleDeleteProduct(id, 0);
    this.ngOnInit();
  }

  deleteProduct(id) {
    if (confirm('Are you sure want to remove?')) {
      this.localStorageService.deleteProduct(id);
      this.ngOnInit();
    }
  }

}
