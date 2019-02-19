import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, StoreService } from '../../_services';
import { Store } from '../../_models';


@Component({
    templateUrl: 'store.component.html',
    styleUrls: ['../../../css/app.css', 'store.component.css']
})
export class StoreComponent implements OnInit {
    storeForm: FormGroup;
    loading = false;
    submitted = false;
    store: Store;
   
    constructor(
        private formBuilder: FormBuilder,
        private alertService: AlertService,
        private storeService: StoreService
    ) { }

    ngOnInit() {
        this.store = new Store();
        this.store.contactInfo = "";
        this.store.homeInfo= "";
        this.storeForm = this.formBuilder.group({
            page : [ "homepage", Validators.required],
            info : [this.store.homeInfo, Validators.required] 
        });
        this.loadStore();
        this.onFormPageChange();
        
         
    }
    get f() { return this.storeForm.controls; }
    

    onSubmit() {
        this.submitted = true;
        if (this.storeForm.invalid) {
            return;
        };
        console.log(this.storeForm.value);
        this.loading = true;
        this.storeService.update(this.storeForm.value).
            pipe( first() ).
            subscribe(
                data => {
                    this.loading = false;
                    this.alertService.success("info updated", true);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            )
        
       
    }

    private loadStore() {
        this.storeService.get().subscribe( store => {
            this.store = store;
            if(this.storeForm.value.page === "contactpage"){
                this.storeForm.get("info").setValue(this.store.contactInfo);
            } else {
                this.storeForm.get("info").setValue(this.store.homeInfo);
            }
          
            
        });
    }

    private onFormPageChange() {
        this.storeForm.get("page").valueChanges.subscribe( val => {
            if(val === "homepage") {
                this.storeForm.get("info").setValue(this.store.homeInfo);
            } else if(val === 'contactpage') {
                this.storeForm.get("info").setValue(this.store.contactInfo);
            } else {
                console.log("onFormChange error");
            }
        })
    }

   

    
        
    
}