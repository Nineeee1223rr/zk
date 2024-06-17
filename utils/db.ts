import Dexie, {type Table} from 'dexie';

export class Database extends Dexie {
    history!: Table<HistoryItem>
    tab!: Table<TabItem>

    constructor() {
        super('ai')
        this.version(4).stores({
            history: '++id, session, type, role, content, src',
            tab: '++id, label'
        })
        this.version(5).stores({
            tab: '++id, label, created_at',
            history: '++id, session, type, role, content, src, created_at',
        }).upgrade(trans => {
            return trans.table('history').toCollection().modify(async i => {
                if (i.type === 'image') {
                    i.content = ''
                    i.src = [i.src]
                }
            })
        })
    }

    getLatestTab() {
        return DB.tab.orderBy('id').last();
    }

    getTabs() {
        return DB.tab.limit(100).reverse().toArray()
    }

    async getHistory(session: number) {
        const arr = await DB.history.where('session').equals(session).limit(100).toArray()
        arr.forEach(i => {
            if (i.type === 'image') {
                i.src_url = []
                i.src?.forEach(src => {
                    i.src_url!.push(URL.createObjectURL(src))
                })
                i.content = 'image'
            }
        })
        return arr
    }

    addTab(label: string) {
        return DB.tab.add({label, created_at: Date.now()})
    }

    deleteTabAndHistory(id: number) {
        return DB.transaction('rw', DB.tab, DB.history, async () => {
            await DB.tab.delete(id)
            await DB.history.where('session').equals(id).delete()
        })
    }
}

export const DB = new Database();

export const initialSettings = {
    openaiKey: '',
    image_steps: 20,
    system_prompt: 'You are a large language model. Please respond to me in Chinese according to my instructions.',
}

export type Settings = typeof initialSettings

export const uniModals: Model[] = [
    {
        id: '@cf/meta/llama-3-8b-instruct',
        name: 'llama-3-8b-instruct',
        provider: 'workers-ai',
        type: 'chat'
    }
]

