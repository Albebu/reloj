import { useEffect, useRef } from "react";

export const Clock = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const radius = canvas.height / 2;

    // Guardar el estado inicial y traducir el origen una vez
    ctx.save();
    ctx.translate(radius, radius);
    const clockRadius = radius * 0.9;

    const drawClock = () => {
      ctx.clearRect(-radius, -radius, canvas.width, canvas.height);
      drawFace(ctx, clockRadius);
      drawNumbers(ctx, clockRadius);
      drawTime(ctx, clockRadius);
    };

    const drawFace = (ctx, radius) => {
      ctx.save();
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, 2 * Math.PI);
      ctx.fillStyle = "white";
      ctx.fill();
      ctx.strokeStyle = "#333";
      ctx.lineWidth = radius * 0.05;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, 0, radius * 0.05, 0, 2 * Math.PI);
      ctx.fillStyle = "#333";
      ctx.fill();
      ctx.restore();
    };

    const drawNumbers = (ctx, radius) => {
      ctx.save();
      ctx.font = `${radius * 0.15}px Arial`;
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      for (let num = 1; num <= 12; num++) {
        const ang = (num * Math.PI) / 6;
        ctx.rotate(ang);
        ctx.translate(0, -radius * 0.85);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius * 0.85);
        ctx.rotate(-ang);
      }
      ctx.restore();
    };

    const drawTime = (ctx, radius) => {
      ctx.save();
      const now = new Date();
      let hour = now.getHours();
      let minute = now.getMinutes();
      let second = now.getSeconds();
      // Hora
      hour = hour % 12;
      hour =
        (hour * Math.PI) / 6 +
        (minute * Math.PI) / (6 * 60) +
        (second * Math.PI) / (360 * 60);
      drawHand(ctx, hour, radius * 0.5, radius * 0.07);
      // Minuto
      minute = (minute * Math.PI) / 30 + (second * Math.PI) / (30 * 60);
      drawHand(ctx, minute, radius * 0.8, radius * 0.07);
      // Segundo
      second = (second * Math.PI) / 30;
      drawHand(ctx, second, radius * 0.9, radius * 0.02, "red");
      ctx.restore();
    };

    const drawHand = (ctx, pos, length, width, color = "#333") => {
      ctx.save();
      ctx.beginPath();
      ctx.lineWidth = width;
      ctx.lineCap = "round";
      ctx.strokeStyle = color;
      ctx.rotate(pos);
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -length);
      ctx.stroke();
      ctx.rotate(-pos);
      ctx.restore();
    };

    drawClock();
    const interval = setInterval(drawClock, 1000); // Redibuja cada segundo
    return () => {
      clearInterval(interval); // Limpiar al desmontar
      ctx.restore(); // Restaurar estado inicial
    };
  }, []); // Ejecuta solo al montar el componente

  return (
    <div>
      <canvas ref={canvasRef} width={450} height={450}></canvas>
    </div>
  );
};
