import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, switchMap } from 'rxjs/operators';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


import { ProductService, AlertService, CategoryService } from '../../_services';
import { Category, Product } from '../../_models';

@Component({templateUrl: 'product.component.html'})
export class ProductComponent implements OnInit {
    productForm: FormGroup;
    loading = false;
    submitted = false;
    formData: FormData;
    product: any;
    categories : Category[] = [];
    private idSubscription: any;
    id : Number = 0;
    @ViewChild('fileInput') fileInput: ElementRef;

    constructor(
        private route : ActivatedRoute,
        private router: Router,
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
        this.getRouteId();
        if(this.id)
        {
            this.loadProduct();
        }
         
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
        });
    }

    private getRouteId() {
        this.idSubscription = this.route.params
            .subscribe( params => {
                this.id = params['id'];
                console.log(this.id);
            })   
        }
            
    private loadProduct() {
        return this.productService.show(this.id);
        //var id = this.route.params.subscribe()
        // debugger;
        // this.product = this.route.paramMap.pipe( 
            // switchMap( (params : ParamMap) => {
            //     debugger;
            //     return this.productService.show(params.get("id"))
            // })
        //);
    }
}

   

