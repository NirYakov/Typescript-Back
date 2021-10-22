

export function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}



export  function TwoAfterThePointRound(num : number) 
{
    return Math.round((num + Number.EPSILON) * 100) / 100;
}