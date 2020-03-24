<template>
    <div class="home" v-cloak>
        <!-- 头图banner -->
        <div class="bannerbg" :style="{ backgroundImage: `url(${ foodDetailsData.imageUrl })`}">
            <div class="bannerbg-box">
                <div class="bannerbg-box-cont">
                    <div class="ctn bannerbg-cont">
                        <span>{{foodDetailsData.foodName}}</span>
                        <!-- bg 元素 -->
                        <layBg :bg0="false"/>
                        <!-- <i class="bg-icon bg-1 bg-11"></i>
                        <i class="bg-icon bg-2  bg-22"></i>
                        <i class="bg-icon bg-3  bg-33"></i>
                        <i class="bg-icon bg-4  bg-44"></i> -->
                    </div>
                </div>
            </div>
        </div>
        <div class="ctn food-box">
            <template v-if="foodDetailsData.efficacys[0]">
                <h3 class="food-tit">
                    <img :src="'pc_icon_zygx.png' | PUBLIC_PATH">
                    中医功效
                </h3>
                <div class="cont">{{foodDetailsData.efficacys[0]}}</div>
            </template>
            <template v-if="foodDetailsData.material && foodDetailsData.material.majorMaterialList && foodDetailsData.material.majorMaterialList.length">
                <h3 class="food-tit mt56">
                    <img :src="'pc_icon_sc.png' | PUBLIC_PATH">
                    {{foodDetailsData.material.title}}
                </h3>
                <div class="foodlist">
                    <div class="foodlist-cont" @click="goToInfo(item)" v-for="(item,i) in foodDetailsData.material.majorMaterialList" :key="i">
                        <dl>
                            <dt><img :src="item.imageUrl"></dt>
                            <dd>{{item.foodName}}</dd>
                        </dl>
                        <p>{{item.count}}{{item.unit}}</p>
                    </div>
                </div>
            </template>
            <template v-show="foodDetailsData.cookingStepList && foodDetailsData.cookingStepList.length>0">
                <h3 class="food-tit mt56" v-show="foodDetailsData.cookingStepList && foodDetailsData.cookingStepList.length>0">
                    <img  :src="'pc_icon_zzff.png' | PUBLIC_PATH">
                    制作方法
                </h3>
                <div class="list4" v-show="foodDetailsData.cookingStepList && foodDetailsData.cookingStepList.length>0">
                    <template>
                        <div class="list4-s" v-for="(item,i) in foodDetailsData.cookingStepList" :key="i">
                            <img class="list4-s-icon" :src="'pc_icon_zysx.png' | PUBLIC_PATH">
                            <span>{{item.content}}</span>
                        </div>
                    </template>
                </div>
            </template>
            <!-- bg 元素 -->
            <layBg/>
        </div>
        
    </div>
