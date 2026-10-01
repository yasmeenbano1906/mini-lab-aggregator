import { useState } from "react";
import "./App.css";

function App() {
  const [testName, setTestName] = useState("");
  const [pincode, setPincode] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!testName.trim() || !pincode.trim()) {
      setError("Please enter a test name and pincode.");
      return;
    }

    setLoading(true);
    setError("");
    setHasSearched(true);

    try {
      const response = await fetch(
        `http://localhost:5000/api/search?search_query=${encodeURIComponent(
          testName
        )}&pincode=${encodeURIComponent(pincode)}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong.");
      }

      setResults(data.results);
    } catch (err) {
      setError("Unable to fetch results. Please check the server.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="hero">
        <nav className="navbar container">
          <div className="brand">
            <div className="brand-icon">+</div>
            <div>
              <span className="brand-name">MediScan</span>
              <span className="brand-tagline">Healthcare comparison</span>
            </div>
          </div>

          <span className="nav-status">
            <span className="status-dot"></span>
            Compare prices easily
          </span>
        </nav>

        <div className="container hero-content">
          <p className="eyebrow">HEALTHCARE PRICE COMPARISON</p>

          <h1>
            Find the right lab test
            <span> at the right price.</span>
          </h1>

          <p className="hero-text">
            Compare diagnostic tests and health packages from available
            providers based on your pincode.
          </p>

          <form className="search-box" onSubmit={handleSearch}>
            <div className="input-group">
              <label htmlFor="testName">Test Name</label>
              <input
                id="testName"
                type="text"
                placeholder="e.g. Lipid Profile"
                value={testName}
                onChange={(e) => setTestName(e.target.value)}
                autoComplete="off"
              />
            </div>

            <div className="input-group">
              <label htmlFor="pincode">Pincode</label>
              <input
                id="pincode"
                type="text"
                inputMode="numeric"
                placeholder="e.g. 110001"
                maxLength="6"
                value={pincode}
                autoComplete="postal-code"
                onChange={(e) => setPincode(e.target.value)}
              />
            </div>

            <button type="submit" disabled={loading} aria-label="Search lab tests">
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Searching...
                </>
              ) : (
                "Search"
              )}
            </button>
          </form>
        </div>
      </header>

      <main className="container results-section">
        {error && <p className="error-message">{error}</p>}

        {results.length > 0 && (
          <>
            <div className="results-heading">
              <div>
                <p className="section-label">SEARCH RESULTS</p>
                <h2>Available options</h2>
                <p className="search-summary">
                  Showing {results.length} options for{" "}
                  <strong>“{testName}”</strong> in <strong>{pincode}</strong>
                </p>
              </div>

              <span>{results.length} results</span>
            </div>

            <div className="results-grid">
              {results.map((lab) => (
                <div className="lab-card" key={lab.id}>
                  <div className="card-top">
                    <div>
                      <p className="provider">{lab.provider_name}</p>
                      <h3>{lab.item_name}</h3>
                    </div>

                    <span className="type-badge">
                      {lab.item_type === "package"
                        ? "PACKAGE"
                        : "SINGLE TEST"}
                    </span>
                  </div>

                  {lab.item_type === "package" && (
                    <div className="included-tests">
                      <p>Includes</p>

                      <div className="tags">
                        {lab.included_tests.map((test) => (
                          <span key={test}>{test}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pricing">
                    <div>
                      <span className="mrp">
                        MRP ₹{lab.pricing.mrp.toLocaleString("en-IN")}
                      </span>

                      <strong>
                        ₹{lab.pricing.offer_price.toLocaleString("en-IN")}
                      </strong>
                    </div>

                    <div className="final-price">
                      <span>Total Final Price</span>
                      <strong>
                        ₹{lab.total_final_price.toLocaleString("en-IN")}
                      </strong>
                    </div>
                  </div>

                  <div className="card-footer">
                    <div className="card-meta">
                      <span>
                        {lab.logistics.home_collection
                          ? `+ ₹${lab.logistics.home_collection_fee} Home Collection`
                          : "No Home Collection"}
                      </span>

                      <span className="tat">
                        ⏱ Report in {lab.logistics.report_tat_hours} hours
                      </span>
                    </div>

                    {lab.nabl_accredited && (
                      <span className="nabl-badge">✓ NABL Certified</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {!loading && !error && !hasSearched && results.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">⌕</div>
            <h2>Search for a lab test</h2>
            <p>
              Enter a test name and your pincode to compare available options.
            </p>
          </div>
        )}

        {!loading && !error && hasSearched && results.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">⌕</div>
            <h2>No results found</h2>
            <p>
              We couldn't find any matching tests for this pincode. Try another test
              name or pincode.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;