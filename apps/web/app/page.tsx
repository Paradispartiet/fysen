export default function HomePage() {
  return (
    <main className="shell">
      <section className="hero" aria-labelledby="fysen-title">
        <p className="brand">fysen.</p>
        <h1 id="fysen-title">Hva har du lyst på?</h1>
        <p className="lede">Søk på retten. Finn restauranter som faktisk har den på menyen nå.</p>
        <form className="search" role="search" action="/search">
          <label className="srOnly" htmlFor="dish-query">Retten du vil spise</label>
          <input id="dish-query" name="q" type="search" placeholder="Biff tartar, ramen, carbonara …" autoComplete="off" />
          <button type="submit">Finn retten</button>
        </form>
        <p className="proof">Treffene skal være ferske og sporbare tilbake til restaurantens meny.</p>
      </section>
    </main>
  );
}
