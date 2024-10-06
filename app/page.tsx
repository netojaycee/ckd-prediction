"use client";
import React, { useState } from "react";

// Define an interface for the form data structure
interface CKDFormData {
  age?: number;
  bp?: number;
  sg?: number;
  al?: number | string;
  su?: number | string;
  rbc?: "normal" | "abnormal";
  pc?: "normal" | "abnormal";
  pcc?: "present" | "notpresent";
  ba?: "present" | "notpresent";
  bgr?: "present" | "notpresent";
  bu?: number;
  sc?: number;
  sod?: number;
  pot?: number;
  hemo?: number;
  pcv?: number;
  wc?: number;
  rc?: number;
  htn?: "yes" | "no";
  dm?: "yes" | "no";
  cad?: "yes" | "no";
  appet?: "poor" | "good";
  pe?: "yes" | "no";
  ane?: "yes" | "no";
}

const CKDForm = () => {
  const [predictions, setPredictions] = useState<string | null>("");
  const [formData, setFormData] = useState<CKDFormData>({});

  // Function to map the formData to the desired format
  const mapData = (data: CKDFormData) => {
    return [
      data.age, // age
      data.bp, // bp
      data.sg, // sg (assuming you want to convert this)
      data.al === "present" ? 1 : 0, // al (1 if present, 0 if not)
      data.su === "present" ? 1 : 0, // su (1 if present, 0 if not)
      data.bgr === "present" ? 1 : 0, // bgr (1 if present, 0 if not)
      data.bu, // bu
      data.sc, // sc
      data.sod, // sod
      data.pot, // pot
      data.hemo, // hemo
      data.pcv, // pcv
      data.wc, // wc
      data.rc, // rc
      data.rbc === "abnormal" ? 1 : 0, // rbc (1 if abnormal, 0 if normal)
      data.pc === "normal" ? 0 : 1, // pc (1 if normal, 0 if not)
      data.pcc === "notpresent" ? 0 : 1, // pcc (1 if present, 0 if not)
      data.ba === "notpresent" ? 0 : 1, // ba (1 if present, 0 if not)
      data.htn === "yes" ? 1 : 0, // htn (1 if yes, 0 if no)
      data.dm === "yes" ? 1 : 0, // dm (1 if yes, 0 if no)
      data.cad === "yes" ? 1 : 0, // cad (1 if yes, 0 if no)
      data.appet === "poor" ? 0 : 1, // appet (1 if poor, 0 if good)
      data.pe === "yes" ? 1 : 0, // pe (1 if yes, 0 if no)
      data.ane === "yes" ? 1 : 0, // ane (1 if yes, 0 if no)
    ];
  };

  const transformedData = {
    data: mapData(formData),
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "number" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(transformedData);
    try {
      // const res = await fetch("http://localhost:5000/predict", {

      const res = await fetch("http://ckd-pred.duckdns.org/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transformedData),
      });
      console.log("res", res, transformedData);
      const data = await res.json();
      console.log(data.result);
      if (data.result === "0") {
        setPredictions("0");
      } else if (data.result === "1") {
        setPredictions("1");
      }
      console.log(predictions);
    } catch (err) {
      console.error("failed to fetch", err);
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-blue-200 p-6 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-6 text-blue-600">
          CKD Prediction Form
        </h2>

        {!predictions && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
              {/* Render form fields */}
              <div>
                <label className="block text-blue-600 mb-1 capitalize">
                  Age:
                </label>
                <input
                  className="text-black w-full p-2 border rounded-md border-blue-300 focus:border-blue-500"
                  type="number"
                  name="age"
                  value={formData.age || ""}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-blue-600 mb-1 capitalize">
                  BP:
                </label>
                <input
                  className="text-black w-full p-2 border rounded-md border-blue-300 focus:border-blue-500"
                  type="number"
                  name="bp"
                  value={formData.bp || ""}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-blue-600 mb-1 capitalize">
                  SG:
                </label>
                <input
                  className="text-black w-full p-2 border rounded-md border-blue-300 focus:border-blue-500"
                  type="number"
                  step="0.01"
                  name="sg"
                  value={formData.sg || ""}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-blue-600 mb-1 capitalize">
                  AL:
                </label>
                <input
                  className="text-black w-full p-2 border rounded-md border-blue-300 focus:border-blue-500"
                  type="number"
                  name="al"
                  value={formData.al || ""}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-blue-600 mb-1 capitalize">
                  SU:
                </label>
                <input
                  className="text-black w-full p-2 border rounded-md border-blue-300 focus:border-blue-500"
                  type="number"
                  name="su"
                  value={formData.su || ""}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-blue-600 mb-1 capitalize">
                  RBC:
                </label>
                <select
                  className="text-black w-full p-2 border rounded-md border-blue-300 focus:border-blue-500"
                  name="rbc"
                  value={formData.rbc}
                  onChange={handleChange}
                >
                  <option value="normal">Normal</option>
                  <option value="abnormal">Abnormal</option>
                </select>
              </div>
              <div>
                <label className="block text-blue-600 mb-1 capitalize">
                  PC:
                </label>
                <select
                  className="text-black w-full p-2 border rounded-md border-blue-300 focus:border-blue-500"
                  name="pc"
                  value={formData.pc}
                  onChange={handleChange}
                >
                  <option value="normal">Normal</option>
                  <option value="abnormal">Abnormal</option>
                </select>
              </div>
              <div>
                <label className="block text-blue-600 mb-1 capitalize">
                  PCC:
                </label>
                <select
                  className="text-black w-full p-2 border rounded-md border-blue-300 focus:border-blue-500"
                  name="pcc"
                  value={formData.pcc}
                  onChange={handleChange}
                >
                  <option value="notpresent">Not Present</option>
                  <option value="present">Present</option>
                </select>
              </div>
              <div>
                <label className="block text-blue-600 mb-1 capitalize">
                  BA:
                </label>
                <select
                  className="text-black w-full p-2 border rounded-md border-blue-300 focus:border-blue-500"
                  name="ba"
                  value={formData.ba}
                  onChange={handleChange}
                >
                  <option value="notpresent">Not Present</option>
                  <option value="present">Present</option>
                </select>
              </div>
              <div>
                <label className="block text-blue-600 mb-1 capitalize">
                  BGR:
                </label>
                <input
                  className="text-black w-full p-2 border rounded-md border-blue-300 focus:border-blue-500"
                  type="number"
                  name="bgr"
                  value={formData.bgr || ""}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-blue-600 mb-1 capitalize">
                  BU:
                </label>
                <input
                  className="text-black w-full p-2 border rounded-md border-blue-300 focus:border-blue-500"
                  type="number"
                  name="bu"
                  value={formData.bu || ""}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-blue-600 mb-1 capitalize">
                  SC:
                </label>
                <input
                  className="text-black w-full p-2 border rounded-md border-blue-300 focus:border-blue-500"
                  type="number"
                  name="sc"
                  value={formData.sc || ""}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-blue-600 mb-1 capitalize">
                  SOD:
                </label>
                <input
                  className="text-black w-full p-2 border rounded-md border-blue-300 focus:border-blue-500"
                  type="number"
                  name="sod"
                  value={formData.sod || ""}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-blue-600 mb-1 capitalize">
                  POT:
                </label>
                <input
                  className="text-black w-full p-2 border rounded-md border-blue-300 focus:border-blue-500"
                  type="number"
                  name="pot"
                  value={formData.pot || ""}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-blue-600 mb-1 capitalize">
                  HEMO:
                </label>
                <input
                  className="text-black w-full p-2 border rounded-md border-blue-300 focus:border-blue-500"
                  type="number"
                  name="hemo"
                  value={formData.hemo || ""}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-blue-600 mb-1 capitalize">
                  PCV:
                </label>
                <input
                  className="text-black w-full p-2 border rounded-md border-blue-300 focus:border-blue-500"
                  type="number"
                  name="pcv"
                  value={formData.pcv || ""}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-blue-600 mb-1 capitalize">
                  WC:
                </label>
                <input
                  className="text-black w-full p-2 border rounded-md border-blue-300 focus:border-blue-500"
                  type="number"
                  name="wc"
                  value={formData.wc || ""}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-blue-600 mb-1 capitalize">
                  RC:
                </label>
                <input
                  className="text-black w-full p-2 border rounded-md border-blue-300 focus:border-blue-500"
                  type="number"
                  name="rc"
                  value={formData.rc || ""}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-blue-600 mb-1 capitalize">
                  HTN:
                </label>
                <select
                  className="text-black w-full p-2 border rounded-md border-blue-300 focus:border-blue-500"
                  name="htn"
                  value={formData.htn}
                  onChange={handleChange}
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div>
                <label className="block text-blue-600 mb-1 capitalize">
                  DM:
                </label>
                <select
                  className="text-black w-full p-2 border rounded-md border-blue-300 focus:border-blue-500"
                  name="dm"
                  value={formData.dm}
                  onChange={handleChange}
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div>
                <label className="block text-blue-600 mb-1 capitalize">
                  CAD:
                </label>
                <select
                  className="text-black w-full p-2 border rounded-md border-blue-300 focus:border-blue-500"
                  name="cad"
                  value={formData.cad}
                  onChange={handleChange}
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div>
                <label className="block text-blue-600 mb-1 capitalize">
                  Appet:
                </label>
                <select
                  className="text-black w-full p-2 border rounded-md border-blue-300 focus:border-blue-500"
                  name="appet"
                  value={formData.appet}
                  onChange={handleChange}
                >
                  <option value="good">Good</option>
                  <option value="poor">Poor</option>
                </select>
              </div>
              <div>
                <label className="block text-blue-600 mb-1 capitalize">
                  PE:
                </label>
                <select
                  className="text-black w-full p-2 border rounded-md border-blue-300 focus:border-blue-500"
                  name="pe"
                  value={formData.pe}
                  onChange={handleChange}
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div>
                <label className="block text-blue-600 mb-1 capitalize">
                  Ane:
                </label>
                <select
                  className="text-black w-full p-2 border rounded-md border-blue-300 focus:border-blue-500"
                  name="ane"
                  value={formData.ane}
                  onChange={handleChange}
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              // onClick={setPredictions("0")}
              className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              Submit
            </button>
          </form>
        )}
        {predictions && (
          <div className="mt-6 p-4 bg-green-100 text-green-700 rounded-md ">
            <div
              onClick={() => setPredictions(null)}
              className="cursor-pointer flex justify-end w-full"
            >
              X
            </div>
            <h3 className="text-lg font-bold">Prediction Result</h3>
            <p>
              {predictions === "1"
                ? `You have Chronic Kidney Disease (CKD).${predictions}`
                : predictions === "0"
                ? `You do not have Chronic Kidney Disease (CKD).${predictions}`
                : "Unknown"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CKDForm;
