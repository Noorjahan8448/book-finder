import React, { useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchBooks = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://openlibrary.org/search.json?title=${query}`
      );
      const data = await res.json();
      setBooks(data.docs);
    } catch (error) {
      console.error("Error fetching data", error);
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px",
        fontFamily: "Arial",
        backgroundColor: "#f4f6f9",
      }}
    >
      <h1>📚 Book Finder</h1>

      {/* Search Section */}
      <div>
        <input
          type="text"
          placeholder="Search books by title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            padding: "10px",
            width: "320px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={searchBooks}
          style={{
            padding: "10px 15px",
            marginLeft: "10px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          Search
        </button>
      </div>

      {/* Loading */}
      {loading && <p style={{ marginTop: "20px" }}>Loading...</p>}

      {/* Book Results */}
      <div
        style={{
          marginTop: "30px",
          width: "90%",
          maxWidth: "900px",
        }}
      >
        {books.slice(0, 20).map((book, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "#fff",
              marginBottom: "15px",
              padding: "15px",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              display: "flex",
              alignItems: "center",
              gap: "20px",
            }}
          >
            {book.cover_i ? (
              <img
                src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                alt={book.title}
                style={{ width: "90px", borderRadius: "5px" }}
              />
            ) : (
              <div
                style={{
                  width: "90px",
                  height: "130px",
                  backgroundColor: "#ddd",
                  borderRadius: "5px",
                }}
              ></div>
            )}

            <div>
              <h3 style={{ margin: "0", color: "#333" }}>{book.title}</h3>
              <p style={{ margin: "5px 0" }}>
                <strong>Author:</strong>{" "}
                {book.author_name ? book.author_name.join(", ") : "Unknown"}
              </p>
              <p style={{ margin: "5px 0" }}>
                <strong>First Published:</strong>{" "}
                {book.first_publish_year || "N/A"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
