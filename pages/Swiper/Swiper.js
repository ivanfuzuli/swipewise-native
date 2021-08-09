import React, { useState } from "react";
import { Container } from "native-base";

import Quotes from "./components/Quotes";
import Loading from "./components/Loading";

const quotes = [
  {
    id: "2",
    author: " Frank Zappa ",
    book: null,
    age: 21,
    desc: "So many books, so little time.",
  },
  {
    id: "1",
    author: "Oscar Wilde",
    book: null,
    desc: "Be yourself; everyone else is already taken.",
  },
  {
    id: "3",
    author: "Jack London",
    book: "Merhabalar Ya Erenler",
    desc: "The highest function of love is that it makes the loved one a unique and irreplaceable being.",
  },
  {
    id: "3",
    author: "Tom Robbins",
    book: "Geldim  İşte",
    desc: "When we're incomplete, we're always searching for somebody to complete us. When, after a few years or a few months of a relationship, we find that we're still unfulfilled, we blame our partners and take up with somebody more promising. This can go on and on--series polygamy--until we admit that while a partner can add sweet dimensions to our lives, we, each of us, are responsible for our own fulfillment. Nobody else can provide it for us, and to believe otherwise is to delude ourselves dangerously and to program for eventual failure every relationship we enter.",
  },
  {
    author: "Michelle Facoult",
    desc: "Normal insan kurgudur.",
    book: "Deliliğe Övgü",
  },
  {
    id: "4",
    author: "Alvin Toffler",
    desc: "When two people meet and fall in love, there's a sudden rush of magic. Magic is just naturally present then. We tend to feed on that gratuitous magic without striving to make any more. One day we wake up and find that the magic is gone. We hustle to get it back, but by then it's usually too late, we've used it up. What we have to do is work like hell at making additional magic right from the start. It's hard work, but if we can remember to do it, we greatly improve our chances of making love stay",
    book: "Gelecek Bilim",
  },
];

export default function App({ navigation }) {
  const [isLoading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 3000);

  return (
    <Container>
      {isLoading && <Loading />}
      {!isLoading && <Quotes {...{ navigation, quotes }} />}
    </Container>
  );
}
