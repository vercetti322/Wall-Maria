// Function to generate random points
export function generateRandomPoints(numPoints, pInstance) {
    const points = [];
    const grid = {};
    const radiusX = pInstance.width / 3.2;
    const radiusY = pInstance.height / 5;
    const centerX = pInstance.width / 2;
    const centerY = pInstance.height / 2;
    for (let i = 0; i < numPoints; i++) {
        let x, y, cellKey;
        do {
            const angle = Math.random() * 2 * Math.PI + (Math.random() - 0.5) * 1.0;
            const r = Math.sqrt(Math.random()) + (Math.random() - 0.5) * 1.0;
            x = centerX + r * radiusX * Math.cos(angle);
            y = centerY + r * radiusY * Math.sin(angle);
            const cellX = Math.floor(x / 16);
            const cellY = Math.floor(y / 16);
            cellKey = `${cellX},${cellY}`;
        } while (grid[cellKey]);
        grid[cellKey] = true;
        points.push(pInstance.createVector(x, y));
    }
    return points;
}

// Function to get extreme points with respect to x-coordinates
export function getExtremePointsUpper(points) {
    let leftMost = points[0];
    let rightMost = points[0];

    for (let i = 1; i < points.length; i++) {
        if (points[i].x < leftMost.x || (points[i].x === leftMost.x && points[i].y > leftMost.y)) {
            leftMost = points[i];
        }
        if (points[i].x > rightMost.x || (points[i].x === rightMost.x && points[i].y > rightMost.y)) {
            rightMost = points[i];
        }
    }

    return { leftMost, rightMost };
}

