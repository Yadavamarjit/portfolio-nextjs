// BM25 Implementation in JavaScript with metadata
export function bm25(query: string, documents: string[], k1 = 1.5, b = 0.75) {
  const avgDocLength =
    documents.reduce((sum, doc) => sum + doc.split(" ").length, 0) /
    documents.length;

  // Helper function: Calculate IDF for a term
  function idf(term: string) {
    const docCount = documents.length;
    const docWithTermCount = documents.filter((doc) =>
      doc.includes(term)
    ).length;
    return Math.log(
      (docCount - docWithTermCount + 0.5) / (docWithTermCount + 0.5) + 1.0
    );
  }

  // Helper function: Calculate term frequency in a document
  function termFrequency(doc: string, term: string) {
    const terms = doc.split(" ");
    const count = terms.filter((t) => t === term).length;
    return count;
  }

  // Main BM25 scoring
  const scores = documents.map((doc, index) => {
    const score = query.split(" ").reduce((score, queryTerm) => {
      const tf = termFrequency(doc, queryTerm);
      const idfValue = idf(queryTerm);
      const docLength = doc.split(" ").length;
      return (
        score +
        idfValue *
          ((tf * (k1 + 1)) /
            (tf + k1 * (1 - b + b * (docLength / avgDocLength))))
      );
    }, 0);

    // Return both score and metadata (document text here)
    return {
      score: score,
      document: doc,
      documentId: index, // Include an ID for each document (or use another identifier)
    };
  });

  return scores;
}
