import React, { useEffect, useRef } from 'react';

const Confetti: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  let retina = window.devicePixelRatio;

  const PI = Math.PI;
  const sqrt = Math.sqrt;
  const round = Math.round;
  const random = Math.random;
  const cos = Math.cos;
  const sin = Math.sin;

  const speed = 50;
  const duration = 1.0 / speed;
  const confettiRibbonCount = 11;
  const ribbonPaperCount = 30;
  const ribbonPaperDist = 8.0;
  const ribbonPaperThick = 8.0;
  const confettiPaperCount = 95;
  const DEG_TO_RAD = PI / 180;
  const colors = [
    ["#df0049", "#660671"],
    ["#00e857", "#005291"],
    ["#2bebbc", "#05798a"],
    ["#ffd200", "#b06c00"]
  ];

  class Vector2 {
    x: number;
    y: number;

    constructor(_x: number, _y: number) {
      this.x = _x;
      this.y = _y;
    }

    Length() {
      return sqrt(this.SqrLength());
    }

    SqrLength() {
      return this.x * this.x + this.y * this.y;
    }

    Add(_vec: Vector2) {
      this.x += _vec.x;
      this.y += _vec.y;
    }

    Sub(_vec: Vector2) {
      this.x -= _vec.x;
      this.y -= _vec.y;
    }

    Div(_f: number) {
      this.x /= _f;
      this.y /= _f;
    }

    Mul(_f: number) {
      this.x *= _f;
      this.y *= _f;
    }

    Normalize() {
      const sqrLen = this.SqrLength();
      if (sqrLen !== 0) {
        const factor = 1.0 / sqrt(sqrLen);
        this.x *= factor;
        this.y *= factor;
      }
    }
  }

  class ConfettiPaper {
    pos: Vector2;
    rotationSpeed: number;
    angle: number;
    rotation: number;
    cosA: number;
    size: number;
    oscillationSpeed: number;
    xSpeed: number;
    ySpeed: number;
    corners: Vector2[];
    time: number;
    frontColor: string;
    backColor: string;

    static bounds: Vector2 = new Vector2(0, 0);

    constructor(_x: number, _y: number) {
      this.pos = new Vector2(_x, _y);
      this.rotationSpeed = random() * 600 + 800;
      this.angle = DEG_TO_RAD * random() * 360;
      this.rotation = DEG_TO_RAD * random() * 360;
      this.cosA = 1.0;
      this.size = 5.0;
      this.oscillationSpeed = random() * 1.5 + 0.5;
      this.xSpeed = 40.0;
      this.ySpeed = random() * 60 + 50.0;
      this.corners = [];
      this.time = random();
      const ci = round(random() * (colors.length - 1));
      this.frontColor = colors[ci][0];
      this.backColor = colors[ci][1];
      for (let i = 0; i < 4; i++) {
        const dx = cos(this.angle + DEG_TO_RAD * (i * 90 + 45));
        const dy = sin(this.angle + DEG_TO_RAD * (i * 90 + 45));
        this.corners[i] = new Vector2(dx, dy);
      }
    }

    Update(_dt: number) {
      this.time += _dt;
      this.rotation += this.rotationSpeed * _dt;
      this.cosA = cos(DEG_TO_RAD * this.rotation);
      this.pos.x += cos(this.time * this.oscillationSpeed) * this.xSpeed * _dt;
      this.pos.y += this.ySpeed * _dt;
      if (this.pos.y > ConfettiPaper.bounds.y) {
        this.pos.x = random() * ConfettiPaper.bounds.x;
        this.pos.y = 0;
      }
    }

    Draw(_g: CanvasRenderingContext2D) {
      _g.fillStyle = this.cosA > 0 ? this.frontColor : this.backColor;
      _g.beginPath();
      _g.moveTo(
        (this.pos.x + this.corners[0].x * this.size) * retina,
        (this.pos.y + this.corners[0].y * this.size * this.cosA) * retina
      );
      for (let i = 1; i < 4; i++) {
        _g.lineTo(
          (this.pos.x + this.corners[i].x * this.size) * retina,
          (this.pos.y + this.corners[i].y * this.size * this.cosA) * retina
        );
      }
      _g.closePath();
      _g.fill();
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const confettiPapers: ConfettiPaper[] = [];
    ConfettiPaper.bounds = new Vector2(canvas.width / retina, canvas.height / retina);
    for (let i = 0; i < confettiPaperCount; i++) {
      confettiPapers.push(new ConfettiPaper(random() * canvas.width, random() * canvas.height));
    }

    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = canvas.parentElement?.offsetWidth! * retina;
      canvas.height = canvas.parentElement?.offsetHeight! * retina;
      ConfettiPaper.bounds = new Vector2(canvas.width / retina, canvas.height / retina);
    };

    const updateCanvas = () => {
      if (!context) return;
      context.clearRect(0, 0, canvas.width, canvas.height);
      confettiPapers.forEach((paper) => {
        paper.Update(duration);
        paper.Draw(context);
      });
      requestAnimationFrame(updateCanvas);
    };

    resizeCanvas();
    updateCanvas();

    window.addEventListener('resize', resizeCanvas);
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} id="confetti" style={{ width: '100%', height: '100%' }} />;
};

export default Confetti;
