<template>
<div>
    <div class="tit-box" v-if="bgClass=='jgy_bg_smsxyx'" :class="bgClass" :style="{backgroundImage: 'url(jgy_bg_smsxyx.png)'}  | PUBLIC_PATH">
        {{tempTitle}}
    </div>
        <div class="tit-box" v-if="bgClass=='jgy_bg_xxzhcp'" :class="bgClass" :style="{backgroundImage: 'url(jgy_bg_xxzhcp.png)'}  | PUBLIC_PATH">
        {{tempTitle}}系证候类型
    </div>
        <div class="tit-box" v-if="bgClass=='jgy_bg_wsmhdzxyx'" :class="bgClass" :style="{backgroundImage: 'url(jgy_bg_wsmhdzxyx.png)'}  | PUBLIC_PATH">
        {{tempTitle}}
    </div>
</div>

</template>
<script>
export default {
    props: {
        bgClass: {
            type: String,
            default: 'jgy_bg_1'
        },
        tempTitle: {
            type: String,
            default: ""
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/style/mixin.scss";
.tit-box {
    height: 2.2rem;
    display: flex;
    align-items: center;
    padding: 0 1.05rem;
    font-size: 0.85rem;
    background-size: 100% 100%;
    @include font_color6();
    font-weight: bold;
}
</style>