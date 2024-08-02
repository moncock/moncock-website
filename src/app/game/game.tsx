'use client';

import Script from 'next/script';

export default function Game() {
    const cacheBuster = Date.now(); // Cache-busting parameter
    return (
        <div>
            <div id="hud">
                <div id="score">Score: 0</div>
                <div id="timer">Time Left: 10s</div>
            </div>
            <canvas id="gameCanvas"></canvas>
            <audio id="punchSound" src="/audio/punch.mp3"></audio>
            <Script
                src={`/js/game.js?cb=${cacheBuster}`} // Cache-busting query parameter
                strategy="lazyOnload"
                onLoad={() => console.log('Script has loaded')}
            />
        </div>
    );
}
