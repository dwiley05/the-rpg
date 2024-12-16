import React, { useEffect, useRef } from "react";
import Phaser from "phaser";
import { config } from '../phaser/config';

const Game: React.FC = () => {
  const gameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gameRef.current) {
      const game = new Phaser.Game(config);

      return () => {
        game.destroy(true); // Clean up Phaser on component unmount
      };
    }
  }, []);

  return <div ref={gameRef}/>;
};

export default Game;
