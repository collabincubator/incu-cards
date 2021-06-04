import main, {authActions, authReducer} from './authReducer'

let startValue:any = {}
beforeEach(() => {
    startValue = {
        users: [{
            _id: '',
            email: '',
            name: '',
            avatar: '',
            publicCardPacksCount: 0, // количество колод
            created: Date.now(),
            updated: Date.now(),
            isAdmin: false,
            verified: false,
            rememberMe:false,
            error: ''
        }],
        isLoggedIn: false
    }
})
describe('login  reducer', ()=> {
    test('correct value', () => {

        const action = authActions.loginAC(startValue.users)

        const endValue = authReducer(startValue,action)

        expect(endValue.users).toBeDefined()

    })

    test('', () => {
        const action = {}

        const endValue = {}

        expect(endValue).toBeDefined()
    })
})