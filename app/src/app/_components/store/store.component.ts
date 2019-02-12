import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';


import { AlertService, StoreService } from '../../_services';
//import { Category, Product } from '../../_models';

@Component({
    templateUrl: 'store.component.html',
    styleUrls: ['../../../css/app.css', 'store.component.css']
})
export class StoreComponent implements OnInit {
    storeForm: FormGroup;
    loading = false;
    submitted = false;
   
    constructor(
        private route : ActivatedRoute,
        private formBuilder: FormBuilder,
        private alertService: AlertService,
        private storeService: StoreService
    ) { }

    ngOnInit() {
        this.storeForm = this.formBuilder.group({
            open : [ false, Validators.required],
            openingAt : ['', Validators.required],
            closingAt : [ '', Validators.required]
        });
        
         
    }
    get f() { return this.storeForm.controls; }
    

    onSubmit() {
        this.submitted = true;
        debugger;
        if (this.storeForm.invalid) {
            return;
        };
        this.loading = true;
        this.storeService.update(this.storeForm.value).
            pipe( first() ).
            subscribe(
                data => {
                    this.alertService.success("times updated", true);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            )
        
       
    }

   

    
        
    
}