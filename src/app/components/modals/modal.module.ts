import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SigninModalComponent } from './signin-modal/signin-modal.component'
import { SignupModalComponent } from './signup-modal/signup-modal.component'
import { ReactiveFormsModule } from '@angular/forms'
import { NzModalModule } from 'ng-zorro-antd/modal'
import { NzButtonModule } from 'ng-zorro-antd/button'
import { NzFormModule } from 'ng-zorro-antd/form'
import { NzIconModule } from 'ng-zorro-antd/icon'
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox'

@NgModule( {
    declarations: [ SigninModalComponent, SignupModalComponent ],
    imports: [
        CommonModule,
        NzModalModule,
        NzButtonModule,
        NzFormModule,
        NzIconModule,
        NzCheckboxModule,
        ReactiveFormsModule,
    ],
    exports: [
        SigninModalComponent,
        SignupModalComponent
    ]
} )
export class ModalModule {
}
