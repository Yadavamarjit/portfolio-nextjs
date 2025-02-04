export const interpretContextualResponse = (message: string) => {
  const lowercaseMessage = message.toLowerCase().trim();
  const confirmationWords = [
    "yes",
    "yeah",
    "yep",
    "yup",
    "sure",
    "okay",
    "ok",
    "alright",
    "absolutely",
    "of course",
    "definitely",
    "correct",
    "right",
    "agreed",
    "fine",
    "go ahead",
    "confirmed",
    "sounds good",
    "why not",
    "let's do it",
  ];

  const rejectionWords = [
    "no",
    "nope",
    "nah",
    "never",
    "not at all",
    "stop",
    "cancel",
    "decline",
    "reject",
    "disagree",
    "negative",
    "absolutely not",
    "no way",
    "not really",
    "not interested",
    "forget it",
    "leave it",
    "drop it",
    "don't",
    "not now",
    "not today",
    "unwilling",
    "out of the question",
    "i don't think so",
    "maybe not",
    "don't want to",
    "I'd rather not",
  ];

  return confirmationWords.some((word) => lowercaseMessage.includes(word))
    ? "confirmation"
    : rejectionWords.some((word) => lowercaseMessage.includes(word))
    ? "rejection"
    : "";
};
