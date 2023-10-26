const dots = (str) => {
    let result = [str[0]];
    for (let i = 1; i < str.length; i++) {
        console.log('slice',result.slice());
        let copy = result.slice().map((s) => s + '.');
        console.log(copy);
        result = [...result, ...copy].map((value) => value + str[i])
        console.log(result);
    }
    return result
}

console.log(dots('abcd'));
