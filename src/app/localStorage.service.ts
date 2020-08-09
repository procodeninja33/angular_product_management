import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LocalstorageService {

    public localKey = 'products';

    constructor() { }

    updateProduct(products) {
        localStorage.setItem(this.localKey, JSON.stringify(products));
    }

    getProducts() {
        const products = JSON.parse(localStorage.getItem(this.localKey) || '[]');
        return products;
    }

    getProductById(id) {
        const product = this.getProducts().filter((v) => v.id == id);
        return product.length ? product[0] : null;
    }

    addProduct(data) {
        data.is_deleted = 0;
        let products = this.getProducts();
        data.id = parseInt((products[products.length - 1] && products[products.length - 1].id) || 0, 10) + 1;
        products.push(data);
    }

    editProductById(id, data) {
        let products = this.getProducts();
        products = products.map((v) => {
            if (v.id == id) {
                v.title = data.title;
                v.image_url = data.image_url;
                v.description = data.description;
                v.price = data.price;
                v.rating = data.rating;
                v.location_available = data.location_available;
                v.in_stock = data.in_stock;
            }
            return v;
        });
        this.updateProduct(products);
    }

    toggleDeleteProduct(id, status) {
        let products = this.getProducts();
        products = products.map((v) => {
            if (v.id == id) {
                v.is_deleted = status;
            }
            return v;
        });
        this.updateProduct(products);
    }

    deleteProduct(id) {
        let products = this.getProducts();
        products = products.filter((v) => v.id != id);
        this.updateProduct(products);
    }

}
