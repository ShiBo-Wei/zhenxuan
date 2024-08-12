import requst from '@/utils/request'
import type { TradeMarkResponseData, Trademark } from './type'

enum API {
    TRADEMARK_LIST = '/admin/product/baseTrademark/',
    ADDTRADEMARK_URL = '/admin/product/baseTrademark/save',
    UPDATETRADEMARK_URL = '/admin/product/baseTrademark/update',
    DELETE_URL = '/admin/product/baseTrademark/remove/',
}

export const reqHasTrademark = (page: number, limit: number) =>
    requst.get<any, TradeMarkResponseData>(
        API.TRADEMARK_LIST + `${page}/${limit}`,
    )

export const reqADDOrUpdateTrademark = (data: Trademark) => {
    if (data.id) {
        return requst.put<any, any>(API.UPDATETRADEMARK_URL, data)
    } else {
        return requst.post<any, any>(API.ADDTRADEMARK_URL, data)
    }
}

export const reqDeleteTrademark = (id: number) =>
    requst.delete<any, any>(API.DELETE_URL + id)
