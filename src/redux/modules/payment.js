import { apis } from "../../shared/api";
import { createAction, handleActions } from "redux-actions";
import produce from "immer";

// Actions
const ADDPAYMENT = "order/ADDPAYMENT";

const initialState = {
    paymentList: [],
}

// Action Creators
const addPayment = createAction(ADDPAYMENT, (item) => ({ item }))

export const addPatymentDB = (item) => {
    return async function (dispatch) {
        await apis.directOrder(item)
            .then((res) => {
                dispatch(addPayment(res.data))
                window.alert("구매가 성공적으로 완료되었습니다. :)")
                window.location.assign("/")
            })
            .catch((error) => {
                console.log(error)
            })
    }
}

export default handleActions(
    {
        [ADDPAYMENT]: (state, action) =>
            produce(state, (draft) => {
                draft.paymentList = action.payload.item
            })
    },
    initialState
)