document.querySelector('.start-game').addEventListener('click', ()=>{
    document.body.style.transition = '0.5s ease';
    document.body.style.opacity = '0';;
    setTimeout(()=>{
        window.location = 'game.html';
    }, 500);
})                 

let pl = {};

C0 = {
  name: "Ace of Hearts",
  id: "C0",
  mot: "Infinite Power",
  effect: (char) => {
    if(!char.noTreas) char.noTreas = 0;
    char.noTreas += 1;
  },
  removeEffect: (char) => {
    char.noTreas -= 1;
  },
  tip: 'Start every turn with 1 extra rage',
  pr: 100,
};
C1 = {
  name: "Ace of Hearts",
  id: "C1",
  mot: "Luck of the draw!",
  effect: (char) => {
    char.AoH = 1;
  },
  removeEffect: (char) => {
    char.AoH = 0;
  },
  tip: 'Every time you heal, heal 1 more hp',
  pr: 100,
};
C2 = {
  name: "Ace of Clubs",
  id: "C2",
  mot: "It's all about the aim",
  effect: (char) => {
    char.AoC = 1;
  },
  removeEffect: (char) => {
    char.AoC = 0;
  },
  tip: '<strong class="inline"><span>B</span></strong> deal 1 extra dmg to the targeted enemy',
  pr: 100,
};
C3 = {
  name: "Ace of Diamonds",
  id: "C3",
  mot: "Doubloons are a pirates best friend",
  effect: (char) => {
    char.AoD = true;
  },
  removeEffect: (char) => {
    char.AoD = false;
  },
  tip: 'Gain 30% more Doubloons after a battle',
  pr: 100,
};
C4 = {
  name: "Scurvy's Cure",
  id: "C4",
  mot: "Your daily dose of vitamine C",
  effect: (char) => {
    char.SC = true;
  },
  removeEffect: (char) => {
    char.SC = false;
  },
  tip: `You can no longer become weakend`,
  pr: 100,
};
C5 = {
  name: "Dead Mans Chest",
  id: "C5",
  mot: "Fortune... but at what cost?",
  effect: () => {
    pl.dmc = true;
  },
  removeEffect: () => {
    pl.dmc = false;
  },
  tip: `Treasure Chests now contain 2 treasures but you lose 5 Max HP when opening a chest`,
  pr: 120,
};
C6 = {
  name: "Bonzabeast Stew",
  id: "C6",
  mot: "Mmm! Delightfully tangy, yet robust",
  effect: (char) => {
    char.BBS = true;
  },
  removeEffect: (char) => {
    char.BBS = false;
  },
  tip: `Heal 2 hp at the start of a battle`,
  pr: 100,
};
C7 = {
  name: "Papaya",
  mot: "The fruits of labor",
  id: "C7",
  effect: (char) => {
    char.mhp += 5;
    setTimeout(() => {
      heal(char, 5);
    }, 100);
  },
  removeEffect: (char) => {
    char.mhp -= 5;
    heal(char, 0);
  },
  tip: `Raise your max HP by 5`,
  pr: 100,
};
C8 = {
  name: "Forge Hammer",
  id: "C8",
  mot: "Build a better future for yourself",
  effect: async (char) => {
    let count = 0;
    let face = "";
    let face2 = "";
    while (count == 0) {
      face =
        char.dieArr[Math.floor(Math.random() * char.dieArr.length)].faceVal[
          Math.floor(Math.random() * 6)
        ];
      if (face[0] != face[0].toLowerCase() && face.length < 6) {
        face.push(face[0]);
        count++;
      }
    }
    while (count == 1) {
      face2 =
        char.dieArr[Math.floor(Math.random() * char.dieArr.length)].faceVal[
          Math.floor(Math.random() * 6)
        ];
      if (face2[0] != face2[0].toLowerCase() && face2.length < 6) {
        face2.push(face2[0]);
        count++;
      }
    }
    await upgradeFace(face);
    await upgradeFace(face2);
  },
  removeEffect: (char) => {},
  tip: `Upgrade 2 random diefaces on pickup`,
  pr: 20,
};
C9 = {
  name: "Spring Water",
  id: "C9",
  mot: "Acts 3:15",
  effect: (char) => {
    char.sw = true;
  },
  removeEffect: (char) => {
    char.sw = false;
  },
  tip: `When your HP reaches 0, heal 50% of your max HP`,
  pr: 120,
};
C10 = {
  name: "Spring Water (Used)",
  id: "C10",
  mot: "Acts 3:15",
  effect: (char) => {},
  removeEffect: (char) => {},
  tip: `(Used)<br>When your HP reaches 0, heal 50% of your max HP`,
  pr: 20,
};
C11 = {
  name: "Sapphire",
  id: "C11",
  mot: "Better safe than sorry",
  effect: (char) => {
    pl.maxRoll++;
    char.Sapphire = true;
  },
  removeEffect: (char) => {
    pl.maxRoll--;
    char.Sapphire = false;
  },
  tip: `Gain 1 extra reroll every turn<br>-&-<br>At the end of your turn gain 1 Shield for each reroll you have left`,
  pr: 200,
  color: '#0210f2',
};
C12 = {
  name: "Ruby",
  id: "C12",
  mot: "Anger never saved anybody.... yet!",
  effect: (char) => {
    char.Ruby = true;
  },
  removeEffect: (char) => {
    char.Ruby = false;
  },
  tip: `Start every combat with 1 Rage<br>-&-<br>Deal 2 extra damage per rage instead of 1`,
  pr: 200,
  color: '#e0011b',
};
C13 = {
  name: "Emerald",
  id: "C13",
  mot: "Green eyes",
  effect: (char) => {
    char.Emerald = true;
  },
  removeEffect: (char) => {
    char.Emerald = false;
  },
  tip: `Whenever you apply Poison, apply 1 additional Poison<br>-&-<br>Poison decreases by 2 whenever someone ends their turn`,
  pr: 200,
  color: '#00db59',
};
C14 = {
  name: "Topaz",
  id: "C14",
  mot: "A foggy mineral",
  effect: (char) => {
    char.Topaz = true;
  },
  removeEffect: (char) => {
    char.Topaz = false;
  },
  tip: `All enemies gain 1 blind at the start of a battle<br>-&-<br>Blind enemies have a 75% chance to miss a attack`,
  pr: 200,
  color: '#f3b552',
};
C15 = {
  name: "Amethyst",
  id: "C15",
  mot: "Acts 3:15",
  effect: (char) => {char.Ame = true},
  removeEffect: (char) => {char.Ame = false;},
  tip: `Enemies lose 25% of their max hp at the start of battle<br>-&-<br>At the end of your turn deal 1 dmg to every enemy for each reroll you have left`,
  pr: 200,
  color: '#e785ff',
};
C16 = {
  name: "Diamond",
  id: "C16",
  mot: "Looking sharp!",
  effect: (char) => {
    pl.Diamond = true;
    pl.maxRoll++;
  },
  removeEffect: (char) => {
    pl.Diamond = false;
    pl.maxRoll--;
  },
  tip: `Gain 1 extra reroll every turn<br>-&-<br>At the end of your turn deal 1 dmg to every enemy for each reroll you have left`,
  pr: 200,
  color: '#28b6d4',
};
C17 = {
  name: "Restraints",
  id: "C17",
  mot: "You'll suffer the same fate",
  effect: (char) => {
    char.restraint = true;
  },
  removeEffect: (char) => {
    char.restraint = false;
  },
  tip: `<p>Whenever you roll a brandmark, also apply that effect on all enemies</p>`,
  pr: 150,
};
C18 = {
  name: "Spikey Shell",
  id: "C18",
  mot: "Don't touch it with your bare hands",
  effect: (char) => {
    char.ss = true;
  },
  removeEffect: (char) => {
    char.ss = false;
  },
  tip: `<p>When you are attacked, deal 1 dmg to the attacker for every symbol on that dieface</p>`,
  pr: 100,
};
C19 = {
  name: "Rumbarrel",
  id: "C19",
  mot: "Yo ho ho and a barrel of ...",
  effect: (char) => {
    char.$r = true;
  },
  removeEffect: (char) => {
    char.$r = false;
  },
  tip: `<p>The cost of rum when upgrading a dieface is reduced by 50%</p>`,
  pr: 80,
};
C20 = {
  name: "Woodsaw",
  id: "C20",
  mot: "Watch your fingers",
  effect: (char) => {
    char.$w = true;
  },
  removeEffect: (char) => {
    char.$w = false;
  },
  tip: `<p>The cost of wood when upgrading a dieface is reduced by 50%</p>`,
  pr: 80,
};
C21 = {
  name: "Thread and Needle",
  id: "C21",
  mot: "Useless apart but great together",
  effect: (char) => {
    char.$s = true;
  },
  removeEffect: (char) => {
    char.$s = false;
  },
  tip: `<p>The cost of cloth when upgrading a dieface is reduced by 50%</p>`,
  pr: 80,
};
C22 = {
  name: "Flowerpot",
  id: "C22",
  mot: "The start of a new life",
  effect: (char) => {
    char.$s = true;
  },
  removeEffect: (char) => {
    char.$s = false;
  },
  tip: `<p>The cost of strange flowers when upgrading a dieface is reduced by 50%</p>`,
  pr: 80,
};
C23 = {
  name: "Iron Anvil",
  id: "C23",
  mot: "Mending is better than healing",
  effect: (char) => {
    char.$i = true;
  },
  removeEffect: (char) => {
    char.$i = false;
  },
  tip: `<p>The cost of iron when upgrading a dieface is reduced by 50%</p>`,
  pr: 80,
};
C24 = {
  name: "Dutchmans Wheel",
  id: "C24",
  mot: "It looks fragile",
  effect: (char) => {
    let test = document.querySelector(".C24");
    let C24 = makeElmnt(
      "div",
      "C24 tr-counter",
      "<p>3</p>",
      test.parentElement
    );
    C24.append(test);
  },
  removeEffect: (char) => {},
  tip: `<p>You may ignore the path up to 3 times when choosing your next location on the map</p>`,
  pr: 80,
};
C25 = {
  name: "Paper Crane",
  id: "C25",
  mot: "It looks fragile",
  effect: (char) => {
    char.PCO = true;
  },
  removeEffect: (char) => {
    char.PCO = false;
  },
  tip: `<p>Weakend enemies deal 2 less damage instead of 1</p>`,
  pr: 100,
};
C26 = {
  name: "Mask",
  id: "C26",
  mot: "It looks scary",
  effect: (char) => {
    char.Mask = true;
  },
  removeEffect: (char) => {
    char.Mask = false;
  },
  tip: `<p>All enemies gain 1 weak at the start of battle</p>`,
  pr: 100,
};
C27 = {
  name: "Smoke Bomb",
  id: "C27",
  mot: "I can't see how this helps",
  effect: (char) => {
    char.SmB = true;
  },
  removeEffect: (char) => {
    char.SmB = false;
  },
  tip: `<p>apply 1 blind to all enemies with <strong class="inline"><span>B</span></strong></p>`,
  pr: 100,
};
C28 = {
  name: "Jade Talisman",
  id: "C28",
  mot: "Don't lick the stone",
  effect: (char) => {
    char.JT = true;
  },
  removeEffect: (char) => {
    char.JT = false;
  },
  tip: `<p><strong class="inline"><span>R</span></strong> also applies 1 poison</p>`,
  pr: 100,
};
C29 = {
  name: "Bone Knockles",
  id: "C29",
  mot: "It only hurts for a moment",
  effect: (char) => {
    char.BK = true;
  },
  removeEffect: (char) => {
    char.BK = false;
  },
  tip: `<p><strong class="inline"><span>F</span></strong> has a 20% chance to stun an enemy</p>`,
  pr: 100,
};
C30 = {
  name: "Bananas",
  id: "C30",
  mot: "Monkey fingers",
  effect: async (char) => {
    char.mhp += 8;
    heal(char, 8);
    pl.seaEvents.unshift(SeaMonkey);
  },
  removeEffect: (char) => {
    char.mhp -= 8;
    heal(char, 0);
  },
  tip: `<p>Raise your max HP by 8</p>`,
  pr: 100,
};
C31 = {
  name: "Monkey",
  id: "C31",
  mot: "Stealing his way to your heart",
  effect: async (char) => {
    char.monkey = true;
  },
  removeEffect: (char) => {
    char.monkey = false;
  },
  tip: `<p>Gain 1 doubloon for every symbol on a dieface when hitting an enemy</p>`,
  pr: 150,
};
C32 = {
  name: "King's Crown",
  id: "C32",
  mot: "Money = Power",
  effect: async (char) => {
    char.crown = true;
  },
  removeEffect: (char) => {
    char.crown = false;
  },
  tip: `<p>Gain 1 rage at the start of your turn for every 200 doubloons you own</p>`,
  pr: 150,
};
C33 = {
  name: "Wetstone",
  id: "C33",
  mot: "Sharpen your knifes boys!",
  effect: async (char) => {
    char.wetstone = 1;
  },
  removeEffect: (char) => {
    char.wetstone = 0;
  },
  tip: `<p><strong class="inline"><span>D</span></strong>deals 1 extra dmg</p>`,
  pr: 80,
};

