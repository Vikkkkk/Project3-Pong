import { SVG_NS } from '../settings';
export default class Ball {
  constructor(radius, boardWidth, boardHeight, color) {
    this.radius = radius;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.color = color;
    this.direction = 1;
    this.reset();
    this.ping = new Audio('public/sounds/pong-01.wav');
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

  paddleCollision(player1, player2) {
    if (this.vx > 0) {
      let paddle = player2.coordinates(
        player2.x,
        player2.y,
        player2.width,
        player2.height
      );
      let [leftX, rightX, topY, bottomY] = paddle; //these two lines are the object destructuring stuff (the grocerylist exercise)

      if (
        this.x + this.radius >= leftX &&
        this.x + this.radius <= rightX &&
        (this.y + this.radius >= topY && this.y - this.radius <= bottomY)
      ) {
        this.vx *= -1;
        this.ping.play();
        //  this.vx = -this.vx   this is the same as line above. just in a different way
      }
    } else {
      let paddle = player1.coordinates(
        player1.x,
        player1.y,
        player1.width,
        player1.height
      );
      let [leftX, rightX, topY, bottomY] = paddle; //these two lines are the object destructuring stuff (the grocerylist exercise)

      if (
        this.x - this.radius >= leftX &&
        this.x - this.radius <= rightX &&
        (this.y + this.radius >= topY && this.y - this.radius <= bottomY)
      ) {
        this.vx *= -1;
        this.ping.play();
        //  this.vx = -this.vx   this is the same as line above. just in a different way
      }
    }
  }

  goal(player) {
    player.score++;
    this.reset();
    console.log(player.score);
  }

  render(svg, player1, player2) {
    const rightGoal = this.x + this.radius >= this.boardWidth;
    const leftGoal = this.x - this.radius <= 0;

    if (rightGoal) {
      this.goal(player1);
      this.direction = -1;
    } else if (leftGoal) {
      this.goal(player2);
      this.direction = -1;
      console.log('hi');
    }

    // this.vx += this.ax;
    // this.vy += this.ay;

    this.x += this.vx;
    this.y += this.vy;

    this.wallCollision();
    this.paddleCollision(player1, player2);
    const ball = document.createElementNS(SVG_NS, 'circle');
    ball.setAttributeNS(null, 'cx', this.x);
    ball.setAttributeNS(null, 'cy', this.y);
    ball.setAttributeNS(null, 'r', this.radius);
    ball.setAttributeNS(null, 'fill', this.color);
    svg.appendChild(ball);
  }
}
