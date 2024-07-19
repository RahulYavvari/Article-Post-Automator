
export const articlesDifference = (curr, prev) => {
    if(prev.length == 0) {
        return curr;
    }

    const difference = curr.filter(currObj => {
        return !prev.some(prevObj =>
            prevObj.title === currObj.title &&
            prevObj.subtext === currObj.subtext &&
            prevObj.link === currObj.link &&
            prevObj.imgSrc === currObj.imgSrc
        );
    });

    return difference;
};