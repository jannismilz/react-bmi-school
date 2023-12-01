import "./App.css";
import { useEffect, useState } from "react";

const data = {
    maleAges: [
        [0, 16],
        [17, 17],
        [18, 18],
        [19, 24],
        [25, 34],
        [35, 54],
        [55, 64],
        [65, 90],
    ],
    maleValues: [19, 20, 20, 21, 22, 23, 24, 25],
    femaleAges: [
        [0, 17],
        [18, 18],
        [19, 24],
        [25, 34],
        [35, 44],
        [45, 54],
        [55, 64],
        [65, 90],
    ],
    femaleValues: [19, 19, 19, 20, 21, 22, 23, 25],
};

function App() {
    const [gender, setGender] = useState("male");
    const [weight, setWeight] = useState(0);
    const [height, setHeight] = useState(0);
    const [age, setAge] = useState(0);

    const [rangeWidth, setRangeWidth] = useState(50);

    const [bmi, setBmi] = useState(null);

    function setWidthWithAgeAndGender() {
        if (gender === "male") {
            data.maleAges.forEach((ageRange, index) => {
                if (age >= ageRange[0] && age <= ageRange[1]) {
                    setRangeWidth((data.maleValues[index] / 37) * 100);
                }
            });
        } else if (gender === "female") {
            data.femaleAges.forEach((ageRange, index) => {
                if (age >= ageRange[0] && age <= ageRange[1]) {
                    setRangeWidth((data.femaleValues[index] / 37) * 100);
                }
            });
        }
    }

    useEffect(() => {
        if (gender && weight && height && age) {
            const bmi = weight / (((height / 100) * height) / 100);
            setBmi(bmi.toFixed(2));
            setWidthWithAgeAndGender();
        }
    }, [gender, weight, height, age]);

    return (
        <div className="App">
            <h1>BMI</h1>
            <div>
                <label htmlFor="gender">Ihr Geschlecht: </label>
                <input
                    type="radio"
                    name="gender"
                    value="male"
                    onChange={(e) => setGender(e.currentTarget.value)}
                    checked={gender === "male"}
                />{" "}
                Male
                <input
                    type="radio"
                    name="gender"
                    value="female"
                    onChange={(e) => setGender(e.currentTarget.value)}
                />{" "}
                Female
            </div>
            <div>
                <label htmlFor="weight">Ihr Gewicht (kg): </label>
                <input
                    name="weight"
                    type="number"
                    placeholder="weight"
                    onChange={(e) => setWeight(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="weight">Ihre Körpergrösse (cm): </label>
                <input
                    type="number"
                    placeholder="height"
                    onChange={(e) => setHeight(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="weight">Ihr Alter: </label>
                <input
                    type="number"
                    placeholder="age"
                    onChange={(e) => setAge(e.currentTarget.value)}
                />
                <span> {age > 90 && "Please only enter age up to 90"}</span>
            </div>
            {bmi ? (
                <div>
                    <p>BMI: {bmi}</p>
                    <input
                        className="range-background"
                        type="range"
                        min={0}
                        max={rangeWidth}
                        value={bmi}
                    />
                </div>
            ) : (
                <p>
                    <em>Please enter values to see your BMI.</em>
                </p>
            )}
        </div>
    );
}

export default App;
