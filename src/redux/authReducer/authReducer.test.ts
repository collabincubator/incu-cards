import  {authActions, authReducer} from './authReducer'

let startValue:any = {}
beforeEach(() => {
    startValue = {
        isLoggedIn: false,
        error: '',
        info: ''
    }
})
describe('auth  reducer', ()=> {
    test('login state should de changed', () => {

        const action1 = authActions.loginFlowAC(false)
        const action2 = authActions.loginFlowAC(true)

        const endValue1 = authReducer(startValue,action1)
        const endValue2 = authReducer(startValue,action2)

        expect(endValue1.isLoggedIn).toBeFalsy()
        expect(endValue2.isLoggedIn).toBeTruthy()

    })

    test('login error', () => {

        const action1 = authActions.errorAC('error')

        const endValue1 = authReducer(startValue,action1)

        expect(endValue1.error).toBe('error')

    })

})