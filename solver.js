let mustLetters, otherLetters, minLength, solution, solutions;

function updateStatus(status) {
  setTimeout(() => {
    document.getElementById("status").innerHTML = status.toPrecision(4) + "%";
  }, 0);
}

function solve1000(i) {
  let iters = i + 1000;
  for (; i < iters && i < words.length; i++) {
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
        wordLetters =
          wordLetters.slice(0, index) + wordLetters.slice(index + 1);
      }
    }

    let otherLetterArr = otherLetters.split("");
    while (otherLetterArr.length && wordLetters.length) {
      let letter = otherLetterArr.splice(0, 1);
      let index = wordLetters.indexOf(letter);
      if (index !== -1) {
        otherMatched++;
        wordLetters =
          wordLetters.slice(0, index) + wordLetters.slice(index + 1);
      } else {
        // break;
      }
    }
    if (mustMatched + otherMatched === words[i].length) {
      solutions.push({
        word: words[i],
        score: mustMatched * 10 + words[i].length
      });
    }
  }
  if (i === words.length) {
    showSolutions();
  }
}

function solve() {
  mustLetters = document.getElementById("mustLetters").value.toUpperCase();
  otherLetters = document.getElementById("otherLetters").value.toUpperCase();
  minLength = +document.getElementById("minLength").value || mustLetters.length;

  solution = document.getElementById("solution");
  solution.innerHTML = "";

  solutions = [];
  for (let i = 0; i < words.length; i += 1000) {
    updateStatus((100 * i) / words.length);
    setTimeout(() => {
      solve1000(i);
    }, 0);
  }
}

function showSolutions() {
  solutions
    .sort((w1, w2) => w2.score - w1.score);

  for (let i = 0; i < 10; i++) {
    solution.innerHTML += `
    <div>${solutions[i].word}: ${solutions[i].score}</div>
    `;
  }
}
