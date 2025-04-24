"use client";
import { useEffect, useState, JSX } from "react";
import Personal from "@/assets/terms/PersonalTerms";
import Location from "@/assets/terms/LocationServiceTerms";
import Privacy from "@/assets/terms/PrivacyPolicyTerms";

type TermsItem = {
  id: string;
  label: string;
  Component: () => JSX.Element;
};

type Props = {
  onAllAgreedChange?: (agreed: boolean) => void;
};

const termsList: TermsItem[] = [
  { id: "personal", label: "개인회원 이용약관", Component: Personal },
  { id: "Privacy", label: "개인정보 처리방침", Component: Privacy },
  { id: "location", label: "위치기반 서비스 이용약관", Component: Location },
];

export default function UserTermsAgreement({ onAllAgreedChange }: Props) {
  const [agreements, setAgreements] = useState<Record<string, boolean>>(
    Object.fromEntries(termsList.map(({ id }) => [id, false])),
  );
  const [openId, setOpenId] = useState<string | null>(null);

  const allChecked = termsList.every(({ id }) => agreements[id]);

  useEffect(() => {
    onAllAgreedChange?.(allChecked);
  }, [allChecked, onAllAgreedChange]);

  const toggleAll = (checked: boolean) => {
    const updated = Object.fromEntries(termsList.map(({ id }) => [id, checked]));
    setAgreements(updated);
  };

  const toggleOne = (id: string, checked: boolean) => {
    setAgreements((prev) => ({ ...prev, [id]: checked }));
  };

  return (
    <div className="w-full mt-6 space-y-4">
      <div className="border-b pb-4">
        <label className="flex items-center space-x-2 font-semibold text-base sm:text-lg">
          <input
            type="checkbox"
            checked={allChecked}
            onChange={(e) => toggleAll(e.target.checked)}
            className="w-6 h-6 accent-primary"
          />
          <span>전체동의</span>
        </label>
      </div>

      <div className="space-y-2">
        {termsList.map(({ id, label, Component }) => {
          const isOpen = openId === id;
          return (
            <div key={id} className="pb-3 last:border-none transition-all duration-300">
              <div className="flex items-start justify-between py-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={agreements[id] ?? false}
                    onChange={(e) => toggleOne(id, e.target.checked)}
                    className="w-6 h-6 accent-primary"
                  />
                  <span className="font-medium">(필수) {label}</span>
                </label>
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : id)}
                  className="text-primary hover:underline"
                >
                  {isOpen ? "내용닫기" : "내용보기"}
                </button>
              </div>

              {isOpen && (
                <div className="mt-2 p-4 bg-gray-50 rounded border max-h-[300px] overflow-y-auto text-gray-700 whitespace-pre-line">
                  <Component />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
