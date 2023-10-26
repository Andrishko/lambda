const inquirer = require('inquirer');
const { type } = require('os');
const fs = require('fs').promises;

const prompt = inquirer.createPromptModule();

const read = async () => {
    try {
        const data = await fs.readFile('users.txt', 'utf8')
        const parsedData = await JSON.parse(data);
        return parsedData
    } catch (parseError) {
        console.error('Помилка при розпарсуванні JSON:', parseError);
    }
};

const addName = [
    {
        type: 'input',
        name: 'name',
        message: 'Input Your Name, if you want to stop editing users press ENTER',
        default: 'Exit',
        filter(val) {
            return `${val[0].toUpperCase()}` + `${val.substr(1, val.length - 1)}`
        },
        validate(value) {
            const pass = value.match(/^[A-Za-z]/)
            if (pass) {
                return true
            }
            return 'If you don`t robot Enter your real name'
        },
    }
]

const genderAgeQ = [

    {
        type: 'list',
        name: 'gender',
        message: 'Choose your gender',
        choices: ['Male', 'Female'],
        filter(val) {
            return val.toLowerCase();
        },
    },
    {
        type: 'input',
        name: 'age',
        message: 'input your age',
        validate(value) {
            const valid = !isNaN(parseFloat(value));
            return valid || 'Please enter a age';
        },
    }
]

const foundUser = [
    {
        type: 'list',
        name: 'key',
        message: 'choose what type of user info you know',
        choices: ['name', 'age', 'gender']
    },
    {
        type: 'input',
        name: 'info',
        message: 'input user info',
    }
]

async function getInfo() {
    const { key, info } = await prompt(foundUser);
    const data = await read()
    let ans = [];
    data.users.map((user) => {
        if (user[key].toLowerCase().includes(info.toLowerCase()))
            ans.push(user)
    })
    console.log(ans);
}


async function addUser() {
    try {
        let answers = await prompt(addName)
        if (answers.name == 'Exit') {
            getInfo()
        }
        else {
            let ans = answers.name;
            answers = await prompt(genderAgeQ)
            let fl = await read()
            fl.users.push({ name: ans, gender: answers.gender, age: answers.age })
            await fs.writeFile('users.txt', JSON.stringify(fl, null, '  '), { encoding: 'utf8' }, (err) => { })
            addUser()
        }
    }
    catch (err) {
        console.log(err);
    }
}

addUser()

