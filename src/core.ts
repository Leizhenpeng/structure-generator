import { ChatOpenAI } from "langchain/chat_models/openai";
import { createFileTool, createFolderTool } from "./tools";
import { AgentExecutor, createOpenAIFunctionsAgent } from "langchain/agents";
import { ChatPromptTemplate, PromptTemplate } from "langchain/prompts";
import exp from "constants";
import { pull } from "langchain/hub";
import { workspace } from "vscode";


const config = workspace.getConfiguration('structure-generator');

const structureAgent = async (
  input: string,
) => {
  const llm = new ChatOpenAI({
    model: config.get("gptModel") || "gpt-3.5-turbo",
    temperature: 0,
    openAIApiKey: config.get("apiKey") || "",
    configuration:{
        baseURL: config.get("baseURL") || "https://api.openai.com/v1/",
    },
    verbose: true,
  });
  
  const tools = [
    createFileTool,
    createFolderTool,
  ];


  const prompt = await pull<ChatPromptTemplate>("gptsmotion/openai-tools-agent");


  const agent = await createOpenAIFunctionsAgent({
    llm,
    tools,
    prompt,
  });
  
  const agentExecutor = new AgentExecutor({
    agent,
    tools,
    maxIterations: 10,
    verbose: true,
  });
  
  const result = await agentExecutor.invoke({
    input,
  });
  return result;
};

export { structureAgent };