export function getExtremePointsLower(points) {
    let leftMost = points[0];
    let rightMost = points[0];

    for (let i = 1; i < points.length; i++) {
        if (points[i].x < leftMost.x || (points[i].x === leftMost.x && points[i].y < leftMost.y)) {
            leftMost = points[i];
        }
        if (points[i].x > rightMost.x || (points[i].x === rightMost.x && points[i].y < rightMost.y)) {
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
export function findLowerBridge(S, a, epsilon=0.001) {
    let candidates = [];

    // Base case: If S has only two points, return the points sorted by x-coordinate
    if (S.length === 2) {
        return (S[0].x <= S[1].x) ? [S[0], S[1]] : [S[1], S[0]];
    }

    // Step 2: Create pairs of points and insert any remaining point into candidates
    let pairs = [];
    for (let i = 0; i < S.length; i += 2) {
        if (i + 1 < S.length) {
            if (S[i].x <= S[i + 1].x) {
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
    let pairsToRemove = [];
    for (const [p1, p2] of pairs) {
        let slope;
        if (p1.x === p2.x) {
            if (p1.y > p2.y) {
                candidates.push(p1);
            } else {
                candidates.push(p2);
            }
            pairsToRemove.push([p1, p2]);
        } else {
            slope = (p1.y - p2.y) / (p1.x - p2.x);
            slopes.push(slope);
        }
    }

    // Remove pairs marked for removal
    pairs = pairs.filter(pair => !pairsToRemove.some(p => p[0] === pair[0] && p[1] === pair[1]));

    // Step 4: Determine the median of slopes
    let k = median(slopes);

    // Step 5: Partition pairs into SMALL, EQUAL, and LARGE sets based on slope
    let SMALL = [], EQUAL = [], LARGE = [];

    for (let i = 0; i < slopes.length; i++) {
        if (Math.abs(slopes[i] - k) < epsilon) {
            EQUAL.push(pairs[i]);
        } else if (slopes[i] < k - epsilon) {
            SMALL.push(pairs[i]);
        } else if (slopes[i] > k + epsilon) {
            LARGE.push(pairs[i]);
        }
    }

    // Step 6: Find points on the supporting line with slope K
    let MAX = []; // Points on the supporting line
    let maxYK = -Infinity; // Initialize to negative infinity to find maximum
    for (const point of S) {
        let yOnLine = point.y - k * point.x;
        if (yOnLine == maxYK) {
            // If the current y-coordinate on the line is equal to the maximum y-coordinate, add the point to MAX
            MAX.push(point);
        } else if (yOnLine > maxYK) { // If the current y-coordinate on the line is greater than the maximum y-coordinate
            // Update MAX and maxYK
            MAX = [point];
            maxYK = yOnLine;
        }
    }

    // Find the point with minimum x-coordinate in MAX
    let pk = MAX.reduce((minPoint, point) => (point.x < minPoint.x) ? point : minPoint, MAX[0]);
    // Find the point with maximum x-coordinate in MAX
    let pm = MAX.reduce((maxPoint, point) => (point.x > maxPoint.x) ? point : maxPoint, MAX[0]);


    // Step 7: Check if the bridge lies on the supporting line
    if (pk.x <= a && pm.x > a) {
        console.log("hi")
        return [pk, pm];
    }

    // Step 8: Determine candidates based on the position of the vertical line
    if (pm.x <= a) {
        for (const [_, p2] of LARGE.concat(EQUAL)) {
            candidates.push(p2);
        }
        for (const [p1, p2] of SMALL) {
            candidates.push(p1);
            candidates.push(p2);
        }
    } else if (pk.x > a) {
        for (const [p1, _] of SMALL.concat(EQUAL)) {
            candidates.push(p1);
        }
        for (const [p1, p2] of LARGE) {
            candidates.push(p1);
            candidates.push(p2);
        }
    }


    // Step 9: Recur with candidates
    return findLowerBridge(candidates, a);
}

function connectLower(k, m, points) {
    let a = getMedianOfMedians(points);
    let [p, q] = findLowerBridge(points, a);

    let bridges = [[p, q]];

    let points_left = [];
    let points_right = [];

    for (const point of points) {
        if (point.x < p.x) {
            points_left.push(point);
        } else if (point.x > q.x) {
            points_right.push(point);
        }
    }

    points_left.push(p);
    points_right.push(q);

    if (p.x !== k.x || p.y !== k.y) {
        bridges = bridges.concat(connectLower(k, p, points_left));
    }

    if (q.x !== m.x || q.y !== m.y) {
        bridges = bridges.concat(connectLower(q, m, points_right));
    }

    return bridges;
}

export function lowerHull(points) {
    let {leftMost: p_min, rightMost: p_max} = getExtremePointsUpper(points)

    if (p_max === p_min) {
        return [[p_min, p_min]];
    }

    let T = []
    T.push(p_max)
    T.push(p_min)

    for (const point of points) {
        if (p_min.x < point.x && point.x < p_max.x) {
            T.push(point)
        }
    }

    let bridges = connectLower(p_min, p_max, T)

    return bridges;
}

// Function to find median of an array using Quick Select algorithm
function median(arr, tolerance = 1e-6) {
    const n = arr.length;
    const k = Math.floor(n / 2);

    if (n <= 5) {
        arr.sort((a, b) => a - b);
        return arr[k];
    }

    // Select a pivot element randomly
    const pivot = arr[Math.floor(Math.random() * n)];

    // Partition the array into two sub-arrays
    const left = arr.filter(num => num < pivot - tolerance);
    const right = arr.filter(num => num > pivot + tolerance);
    const equals = arr.filter(num => Math.abs(num - pivot) <= tolerance);

    if (k < left.length) {
        return median(left, tolerance);
    } else if (k < left.length + equals.length) {
        return pivot;
    } else {
        return median(right, tolerance);
    }
}

function connectUpper(k, m, points) {
    let a = getMedianOfMedians(points);
    let [p, q] = findUpperBridge(points, a);

    let bridges = [[p, q]];

    let points_left = [];
    let points_right = [];

    for (const point of points) {
        if (point.x < p.x) {
            points_left.push(point);
        } else if (point.x > q.x) {
            points_right.push(point);
        }
    }

    points_left.push(p);
    points_right.push(q);

    if (p.x !== k.x || p.y !== k.y) {
        bridges = bridges.concat(connectUpper(k, p, points_left));
    }

    if (q.x !== m.x || q.y !== m.y) {
        bridges = bridges.concat(connectUpper(q, m, points_right));
    }

    return bridges;
}

export function upperHull(points) {
    let {leftMost: p_min, rightMost: p_max} = getExtremePointsLower(points)

    if (p_max === p_min) {
        return [[p_min, p_min]];
    }

    let T = []
    T.push(p_max)
    T.push(p_min)

    for (const point of points) {
        if (p_min.x < point.x && point.x < p_max.x) {
            T.push(point)
        }
    }

    let bridges = connectUpper(p_min, p_max, T)

    return bridges;
}


// Function to find the upper bridge
export function findUpperBridge(S, a, epsilon=0.001) {
    let candidates = [];

    // Base case: If S has only two points, return the points sorted by x-coordinate
    if (S.length === 2) {
        return (S[0].x <= S[1].x) ? [S[0], S[1]] : [S[1], S[0]];
    }

    // Step 2: Create pairs of points and insert any remaining point into candidates
    let pairs = [];
    for (let i = 0; i < S.length; i += 2) {
        if (i + 1 < S.length) {
            if (S[i].x <= S[i + 1].x) {
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
    let pairsToRemove = [];
    for (const [p1, p2] of pairs) {
        let slope;
        if (p1.x === p2.x) {
            if (p1.y > p2.y) {
                candidates.push(p1);
            } else {
                candidates.push(p2);
            }
            pairsToRemove.push([p1, p2]);
        } else {
            slope = (p2.y - p1.y) / (p1.x - p2.x);
            slopes.push(slope);
        }
    }

    // Remove pairs marked for removal
    pairs = pairs.filter(pair => !pairsToRemove.some(p => p[0] === pair[0] && p[1] === pair[1]));

    // Step 4: Determine the median of slopes
    let k = median(slopes);

    // Step 5: Partition pairs into SMALL, EQUAL, and LARGE sets based on slope
    let SMALL = [], EQUAL = [], LARGE = [];

    for (let i = 0; i < slopes.length; i++) {
        if (Math.abs(slopes[i] - k) < epsilon) {
            EQUAL.push(pairs[i]);
        } else if (slopes[i] < k - epsilon) {
            SMALL.push(pairs[i]);
        } else if (slopes[i] > k + epsilon) {
            LARGE.push(pairs[i]);
        }
    }

    // Step 6: Find points on the supporting line with slope K
    let MAX = []; // Points on the supporting line
    let maxYK = -Infinity; // Initialize to negative infinity to find maximum
    for (const point of S) {
        let yOnLine = k * point.x - point.y;
        if (yOnLine == maxYK) {
            // If the current y-coordinate on the line is equal to the maximum y-coordinate, add the point to MAX
            MAX.push(point);
        } else if (yOnLine > maxYK) { // If the current y-coordinate on the line is greater than the maximum y-coordinate
            // Update MAX and maxYK
            MAX = [point];
            maxYK = yOnLine;
        }
    }

    // Find the point with minimum x-coordinate in MAX
    let pk = MAX.reduce((minPoint, point) => (point.x < minPoint.x) ? point : minPoint, MAX[0]);
    // Find the point with maximum x-coordinate in MAX
    let pm = MAX.reduce((maxPoint, point) => (point.x > maxPoint.x) ? point : maxPoint, MAX[0]);


    // Step 7: Check if the bridge lies on the supporting line
    if (pk.x <= a && pm.x > a) {
        console.log("hi")
        return [pk, pm];
    }

    // Step 8: Determine candidates based on the position of the vertical line
    if (pm.x <= a) {
        for (const [_, p2] of LARGE.concat(EQUAL)) {
            candidates.push(p2);
        }
        for (const [p1, p2] of SMALL) {
            candidates.push(p1);
            candidates.push(p2);
        }
    } else if (pk.x > a) {
        for (const [p1, _] of SMALL.concat(EQUAL)) {
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

export function polarAngle(a, b, c) {
    let x = (a.x - b.x) * (c.x - b.x) + (a.y - b.y) * (c.y - b.y);
    let y = (a.x - b.x) * (c.y - b.y) - (c.x - b.x) * (a.y - b.y);
    return Math.atan2(y, x);
}

export function* convexHull(points) {
    if (points.length < 3) return points;

    let hull = [];
    let tmp;

    // Find leftmost point
    tmp = points[0];
    for (const p of points) if (p.x < tmp.x) tmp = p;

    hull[0] = tmp;

    let endpoint, secondlast;
    let min_angle, new_end;

    endpoint = hull[0];
    secondlast = {x: endpoint.x, y: endpoint.y + 10};

    do {
        min_angle = Math.PI; // Initial value. Any angle must be lower that 2PI
        for (const p of points) {
            tmp = polarAngle(secondlast, endpoint, p);

            if (tmp <= min_angle) {
                new_end = p;
                min_angle = tmp;
            }
        }

        if (new_end != hull[0]) {
            hull.push(new_end);
            secondlast = endpoint;
            endpoint = new_end;
        }

        yield hull; // Yield the intermediate hull
    } while (new_end != hull[0]);
}

export function drawJVHull(points, pInstance, finalHull = false) {
    // Number of points
    let n = points.length;
    
    // If there are less than 3 points, convex hull is not possible
    if (n < 3) return;

    // Calculate the convex hull
    let hullGenerator = convexHull(points);

    // Draw the hull
    pInstance.strokeWeight(1);
    pInstance.stroke(200); // Grey color for internal lines
    let intervalId = setInterval(() => {
        let result = hullGenerator.next();
        if (!result.done) {
            let hull = result.value;
            for (let i = 0; i < hull.length - 1; i++) {
                pInstance.line(hull[i].x, hull[i].y, hull[i + 1].x, hull[i + 1].y);
            }
            // Draw the line from the last point to the first point
            pInstance.line(hull[hull.length - 1].x, hull[hull.length - 1].y, hull[0].x, hull[0].y);
        } else {
            clearInterval(intervalId); // Clear the interval
            if (finalHull) { // If it's the final hull, draw it in black
                pInstance.strokeWeight(2);
                pInstance.stroke(0);
                for (let i = 0; i < points.length - 1; i++) {
                    pInstance.line(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);
                }
                // Draw the line from the last point to the first point
                pInstance.line(points[points.length - 1].x, points[points.length - 1].y, points[0].x, points[0].y);
            }
        }
    }, 200); // 200 ms delay
}