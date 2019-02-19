import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';


import { CategoryService, AlertService } from '../../_services';
import { Category} from '../../_models';

@Component({
    templateUrl: 'categorylist.component.html',
    styleUrls: ['../../../css/app.css', 'categorylist.component.css']
})
export class CategoryListComponent implements OnInit {
    categories : Category[];
    
    constructor( 
        private categoryService : CategoryService,
        private alertService : AlertService) {};
    ngOnInit() {
        this.loadCategories();
    }

    deleteCategory(id : Number) {
        this.categoryService.delete(id).pipe(first()).subscribe(
            data => {
                this.alertService.success("category deleted", true);
                this.loadCategories();
            },
            error => { this.alertService.error(error) }
        )
    }


    private loadCategories() {
        this.categoryService.get().pipe(first()).subscribe(categories => { 
            this.categories = categories; 
        });
    }
}