import { useState } from "react";

interface PasswordInputProps {
    password: string;
    setPassword: (password: string) => void;
}

export default function PasswordInput({ password, setPassword }: PasswordInputProps) {

    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="mb-3">

            <label className="form-label">
                Zadejte heslo
            </label>

            <div className="input-group">

                <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    placeholder="Např. Abc123!"
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                />

                <button
                    type="button"
                    className="btn"
                    style={{
                        backgroundColor: "var(--btn-bg)",
                        color: "var(--btn-text)"
                    }}
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? "Skrýt" : "Zobrazit"}
                </button>

            </div>

        </div>
    );
}