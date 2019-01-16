import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';


import { ProductService, AlertService, CategoryService } from '../../_services';
import { Category } from '../../_models';

@Component({templateUrl: 'product.component.html'})
export class ProductComponent implements OnInit {
    productForm: FormGroup;
    loading = false;
    submitted = false;
    formData: FormData;
    categories : Category[] = [];
    @ViewChild('fileInput') fileInput: ElementRef;

    constructor(
        private formBuilder: FormBuilder,
        private productService: ProductService,
       // private alertService: AlertService,
        private categoryService: CategoryService
    ) { }

    ngOnInit() {
        this.productForm = this.formBuilder.group({
            name : ['', Validators.required],
            price: ['', Validators.required],
            description: ['', Validators.required],
            categories: [],
            image: null
        });
        this.loadAllCategories();
    }

    onSubmit() {
        this.submitted = true;
        this.productService.create(this.productForm.value).
            pipe( first() ).
            subscribe(
                // data => {this.alertService.success("product uploaded", true) },
                // error => { this.alertService.error(error) }
                
            )
    }

    onImageAdded(event: any) {
        if(event.target.files && event.target.files.length > 0) {
            let file = event.target.files[0];
            this.productForm.get('image').setValue(file);
        }
    }

    private loadAllCategories() {
        this.categoryService.get().pipe(first()).subscribe(categories => { 
            this.categories = categories; 
            debugger;
        });
    }
}

   

