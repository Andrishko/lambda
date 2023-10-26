function solution(str) {
    let ans = []
    while (str.length > 3) {
        ans.push(str.slice(0, 2));
        str = str.slice(2)
        console.log(str);
        console.log(ans);
    }
    if (str.length == 3) {
        console.log(str);
        ans.push(str.slice(0, 2))
        ans.push(str[2] + '_')
    }
    else if (str.length == 2) {
        ans.push(str)
    }
    else if (str.length == 1) {
        ans.push(str + '_')
    }
    console.log(ans);
    return ans
}

// solution('0123456789')
// solution('A')

function domainName(url) {
    console.log(url);
    console.log(url.startsWith('https://'));
    if (url.startsWith('http://') || url.startsWith('https://')) {
        console.log('dsaf');
        return url.match(/\/\w*\./g)[0].slice(1, -1)
    }
    if (url.startsWith('www')) {
        return url.match(/\.\w*\./g)[0].slice(1, -1);
    }
}

// console.log(domainName('https://youtube.com'));

function generateHashtag(str) {
    if (str.match(/^ *$/)) return false
    console.log('str: ', str)
    let ans = '#'
    console.log(str.split(/ +/g));
    str.split(/ +/g).map((s) => {
        if (s != '') {
            ans = ans.concat(s[0].toUpperCase().concat(s.slice(1)))
        }
    })
    if (ans.length == 140) return false
    return (ans)
}

// console.log(generateHashtag(' a  bb  ccc  dddd  eeeee  ffffff  ggggggg  hhhhhhhh  iiiiiiiii  jjjjjjjjjj  kkkkkkkkkkk  llllllllllll  mmmmmmmmmmmmm  nnnnnnnnnnnnnn  ooooooooooooooo  pppppppppppppppp  qqq'))

function solution(nums) {
    // if (nums === null || nums == []) {return []}
    if (nums.length < 2) {
        return nums;
    }

    let ank = nums[0]
    let left = []
    let right = []
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] > ank) {
            right.push(nums[i])
        }
        else {
            left.push(nums[i])
        }
    }
    return solution(left).concat(ank, solution(right));
}

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

// console.log(quickSortBig([1, 2, 3, 10, 5]));


function sumOfN(n) {
    if (n > 0) {
        let ans = [0, 1]
        for (let i = 2; i < n + 1; i++) {
            ans.push(ans[i - 1] + i)
        }
        return ans
    }
    else {
        let ans = [0, -1]
        for (let i = -2; i > n - 1; i--) {
            console.log(i);
            ans.push(ans[-i - 1] - i)
        }
        return ans
    }
};

console.log(sumOfN(-5));