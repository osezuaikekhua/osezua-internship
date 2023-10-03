function TimerLogic({ time }) {
    const now = Date.now();
  
    const difference = time - now;
  
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
  
    let outputString = "";
  
    if (hours > 0) outputString += hours + "h" + " ";
    if (minutes % 60 > 0) outputString += (minutes % 60) + "m" + " ";
    outputString += seconds + "s";
    return outputString;
  }
  
  export default TimerLogic;