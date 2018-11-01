import { SVG_NS } from '../settings';
export default class Ball {
  constructor(radius, boardWidth, boardHeight, color) {
    this.radius = radius;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.color = color;
    this.direction = 1;
  }

  render(svg) {
    const ball = document.createElementNS(SVG_NS, 'circle');
    ball.setAttributeNS(null, 'cx', this.boardWidth / 2);
    ball.setAttributeNS(null, 'cy', this.boardHeight / 2);
    ball.setAttributeNS(null, 'r', this.radius);
    ball.setAttributeNS(null, 'fill', this.color);
    svg.appendChild(ball);
  }
}
