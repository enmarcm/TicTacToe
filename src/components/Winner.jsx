const Winner = ({ winner, reiniciar }) => {
  if (winner === null) return;
  const winnerText = winner ? `Ganó ${winner}` : "Empate";

  return (
    <section className="winner">
      <h2>
        {winnerText}
        <button onClick={reiniciar}>Reiniciar</button>
      </h2>
    </section>
  );
};

export default Winner;
