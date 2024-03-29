export type Options = {
  letter?:
    | boolean
    | {
        uppercase?: boolean;
        lowercase?: boolean;
      };
  number?: boolean;
  specialCharacter?:
    | boolean
    | {
        // Typographic Symbols
        tilde?: boolean;
        backtick?: boolean;
        exclamation?: boolean;
        at?: boolean;
        hash?: boolean;
        dollar?: boolean;
        percent?: boolean;
        caret?: boolean;
        ampersand?: boolean;
        asterisk?: boolean;
        hyphen?: boolean;
        underscore?: boolean;
        forwardSlash?: boolean;
        backslash?: boolean;

        // Punctuation Marks
        pipe?: boolean;
        singleQuote?: boolean;
        doubleQuote?: boolean;
        greater?: boolean;
        less?: boolean;
        comma?: boolean;
        period?: boolean;
        colon?: boolean;
        semicolon?: boolean;
        questionMark?: boolean;

        // Grouping Symbols
        openParenthesis?: boolean;
        closeParenthesis?: boolean;
        openBrace?: boolean;
        closeBrace?: boolean;
        openBracket?: boolean;
        closeBracket?: boolean;

        // Mathematical and Logical Symbols
        plus?: boolean;
        equal?: boolean;
      };
};

export type IsCharsExist = (str: string, options: Options) => boolean;

const regexStrings: { [key: string]: string } = {
  lowercase: "a-z",
  uppercase: "A-Z",
  number: "0-9",
  specialCharacter: "~`!@#$%^&*\\-_\\/\\\\|'\"<>,.:;?(){}\\[\\]\\+=",
  tilde: "~",
  backtick: "`",
  exclamation: "!",
  at: "@",
  hash: "#",
  dollar: "$",
  percent: "%",
  caret: "^",
  ampersand: "&",
  asterisk: "*",
  hyphen: "\\-",
  underscore: "_",
  forwardSlash: "\\/",
  backslash: "\\\\",
  pipe: "|",
  singleQuote: "'",
  doubleQuote: '"',
  greater: ">",
  less: "<",
  comma: ",",
  period: ".",
  colon: ":",
  semicolon: ";",
  questionMark: "?",
  openParenthesis: "(",
  closeParenthesis: ")",
  openBrace: "{",
  closeBrace: "}",
  openBracket: "\\[",
  closeBracket: "\\]",
  plus: "\\+",
  equal: "=",
};


// Validate Options object
const validateOptions = (options: Options): void => {
  if (options.specialCharacter && typeof options.specialCharacter !== "boolean") {
    const specialChars = options.specialCharacter as { [key: string]: boolean };
    for (const char in specialChars) {
      if (!regexStrings[char]) {
        throw new Error(`Invalid special character: ${char}`);
      }
    }
  }
};

/**
 * Check if the string contains the specified characters
 * @param str - The string to check
 * @param options - The options object
 * @returns A boolean value
 * @example
 * ```ts
 * isCharsExist("Hello123", { letter: true, number: true }); // true
 * isCharsExist("hello123", { letter: { uppercase: true }, number: true }); // false
 * isCharsExist("@^&", { specialCharacter: true }); // true
 * isCharsExist("&str", { specialCharacter: { ampersand: true } }); // true
 * ```
 */
export const isCharsExist: IsCharsExist = (str, options) => {
  validateOptions(options);

  let regexString = "";

  if (options.number) {
    regexString += regexStrings.number;
  }
  if (options.letter) {
    if (typeof options.letter === "boolean") {
      regexString += regexStrings.lowercase?.concat(regexStrings.uppercase!);
    } else {
      if (options.letter.uppercase) {
        regexString += regexStrings.uppercase;
      }
      if (options.letter.lowercase) {
        regexString += regexStrings.lowercase;
      }
    }
  }
  if (options.specialCharacter) {
    if (typeof options.specialCharacter === "boolean") {
      regexString += regexStrings.specialCharacter;
    } else {
      const specialChars = options.specialCharacter as { [key: string]: boolean };
      for (const char in specialChars) {
        if (specialChars[char]) {
          regexString += regexStrings[char];
        }
      }
    }
  }

  const regex = new RegExp(`[${regexString}]`);

  return regex.test(str);
};
