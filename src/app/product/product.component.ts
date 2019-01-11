import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { ProductService } from '../_services';

@Component({templateUrl: 'product.component.html'})
export class ProductComponent implements OnInit {
    productForm: FormGroup;
    loading = false;
    submitted = false;
    formData: FormData;

    @ViewChild('fileInput') fileInput: ElementRef;

    constructor(
        private formBuilder: FormBuilder,
        private productService: ProductService,
    ) { }

    ngOnInit() {
        this.productForm = this.formBuilder.group({
            name : ['', Validators.required],
            price: ['', Validators.required],
            description: ['', Validators.required],
            image: null
            // image: this.formBuilder.group({
            //     name: [''],
            //     mime: [''],
            //     value: [null]

            //})
        });
        this.formData = null;
    }

    onSubmit() {
        this.submitted = true;
        // let input = new FormData();
        // this.formData.append('name', this.productForm.value.name);
        // this.formData.append('description', this.productForm.value.description);
        // this.formData.append('price', this.productForm.value.price);
        this.productService.create(this.productForm.value).
            pipe( first() ).
            subscribe(
                
            )
    }

    async onImageAdded(event: any) {
        if(this.formData){
            this.formData = null;
        };
        this.formData = new FormData();
        let reader = new FileReader();
        if(event.target.files && event.target.files.length > 0) {
            let file = event.target.files[0];
            this.productForm.get('image').setValue(file);
            //this.formData.append("image", file);
            // reader.onload = () => {
            //     this.productForm.get('image').setValue({
            //         name: file.name,
            //         mime: file.type,
            //         value: reader.result.split(',')[1]
            //     )
            // };
            //await reader.readAsDataURL(file);
        }
    }
}

   

