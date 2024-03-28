// giftWrapping.js

// Function to generate random points
export function generateRandomPoints(numPoints, pInstance) {
    const points = [];
    const radiusX = pInstance.width / 3.2;
    const radiusY = pInstance.height / 5;
    const centerX = pInstance.width / 2;
    const centerY = pInstance.height / 2;
    for (let i = 0; i < numPoints; i++) {
      const angle = Math.random() * 2 * Math.PI + (Math.random() - 0.5) * 1.0;
      const r = Math.sqrt(Math.random()) + (Math.random() - 0.5) * 1.0;
      const x = centerX + r * radiusX * Math.cos(angle);
      const y = centerY + r * radiusY * Math.sin(angle);
      points.push(pInstance.createVector(x, y));
    }
    return points;
  }
  
  // Function to get extreme points with respect to x-coordinates
  export function getExtremePoints(points) {
    let leftMost = points[0];
    let rightMost = points[0];
  
    for (let i = 1; i < points.length; i++) {
      if (points[i].x < leftMost.x) {
        leftMost = points[i];
      }
      if (points[i].x > rightMost.x) {
        rightMost = points[i];
      }
    }
  
    return { leftMost, rightMost };
  }
  
  export function highlightExtremePoints(p, leftMost, rightMost) {
    // Determine the extreme points based on least x and y coordinates
    let extremePoint1 = leftMost;
    let extremePoint2 = rightMost;
  
    // If the x coordinates are the same, choose the point with higher y coordinate
    if (leftMost.x === rightMost.x) {
      if (leftMost.y > rightMost.y) {
        extremePoint1 = rightMost;
        extremePoint2 = leftMost;
      }
    } else if (leftMost.x > rightMost.x) {
      // Swap extreme points if necessary to ensure the leftmost point is first
      [extremePoint1, extremePoint2] = [rightMost, leftMost];
    }

    // Highlight extreme points
    p.strokeWeight(4); // Increase weight
    p.stroke(255, 0, 0); // Red color
    p.point(extremePoint1.x, extremePoint1.y);
    p.point(extremePoint2.x, extremePoint2.y);

    // Return the extreme points
    return [extremePoint1, extremePoint2];
}

export function getMedianOfMedians(points) {
    const n = points.length;
    const xCoordinates = points.map(point => point.x); // Extract x-coordinates
    
    // Use quickselect to find the median of x-coordinates
    const medianIndex = Math.floor(n / 2);
    const medianX = quickselect(xCoordinates, medianIndex);

    return medianX;
}


function quickselect(arr, k) {
    const pivot = arr[Math.floor(Math.random() * arr.length)];
    const left = [];
    const right = [];
    const equals = [];
    
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else if (arr[i] > pivot) {
            right.push(arr[i]);
        } else {
            equals.push(arr[i]);
        }
    }
    
    if (k < left.length) {
        return quickselect(left, k);
    } else if (k < left.length + equals.length) {
        return pivot;
    } else {
        return quickselect(right, k - left.length - equals.length);
    }
}

export function drawVerticalLineThroughMedian(p, median) {
    const startY = p.height * 0.15; // Starting y-coordinate (10% from the top)
    const endY = p.height * 0.82;   // Ending y-coordinate (90% from the top)
    
    p.strokeWeight(2);
    p.stroke(0, 0, 255); // Blue color
    p.line(median, startY, median, endY); // Line extends from startY to endY
}


