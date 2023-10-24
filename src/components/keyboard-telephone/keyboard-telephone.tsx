import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import "./keyboard-telephone.css";

interface IKeyboardTelephone {
  number: string;
  setNumber: Dispatch<SetStateAction<string>>;
  isValidationTelephoneNumber: boolean;
}
const KeyboardTelephone: FC<IKeyboardTelephone> = ({
  number,
  setNumber,
  isValidationTelephoneNumber,
}) => {
  const [activeButton, setActiveButton] = useState<number | string>("");
  const BACKSPACE = "BACKSPACE";
  const AGREED = "AGREED";
  const CONFIRM = "CONFIRM";
  const indexButtonBackSpace = -1;
  const indexButtonAgreed = -2;
  const indexButtonConfirm = -3;
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const [enterPressed, setEnterPressed] = useState(false);
  const [agreed, setAgreed] = useState<boolean>(false);

  useEffect(() => {
    if (typeof activeButton === "number") {
      buttonsRef.current[activeButton]?.focus();
    } else if (activeButton === BACKSPACE) {
      buttonsRef.current[indexButtonBackSpace]?.focus();
    } else if (activeButton === AGREED) {
      buttonsRef.current[indexButtonAgreed]?.focus();
    } else if (activeButton === CONFIRM) {
      buttonsRef.current[indexButtonConfirm]?.focus();
    }
  }, [activeButton]);

  const handleKeyClick = (
    value: number | string,
    event?: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (enterPressed) {
      setEnterPressed(false);
      return;
    }
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowRight":
          if (typeof activeButton === "number" && activeButton <= 9) {
            setActiveButton((prev) => {
              if (typeof prev === "number") {
                if (prev === 0) return AGREED;
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
                if (activeButton === 1) return CONFIRM;
                if (activeButton > 1) return prev - 1;
                else {
                  setActiveButton(BACKSPACE);
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
          if (typeof activeButton === "number" && activeButton <= 6) {
            if (activeButton === 0) {
              setActiveButton(AGREED);
            } else {
              setActiveButton((prev) => {
                if (typeof prev === "number") {
                  return prev + 3;
                }
                return prev;
              });
            }
          }
          if (typeof activeButton === "number" && activeButton > 6) {
            if (activeButton === 9) {
              setActiveButton(0);
            } else {
              setActiveButton(BACKSPACE);
            }
          }
          if (activeButton === BACKSPACE) {
            setActiveButton(AGREED);
          }
          if (activeButton === AGREED) {
            setActiveButton(CONFIRM);
          }
          if (activeButton === CONFIRM) {
            setActiveButton(1);
          }
          break;
        case "ArrowUp":
          if (typeof activeButton === "number" && activeButton > 3) {
            setActiveButton((prev) => {
              if (typeof prev === "number") {
                return prev - 3;
              }
              return prev;
            });
          }
          if (typeof activeButton === "number" && activeButton <= 3) {
            if (activeButton === 0) {
              setActiveButton(9);
            } else {
              setActiveButton(CONFIRM);
            }
          }
          if (activeButton === CONFIRM) {
            setActiveButton(AGREED);
          }
          if (activeButton === AGREED) {
            setActiveButton(BACKSPACE);
          }
          if (activeButton === BACKSPACE) {
            setActiveButton(7);
          }
          break;
        case "Enter":
          setEnterPressed(true);
          if (typeof activeButton === "number") {
            handleKeyClick(activeButton);
          } else if (activeButton === BACKSPACE) {
            handleKeyClick(BACKSPACE);
          } else if (activeButton === CONFIRM) {
            // Логика для кнопки подтверждения
          } else if (activeButton === AGREED) {
            setAgreed((prev) => !prev);
          }
          break;
        case "Backspace":
          handleKeyClick(BACKSPACE);
          break;
        case "0":
          handleKeyClick(0);
          break;
        case "1":
          handleKeyClick(1);
          break;
        case "2":
          handleKeyClick(2);
          break;
        case "3":
          handleKeyClick(3);
          break;
        case "4":
          handleKeyClick(4);
          break;
        case "5":
          handleKeyClick(5);
          break;
        case "6":
          handleKeyClick(6);
          break;
        case "7":
          handleKeyClick(7);
          break;
        case "8":
          handleKeyClick(8);
          break;
        case "9":
          handleKeyClick(9);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeButton]);

  return (
    <>
      <div className="keyboard">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            className={`keyboard__button ${
              activeButton === num ? "active" : ""
            }`}
            type="button"
            key={num}
            onClick={(event) => handleKeyClick(num, event)}
            ref={(el) => (buttonsRef.current[num] = el)}
          >
            {num}
          </button>
        ))}
        <button
          className={`keyboard__button keyboard__button_erase ${
            activeButton === BACKSPACE ? "active" : ""
          }`}
          type="button"
          onClick={(event) => handleKeyClick(BACKSPACE, event)}
          ref={(el) => (buttonsRef.current[indexButtonBackSpace] = el)}
        >
          СТЕРЕТЬ
        </button>
        <button
          className={`keyboard__button ${activeButton === 0 ? "active" : ""}`}
          type="button"
          data-key={0}
          onClick={(event) => handleKeyClick(0, event)}
          ref={(el) => (buttonsRef.current[0] = el)}
        >
          0
        </button>
      </div>
      {isValidationTelephoneNumber ? (
        <div className="panels__agreement">
          <label className="checkbox">
            <input
              type="checkbox"
              className="checkbox_invisible"
              name="checkbox"
              checked={agreed}
            />
            <button
              className={
                agreed
                  ? "checkbox_visible checkbox_checked"
                  : "checkbox_visible"
              }
              type="button"
              onClick={() => {
                setActiveButton(AGREED);
                if (enterPressed) {
                  setEnterPressed(false);
                  return;
                }
                setAgreed((prev) => !prev);
                // Триггерим изменение состояния для input checkbox
                const checkbox = buttonsRef.current[indexButtonAgreed]
                  ?.previousElementSibling as HTMLInputElement;
                if (checkbox) {
                  checkbox.checked = !checkbox.checked;
                }
              }}
              ref={(el) => (buttonsRef.current[indexButtonAgreed] = el)}
            ></button>
          </label>
          <p className="checkbox__text">
            Согласие на обработку персональных данных
          </p>
        </div>
      ) : (
        <p className="panels__invalid-text">НЕВЕРНО ВВЕДЕН НОМЕР</p>
      )}

      <button
        type="submit"
        className={`panels__button ${
          agreed && number.length === 10 ? 'active' : 'inactive'
        }`}
        ref={(el) => (buttonsRef.current[indexButtonConfirm] = el)}
      >
        ПОДТВЕРДИТЬ НОМЕР
      </button>
    </>
  );
};
export default KeyboardTelephone;
