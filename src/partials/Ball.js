import { SVG_NS } from '../settings';
export default class Ball {
  constructor(radius, boardWidth, boardHeight, color) {
    this.radius = radius;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.color = color;
    this.direction = 1;
    this.reset();
  }

  reset() {
    // this.ax = 0.001;
    // this.ay = 0.001;
    this.x = this.boardWidth / 2;
    this.y = this.boardHeight / 2;

    this.vy = 0;
    while (this.vy === 0) {
      this.vy = Math.floor(Math.random() * 10 - 5);
    }
    this.vx = this.direction * (6 - Math.abs(this.vy));
  }

  wallCollision() {
    const hitLeft = this.x - this.radius <= 0;
    const hitRight = this.x + this.radius >= this.boardWidth;
    const hitTop = this.y - this.radius <= 0;
    const hitBottom = this.y + this.radius >= this.boardHeight;

    if (hitRight || hitLeft) {
      this.vx *= -1;
    } else if (hitTop || hitBottom) {
      this.vy *= -1;
    }
  }

  render(svg) {
    // this.vx += this.ax;
    // this.vy += this.ay;

    this.x += this.vx;
    this.y += this.vy;

    this.wallCollision();
    const ball = document.createElementNS(SVG_NS, 'circle');
    ball.setAttributeNS(null, 'cx', this.x);
    ball.setAttributeNS(null, 'cy', this.y);
    ball.setAttributeNS(null, 'r', this.radius);
    ball.setAttributeNS(null, 'fill', this.color);
    svg.appendChild(ball);
  }
}
