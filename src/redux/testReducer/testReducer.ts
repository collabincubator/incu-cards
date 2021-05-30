const TEST_CONSTANT = 'testReducer/TEST-CONSTANT';

const initialState = {
    test: 'test'
};
type InitialStateType = typeof initialState;

export const testReducer = (state: InitialStateType = initialState, action: TestActionType):InitialStateType => {
    switch (action.type) {

        default: return state;
    }
}
type actionsType = TestActionType;

export const action:{type: string} = {
    type: TEST_CONSTANT
}
export type TestActionType = {
    type: typeof TEST_CONSTANT
};

export default testReducer;