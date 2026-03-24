import { useEffect, useState } from "react";

interface PasswordTimerProps {
    password: string;
    setLocked: (locked: boolean) => void;
}

export default function PasswordTimer({ password, setLocked }: PasswordTimerProps) {
    const [startTime, setStartTime] = useState<number | null>(null);
    const [elapsed, setElapsed] = useState(0);

    useEffect(() => {
        if (password.length > 0 && startTime === null) {
            setStartTime(Date.now());
        }
    }, [password, startTime]);

    useEffect(() => {
        if (!startTime) return;

        const interval = setInterval(() => {
            const seconds = Math.floor((Date.now() - startTime) / 1000);
            setElapsed(seconds);
            setLocked(seconds < 5);
        }, 100);

        return () => clearInterval(interval);
    }, [startTime, setLocked]);

    return (
        <div style={{ marginTop: "10px" }}>
            <p>⏱️ Čas psaní hesla: {elapsed} s {elapsed < 5 && "⚠️ Příliš rychlé zadání!"}</p>
        </div>
    );
}