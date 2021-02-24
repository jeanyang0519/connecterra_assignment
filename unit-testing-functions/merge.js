
module.exports = function mergingIntervals(intervals, distance, index = 0, output = [], intervalArray = []) {
    if (index === intervals.length) return output;

    let interval = intervals[index];
    let sequence = interval.sequence;
    let start = interval.start;
    let end = interval.end;
    let action = interval.action;
    
    if (distance < 0 || typeof distance !== "number") {
        throw new Error("Distance must be a positive number");
    }

    if (start > end) {
        throw new Error("End must be greater than start")
    }

    if (typeof start !== "number" || typeof end !== "number") {
        throw new Error("Start and end must be numbers");
    }
    
    index = index + 1;

    if (action === "ADDED") {
        intervalArray.push([start, end])
    }

    if ((sequence === 1 || output.length === 0) 
        && action !== "REMOVED" 
        && action !== "DELETED") {

            console.log("jjj")
        output.push([start, end])
    }

    if (action === "ADDED" && output[1] + distance < start) { 
        output.push([start, end])
    } else if (action !== "REMOVED" && action !== "DELETED") {
        output.push([start, end])
        output = mergeInterval(output, distance) 
    }
    
    if (action === "REMOVED") {
        output.forEach((interval, idx) => {
            if (interval[0] === start || interval[1] === end) {
                console.log(intervalArray)
                output[idx] = removeInterval(intervalArray, start, end)
            }
        })
        
        intervalArray.forEach((interval, idx) => {
            if (interval[0] === start && interval[1] === end) {
                intervalArray.splice(idx, 1)
            }
        })
    } 

    if (action === "DELETED") {
        output = deleteInterval(output, start, end)
    }

    return mergingIntervals(intervals, distance, index, output, intervalArray);
}


function mergeInterval(intervalArray, distance) {
  if (!intervalArray.length) return intervalArray
  intervalArray.sort((a, b) => a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1])
  var prev = intervalArray[0]
  var res = [prev]
  for (var curr of intervalArray) {
    if (curr[0] <= prev[1] + distance) { 
      prev[1] = Math.max(prev[1], curr[1]) 
      res[res.length - 1][1] = prev[1];
    }  else { 
      res.push(curr)
      prev = curr
    }
  }
  
  return res
}

function removeInterval(intervalArray, startToBeRemoved, endToBeRemoved) {
    let startArray = [];
    let endArray = [];
    intervalArray.forEach(interval => { 
        startArray.push(interval[0]);
        endArray.push(interval[1]);
    })
    
    startArray.sort();
    endArray.sort();

    if (findNewPoint(startArray, startToBeRemoved).length === 0,
        findNewPoint(endArray, endToBeRemoved).length === 0) {
            console.log("try")
            return []
        }

    return [findNewPoint(startArray, startToBeRemoved),
        findNewPoint(endArray, endToBeRemoved)]
}

function findNewPoint(array, target) {
    const targetIdx = array.indexOf(target);
    const prevIdx = targetIdx - 1;
    const nextIdx = targetIdx + 1;

    if (!array[prevIdx] && array[nextIdx]) {
        return array[nextIdx];
    }

    if (array[prevIdx] && !array[nextIdx]) {
        return array[prevIdx];
    }

    if (array[prevIdx] && array[nextIdx]) {
        return array[nextIdx];
    }

    if (!array[prevIdx] && !array[nextIdx]) {
        return [];
    }
}

function deleteInterval(intervals, startToBeRomoved, endToBeRemoved) {
    let result = [];
    intervals.sort((a, b) => a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1])
    intervals.forEach(interval => {
        if (startToBeRomoved > interval[0] && startToBeRomoved < interval[1]) {
            result.push([interval[0], startToBeRomoved])
        }

        if (endToBeRemoved < interval[1] && endToBeRemoved > interval[0]) {
            result.push([endToBeRemoved, interval[1]])
        }

        if (startToBeRomoved >= interval[1] || interval[0] >= endToBeRemoved) {
            result.push([interval[0], interval[1]])
        }
    }) 
    
    return result
}