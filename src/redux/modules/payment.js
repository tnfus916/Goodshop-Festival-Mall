import { apis } from "../../shared/api";
import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { useNavigate } from "react-router-dom";

// Actions
const ADDPAYMENT = "order/ADDPAYMENT";

const initialState = {
    paymentList: [],
}

// Action Creators
const addPayment = createAction(ADDPAYMENT, (item) => ({ item }))

export const addPaymentDB = (item) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate();

    console.log(item);
    
    return async function (dispatch) {
        await apis.directOrder(item)
            .then((res) => {
                dispatch(addPayment(res.data))
                window.alert("구매가 성공적으로 완료되었습니다. :)")
                navigate("/order-info", {
                    // state: {
                    //   total_price: sum + shippingFeeSum,
                    //   order_kind: "cart_order",
                    //   checkCartItem,
                    //   checkedProduct,
                    //   item,
                    //   shipping_fee: shippingFeeSum,
                    // },
                });
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