// pages/qr-game.jsx

import React from 'react';
import QRGame from '../../components/QRgame/QRGame';

const QRGamePage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen ">
            <h1 className="text-3xl font-bold mb-8">QR Code Puzzle</h1>
            <QRGame />
        </div>
    );
};

export default QRGamePage;