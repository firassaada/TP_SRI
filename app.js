const express = require("express");
const fs = require("fs");
const path = require("path");
const { computeTFIDF, executeSearch, retrieveDocuments } = require("./processing");

const server = express();
server.use(express.json());
const SERVER_PORT = 3000;

const docsDirectory = path.join(__dirname, "documents");
const indexFilePath = path.join(__dirname, "inverted_index.json");

if (!fs.existsSync(docsDirectory)) {
  fs.mkdirSync(docsDirectory);
}

server.post("/search", (request, response) => {
  const { query: searchQuery } = request.body;
  if (!searchQuery) {
    response.status(400).send("Query parameter 'q' is required.");
    return;
  }

  let tfidfIndex;
  const documents = retrieveDocuments(docsDirectory);

  if (fs.existsSync(indexFilePath)) {
    const fileContent = fs.readFileSync(indexFilePath, "utf-8");
    tfidfIndex = JSON.parse(fileContent);
  } else {
    if (documents.length === 0) {
      response
        .status(400)
        .send("No documents found. Add some .txt files to the documents folder.");
      return;
    }

    tfidfIndex = computeTFIDF(documents);
    fs.writeFileSync(indexFilePath, JSON.stringify(tfidfIndex, null, 2), "utf-8");
  }
  const searchResults = executeSearch(searchQuery, tfidfIndex);
  const formattedResults = searchResults.map(result => ({
    id: result.id + 1,
    score: result.score.toFixed(4),
    snippet: documents[result.id].substring(0, 200),
  }));

  response.json(formattedResults);
});

if (!fs.existsSync(indexFilePath)) {
  const documents = retrieveDocuments(docsDirectory);
  console.log("Loaded documents:", documents);
  if (documents.length === 0) {
    console.error("No documents found. Add some .txt files to the documents folder.");
    process.exit(1);
  }

  console.log("Generating TF-IDF index...");
  const tfidfIndex = computeTFIDF(documents);
  fs.writeFileSync(indexFilePath, JSON.stringify(tfidfIndex, null, 2), "utf-8");
}

server.listen(SERVER_PORT, () => {
  console.log(`Search API is live at http://localhost:${SERVER_PORT}`);
});
