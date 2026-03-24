interface PasswordStrengthProps {
    password: string;
    locked: boolean;
    sequenceValid: boolean;
    strength: string; // <- přidáno, teď props obsahuje sílu hesla
}

export default function PasswordStrength({ password, locked, sequenceValid, strength }: PasswordStrengthProps) {
    let color = "";
    if (strength === "Slabé") color = "danger";
    else if (strength === "Střední") color = "warning";
    else if (strength === "Silné") color = "success";

    const barWidth = strength === "Slabé" ? 33 : strength === "Střední" ? 66 : 100;

    return (
        <div className="mt-4">
            <h5 className="mb-3">
                Síla hesla:
                <span className={`ms-2 text-${color}`}>
                    {strength}
                </span>
            </h5>

            {locked && (
                <div className="alert alert-danger py-2">
                    ⚠️ Heslo bylo zadáno příliš rychle
                </div>
            )}

            <div className="progress mb-3" style={{ height: "10px" }}>
                <div
                    className="progress-bar"
                    role="progressbar"
                    style={{
                        width: `${barWidth}%`,
                        backgroundColor: "var(--primary-color)",
                        transition: "width 0.5s ease-in-out"
                    }}
                />
            </div>

            <ul className="list-group">
                <li className={`list-group-item ${password.length >= 8 ? "text-success" : "text-danger"}`}>
                    {password.length >= 8 ? "✔" : "✖"} Minimálně 8 znaků
                </li>

                <li className={`list-group-item ${/[A-Z]/.test(password) ? "text-success" : "text-danger"}`}>
                    {/[A-Z]/.test(password) ? "✔" : "✖"} Minimálně jedno velké písmeno
                </li>

                <li className={`list-group-item ${/\d/.test(password) ? "text-success" : "text-danger"}`}>
                    {/\d/.test(password) ? "✔" : "✖"} Minimálně jedno číslo
                </li>

                <li className={`list-group-item ${/[^A-Za-z0-9]/.test(password) ? "text-success" : "text-danger"}`}>
                    {/[^A-Za-z0-9]/.test(password) ? "✔" : "✖"} Minimálně jeden speciální znak
                </li>

                <li className={`list-group-item ${sequenceValid ? "text-success" : "text-danger"}`}>
                    {sequenceValid ? "✔" : "✖"} Sekvence znaků
                </li>
            </ul>
        </div>
    );
}