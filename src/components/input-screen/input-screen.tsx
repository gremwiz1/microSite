import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./input-screen.css";

const InputScreen: React.FC = () => {
  const [number, setNumber] = useState<string>("");
  const [agreed, setAgreed] = useState<boolean>(false);

  const BACKSPACE = "BACKSPACE";

  const handleKeyClick = (
    value: number | string,
    event?: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (value === BACKSPACE) {
      setActiveButton(BACKSPACE);
    } else {
      setActiveButton(value);
    }
    if (value === BACKSPACE && number) {
      setNumber((prev) => prev.slice(0, -1));
    } else if (typeof value === "number" && number.length < 10) {
      setNumber((prev) => prev + value);
    }
  };

  const formatNumber = (input: string): string => {
    const numbers = input.replace(/\D/g, "").split("");
    const mask = "+7(___)-___-__-__";

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
    resetInactivityTimer();

    window.addEventListener("mousemove", resetInactivityTimer);
    window.addEventListener("keypress", resetInactivityTimer);
    window.addEventListener("click", resetInactivityTimer);

    return () => {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }

      window.removeEventListener("mousemove", resetInactivityTimer);
      window.removeEventListener("keypress", resetInactivityTimer);
      window.removeEventListener("click", resetInactivityTimer);
    };
  }, []);

  const [activeButton, setActiveButton] = useState<number | string>("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowRight":
          if (typeof activeButton === "number" && activeButton <= 9) {
            setActiveButton((prev) => {
              if (typeof prev === "number") {
                if (prev < 9) return prev + 1;
                else {
                  return BACKSPACE;
                }
              }
              return prev;
            });
          } else if (activeButton === BACKSPACE) {
            setActiveButton(0);
          } else if (activeButton === "") {
            setActiveButton(1);
          }
          break;
        case "ArrowLeft":
          if (typeof activeButton === "number" && activeButton >= 0) {
            setActiveButton((prev) => {
              if (typeof prev === "number") {
                if (activeButton >= 1) return prev - 1; else {
                  setActiveButton(BACKSPACE)
                }
              }
              return prev;
            });
          } else {
            if (activeButton === BACKSPACE) {
              setActiveButton(9);
            }
          }
          break;
        case "ArrowDown":
          // Логика для перемещения вниз (если есть другие ряды кнопок)
          break;
        case "ArrowUp":
          // Логика для перемещения вверх
          break;
        case "Enter":
          if (typeof activeButton === "number") {
            handleKeyClick(activeButton);
          } else if (activeButton === BACKSPACE) {
            handleKeyClick(BACKSPACE);
          } else if (activeButton === "CONFIRM") {
            // Логика для кнопки подтверждения
          }
          break;
        case BACKSPACE:
          handleKeyClick(BACKSPACE);
          break;
        // ... другие клавиши (цифры и т.д.)
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeButton]);

  // При изменении активной кнопки устанавливаем на ней фокус
  useEffect(() => {
    if (typeof activeButton === "number") {
      const buttonElement = document.querySelector<HTMLButtonElement>(
        `.button[data-key="${activeButton}"]`
      );
      buttonElement?.focus();
    } else if (activeButton === BACKSPACE) {
      const buttonElement =
        document.querySelector<HTMLButtonElement>(".erase-button");
      buttonElement?.focus();
    } else if (activeButton === "CONFIRM") {
      // Установка фокуса на кнопке подтверждения
    }
  }, [activeButton]);

  return (
    <div>
      <input type="text" value={formatNumber(number)} readOnly />
      <div className="buttons-container">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            className={`button number-button ${
              activeButton === num ? "active" : ""
            }`}
            key={num}
            data-key={num}
            onClick={(event) => handleKeyClick(num, event)}
          >
            {num}
          </button>
        ))}
        <button
          className={`button erase-button ${
            activeButton === BACKSPACE ? "active" : ""
          }`}
          onClick={(event) => handleKeyClick(BACKSPACE, event)}
        >
          Стереть
        </button>
        <button
          className={`button number-button ${
            activeButton === 0 ? "active" : ""
          }`}
          data-key={0}
          onClick={(event) => handleKeyClick(0, event)}
        >
          0
        </button>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={agreed}
            onChange={() => setAgreed((prev) => !prev)}
          />
          Согласие на обработку персональных данных
        </label>
      </div>
      <button disabled={!agreed || number.length < 10}>
        Подтвердить номер
      </button>
    </div>
  );
};

export default InputScreen;
