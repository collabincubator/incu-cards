import {packType} from "../../api/cards-api";
import {packsActions, packsReducer} from "./PacksReducer";


let startValue:any = {}
beforeEach(() => {
    startValue = {
        cardPacks: [] ,
        cardPacksTotalCount: 0,
        maxCardsCount: 20,
        minCardsCount: 10,
        page: 1 ,
        pageCount: 0 ,
    }
})
describe('profile  reducer', ()=> {
    test('data should be set', () => {
        const data = {
            cardPacks: [{
                _id: 'dddd',
                user_id: 'dddd',
                name: 'ddd',
                path: 'ddd',
                cardsCount: 0,
                grade: 0,
                shots: 0,
                rating: 0,
                type: 'dsfsdf',
                created: 'sfsdf',
                updated: 'sfsdfsdf',
                __v: 0,
            }],
            cardPacksTotalCount: 0,
            maxCardsCount: 20,
            minCardsCount: 10,
            page: 1 ,
            pageCount: 0 ,
        }
        const action1 = packsActions.setPacks(data.cardPacks)

        const endValue1 = packsReducer(startValue,action1)

        expect(endValue1.cardPacks[0].cardsCount).toBe(0)
    })


})