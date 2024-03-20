#!/usr/bin/env node

const readline = require('readline')
const input = readline.createInterface(process.stdin)

const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv)).argv;

let currentTurn = 1
let turns = argv.t || argv.turns || 10
let max = argv.m || argv.max || 100
const number = Math.floor(Math.random() * max);

console.log(`Параметры игры: загаданное число от 0 до ${max}, ходов ${turns}. Всё, угадывай`)

input.on('line', (data) => {
    if (data == number) {
        input.emit('win')
    }
    if (data < number) {
        console.log("Ход " + currentTurn + " из " + turns + "." + " Загаданное число больше " + data)
    }
    if (data > number) {
        console.log("Ход " + currentTurn + " из " + turns + "." + " Загаданное число меньше " + data)
    }
    if (currentTurn >= turns) {
        input.emit('loss')
    }
    currentTurn++
})

input.on('win', () =>{
    console.log('С пасхой')
    input.close()
})
input.on('loss', () => {
    console.log('Ходы кончились :(')
    input.close()
})
