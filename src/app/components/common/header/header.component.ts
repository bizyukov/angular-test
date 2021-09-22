import { Component, OnDestroy, OnInit } from '@angular/core'
import { NzModalService } from 'ng-zorro-antd/modal'
import { SignupModalComponent } from '../../modals/signup-modal/signup-modal.component'
import { SigninModalComponent } from '../../modals/signin-modal/signin-modal.component'
import { select, Store } from '@ngrx/store'
import { Subscription } from 'rxjs'
import { User } from '../../../models/user'
import { isAuth, user } from '../../../store/user/user.selectors'
import { getUserData, logout } from '../../../store/user/user.actions'


@Component( {
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: [ './header.component.scss' ]
} )
export class HeaderComponent implements OnInit, OnDestroy {
    public user: User
    public isAuth: boolean
    private user$: Subscription
    private isAuth$: Subscription

    constructor(
        private modalService: NzModalService,
        private store$: Store
    ) {

    }

    ngOnInit(): void {
        this.user$ = this.store$.pipe( select( user ) ).subscribe(
            data => {
                console.log( 'user', data )
                if ( data ) {
                    this.user = data
                } else {
                    this.store$.dispatch( getUserData( {} ) )
                }
            }
        )

        this.isAuth$ = this.store$.pipe( select( isAuth ) ).subscribe( res => {
            console.log( 'isAuth', res )
            this.isAuth = res
        } )
    }

    ngOnDestroy(): void {
        if ( this.user$ ) {
            this.user$.unsubscribe()
        }
        if ( this.isAuth$ ) {
            this.isAuth$.unsubscribe()
        }
    }

    openSignUpModal(): void {
        this.modalService.create( {
            nzContent: SignupModalComponent
        } )
    }

    openSignInModal(): void {
        this.modalService.create( {
            nzContent: SigninModalComponent
        } )
    }

    logout(): void {
        this.store$.dispatch( logout() )
    }

}
