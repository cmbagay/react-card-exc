import React, { useState, useEffect } from "react";
import axios from "axios"
import Card from "./Card.jsx";
import "./DeckOfCards.css"


function DeckOfCards() {
    const [deck, setDeck] = useState(null);
    const [drawnCard, setDrawnCard] = useState([]);
    const [shuffle, setCupidShuffle] = useState(false);
    const [showShuffleBtn, setShowShuffleBtn] = useState(false);
    //create deck
    useEffect(function newDeck() {
        async function deckAPIData() {
            const deckAPI = await axios.get(`https://deckofcardsapi.com/api/deck/new/shuffle/`)
            setDeck(deckAPI.data);
        }
        deckAPIData();
    }, [])

    //draw card
    async function drawCardFromDeck() {
        try {
            const cardAPI = await axios.get(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/`)
            console.log(cardAPI.data);

            if (cardAPI.data.remaining === 0) throw new Error("this deck em pty YEEEET.");

            const cardData = cardAPI.data.cards[0];
            console.log(cardData.image);

            setDrawnCard(sdc => [
                ...sdc,
                {
                    key: cardData.code,
                    image: cardData.image
                }
            ])
        } catch (err) {
            alert(err);
            setShowShuffleBtn(true);
        }
    }

    //shuffle deck
    async function shuffleDeck() {
        setCupidShuffle(true);
        try {
            await axios.get(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/shuffle/`);
            setShowShuffleBtn(false);

        } catch (err) {
            alert(err);

        } finally {
            setCupidShuffle(false);
            setDrawnCard([])
        }
    }



    return (
        <div className="DeckOfCards">
            {!showShuffleBtn && <button className="Card-gibber" onClick={drawCardFromDeck} disabled={shuffle}>GIB CARD</button>}
            {showShuffleBtn && <button className="Cupid-shuffler" onClick={shuffleDeck} disabled={shuffle}> NOW DO THE CUPID SHUFFLE</button >}

            <div className="Drawn-Card">
                {drawnCard.map(dc =>
                    <Card key={dc.key} image={dc.image} />
                )}
            </div>
        </div>
    )
}

export default DeckOfCards;           