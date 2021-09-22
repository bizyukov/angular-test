import { createAction } from '@ngrx/store'

export enum EUserActions {
    authorization = '[USER] Authorization',
    registration = '[USER] Registration',
    registrationResponse = '[USER] RegistrationResponse',
    loginSuccess = '[USER] loginSuccess',
    loginError = '[USER] loginError',
    getUserData = '[USER] GetUserData',
    getUserDataResponse = '[USER] GetUserDataResponse',
    logout = '[USER] Logout',
}

export const userAuthorization = createAction(
    EUserActions.authorization,
    (payload: any) => {
        return payload
    }
)

export const userRegistration = createAction(
    EUserActions.registration,
    (payload: any) => {
        console.log( '[action]userRegistration', payload )
        return payload
    }
)

export const userRegistrationResponse = createAction(
    EUserActions.registrationResponse,
    (payload: any) => {
        console.log( '[action]userRegistrationResponse', payload )
        return payload
    }
)

export const getUserData = createAction(
    EUserActions.getUserData,
    (payload: any) => {
        console.log( '[action]getUserData', payload )
        return payload
    }
)

export const getUserDataResponse = createAction(
    EUserActions.getUserDataResponse,
    (payload: any) => {
        console.log( '[action]getUserDataResponse', payload )
        return payload
    }
)

export const loginSuccess = createAction(
    EUserActions.loginSuccess,
    (payload: any) => {
        console.log( '[action]loginSuccess', payload )
        return payload
    }
)

export const loginError = createAction(
    EUserActions.loginError,
    (payload: any) => {
        console.log( '[action]loginError', payload )
        return payload
    }
)

export const logout = createAction( EUserActions.logout )
