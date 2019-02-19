import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';


import { CategoryService, AlertService } from '../../_services';
import { Category } from '../../_models';

@Component({
    templateUrl: 'category.component.html',
    styleUrls: ['../../../css/app.css', 'category.component.css']
})
export class CategoryComponent implements OnInit {
    category : Category;
    categoryForm: FormGroup;
    submitted : boolean = false;
    loading: boolean = false;

    constructor(
        private categoryService: CategoryService,
        private formBuilder: FormBuilder,
        private alertService: AlertService
    ) {};
    ngOnInit() {
        this.categoryForm = this.formBuilder.group( {
            'name' : ['', Validators.required]
        })

    }

    onSubmit() {
        this.submitted = true;
        if (this.categoryForm.invalid) {
            return;
        };
        this.loading = true;
        this.categoryService.create(this.categoryForm.value).
            pipe( first() ).
            subscribe(
                data => {
                    this.alertService.success("uploaded succesfully");
                    this.loading = false;
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            );
    } 
        
       
}
