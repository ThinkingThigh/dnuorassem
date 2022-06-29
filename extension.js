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
let template = require("./template/template.js"); // 引入模板
let output = path.join(__dirname, "output", "dnuorassem.js"); // 输出文件
// 初始化文本
function initDocs() {
  let data = fs.readFileSync(path.join(__dirname, "docs", "doc.txt"));
  textLines = data.toString().split("\n");
  totalPage = Math.ceil(textLines.length / linePerpage);
}
// 获取当前页内容
function getCurrentPageContent() {
  let lines = textLines.slice(
    (currentPage - 1) * linePerpage,
    currentPage * linePerpage
  );
  // console.log("lines", lines);
  let currentPageContent = replaceTags(template, lines);
  fs.writeFileSync(output, currentPageContent);
  // 翻页后更新进度显示
  processBar.text = `${currentPage}/${totalPage}`;
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
  let save = require("./save/save.json");
  currentPage = save.doc.current_page;
  getCurrentPageContent();
}
// 写入存档
function setSave(currentPage) {
  let save = JSON.stringify({
    doc: { current_page: currentPage },
  });
  fs.writeFileSync(path.join(__dirname, "save", "save.json"), save);
}
// 按钮翻页逻辑
function handleNextPage() {
  if (currentPage < totalPage) {
    setSave(currentPage++);
    getCurrentPageContent();
  } else {
    vscode.window.showInformationMessage("Last page!");
  }
}
function handlePrevPage() {
  if (currentPage > 1) {
    setSave(currentPage--);
    getCurrentPageContent();
  } else {
    vscode.window.showInformationMessage("First page!");
  }
}
function handleGotoPage(page) {
  if (!/^[0-9]+.?[0-9]*$/.test(page)) {
    vscode.window.showInformationMessage("Not a Number!");
    return;
  }
  if (!(page > 0 && page <= totalPage)) {
    vscode.window.showInformationMessage(`1~${totalPage}!`);
    return;
  }
  setSave(page);
  currentPage = page;
  getCurrentPageContent();
}

// 初始化状态栏
let processBar = null;
let nextBar = null;
let prevBar = null;
let gotoBar = null;

function initStatusBar() {
  // 进度
  processBar = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left
  );
  processBar.text = `${currentPage}/${totalPage}`;
  // up
  prevBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
  prevBar.text = "↑";
  prevBar.command = "dnuorassem.cmdprev";
  // down
  nextBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
  nextBar.text = "↓";
  nextBar.command = "dnuorassem.cmdnext";
  // goto
  gotoBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
  gotoBar.text = "goto";
  gotoBar.command = "dnuorassem.cmdgoto";
}

// 是否显示ToolBar
function isShowToolBar(flag) {
  if (flag) {
    prevBar.show();
    nextBar.show();
    gotoBar.show();
    processBar.show();
  } else {
    prevBar.hide();
    nextBar.hide();
    gotoBar.hide();
    processBar.hide();
  }
}

// 初始化
function init() {
  initStatusBar();
  initDocs();
  getSave();
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
  let launch = vscode.commands.registerCommand(
    "dnuorassem.launch",
    function () {
      // The code you place here will be executed every time your command is executed
      vscode.window.showInformationMessage("Dnuorassem!");
      vscode.window.showTextDocument(vscode.Uri.file(output));
    }
  );
  // 上一页
  let prev = vscode.commands.registerCommand("dnuorassem.cmdprev", () => {
    handlePrevPage();
  });
  // 下一页
  let next = vscode.commands.registerCommand("dnuorassem.cmdnext", () => {
    handleNextPage();
  });
  // 跳页
  let goto = vscode.commands.registerCommand("dnuorassem.cmdgoto", () => {
    vscode.window
      .showInputBox({
        placeHolder: "page?",
      })
      .then((value) => {
        if (value) {
          handleGotoPage(value);
        }
      });
  });
  init();
  // 切换tab显示隐藏toolbar
  vscode.window.onDidChangeActiveTextEditor(() => {
    isShowToolBar(vscode.window.activeTextEditor.document.uri.fsPath == output);
  });

  context.subscriptions.push(launch);
  context.subscriptions.push(prev);
  context.subscriptions.push(next);
  context.subscriptions.push(goto);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
