
const jsonToNameValueTuple = (json) => {
    const result = {
        name: '(',
        value: '('
    };
    result.name += Object.keys(json).join(', ') + ')';
    result.value += Object.values(json).map(value => typeof value === 'string' ? `"${value}"` : value).join(', ') + ')';
    return result;
};


export { jsonToNameValueTuple };




