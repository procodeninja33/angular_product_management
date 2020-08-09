import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AsideNavComponent } from './pages/aside-nav/aside-nav.component';
import { IndexComponent } from './pages/index/index.component';
import { AddProductComponent, EditProductComponent } from './pages/add-edit-product/add-edit-product.component';
import { ProductComponent } from './pages/product/product.component';
import { Routes, RouterModule } from '@angular/router';
import { TrashProductsComponent } from './pages/trash-products/trash-products.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocalstorageService } from './localStorage.service';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
  },
  {
    path: 'add-product',
    component: AddProductComponent
  },
  {
    path: 'edit-product/:id',
    component: EditProductComponent
  },
  {
    path: 'product/:id',
    component: ProductComponent
  },
  {
    path: 'trash-products',
    component: TrashProductsComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    AsideNavComponent,
    IndexComponent,
    AddProductComponent,
    EditProductComponent,
    ProductComponent,
    TrashProductsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, { useHash: false })
  ],
  providers: [LocalstorageService],
  bootstrap: [AppComponent],
})
export class AppModule { }
