// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "structure-generator" is now active!');

    let disposable = vscode.commands.registerCommand('fileStructureGenerator.createFiles', () => {
        vscode.window.showInputBox({ prompt: 'Paste the structure here' }).then(input => {
            if (input) {
                vscode.window.showInformationMessage(input);
            }
        });
    });

    context.subscriptions.push(disposable);

}

function createFilesAndFolders(input: any) {
    // let rootPath;
    // if (vscode.workspace.workspaceFolders) {
    //     rootPath = vscode.workspace.workspaceFolders[0].uri; // 获取工作区的根路径
    // } else {
    //     // 如果没有打开的工作区，你可以选择一个默认的根路径，或者提示用户选择一个路径
    //     rootPath = vscode.Uri.file('/path/to/default/root');
    // }
    // input.split('\n').forEach(line => {
    //     const trimmedLine = line.trim();
    //     if (!trimmedLine) {
    //         return;
    //      } // 跳过空行

    //     const depth = line.indexOf(trimmedLine[0]);
    //     const relativePath = trimmedLine.split('#')[0].trim(); // 移除注释
    //     const fullPath = vscode.Uri.file(path.join(rootPath.fsPath, relativePath));

    //     if (relativePath.endsWith('/')) {
    //         // 创建文件夹
    //         vscode.workspace.fs.createDirectory(fullPath);
    //     } else {
    //         // 创建文件
    //         vscode.workspace.fs.writeFile(fullPath, new Uint8Array(Buffer.from('Initial content', 'utf8')));
    //     }
    // });

    vscode.window.showInformationMessage('文件和文件夹已创建');
}


// This method is called when your extension is deactivated
export function deactivate() { }


module.exports = {
    activate,
    deactivate
};