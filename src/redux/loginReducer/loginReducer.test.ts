import main, {actions, loginReducer} from './loginReducer'

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

        const action = actions.loginAC(startValue.users)

        const endValue = loginReducer(startValue,action)

        expect(endValue.users).toBeDefined()

    })

    test('', () => {
        const action = {}

        const endValue = {}

        expect(endValue).toBeDefined()
    })
})