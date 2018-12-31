import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { Product } from '../_models';
import { ProductService } from '../_services';

@Component({templateUrl: 'product.component.html'})
export class ProductComponent implements OnInit {
    productForm: FormGroup;
    loading = false;
    submitted = false;

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
    }

    onSubmit() {
        this.submitted = true;
        this.productService.create(this.productForm.value).
            pipe( first() ).
            subscribe(
                
            )
    }

    async onImageAdded(event: any) {
        let reader = new FileReader();
        if(event.target.files && event.target.files.length > 0) {
            let file = event.target.files[0];
            reader.onload = () => {
                this.productForm.get('image').setValue({
                    name: file.name,
                    mime: file.type,
                    value: reader.result.split(',')[1]
                })
            };
            await reader.readAsDataURL(file);
        }
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