const Save = ()=>{
    resetPlayerObj();
    window.localStorage.setItem('player', pl);
  }
  
  
  const resetPlayerObj = ()=>{
    pl = JSON.stringify({
      user: 'HannekePanneke',
      name: 'Charles Vane',
      hp: 30,
      mhp: 30,
      treasures: [],
      trCon: document.querySelector(".treasures"),
      dieArr: [
        {
          faceVal: [["S"], ["S"], ["S"], ["F"], ["F"], ["C"]],
        },
        {
          faceVal: [["S"], ["S"], ["F"], ["F"], ["F", "F"], ["G"]],
        },
      ],
      spareFaces: [],
      reroll: 0,
      maxRoll: 3,
      resourses: [99, 0, 0, 0, 0, 0],
      vol: 0,
      pirDef: 0,
      quaDef: 0,
      bossDef: 0,
      floorLvl: 0,
      stage: 0,
      score: 0,
      comTr: [C1, C3, C25],
      uncomTr: [C4, C7, C8, C2, C18, C29],
      rareTr: [C27, C6],
      shopTr: [C19, C20, C21, C23, C8],
      gemArr: [C12, C11, C16, C14, C15],
      mayanArr: [C13, C26, C28, C22],
      TreasureArr: [pl.comTr, pl.comTr, pl.comTr, pl.comTr, pl.uncomTr, pl.uncomTr, pl.uncomTr, pl.rareTr, pl.rareTr, pl.gemArr],
      seed: [],
      CostumsSeed: '',
      landEvents: ['Market', 'MonkeyJungle', 'shadyMerchant', 'intoTheFog', 'piratecave'],
      seaEvents: ['Gamble', 'Dive', 'UnderwaterChest'],
    })
  }

  Save();