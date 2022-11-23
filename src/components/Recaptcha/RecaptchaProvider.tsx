import React from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

interface Props {
  children?: React.ReactNode;
}

const ReCaptchaProvider = ({ children }: Props) => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={import.meta.env.VITE_RECAPTCHA_PUBLIC} language="fr">
      {children}
    </GoogleReCaptchaProvider>
  );
};

export default ReCaptchaProvider;
