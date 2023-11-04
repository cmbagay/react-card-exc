import React, { useState, useEffect } from "react";
import axios from "axios"

function DeckOfCards() {
    const [deck, setDeck] = useState(null);
    const [drawnCard, setDrawnCard] = useState([])

    useEffect(() => {
        async function newDeck() {
            const res = await axios.get(`https://deckofcardsapi.com/api/deck/new/shuffle`);
            setDeck(res.data);
        }
        return newDeck()
    }, [])

    async function drawFromDeck() {
        const deckRes = await axios.get(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/`)

        if (deckRes.data.remaining > 0) {
            const card = drawRes.data.cards[0];

            setDrawnCard(drawnDeck => [...drawnDeck,
            {
                code: card.code,
                type: `${card.suit} ${card.value}`,
                image: card.image
            }])
        }
        else {
            alert('Error: no cards remaining!');
        }
    }


    return (
        <div className="DeckOfCards">
            <button onClick={drawFromDeck}>GIB CARD</button>
            <div className="DrawnCards">{
                drawnCard.map(dk => (
                    <img className="Card" alt={dk.code} src={image} />
                ))
            }
            </div>
        </div>
    )
}

export default DeckOfCards;           