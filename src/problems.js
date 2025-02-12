export const problems = [
  {
    "word": "balloon",
    "hints": ["float", "air", "party", "pop"]
  },
  {
    "word": "blossom",
    "hints": ["flower", "spring", "bloom", "pink"]
  },
  {
    "word": "breeze",
    "hints": ["wind", "gentle", "cool", "fresh"]
  },
  {
    "word": "captain",
    "hints": ["leader", "ship", "command", "crew"]
  },
  {
    "word": "channel",
    "hints": ["station", "water path", "direct", "program feed"]
  },
  {
    "word": "comfort",
    "hints": ["cozy", "relax", "warm", "peace"]
  },
  {
    "word": "concert",
    "hints": ["music", "stage", "crowd", "band"]
  },
  {
    "word": "courage",
    "hints": ["bravery", "face fears", "heroic", "inner strength"]
  },
  {
    "word": "crystal",
    "hints": ["stone", "fortune", "ball", "magic rock"]
  },
  {
    "word": "diamond",
    "hints": ["gem", "ring", "sparkle", "forever"]
  },
  {
    "word": "dolphin",
    "hints": ["mammal", "ocean", "flippers", "smart"]
  },
  {
    "word": "eclipse",
    "hints": ["moon", "shadow", "dark", "sun"]
  },
  {
    "word": "fantasy",
    "hints": ["magic", "dream", "unreal", "fairy"]
  },
  {
    "word": "freedom",
    "hints": ["liberty", "rights", "chains", "escape"]
  },
  {
    "word": "glacier",
    "hints": ["ice", "cold", "arctic", "slow"]
  },
  {
    "word": "harmony",
    "hints": ["peace", "balance", "music", "unity"]
  },
  {
    "word": "harvest",
    "hints": ["crop", "farm", "autumn", "reap"]
  },
  {
    "word": "journey",
    "hints": ["travel", "path", "quest", "voyage"]
  },
  {
    "word": "kitchen",
    "hints": ["cook", "food", "stove", "chef"]
  },
  {
    "word": "library",
    "hints": ["books", "quiet", "reading", "study"]
  },
  {
    "word": "monster",
    "hints": ["scary", "creature", "beast", "fear"]
  },
  {
    "word": "morning",
    "hints": ["dawn", "early", "sunrise", "wake"]
  },
  {
    "word": "mystery",
    "hints": ["puzzle", "secret", "clues", "unknown"]
  },
  {
    "word": "octopus",
    "hints": ["tentacles", "ink", "sea", "smart"]
  },
  {
    "word": "passion",
    "hints": ["strong feeling", "enthusiasm", "desire", "love"]
  },
  {
    "word": "penguin",
    "hints": ["tuxedo", "arctic", "waddle", "iceberg"]
  },
  {
    "word": "phoenix",
    "hints": ["fire", "bird", "rebirth", "rise"]
  },
  {
    "word": "picture",
    "hints": ["photo", "image", "frame", "snap"]
  },
  {
    "word": "present",
    "hints": ["boxed", "right now", "current time", "birthday"]
  },
  {
    "word": "rainbow",
    "hints": ["colors", "arch", "prism", "storm"]
  },
  {
    "word": "rhythm",
    "hints": ["beat", "music", "tempo", "dance"]
  },
  {
    "word": "sandbox",
    "hints": ["play", "beach", "castle", "toys"]
  },
  {
    "word": "silence",
    "hints": ["quietness", "meditation", "peaceful state", "no sound"]
  },
  {
    "word": "sparkle",
    "hints": ["shine", "glitter", "twinkle", "bright"]
  },
  {
    "word": "sunrise",
    "hints": ["dawn", "morning", "east", "begin"]
  },
  {
    "word": "thunder",
    "hints": ["storm", "loud", "lightning", "boom"]
  },
  {
    "word": "volcano",
    "hints": ["lava", "erupt", "mountain", "hot"]
  },
  {
    "word": "warrior",
    "hints": ["fight", "brave", "battle", "hero"]
  },
  {
    "word": "weather",
    "hints": ["rain", "forecast", "climate", "sky"]
  },
  {
    "word": "whisper",
    "hints": ["quiet", "secret", "soft", "hush"]
  },
  {
    "word": "whistle",
    "hints": ["tune", "signal", "blow", "sound"]
  },
  {
    "word": "wisdom",
    "hints": ["sage", "smart", "knowledge", "elder"]
  }
];

// Check for duplicate words at load time
const wordCounts = {};
const duplicates = [];

problems.forEach(problem => {
  if (wordCounts[problem.word]) {
    if (!duplicates.includes(problem.word)) {
      duplicates.push(problem.word);
    }
    wordCounts[problem.word]++;
  } else {
    wordCounts[problem.word] = 1;
  }
});

if (duplicates.length > 0) {
  console.warn('⚠️ Duplicate words found in problems:', duplicates.join(', '));
  console.warn('Please remove duplicate entries to ensure fair gameplay.');
} 