<template>
    <div class="home">
        <!-- 测评结果模块 -->
        <div class="evaluation-result" :style="{ backgroundImage: `url(${ evaluationResult.imageUrl })`}">
            <dl>
                <dt>{{evaluationResult.title}}</dt>
                <dd class="siyuan"> {{evaluationResult.resultType}}</dd>
            </dl>
        </div>
        <!-- 建议内容 -->
        <div class="ctn result-cont">
            <p>{{evaluationResult.content}}</p>
            <!-- bg 元素 -->
            <layBg/>
        </div>
        <!-- 每日配餐方案 -->
        <div class="days-programme" v-if="recipesInfo && recipesInfo.recipes">
            <!-- 标题 -->
            <div class="programme-tit" :style="{backgroundImage: 'url(jgy_bg_wsmhdzxyx.png)'}  | PUBLIC_PATH">
                <div class="pro-tit">每日配餐方案</div>
            </div>
            <!-- 内容 -->
            <div class="ctn days-cont">
                <!-- 日历 -->
                <div class="calendar-c">
                    <BetterScroll key="scroll111" :data="recipesInfo.recipes" :scrollX="true" @example="scrollEXP2">
                        <div class="calendar" ref="scrollView" :style="{width: `${scrollWidth}px`}">
                            <div class="ys"></div>
                            <div class="calendar-box" v-for="(item, i) in recipesInfo.recipes" :key="`${i}a`">
                                <div class="top">
                                    <span
                                        v-if="item.isCurDay == '2'"
                                        :class="item.isCurDay =='2' ? 'orange-col':''"
                                        :key="`${i}a`"
                                    >今日</span>
                                    <span
                                        v-else
                                        :class="item.isCurDay =='2' ? 'orange-col':''"
                                        :key="`${i}b`"
                                    >{{item.recipesDate | getCutWeek}}</span>
                                </div>
                                <div class="bto">
                                    <span
                                        @click="loadRecipeDetails(item.recipesDate,i)"
                                        :class="(i == curRecipesDateIndex) ? 'orange-col':''"
                                    >{{item.recipesDate | getCutDay}}</span>
                                </div>
                            </div>
                            <div class="ys"></div>
                        </div>
                    </BetterScroll>
                    <img class="r-left" :src="'bg_calendar_left_mask.png' | PUBLIC_PATH" alt>
                    <img class="r-right" :src="'bg_calendar_right_mask.png' | PUBLIC_PATH" alt>
                </div>
                <!-- 饮食方案内容 -->
                <div class="diet-recommendation">
                    <div class="diet-recommendation-tit" v-if="dietList && dietList.length">
                        <BetterScroll key="scroll222" :data="recipesInfo.recipes" :scrollX="true" @example="scrollEXP1">
                            <ul ref="scrollView1" :style="{width: `${scrollWidth1}px`}">
                                <li class="ys"></li>
                                <li
                                    :class="currentType== diet.mealType ?'curli li':'li'" 
                                    v-for="(diet, index) in dietList" :key="`list${index}`"
                                    @click="getMealType(diet.mealType)"
                                >{{ diet.mealTypeDispalyName }}</li>
                                <li class="ys"></li>
                            </ul>
                        </BetterScroll>
                        <img class="r-left" :src="'bg_cc_left_mask.png' | PUBLIC_PATH" alt>
                        <img class="r-right" :src="'bg_cc_right_mask.png' | PUBLIC_PATH" alt>
                    </div>
                    <template v-for="(diet, index) in dietList">
                        <div
                            class="diet-cont"
                            :key="`li${index}`"
                            v-show="currentType == diet.mealType"
                        >
                            <div class="box">
                                <p>{{diet.description}}</p>
                            </div>
                            <ul class="recommended-list">
                                <li
                                    v-for="(item,i) in diet.foodList"
                                    :key="i"
                                    @click="foodInformation(item,diet.mealType)"
                                >
                                    <dl>
                                        <dt>
                                            <img :src="item.imageUrl" />
                                        </dt>
                                        <dd>
                                            {{item.foodName}}
                                            <p>{{item.foodHeat}}大卡/{{item.foodCount}}克</p>
                                        </dd>
                                    </dl>
                                    <img class="icon-change" :class="{huan:i===animateIndex && typeString==diet.mealTypeDispalyName}" :src="'pc_button_hyh.png' | PUBLIC_PATH" @click.stop="changeRecipe(item,diet.mealType,i,diet.mealTypeDispalyName)" />
                                </li>
                            </ul>
                        </div>
                    </template>
                </div>
                <!-- bg 元素 -->
                <LayBg/>
                <!-- 推荐茶饮 -->
                <div class="tea-cont" v-if="drink && drink.mealTypeDispalyName">
                    <div class="tea-tit">
                        <img :src="'pc_icon_tjcy.png' | PUBLIC_PATH" />
                        <span>{{ drink.mealTypeDispalyName }}</span>
                    </div>
                    <ul class="recommended-list">
                        <li
                            v-for="(item,i) in drink.foodList"
                            :key="i"
                            @click="foodInformation(item,drink.mealType)"
                        >
                            <dl>
                                <dt>
                                    <img :src="item.imageUrl" />
                                </dt>
                                <dd>
                                    {{item.foodName}}
                                    <p>{{item.foodHeat}}大卡/{{item.foodCount}}克</p>
                                </dd>
                            </dl>
                            <img class="icon-change" :class="{huan:i===animateIndex && typeString==drink.mealTypeDispalyName}" :src="'pc_button_hyh.png' | PUBLIC_PATH" @click.stop="changeRecipe(item,drink.mealType,i,drink.mealTypeDispalyName)"
                            />
                        </li>
                    </ul>
                </div>
            </div>
            
        </div>
        <!-- 食物参照量 -->
        <Reference :hackReset.sync="hackReset" class="reference" :imgUrl="estimate.imageUrls"/>
        <!-- 调整配餐 按钮 -->
        <div class="icon reset-meal-icon">
            <button @click="resetMeal" :style="{backgroundImage: 'url(jgy_button_bg_bai.png)'}  | PUBLIC_PATH">调整配餐</button>
        </div>
    </div>
    
    
