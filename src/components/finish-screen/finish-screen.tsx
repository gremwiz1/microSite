import { FC } from "react";
import RightPanel from "../right-panel/right-panel";
import './finish-screen.css';

const FinishScreen: FC = () => {
  return (
    <div className="finish">
      <div className="panels">
        <h2 className="panels__response">ЗАЯВКА ПРИНЯТА</h2>
        <p className="panels__text">
          Держите телефон под рукой.
          <br /> Скоро с Вами свяжется наш менеджер.
        </p>
      </div>
      <RightPanel />
    </div>
  );
};
export default FinishScreen;
