// @ts-nocheck
"use client";
import { useState } from "react";

type FormData = {
  age: number;
  bp: number;
  sg: number;
  al: number;
  su: number;
  rbc: string;
  pc: string;
  pcc: string;
  ba: string;
  bgr: number;
  bu: number;
  sc: number;
  sod: number;
  pot: number;
  hemo: number;
  pcv: number;
  wc: number;
  rc: number;
  htn: string;
  dm: string;
  cad: string;
  appet: string;
  pe: string;
  ane: string;
};


// Define the field types
const fieldTypes: Record<keyof FormData, "number" | "text"> = {
  age: "number",
  bp: "number",
  sg: "number",
  al: "number",
  su: "number",
  rbc: "text",
  pc: "text",
  pcc: "text",
  ba: "text",
  bgr: "number",
  bu: "number",
  sc: "number",
  sod: "number",
  pot: "number",
  hemo: "number",
  pcv: "number",
  wc: "number",
  rc: "number",
  htn: "text",
  dm: "text",
  cad: "text",
  appet: "text",
  pe: "text",
  ane: "text",
};

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    age: 48.0,
    bp: 80.0,
    sg: 1.02,
    al: 1.0,
    su: 0.0,
    rbc: "normal",
    pc: "normal",
    pcc: "notpresent",
    ba: "notpresent",
    bgr: 121.0,
    bu: 36.0,
    sc: 1.2,
    sod: 111.0,
    pot: 2.5,
    hemo: 15.4,
    pcv: 44,
    wc: 7800,
    rc: 5.2,
    htn: "yes",
    dm: "yes",
    cad: "no",
    appet: "good",
    pe: "no",
    ane: "no",
  });

  const [predictions, setPredictions] = useState<any>(null); // Adjust type based on your prediction data

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: fieldTypes[name as keyof FormData] === "number" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setPredictions(data);
    } catch (err) {
      console.error("failed to fetch", err);
    }
  };

  return (
    <div>
      <h1>CKD Prediction Form</h1>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div key={key}>
            <label>{key}</label>
            <input
              type={fieldTypes[key as keyof FormData]}
              name={key}
              value={fieldTypes[key as keyof FormData] === "number" ? formData[key].toString() : formData[key]} // Ensure the value is a string for input
              onChange={handleChange}
              className="text-black p-1 bg-yellow-400 border-b"
            />
          </div>
        ))}
        <button type="submit">Predict</button>
      </form>
      {predictions && (
        <div>
          <h2>Predictions:</h2>
          <ul>
            {Object.keys(predictions).map((key) => (
              <li key={key}>
                {key}: {predictions[key]}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
