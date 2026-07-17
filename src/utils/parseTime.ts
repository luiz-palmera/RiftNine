export function parseTime(time:number){
    const minutes = Math.floor(time/ 60);
    const seconds = time % 60;

    const formattedMins = String(minutes).padStart(2, '0');
    const formattedSecs = String(seconds).padStart(2, '0')
    return `${formattedMins}:${formattedSecs}`
}