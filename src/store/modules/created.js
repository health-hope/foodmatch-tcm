const created = {
	namespaced: true, // 开启命名空间
	state: {
		isCreated: '',		// 是否重新生成 1：重新生成
		imageUrls: [],		// 食物参照量
	},
	actions: {
	},
	mutations: {
		setCreated(state, payload){
            state.isCreated = payload
		},
		saveImageUrls(state, payload) {
			state.imageUrls = payload
		}
	},
	getters: {
	}
}
export default created
