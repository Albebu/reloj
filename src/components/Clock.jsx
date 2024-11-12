import React, { useState, useEffect, useRef } from 'react';

const Clock = () => {
    const [actualDate, setActualDate] = useState(new Date());

    // Actualizar la hora actual cada segundo
    useEffect(() => {
        const interval = setInterval(() => {
            setActualDate(new Date());
        }, 1000);
        return () => clearInterval(interval); // Limpiar el intervalo al desmontar
    }, []);

    // Variables de formato de fecha y hora
    const date = actualDate.getDate().toString().padStart(2, '0');
    const month = (actualDate.getMonth() + 1).toString().padStart(2, '0');
    const year = actualDate.getFullYear().toString().padStart(2, '0');
    const simplifiedYear = actualDate.getFullYear().toString().slice(-2);
    const hours = actualDate.getHours().toString().padStart(2, '0');
    const minutes = actualDate.getMinutes().toString().padStart(2, '0');
    const seconds = actualDate.getSeconds().toString().padStart(2, '0');
    const amPm = actualDate.getHours() >= 12 ? 'PM' : 'AM';
    const hours12 = (actualDate.getHours() % 12 || 12).toString().padStart(2, '0');

    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const radius = canvas.height / 2;

        // Guardar el estado inicial y traducir el origen una vez
        ctx.save();
        ctx.translate(radius, radius);
        const clockRadius = radius * 0.90;

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
            ctx.fillStyle = 'white';
            ctx.fill();
            ctx.strokeStyle = '#333';
            ctx.lineWidth = radius * 0.05;
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(0, 0, radius * 0.05, 0, 2 * Math.PI);
            ctx.fillStyle = '#333';
            ctx.fill();
            ctx.restore();
        };

        const drawNumbers = (ctx, radius) => {
            ctx.save();
            ctx.font = `${radius * 0.15}px Arial`;
            ctx.textBaseline = 'middle';
            ctx.textAlign = 'center';
            for (let num = 1; num <= 12; num++) {
                const ang = num * Math.PI / 6;
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
            hour = (hour * Math.PI / 6) +
                   (minute * Math.PI / (6 * 60)) +
                   (second * Math.PI / (360 * 60));
            drawHand(ctx, hour, radius * 0.5, radius * 0.07);
            // Minuto
            minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
            drawHand(ctx, minute, radius * 0.8, radius * 0.07);
            // Segundo
            second = (second * Math.PI / 30);
            drawHand(ctx, second, radius * 0.9, radius * 0.02, 'red');
            ctx.restore();
        };

        const drawHand = (ctx, pos, length, width, color = '#333') => {
            ctx.save();
            ctx.beginPath();
            ctx.lineWidth = width;
            ctx.lineCap = 'round';
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
            <h1>Reloj</h1>
            <h2>{date}/{month}/{year}</h2>
            <h2>{date} - {month} - {year}</h2>
            <h2>{date} - {month} - {simplifiedYear}</h2>
            <h4>24h</h4>
            <h2>{hours}:{minutes}:{seconds}</h2>
            <h4>12h</h4>
            <h2>{hours12}:{minutes}:{seconds} {amPm}</h2>
            <canvas ref={canvasRef} width={400} height={400}></canvas>
        </div>
    );
};

export default Clock;