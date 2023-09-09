import React from "react";
import PlayingCard from "./PlayingCard";
import "./PlayingCardList.css";
import { useAxios, useLocalStorage } from "./hooks";

/* Renders a list of playing cards.
 * Can also add a new card at random. */
function formatPlayingCard(data) {
  // Extract only the information needed for playing cards
  const { image } = data.cards[0];
  return { id: data.id, image };
}

function CardTable() {
  const [cards, addPlayingCard, clearPlayingCards] = useAxios(
    "https://deckofcardsapi.com/api/deck",
    formatPlayingCard
  );

  const addPlayingCardAsync = async () => {
    await addPlayingCard("/new/draw/");
  };

  const handleClearPlayingCards = () => {
    clearPlayingCards();
  };

  return (
    <div className="PlayingCardList">
      <h3>Pick a card, any card!</h3>
      <div>
        <button onClick={addPlayingCardAsync}>Add a playing card!</button>
        <button onClick={handleClearPlayingCards}>
          Clear all playing cards
        </button>
      </div>
      <div className="PlayingCardList-card-area">
        {cards.map((cardData) => (
          <PlayingCard key={cardData.id} front={cardData.image} />
        ))}
      </div>
    </div>
  );
}


export default CardTable;
