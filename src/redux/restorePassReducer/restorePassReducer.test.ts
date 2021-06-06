import restorePassReducer, {restoreActions} from "./restorePassReducer";


let startValue:any = {}
beforeEach(() => {
    startValue = {
        email: false,
        error: '',
        loading: false,
    }
})
describe('restore pass  reducer', ()=> {
    test('pass should be restored', () => {

        const action1 = restoreActions.restoreEmailSuccessAC(true)

        const endValue1 = restorePassReducer(startValue,action1)

        expect(endValue1.email).toBeTruthy()
    })

    test('restore loading', () => {



        const action1 = restoreActions.restoreEmailLoadingAC(true)

        const endValue1 = restorePassReducer(startValue,action1)

        expect(endValue1.loading).toBeTruthy()
    })
    test('registration set error', () => {

        const action1 = restoreActions.restoreEmailErrorAC('err')

        const endValue1 = restorePassReducer(startValue,action1)

        expect(endValue1.error).toBe('err')
    })


})