</template>
<script>
    import { mapState } from 'vuex'
    import { apiFoodDetails } from '@/service/api/details'
    import LayBg from '@/components/common/LayBg';
    export default {
        data () {
            return {
                foodDetailsData: {
                    material:{
                        title:""
                    },
                    cookingStepList:[],
                    imageUrl:"",
                    foodName:"",
                    efficacys:""
                }, // 食物信息整体数据
                foodId: this.$route.query.foodId,// 获取路由参数 foodId
                mealType: this.$route.query.mealType, // 食谱类型 7为茶饮，其他为食材
            }
        },
        beforeRouteEnter (to, from, next) {
            next(vm=>{
                console.log(from.path+"...."+vm.$route.query.foodId)
                if(from.path !== "/ingredientsInfo"){
                    vm.foodId = vm.$route.query.foodId;
                    vm.mealType = vm.$route.query.mealType;
                    vm.loadData();
                }
            })
        },
        components: {
            LayBg
        },
        computed: {
            ...mapState(['code','userId'])
        },
        created () {
            // 加载食物信息
            this.loadData();
        },
        methods: {
            async loadData () {
                // 是否重新配餐全局变量换为空
                window.isCreatedFull = "";
                const data = await apiFoodDetails(this.code,this.userId,this.foodId,this.mealType)
                // alert(JSON.stringify(data));
                this.foodDetailsData = data;
            },
            goToInfo(item){
                // 如果是茶饮则不跳转
                if(this.mealType!=7){
                    // 如果是type类型为3不跳转
                    if(item.type == "1" || item.type == "2"){
                        // item.type 告知后台是食材还是药材
                        this.$router.push({
                            path: '/ingredientsInfo',
                            query: {
                                type: item.type,
                                foodId: item.materialId
                            }
                        })
                    }
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
@import "@/assets/style/mixin.scss";
    .mt56{
        margin-top: 1.4rem;
    }
    .home {
        width: 100%;
        min-height: 100%;
        padding: 0.8rem 0.75rem 0;
        box-sizing: border-box;
        @include bg_color1();
        padding-bottom: 1.7rem;
        // bannerbg盒子
        .bannerbg{
            background-repeat: no-repeat;
            background-position: center center;
            width: 100%;
            height: 9rem;
            background-size: cover;
            padding:.25rem;
            box-sizing: border-box;
            border-top-left-radius: .2rem;
            border-top-right-radius: .2rem;
            @include bg_color6();
            .bannerbg-box{
                padding:.25rem;
                @include  border7(1px solid);
                // border: rgba(255,255,255,0.50);
                height: 100%;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                justify-content: center;
                .bannerbg-box-cont{
                    @include bg_color22();
                    // background: rgba(255,255,255,0.90);
                    padding:.15rem;
                    border-radius: .1rem;
                }
                .bannerbg-cont{
                    align-items: center;
                    justify-content: center;
                    // border: .05rem solid #E5CAA2;
                    padding-top: 0.15rem;
                    padding-bottom: 0.15rem;
                    background: rgba(255,255,255,0);
                    @include border5(0.05rem solid);
                    box-sizing: border-box;
                    span{
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        height: 100%;
                        @include font_color1();
                        font-weight: bold;
                        font-size: .85rem;
                    }
                }
            }
            .ctn{
                padding:0.3rem 1.05rem;
                border-radius: 0;
            }
        }
        // 四个角背景设置
        .ctn {
            @include bg_color6();
            @include box_shodow1(0 0.3rem 1rem 0);
            border-radius: 0.2rem;
            padding: 1.35rem 1.05rem 0.3rem;
            box-sizing: border-box;
            position: relative;
        }
        // 食物盒子
        .food-box{
            @include bg_color6();
            display: flex;
            flex-direction: column;
            border-top-left-radius: 0;
            border-top-right-radius: 0;
            .food-tit{
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                font-size: .85rem;
                @include font_color4();
                align-items: center;
                img{
                    width: .75rem;
                    height: .75rem;
                    margin-right: .5rem;
                }
            }
            .cont{
                @include border5(1px solid);
                padding:.8rem .65rem;
                margin-top: .6rem;
                font-size: .75rem;
                @include font_color4();
            }
            .foodlist{
                display: flex;
                flex-direction: column;
                padding-top: .35rem;
                padding-bottom: 1.4rem;
                .foodlist-cont{
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: .7rem;
                    dl{
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        justify-content: center;
                        dt{
                            img{
                                width: 2.2rem;
                                height: 2.2rem;
                                border-radius: 50%;
                                margin-right: .5rem;
                            }
                        }
                        dd{
                            @include font_color4();
                            font-size: .75rem;
                            font-weight: bold;
                        }
                    }
                    p{
                        font-size: .7rem;
                        @include font_color();
                    }
                }
            }
            .list4 {
                padding-top: 1.4rem /* 56/40 */;
                box-sizing: border-box;
                position: relative;
                padding-bottom: .675rem;
                top: -0.6rem;
                &::before {
                    content: "";
                    position: absolute;
                    top: 1.4rem;
                    z-index: 22;
                    left: 0;
                    width: 0.45rem;
                    height: 0.4rem;
                    display: inline-block;
                    @include bg_color6();
                }
                .list4-s {
                    @include border_left(1px solid);
                    // border-left:1px solid rgba(222, 150, 72, 0.4);
                    margin-left: 0.225rem /* 9/40 */;
                    padding-left: 0.8rem;
                    box-sizing: border-box;
                    position: relative;
                    padding-bottom: 0.6rem /* 24/40 */;
                    box-sizing: border-box;
                    .list4-s-icon {
                        width: 0.45rem /* 18/40 */;
                        height: 0.45rem /* 18/40 */;
                        background-repeat: no-repeat;
                        background-size: 0.45rem /* 18/40 */ 0.45rem /* 18/40 */;
                        @include bg_color6();
                        display: inline-block;
                        position: absolute;
                        z-index: 2;
                        left: -0.25rem;
                        top: 0.4rem;
                    }
                    span{
                        font-size: .75rem;
                        @include font_color8;
                    }
                }
                .list4-s:last-child::after {
                    content: "";
                    position: absolute;
                    bottom: 0;
                    z-index: 22;
                    left: -0.25rem;
                    top: 0.8rem;
                    width: 0.45rem;
                    height: 100%;
                    display: inline-block;
                    @include bg_color6();
                }
            }

        }
        
    }
</style>
