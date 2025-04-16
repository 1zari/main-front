"use client";
import { useState } from "react";
import InputPay from "./PayAmount";

interface PayTypeProps {
  value: string;
  onChange: (value: string) => void;
}

const Pay_Type = ["시급", "일급", "월급"];

const PayType = ({ value, onChange }: PayTypeProps) => {
  const [payInput, setPayInput] = useState("");

  return (
    <div className="flex items-center text-gray-700 ">
      <label className="text-sm font-medium text-gray-700">급여</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="ml-8 m-1 w-18 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F8C3B] focus:border-transparent "
      >
        <option value=""></option>
        {Pay_Type.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
      <InputPay value={payInput} onChange={setPayInput} />
    </div>
  );
};

export default PayType;
