import React, { FormEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./input-screen.css";
import RightPanel from "../right-panel/right-panel";
import KeyboardTelephone from "../keyboard-telephone/keyboard-telephone";
import { validateTelephoneNumber } from "../../utils/api/api-validate-telephone";

const InputScreen: React.FC = () => {
  const [number, setNumber] = useState<string>("");
  const [isValidationTelephoneNumber, setIsValidationTelephoneNumber] =
    React.useState(true);
  const [agreed, setAgreed] = useState<boolean>(false);

  const formatNumber = (input: string): string => {
    const numbers = input.replace(/\D/g, "").split("");
    const mask = "+7(___)___-__-__";

    let formatted = mask;
    numbers.forEach((number) => {
      formatted = formatted.replace("_", number);
    });

    return formatted;
  };

  const navigate = useNavigate();
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  const resetInactivityTimer = () => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }

    inactivityTimerRef.current = setTimeout(() => {
      navigate("/");
    }, 10000);
  };

  useEffect(() => {
    if(isValidationTelephoneNumber === false && number.length < 10) {
      setIsValidationTelephoneNumber(true)
    }
  }, [number])
  
  useEffect(() => {
    resetInactivityTimer();

    window.addEventListener("mousemove", resetInactivityTimer);
    window.addEventListener("keydown", resetInactivityTimer);
    window.addEventListener("click", resetInactivityTimer);

    return () => {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }

      window.removeEventListener("mousemove", resetInactivityTimer);
      window.removeEventListener("keydown", resetInactivityTimer);
      window.removeEventListener("click", resetInactivityTimer);
    };
  }, []);

  const submitForm = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if(agreed && number.length === 10) {
      validateTelephoneNumber(number)
            .then((result) => {
                setIsValidationTelephoneNumber(result.valid);
                if(result.valid) {
                  navigate('/finish');
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }
  };

  return (
    <div className="input-screen">
      <form className="panels" onSubmit={submitForm}>
        <h2 className="panels__title">Введите ваш номер мобильного телефона</h2>
        <input
          type="text"
          value={formatNumber(number)}
          readOnly
          className={
            isValidationTelephoneNumber
              ? "panels__number-telephone"
              : "panels__number-telephone panels__number-telephone_invalid"
          }
        />
        <p className="panels__text">
          и с Вами свяжется наш менеждер для дальнейшей консультации
        </p>
        <KeyboardTelephone
          number={number}
          setNumber={setNumber}
          isValidationTelephoneNumber={isValidationTelephoneNumber}
          agreed={agreed}
          setAgreed={setAgreed}
        />
      </form>
      <RightPanel />
    </div>
  );
};

export default InputScreen;
