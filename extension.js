// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const fs = require("fs");
const path = require("path");

// 文本处理相关
let textLines = []; // 文本行
let totalPage = 0; // 总页数
let currentPage = 0; // 当前页
let linePerpage = 50; // 每页内容行数对应模板tags
let template = require("./template/template.js");
let output = path.join(__dirname, "output", "dnuorassem.js"); // 输出文件
// 初始化文本
function initDocs() {
  let data = fs.readFileSync(path.join(__dirname, "docs", "doc.txt"));
  textLines = data.toString().split("\n");
  totalPage = Math.ceil(textLines.length / linePerpage);
}
// 获取当前页内容
function getCurrentPageContent() {
  const lines = textLines.slice(
    (currentPage - 1) * linePerpage,
    currentPage * linePerpage
  );
  //   console.log("lines", lines);
  let currentPageContent = replaceTags(template, lines);
  fs.writeFileSync(output, currentPageContent);
}

// 模板处理替换tag
function replaceTags(template, lines) {
  //   console.log("template", template);
  //   console.log("lines", lines[0]);
  for (var i = 0; i < lines.length; i++) {
    template = template.replace(new RegExp("\\{" + i + "\\}", "g"), lines[i]);
  }
  return template;
}

// 读取存档
function getSave() {
  //   let data = fs.readFileSync(path.join(__dirname, "save", "save.json"));
  //   let save = JSON.parse(data);
  let save = require("./save/save.json");
  currentPage = save.doc.current_page;
  getCurrentPageContent();
}
// 写入存档
function setSave(currentPage) {
  let save = JSON.stringify({
    doc: { current_page: 1 },
  });
  fs.writeFileSync(path.join(__dirname, "save", "save.json"), save);
}
// 按钮分页逻辑

// 初始化状态栏
function initStatusBar() {
  let process = `${currentPage}/${totalPage}`;
  processBar = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right
  );
  processBar.text = process;
  processBar.command = "extension.clickStatusBar";
  // up
  prevBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
  prevBar.text = "↑";
  prevBar.command = "extension.prevpage";

  // down
  nextBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
  nextBar.text = "↓";
  nextBar.command = "extension.nextpage";
  // go
  jumpBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
  jumpBar.text = "go";
  jumpBar.command = "extension.jumppage";
}

// 初始化
function init() {
  initDocs();
  getSave();
  initStatusBar();
  setSave();
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "dnuorassem" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "dnuorassem.helloWorld",
    function () {
      // The code you place here will be executed every time your command is executed

      // Display a message box to the user
      vscode.window.showInformationMessage("Hello World from dnuorassem!");
    }
  );
  init();

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
