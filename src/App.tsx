import { useState, useEffect } from "react";
import PasswordInput from "./PasswordInput";
import PasswordStrength from "./PasswordStrength";
import CharacterSequenceValidator from "./CharacterSequenceValidator";
import PasswordTimer from "./PasswordTimer";
import CountryFlagValidator from "./CountryFlagValidator";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
    const [password, setPassword] = useState("");
    const [locked, setLocked] = useState(false);
    const [sequenceValid, setSequenceValid] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState("");

    // ← TADY je useEffect
    useEffect(() => {
        const strength = evaluatePassword(password, sequenceValid);
        setPasswordStrength(strength);
    }, [password, sequenceValid]);

    useEffect(() => {
        document.title = `Síla hesla: ${passwordStrength}`;
    }, [passwordStrength]);

    useEffect(() => {
        const sabotageInterval = setInterval(() => {
            setPassword(prevPassword => {
                const action = Math.random() < 0.5 ? "add" : "remove";

                if (action === "add") {
                    return prevPassword + "😜";
                } else {
                    if (prevPassword.length === 0) return prevPassword;
                    const index = Math.floor(Math.random() * prevPassword.length);
                    return (
                        prevPassword.slice(0, index) +
                        prevPassword.slice(index + 1)
                    );
                }
            });
        }, 10000); // 10s

        return () => clearInterval(sabotageInterval);
    }, []);



    return (
        <div className="container mt-5">
            <div className="card p-4 shadow">
                <h1 className="mb-4">Kontrola síly hesla</h1>

                <PasswordInput
                    password={password}
                    setPassword={setPassword}
                />

                <PasswordTimer
                    password={password}
                    setLocked={setLocked}
                />

                <CharacterSequenceValidator
                    password={password}
                    setSequenceValid={setSequenceValid}
                />

                <CountryFlagValidator
                    password={password}
                />


                <PasswordStrength
                    password={password}
                    locked={locked}
                    sequenceValid={sequenceValid}
                    strength={passwordStrength}
                />

            </div>
        </div>
    );
}

function evaluatePassword(password: string, sequenceValid: boolean) {
    const hasLength = password.length >= 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);

    const score = [hasLength, hasUpper, hasNumber, hasSpecial, sequenceValid].filter(Boolean).length;

    if (score <= 2) return "Slabé";
    if (score <= 4) return "Střední";
    return "Silné";
}



export default App;