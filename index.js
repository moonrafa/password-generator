#!/usr/bin/env node
const program = require('commander')
const chalk = require('chalk')
const clipboardy = require('clipboardy')
const log = console.log
const createPassword = require('./src/createPassword')
const savePassword = require('./src/savePassword')

program.version('1.0.0').description('password generator')

/*programs
  .command('generate')
  .action(() => {
console.log('what?')  })
  .parse()*/

program
  .option('-l, --length <number>', 'choose a length for the password', '8')
  .option('-s, --save ', 'save password to passwords.txt')
  .option('-nn, --no-numbers', 'password without numbers')
  .option('-ns, --no-symbols', 'password without symbols')
  .parse()

const { length, save, numbers, symbols } = program.opts()

//get generated passwords
const generatedPassword = createPassword(length, numbers, symbols)

// save to file
if (save) {
  savePassword(generatedPassword)
}

//copy to clipboard
clipboardy.writeSync(generatedPassword)

//output password
log(chalk.blue('Password: ') + chalk.bold(generatedPassword))
log(chalk.yellow('Password copied to clipboard'))
