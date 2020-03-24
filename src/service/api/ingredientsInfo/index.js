import request from '../../request'
/**
 * 食材信息
 * @param {String} userId 用户Id
 * @param {String} foodId 食物id
 */
export const getIngredientsInfo = (userId,foodId,code,type) => request('/ego-gw/v3/tcm/food/matching/diet/material/query.do', { userId,foodId,code,type },{loading:true})

