import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';


import { ProductService, AlertService, CategoryService, ImageService } from '../../_services';
import { Category, Product } from '../../_models';

@Component({
    templateUrl: 'product.component.html',
    styleUrls: ['../../../css/app.css', 'product.component.css']
})
export class ProductComponent implements OnInit {
    productForm: FormGroup;
    loading = false;
    submitted = false;
    formData: FormData;
    product: Product;
    categories : Category[] = [];
    fileName : String = "upload image";
    private idSubscription: any;
    edit: boolean = false;
    id : Number = 0;
    @ViewChild('fileInput') fileInput: ElementRef;

    constructor(
        private route : ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
        private productService: ProductService,
        private alertService: AlertService,
        private categoryService: CategoryService,
        private imageService: ImageService
    ) { }

    ngOnInit() {
        this.productForm = this.formBuilder.group({
            name : ['', Validators.required],
            price: ['', Validators.required],
            description: ['', Validators.required],
            categories: [this.formBuilder.array([]), null],
            image: [null, null]
        });
        this.loadAllCategories();
        this.getRouteId();
        this.edit = false;
        if(this.id)
        {
            this.edit = true;
            this.loadProduct();
        }
         
    }
    get f() { return this.productForm.controls; }
    get getFileName() { return this.fileName; }

    onSubmit() {
        this.submitted = true;
        debugger;
        if (this.productForm.invalid) {
            return;
        };
        if(this.edit) {
            this.productService.update(this.productForm.value, this.product.id, this.product.imageUrl).
            pipe( first() ).
            subscribe(
                data => {
                    this.alertService.success("uploaded succesfully");
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                }

            )

        } else {
            this.productService.create(this.productForm.value).
            pipe( first() ).
            subscribe(
                data => {this.alertService.success("product uploaded", true) },
                error => { this.alertService.error(error) }
                
            )
        }
       
    }

    onImageAdded(event: any) {
        if(event.target.files && event.target.files.length > 0) {
            let file = event.target.files[0];
            this.fileName = file.name;
            this.productForm.get('image').setValue(file);
        }
    }

    deleteProductImage() {
        this.imageService.deleteImage(this.product.imageUrl).subscribe( () => {
            this.edit = false;
        })
        this.edit = false;
    }

    updateOrSave() {
        return this.edit ? "Update" : " Save";
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
            })   
    }
            
    private loadProduct() {
        this.productService.show(this.id).subscribe( product => {
            this.product = product;
            this.productForm.get('name').setValue(this.product.name);
            this.productForm.get('price').setValue(this.product.price);
            this.productForm.get('description').setValue(this.product.description);
            var cs = product.categoryIds.split(",");
            var ics = cs.map( c => parseInt(c));
            this.fileName = this.product.imageUrl;
            this.productForm.get('categories').patchValue(ics);
        });
    }

    public createImagePath(path : String) {
        return `${config.apiUrl}/${path}`;
    }

    
        
    
}

   

