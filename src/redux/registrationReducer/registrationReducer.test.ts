import registrationReducer, {registrationActions} from "./registrationReducer";


let startValue:any = {}
beforeEach(() => {
    startValue = {
        registrationSuccess:false,
        loading:false,
        error:''
    }
})
describe('registration  reducer', ()=> {
    test('user should be registr', () => {



        const action1 = registrationActions.registrationAC(true)
        const action2 = registrationActions.registrationAC(false)

        const endValue1 = registrationReducer(startValue,action1)
        const endValue2 = registrationReducer(startValue,action2)

        expect(endValue1.registrationSuccess).toBeTruthy()
        expect(endValue2.registrationSuccess).toBeFalsy()
    })

    test('registration loading', () => {



        const action1 = registrationActions.registrationLoadingAC(true)

        const endValue1 = registrationReducer(startValue,action1)

        expect(endValue1.loading).toBeTruthy()
    })
    test('registration set error', () => {



        const action1 = registrationActions.registrationErrorAC('err')

        const endValue1 = registrationReducer(startValue,action1)

        expect(endValue1.error).toBe('err')
    })


})