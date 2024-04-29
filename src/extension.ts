// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { structureAgent } from './core';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "structure-generator" is now active!');

    let disposable = vscode.commands.registerCommand('fileStructureGenerator.createFiles', async () => {
        vscode.window.showInputBox({ prompt: 'Paste the structure here' }).then(input => {
            
            if (input) {
                structureAgent(input);
                vscode.window.showInformationMessage(input);
                // const workspaceFolders = vscode.workspace.workspaceFolders;
                // if (!workspaceFolders || workspaceFolders.length === 0) {
                //   return "No workspace folder is open.";
                // }
                // const workspacePath = workspaceFolders[0].uri.fsPath;
                // const folderPath = path.join(workspacePath, input);
                
                // console.log('folderPath', folderPath);
                
                // const uri = vscode.Uri.file(folderPath);
                // vscode.workspace.fs.createDirectory(uri);
                // console.log('Creating folder:', input);
      
            }
        });
    });

    context.subscriptions.push(disposable);

}

// This method is called when your extension is deactivated
export function deactivate() { }


module.exports = {
    activate,
    deactivate
};


