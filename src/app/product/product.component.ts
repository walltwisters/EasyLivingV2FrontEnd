import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { Product } from '../_models';
import { ProductService } from '../_services';

@Component({templateUrl: 'product.component.html'})
export class ProductComponent implements OnInit {
    productForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private productService: ProductService,
    ) { }

    ngOnInit() {
        this.productForm = this.formBuilder.group({
            name : [''],
            image: [],
        });
    }

    onSubmit() {
        this.submitted = true;

        this.productService.create(this.productForm.value).
            pipe(first()).
            subscribe()
    }
}

    // deleteUser(id: number) {
    //     this.userService.delete(id).pipe(first()).subscribe(() => { 
    //         this.loadAllUsers() 
    //     });
    // }

    // private loadAllUsers() {
    //     this.userService.getAll().pipe(first()).subscribe(users => { 
    //         this.users = users; 
    //     });
    // }

