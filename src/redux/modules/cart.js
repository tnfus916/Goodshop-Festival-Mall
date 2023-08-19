import { apis } from "../../shared/api";
import { createAction, handleActions } from "redux-actions";
import produce from "immer";

// Actions
const GETCART = "cart/GETCART";
const GETCARTITEM = "cart/GETCARTITEM";
const MODIFYCARTITEM = "cart/MODIFYCARTITEM";
const DELETEITEM = "cart/DELETEITEM";
const DELETEALLITEM = "cart/DELETEALLITEM";

const initialState = {
    cartList: [],
}

// Action Creators
const getCart = createAction(GETCART, (cartItem) => ({ cartItem }));
const getCartItem = createAction(GETCARTITEM, (cartItem) => ({ cartItem }));
const modifyCart = createAction(MODIFYCARTITEM, (cartItem) => ({ cartItem }));
const deleteItem = createAction(DELETEITEM, (cartItemId) => ({ cartItemId }));
const deleteAllItem = createAction(DELETEALLITEM, () => ({}));

export const addCartDB = (data, navigate) => {
    return async function (dispatch) {
        await apis.addCart(data)
            .then((res) => {
                // dispatch(addCart(res.data))
                navigate("/cart", {
                    state: {
                        isCart: true
                    }
                })
            })
            .catch((error) => {
                console.log("장바구니에러", error)
                if (error.response.status === 406) {
                    window.alert(error.response.data.FAIL_message)
                }
            })
    }
}

export const getCartDB = () => {
    return async function (dispatch) {
        await apis.getCart()
            .then((res) => {
                dispatch(getCart(res.data.results))
            })
            .catch((error) => {
                console.log("장바구니아이템에러", error)
            })
    }
}

export const getItemtCartDB = () => {
    return async function (dispatch) {
        await apis.getItemCart()
            .then((res) => {
                dispatch(getCartItem(res.data.results))
            })
            .catch((error) => {
                console.log("장바구니아이템에러", error)
            })
    }
}

// 수량 변경
export const modifyCartDB = (cartItemId, cartItem) => {
    console.log("수량아이디:", cartItemId, "수량:", cartItem)
    return async function (dispatch) {
        await apis.modifyQuantity(cartItemId, cartItem)
            .then((res) => {
                dispatch(modifyCart(res.data))
            })
            .catch((error) => {
                console.log("수량변경에러", error)
            })
    }
}

// 장바구니 아이템 개별 삭제
export const deleteCartItemDB = (cartItemId) => {
    return async function (dispatch) {
        await apis.deleteItem(cartItemId)
            .then((res) => {
                dispatch(deleteItem(cartItemId))
            })
            .catch((error) => {
                console.log("개별삭제 에러", error)
            })
    }
}

//장바구니 아이템 전체 삭제
export const deleteAllItemDB = () => {
    return async function (dispatch) {
        await apis.deleteAllItem()
            .then((res) => {
                dispatch(deleteAllItem(res.data))
            })
            .catch((error) => {
                console.log("전체삭제에러", error)
            })
    }
}

export default handleActions(
    {
        [GETCART]: (state, action) =>
            produce(state, (draft) => {
                draft.cartList = action.payload.cartItem
            }),
        [GETCARTITEM]: (state, action) =>
            produce(state, (draft) => {
                draft.cartList = action.payload.cartItem
            }),
        [MODIFYCARTITEM]: (state, action) =>
            produce(state, (draft) => {
                const idx = state.cartList.findIndex((c) => c.product_id === action.payload.cartItem.product_id)
                draft.cartList[idx].quantity = action.payload.cartItem.quantity
                draft.cartList[idx].is_active = action.payload.cartItem.is_active
            }),
        [DELETEITEM]: (state, action) =>
            produce(state, (draft) => {
                draft.cartList = draft.cartList.filter((item) =>
                    item.cart_item_id !== action.payload.cartItemId
                )
            }),
        [DELETEALLITEM]: (state, action) =>
            produce(state, (draft) => {
                draft.cartList = []
            })
    },
    initialState
)