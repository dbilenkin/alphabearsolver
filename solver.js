function solve() {
  const mustLetters = document.getElementById("mustLetters").value.toUpperCase();
  const otherLetters = document.getElementById("otherLetters").value.toUpperCase();
  const minLength = +document.getElementById("minLength").value || mustLetters.length;

  const solution$ = document.getElementById("solution");


  let solutions = [];
  for (let i = 0; i < words.length; i++) {
    if (words[i].length < minLength) continue;
    let mustMatched = 0;
    let otherMatched = 0;
    let wordLetters = words[i];
    let mustLetterArr = mustLetters.split("");
    while (mustLetterArr.length) {
      let letter = mustLetterArr.splice(0, 1);
      let index = wordLetters.indexOf(letter);
      if (index !== -1) {
        mustMatched++;
        wordLetters = wordLetters.slice(0, index) + wordLetters.slice(index + 1);
      }
    }

    let otherLetterArr = otherLetters.split("");
    while (otherLetterArr.length && wordLetters.length) {
      let letter = otherLetterArr.splice(0, 1);
      let index = wordLetters.indexOf(letter);
      if (index !== -1) {
        otherMatched++;
        wordLetters = wordLetters.slice(0, index) + wordLetters.slice(index + 1);
      }
    }
    if ((mustMatched + otherMatched) === words[i].length) {
      solutions.push({ word: words[i], score: mustMatched * 10 + words[i].length });
    }
  }

  solutions.sort((w1, w2) => w2.score - w1.score).forEach(word => {
    solution$.innerHTML += `
    <div>${word.word}</div>
    `;
  })
  
}