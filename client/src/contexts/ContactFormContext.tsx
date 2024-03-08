import React, { createContext, useContext, useState } from "react";
import { Contact } from "../components/Form";

type ContactFormState = {
  [key in Contact]?: {
    value: string | null;
    otp: string;
    otpStatus: "idle" | "invalid" | "sent" | "error";
    isFormValid: boolean;
  };
};

type ContactFormContextType = {
  contactForms: ContactFormState;
  updateContactForm: (
    contactType: Contact,
    data: { value: string | null; otp: string; isFormValid: boolean }
  ) => void;
  otpStatus: "idle" | "invalid" | "sent" | "error";
  setOtpStatus: React.Dispatch<
    React.SetStateAction<"idle" | "invalid" | "sent" | "error">
  >;
};

const ContactFormContext = createContext<ContactFormContextType | null>(null);

export const useContactFormContext = () => {
  const context = useContext(ContactFormContext);
  if (!context) {
    throw new Error(
      "useContactFormContext must be used within a ContactFormProvider"
    );
  }
  return context;
};

type ContactFormProviderProps = {
  children: React.ReactNode;
};

export const ContactFormProvider: React.FC<ContactFormProviderProps> = ({
  children,
}) => {
  const [contactForms, setContactForms] = useState<ContactFormState>({});
  const [otpStatus, setOtpStatus] = useState<
    "idle" | "invalid" | "sent" | "error"
  >("idle");

  const updateContactForm = (
    contactType: Contact,
    data: { value: string | null; otp: string; isFormValid: boolean }
  ) => {
    setContactForms((prev) => ({
      ...prev,
      [contactType]: data,
    }));
  };

  return (
    <ContactFormContext.Provider
      value={{ contactForms, updateContactForm, otpStatus, setOtpStatus }}
    >
      {children}
    </ContactFormContext.Provider>
  );
};
