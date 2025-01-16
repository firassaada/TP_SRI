const fs = require("fs");
const path = require("path");
const stopWords = require("stopword");
const nlp = require("compromise");

function cleanText(inputText) {
  let document = nlp(inputText);
  document = document.normalize();
  document = document.nouns().toSingular();
  document = document.sentences().toPastTense();

  const lemmatized = document.text();
  let tokens = lemmatized.split(/\W+/);
  tokens = stopWords.removeStopwords(tokens);

  return tokens;
}

function computeTFIDF(documents) {
  const termFrequency = {};
  const inverseDocFrequency = {};
  const totalDocuments = documents.length;

  documents.forEach((content, docIndex) => {
    const tokens = cleanText(content);
    termFrequency[docIndex] = {};

    const uniqueTokens = new Set(tokens);

    tokens.forEach((term) => {
      termFrequency[docIndex][term] = (termFrequency[docIndex][term] || 0) + 1;
    });

    uniqueTokens.forEach((term) => {
      inverseDocFrequency[term] = (inverseDocFrequency[term] || 0) + 1;
    });
  });

  for (const term in inverseDocFrequency) {
    inverseDocFrequency[term] = Math.log(totalDocuments / inverseDocFrequency[term]);
  }

  const tfidfScores = {};
  documents.forEach((_, docIndex) => {
    for (const term in termFrequency[docIndex]) {
      if (!tfidfScores[term]) {
        tfidfScores[term] = {};
      }
      tfidfScores[term][docIndex] = termFrequency[docIndex][term] * inverseDocFrequency[term];
    }
  });

  return tfidfScores;
}

function calculateCosineSimilarity(vecA, vecB) {
  const dotProduct = Object.keys(vecA).reduce((sum, key) => sum + vecA[key] * (vecB[key] || 0), 0);

  const magnitudeA = Math.sqrt(Object.values(vecA).reduce((sum, value) => sum + value * value, 0));
  const magnitudeB = Math.sqrt(Object.values(vecB).reduce((sum, value) => sum + value * value, 0));

  return magnitudeA && magnitudeB ? dotProduct / (magnitudeA * magnitudeB) : 0;
}

function executeSearch(query, tfidfIndex) {
  const queryTokens = cleanText(query);
  const queryVector = {};

  queryTokens.forEach((term) => {
    queryVector[term] = (queryVector[term] || 0) + 1;
  });

  const documentScores = {};

  for (const term in queryVector) {
    if (tfidfIndex[term]) {
      for (const docId in tfidfIndex[term]) {
        const termWeight = queryVector[term] * tfidfIndex[term][docId];
        documentScores[docId] = (documentScores[docId] || 0) + termWeight;
      }
    }
  }

  return Object.entries(documentScores)
    .map(([docId, score]) => ({ id: parseInt(docId, 10), score }))
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score);
}

function retrieveDocuments(directoryPath) {
  const fileContents = [];
  const filenames = fs.readdirSync(directoryPath);

  filenames.forEach((filename) => {
    const fullPath = path.join(directoryPath, filename);
    if (fs.statSync(fullPath).isFile() && path.extname(filename) === ".txt") {
      const content = fs.readFileSync(fullPath, "utf-8");
      fileContents.push(content);
    }
  });

  return fileContents;
}

module.exports = {
  cleanText,
  computeTFIDF,
  calculateCosineSimilarity,
  executeSearch,
  retrieveDocuments,
};
