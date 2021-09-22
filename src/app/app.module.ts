import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HeaderComponent } from './components/common/header/header.component'
import { FooterComponent } from './components/common/footer/footer.component'
import { HomeComponent } from './components/pages/home/home.component'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { SearchComponent } from './components/common/search/search.component'
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete'
import { NzAvatarModule } from 'ng-zorro-antd/avatar'
import { StoreRouterConnectingModule } from '@ngrx/router-store'
import { EffectsModule } from '@ngrx/effects'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { StoreModule } from '@ngrx/store'
import { ModalModule } from './components/modals/modal.module'
import { userReducer } from './store/user/user.reducer'
import { UserEffects } from './store/user/effects/user.effects'
import { AuthInterceptor } from './interceptors/auth.interceptor'
import { NzBadgeModule } from 'ng-zorro-antd/badge'
import { NzIconModule } from 'ng-zorro-antd/icon'
import { NzDropDownModule } from 'ng-zorro-antd/dropdown'

@NgModule( {
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        HomeComponent,
        SearchComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        BrowserAnimationsModule,
        NzAutocompleteModule,
        NzAvatarModule,
        StoreRouterConnectingModule.forRoot(),
        EffectsModule.forRoot( [ UserEffects ] ),
        StoreDevtoolsModule.instrument( { maxAge: 25 } ),
        StoreModule.forRoot( {
            user: userReducer
        } ),
        ModalModule,
        NzBadgeModule,
        NzIconModule,
        NzDropDownModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    ],
    bootstrap: [ AppComponent ]
} )
export class AppModule {
}
