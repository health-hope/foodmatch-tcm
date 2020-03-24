<template>
    <div class="progress">
        <div class="bar" :style="{ width: barStyle }"></div>
    </div>
</template>
<script>
export default {
    name: 'jkyyProgress',
    props: {
        total: {
            type: Number,
            default: 0
        },
        bar: {
            type: Number,
            default: 0
        }
    },
    computed: {
        barStyle () {
            return `${(this.bar / this.total) * 100}%`
        }
    }
}
</script>
<style lang="scss" scoped>
.progress {
    width: 100%;
    height: .2rem;
    background-color: #fff;
    .bar {
        max-width: 100%;
        height: 100%;
        background: #DE9648;
        transition: width .4s;
    }
}
</style>
