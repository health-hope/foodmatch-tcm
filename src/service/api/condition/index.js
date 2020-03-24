import request from '../../request'
/**
 * 加载中医测封面内容。
 * @param {String} type 中医证候类型
 * @param {String} userId 用户Id
 * @param {String} isAssociated 是否关联测评结果 null/0：不关联，1：关联
 */ 
export const getUserInfo = (code, userId,isAssociated) => request('/ego-gw/v3/tcm/food/matching/user/info/query.do', { code,userId,isAssociated },{loading:true})
/**
 * 保存更新饮食推荐用户信息
 * @param {String} type 中医证候类型
 * @param {String} openId 用户Id
 * @param {String} resultType 配餐类型信息
 * @param {Object} basicInfo 用户基本信息
 * @param {Object} dietRecommend 饮食偏好
 */
export const postUpsert = (code,userId,resultType,basicInfo,dietRecommend) => request('/ego-gw/v3/tcm/food/matching/user/info/upsert.do', { code,userId,resultType,basicInfo,dietRecommend})