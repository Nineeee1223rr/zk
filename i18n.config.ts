export default defineI18nConfig(() => ({
    legacy: false,
    messages: {
        zh: {
            setting: '设置',
            use_own_key: '使用自己的key',
            new_chat: '新建对话',
            // need_image: '需要图片',
            // waited: '已等待',
            // image_max_5MB: '图片大小不能超过5MB',
            input_password: '请输入访问密码',
            confirm: '确定',
            with_history: '发送时携带历史记录',
            without_history: '发送时不携带历史记录',
            please_input_text: '请输入文本',
            // add_image: '添加图片',
            // support_paste: '支持粘贴',
            send: '发送',
            img_gen_steps: '图片生成步数',
            text_generation: '文本生成',
            image_generation: '图像生成',
            system_prompt: '系统提示',
        }
    }
}))