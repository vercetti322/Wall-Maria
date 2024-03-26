// giftWrapping.js

// Function to generate random points
export function generateRandomPoints(numPoints, pInstance) {
    const points = [];
    const radiusX = pInstance.width / 3.2;
    const radiusY = pInstance.height / 4;
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
    p.strokeWeight(5);
    p.stroke(255, 0, 0); // Red color
    p.point(extremePoint1.x, extremePoint1.y);
    p.point(extremePoint2.x, extremePoint2.y);
  }
  