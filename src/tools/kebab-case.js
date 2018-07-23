const space = {
  " ": true,
  "\t": true,
  "\n": true
};

const upper = {
  "A": true,
  "B": true,
  "C": true,
  "D": true,
  "E": true,
  "F": true,
  "G": true,
  "H": true,
  "I": true,
  "J": true,
  "K": true,
  "L": true,
  "M": true,
  "N": true,
  "O": true,
  "P": true,
  "Q": true,
  "R": true,
  "S": true,
  "T": true,
  "U": true,
  "V": true,
  "W": true,
  "X": true,
  "Y": true,
  "Z": true,
};

const lower = {
  "a": true,
  "b": true,
  "c": true,
  "d": true,
  "e": true,
  "f": true,
  "g": true,
  "h": true,
  "i": true,
  "j": true,
  "k": true,
  "l": true,
  "m": true,
  "n": true,
  "o": true,
  "p": true,
  "q": true,
  "r": true,
  "s": true,
  "t": true,
  "u": true,
  "v": true,
  "w": true,
  "x": true,
  "y": true,
  "z": true,
};

const number = {
  "0": true,
  "1": true,
  "2": true,
  "3": true,
  "4": true,
  "5": true,
  "6": true,
  "7": true,
  "8": true,
  "9": true,
};

export function kebabCase(str) {
  let kebabbed = "";
  let i = -1;
  const n = str.length;
  while (++i < n) {
    if (upper[str[i]]) {
      kebabbed += (i > 0 && !space[str[i - 1]] ? "-" : "") + str[i].toLowerCase();
    } else if (lower[str[i]] || number[str[i]] || str[i] === "-") {
      kebabbed += str[i];
    } else if (space[str[i]] && !space[str[i - 1]]) {
      kebabbed += "-";
    }
  }
  return kebabbed;
}