const inquirer = require('inquirer');

console.log('Hi, welcome to Node Pizza');

// const questions = [
//     {
//         type: 'confirm',
//         name: 'toBeDelivered',
//         message: 'Is this for delivery?',
//         default: false,
//         transformer: (answer) => (answer ? '👍' : '👎'),
//     },
//     {
//         type: 'input',
//         name: 'phone',
//         message: "What's your phone number?",
//         default: 'true',
//         validate(value) {
//             const pass = value.match(
//                 /^([01]{1})?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})\s?((?:#|ext\.?\s?|x\.?\s?){1}(?:\d+)?)?$/i,
//             );
//             if (pass) {
//                 return true;
//             }

//             return 'Please enter a valid phone number';
//         },
//     },
//     {
//         type: 'list',
//         name: 'size',
//         message: 'What size do you need?',
//         choices: ['Large', 'Medium', 'Small'],
//         filter(val) {
//             return val.toLowerCase();
//         },
//     },
//     {
//         type: 'input',
//         name: 'quantity',
//         message: 'How many do you need?',
//         validate(value) {
//             const valid = !isNaN(parseFloat(value));
//             return valid || 'Please enter a number';
//         },
//         filter: Number,
//     },
//     {
//         type: 'expand',
//         name: 'toppings',
//         message: 'What about the toppings?',
//         choices: [
//             {
//                 key: 'p',
//                 name: 'Pepperoni and cheese',
//                 value: 'PepperoniCheese',
//             },
//             {
//                 key: 'a',
//                 name: 'All dressed',
//                 value: 'alldressed',
//             },
//             {
//                 key: 'w',
//                 name: 'Hawaiian',
//                 value: 'hawaiian',
//             },
//         ],
//     },
//     {
//         type: 'rawlist',
//         name: 'beverage',
//         message: 'You also get a free 2L beverage',
//         choices: ['Pepsi', '7up', 'Coke'],
//     },
//     {
//         type: 'input',
//         name: 'comments',
//         message: 'Any comments on your purchase experience?',
//         default: 'Nope, all good!',
//     },
//     {
//         type: 'list',
//         name: 'prize',
//         message: 'For leaving a comment, you get a freebie',
//         choices: ['cake', 'fries'],
//         when(answers) {
//             return answers.comments !== 'Nope, all good!';
//         },
//     },
// ];


const directionsPrompt = {
    type: 'list',
    name: 'direction',
    message: 'Which direction would you like to go?',
    choices: ['Forward', 'Right', 'Left', 'Back'],
};

function main() {
    console.log('You find youself in a small room, there is a door in front of you.');
    exitHouse();
}

function exitHouse() {
    inquirer.prompt(directionsPrompt).then((answers) => {
        if (answers.direction === 'Forward') {
            console.log('You find yourself in a forest');
            console.log(
                'There is a wolf in front of you; a friendly looking dwarf to the right and an impasse to the left.',
            );
            encounter1();
        } else {
            console.log('You cannot go that way. Try again');
            exitHouse();
        }
    });
}

const questions = [
    {
        type: 'confirm',
        name: 'bacon',
        message: 'Do you like bacon?',
        default: 'exit',
    },
    {
        type: 'input',
        name: 'favorite',
        message: 'Bacon lover, what is your favorite type of bacon?',
        when(answers) {
            return answers.bacon;
        },
    },
    {
        type: 'confirm',
        name: 'pizza',
        default: 'true',
        message: 'Ok... Do you like pizza?',

        when(answers) {
            return !likesFood('bacon')(answers);
        },

    },
    {
        type: 'input',
        name: 'favorite',
        default: 'true',
        message: 'Whew! What is your favorite type of pizza?',
        validate(value) {
            if (value === 'true') {
                exitHouse()
            }
        },
        when: likesFood('pizza'),
    },
];

function likesFood(aFood) {
    return function (answers) {
        return answers[aFood];
    };
}

// inquirer.prompt(questions).then((answers) => {
//     console.log(JSON.stringify(answers, null, '  '));
// });

const test = [
    {
        type: 'list',
        name: 'gender',
        message: 'Choose your gender',
        choices: ['Male', 'Female'],
        default: 'exit'
    }
]

inquirer.prompt(test).then((answers) => {
    console.log(JSON.stringify(answers, null, '  '));
});




