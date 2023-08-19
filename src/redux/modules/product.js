import { apis } from "../../shared/api";
import { createAction, handleActions } from "redux-actions";
import produce from "immer";

// Actions
const GETPRODUCT = "product/GETPRODUCT";
const GETONEPRODUCT = "product/GETONEPRODUCT";
const GETSELLERPRODUCT = "product/GETSELLERPRODUCT";
const DELETEPRODUCT = "product/DELETEPRODUCT";
const MODIFYPRODUCT = "product/MODIFYPRODUCT";

const initialState = {
    products: [],
    count: 1,
    productOne: [],
    sellerProducts: [],
    searchProduct: [],
}

//Action Creators
const getProduct = createAction(GETPRODUCT, (products, count) => ({ products, count }))
const getOneProduct = createAction(GETONEPRODUCT, (productOne) => ({ productOne }))
const getSellerProduct = createAction(GETSELLERPRODUCT, (products) => ({ products }))
const deleteProduct = createAction(DELETEPRODUCT, (productId) => ({ productId }))
const modifyProduct = createAction(MODIFYPRODUCT, (product) => ({ product }))

export const getProductDB = (page) => {
    return async function (dispatch) {
        await apis.getProduct(page)
            .then((res) => {
                dispatch(getProduct(res.data.results, res.data.count))
            })
            .catch((error) => {
                console.log("상품에러", error)
                return;
            })
    }
}

// 게시물 하나 불러오기
export const getOneProductDB = (productId) => {
    return async function (dispatch) {
        await apis.getOneProduct(productId)
            .then((res) => {
                dispatch(getOneProduct(res.data))
            })
            .catch((error) => {
                console.log("상품하나", error)
            })
    }
}

// 상품 업로드
export const addProductDB = (product) => {
    return async function (dispatch) {
        await apis.addProduct(product)
            .then((res) => {
                window.location.assign("/seller-center")
            })
            .catch((error) => {
                console.log(error)
            })
    }
}

// 판매자 상품 불러오기
export const getSellerProductDB = () => {
    return async function (dispatch) {
        await apis.getSellerProduct()
            .then((res) => {
                dispatch(getSellerProduct(res.data.results))
            })
            .catch((error) => {
                console.log(error)
            })
    }
}

// 판매상품 삭제하기
export const deleteProductDB = (productId) => {
    return async function (dispatch) {
        await apis.deleteProduct(productId)
            .then((res) => {
                dispatch(deleteProduct(productId))
            })
            .catch((error) => {
                console.log(error)
            })
    }
}

// 판매상품 수정하기
export const modifyProductDB = (sellerProductId, product) => {
    return async function (dispatch) {
        await apis.modifyProduct(sellerProductId, product)
            .then((res) => {
                dispatch(modifyProduct(res.data))
                window.location.assign("/seller-center")
            })
            .catch((error) => {
                console.log(error)
            })
    }
}

export default handleActions(
    {
        [GETPRODUCT]: (state, action) =>
            produce(state, (draft) => {
                draft.products = draft.products.concat(action.payload.products)
                draft.count = action.payload.count
            }),
        [GETONEPRODUCT]: (state, action) =>
            produce(state, (draft) => {
                draft.productOne = action.payload.productOne
            }),
        [GETSELLERPRODUCT]: (state, action) =>
            produce(state, (draft) => {
                draft.sellerProducts = action.payload.products
            }),
        [DELETEPRODUCT]: (state, action) =>
            produce(state, (draft) => {
                draft.sellerProducts = draft.sellerProducts.filter((product) =>
                    product.product_id !== action.payload.productId
                )
            }),
        [MODIFYPRODUCT]: (state, action) =>
            produce(state, (draft) => {
                const idx = state.sellerProducts.findIndex((p) => p.product_id === action.payload.product_id)
                draft.sellerProducts[idx] = action.payload.product[idx]
            }),
    },
    initialState
);