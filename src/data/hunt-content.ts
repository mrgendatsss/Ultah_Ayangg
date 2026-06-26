export const QR_MAP: Record<string, { clueId: number; type: "outside" | "inside" }> = {
  HUNT_G1_OUT: { clueId: 1, type: "outside" },
  HUNT_G1_IN:  { clueId: 1, type: "inside" },
  HUNT_G2_OUT: { clueId: 2, type: "outside" },
  HUNT_G2_IN:  { clueId: 2, type: "inside" },
  HUNT_G3_OUT: { clueId: 3, type: "outside" },
  HUNT_G3_IN:  { clueId: 3, type: "inside" },
};

export type ClueData = {
  id: number;
  hub: { title: string; subtitle: string };
  outside: {
    intro: { title: string; lines: string[] };
    question: { title: string; text: string; options: string[]; correctIndex: number };
    correct: { title: string; lines: string[] };
    giftButton: string;
    scanInsideText: string;
  };
  inside: {
    tag: string;
    paragraphs: string[];
    signOff: string;
    button: string;
  };
};

export const CLUES: ClueData[] = [
  {
    id: 1,
    hub: {
      title: "Where comfort quietly waits.",
      subtitle: "Sometimes, the smallest warmth says the biggest \"I care\".",
    },
    outside: {
      intro: {
        title: "A little reminder\u2026",
        lines: [
          "Not every gift is meant to impress.",
          "Some are simply meant to make difficult days\nfeel a little easier.",
        ],
      },
      question: {
        title: "One question first\u2026",
        text: "When someone you love isn\u2019t feeling well, what usually comforts them the most?",
        options: ["A warm hug", "More coffee", "Staying busy", "Watching TV"],
        correctIndex: 0,
      },
      correct: {
        title: "Correct.",
        lines: ["Sometimes,", "comfort is the greatest expression of love."],
      },
      giftButton: "OPEN GIFT",
      scanInsideText: "This story isn\u2019t over yet. \ud83e\udd0d",
    },
    inside: {
      tag: "FOR YOUR HARD DAYS",
      paragraphs: [
        "Happy Birthday, sayang.",
        "Aku tahu ada hari-hari ketika badanmu terasa capek.",
        "Aku mungkin nggak selalu bisa ada di sampingmu.",
        "Jadi aku berharap hadiah kecil ini bisa menjadi pengganti hangatnya pelukanku ketika kita sedang berjauhan.",
        "Semoga setiap kali kamu memakainya,\nkamu selalu ingat\u2026",
        "someone loves you very much.",
      ],
      signOff: "Love,\n\nFarell \u2764\ufe0f",
      button: "CONTINUE JOURNEY",
    },
  },
  {
    id: 2,
    hub: {
      title: "A memory you can never see\u2026 but always remember.",
      subtitle: "Some memories don\u2019t live in photos.\nThey live in a familiar scent.",
    },
    outside: {
      intro: {
        title: "Close your eyes.",
        lines: [
          "Some memories don\u2019t need words.",
          "They only need one familiar feeling.",
        ],
      },
      question: {
        title: "One question first\u2026",
        text: "What can instantly bring back a memory without saying a single word?",
        options: ["Music", "A scent", "A calendar", "A street"],
        correctIndex: 1,
      },
      correct: {
        title: "Correct.",
        lines: ["Some people stay with us\u2026", "through their scent."],
      },
      giftButton: "OPEN GIFT",
      scanInsideText: "One more message is waiting for you.",
    },
    inside: {
      tag: "A MEMORY YOU CAN WEAR",
      paragraphs: [
        "Sometimes\u2026",
        "all it takes\nis one familiar scent\nto remember everything.",
        "I hope whenever you wear this,",
        "you\u2019ll remember today.",
        "The smiles.",
        "The surprises.",
        "And maybe\u2026",
        "me.",
      ],
      signOff: "Happy Birthday. \u2764\ufe0f",
      button: "CONTINUE JOURNEY",
    },
  },
  {
    id: 3,
    hub: {
      title: "Every beautiful journey begins with something worth carrying.",
      subtitle: "The road ahead is full of dreams.\nDon\u2019t forget what comes with you.",
    },
    outside: {
      intro: {
        title: "Life is full of places you\u2019ll go.",
        lines: ["And dreams you\u2019ll chase."],
      },
      question: {
        title: "One question first\u2026",
        text: "What should always stay with you while chasing your dreams?",
        options: ["Hope", "Fear", "Doubt", "Regret"],
        correctIndex: 0,
      },
      correct: {
        title: "Correct.",
        lines: ["Hope makes every journey worth taking."],
      },
      giftButton: "OPEN FINAL GIFT",
      scanInsideText: "One last message awaits.",
    },
    inside: {
      tag: "FOR EVERY JOURNEY",
      paragraphs: [
        "This isn\u2019t just a bag.",
        "It\u2019s something I hope\nwill accompany you",
        "to work,\nto new places,\nto new adventures,",
        "and to every dream\nyou\u2019re about to achieve.",
        "Whenever you carry it,",
        "I hope you\u2019ll remember\nthat someone",
        "will always believe in you,\nsupport you,",
        "and be proud of every step\nyou take.",
      ],
      signOff: "Happy Birthday.\n\nI love you.\n\n\u2014 Farell \u2764\ufe0f",
      button: "FINISH JOURNEY",
    },
  },
];
