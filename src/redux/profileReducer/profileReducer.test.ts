
import profileReducer, {profileActions} from "./profileReducer";


let startValue:any = {}
beforeEach(() => {
    startValue = {
        profile: null,
    }
})
describe('profile  reducer', ()=> {
    test('data should be set', () => {
        const data = {
            _id: '123-123-231-132123-123123-13-adsasd-23',
            email: 'ddddd',
            name: 'ddddd',
            avatar: 'ddddd',
            publicCardPacksCount: 1,
            created: new Date(),
            updated:  new Date(),
            isAdmin: false,
            verified: false ,
            rememberMe: false,
            error: 'ddddd',
        }
        const action1 = profileActions.setProfileDataAC(data)

        const endValue1 = profileReducer(startValue,action1)

        expect(endValue1.profile?._id).toBe('123-123-231-132123-123123-13-adsasd-23')
    })


})