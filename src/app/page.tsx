export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "40px",
      }}
    >
      <section
        style={{
          width: "100%",
          maxWidth: "900px",
          background: "#fff",
          border: "1px solid #dedbd3",
          borderRadius: "24px",
          padding: "56px",
        }}
      >
        <div
          style={{
            fontSize: "12px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#6f716c",
            marginBottom: "18px",
          }}
        >
          Gyandhara One
        </div>

        <h1
          style={{
            fontSize: "56px",
            lineHeight: 1.05,
            margin: 0,
            maxWidth: "720px",
          }}
        >
          Ritu's Second Brain
        </h1>

        <p
          style={{
            fontSize: "20px",
            lineHeight: 1.6,
            color: "#6f716c",
            marginTop: "24px",
            maxWidth: "680px",
          }}
        >
          One connected operating layer for understanding, running and thinking
          about Gyandhara.
        </p>

        <div
          style={{
            marginTop: "32px",
            padding: "20px 24px",
            background: "#f6f4ef",
            borderRadius: "16px",
            color: "#1f4f3b",
            fontWeight: 600,
          }}
        >
          Cluster 0 - Foundation running
        </div>
      </section>
    </main>
  );
}