export const textGenModels: Model[] = [{
    id: '@hf/thebloke/zephyr-7b-beta-awq',
    name: 'zephyr-7b-beta-awq',
    provider: 'workers-ai',
    type: 'chat'
}, {
    id: '@cf/fblgit/una-cybertron-7b-v2-bf16',
    name: 'una-cybertron-7b-v2-bf16',
    provider: 'workers-ai',
    type: 'chat'
}, {
    id: '@cf/tinyllama/tinyllama-1.1b-chat-v1.0',
    name: 'tinyllama-1.1b-chat-v1.0',
    provider: 'workers-ai',
    type: 'chat'
}, {
    id: '@hf/nexusflow/starling-lm-7b-beta',
    name: 'starling-lm-7b-beta',
    provider: 'workers-ai',
    type: 'chat'
}, {
    id: '@cf/defog/sqlcoder-7b-2',
    name: 'sqlcoder-7b-2',
    provider: 'workers-ai',
    type: 'chat'
}, {
    id: '@cf/qwen/qwen1.5-7b-chat-awq',
    name: 'qwen1.5-7b-chat-awq',
    provider: 'workers-ai',
    type: 'chat'
}, {
    id: '@cf/qwen/qwen1.5-14b-chat-awq',
    name: 'qwen1.5-14b-chat-awq',
    provider: 'workers-ai',
    type: 'chat'
}, {
    id: '@cf/qwen/qwen1.5-1.8b-chat',
    name: 'qwen1.5-1.8b-chat',
    provider: 'workers-ai',
    type: 'chat'
}, {
    id: '@cf/qwen/qwen1.5-0.5b-chat',
    name: 'qwen1.5-0.5b-chat',
    provider: 'workers-ai',
    type: 'chat'
}, {
    id: '@cf/microsoft/phi-2',
    name: 'phi-2',
    provider: 'workers-ai',
    type: 'chat'
}, {
    id: '@hf/thebloke/neural-chat-7b-v3-1-awq',
    name: 'neural-chat-7b-v3-1-awq',
    provider: 'workers-ai',
    type: 'chat'
}, {
    id: '@cf/mistral/mistral-7b-instruct-v0.2-lora',
    name: 'mistral-7b-instruct-v0.2-lora',
    provider: 'workers-ai',
    type: 'chat'
}, {
    id: '@hf/mistral/mistral-7b-instruct-v0.2',
    name: 'mistral-7b-instruct-v0.2',
    provider: 'workers-ai',
    type: 'chat'
}, {
    id: '@hf/thebloke/mistral-7b-instruct-v0.1-awq',
    name: 'mistral-7b-instruct-v0.1-awq',
    provider: 'workers-ai',
    type: 'chat'
}, {
    id: '@hf/meta-llama/meta-llama-3-8b-instruct',
    name: 'meta-llama-3-8b-instruct',
    provider: 'workers-ai',
    type: 'chat'
}, {
    id: '@hf/thebloke/llamaguard-7b-awq',
    name: 'llamaguard-7b-awq',
    provider: 'workers-ai',
    type: 'chat'
}, {
    id: '@cf/meta/llama-3-8b-instruct',
    name: 'llama-3-8b-instruct',
    provider: 'workers-ai',
    type: 'chat'
}, {
    id: '@cf/meta-llama/llama-2-7b-chat-hf-lora',
    name: 'llama-2-7b-chat-hf-lora',
    provider: 'workers-ai',
    type: 'chat'
}, {
    id: '@hf/thebloke/llama-2-13b-chat-awq',
    name: 'llama-2-13b-chat-awq',
    provider: 'workers-ai',
    type: 'chat'
}, {
    id: '@hf/nousresearch/hermes-2-pro-mistral-7b',
    name: 'hermes-2-pro-mistral-7b',
    provider: 'workers-ai',
    type: 'chat'
}, {
    id: '@cf/google/gemma-7b-it-lora',
    name: 'gemma-7b-it-lora',
    provider: 'workers-ai',
    type: 'chat'
}, {
    id: '@hf/google/gemma-7b-it',
    name: 'gemma-7b-it',
    provider: 'workers-ai',
    type: 'chat'
}, {
    id: '@cf/google/gemma-2b-it-lora',
    name: 'gemma-2b-it-lora',
    provider: 'workers-ai',
    type: 'chat'
}, {
    id: '@cf/tiiuae/falcon-7b-instruct',
    name: 'falcon-7b-instruct',
    provider: 'workers-ai',
    type: 'chat'
}, {
    id: '@cf/thebloke/discolm-german-7b-v1-awq',
    name: 'discolm-german-7b-v1-awq',
    provider: 'workers-ai',
    type: 'chat'
}, {
    id: '@cf/deepseek-ai/deepseek-math-7b-instruct',
    name: 'deepseek-math-7b-instruct',
    provider: 'workers-ai',
    type: 'chat'
}, {
    id: '@cf/deepseek-ai/deepseek-math-7b-base',
    name: 'deepseek-math-7b-base',
    provider: 'workers-ai',
    type: 'chat'
}, {
    id: '@hf/thebloke/deepseek-coder-6.7b-instruct-awq',
    name: 'deepseek-coder-6.7b-instruct-awq',
    provider: 'workers-ai',
    type: 'chat'
}, {
    id: '@hf/thebloke/deepseek-coder-6.7b-base-awq',
    name: 'deepseek-coder-6.7b-base-awq',
    provider: 'workers-ai',
    type: 'chat'
}, {
    id: '@cf/mistral/mistral-7b-instruct-v0.1',
    name: 'mistral-7b-instruct-v0.1',
    provider: 'workers-ai',
    type: 'chat'
}, {
    id: '@cf/meta/llama-2-7b-chat-int8',
    name: 'llama-2-7b-chat-int8',
    provider: 'workers-ai',
    type: 'chat'
}, {
    id: '@cf/meta/llama-2-7b-chat-fp16',
    name: 'llama-2-7b-chat-fp16',
    provider: 'workers-ai',
    type: 'chat'
}, {
    id: '@cf/qwen/qwen1.5-14b-chat-awq',
    name: 'qwen1.5-14b-chat-awq',
    provider: 'workers-ai',
    type: 'chat'
}, {
    id: '@cf/openchat/openchat-3.5-0106',
    name: 'openchat-3.5-0106',
    provider: 'workers-ai',
    type: 'chat'
}, {
    id: '@cf/google/gemma-7b-it-lora',
    name: 'gemma-7b-it-lora',
    provider: 'workers-ai',
    type: 'chat'
}, {
    id: '@hf/thebloke/openhermes-2.5-mistral-7b-awq',
    name: 'openhermes-2.5-mistral-7b-awq',
    provider: 'workers-ai',
    type: 'chat'
}, {
    id: '@hf/thebloke/neural-chat-7b-v3-1-awq',
    name: 'neural-chat-7b-v3-1-awq',
    provider: 'workers-ai',
    type: 'chat'
}, {
    id: '@hf/nexusflow/starling-lm-7b-beta',
    name: 'starling-lm-7b-beta',
    provider: 'workers-ai',
    type: 'chat'
}, {
    id: '@cf/meta/llama-3-8b-instruct',
    name: 'llama-3-8b-instruct',
    provider: 'workers-ai',
    type: 'chat'
}]

export const imageGenModels: Model[] = [{
    id: '@cf/lykon/dreamshaper-8-lcm',
    name: 'dreamshaper-8-lcm',
    provider: 'workers-ai-image',
    type: 'text-to-image'
}, {
    id: '@cf/stabilityai/stable-diffusion-xl-base-1.0',
    name: 'stable-diffusion-xl-base-1.0',
    provider: 'workers-ai-image',
    type: 'text-to-image'
}, {
    id: '@cf/bytedance/stable-diffusion-xl-lightning',
    name: 'stable-diffusion-xl-lightning',
    provider: 'workers-ai-image',
    type: 'text-to-image'
}]

export const models: Model[] = [...uniModals, ...textGenModels, ...imageGenModels]