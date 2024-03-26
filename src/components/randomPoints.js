export default function generateRandomPoints(numPoints, width, height, p5) {
    const points = [];
    const radiusX = width / 3.2;
    const radiusY = height / 4;
    const centerX = width / 2;
    const centerY = height / 2;
    for (let i = 0; i < numPoints; i++) {
      const angle = Math.random() * 2 * Math.PI + (Math.random() - 0.5) * 1.0;
      const r = Math.sqrt(Math.random()) + (Math.random() - 0.5) * 1.0;
      const x = centerX + r * radiusX * Math.cos(angle);
      const y = centerY + r * radiusY * Math.sin(angle);
      points.push(p5.createVector(x, y));
    }
    return points;
  }
  