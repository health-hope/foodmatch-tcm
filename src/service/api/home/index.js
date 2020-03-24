import request from '../../request'
/**
 * 加载中医配餐封面内容。
 * @param {String} code 配餐类型
 */
export const apiHomeData = (code) => request('/ego-gw/v3/tcm/food/matching/index.do', { code },{loading:true})
/**
 * 查询配餐状态。
 * @param {String} code 配餐类型
 */
export const apiFoodStatus = (code,userId) => request('/ego-gw/v3/tcm/food/matching/user/status/find.do', { code,userId })
