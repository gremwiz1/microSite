import React, { FC } from 'react';
import './right-panel.css';
import { useNavigate } from 'react-router-dom';

const RightPanel: FC = () => {
    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate('/');
    }
    return (
        <div className="right-panel">
            <button type="button" className="button-close" onClick={handleClick}></button>
            <div className="right-panel__barcode">
                <p className="right-panel__text">Сканируйте QR-код ДЛЯ ПОЛУЧЕНИЯ ДОПОЛНИТЕЛЬНОЙ ИНФОРМАЦИИ</p>
                <div className="right-panel__image"></div>
            </div>

        </div>

    )
}
export default RightPanel;