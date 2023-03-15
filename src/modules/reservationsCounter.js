const reservationsCounter = (list) => {
    let counter = list.length;
    return counter === 0 ? '' : `(${counter})`;
};

export default reservationsCounter;