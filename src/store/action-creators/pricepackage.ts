import { Dispatch } from "redux"
import { createPricepackageAxios, getPricepackagesAxios, getPricepackageByIdAxios, updatePricepackageAxios, removePricepackageAxios } from "../../api/pricepackage"
import { OrderType } from "../../types/common/orderType"
import { IPricepackage, PricepackageAction, PricepackageActionTypes } from "../../types/pricepackage"
import { ISearchParams } from "../../types/common/searchParams"

export const searchPricepackages = (pricepackagesSearchParams: ISearchParams<IPricepackage>) => {
    return async (dispatch: Dispatch<PricepackageAction>) => {
        try {
            dispatch({ type: PricepackageActionTypes.SET_PRICEPACKAGE_LOADING, payload: true })
            dispatch({ type: PricepackageActionTypes.SET_PRICEPACKAGE_ERROR, payload: null })
            const result = await getPricepackagesAxios(pricepackagesSearchParams)
            dispatch({ type: PricepackageActionTypes.GET_PRICEPACKAGES, payload: result.itemList })
        } catch (error) {
            dispatch({ type: PricepackageActionTypes.SET_PRICEPACKAGE_ERROR, payload: error.message || "Error of loading pricepackages." })
        } finally {
            dispatch({ type: PricepackageActionTypes.SET_PRICEPACKAGE_LOADING, payload: false })
        }
    }
}

export const getPricepackageById = (id: number) => {
    return async (dispatch: Dispatch<PricepackageAction>) => {
        try {
            dispatch({ type: PricepackageActionTypes.SET_PRICEPACKAGE_LOADING, payload: true })
            dispatch({ type: PricepackageActionTypes.SET_PRICEPACKAGE_ERROR, payload: null })
            dispatch({ type: PricepackageActionTypes.GET_PRICEPACKAGE_BY_ID, payload: await getPricepackageByIdAxios(id) })
        } catch (error) {
            dispatch({ type: PricepackageActionTypes.SET_PRICEPACKAGE_ERROR, payload: error.message || "Error of loading choosed pricepackage." })
        } finally {
            dispatch({ type: PricepackageActionTypes.SET_PRICEPACKAGE_LOADING, payload: false })
        }
    }
}

export const setPricepackageLoading = (isLoading: boolean) => {
    return async (dispatch: Dispatch<PricepackageAction>) =>
        dispatch({ type: PricepackageActionTypes.SET_PRICEPACKAGE_LOADING, payload: isLoading })
}

export const setPricepackageError = (message: string) => {
    return async (dispatch: Dispatch<PricepackageAction>) =>
        dispatch({ type: PricepackageActionTypes.SET_PRICEPACKAGE_ERROR, payload: message })
}

export const setPricepackagePage = (page: number) => {
    return async (dispatch: Dispatch<PricepackageAction>) =>
        dispatch({ type: PricepackageActionTypes.SET_PRICEPACKAGE_PAGE, payload: page })
}

export const setPricepackageSortfield = (sortField: string) => {
    return async (dispatch: Dispatch<PricepackageAction>) =>
        dispatch({ type: PricepackageActionTypes.SET_PRICEPACKAGE_SORTFIELD, payload: sortField })
}

export const setPricepackageSort = (sort: OrderType) => {
    return async (dispatch: Dispatch<PricepackageAction>) =>
        dispatch({ type: PricepackageActionTypes.SET_PRICEPACKAGE_SORT, payload: sort })
}

export const createPricepackage = (Pricepackage: IPricepackage) => {
    return async (dispatch: Dispatch<PricepackageAction>) => {
        try {
            dispatch({ type: PricepackageActionTypes.SET_PRICEPACKAGE_LOADING, payload: true })
            dispatch({ type: PricepackageActionTypes.SET_PRICEPACKAGE_ERROR, payload: null })
            dispatch({ type: PricepackageActionTypes.CREATE_PRICEPACKAGE, payload: await createPricepackageAxios(Pricepackage) })
        } catch (error) {
            dispatch({ type: PricepackageActionTypes.SET_PRICEPACKAGE_ERROR, payload: error.message || "Error while creating the pricepackage." })
        } finally {
            dispatch({ type: PricepackageActionTypes.SET_PRICEPACKAGE_LOADING, payload: false })
        }
    }
}

export const updatePricepackage = (Pricepackage: IPricepackage) => {
    return async (dispatch: Dispatch<PricepackageAction>) => {
        try {
            dispatch({ type: PricepackageActionTypes.SET_PRICEPACKAGE_LOADING, payload: true })
            dispatch({ type: PricepackageActionTypes.SET_PRICEPACKAGE_ERROR, payload: null })
            dispatch({ type: PricepackageActionTypes.UPDATE_PRICEPACKAGE, payload: await updatePricepackageAxios(Pricepackage) })
        } catch (error) {
            dispatch({ type: PricepackageActionTypes.SET_PRICEPACKAGE_ERROR, payload: error.message || "Error while updating the pricepackage." })
        } finally {
            dispatch({ type: PricepackageActionTypes.SET_PRICEPACKAGE_LOADING, payload: false })
        }
    }
}

export const removePricepackage = (Pricepackage: IPricepackage) => {
    return async (dispatch: Dispatch<PricepackageAction>) => {
        try {
            dispatch({ type: PricepackageActionTypes.SET_PRICEPACKAGE_LOADING, payload: true })
            dispatch({ type: PricepackageActionTypes.SET_PRICEPACKAGE_ERROR, payload: null })
            await removePricepackageAxios(Pricepackage.id);
            dispatch({ type: PricepackageActionTypes.REMOVE_PRICEPACKAGE, payload: Pricepackage.id })
        } catch (error) {
            dispatch({ type: PricepackageActionTypes.SET_PRICEPACKAGE_ERROR, payload: error.message || "Error while removing the pricepackage." })
        } finally {
            dispatch({ type: PricepackageActionTypes.SET_PRICEPACKAGE_LOADING, payload: false })
        }
    }
}