// Function to find the upper bridge
export function findUpperBridge(S, a) {
    let candidates = [];
    
    // Base case: If S has only two points, return the points sorted by x-coordinate
    if (S.length === 2) {
        return (S[0].x <= S[1].x) ? [S[0], S[1]] : [S[1], S[0]];
    }
    
    // Step 2: Create pairs of points and insert any remaining point into candidates
    let pairs = [];
    for (let i = 0; i < S.length; i += 2) {
        if (i + 1 < S.length) {
            if (S[i].x < S[i + 1].x) {
                pairs.push([S[i], S[i + 1]]);
            } else {
                pairs.push([S[i + 1], S[i]]);
            }
        } else {
            candidates.push(S[i]);
        }
    }
    
    // Step 3: Determine slopes of lines defined by pairs and handle points with same x-coordinate
    let slopes = [];
    let pairsToRemove = []; // New array to store pairs to be removed
    for (const [p1, p2] of pairs) {
        let slope;
        if (p1.x === p2.x) {
            pairsToRemove.push([p1, p2]); // Add pairs to be removed
            if (p1.y > p2.y) {
                candidates.push(p1);
            } else {
                candidates.push(p2);
            }
        } else {
            slope = (p1.y - p2.y) / (p1.x - p2.x);
            slopes.push(slope);
        }
    }

    // Remove pairs marked for removal
    pairs = pairs.filter(pair => !pairsToRemove.some(p => p[0] === pair[0] && p[1] === pair[1]));
    console.log("hi");
    return [1,2];
    
    // Step 4: Determine the median of slopes
    let k = median(slopes);
    
    // Step 5: Partition pairs into SMALL, EQUAL, and LARGE sets based on slope
    let SMALL = [], EQUAL = [], LARGE = [];
    const tolerance = 1e-10; // Adjust tolerance value as needed

    for (let i = 0; i < pairs.length; i++) {
        if (Math.abs(slopes[i] - k) < tolerance) {
            EQUAL.push(pairs[i]);
        } else if (slopes[i] < k - tolerance) {
            SMALL.push(pairs[i]);
        } else if (slopes[i] > k + tolerance) {
            LARGE.push(pairs[i]);
        }
    }

    
    // Step 6: Find points on the supporting line with slope K
    let MAX = []; // Points on the supporting line
    let maxYK = -Infinity; // Initialize to negative infinity to handle all cases
    for (const point of S) {
        let yOnLine = point.y - k * point.x;
        if (Math.abs(yOnLine - maxYK) < tolerance) {
            // If the current y-coordinate on the line is within the tolerance range of the maximum y-coordinate, add the point to MAX
            MAX.push(point);
        } else if (yOnLine > maxYK + tolerance) {
            // If the current y-coordinate on the line is greater than the maximum y-coordinate by more than the tolerance, update MAX
            MAX = [point];
            maxYK = yOnLine; // Update the maximum y-coordinate
        }
    }

    // Find the point with minimum x-coordinate in MAX
    let pk = MAX.reduce((minPoint, point) => (point.x < minPoint.x) ? point : minPoint, MAX[0]);
    // Find the point with maximum x-coordinate in MAX
    let pm = MAX.reduce((maxPoint, point) => (point.x > maxPoint.x) ? point : maxPoint, MAX[0]);
    
    // Step 7: Check if the bridge lies on the supporting line
    if (pk.x <= a + tolerance && pm.x >= a - tolerance) {
        return [pk, pm];
    }
    
    // Step 8: Determine candidates based on the position of the vertical line
    if (pm.x <= a - tolerance) {
        for (const [p1, p2] of LARGE.concat(EQUAL)) {
            candidates.push(p2);
        }
        for (const [p1, p2] of SMALL) {
            candidates.push(p1);
            candidates.push(p2);
        }
    } else if (pk.x >= a + tolerance) {
        for (const [p1, p2] of SMALL.concat(EQUAL)) {
            candidates.push(p1);
        }
        for (const [p1, p2] of LARGE) {
            candidates.push(p1);
            candidates.push(p2);
        }
    }
    
    // Step 9: Recur with candidates
    return findUpperBridge(candidates, a);
}


// Function to find median of an array using Quick Select algorithm
function median(arr, tolerance = 1e-10) {
    const n = arr.length;
    const k = Math.floor(n / 2);

    if (n <= 5) {
        arr.sort((a, b) => a - b);
        return arr[k];
    }

    // Select a pivot element randomly
    const pivot = arr[Math.floor(Math.random() * n)];

    // Partition the array into two sub-arrays
    const left = arr.filter(num => num < pivot);
    const right = arr.filter(num => num > pivot);
    const equals = arr.filter(num => num === pivot);

    if (k < left.length) {
        // Recursively apply Quick Select to the left sub-array
        return median(left, tolerance);
    } else if (k < left.length + equals.length) {
        // If the pivot index is the desired index, return the pivot element
        return pivot;
    } else {
        // Recursively apply Quick Select to the right sub-array
        return median(right, tolerance);
    }
}
