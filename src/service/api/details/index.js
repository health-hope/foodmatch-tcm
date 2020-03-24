import request from '../../request'
/**
 * 加载食物信息
 * @param {String} code 配餐类型
 * @param {String} userId 用户唯一Id
 * @param {String} foodId 食物id
 */
export const apiFoodDetails = (code,userId,foodId,mealType) => request('/ego-gw/v3/tcm/food/matching/diet/food/query.do', { code,userId,foodId,mealType },{loading:true})
