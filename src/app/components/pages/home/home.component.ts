import { Component, OnDestroy, OnInit } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { isAuth } from '../../../store/user/user.selectors'
import { Subscription } from 'rxjs'
import { Router } from '@angular/router'
import { SigninModalComponent } from '../../modals/signin-modal/signin-modal.component'
import { NzModalService } from 'ng-zorro-antd/modal'

@Component( {
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: [ './home.component.scss' ]
} )
export class HomeComponent implements OnInit, OnDestroy {

    isAuth$: Subscription
    isAuth: boolean
    buttonNav: {
        addTask: '/addTask',
        addService: '/addService'
    }

    constructor(
        private store$: Store,
        private router: Router,
        private modalService: NzModalService
    ) {
    }

    ngOnInit(): void {
        this.isAuth$ = this.store$.pipe( select( isAuth ) ).subscribe( res => {
            this.isAuth = res
        } )
    }

    ngOnDestroy(): void {
        if ( this.isAuth$ ) {
            this.isAuth$.unsubscribe()
        }
    }

}
