import { Action, createReducer, on } from '@ngrx/store'
import {
    getUserData, getUserDataResponse,
    loginError,
    loginSuccess, logout,
    userAuthorization,
    userRegistration,
    userRegistrationResponse
} from './user.actions'
import { User } from '../../models/user'

export interface UserState {
    count: number
    message?: string
    user?: User
    loading?: boolean
    loaded?: boolean
    serverError?: string
    authData?: {
        token?: string
    }
}

const initialState: UserState = {
    count: 0,
}

const userReducers = createReducer(
    initialState,
    on(
        userRegistration,
        (state, data) => ({
            ...state,
            ...data,
            loading: true,
            loaded: false,
        })
    ),
    on(
        userAuthorization,
        (state, data) => ({
            ...state,
            ...data,
            loading: true,
            loaded: false,
        })
    ),
    on(
        userRegistrationResponse,
        (state, data) => {
            console.log( 'userRegistrationResponse', data )
            return {
                ...state,
                ...data,
                authData: { token: data.token },
                loading: false,
                loaded: true,
            }
        }
    ),
    on(
        getUserData,
        (state, data) => ({
            ...state,
            user: { ...data },
            loading: true,
            loaded: false,
        })
    ),
    on(
        getUserDataResponse,
        (state, data) => ({
            ...state,
            user: { ...data },
            loading: false,
            loaded: true,
        })
    ),
    on(
        loginSuccess,
        (state, { token }) => ({
            ...state,
            authData: { token },
            loading: false,
            loaded: true
        })
    ),
    on(
        loginError,
        (state) => ({
            ...state,
            loading: false,
            loaded: true
        })
    ),
    on(
        logout,
        (state) => ({
            ...state,
            user: null,
            authData: null
        })
    )
)

export function userReducer(state: UserState | undefined, action: Action): UserState {
    console.log( 'userReducer', state, action )
    return userReducers( state, action )
}
