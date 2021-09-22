import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import {
    getUserData,
    getUserDataResponse, logout,
    userAuthorization,
    userRegistration,
    userRegistrationResponse
} from '../user.actions'
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators'
import { UserService } from '../../../services/user.service'
import { AuthService } from '../../../services/auth.service'
import { EMPTY, of } from 'rxjs'
import { Store } from '@ngrx/store'
import { User } from '../../../models/user'
import { Router } from '@angular/router'

@Injectable()
export class UserEffects {
    authorization$ = createEffect( () => this.actions$.pipe(
        ofType( userAuthorization ),
        mergeMap( (data) => {
            console.log( 'effect authService', data )
            return this.authService.authorization( data ).pipe(
                map( (res: { token: string }) => {
                    console.log( 'effect auth', res )
                    if ( res && res.token ) {
                        sessionStorage.setItem( 'token', res.token )
                        location.reload()
                    }
                    return this.store.dispatch( userRegistrationResponse( res ) )
                } ),
                catchError( () => EMPTY )
            )
        } )
    ), { dispatch: false } )

    registration$ = createEffect( () => this.actions$.pipe(
        ofType( userRegistration ),
        mergeMap( (data) => {
            return this.userService.create( data ).pipe(
                map( (res) => {
                    return this.store.dispatch( userRegistrationResponse( res ) )
                } ),
                catchError( () => EMPTY )
            )
        } )
    ), { dispatch: false } )

    getUserData$ = createEffect( () => this.actions$.pipe(
        ofType( getUserData ),
        mergeMap( () => {
            console.log( 'effect getUserData' )
            return this.userService.getData().pipe(
                map( (res: User) => {
                    console.log( 'effect auth', res )
                    if ( res && res.id ) {
                        sessionStorage.setItem( 'user', JSON.stringify( res ) )
                    }
                    return this.store.dispatch( getUserDataResponse( res ) )
                } ),
                catchError( () => EMPTY )
            )
        } )
    ), { dispatch: false } )

    logout$ = createEffect( () => this.actions$.pipe(
        ofType( logout ),
        map( (action) => {
            console.log( 'effect logout', action )
            this.userService.logout()
            this.router.navigate( [ '/' ] )
        } )
    ), { dispatch: false } )

    constructor(
        private actions$: Actions,
        private userService: UserService,
        private authService: AuthService,
        private store: Store,
        private router: Router
    ) {
    }
}
