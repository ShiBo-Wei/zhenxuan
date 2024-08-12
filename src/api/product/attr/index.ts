import request from '@/utils/request'
import type { CategoryResponseData, AttrResponseData } from './type'
enum API {
    C1_URL = '/admin/product/getCategory1',
    C2_URL = '/admin/product/getCategory2/',
    C3_URL = '/admin/product/getCategory3/',
    ATTR_URL = '/admin/product/attrInfoList/',
}

export const reqC1 = () => request.get<any, CategoryResponseData>(API.C1_URL)
export const reqC2 = (Category1Id: number | string) =>
    request.get<any, CategoryResponseData>(API.C2_URL + Category1Id)
export const reqC3 = (Category2Id: number | string) =>
    request.get<any, CategoryResponseData>(API.C3_URL + Category2Id)

export const reqAttr = (
    category1Id: number | string,
    category2Id: number | string,
    category3Id: number | string,
) =>
    request.get<any, AttrResponseData>(
        API.ATTR_URL + `${category1Id}/${category2Id}/${category3Id}`,
    )
