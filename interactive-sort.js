const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

const taskList = 'What do you want to do?\n1.Sort words\n2.Show digit from the smallest\n3.Show digit from the biggest\n4.Show bigest word\n5.Show uniq word\n6.Show uniq chars and digits\nInput: '

function quickSortBig(arr) {
    if (arr.length < 2) return arr
    let pivot = arr[0];
    let left = []
    let right = []
    for (let j = 1; j < arr.length; j++) {
        if (arr[j] > pivot) {
            right.push(arr[j])
        }
        else {
            left.push(arr[j])
        }
    }
    return quickSortBig(left).concat(pivot, quickSortBig(right));
}

function quickSortSmall(arr) {
    if (arr.length < 2) return arr
    let pivot = arr[0];
    let left = []
    let right = []
    for (let j = 1; j < arr.length; j++) {
        if (arr[j] < pivot) {
            right.push(arr[j])
        }
        else {
            left.push(arr[j])
        }
    }
    return quickSortSmall(left).concat(pivot, quickSortSmall(right));
}

function sortWords(arr) {
    if (arr.length < 2) return arr
    let pivot = arr[0].length;
    let left = []
    let right = []
    for (let j = 1; j < arr.length; j++) {
        if (arr[j].length > pivot) {
            right.push(arr[j])
        }
        else {
            left.push(arr[j])
        }
    }
    return sortWords(left).concat(arr[0], sortWords(right));
}

function uniq(arr) {
    let ans = []
    arr.map((el) => {
        if (ans.filter(f => f != el)) {
            if (arr.filter(f => f === el).length === 1) ans.push(el)
        }
        else return
    })

    return ans
}

const interactiveSort = () => {
    let arr = []
    readline.question(taskList, input => {
        readline.question(`Write your string:\n `, str => {
            switch (input) {
                case 'Exit':
                    readline.close();
                    break
                case '1':
                    str.split(/[^A-Za-z]/).filter((word) => word != '').sort();
                    interactiveSort()
                    break
                case '2':
                    arr = str.split(/\D/).filter((word) => word != '');
                    console.log(quickSortBig(arr.map(str => parseInt(str, 10))));
                    interactiveSort()
                    break
                case '3':
                    arr = str.split(/\D/).filter((word) => word != '');
                    console.log(quickSortSmall(arr.map(str => parseInt(str, 10))));
                    interactiveSort()
                    break
                case '4':
                    arr = str.split(' ').filter((word) => word != '');
                    console.log(sortWords(arr));
                    interactiveSort()
                    break
                case '5':
                    arr = str.split(' ').filter((word) => word != '');
                    console.log(uniq(arr));
                    interactiveSort()
                    break
                case '6':
                    console.log('fdsaf');
                    interactiveSort()
                    break
                default:
                    console.log('Something goes wrong try another input');
                    interactiveSort()
                    break


            }
        })
    });
}

interactiveSort()




