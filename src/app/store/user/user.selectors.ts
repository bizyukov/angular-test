import { createFeatureSelector, createSelector } from '@ngrx/store'
import { UserState } from './user.reducer'

export const state = createFeatureSelector<UserState>( 'user' )

export const count = createSelector( state, (s) => s.count )

export const message = createSelector( state, (s) => s.message )

export const user = createSelector( state, (s) => s.user )

export const loaded = createSelector( state, (s) => s.loaded )

export const loading = createSelector( state, (s) => s.loading )

export const authData = createSelector( state, (s) => s.authData )

export const getAccessToken = createSelector( authData, (s) => s && s.token )

export const isAuth = createSelector( getAccessToken, (s) => !!s )
