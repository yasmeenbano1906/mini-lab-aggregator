const express = require("express");
const cors = require("cors");
const labs = require("./data/labs.json");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/api/search", (req, res) => {
  const { search_query, pincode } = req.query;

  if (!search_query || !pincode) {
    return res.status(400).json({
      message: "search_query and pincode are required"
    });
  }

  const query = search_query.trim().toLowerCase();
  const requestedPincode = pincode.trim();

  const results = labs
    .filter((lab) =>
      lab.available_pincodes.includes(requestedPincode)
    )
    .filter((lab) => {
      const itemNameMatches = lab.item_name
        .toLowerCase()
        .includes(query);

      const includedTestMatches = lab.included_tests.some((test) =>
        test.toLowerCase().includes(query)
      );

      return itemNameMatches || includedTestMatches;
    })
    .map((lab) => ({
      ...lab,
      total_final_price:
        lab.pricing.offer_price +
        lab.logistics.home_collection_fee
    }))
    .sort((a, b) => a.total_final_price - b.total_final_price);

  res.json({
    search_query,
    pincode: requestedPincode,
    count: results.length,
    results
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});