import {
    ChatMLChatPromptWrapper,
    LlamaChatSession,
    LlamaContext, LlamaGrammar,
    LlamaModel
} from "node-llama-cpp";
import path from "path";
import * as fs from "fs";
import {fileURLToPath} from "url";
import {ConversationSystemTemplate, ExtractionTemplate} from "./templates.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const model = new LlamaModel({
    modelPath: path.join(__dirname, "data/models", "cryptopulse-8B-Instruct.Q5_K_M.gguf"),
    gpuLayers: 33,
});
const context = new LlamaContext({
    model: model,
    batchSize: 2048,
    contextSize: 8096
});


//init session

// fetch conversation
const conversationData = fs.readFileSync(path.join(__dirname, "data/input", "conversation.txt"))

// fetch grammar
const grammarDefinition = fs.readFileSync(path.join(__dirname, "data/input", "grammar.gbnf")).toString()

const grammar = new LlamaGrammar({grammar: grammarDefinition})

const session = new LlamaChatSession({
    printLLamaSystemInfo: false,
    context: context,
    promptWrapper: new ChatMLChatPromptWrapper(),
    systemPrompt: ConversationSystemTemplate(conversationData)
});

await session.init()

const answer = await session.prompt(ExtractionTemplate, {
    repeatPenalty: 1.18,
    maxTokens: context.getContextSize(),
    grammar: grammar,
    temperature: 0.7,
    topK: 40,
    topP: 0.95,
})
console.log(answer);
