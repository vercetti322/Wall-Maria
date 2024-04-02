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

function connect(k, m, points) {
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
        bridges = bridges.concat(connect(k, p, points_left));
    }

    if (q.x !== m.x || q.y !== m.y) {
        bridges = bridges.concat(connect(q, m, points_right));
    }

    return bridges;
}

export function lowerHull(points) {
    let {leftMost: p_min, rightMost: p_max} = getExtremePoints(points)

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

    let bridges = connect(p_min, p_max, T)

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