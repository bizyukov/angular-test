import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Store } from '@ngrx/store'
import { userRegistration } from '../../../store/user/user.actions'
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal'
import { SigninModalComponent } from '../signin-modal/signin-modal.component'

@Component( {
    selector: 'app-signup-modal',
    templateUrl: 'signup-modal.component.html',
    styleUrls: [ './signup-modal.component.scss' ]
} )
export class SignupModalComponent implements OnInit {
    isVisible = false
    validateForm!: FormGroup

    constructor(
        private fb: FormBuilder,
        private store: Store,
        private modal: NzModalRef,
        private modalService: NzModalService
    ) {
    }

    ngOnInit(): void {
        this.validateForm = this.fb.group( {
            firstName: [ null, [ Validators.required ] ],
            lastName: [ null, [ Validators.required ] ],
            middleName: [ null ],
            phone: [ null, [ Validators.required ] ],
            email: [ null, [ Validators.email, Validators.required ] ],
            password: [ null, [ Validators.required ] ],
            passwordConfirm: [ null, [ Validators.required, this.confirmationValidator ] ],
            agree: [ false ]
        } )
    }

    handleCancel(): void {
        this.modal.destroy()
    }

    openSignInModal(): void {
        this.modalService.create( {
            nzContent: SigninModalComponent
        } )
        this.handleCancel()
    }

    submitForm(): void {
        for ( const i in this.validateForm.controls ) {
            if ( this.validateForm.controls.hasOwnProperty( i ) ) {
                this.validateForm.controls[ i ].markAsDirty()
                this.validateForm.controls[ i ].updateValueAndValidity()
            }
        }

        if ( this.validateForm.valid ) {
            this.store.dispatch( userRegistration( this.validateForm.value ) )
        }
    }

    confirmationValidator = (control: FormControl): { [ s: string ]: boolean } => {
        if ( !control.value ) {
            return { required: true }
        } else if ( control.value !== this.validateForm.controls.password.value ) {
            return { confirm: true, error: true }
        }
        return {}
    }

    updateConfirmValidator(): void {
        Promise.resolve().then( () => this.validateForm.controls.passwordConfirm.updateValueAndValidity() )
    }

}
