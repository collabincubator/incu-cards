import  {changePassActions} from './changePassReducer'
import changePassReducer from "./changePassReducer";

let startValue:any = {}
beforeEach(() => {
    startValue = {
        successChangePass:false,
        loading:false,
        error:''
    }
})
describe('change pass reducer', ()=> {
    test('change pass should be success', () => {

        const action1 = changePassActions.successChangePassAC(false)
        const action2 = changePassActions.successChangePassAC(true)

        const endValue1 = changePassReducer(startValue,action1)
        const endValue2 = changePassReducer(startValue,action2)

        expect(endValue1.successChangePass).toBeFalsy()
        expect(endValue2.successChangePass).toBeTruthy()
    })

    test('loading', () => {

        const action1 = changePassActions.loadingAC(false)
        const action2 = changePassActions.loadingAC(true)

        const endValue1 = changePassReducer(startValue,action1)
        const endValue2 = changePassReducer(startValue,action2)

        expect(endValue1.loading).toBeFalsy()
        expect(endValue2.loading).toBeTruthy()
    })
    test('error should be set', () => {

        const action1 = changePassActions.errorAC('error')

        const endValue1 = changePassReducer(startValue,action1)

        expect(endValue1.error).toBe('error')
    })
})