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
                vscode.window.showInformationMessage('Generating structure...');
                structureAgent(input).then((output) => {
                    vscode.window.showInformationMessage("Structure generated successfully");
                }).catch((error) => {
                    vscode.window.showErrorMessage(`Error generating structure: ${error}`);
                });
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


