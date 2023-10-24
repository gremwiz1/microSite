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
  isValidationTelephoneNumber: boolean
}
const KeyboardTelephone: FC<IKeyboardTelephone> = ({ number, setNumber, isValidationTelephoneNumber }) => {
  const [activeButton, setActiveButton] = useState<number | string>("");
  const BACKSPACE = "BACKSPACE";
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const [enterPressed, setEnterPressed] = useState(false);
  const [agreed, setAgreed] = useState<boolean>(false);

  useEffect(() => {
    if (typeof activeButton === "number") {
      buttonsRef.current[activeButton]?.focus();
    } else if (activeButton === BACKSPACE) {
      buttonsRef.current[-1]?.focus();
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
                if (activeButton >= 1) return prev - 1;
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
          // Логика для перемещения вниз (если есть другие ряды кнопок)
          break;
        case "ArrowUp":
          // Логика для перемещения вверх
          break;
        case "Enter":
          setEnterPressed(true);
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

  return (
    <>
    <div className="keyboard">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
        <button
          className={`keyboard__button ${activeButton === num ? "active" : ""}`}
          type="button"
          key={num}
          onClick={(event) => handleKeyClick(num, event)}
          ref={(el) => (buttonsRef.current[num] = el)}
        >
          {num}
        </button>
      ))}
      <button
        className="keyboard__button keyboard__button_erase"
        type="reset"
        onClick={(event) => handleKeyClick(BACKSPACE, event)}
        ref={(el) => (buttonsRef.current[-1] = el)}
      >
        СТЕРЕТЬ
      </button>
      <button
        className={`keyboard__button ${activeButton === 0 ? "active" : ""}`}
        data-key={0}
        onClick={(event) => handleKeyClick(0, event)}
        ref={(el) => (buttonsRef.current[0] = el)}
      >
        0
      </button>
    </div>
    {isValidationTelephoneNumber ?
        <div className="panels__agreement">
            <label className="checkbox">
                <input type="checkbox" className="checkbox_invisible" name="checkbox"/>
                <div className={agreed ? "checkbox_visible checkbox_checked" : "checkbox_visible"} onClick={() =>setAgreed((prev) => !prev)}></div>
            </label>
            <p className="checkbox__text">Согласие на обработку персональных данных</p>
        </div>
        :
        <p className="panels__invalid-text">НЕВЕРНО ВВЕДЕН НОМЕР</p>}

    <button type="submit" className="panels__button" disabled={!agreed || number.length < 10}>ПОДТВЕРДИТЬ НОМЕР</button>
    </>
  );
};
export default KeyboardTelephone;

