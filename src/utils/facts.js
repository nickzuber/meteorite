
const facts = [
  'Movie trailers were originally shown after the movie, which is why they were called “trailers”.',
  'The top six foods that make your fart are beans, corn, bell peppers, cauliflower, cabbage and milk!',
  'A crocodile can’t poke its tongue out',
  '95% of people text things they could never say in person.',
  'A baby octopus is about the size of a flea when it is born.',
  'A baby spider is called a spiderling.',
  '10% of the World’s population is left handed.',
  'Gorillas burp when they are happy',
  'Apple launched a clothing line in 1986. It was described as a “train wreck” by others.',
  'Scientists have tracked butterflies that travel over 3,000 miles.',
  'More than 60,000 people are flying over the United States in an airplane right now.',
  'Our eyes are always the same size from birth, but our nose and ears never stop growing.',
  'If 33 million people held hands, they could make it all the way around the equator.',
  'A “jiffy” is the scientific name for 1/100th of a second.',
  'More than 50% of the people in the world have never made or received a telephone call.',
  'A flea can jump up to 200 times its own height. That is the equivalent of a human jumping the Empire State Building.',
  'A ball of glass will bounce higher than a ball of rubber.',
  'In the past 20 years, scientists have found over 1,000 planets outside of our solar system.',
  'If you started with $0.01 and doubled your money every day, it would take 27 days to become a millionaire.',
  'A person can live without food for about a month, but only about a week without water. If the amount of water in your body is reduced by just 1%, you’ll feel thirsty. If it’s reduced by 10%, you’ll die.',
  'Months that begin on a Sunday will always have a “Friday the 13th”.',
  'In France, it is legal to marry a dead person.',
  'The harder you concentrate on falling asleep, the less likely to fall asleep.',
  'You can’t hum while holding your nose closed.',
  'There are more stars in space than there are grains of sand on every beach in the world.',
  'On Jupiter and Saturn it rains diamonds.',
  'Dolphins sleep with one eye open!',
  'In 2006, an Australian man tried to sell New Zealand on eBay. The price rose to $3,000 before eBay shut it down.',
  'Reed Hastings was inspired to start Netflix after racking up a $40 late fee on a VHS copy of Apollo 13.',
  'When three-letter airport codes became standard, airports that had been using two letters simply added an X.',
  'At one point in the 1990s, 50% of all CDs produced worldwide were for AOL.',
  'A British man changed his name to Tim Pppppppppprice to make it harder for telemarketers to pronounce.',
  'J.P. Morgan once offered $100,000 to anyone who could figure out why his face was so red. No one solved the mystery.',
  'Prairie dogs say hello with kisses.',
  'After OutKast sang “Shake it like a Polaroid picture,” Polaroid released a statement that said, “Shaking or waving can actually damage the image.”',
  'Jonas Salk declined to patent his polio vaccine. "There is no patent," he said. "Could you patent the sun?"',
  'The 50-star American flag was designed by an Ohio high school student for a class project. His teacher originally gave him a B–.',
  '12+1 = 11+2, and "twelve plus one" is an anagram of "eleven plus two."'
];

export function getFact () {
  // DoUbLe TiLdE iS mOrE eLeGaNt ThAn MaTh.FlOoR
  return facts[~~(Math.random() * facts.length)];
}
