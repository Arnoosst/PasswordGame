import { useEffect } from "react";

interface CharacterSequenceValidatorProps {
    password: string;
    setSequenceValid: (valid: boolean) => void;
}

export default function CharacterSequenceValidator({ password, setSequenceValid }: CharacterSequenceValidatorProps) {

    const requiredSequence = "malé → velké → číslo → speciální znak";

    const regex = /[a-z].*[A-Z].*\d.*[!@#$%^&*\-={}_+;:'",<.>/?|()]/;

    const valid = regex.test(password);

    useEffect(() => {
        setSequenceValid(valid);
    }, [valid, setSequenceValid]);

    return (
        <div className="mt-2">
            <p className="mb-1">Požadovaná sekvence: {requiredSequence}</p>
        </div>
    );
}