//
// @ts-ignore
import { DynamicTool } from "langchain/tools";
import path from "path";
import * as vscode from 'vscode';

import { z } from "zod";
import { DynamicStructuredTool } from "@langchain/core/tools";

// Tool for creating a folder
const createFolderTool = new DynamicTool({
  name: "create-folder",
  description: "Create a folder in VSCode.",
  func: async (folderName) => {
    try {
      const workspaceFolders = vscode.workspace.workspaceFolders;
      if (!workspaceFolders || workspaceFolders.length === 0) {
        return "No workspace folder is open.";
      }
      const workspacePath = workspaceFolders[0].uri.fsPath;
      const folderPath = path.join(workspacePath, folderName);
      
      console.log('folderPath', folderPath);
      
      const uri = vscode.Uri.file(folderPath);
      await vscode.workspace.fs.createDirectory(uri);
      return `Folder "${folderName}" created successfully.`;
    } catch (error) {
      return `Error creating folder "${folderName}": ${error}`;
    }
  },
});


// Tool for creating a file
const createFileTool = new DynamicTool({
  name: "create-file",
  description: "Create a file in VSCode with default comment content.",
  func: async (fileName) => {
    try {
      const workspaceFolders = vscode.workspace.workspaceFolders;
      if (!workspaceFolders || workspaceFolders.length === 0) {
        return "No workspace folder is open.";
      }
      const workspacePath = workspaceFolders[0].uri.fsPath;
      const filePath = path.join(workspacePath, fileName);

      console.log('filePath', filePath);

      // Default comment content
      const defaultContent = "// Welcome to your new file!\n";
      // Write file content
      await vscode.workspace.fs.writeFile(vscode.Uri.file(filePath), Buffer.from(defaultContent));

      return `File "${fileName}" created successfully.`;
    } catch (error) {
      return `Error creating file "${fileName}": ${error}`;
    }
  },
});


const batchCreateFilesTool = new DynamicStructuredTool({
  name: "batch-create-files",
  description: "Batch create files in VSCode with default comment content.",
  schema: z.object({
    fileNames: z.string().array(),
  }),
  func: async ({ fileNames }) => {
    try {
      const workspaceFolders = vscode.workspace.workspaceFolders;
      if (!workspaceFolders || workspaceFolders.length === 0) {
        return "No workspace folder is open.";
      }
      const workspacePath = workspaceFolders[0].uri.fsPath;

      const results = [] as any[];

      for (const fileName of fileNames) {
        const filePath = path.join(workspacePath, fileName);
        console.log('filePath', filePath);

        // Default comment content
        const defaultContent = "// Welcome to your new file!\n";
        // Write file content
        await vscode.workspace.fs.writeFile(vscode.Uri.file(filePath), Buffer.from(defaultContent));

        results.push(`File "${fileName}" created successfully.`);
      }

      return results.join("\n");
    } catch (error) {
      return `Error creating files: ${error}`;
    }
  },
});




export { createFolderTool, createFileTool,batchCreateFilesTool};
