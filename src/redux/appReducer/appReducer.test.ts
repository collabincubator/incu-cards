import appReducer, {appActions} from "./appReducer";


let startValue: any = {}
beforeEach(() => {
    startValue = {
        status: 'idle',
        error: '',
        initializing: false
    }
})
describe('app reducer', () => {
    test('error should be set', () => {

        const errorrstr = 'some error'
        const action = appActions.setAppErrorAC(errorrstr)

        const endValue = appReducer(startValue, action)

        expect(endValue.error).toBeDefined()
        expect(endValue.error).toBe(errorrstr)
        expect(endValue.status).toBe('idle')
        expect(endValue.initializing).toBeFalsy()
    })

    test('app should be initialize', () => {


        const action = appActions.setInitializingAC(true)

        const endValue = appReducer(startValue, action)

        expect(endValue.initializing).toBeDefined()
        expect(endValue.initializing).toBeTruthy()
    })
    test('status should be changed', () => {


        const action1 = appActions.setAppStatusAC('loading')
        const action2 = appActions.setAppStatusAC('succeeded')
        const action3 = appActions.setAppStatusAC('failed')

        const endValue1 = appReducer(startValue, action1)
        const endValue2 = appReducer(startValue, action2)
        const endValue3 = appReducer(startValue, action3)

        expect(endValue1.status).toBe('loading')
        expect(endValue2.status).toBe('succeeded')
        expect(endValue3.status).toBe('failed')
    })

})