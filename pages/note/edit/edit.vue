<template>
    <view class="container">
        <editor id="editor" class="ql-container" :placeholder="placeholder" @ready="onEditorReady"></editor>
        <button type="warn" @tap="undo">撤销</button>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                placeholder: '开始输入...'
            }
        },
        methods: {
            onEditorReady() {
                uni.createSelectorQuery().select('#editor').context((res) => {
                    this.editorCtx = res.context
                }).exec()
            },
            undo() {
                this.editorCtx.undo()
            }
        }
    }
</script>

<style>
    .container {
        padding: 10px;
    }

    #editor {
        width: 100%;
        height: 300px;
        background-color: #CCCCCC;
    }

    button {
        margin-top: 10px;
    }
</style>