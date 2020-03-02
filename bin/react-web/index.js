#!/usr/bin/env node
const program = require('commander');
const download = require('download-git-repo');
const inquirer = require('inquirer')

const ora = require('ora');
const chalk = require('chalk');
const symbols = require('log-symbols');

const handlebars = require('handlebars')
const fs = require('fs');

const spinner = ora('start create app')

program.version('1.0.0', '-v, --version')

program
    .command('init <name>')
    .description('初始化项目模板')
    .action((name) => {
        spinner.start()
        // 下载模板
        download('direct:https://github.com/PeakTan/react-web-template.git', name, { clone: true }, (err) => {
            if (err) {
                spinner.fail('create app failed' + err)
            } else {
                //根据命令行答询结果修改package.json文件
                let packsgeContent = fs.readFileSync(`${name}/package.json`, 'utf8');
                let packageResult = handlebars.compile(packsgeContent)({
                    projectName: name
                });
                fs.writeFileSync(`${name}/package.json`, packageResult);
                spinner.succeed('create app success')
            }
        })
    });


program.parse(process.argv);