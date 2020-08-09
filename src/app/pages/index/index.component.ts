import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from 'src/app/localStorage.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  public products: any[] = [];

  constructor(
    private localStorageService: LocalstorageService,
    private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe((params) => {
      this.products = this.localStorageService.getProducts();
      this.products = this.products.filter((v) => v.is_deleted == 0);
      if (params && params.search) {
        this.products = this.products.filter((v) => v.title.search(new RegExp(params.search, 'i')) > -1);
      }
    });
  }

  deleteProduct(id) {
    if (confirm('Are you sure want to delete?')) {
      this.localStorageService.toggleDeleteProduct(id, 1);
      this.ngOnInit();
    }
  }

}