</template>
<script>
    import { mapState,mapMutations } from 'vuex'
    import { apiRecommendation,apiDietDetail,apiChangement } from '@/service/api/result'
    import { TimeTool } from "@assets/js/timeTool.js";
    import { isEmpty } from '@assets/js/util';
    import LayBg from '@/components/common/LayBg';
    import BetterScroll from '@/components/common/BetterScroll.vue'
    import Reference from '@/components/common/Reference.vue'
    export default {
        data () {
            return {
                imageUrls: [],
                hackReset: false,
                animateIndex: "", // 动画index，用于换一换
		        typeString: "",	//餐类，用于换一换
                dietList:[],
                drink: {},
                scrollWidth: 0,
                scrollWidth1: 0,
                evaluationResult: {},
                recipesInfo: {},
                estimate: {},
                currentType: 1, //当前餐次的值，默认是早餐,初始化值为1
                recipesDate:"", //当前食谱日期 格式yyyy-MM-dd
                curRecipesDateIndex: '', //当前食谱日期Index
                recipesId:"", // 当前食谱id
                changeFoodList: [],
                changeLists: [],
                scroll111: null,   // 餐次滚动实例
                scroll222: null,   // 日历滚动实例
            }
        },
        beforeRouteEnter (to, from, next) {
            next(vm=>{
                console.log(from.path)
                if(from.path == "/configure"){
                    vm.setCreated("1");
                    vm.currentType = 1; //当前餐次的值，默认是早餐,初始化值为1
                    vm.loadData();
                }else{
                    vm.setCreated("");
                }
            })
        },
        components: {
            LayBg,
            BetterScroll,
            Reference
        },
        computed: {
            ...mapState(['code','userId']),
            ...mapState('created',['isCreated'])
        },
        created () {
            // 加载数据
            this.loadData();
            
        },
        // 过滤器
        filters:{
            // 获取当前天的值
　　　　　    getCutDay:function(date){
　　　　　　      return new TimeTool().getDetail(date).day;
　　　　　　  },
            // 获取当前天对应的周 或者今日
            getCutWeek:function(date){
                let weekNum = new TimeTool().getDetail(date).week;
                let weekString;
                if(weekNum == 1){
                    weekString = "一"
                }else if(weekNum == 2){
                    weekString = "二"
                }else if(weekNum == 3){
                    weekString = "三"
                }else if(weekNum == 4){
                    weekString = "四"
                }else if(weekNum == 5){
                    weekString = "五"
                }else if(weekNum == 6){
                    weekString = "六"
                }else if(weekNum == 7){
                    weekString = "日"
                }
                return weekString; 
            }
　　　　 },
        methods: {
            ...mapMutations('created',['setCreated','saveImageUrls']),
            scrollEXP1(val) {
                this.scroll111 = val
            },
            scrollEXP2(val) {
                this.scroll222 = val
            },
            // 点击日历重新查看食谱详情
            loadRecipeDetails: async function(date,i){
                this.scroll111.scrollTo(0,0,500)
                this.curRecipesDateIndex = i;
                this.currentType = 1;
                // 加载食谱详情
                this.recipesDate = date;
                this.loadDietDetail();
            },
            // 换一换
            changeRecipe: async function(item,mealType,index,name){
                let that = this;
                that.animateIndex = index;
			    that.typeString = name;
                // 日期、食谱id、用户id、code需外露    
                const changeData = await apiChangement(that.code,that.userId,item.foodId,item.foodName,item.foodHeat,item.initialHeat,mealType,that.recipesId,that.recipesDate);
                
                //数据赋值
                // Object.assign(item,changeData.foodInfo)	
                let keys=Object.keys(changeData.foodInfo)
                for(let i=0;i<keys.length;i++){
                    // that.$set(item,keys[i],data.foodInfo[keys[i]])
                    item[keys[i]]=changeData.foodInfo[keys[i]]
                }
                // 清空设置
                that.animateIndex = "";
				that.typeString = "";
            },
            // 查看食物信息
            foodInformation:function(item,type){
                let that  = this;
                if(item.foodProperty == "01"){
                    // 跳转查询食材
                    that.$router.push({
                        path: '/ingredientsInfo',
                        query: {
                            type: "1", // 固定类型为食材，不会出现药材，已与专业组做过沟通
                            foodId: item.foodId
                        }
                    })
                }else if(item.foodProperty == "02" || item.foodProperty == "03"){
                    // 跳转查询食物
                    that.$router.push({
                        path: '/details',
                        query: {
                            code: that.code,
                            userId: that.userId,
                            foodId: item.foodId,
                            mealType: type
                        }
                    })
                }
                
            },
            // 点击餐次显示不同的餐别 获取mealType
            getMealType(type){
                this.currentType = type;
            },
            // 首先等配餐结果拿到数据
            async loadData () {
                const data = await apiRecommendation(this.code,this.userId,config.dayLength,this.isCreated);
                if(data.status == "1"){//无效
                    this.$router.replace("/")
                }else{
                    this.evaluationResult = data.evaluationResult;
                    this.estimate = data.estimate;
                    this.saveImageUrls(this.estimate.imageUrls)
                    this.recipesInfo = data.recipesInfo;
                    this.$nextTick(()=>{
                        this.scrollWidth = this.$refs.scrollView.scrollWidth
                    })
                    // 循环遍历数据拿到当前天的i，赋值给curRecipesDateIndex
                    this.dataTraversal();
                    //食谱id赋值，获取当天食谱日期并赋值，加载食谱详情接口
                    this.recipesId = this.recipesInfo.recipesId; //食谱id赋值，单独使用
                    // 获取当天食谱日期
                    this.recipesDate = this.getCurRecipes(this.recipesInfo.recipes);
                    // 加载食谱详情接口
                    this.loadDietDetail();
                }
                
            },
            // 初始化循环数据遍历 在生成配餐页面
            dataTraversal(){
                this.recipesInfo.recipes.some((item,i)=>{
                    if(item.isCurDay == "2") {
                        this.curRecipesDateIndex = i
                        let clientWidth = document.documentElement.clientWidth
                        let scrollLeft = (clientWidth/(750/90) * i)
                        this.$nextTick(()=>{
                            console.log(this.$refs.scrollView)
                            this.$refs.scrollView.scrollLeft = scrollLeft
                        })
                        return
                    }
                })
            },
            // 食谱详情接口
            async loadDietDetail() {
                const dietDetail= await apiDietDetail(this.code, this.userId, this.recipesId, this.recipesDate);
                let dietList = [    // 6餐
                    dietDetail.dietRecommendation.breakfast,
                    dietDetail.dietRecommendation.breakfastAddition,
                    dietDetail.dietRecommendation.lunch,
                    dietDetail.dietRecommendation.lunchAddition,
                    dietDetail.dietRecommendation.dinner,
                    dietDetail.dietRecommendation.dinnerAddition
                ];
                this.dietList = dietList.filter(item => !isEmpty(item));
                this.drink = dietDetail.dietRecommendation.drink;     // 茶饮推荐
                this.$nextTick(()=>{
                    // 动态获取横线滚动的宽度
                    this.scrollWidth1 = this.$refs.scrollView1.scrollWidth;
                })
            },
            // 调整配餐
            resetMeal(){
                this.setCreated("1");
                this.$router.push('/configure')
            },
            // 获取当天食谱的日期
            getCurRecipes(obj){
                for(let i=0;i<obj.length;i++){
                    // 判断是当天 1:过去天，3:未来天
                    if(obj[i].isCurDay == "2"){
                        return obj[i].recipesDate;
                    }
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
@import "@/assets/style/mixin.scss";
    /*隐藏滚动条bar*/
    .hide_bar::-webkit-scrollbar {
        display: none;
    }
    *::-webkit-scrollbar {
        display: none;
    }
    // 调整配餐按钮
    .reset-meal-icon{
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 1.1rem;
        button{
            width: 6.5rem;
            height: 2.5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            background-repeat: no-repeat;
            background-position: center center;
            @include bg_color6();
            background-size: 6rem 2rem;
            @include font_color1();
            font-size: .9rem;
            @include box_shodow5(0 .3rem .75rem 0);
            border-radius: 1.25rem;
            font-weight: bold;
        }
    }
    .home {
        width: 100%;
        min-height: 100%;
        padding: .8rem 0.75rem;
        box-sizing: border-box;
        @include bg_color1();
        // 配餐结果
        .evaluation-result{
            background-repeat: no-repeat;
            background-size: 100% auto;
            width: 100%;
            height: 5.5rem;
            .siyuan{
                font-family: "SourceHanSerifCN-Bold";
            }
            dl{
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                padding-left: 1.05rem;
                padding-top: 1rem;
                dt{
                    display: flex;
                    align-items: flex-start;
                    @include font_color1();
                    font-size: .7rem;
                    line-height: 1rem;
                    margin-bottom: .3rem;
                    opacity: 0.6;
                }
                dd{
                    font-size: 1.6rem;
                    @include font_color1();
                    line-height: 1.8rem;
                }
            }
        }
        // 测评结果介绍
        .result-cont{
            border-top-left-radius: 0;
            border-top-right-radius: 0;
            p{
                // padding-bottom: .75rem;
                padding: 0 1.05rem 0.75rem;
                line-height: 140%;
                font-size: .75rem;
                @include font_color8();
            }
        }
        // 四个角背景
        .ctn {
            @include bg_color6();
            @include box_shodow1(0 0.3rem 1rem 0);
            border-radius: 0.2rem;
            padding: 1.35rem 0 0.3rem;
            box-sizing: border-box;
            position: relative;
        }
        // 日历
        .calendar-c {
            position: relative;
            width: 100%;
            margin-bottom: 1.4rem;
            .calendar {
                width: 100%;
                overflow-x: auto;
                display: flex;
                .calendar-box {
                    width: 1.6rem /* 64/40 */;
                    height: 2.875rem /* 115/40 */;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    align-items: center;
                    white-space: nowrap;
                    flex-shrink: 0;
                    & + .calendar-box {
                        margin-left: .65rem /* 26/40 */;
                    }
                    .top {
                        font-size: 0.7rem;
                        span {
                            @include font_color14();
                            &.orange-col {
                                @include font_color10();
                            }
                        }
                    }
                    .bto {
                        span {
                            @include font_color4();
                            font-size: 0.85rem;
                            border-radius: 50%;
                            width: 1.6rem;
                            height: 1.6rem;
                            font-weight: bold;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            &.orange-col {
                                @include bg_color();
                                @include font_color6();
                            }
                        }
                    }
                }
                .ys {
                    width: 1.05rem /* 42/40 */;
                    height: 2.875rem /* 115/40 */;
                    display: flex;
                    flex-shrink: 0;
                }
            }
            .r-left {
                width: 1.05rem /* 42/40 */;
                height: 2.875rem /* 115/40 */;
                position: absolute;
                right: 0;
                top: 0;
                bottom: 0;
            }
            .r-right {
                width: 1.05rem /* 42/40 */;
                height: 2.875rem /* 115/40 */;
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
            }
        }
        
        // 每日配餐方案
        .days-programme{
            margin-top: .8rem;
            .days-cont{
                border-top-left-radius: 0;
                border-top-right-radius: 0;
                margin-bottom: 1rem;
            }
            // 标题
            .programme-tit{
                background-repeat: no-repeat;
                width: 100%;
                height: 2.2rem;
                background-size: cover;
                box-sizing: border-box;
                padding:0 1.05rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .pro-tit{
                    @include font_color6();
                    font-size: .85rem;
                    font-weight: bold;
                }
                .time{
                    font-size: .85rem;
                    @include font_color1();
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    img{
                        width: .475rem;
                        height: .3rem;
                        margin-left: .3rem;
                    }
                }
            }
            // diet-recommendation
            .diet-recommendation{
                .diet-recommendation-tit{
                    display: flex;
                    overflow-x: scroll;
                    width: 100%;
                    position: relative;
                    ul {
                        display: flex;
                        justify-content: space-between;
                        white-space: nowrap;
                        .li {
                            flex-shrink: 0;
                            font-size: 0.85rem;
                            @include font_color5();
                            line-height: 1.2rem;
                            height: 2.5rem /* 100/40 */;
                            text-align: center;
                            & + .li {
                                margin-left: 1.4rem;
                            }
                        }
                        .ys {
                            width: 1.05rem /* 42/40 */;
                            height: 1.7rem /* 68/40 */;
                            display: flex;
                            flex-shrink: 0;
                            margin: 0;
                        }
                        .curli {
                            @include font_color10();
                            position: relative;
                            font-weight: bold;
                            &::after {
                                width: 0.29rem;
                                height: 0.29rem;
                                @include bg_color();
                                border-radius: 50%;
                                content: "";
                                position: absolute;
                                top: 1.4rem;
                                left: 38%;
                            }
                        }
                    }
                    .r-left {
                        width: 1.05rem /* 42/40 */;
                        height: 1.7rem /* 68/40 */;
                        position: absolute;
                        right: 0;
                        top: 0;
                        bottom: 0;
                    }
                    .r-right {
                        width: 1.05rem /* 42/40 */;
                        height: 1.7rem /* 68/40 */;
                        position: absolute;
                        left: 0;
                        top: 0;
                        bottom: 0;
                    }
                }
                // 饮食推荐内容
                .diet-cont{
                    padding:0 1.05rem;
                    // 饮食推荐内容
                    .box{
                        @include bg_color23();
                        padding:.25rem;
                        p{
                            // @include border2(1px solid);
                             @include border5(1px solid);
                            font-size: .75rem;
                            @include font_color1();
                            line-height: 1.025rem;
                            padding: .55rem .25rem;
                            font-weight: bold;
                        }
                    }
                    
                }
            }

        }
        // 茶饮
        .tea-cont {
            padding: 0 1.05rem;
            box-sizing: border-box;
            .tea-tit {
                display: flex;
                align-items: center;
                padding: 0 .25rem /* 10/40 */;
                box-sizing: border-box;
                img {
                    width: 0.75rem;
                    height: 0.75rem;
                    margin-right: 0.5rem;
                }
                span {
                    font-size: 0.85rem;
                    @include font_color4();
                    font-weight: bold;
                }
            }
        }
        // 动画
        @-webkit-keyframes spin {
            from {
                -webkit-transform: rotate(0deg);
            }
            to {
                -webkit-transform: rotate(300deg);
            }
        }
        
        @keyframes spin {
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(300deg);
            }
        }
        // 推荐饮食和推荐茶饮模板样式
        .recommended-list{
            padding-bottom: 1.125rem;
            padding-top: .35rem;
            li{
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: .7rem;
                dl{
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                    dt{
                        margin-right: .5rem;
                        img{
                            width: 2.2rem;
                            height: 2.2rem;
                            border-radius: 50%;
                        }
                    }
                    dd{
                        font-size: .75rem;
                        @include font_color4();
                        font-weight: bold;
                        p{
                            margin-top: .1rem;
                            font-size: .6rem;
                            @include font_color5();
                            font-weight: normal;
                        }
                    }
                }
                .icon-change{
                    width: 1.6rem;
                    // height: 1.6rem;
                    
                }
                img.icon-change:hover::after{
                    -webkit-transform:rotate(360deg);
                    transform:rotate(360deg);
                    -webkit-transition:-webkit-transform 1s linear;
                    transition:transform 1s linear;
                }
                .huan{
                    width: 1.6rem;
                    height: 1.6rem;
                    display: block;
                    cursor: pointer;
                    animation: spin 1s infinite linear;
                }
            }
        }
    }
</style>
