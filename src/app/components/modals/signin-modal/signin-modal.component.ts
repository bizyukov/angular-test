import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { select, Store } from '@ngrx/store'
import { userAuthorization } from '../../../store/user/user.actions'
import { SignupModalComponent } from '../signup-modal/signup-modal.component'
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal'
import * as bcrypt from 'bcryptjs'
import { isAuth } from '../../../store/user/user.selectors'
import { Subscription } from 'rxjs'

@Component( {
    selector: 'app-demo-modal',
    templateUrl: 'signin-modal.component.html',
    styleUrls: [ './signin-modal.component.scss' ]
} )
export class SigninModalComponent implements OnInit, OnDestroy {
    isVisible = false
    validateForm!: FormGroup
    private isAuth$: Subscription

    constructor(
        private fb: FormBuilder,
        private store$: Store,
        private modal: NzModalRef,
        private modalService: NzModalService
    ) {
    }

    ngOnInit(): void {
        this.validateForm = this.fb.group( {
            email: [ null, [ Validators.required ] ],
            password: [ null, [ Validators.required ] ],
            remember: [ true ]
        } )

        this.isAuth$ = this.store$.pipe( select( isAuth ) ).subscribe( res => {
            if ( res ) {
                this.modal.destroy()
            }
        } )
    }

    ngOnDestroy(): void {
        if ( this.isAuth$ ) {
            this.isAuth$.unsubscribe()
        }
    }

    handleCancel(): void {
        this.modal.destroy()
    }

    openSignUpModal(): void {
        this.modalService.create( {
            nzContent: SignupModalComponent
        } )
        this.handleCancel()
    }

    async submitForm(): Promise<void> {
        for ( const i in this.validateForm.controls ) {
            if ( this.validateForm.controls.hasOwnProperty( i ) ) {
                this.validateForm.controls[ i ].markAsDirty()
                this.validateForm.controls[ i ].updateValueAndValidity()
            }
        }

        if ( this.validateForm.valid ) {
            console.log( 'this.validateForm.value.password', this.validateForm.value.password )
            // const hashPassword = await bcrypt.hash( this.validateForm.value.password, 5 )
            this.store$.dispatch( userAuthorization( { ...this.validateForm.value/*, password: hashPassword*/ } ) )
        }
    }

}
