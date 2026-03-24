import { useEffect, useState } from "react";

interface CountryFlagValidatorProps {
    password: string;
}

const countries = [
    "AD","AE","AF","AG","AI","AL","AM","AO","AQ","AR","AS","AT","AU","AW","AX","AZ",
    "BA","BB","BD","BE","BF","BG","BH","BI","BJ","BL","BM","BN","BO","BQ","BR","BS",
    "BT","BV","BW","BY","BZ","CA","CC","CD","CF","CG","CH","CI","CK","CL","CM","CN",
    "CO","CR","CU","CV","CW","CX","CY","CZ","DE","DJ","DK","DM","DO","DZ","EC","EE",
    "EG","EH","ER","ES","ET","FI","FJ","FK","FM","FO","FR","GA","GB","GD","GE","GF",
    "GG","GH","GI","GL","GM","GN","GP","GQ","GR","GS","GT","GU","GW","GY","HK","HM",
    "HN","HR","HT","HU","ID","IE","IL","IM","IN","IO","IQ","IR","IS","IT","JE","JM",
    "JO","JP","KE","KG","KH","KI","KM","KN","KP","KR","KW","KY","KZ","LA","LB","LC",
    "LI","LK","LR","LS","LT","LU","LV","LY","MA","MC","MD","ME","MF","MG","MH","MK",
    "ML","MM","MN","MO","MP","MQ","MR","MS","MT","MU","MV","MW","MX","MY","MZ","NA",
    "NC","NE","NF","NG","NI","NL","NO","NP","NR","NU","NZ","OM","PA","PE","PF","PG",
    "PH","PK","PL","PM","PN","PR","PS","PT","PW","PY","QA","RE","RO","RS","RU","RW",
    "SA","SB","SC","SD","SE","SG","SH","SI","SJ","SK","SL","SM","SN","SO","SR","SS",
    "ST","SV","SX","SY","SZ","TC","TD","TF","TG","TH","TJ","TK","TL","TM","TN","TO",
    "TR","TT","TV","TW","TZ","UA","UG","UM","US","UY","UZ","VA","VC","VE","VG","VI",
    "VN","VU","WF","WS","YE","YT","ZA","ZM","ZW"
];

export default function CountryFlagValidator({ password }: CountryFlagValidatorProps) {
    const [selectedCountry, setSelectedCountry] = useState("");
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        const randomCountry =
            countries[Math.floor(Math.random() * countries.length)];
        setSelectedCountry(randomCountry);
    }, []);

    useEffect(() => {
        if (!selectedCountry) return;

        const passwordUpper = password.toUpperCase();
        const countryUpper = selectedCountry.toUpperCase();

        setIsValid(passwordUpper.includes(countryUpper));
    }, [password, selectedCountry]);

    if (!selectedCountry) {
        return <p>Načítám vlajku...</p>;
    }

    return (
        <div style={{ marginTop: "15px" }}>

            <img
                src={`https://flagsapi.com/${selectedCountry}/flat/64.png`}
                alt={`Vlajka ${selectedCountry}`}
                style={{ marginBottom: "10px" }}
            />

            {isValid ? (
                <p style={{ color: "green" }}>
                    Heslo obsahuje zkratku země.
                </p>
            ) : (
                <p style={{ color: "red" }}>
                    Heslo neobsahuje zkratku země.
                </p>
            )}
        </div>
    );
}