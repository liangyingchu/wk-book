<template>
    <section class="my-section">
        <h2 class="title">
            {{ title }}
            <small v-if="sub" class="sub">{{ sub }}</small>
        </h2>

        <div class="section-content">
            <slot/>
        </div>
    </section>
</template>

<script>
    export default {
        name: "MySection",
        props: {
            title: {
                type: String,
                default: '标题'
            },
            sub: String
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .my-section {
        .title {
            font-size: .18rem;
            margin-bottom: .2rem;
        }
        .sub {
            display: inline-block;
            margin-left: .04rem;
            color: #aaa;
            font-size: .12rem;
            font-weight: normal;
        }
        .section-content {

        }
    }
</style>
