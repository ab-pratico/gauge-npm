import fs = require('fs');
import shelljs = require('shelljs');
import figlet = require('figlet');
import clear = require('clear');
import chalk = require('chalk');
import inquirer = require('inquirer');
import path = require('path');

import { options  } from './config';

let validate = require("validate-npm-package-name")

let packageJSON = require(path.join(process.cwd(), 'package.json'));

clear();

console.log(
    chalk.yellow(
        figlet.textSync('Gauge Setup ®')
    )
);

console.log(
    chalk.blue(
        "author: Abner Oliveira <abner.silva@gmail.com>"
    )
);

async function  getProjectName() {
    return new Promise<string>((resolve, reject) => {

        inquirer.prompt([{
            name: 'project_name',
            type: 'input',
            message: 'Enter your gauge project name',
            default: 'gauge-specs-for-' + packageJSON.name,
            validate: (input) => {
                let validateResult = validate(input);
                if (validateResult.errors) {
                    console.error(validateResult.errors.join('\n'));
                }
                return validateResult.validForNewPackages;
            }
        }]).then((answer) => {
            resolve(answer.project_name)
        }).catch(e => reject(e.message));
    });
}

console.log(__filename);
(async function() {
    try {
        shelljs.config.silent = false;
        // let projectFileName = ()
        // let projectName = await getProjectName();
        // console.log('PROJECT NAME: ', projectName);

        // fs.writeFileSync(options.GAUGE_ROOT_FOLDER)
        console.log('\nCreating project folder...');
        let projectFolder = path.join(process.cwd(), 'gauge-project');
        shelljs.mkdir(projectFolder);
        
        console.log('\nCopying template files...');
        shelljs.cp('-Rfn', `${path.join(__dirname, '..','__template__/*')}`, `${path.join(__dirname, '..','gauge-project')}`);

        console.log('\nAdding gauge scritps to package.json file on host project ...');
    } catch(e) {
        console.error('No Project Name defined.');
        process.exit(1);
    }
})();

