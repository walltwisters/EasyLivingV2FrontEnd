import { Component, OnInit} from '@angular/core';
import { first } from 'rxjs/operators';


import { ProductService, AlertService } from '../../_services';
import { Product } from '../.././_models';

@Component({templateUrl: 'productlist.component.html'})
export class ProductListComponent implements OnInit {
    private products: Product[] = [];

    constructor(
        private productService: ProductService,
    ) { }

    ngOnInit() {
        this.loadProducts();
    }

    private loadProducts() {
        this.productService.get().pipe( first() )
            .subscribe( products => {
                this.products = products;
            });
    }

    public createImagePath(path : String) {
        return `${config.apiUrl}/${path}`;
    }
}