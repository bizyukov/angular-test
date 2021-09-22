import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { User } from '../models/user'

@Injectable( {
    providedIn: 'root'
} )
export class UserService {
    private testUrl = 'http://localhost:3000'

    constructor(private http: HttpClient) {
    }

    public create(data: { userName: string, password: string, remember: boolean }): Observable<object> {
        return this.http.post( this.testUrl + '/user', data )
    }

    public getData(): Observable<object> {
        const userStr = sessionStorage.getItem( 'user' )
        let user: User
        if ( user ) {
            user = JSON.parse( userStr )
            return of( user )
        }
        return this.http.get( this.testUrl + '/user' )
    }

    public logout(): void {
        sessionStorage.removeItem( 'token' )
        sessionStorage.removeItem( 'user' )
    }
}
