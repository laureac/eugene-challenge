const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    alignItems: "center",
  },
  cardsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "1rem",
  },
  card: {
    padding: "1rem",
    border: "1px grey solid",
  },
  highlight: {
    backgroundColor: "yellow",
  },
  button: {
    border: "none",
    width: "10rem",
    height: "3rem",
    background: "black",
    color: "white",
    fontWeight: "600",
    margin: "1rem 0 1rem auto",
    cursor: "pointer",
  },
};
export default styles;
