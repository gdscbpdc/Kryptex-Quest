function tokenize(sentence) {
  return sentence.toLowerCase().match(/\w+/g);
}

function wordFrequency(sentence) {
  let words = tokenize(sentence);
  let frequency = {};

  words.forEach((word) => {
    if (!frequency[word]) frequency[word] = 0;
    frequency[word]++;
  });

  return frequency;
}

function dotProduct(vecA, vecB) {
  let product = 0;
  for (let key in vecA) {
    if (vecB[key]) product += vecA[key] * vecB[key];
  }
  return product;
}

function magnitude(vec) {
  let sum = 0;
  for (let key in vec) {
    sum += vec[key] * vec[key];
  }
  return Math.sqrt(sum);
}

function cosineSimilarity(vecA, vecB) {
  let dotProd = dotProduct(vecA, vecB);
  let magnitudeA = magnitude(vecA);
  let magnitudeB = magnitude(vecB);

  if (magnitudeA === 0 || magnitudeB === 0) return 0;

  return dotProd / (magnitudeA * magnitudeB);
}

export default function sentenceSimilarity(sentence1, sentence2) {
  let freq1 = wordFrequency(sentence1);
  let freq2 = wordFrequency(sentence2);

  return cosineSimilarity(freq1, freq2);
}
