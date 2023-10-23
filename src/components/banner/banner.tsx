import React, { FC } from "react";
import "./banner.css";

interface IBanner {
    handleBannerClick: () => void
}

const Banner: FC<IBanner> = ({handleBannerClick}) => {
  const handleClick = () => {
    handleBannerClick()
  };
  
  return (
    <div className="banner">
      <p className="banner__subtitle">
        ИСПОЛНИТЕ МЕЧТУ ВАШЕГО МАЛЫША!
        <br />
        ПОДАРИТЕ ЕМУ СОБАКУ!
      </p>
      <div className="banner__barcode"></div>
      <p className="banner__text">Сканируйте QR-код или нажмите ОК</p>
      <button
        type="button"
        className="banner__button"
        onClick={handleClick}
      >
        ОК
      </button>
    </div>
  );
};
export default Banner;
