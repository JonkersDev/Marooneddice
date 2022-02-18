
const soundBoard = {
  B: "bomb",
  C: "sword",
  D: "sword",
  E: "sword",
  F: "punch",
  G: "shot",
  H: "chime",
  I: "shield",
  J: "reload",
  K: "punch",
  R: "sword",
  S: "shield",
  T: "bash",
  P: "blow",
  X: "shield",
  paper: "paper",
  paper2: "paper2",
  scr: "scribble",
  hover: "hover",
  openevent: "openevent",
  wheel: "wheel",
  chain: "chain",
  shieldon: "shieldon",
  shieldbreak: "shieldbreak",
  poison: "poison",
  roll: "roll",
  click: "click",
  looth: "looth",
  lootw: "lootw",
  looti: "looti",
  lootr: "lootr",
  loots: "loots",
  lootf: "lootf",
  victory: "victory",
  upgrade: "upgrade",
  pickup: 'Pickup',
};

const playSound = (val) => {
  if(soundBoard[val] && interaction){
    let aud = new Audio(`./sounds/${soundBoard[val]}.mp3`);
    aud.volume = pl.vol;
    aud.play();
    aud.addEventListener("ended", () => {
      aud.remove();
    });
 }
};

const hoverSound = (elm, aud) => {
  elm.addEventListener("mouseenter", () => {
    playSound(aud);
  });
};


// let doc = '';
// let request = new XMLHttpRequest();
// request.addEventListener('load', (e)=>{
//   doc = makeElmnt('div', '', request.response);
// }, false);
// request.open('GET', 'svg.html', true);
// request.send();

const getSVG = (svg=>{
  if(!doc.querySelector(`#${svg}`)) return;
  svg = doc.querySelector(`#${svg}`);
  let img = makeElmnt('img', '');
  let xml = (new XMLSerializer).serializeToString(svg);
  img.src = "data:image/svg+xml;base64,"+btoa(xml);
  return img;
});

//TREASURES
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
    tip: '<p>Start every turn with 1 extra rage</p>',
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
    tip: '<p>Every time you heal, heal 1 more hp</p>',
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
    tip: '<p>Deal 1 extra dmg to the targeted enemy with <strong class="inline"><span>B</span></strong></p>',
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
    tip: '<p>Gain 30% more Doubloons after a battle</p>',
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
    tip: `<p>You can no longer become weakend</p>`,
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
    tip: `<p>Treasure Chests now contain 2 treasures but you lose 5 Max HP when opening a chest</p>`,
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
    tip: `<p>Heal 2 hp at the start of a battle</p>`,
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
    tip: `<p>Raise your max HP by 5</p>`,
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
    tip: `<p>Upgrade 2 random diefaces on pickup</p>`,
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
    tip: `<p>When your HP reaches 0, heal 50% of your max HP</p>`,
    pr: 120,
  };
  C10 = {
    name: "Spring Water (Used)",
    id: "C10",
    mot: "Acts 3:15",
    effect: (char) => {},
    removeEffect: (char) => {},
    tip: `<p>(Used)<br>When your HP reaches 0, heal 50% of your max HP</p>`,
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
    tip: `<p>Gain 1 extra reroll every turn<br>-&-<br>At the end of your turn gain 1 Shield for each reroll you have left</p>`,
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
    tip: `<p>Start every combat with 1 Rage<br>-&-<br>Deal 2 extra damage per rage instead of 1</p>`,
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
    tip: `<p>Whenever you apply Poison, apply 1 additional Poison<br>-&-<br>Poison decreases by 2 whenever someone ends their turn</p>`,
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
    tip: `<p>All enemies gain 1 blind at the start of a battle<br>-&-<br>Blind enemies have a 75% chance to miss a attack</p>`,
    pr: 200,
    color: '#f3b552',
  };
  C15 = {
    name: "Amethyst",
    id: "C15",
    mot: "Acts 3:15",
    effect: (char) => {
      char.Ame = true;
      rewardArr.push(raiseMHP);
      opArr.push('Raise max hp by 1');
    },
    removeEffect: (char) => {char.Ame = false;},
    tip: `<p>Enemies lose 20% of their max hp at the start of battle<br>-&-<br>You have the option to raise your max hp by 1 at the end of combat</p>`,
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
    tip: `<p>Gain 1 extra reroll every turn<br>-&-<br>At the end of your turn deal 1 dmg to every enemy for each reroll you have left</p>`,
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
    tip: `<p>apply 1 blind to all enemies when using a dice with <strong class="inline"><span>B</span></strong></p>`,
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
    tip: `<p><strong class="inline"><span>F</span></strong> has a 15% chance to stun an enemy</p>`,
    pr: 100,
  };
  C30 = {
    name: "Bananas",
    id: "C30",
    mot: "Monkey fingers",
    effect: async (char) => {
      char.mhp += 8;
      heal(char, 8);
      pl.seaEvents.unshift('SeaMonkey');
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
  C34 = {
    name: "Letter of Mark",
    id: "C34",
    mot: "More Options",
    effect: async (char) => {
      char.MoOp = true;
    },
    removeEffect: (char) => {
      char.MoOp = false;
    },
    tip: `<p>Gain 1 extra option when choosing a new dieface</p>`,
    pr: 80,
  };
  C35 = {
    name: "Coconut",
    id: "C35",
    mot: "More Options",
    effect: async (char) => {
      char.mhp += 3;
      heal(char, 3);
    },
    removeEffect: (char) => {
      char.mhp -= 3;
      heal(char, 0);
    },
    tip: `<p>Raise your max HP by 3</p>`,
    pr: 80,
  };
  C36 = {
    name: "Pineapple",
    id: "C36",
    mot: "Bananas - B = Pineapple",
    effect: async (char) => {
      char.mhp += 8;
      heal(char, 8);
    },
    removeEffect: (char) => {
      char.mhp -= 8;
      heal(char, 0);
    },
    tip: `<p>Raise your max HP by 8</p>`,
    pr: 120,
  };
  C37 = {
    name: "Wooden Pauldron",
    id: "C37",
    mot: "The best defence is a good offence",
    effect: async (char) => {
      char.WP = true;
    },
    removeEffect: (char) => {
      char.WP = false;
    },
    tip: `<p>Lose 2 shield when using <strong class="inline"><span>T</span></strong> instead of 50%</p>`,
    pr: 150,
  };

  C38 = {
    name: "Red Dice",
    id: "C38",
    mot: "Luck of the roll",
    effect: async (char) => {
      char.RD = true;
    },
    removeEffect: (char) => {
      char.RD = false;
    },
    tip: `<p>Reroll a random dice when getting hit</p>`,
    pr: 150,
  };
  C39 = {
    name: "Wooden Shield",
    id: "C39",
    mot: "Block",
    effect: async (char) => {
      char.C39 = true;
    },
    removeEffect: (char) => {
      char.C39 = false;
    },
    tip: `<p>Start every combat with 4 shield</p>`,
    pr: 100,
  };
  
  // pl.comTr = [C1, C3, C25];
  // pl.uncomTr = [C4, C7, C8, C2, C18, C29];
  // pl.rareTr = [C27, C6];
  // pl.shopTr = [C19, C20, C21, C23, C8];
  // pl.gemArr = [C12, C11, C16, C14, C15];
  // pl.mayanArr = [C13, C26, C28, C22];
  
  // pl.TreasureArr = [comTr,comTr, comTr, comTr, uncomTr, uncomTr, uncomTr, rareTr, rareTr, gemArr];
  
  //ENEMIES
  
  let royalNavyRun = () => {
    return new Promise((resolve, reject) => {
      win = true;
      let chars = document.querySelector(".en-area").childNodes;
      chars.forEach((char, ind) => {
        setTimeout(() => {
          char.classList.add("run");
        }, (chars.length - ind) * 100 + 1000);
      });
      setTimeout(() => {
        document.querySelector(".scr").childNodes.forEach((e) => {
          e.style = "transition: 500ms; opacity: 0; pointer-event: none;";
        });
        enterUnkownLand(
          document.querySelector(".scr"),
          document.querySelector(".continue-btn"),
          royalNavyAA
        );
        pl.dieArr.forEach((d) => {
          d.faceVal.forEach((f) => {
            f.forEach((v, i) => {
              if (v == "J") f[i] = "G";
            });
          });
        });
      }, 3000);
    });
  };
  
  let royalMarine = {
    name: `Royal Marine`,
    hp: 7,
    onDeath: "royalNavyRun",
    dieArr: [
      {
        faceVal: [["S"], ["S"], ["S"], ["F"], ["F"], ["C"]],
      },
    ],
  };
  
  let resCave = false;
  
  const pirateCaveR = () => {
    return new Promise((resolve, reject) => {
      let death = true;
      enemyArr.forEach((e) => {
        if (e.obj.hp > 0) {
          death = false;
        }
      });
      if (death == false) {
        return;
      } else {
        document.querySelector(".scr").childNodes.forEach((e) => {
          e.style = "transition: 500ms; opacity: 0; pointer-event: none;";
        });
        if (resCave == false) {
          enterUnkownLand(
            document.querySelector(".scr"),
            document.querySelector(".continue-btn"),
            'piratecaveB'
          );
          resCave = true;
        }
      }
    });
  };
  
  let sleepA = {
    name: `deckhand`,
    hp: 8,
    onDeath: "pirateCaveR",
    dieArr: [
      {
        faceVal: [["S"], ["S"], ["F"], ["F"], ["C"], ["C"]],
      },
    ],
  };
  
  let sleepB = {
    name: `Sailor`,
    hp: 7,
    onDeath: "pirateCaveR",
    dieArr: [
      {
        faceVal: [["S"], ["S"], ["S"], ["F"], ["F"], ["C"]],
      },
    ],
  };
  
  let sleepC = {
    name: `Gunner`,
    hp: 10,
    onDeath: "pirateCaveR",
    dieArr: [
      {
        faceVal: [["S"], ["S"], ["S"], ["F"], ["G"], ["G"]],
      },
    ],
  };
  
  let dummy = {
    name: `Sailor`,
    hp: 999,
    dieArr: [
      {
        faceVal: [["I"], ["I"], ["I"], ["F"], ["F"], ["C"]],
      },
    ],
    enTr: [{}],
  };
  let lostSailor = {
    name: "Sailor",
    hp: 10,
    dieArr: [
      {
        faceVal: [["S"], ["S"], ["S", "S"], ["F", "F"], ["F", "F"], ["C"]],
      },
    ],
  }
  let deckhand = {
    name: `Deckhand`,
    hp: 12,
    dieArr: [
      {
        faceVal: [["S"], ["S"], ["S"], ["F", "F"], ["C"], ["C"]],
      },
    ],
  };
  
  let cooper = {
    name: `Cooper`,
    hp: 12,
    dieArr: [
      {
        faceVal: [
          ["S", "S"],
          ["S", "S"],
          ["S", "S", "S"],
          ["G"],
          ["G", "G"],
          ["G"],
        ],
      },
    ],
  };
  
  let cook = {
    name: `Cook`,
    hp: 26,
    dieArr: [
      {
        faceVal: [["S"], ["S"], ["F"], ["F"], ["C"], ["C"]],
      },
      {
        faceVal: [["H"], ["H", "H"], ["H", "H"], ["S", "S"], ["F"], ["F"]],
      },
    ],
    enTr: [0],
    type: 'C',
  };
  
  let helmsman = {
    name: `Helmsman`,
    hp: 18,
    dieArr: [
      {
        faceVal: [
          ["S"],
          ["S", "S"],
          ["F", "F", "F"],
          ["C", "C"],
          ["C", "C"],
          ["x"],
        ],
      },
    ],
  };
  
  let blacksmith = {
    name: `Blacksmith`,
    hp: 28,
    dieArr: [
      {
        faceVal: [["S"], ["S", "S"], ["R"], ["R"], ["C"], ["C", "C"]],
      },
      {
        faceVal: [["B"], ["B", "B"], ["B", "B"], ["C"], ["C"], ["C", "C"]],
      },
    ],
    enTr: [0],
    type: 'C',
  };
  
  let Gunner = {
    name: `Gunner`,
    hp: 16,
    dieArr: [
      {
        faceVal: [["S"], ["S", "S"], ["R"], ["R"], ["C"], ["C", "C"]],
      },
      {
        faceVal: [["B"], ["B", "B"], ["B", "B"], ["C"], ["C"], ["C", "C"]],
      },
    ],
  };
  
  let Horado = {
    name: `Horado`,
    hp: 18,
    dieArr: [
      {
        faceVal: [["S"], ["S", "S"], ["P"], ["P"], ["P"], ["P", "P"]],
      },
      {
        faceVal: [["F"], ["F", "F"], ["H", "H"], ["H"], ["H"], ["P", "P"]],
      },
    ],
  };
  
  let Shamaan = {
    name: `Shamaan`,
    hp: 16,
    dieArr: [
      {
        faceVal: [["S"], ["S", "S"], ["P"], ["P"], ["P"], ["P", "P"]],
      },
      {
        faceVal: [["F"], ["F", "F"], ["H", "H"], ["H"], ["H"], ["P", "P"]],
      },
    ],
  };
  
  seymor = {
    name: `Thomas`,
    Lastname: `'Seymor' Gates`,
    hp: 35,
    dieArr: [
      {
        faceVal: [["c"], ["c"], ["c"], ["c"], ["c"], ["c"]],
      },
      {
        faceVal: [["S", "S"], ["S", "S", "S"], ["F"], ["F", "F"], ["e"], ["e"]],
      },
      {
        faceVal: [
          ["S", "S"],
          ["F", "F"],
          ["F", "F"],
          ["F", "F"],
          ["F", "F"],
          ["F", "F", "F", "F"],
        ],
      },
    ],
    enTr: ["C17"],
    type: "B",
    onDeath: 'endStage'
  };

  Stede = {
    name: `Stede`,
    Lastname: `Bonnet`,
    hp: 22,
    dieArr: [
      {
        faceVal: [["S"], ["S"], ["S", "S"], ["I"], ["I", 'I'], ["I", "I"]],
      },
      {
        faceVal: [["S", "S"], ["S", "S"], ["T"], ["T"], ["T"], ["T"]],
      },
      {
        faceVal: [["S"], ["S"], ["F", "F"], ["F", "F"], ["T"], ["T"]],
      },
    ],
    enTr: ["C37"],
    type: "B",
    onDeath: 'endStage'
  };

  Mary = {
    name: `Mary`,
    Lastname: `Read`,
    hp: 20,
    dieArr: [
      {
        faceVal: [["D"], ["D"], ["D", "D"], ["D", "D"], ["q"], ["q"]],
      },
      {
        faceVal: [["S"], ["S", "S"], ["D"], ["D"], ['D'], ["D", "D"]],
      },
    ],
    effect: 'callBackup',
    enTr: ["C38"],
    type: "B",
    onDeath: 'endStage'
  };

const callBackup = ()=>{
  if(charArr.length < 4){
    let en = JSON.parse(JSON.stringify(deckhand));
    let enChar = createChar(en, enArea);
    enemyArr.push(enChar);
    enChar.type = "enemy";
    charArr.push(enChar);
    enChar.obj.dieList.forEach(d=>{rollDice(d)});
    charArr.forEach((c) => {
      c.char.img.addEventListener("mouseenter", () => {
        if (
          dragging[0] == "H" ||
          dragging[0] == "I" ||
          dragging[0] == "J" ||
          dragging[0] == "Q" ||
          dragging[0] == "S" ||
          dragging[0] == "X" 
        ) {
          if (c.type == "player") {
            c.classList.add("hovering");
          }
        } else if (
          dragging[0] == "B" ||
          dragging[0] == "C" ||
          dragging[0] == "D" ||
          dragging[0] == "E" ||
          dragging[0] == "F" ||
          dragging[0] == "G" ||
          dragging[0] == "K" ||
          dragging[0] == "P" ||
          dragging[0] == "R" ||
          dragging[0] == "T"
        ) {
          if (c.type == "enemy") c.classList.add("hovering");
        }
      });
      c.addEventListener("mouseleave", () => {
        c.classList.remove("hovering");
      });
    });
  }
}

  let endStageA = false

  const endStage = async ()=>{
   return new Promise( async (resove)=>{
     win = true;
     await sleep(1000);
     if(pl.stage == 2){
       EndGame(true);
       return;
     }
       document.querySelector(".scr").childNodes.forEach((e) => {
        e.style = "transition: 500ms; opacity: 0; pointer-event: none;";
      });
     if(endStageA == false){
         enterUnkownLand(
             document.querySelector(".scr"),
             document.querySelector(".continue-btn"),
             'treasureChest'
             );
             endStageA = true;
     } 
   })
  }
  
  let Surgeon = {
    name: `Surgeon`,
    hp: 14,
    dieArr: [
      {
        faceVal: [["S"], ["S", "S"], ["F"], ["F"], ["R"], ["R"]],
      },
      {
        faceVal: [["H"], ["H", "H"], ["H", "H"], ["R"], ["R"], ["R", "R"]],
      },
    ],
  };
  
  const normalEnemys = [
    [[lostSailor], [lostSailor],[deckhand],[deckhand],[cooper],[lostSailor, lostSailor],[helmsman],[lostSailor, deckhand],[Gunner],[cooper, deckhand],[lostSailor, helmsman],[lostSailor, lostSailor, deckhand],[deckhand, helmsman],[lostSailor, deckhand, deckhand],[cooper, Gunner],[helmsman, Gunner],[lostSailor, lostSailor, helmsman],[lostSailor, Gunner, helmsman],[deckhand, Gunner, helmsman],[cooper, Gunner, helmsman],[cooper, Gunner, Gunner],[cooper, helmsman, Gunner],[cooper, helmsman, Gunner],[cooper, helmsman, Gunner]],
    [[lostSailor, deckhand], [Gunner], [helmsman], [lostSailor, cooper], [deckhand, cooper], [deckhand, helmsman], [lostSailor, lostSailor, Gunner], [deckhand, cooper, helmsman], [Gunner, Gunner], [cooper, lostSailor, deckhand], [cooper, helmsman], [lostSailor, Gunner, helmsman], [cooper, cooper, cooper]],
    [[lostSailor, deckhand], [Gunner], [helmsman], [lostSailor, cooper], [deckhand, cooper], [deckhand, helmsman], [lostSailor, lostSailor, Gunner], [deckhand, cooper, helmsman], [Gunner, Gunner], [cooper, lostSailor, deckhand], [cooper, helmsman], [lostSailor, Gunner, helmsman], [cooper, cooper, cooper]],
  ];
  
  const eliteEnemys = [[cook], [blacksmith], [blacksmith], [cook], [blacksmith], [blacksmith], [blacksmith], [blacksmith], [blacksmith]];
  const mayanEnemys = [[Horado], [Shamaan], [Horado, Shamaan], [Horado, Horado, Shamaan]];
  
  const allenemies = [lostSailor, deckhand, cooper, helmsman, Gunner, cook, blacksmith, Horado, Shamaan, seymor, Stede, Mary];
  const battleModal = document.querySelector(".scr-transition");
  let pl = {};
  
  let ctrdown = false;
  
  body.addEventListener("keydown", (e) => {
    if (e.key == "Control") ctrdown = true;
  });
  body.addEventListener("keyup", () => {
    ctrdown = false;
  });
  
  const makeElmnt = (ty, cl, str, pa) => {
    let elmnt = document.createElement(ty);
    elmnt.classList = cl;
    if (str) elmnt.innerHTML = str;
    if (pa) pa.append(elmnt);
    return elmnt;
  };
  
  const createMapBtn = (str) => {
    let btn = makeElmnt("div", "map-btn");
    makeElmnt("div", "back", str, btn);
    return btn;
  };
  
  //VIEW INVENTORY
  let dOpen = false;
  
  const openInventory = (upgr, brand) => {
    dOpen = true;
    //CLOSE MAP AND CREATE NEW INVENTORY
    if (document.querySelector(".close-map")) closeMap();
    if (document.querySelector(".inventory") != null)
      document.querySelector(".inventory").remove();
    let inventory = makeElmnt("div", "inventory inventory-screen", 0, body);
  
    if (brand == true) inventory.classList.add("brandmark");
  
    //CHECK IF UPGRADE
    if (upgr) inventory.classList.add("up-cont");
    if (upgr)
      makeElmnt("p", "header", "Click on a dieface to upgrade it", inventory);
    if (brand)
      makeElmnt("p", "header", "Click on a dieface to brandmark it", inventory);
    else
      makeElmnt(
        "p",
        "header",
        "Click and drag a dieface to change your dice",
        inventory
      );
    //CREATE CONTAINER FOR DIE FACES
    let spareDieFaceContainer = makeElmnt(
      "div",
      "sparedieface-container",
      0,
      inventory
    );
  
    //CREATE SPARE DIEFACES
    let num = 60;
    if (pl.spareFaces.length > num) num = pl.spareFaces.length;
    for (i = 0; i < num; i++) {
      let spareDieFaceC = makeElmnt(
        "li",
        "die-item ghost",
        0,
        spareDieFaceContainer
      );
      if (pl.spareFaces[i]) {
        let spareDieFace = makeElmnt(
          "li",
          `die-item dot${pl.spareFaces[i].length}`,
          0,
          spareDieFaceC
        );
  
        pl.spareFaces[i].forEach((v, ind) => {
          if (v == v.toLowerCase()) {
            makeElmnt(
              "p",
              "dot",
              `<span class="curse">${v}</span>`,
              spareDieFace
            );
          } else {
            makeElmnt("p", "dot", `<span>${v}</span>`, spareDieFace);
          }
        });
        spareDieFace.val = pl.spareFaces[i];
        spareDieFace.ind = i;
        if (upgr) dragElementB(spareDieFace, true);
        else dragElementB(spareDieFace);
  
        spareDieFace.addEventListener("mouseenter", () => {
          addToolTip(0, 0, spareDieFace.val[0]);
          playSound("hover");
        });
        spareDieFace.addEventListener("mouseleave", removeToolTip);
      }
    }
  
    //CREATE CONTAINER FOR DIE CARDS
    let dieCardContainer = makeElmnt(
      "section",
      "diecard-container",
      0,
      inventory
    );
  
    //CREATE A CARD FOR EVERY DIE
    pl.dieArr.forEach((d) => {
      let nDie = createDieCard(d);
      if (upgr) {
        nDie.childNodes[1].childNodes.forEach(async (f, i) => {
          f.addEventListener("click", async () => {
            let upgrade = await upgradeDieface(f);
            if (upgrade) {
              f.classList.remove(`dot${f.childNodes.length}`);
              d.faceVal[i].push(d.faceVal[i][0]);
              makeElmnt("p", "dot", `<span>${d.faceVal[i][0]}</span>`, f);
              f.classList.add(`dot${f.childNodes.length}`);
              upgradeFace(d.faceVal[i]);
            }
          });
        });
      }
      if (brand) {
        nDie.childNodes[1].childNodes.forEach(async (f, i) => {
          f.addEventListener("click", async () => {
            if (brand) {
              brand = false;
              inventory.classList.remove("brandmark");
              f.classList.remove(`dot${f.childNodes.length}`);
              f.innerHTML = "";
              d.faceVal[i] = ["x"];
              makeElmnt("p", "dot", `<span class="curse brandmark">x</span>`, f);
              f.classList.add(`dot1`);
              upgradeFace(d.faceVal[i]);
              enterEvent(BonfireHeal, document.querySelector(".continue-btn"));
            }
          });
        });
      }
      dieCardContainer.append(nDie);
    });
  
    //OPENING ANIMATION
    setTimeout(() => {
      inventory.style.opacity = "1";
    }, 10);
  
    //CLOSE INVENTORY
    if (upgr) {
      let closeEye = getSVG('eyeclose'); 
      let retBtn = makeElmnt(
        "p",
        "btn return-btn",
        closeEye.outerHTML,
        body
      );
      let upgradeOpen = true;
      retBtn.addEventListener("click", () => {
        if (upgradeOpen == true) {
          closeInventory();
          upgradeOpen = false;
          let eyeopen = getSVG('eyeopen')
          retBtn.innerHTML = eyeopen.outerHTML;
        } else {
          openInventory(true);
          upgradeOpen = true;
          retBtn.innerHTML = closeEye.outerHTML;
        }
      });
    } else {
      let close = makeElmnt("p", "btn return-btn", "Close", inventory);
      close.addEventListener("click", closeInventory);
    }
  };
  
  const closeInventory = () => {
    dOpen = false;
    if (document.querySelector(".inventory") != null)
      document.querySelector(".inventory").style.opacity = "0";
    setTimeout(() => {
      if (document.querySelector(".inventory") != null)
        document.querySelector(".inventory").remove();
    }, 400);
  };
  
  document.querySelector(".dice-icon").addEventListener("click", () => {
    if (dOpen == false) {
      openInventory(false);
    } else {
      closeInventory();
    }
  });
  
  const createDieFace = (f, append) => {
    f.face = makeElmnt("li", `die-item dot${f.length}`, 0, append);
    f.forEach((v) => {
      makeElmnt("p", "dot", `<span>${v}</span>`, f.face);
    });
    f.face.val = f;
    f.face.addEventListener("mouseenter", () => {
      addToolTip(0, 0, f.face.val[0]);
    });
    f.face.addEventListener("mouseleave", removeToolTip);
    return f.face;
  };
  
  const createDieCard = (d) => {
    let card = createMapBtn("");
    card.classList.add("dice-card");
    let sDie = makeDie(d, pl);
    sDie.firstChild.classList.add("s-die");
    sDie.firstChild.childNodes.forEach((s) => {
      s.style.transform = "rotate(0)";
      s.classList.add("mobile-hov");
      s.addEventListener("mouseenter", () => {
        playSound("hover");
        addToolTip(0, 0, sDie.obj.faceVal[s.dataset.side - 1][0]);
        let check = s.firstChild.firstChild.innerHTML;
        if (check == check.toLowerCase() && check != "") s.classList.add("brand");
        else s.classList.add("hov");
        s.addEventListener("mouseleave", () => {
          s.classList.remove("hov", "brand");
          removeToolTip();
        });
      });
    });
    card.append(sDie.firstChild);
    return card;
  };
  
  body.addEventListener("mousedown", () => {
    body.classList.add("mouse-down");
    removeToolTip();
  });
  
  body.addEventListener("mouseup", () => {
    body.classList.remove("mouse-down");
  });
  
  const upgradeFace = async (face, broken) => {
    return new Promise(async (resolve, reject) => {
      let prev = makeElmnt("li", `die-item dot${face.length} upgrade`, 0, body);
      if(broken) prev.classList.add('broken');
      face.forEach((v) => {
        if (v == v.toLowerCase())
          makeElmnt("p", "dot", `<span class="curse">${v}</span>`, prev);
        else makeElmnt("p", "dot", `<span>${v}</span>`, prev);
      });
      playSound("upgrade");
      await sleep(1000);
      prev.style.opacity = "0";
      await sleep(500);
      prev.remove();
      resolve("");
    });
  };
  
  const AdjustDie = makeElmnt("p", "btn adjust", "Adjust Dice", body);
  AdjustDie.addEventListener("click", () => {
    openInventory(false);
  });
  hoverSound(AdjustDie, "hover");
  
  let brandmarks = ["w", "e", "h", "a", "c"];
  
  const addBrandmark = async (type) => {
    if (!type) type = brandmarks[await random(seed[7], brandmarks.length - 1)];
    let addCurse = false;
    while (addCurse == false) {
      let r1 = Math.floor(Math.random() * pl.dieArr.length);
      let r2 = Math.floor(Math.random() * 6);
  
      if (
        pl.dieArr[r1].faceVal[r2][0] != pl.dieArr[r1].faceVal[r2][0].toLowerCase()
      ) {
        pl.spareFaces.push(pl.dieArr[r1].faceVal[r2]);
        pl.dieArr[r1].faceVal[r2] = [type];
        addCurse = true;
        upgradeFace([type]);
      }
    }
  };
  //STANDARD FUNCTIONS
  
  const shuffle = async (array, seed) => {
    return new Promise(async (resolve, reject) => {
      for (let i = array.length - 1; i > 0; i--) {
        let j = await random(seed, i);
        [array[i], array[j]] = [array[j], array[i]];
      }
      resolve();
    });
  };
  
  //HEAL
  const heal = async (target, val) => {
    if (!target.AoH) target.AoH = 0;
    if (target.AoH == 1 && val > 0) val += 1;
    //IF PLAYER TAKES EVENT DMG
    if (val < 0) {
      playSound("F");
      body.classList.add("shake");
      setTimeout(() => {
        body.classList.remove("shake");
      }, 200);
      //IF HEALING
    } else if (val > 0) {
      playSound("H");
      body.classList.add("heal");
      setTimeout(() => {
        body.classList.remove("heal");
      }, 1000);
    }
    if (target.mhp - target.hp < val) val = target.mhp - target.hp;
    target.hp += val;
    if (target.hp < 0) target.hp = 0;
    if (target.container) {
      let dam = makeElmnt("p", "dam", val, target.container);
      if (val == 0) dam.innerText = "Full";
      dam.style.color = "lime";
      await sleep(50);
      dam.style.left = `${Math.random() * 200 - 50}%`;
      target.hpMeter.style.width = `${(90 / target.mhp) * target.hp + 10}%`;
      target.hpAMeter.style.width = `${(90 / target.mhp) * target.hp + 10}%`;
      target.hpCounter.innerText = `${target.hp}/${target.mhp}`;
    }
    if(pl.hp <= 0) EndGame(false);
    pl.hptrack = document.querySelector('.hp-track')
    if (target == pl) pl.hptrack.innerHTML = `<span>H</span>${pl.hp}/${pl.mhp}`;
  };
  
  const addTreasure = (tr, char, load) => {
    if(!load) playSound('pickup')
    if(tr == undefined) tr = C0;
    tr = window[tr.id];
    //CREATE IMAGE
    let image = getSVG(tr.id);
    image.classList = `treasure ${tr.id}`
    char.trCon.append(image);
    if(!load) tr.effect(char);
    //ADD TOOLTIP
    image.addEventListener("mouseenter", () => {
      addToolTip(0, 0, 0, tr.tip);
    });
    image.addEventListener("mouseleave", () => {
      removeToolTip();
    });
    //ADD TREASURE DESCRIPTION CARD
    image.addEventListener("click", () => {
      //REMOVE OLD MODAL
      document.querySelectorAll(".tr-modal").forEach((m) => {
        m.remove();
      });
      //CREATE NEW MODAL
      let trModal = makeElmnt("div", "tr-modal", 0, body);
      //REMOVE ON CLICK
      trModal.addEventListener("click", trModal.remove);
      //CREATE CARD
      trModal.card = makeElmnt("div", "card", 0, trModal);
      //ADD NAME
      makeElmnt("h2", "", tr.name, trModal.card);
      //ADD IMAGE AND DESCRIPTION
      makeElmnt("p", "", tr.tip, trModal.card);
      //ADD MOTTO
      makeElmnt("i", "", tr.mot, trModal.card);
    });
    if (char == pl) pl.treasures.push(tr);
  };
  
  const removeTreasure = (tr, char) => {
    tr.removeEffect(char);
    document.querySelector(`.${tr.id}`).remove();
    removeFromArray(char.treasures, tr);
  };
  
  const addResource = async (type, val) => {
    pl.resourses[type] += val;
    //GET LOOT COUNTER
    let counter = document.querySelector(`.r${type}`);
    while (parseInt(counter.innerText) != pl.resourses[type]) {
      updateResources(type);
      await sleep(50);
      if (parseInt(counter.innerText) == pl.resourses[type]) {
        break;
      }
    }
    counter.innerText = pl.resourses[type];
  };
  
  const updateResources = async (type) => {
    let counter = document.querySelector(`.r${type}`);
    if (parseInt(counter.innerText) < pl.resourses[type]) {
      counter.innerText = parseInt(counter.innerText) + 1;
    }
    if (parseInt(counter.innerText) > pl.resourses[type]) {
      counter.innerText = parseInt(counter.innerText) - 1;
    }
  };
  
  const addCrew = async (val) => {
    let countStart = parseInt(pl.crew);
    pl.crew += val;
    let counter = document.querySelector(`.crew-track`);
    while (countStart != pl.crew) {
      await sleep(250);
      if (val > 0) countStart++;
      else countStart--;
      counter.innerHTML = `<span>c</span>${countStart}`;
    }
  };
  
  const tutText = [
    'Defeat enemies by playing the dice above your character!<br><br>Dice can be <b>rerolled</b> a few times each turn by clicking on the rerolldice under your character.<br>Once you are out of dice, end your turn.<br><br>At the start of your turn, your dice return above your character and your <b>rerolls</b> are replenished.',
    '<b>Hover</b> over your dice to see what there symbols do.<br>Then <b>drag</b> the dice over the character you want to use it on.<br><br>Play defensive symbols to gain <b>shield</b> when enemies are about to attack you.<br><br><b>Shield</b> reduces incoming attack damage but can not be higher than your maximum health ( max hp ).',
    `During your turn you can observe an enemy's <b>intent</b> above them.<br><br><b>Hover</b> over an enemy's dice to see what other <b>intentions</b> your enemie can have in the future.<br><br>If an enemie is intent on attacking you, be sure to gain some <b>shield</b>!`
  ]
  
  const playTut = ()=>{
    return new Promise((resolve)=>{
      pl.tut = false;
      let tut = makeElmnt('section', 'tut-screen', '', body);
      for(i=1;i<4;i++){
        let tutImg = makeElmnt('img', `tut-image img${i} tut${i}`, '', tut);
        tutImg.src = `./images/tut${i}.jpg`
        makeElmnt('p', `tut-text tut-text${i} tut${i}`, tutText[i - 1], tut);
        makeElmnt('p', `tuto tut${i}`, `Tutorial<br><i>[ Page ${i} of 3 ]</i>`, tut);
        let next = makeElmnt('p', `btn tut-btn${i} tut${i}`, 'Next', tut);
        next.ind = i;
        hoverSound(next, 'hover');
        if(i == 3) next.innerText = 'Close';
        next.addEventListener('click', ()=>{
          playSound('paper2');
          if(next.ind == 3){
            tut.remove();
            resolve();
          } else {
            document.querySelectorAll(`.tut${next.ind}`).forEach(e=>{
              e.style = 'opacity: 0; pointer-events: none;';
            })
            document.querySelectorAll(`.tut${next.ind + 1}`).forEach(e=>{
              e.style = 'opacity: 1; pointer-events: all;';
            })
          }
        })
      }
    })
  }
  
  
  const Load = ()=>{
    pl = JSON.parse(window.localStorage.getItem('player'));
    pl.trCon = document.querySelector(".treasures");
    makeElmnt("div","",`<p>${pl.user}</p><p>${pl.name}</p>`,document.querySelector(".pl-stats"));
    let plSt = makeElmnt("div", "", "", document.querySelector(".pl-stats"));
    pl.hptrack = makeElmnt("div","hp-track",`<span>H</span>${pl.hp}/${pl.mhp}`,plSt);
    let icon = getSVG(`a-${pl.name}`);
    document.querySelector(".pl-icon").append(icon);
    pl.treasures = [];
    pl.noTreas = 0;
    pl.comTr.forEach((t, i)=>{pl.comTr[i] = window[t]});
    pl.uncomTr.forEach((t, i)=>{pl.uncomTr[i] = window[t]});
    pl.rareTr.forEach((t, i)=>{pl.rareTr[i] = window[t]});
    pl.shopTr.forEach((t, i)=>{pl.shopTr[i] = window[t]});
    pl.gemArr.forEach((t, i)=>{pl.gemArr[i] = window[t]});
    pl.mayanArr.forEach((t, i)=>{pl.mayanArr[i] = window[t]});
    if(pl.SavedTreasures) pl.SavedTreasures.forEach(t=>{
      t = window[t];
      addTreasure(t, pl, true);
    });
    pl.resourses.forEach((r, i)=>{
      document.querySelector(`.r${i}`).innerHTML = r;
    })

    for(i = 0; i < 40; i++){
      let obj = window[`C${i}`];
      let tip = getSVG(`C${i}`);
      obj.tip = `<span>${tip.outerHTML}</span>${obj.tip}`;
    }
  
    if(pl.stage > 0){
      allenemies.forEach(e=>{
        e.hp += 8 * pl.stage;
        e.dieArr.forEach(d=>{
          d.faceVal.forEach(v=>{
            for(i = 0; i < pl.stage; i++)
            if(v.length < 6 && v[0] != v[0].toLowerCase()) v.push(v[0]);
          })
        })
      })
    }
  }
  Load();
  
  
  const Save = ()=>{
    pl.SavedTreasures = [];
    pl.treasures.forEach((t)=>{
      pl.SavedTreasures.push(t.id);
    })
    pl.comTr.forEach((t, i)=>{pl.comTr[i] = t.id});
    pl.uncomTr.forEach((t, i)=>{pl.uncomTr[i] = t.id});
    pl.rareTr.forEach((t, i)=>{pl.rareTr[i] = t.id});
    pl.shopTr.forEach((t, i)=>{pl.shopTr[i] = t.id});
    pl.gemArr.forEach((t, i)=>{pl.gemArr[i] = t.id});
    pl.mayanArr.forEach((t, i)=>{pl.mayanArr[i] = window[t]});
    pl.dieArr.forEach(d=>{
      d.owner = {};
      d.die = '';
      d.target = '';
    })
    pl.reDie = '';
    pl.container = '';
    pl.seed = seed;
    window.localStorage.setItem('player', JSON.stringify(pl));
  }
  
  const resetPlayerObj = ()=>{
    pl = {
      user: 'HannekePanneke',
      name: 'Charles',
      hp: 30,
      mhp: 30,
      treasures: [],
      trCon: document.querySelector(".treasures"),
      dieArr: [
        {
          faceVal: [["S"], ["S"], ["S"], ["F"], ["F"], ["C"]],
        },
        {
          faceVal: [["w"], ["S"], ["F"], ["F"], ["F", "F"], ["G"]],
        },
      ],
      spareFaces: [],
      reroll: 0,
      maxRoll: 3,
      resourses: [99, 0, 0, 0, 0, 0],
      vol: 1,
      pirDef: 0,
      quaDef: 0,
      bossDef: 0,
      floorLvl: 0,
      stage: 0,
      score: 0,
      comTr: ["C1", "C3", "C25", "C33", "C34", "C35"],
      uncomTr: ["C4", "C7", "C8", "C2", "C18", "C29"],
      rareTr: ["C27", "C6", "C32", "C36"],
      shopTr: ["C19", "C20", "C21", "C23", "C8"],
      gemArr: ["C12", "C11", "C16", "C14", "C15"],
      mayanArr: ["C13", "C26", "C28", "C22"],
      seed: [],
      CostumsSeed: '',
      landEvents: ['Market', 'MonkeyJungle', 'shadyMerchant', 'intoTheFog', 'piratecave', 'Butcher', 'DeadPirate', 'CursedHammer'],
      seaEvents: ['Gamble', 'Dive', 'UnderwaterChest', 'Whirlpool'],
    }
  }


let tooltip = makeElmnt("div", "tooltip", "", body);
const dragTooltip = (e) => {
  pos3 = e.clientX;
  pos4 = e.clientY;
  if (pos3 < window.innerWidth / 5) pos3 = window.innerWidth / 5;
  else if (pos3 > (window.innerWidth / 5) * 4)
    pos3 = (window.innerWidth / 5) * 4;
  let btm = (window.innerHeight / 10) * 9.5;
  btm -= tooltip.clientHeight * 1.5;
  if (pos4 > btm) pos4 = btm;
  tooltip.style.top = pos4 + "px";
  tooltip.style.left = pos3 + "px";
};
body.onmousemove = dragTooltip;

let hov = false;

const tips = {
  B: `Deals <strong class="dmg">2</strong> dmg to all enemy's for every symbol on this face`,
  C: `Deals <strong class="dmg">3</strong> dmg for every symbol on this face`,
  D: `Deals <strong class="dmg">1</strong> dmg + 1 dmg for every <strong class="inline"><span>D</span></strong> played this turn`,
  E: `Deals <strong class="dmg">2</strong> dmg for every symbol on this face. Gain 1 shield if the target has shield`,
  F: `Deals <strong class="dmg">2</strong> dmg and has 5% chance to stun a enemy for every symbol on this face`,
  G: `Deals <strong class="dmg">4</strong> dmg for every symbol on this face and turns it into a <strong class="inline"><span>J</span></strong>`,
  H: `Heal 1 hp for every symbol on this face`,
  I: `Grants 3 shield and applies 1 weak for every symbol on this face`,
  J: `Turns every symbol on this face into a <strong class="inline"><span>G</span></strong>`,
  K: `Deals <strong class="dmg">1</strong> dmg and applies 1 weak for very symbol on this face`,
  P: `Apply 1 poison for every symbol on this face`,
  Q: `???`,
  R: `Deals <strong class="dmg">2</strong> piercing dmg for every symbol on this face`,
  S: `Grants 2 shield for every symbol on this face`,
  T: `Deals dmg equal to your shield and lose 50% of your shield for every symbol on this face`,
  X: `Grants 1 rage for every symbol on this face`,
  a: `Chain this die when this dieface is rolled`,
  c: `Chain a random die when this dieface is rolled`,
  e: `Gain 1 blind when this dieface is rolled`,
  h: `lose 1 reroll when this dieface is rolled`,
  q: `???`,
  w: `Gain 1 weak when this dieface is rolled`,
  x: `This dieface can't be rolled`,
};

const addToolTip = async (dieobj, die, face, str) => {
  //ADD HOVER STATE
  hov = true;
  if (face === "") return;
  //CHECK IF STILL HOVERING
  if (hov == true) {
    //RESET INNER TOOLTIP
    tooltip.innerHTML = "";
    tooltip.style.opacity = "0";
    tooltip.style.display = "";
    //CREATE TOOLTIP CONTENT
    let innerTool = makeElmnt("div", "inner-tool", "", tooltip);

    //ADD DIEPREVIEW
    if (dieobj != 0) {
      //PREVIEW CONTAINER
      let dC = makeElmnt("div", "die-con", dieobj, innerTool);
      //RESET ROTATION
      dC.childNodes.forEach((n) => (n.dataset.side = 1));
      //HIGHLIGHT CURRENT ROLL
      if(die) dC.childNodes[die.die.dataset.roll - 1].style = "transform: scale(1.2);";
    }

    //SET FACE VALUE
    if(die){
      if (die.roll != undefined) face = die.roll[0];
    }

    //CREATE TIP CONTAINER
    let tip = makeElmnt("div", "tip", "", innerTool);

    //ADD TIP FOR EVERY SYMBOL TYPE, IF FACE != UNDEFINED
    if (!str && face) {
      tip.innerHTML = `<span>${face}</span><p>${tips[face]}</p>`;
      if (die && tip.querySelector(".dmg")) {
        let temp = tip.querySelector(".dmg").innerHTML;
        let current =
          parseInt(tip.querySelector(".dmg").innerHTML) +
          die.owner.r -
          die.owner.weak;
        if (die.owner.Ruby) current += die.owner.r;
        if (current < 0) current = 0;
        tip.querySelector(".dmg").innerHTML = current;
        if (current > temp) {
          tip.querySelector(".dmg").style.color = "#679d4a";
        } else if (current < temp) {
          tip.querySelector(".dmg").style.color = "firebrick";
        }
      }
      //ADD COSTOME STRING;
    } else if(str) tip.innerHTML = str;
    else tip.remove();
  }

  //SHOW TOOLTIP
  await sleep(800);
  if (hov == true) tooltip.style.opacity = "1";
};

const removeToolTip = () => {
  hov = false;
  tooltip.style.display = "none";
  tooltip.style.opacity = 0;
};


//SEED INDEX TRACKER
let indexNumber = 0;

//GET RANDOM SEED NUMBER
const random = async (se, max) => {
  if (!se.arr) se.arr = [];
  //RESET SEED TO NEW NUMBER += 7
  if (se.arr[indexNumber] == undefined) {
    se.arr = [];
    indexNumber = 0;
    //TURN NUMBER INTO STRING
    let sSeed = se.val.toString();
    //PUSH LATEST 2 NUMBER OF THE VALUE
    se.arr.push(sSeed.charAt(sSeed.length - 2));
    se.arr.push(sSeed.charAt(sSeed.length - 1));
    //ADD 7 TO THE NEW SEED VALUE
    se.val += 7;
  }
  //SET RANDOM NUMBER TO CURRENT INDEX
  let randomNumber = parseInt(se.arr[indexNumber]);
  //SET INDEX FOR NEXT REQUEST
  indexNumber++;

  //CHECK IF NUMBER IS LOWER THAN REQUESTED MAX
  while (randomNumber > max || Number.isNaN(randomNumber)) {
    randomNumber = await random(se, max);
  }
  //RETURN RANDOM VALUE
  return randomNumber;
};

let seed = [];
let Cipher = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
if(!pl.seed || pl.floorLvl == 0){
  // let CostumSeed = '';
  // let CostumSeed = 'fjnf627g';
  let CostumSeed = '';
  if(pl.CostumSeed) CostumSeed = pl.CostumSeed;
  for (i = 0; i < 8; i++) {
    let newVal = Math.floor(Math.random() * 36)
    let newSeed = { val: newVal, arr: [], root: newVal};
    if (CostumSeed.length != 0)
    newSeed = { val: parseInt(Cipher.indexOf(CostumSeed[i])), arr: [], root: parseInt(Cipher.indexOf(CostumSeed[i])),};
    if(pl.SavedSeed) newSeed = pl.SavedSeed;
    seed.push(newSeed);
    random(seed[i], 9);
  }
} else seed = pl.seed;
let seedDis = document.querySelector(".seed");
let seedCheck = []
for (i = 0; i < 8; i++) {
  makeElmnt("div", "cipher", Cipher[seed[i].root], seedDis);
  seedCheck.push(Cipher[seed[i].root]);
}

const removeFromArray = async (arr, obj) => {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] == obj) {
      arr.splice(i, 1);
    }
  }
};


async function rollDice(die) {
    if (die.classList.contains("chained")) return;
  
    // let result = 6;
    let result = (await random(seed[1], 5)) + 1;
  
    if (die.obj.faceVal[result - 1] == "x") result = await newResult(die.obj);
    die.dataset.roll = result;
    die.obj.roll = die.obj.faceVal[result - 1];
    toggleClasses(die);
  
    await sleep(1200);
    let owner = die.obj.owner;
    let val = die.obj.faceVal[result - 1][0];
    if(owner.container.type == 'enemy'){
      let v = die.obj.roll[0];
      if (v == "S" || v == "H" || v == "I" || v == "J") die.obj.target = owner;
      else die.obj.target = pl;
    }
    if (val == val.toLowerCase()) {
      brandMark[val](die, owner);
      if (owner.restraint == true) {
        charArr.forEach((c) => {
          if (c.type != owner.container.type) {
            brandMark[val](die, c.obj);
          }
        });
      }
    }
  }
  
  const brandMark = {
    a: (die) => {
      die.classList.add("chained");
      playSound("chain");
    },
    c: (die, owner) => {
      owner.dieArr[
        Math.floor(Math.random() * owner.dieArr.length)
      ].die.classList.add("chained");
      playSound("chain");
    },
    e: (die, owner) => addStatus("b", 1, owner),
    h: (die, owner) => {
      owner.reroll--;
      pl.reDie.firstChild.dataset.roll = pl.reroll;
      toggleClasses(pl.reDie.firstChild);
    },
    w: (die, owner) => {
      addStatus("w", 1, owner);
    },
    q: (die, owner) => {
      let effect = eval(owner.effect);
          effect();
    },
  };
  
  const newResult = async (die) => {
    return new Promise(async(resolve, reject)=>{
      let val = (await random(seed[1], 5));
      if(die.faceVal[val] != 'x') resolve(val);
      else val = await newResult();
      resolve(val)
    })
  };
  
  function toggleClasses(die) {
    die.classList.toggle("odd-roll");
    die.classList.toggle("even-roll");
  }
  
  const makeDie = (obj, owner) => {
    obj.faces = [1, 2, 3, 4, 5, 6];
    obj.owner = owner;
    dieCont = makeElmnt("div", "die-conta");
    obj.die = makeElmnt("ol", "die-list even-roll", "", dieCont);
    obj.die.id = obj.owner.name;
    obj.die.dataset.roll = 1;
    obj.die.obj = obj;
    dieCont.obj = obj;
  
    for (i = 0; i < 6; i++) {
      obj.faces[i] = makeElmnt(
        "li",
        `die-item dot${obj.faceVal[i].length}`,
        "",
        obj.die
      );
      obj.faces[i].dataset.side = i + 1;
      obj.faceVal[i].forEach((v) => {
        if (v == v.toLowerCase())
          makeElmnt("p", "dot", `<span class="curse">${v}</span>`, obj.faces[i]);
        else makeElmnt("p", "dot", `<span>${v}</span>`, obj.faces[i]);
      });
      if(obj.broken) obj.faces[i].classList.add('broken');
    }
    return dieCont;
  };

  
  const mapIcon = document.querySelector(".map-icon");
let mapOpen = false;
const modal = document.querySelector(".modal");
const map = document.querySelector(".map");
const mapContainer = document.querySelector(".map-container");
let waveCount = 0;
let waveTotal = 14;
let inRoom = false;
let roomType = [
  ["A"],
  ["?", "A", 'A'],
  ["?", "A", "!", "S"],
  ["A", "M", "?"],
  ["A", "A", "R", "T"],
  ["!", "F", "M", 'A'],
  ["R", "?", "C"],
  ["A", "A", "S", "?", "?", "!"],
  ["A", "C", "M", "R"],
  ["T", "C", "T", "C"],
  ["A", 'A', "R", "?"],
  ["A", "C", "?", "S", "S"],
  ["A", "A", "!", "?", "M"],
  ["R"],
];
const waveArr = [];
let firstWave = [
  {
    val: 0,
    pos: 0,
    next: [],
    path: 0,
  },
  {
    val: 0,
    pos: 1,
    next: [],
    path: 0,
  },
  {
    val: 0,
    pos: 2,
    next: [],
    path: 0,
  },
  {
    val: 0,
    pos: 3,
    next: [],
    path: 0,
  },
  {
    val: 0,
    pos: 4,
    next: [],
    path: 0,
  },
  {
    val: 0,
    pos: 5,
    next: [],
    path: 0,
  },
  {
    val: 0,
    pos: 6,
    next: [],
    path: 0,
  },
];

const makeMap = async () => {
  firstWave.forEach(async (r) => {
    firstWave[r.pos].val = await random(seed[0], 2);
  });
  setTimeout(async () => {
    await makeWave(firstWave);
  }, 200);
};

const makeWave = async (wave, oldWave) => {
  let offPlaceholder = 0;
  let placeholder = makeElmnt("div", "placeholder");
  placeholder.style.top = `-${14 - waveCount}px`;
  placeholder.id = `floor${waveCount + pl.floorLvl}`;
  map.insertBefore(placeholder, map.firstChild);
  if (waveCount < waveTotal) {
    let newWave = [];
    for (i = 0; i < 7; i++) {
      let r = {
        val: 0,
        pos: i,
        next: [],
        path: 0,
      };
      newWave.push(r);
    }
    let wOff = await random(seed[1], 7);
    wave.forEach(async (r) => {
      r.wave = waveCount;
      r.type = 0;
      r.room = makeElmnt("div", `room f${waveCount + pl.floorLvl}`);
      r.room.style.left = `${wOff + 0.8}vh`;
      let offSet = await random(seed[0], 9);
      r.room.style.top = `${(9 / 100) * offSet * 9 + 3}vh`;
      r.bg = makeElmnt("div", "room-bg", "", placeholder);
      r.bg.style.right = `${offPlaceholder - 0.02 * offPlaceholder}vh`;
      offPlaceholder += 12;
      map.insertBefore(r.room, map.firstChild);
      await makeRoom(r);
      if (r.val == 1 && waveCount < waveTotal) {
        let nextPath = await random(seed[1], 6);
        r.path = nextPath;
        if (nextPath == 0) {
          newWave[r.pos].val = 1;
          r.next.push(newWave[r.pos]);
        } else if (nextPath == 1) {
          if (newWave[r.pos - 1] == undefined) {
            newWave[r.pos].val = 1;
            r.next.push(newWave[r.pos]);
          } else if (
            wave[r.pos - 1].path == 2 ||
            wave[r.pos - 1].path == 3 ||
            wave[r.pos - 1].path == 5 ||
            wave[r.pos - 1].path == 6
          ) {
            newWave[r.pos].val = 1;
            r.next.push(newWave[r.pos]);
          } else {
            newWave[r.pos - 1].val = 1;
            r.next.push(newWave[r.pos - 1]);
          }
        } else if (nextPath == 2) {
          if (newWave[r.pos + 1] == undefined) {
            newWave[r.pos].val = 1;
            r.next.push(newWave[r.pos]);
          } else if (
            wave[r.pos + 1].path == 1 ||
            wave[r.pos + 1].path == 4 ||
            wave[r.pos + 1].path == 5 ||
            wave[r.pos + 1].path == 6
          ) {
            newWave[r.pos].val = 1;
            r.next.push(newWave[r.pos]);
          } else {
            newWave[r.pos + 1].val = 1;
            r.next.push(newWave[r.pos + 1]);
          }
        } else if (nextPath == 3) {
          if (newWave[r.pos + 1] == undefined) {
            newWave[r.pos].val = 1;
            r.next.push(newWave[r.pos]);
          } else if (
            wave[r.pos + 1].path == 1 ||
            wave[r.pos + 1].path == 4 ||
            wave[r.pos + 1].path == 5 ||
            wave[r.pos + 1].path == 6
          ) {
            newWave[r.pos].val = 1;
            r.next.push(newWave[r.pos]);
          } else {
            newWave[r.pos].val = 1;
            newWave[r.pos + 1].val = 1;
            r.next.push(newWave[r.pos], newWave[r.pos + 1]);
          }
        } else if (nextPath == 4) {
          if (newWave[r.pos - 1] == undefined) {
            newWave[r.pos].val = 1;
            r.next.push(newWave[r.pos]);
          } else if (
            wave[r.pos - 1].path == 2 ||
            wave[r.pos - 1].path == 3 ||
            wave[r.pos - 1].path == 5 ||
            wave[r.pos - 1].path == 6
          ) {
            newWave[r.pos].val = 1;
            r.next.push(newWave[r.pos]);
          } else {
            newWave[r.pos].val = 1;
            newWave[r.pos - 1].val = 1;
            r.next.push(newWave[r.pos], newWave[r.pos - 1]);
          }
        } else if (nextPath == 5 || nextPath == 6) {
          if (newWave[r.pos - 1] == undefined) {
            newWave[r.pos + 1].val = 1;
            r.next.push(newWave[r.pos + 1]);
          } else if (newWave[r.pos + 1] == undefined) {
            newWave[r.pos - 1].val = 1;
            r.next.push(newWave[r.pos - 1]);
          } else if (
            wave[r.pos - 1].path == 2 ||
            wave[r.pos - 1].path == 3 ||
            wave[r.pos - 1].path == 5 ||
            wave[r.pos - 1].path == 6
          ) {
            newWave[r.pos].val = 1;
            r.next.push(newWave[r.pos]);
          } else if (
            wave[r.pos + 1].path == 1 ||
            wave[r.pos + 1].path == 4 ||
            wave[r.pos + 1].path == 5 ||
            wave[r.pos + 1].path == 6
          ) {
            newWave[r.pos].val = 1;
            r.next.push(newWave[r.pos]);
          } else {
            newWave[r.pos + 1].val = 1;
            newWave[r.pos - 1].val = 1;
            r.next.push(newWave[r.pos - 1], newWave[r.pos + 1]);
          }
        }
      }
    });
    waveCount++;
    setTimeout(async () => {
      waveArr.push(wave);
      await makeWave(newWave, wave);
    }, 5);
  } else {
    let boss = {};
    boss.room = makeElmnt("div", `boss f${waveCount}`);
    let ming = getSVG('m3');
    boss.room.append(ming);
    boss.dot = makeElmnt(
      "div",
      "dot",
      `<span><strong>${roomTip["B"]}</strong>B</span>`,
      boss.room
    );
    boss.type = "B";
    hoverSound(boss.dot, "hover");
    map.insertBefore(boss.room, map.firstChild);
    setTimeout(() => {
      boss.left = boss.room.offsetLeft + boss.room.offsetWidth / 2;
      boss.top = boss.room.offsetTop + boss.room.offsetHeight / 2;
      oldWave.forEach(async (r) => {
        if (r.val > 0) r.next.push(boss);
      });
    }, 5);
  }
};

let roomTip = {};

const makeRoom = async (r) => {
 
  if (r.val == 1) {
    if (roomType[r.wave].length - 1 > 1)
      type = await random(seed[2], roomType[r.wave].length - 1);
    else type = 0;
    r.type = roomType[r.wave][type];
    if (r.type == "F") removeFromArray(roomType[r.wave], "F");
    if (r.type == undefined) r.type = "A";

    if (roomTip[r.type] == undefined) roomTip[r.type] = "event";
    r.dot = makeElmnt(
      "div",
      "dot",
      `<div><strong>${roomTip[r.type]}</strong>${r.type}</div>`,
      r.room
    );
    hoverSound(r.dot, "hover");
    if (r.type == "!" || r.type == "Y") r.typeVal = 0;
    else r.typeVal = 1;
  }
};

const makeLines = async (r) => {
  if (r.val == 1) {
    r.val = 2;
    r.next.forEach(async (n) => {
      await drawLine(n.left, n.top, r.left, r.top);
      await makeLines(n);
    });
  }
};

const drawLine = async (startX, startY, endX, endY) => {
  return new Promise(async (resolve, reject) => {
    let newLine = makeElmnt("div", "op-path", "", map);
    let boxHeight = endY - startY;
    if (endX - startX > 0 && endY - startY > 0) {
      let boxWidth = endX - startX;
      newLine.style = `position: absolute; top: ${startY}px; left: ${startX}px; width: ${boxWidth}px; height: ${
        endY - endY
      }px`;
      newLine.innerHTML = `<svg viewBox="0 0 ${boxWidth} ${
        endY - startY
      }" xmlns="http://www.w3.org/2000/svg">
      <path fill="none" d="M0,0 Q0,${
        boxHeight / ((await random(seed[1], 9)) + 15)
      } ${boxWidth / 5},${boxHeight / 5} T${(boxWidth / 5) * 2},${
        (boxHeight / 5) * 2
      } T${(boxWidth / 5) * 3},${(boxHeight / 5) * 3} T${(boxWidth / 5) * 4},${
        (boxHeight / 5) * 4
      } T${boxWidth},${boxHeight}"/>
    </svg>`;
      newLine.classList.add("one");
    } else if (endX - startX < 2 && endX - startX > -2) {
      newLine.style = `position: absolute; top: ${startY}px; left: ${
        startX - 25
      }px; width: 50px;`;
      newLine.innerHTML = `<svg viewBox="0 0 50 ${
        endY - startY
      }" xmlns="http://www.w3.org/2000/svg">
      <path fill="none" d="M25,0 Q${(await random(seed[1], 9)) + 25},10 25,${
        boxHeight / 5
      } T25,${(boxHeight / 5) * 2} T25,${(boxHeight / 5) * 3} T25,${
        (boxHeight / 5) * 4
      } T25,${boxHeight}"/>
    </svg>`;
      newLine.classList.add("r-path");
      newLine.classList.add("two");
    } else {
      let boxWidth = startX - endX;
      newLine.style = `position: absolute; top: ${startY}px; left: ${endX}px; width: ${
        startX - endX
      }px; height: ${endY - endY}px`;
      newLine.innerHTML = `<svg viewBox="0 0 ${boxWidth} ${
        endY - startY
      }" xmlns="http://www.w3.org/2000/svg">
      <path fill="none" d="M${boxWidth},0 Q${boxWidth},${
        boxHeight / ((await random(seed[1], 9)) + 15)
      } ${boxWidth - boxWidth / 5},${boxHeight / 5} T${
        boxWidth - (boxWidth / 5) * 2
      },${(boxHeight / 5) * 2} T${boxWidth - (boxWidth / 5) * 3},${
        (boxHeight / 5) * 3
      } T${boxWidth - (boxWidth / 5) * 4},${
        (boxHeight / 5) * 4
      } T0,${boxHeight}"/>
    </svg>`;
      newLine.classList.add("three");
    }
    resolve(newLine);
  });
};

let roomOptions = [];
let currentRoom = 0;

const nextRoom = async () => {
  roomOptions.forEach(async (r, i) => {
    r.dot.path = true;
    await sleep(i * 300);
    r.dot.classList.add("choose-room");
    r.dot.addEventListener("click", async () => {
      playSound("scr");
      roomOptions = [];
      if (r.opLine != undefined) {
        r.opLine.classList.remove("oppath");
        r.opLine.classList.add("chozen-path");
      }
      document.querySelectorAll(".oppath").forEach((t) => {
        t.remove();
      });
      r.dot.classList.add("prev-room");
      document.querySelectorAll(`.f${pl.floorLvl - 1}`).forEach((t) => {
        if (t.firstChild) {
          t.firstChild.classList.remove("choose-room");
          t.firstChild.style.pointerEvents = "none";
          if (!t.firstChild.classList.contains("prev-room"))
            t.firstChild.style.opacity = "0.5";
        }
      });
      document.querySelectorAll('.choose-room').forEach(r=>{
        r.classList.remove('choose-room');
      })
      closeMap();
      currentRoom = r;
      await enterRoom(r.type);
      r.next.forEach(async (n) => {
        n.opLine = await drawLine(n.left, n.top, r.left, r.top);
        n.opLine.classList.add("oppath");
        n.dot.classList.add("choose-room");
        roomOptions.push(n);
        nextRoom();
      });
    });
  });
  if (document.querySelector(".C24")) {
    waveArr[pl.floorLvl - 1 - (pl.stage * 16)].forEach(async (f, i) => {
      await sleep(i * 250);
      if (f.dot && !f.check) {
        f.check = true;
        if (!f.dot.path) {
          f.dot.classList.add("choose-room");
          f.dot.addEventListener("click", async () => {
            let wheel = document.querySelector(".C24");
            if (wheel.firstChild.innerText == 1)
              removeTreasure(C24, pl);
            else {
              let im = wheel.childNodes[1];
              wheel.innerHTML = `<p>${wheel.firstChild.innerText - 1}</p>`;
              wheel.append(im);
              playSound("wheel");
            }

            playSound("scr");
            roomOptions = [];
            if (f.dot.opLine != undefined) {
              f.dot.opLine.classList.remove("oppath");
              f.dot.opLine.classList.add("chozen-path");
            }
            document.querySelectorAll(".oppath").forEach((t) => {
              t.remove();
            });
            f.dot.classList.add("prev-room");
            document.querySelectorAll(`.f${pl.floorLvl - 1}`).forEach((t) => {
              if (t.firstChild) {
                t.firstChild.classList.remove("choose-room");
                t.firstChild.style.pointerEvents = "none";
                if (!t.firstChild.classList.contains("prev-room"))
                  t.firstChild.style.opacity = "0.5";
              }
            });
            closeMap();
            await enterRoom(f.type);
            f.next.forEach(async (n) => {
              n.opLine = await drawLine(n.left, n.top, f.left, f.top);
              n.opLine.classList.add("oppath");
              n.dot.classList.add("choose-room");
              roomOptions.push(n);
              nextRoom();
            });
          });
        }
      }
    });
  }
};

const enterRoom = async (type) => {
  return new Promise(async (resolve, reject) => {
    AdjustDie.classList.add('hidden');
    document.querySelectorAll(".scr").forEach((f) => {
      f.remove();
    });
    document.querySelectorAll(".return-btn").forEach((b) => b.remove());
    if (inRoom == false) {
      inRoom = true;
      await sleep(10);
      let room = makeElmnt("section", "scr", "", body);
      let button = makeElmnt("p", "btn continue-btn", " Weigh Anchor", room);
      hoverSound(button, "hover");
      pl.floorLvl++;
      button.addEventListener("click", () => {
        if(pl.stage > 2) pl.stage = 0;
        if(combatType == "B"){
          if(pl.stage == 2){
            EndGame(true);
            return;
          }
          // pl.floorLvl++;
          pl.stage++;
          pl.hp = pl.mhp;
          Save();
          body.style.transition = '1s ease';
          body.style.opacity = 0;
          setTimeout(()=>{
            window.location.reload();
          }, 1000)
          return;
        }
        if (pl.floorLvl == 1 || pl.floorLvl == 17 || pl.floorLvl == 33) {
          for (i = 0; i < 7; i++) {
            if (firstWave[i].type != 0) {
              roomOptions.push(firstWave[i]);
            }
          }
          nextRoom();
        }
        openMap();
        map.pick = makeElmnt('p', 'pick', 'Pick a location', body);
        resolve();
        inRoom = false;
        setTimeout(() => {
          document
            .querySelector(`#floor${pl.floorLvl - 1}`)
            .scrollIntoView({ behavior: "smooth", block: "center" });
        }, 600);
      });
      let r = await random(seed[3], 2);
      if (type == "A") {
        enterCombat(room, button, normalEnemys[pl.stage][r], "A");
        removeFromArray(normalEnemys[pl.stage], normalEnemys[pl.stage][r]);
        removeFromArray(normalEnemys[pl.stage], normalEnemys[pl.stage][0]);
      } else if (type == "C") {
        enterCombat(room, button, eliteEnemys[r], "C");
        removeFromArray(eliteEnemys, eliteEnemys[r]);
      } else if (type == "M") enterUnkownLand(room, button, mayanEvents[r]);
      else if (type == "B") {
        enterCombat(room, button, [window[pl.bosses[0]]], "B");
        removeFromArray(pl.bosses, pl.bosses[0]);
      } else if (type == "?") {
        let ranEv = await random(seed[4], 9);
        if (ranEv <= 4) enterUnkownLand(room, button, "?");
        else if (ranEv == 5) enterUnkownLand(room, button, 'Tavern');
        else if (ranEv == 6) enterUnkownLand(room, button, 'Bonfire');
        else {
          enterCombat(room, button, normalEnemys[pl.stage][r], "A");
          removeFromArray(normalEnemys[pl.stage], normalEnemys[pl.stage][r]);
        }
      } else if (type == "!") enterUnkownLand(room, button, "!");
      else if (type == "T") enterUnkownLand(room, button, 'treasureChest');
      else if (type == "S") enterUnkownLand(room, button, 'Tavern');
      else if (type == "R") enterUnkownLand(room, button, 'Bonfire');
      else if (type == "F") enterUnkownLand(room, button, 'message');
      else if (type == "event") enterUnkownLand(room, button, 'intoTheFog');
      else if (type == "pros") {
        setTimeout(()=>{
          button.click();
          makeElmnt('div', 'stage', 'Stage ' + (pl.stage + 1), body);
        }, 1000)
      } else if (type == "START") button.click();
    }
  });
};

const openMap = () => {
  playSound("paper");
  closeInventory();
  if (unopend == true) {
    unopend = false;
    waveArr.forEach((w) => {
      w.forEach((r) => {
        r.left = r.room.offsetLeft + r.room.offsetWidth / 2;
        r.top = r.room.offsetTop + r.room.offsetHeight;
        let value = 0;
        if (r.typeVal == 1) {
          value += 10000;
          if (waveArr[r.wave + 1] != undefined) {
            if (waveArr[r.wave + 1][r.pos].typeVal == 1) value += 1000;
          } else value += 1000;
          if (waveArr[r.wave][r.pos - 1] != undefined) {
            if (waveArr[r.wave][r.pos - 1].typeVal == 1) value += 100;
          }
          if (waveArr[r.wave - 1] != undefined) {
            if (waveArr[r.wave - 1][r.pos].typeVal == 1) value += 10;
          }
          if (waveArr[r.wave][r.pos + 1] != undefined) {
            if (waveArr[r.wave][r.pos + 1].typeVal == 1) value += 1;
          }
        } else {
          if (waveArr[r.wave + 1] == undefined)
            value += Math.floor(Math.random() * 2) * 10 + 20;
        }
        if (value > 0){
          let mimg = getSVG(`m${value}`);
          r.bg.append(mimg);
        }
      });
    });
    firstWave.forEach(async (r) => {
      await makeLines(r);
    });

    setTimeout(() => {
      document
        .querySelector(`#floor${pl.floorLvl}`)
        .scrollIntoView({ behavior: "smooth", block: "center" });
    }, 1500);
  }
  modal.style.opacity = "1";
  modal.style.pointerEvents = "all";
  mapOpen = true;
  mapContainer.style.opacity = "1";
  mapContainer.style.pointerEvents = "";
  mapContainer.classList.add("open-map");
  let closeBtn = makeElmnt("p", "btn close-map", "Close Map", body);
  closeBtn.addEventListener("click", closeMap);
};

const closeMap = () => {
  map.pick.remove();
  playSound("paper2");
  if (document.querySelector(".close-map"))
    document.querySelector(".close-map").remove();
  modal.style.opacity = "0";
  modal.style.pointerEvents = "none";
  mapOpen = false;
  mapContainer.style.opacity = "0";
  mapContainer.style.pointerEvents = "none";
  mapIcon.style.pointerEvents = "none";
  setTimeout(() => {
    mapContainer.classList.remove("open-map");
    mapIcon.style.pointerEvents = "";
    modal.style.pointerEvents = "none";
  }, 500);
};

let unopend = true;

mapIcon.addEventListener("click", () => {
  if (mapOpen == false) {
    openMap();
  } else {
    closeMap();
  }
});

let charArr = [];
let playerArr = [];
let enemyArr = [];
let dragging = false;
let roomA = 0;
let win = true;
let button = 0;
let loot = [];
let combatType = "";
let BG = document.querySelector(".bg");

let reroll = {
  name: `reroll`,
  faces: [1, 2, 3, 4, 5, 6],
  faceVal: [["x"], ["1"], ["2"], ["3"], ["4"], ["5"]],
  roll: 0,
};

let tempTop = 0;
let tempLeft = 0;
let tempElm = 0;
let tempTrans = 0;
function dragElement(elmnt) {
  tempTop = elmnt.style.top;
  tempLeft = elmnt.style.left;
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  elmnt.onmousedown = dragMouseDown;
  elmnt.ontouchstart = dragMouseDown;

  function dragMouseDown(e) {
    playSound("click");
    elmnt.tempTrans = elmnt.parentElement.style.transform;
    elmnt.parentElement.style.transform = "";
    elmnt.style.pointerEvents = "none";
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.ontouchend = closeDragElement;
    document.onmousemove = elementDrag;
    document.ontouchmove = elementDrag;
    let dieVal = elmnt.obj.faceVal[elmnt.dataset.roll - 1];
    dragging = dieVal;
  }

  function elementDrag(e) {
    e = e || window.event;
    if (e.type === "touchmove") {
      pos1 = pos3 - e.touches[0].clientX;
      pos2 = pos4 - e.touches[0].clientY;
      pos3 = e.touches[0].clientX;
      pos4 = e.touches[0].clientY;

      charArr.forEach((c) => {
        if (
          elmnt.getBoundingClientRect().x > c.getBoundingClientRect().x &&
          elmnt.getBoundingClientRect().x <
            c.getBoundingClientRect().x + c.getBoundingClientRect().width &&
          elmnt.getBoundingClientRect().y > c.getBoundingClientRect().y &&
          elmnt.getBoundingClientRect().y <
            c.getBoundingClientRect().y + c.getBoundingClientRect().height
        ) {
          if (
            dragging[0] == "H" ||
            dragging[0] == "I" ||
            dragging[0] == "J" ||
            dragging[0] == "Q" ||
            dragging[0] == "S" ||
            dragging[0] == "X"
          ) {
            if (c.type == "player") c.classList.add("hovering");
          } else if (
            dragging[0] == "B" ||
            dragging[0] == "C" ||
            dragging[0] == "D" ||
            dragging[0] == "E" ||
            dragging[0] == "F" ||
            dragging[0] == "G" ||
            dragging[0] == "K" ||
            dragging[0] == "P" ||
            dragging[0] == "R" ||
            dragging[0] == "T"
          ) {
            if (c.type == "enemy") c.classList.add("hovering");
          }
        } else c.classList.remove("hovering");
      });
    } else {
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
    }

    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    let delay = 0;
    elmnt.style.pointerEvents = "";
    if (document.querySelector(".hovering") != null) {
      elmnt.style.pointerEvents = "none";
      elmnt.parentElement.style.pointerEvents = "none";
      let target = document.querySelector(".hovering").obj;
      let dieVal = elmnt.obj.faceVal[elmnt.dataset.roll - 1];
      useDie(pl, elmnt, target, dieVal);
      delay = 1000;
      document.querySelectorAll(".hovering").forEach((h) => {
        h.classList.remove("hovering");
      });
    }
    dragging = [0];
    document.onmouseup = null;
    document.ontouchend = null;
    document.onmousemove = null;
    document.ontouchmove = null;
    setTimeout(() => {
      elmnt.parentElement.style.transform = elmnt.tempTrans;
      elmnt.style.top = tempTop;
      elmnt.style.left = tempLeft;
    }, delay);
  }
}

async function dragElementB(elmnt, upgr) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  elmnt.onmousedown = dragMouseDownB;
  elmnt.ontouchstart = dragMouseDownB;

  async function dragMouseDownB(e) {
    let mouseDown = true;
    elmnt.classList.add("die-body");
    elmnt.addEventListener("mouseup", async () => {
      mouseDown = false;
      if (document.querySelector(".up-cont")) {
        let upgrade = await upgradeDieface(elmnt, elmnt.val);
        if (upgrade) {
          elmnt.classList.remove(`dot${pl.spareFaces[elmnt.ind].length}`);
          pl.spareFaces[elmnt.ind].push(pl.spareFaces[elmnt.ind][0]);
          makeElmnt(
            "p",
            "dot",
            `<span>${pl.spareFaces[elmnt.ind][0]}</span>`,
            elmnt
          );
          elmnt.classList.add(`dot${pl.spareFaces[elmnt.ind].length}`);
          upgradeFace(pl.spareFaces[elmnt.ind]);
        }
      }
    });
    setTimeout(() => {
      if (mouseDown == true) {
        elmnt.style.pointerEvents = "none";
      }
    }, 200);
    tempElm = elmnt.parentElement;
    elmnt.style.top =
      elmnt.parentElement.offsetTop +
      elmnt.parentElement.parentElement.offsetTop +
      "px";
    elmnt.style.left =
      elmnt.parentElement.offsetLeft +
      elmnt.parentElement.parentElement.offsetLeft +
      "px";
    body.append(elmnt);

    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElementB;
    document.ontouchend = closeDragElementB;
    document.onmousemove = elementDragB;
    document.ontouchmove = elementDragB;
  }

  function elementDragB(e) {
    e = e || window.event;
    if (e.type === "touchmove") {
      pos1 = pos3 - e.touches[0].clientX;
      pos2 = pos4 - e.touches[0].clientY;
      pos3 = e.touches[0].clientX;
      pos4 = e.touches[0].clientY;

      document.querySelectorAll(".mobile-hov").forEach((c) => {
        if (
          elmnt.getBoundingClientRect().x +
            elmnt.getBoundingClientRect().width / 2 >
            c.getBoundingClientRect().x &&
          elmnt.getBoundingClientRect().x +
            elmnt.getBoundingClientRect().width / 2 <
            c.getBoundingClientRect().x + c.getBoundingClientRect().width &&
          elmnt.getBoundingClientRect().y +
            elmnt.getBoundingClientRect().width / 2 >
            c.getBoundingClientRect().y &&
          elmnt.getBoundingClientRect().y +
            elmnt.getBoundingClientRect().width / 2 <
            c.getBoundingClientRect().y + c.getBoundingClientRect().height &&
          elmnt.firstChild.firstChild.innerText !=
            elmnt.firstChild.firstChild.innerText.toLowerCase()
        )
          c.classList.add("hov");
        else c.classList.remove("hov");
      });
    } else {
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
    }

    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElementB() {
    if (document.querySelector(".hov") != null) {
      if (win) {
        let replaceFace = document.querySelector(".hov");
        changeDieFace(replaceFace.parentElement, replaceFace, elmnt);
      } else {
        let warning = makeElmnt(
          "p",
          "warning",
          `You can't change your dice during battle`,
          body
        );
        setTimeout(() => {
          warning.remove();
        }, 2500);
      }
    }
    if (document.querySelector(".brand")) {
      let warning = makeElmnt(
        "p",
        "warning",
        `You can't change branding marks on your dice`,
        body
      );
      setTimeout(() => {
        warning.remove();
      }, 2500);
    }
    elmnt.style.pointerEvents = "";
    // elmnt.style.transform = elmnt.tempTrans;
    document.onmouseup = null;
    document.ontouchend = null;
    document.onmousemove = null;
    document.ontouchmove = null;
    elmnt.style.top = "-28%";
    elmnt.style.left = "-28%";
    tempElm.append(elmnt);
  }
}

const enterCombat = async (room, btn, enArr, type) => {
  firstTurn = true;
  combatType = type;
  battleModal.style.opacity = "1";
  await sleep(800);
  enemyArr = [];
  charArr = [];
  inUse = false;
  button = btn;
  win = false;
  pl.dp = 0;
  changeBackground("combat-bg");
  btn.style = "opacity: 0; pointer-events: none;";
  roomA = room;
  room.style.pointerEvents = "none";

  //CREATE PLAYER AREA
  let playerArea = makeElmnt("div", "player-area", "", room);

  //CREATE PLAYER CHARACTER
  let plChar = createChar(pl, playerArea);
  playerArr.push(plChar);
  plChar.type = "player";
  charArr.push(plChar);

  //CREATE REROLL DICE
  pl.reDie = makeDie(reroll, pl);
  pl.reDie.classList.add("re-btn");
  pl.reDie.firstChild.dataset.roll = pl.maxRoll;
  pl.container.append(pl.reDie);
  pl.reDie.addEventListener("click", () => {
    if (pl.reroll > 1) {
      pl.reroll--;
      pl.reDie.firstChild.dataset.roll = pl.reroll;
      toggleClasses(pl.reDie.firstChild);
      let rolling = false;
      pl.dieList.forEach((d) => {
        if(!d.obj.used){
          rolling = true;
          rollDice(d);
        } 
      });
      if(rolling == true) playSound("roll");
      pl.reDie.style.pointerEvents = "none";
      setTimeout(() => {
        pl.reDie.style.pointerEvents = "";
      }, 1200);
    }
  });

  //MAKE PLAYER DICE DRAGGEBLE
  pl.dieList.forEach((d) => {
    dragElement(d);
  });

  //END TURN BUTTON
  let endTurnBtn = createMapBtn("");
  endTurnBtn.classList.add("endturn-btn");
  makeElmnt("p", "", "End Turn", endTurnBtn.firstChild);
  hoverSound(endTurnBtn, "hover");
  endTurnBtn.addEventListener("click", () => {
    endTurn();
    playSound("endturn");
  });
  room.append(endTurnBtn);

  //CREATE ENEMY AREA
  enArea = makeElmnt("div", "en-area", "", room);

  //CREATE ENEMYS
  enArr.forEach((nen) => {
    let en = JSON.parse(JSON.stringify(nen));
    let enChar = createChar(en, enArea);
    enemyArr.push(enChar);
    enChar.type = "enemy";
    charArr.push(enChar);
  });

  //ADD HOVERING INDICATOR
  charArr.forEach((c) => {
    c.char.img.addEventListener("mouseenter", () => {
      if (
        dragging[0] == "H" ||
        dragging[0] == "I" ||
        dragging[0] == "J" ||
        dragging[0] == "Q" ||
        dragging[0] == "S" ||
        dragging[0] == "X" 
      ) {
        if (c.type == "player") {
          c.classList.add("hovering");
        }
      } else if (
        dragging[0] == "B" ||
        dragging[0] == "C" ||
        dragging[0] == "D" ||
        dragging[0] == "E" ||
        dragging[0] == "F" ||
        dragging[0] == "G" ||
        dragging[0] == "K" ||
        dragging[0] == "P" ||
        dragging[0] == "R" ||
        dragging[0] == "T"
      ) {
        if (c.type == "enemy") c.classList.add("hovering");
      }
    });
    c.addEventListener("mouseleave", () => {
      c.classList.remove("hovering");
    });

    //PAPER CRANE
    if (c.obj.PCO) {
      charArr.forEach((e) => {
        if (e.type != c.type) e.obj.PC = true;
      });
    }
    if (c.obj.Ruby) addStatus("r", 1, c.obj);
    if (c.obj.C39) Shield(c.obj, 4);

    charArr.forEach(async (e) => {
      if (c.obj.Mask && e.type != c.type) addStatus("w", 1, e.obj);
      if (c.obj.Topaz && e.type != c.type) {
        e.obj.topaz = true;
        addStatus("b", 1, e.obj);
      }
    });
  });

  //OPEN BATTLE
  battleModal.style.opacity = "";
  if(pl.tut == true) await playTut();
  await sleep(1000);
  playBan("Avast Ye!");
  setTimeout(startTurn, 2000);
};

const playBan = async (str) => {
  let startCom = makeElmnt("div", "start-com", str, roomA);
  await sleep(2000);
  startCom.remove();
};

const changeBackground = async (bg) => {
  document.querySelector('.bg').remove()
  let svg = getSVG(bg);
  svg.classList.add('bg');
  body.append(svg);
  if (bg == "combat-bg") svg.style.filter = "saturate(1.3)";
  else svg.style = "";
};

const createChar = (char, container) => {
  //RESET ALL CHARACTER STATUS
  char.dp = 0;
  char.p = 0;
  char.weak = 0;
  char.r = 0;
  char.w = 0;
  char.b = 0;
  char.dagger = 0;
  char.stun = false;

  if (!char.mhp) char.mhp = char.hp;

  //CREATE CONTAINER
  char.container = makeElmnt("div", "char-container", "", container);
  char.container.obj = char;
  char.container.char = char;

  //ADD ENEMY TREASURES
  if (!char.trCon && char.enTr) {
    char.trCon = makeElmnt("div", "tr-con", "", char.container);
    char.enTr.forEach((t, i) => {
      if (char.enTr[i] === 0) {
        char.enTr[i] = pl.uncomTr[0];
        removeFromArray(pl.uncomTr, pl.uncomTr[0]);
      } else char.enTr[i] = window[char.enTr[i]];
      if (char.enTr[i]) addTreasure(char.enTr[i], char);
    });
  }

  //CREATE ELEMENTS
  makeElmnt("p", "name", char.name, char.container);
  char.img = getSVG(char.name);
  char.container.append(char.img);
  char.img.classList.add('img');
  char.efCo = makeElmnt("div", "efco", "", char.container);
  char.hpBar = makeElmnt("p", "hp-bar", "", char.container);
  char.hpCounter = makeElmnt("p", "", `${char.hp}/${char.mhp}`, char.hpBar);
  char.hpMeter = makeElmnt("div", "meter", "", char.hpBar);
  char.hpAMeter = makeElmnt("div", "a-meter", "", char.hpBar);
  char.hpMeter.style.width = `${(90 / char.mhp) * char.hp + 10}%`;
  char.hpAMeter.style.width = `${(90 / char.mhp) * char.hp + 10}%`;
  char.poisonEL = makeElmnt("div", "poison", "", char.hpMeter);
  char.dpMeter = makeElmnt("div", "dp-meter", char.dp, char.container);
  if (char.dp == 0) char.dpMeter.style.opacity = 0;
  char.statusCont = makeElmnt("div", "status-cont", "", char.container);
  char.dieCont = makeElmnt("div", "die-cont", "", char.container);

  setTimeout(async() => {
    char.img.style.transition = '1s';
    char.img.style.left = '50%';
    await sleep(1000);
    char.img.style.transition = '';

  }, Math.floor(300 + 100 * Math.random() * 5));

  //CREATE CHARACTER DICE
  char.dieList = [];
  let dieC = char.dieArr.length;
  let rot = -10 * dieC - 10;
  char.dieArr.forEach((die) => {
    let nDie = makeDie(die, char);
    nDie.addEventListener("mouseenter", () => {
      addToolTip(nDie.firstChild.innerHTML, die);
    });
    nDie.addEventListener("click", () => {
      addToolTip(nDie.firstChild.innerHTML, die);
    });
    nDie.addEventListener("mouseleave", removeToolTip);
    rot += 20;
    let h = rot;
    if (h < 0) h = h - h - h;
    nDie.style = `transform: rotate(${rot}deg); top: ${h}px;`;
    char.dieList.push(nDie.firstChild);
    char.dieCont.append(nDie);
  });
  return char.container;
};

let inUse = false;

const useDie = async (owner, die, target, val) => {
  return new Promise(async (resolve, reject) => {
    die.obj.used = true;
    while (inUse == true) await sleep(20);
    inUse = true;
    if (owner.SmB && val[0] == "B"){
      charArr.forEach(c=>{
        if(c.type != owner.container.type){
          addStatus("b", 1, c.obj);
        } 
      })
    };
    for (i = 0; i < val.length; i++) {
      if (win == false) {
        playSound(val[i]);
        //FIST
        if (val[i] == "F") {
          attack(owner, target);
          hit(target, 2, val[i], owner, 'punch', i);
          let times = 20;
          if (owner.BK) times = 7;
          let suc = Math.floor(Math.random() * times);
          if (suc == 0) {
            makeElmnt("p", "dam", "stunned", target.efCo);
            target.dieCont.childNodes.forEach(async (n, i) => {
              await sleep(150 * i);
              n.firstChild.style.transform = "none";
              n.firstChild.classList.add("stun");
              addStatus("stun", true, target);
            });
          }
          //KICK
        } else if(val[i] == "K"){
          attack(owner, target);
          hit(target, 1, val[i], owner, 'punch', i);
          addStatus('w', 1, target);
          
          //DAGGER
        } else if(val[i] == "D"){
          attack(owner, target);
          if(!owner.wetstone) owner.wetstone = 0;
          owner.dagger++;
          hit(target, owner.dagger + owner.wetstone, val[i], owner, 'slice', i);
          
          //HOOK
        } else if(val[i] == "E"){
          attack(owner, target);
          if(target.dp > 0) Shield(owner, 1);
          hit(target, 2, val[i], owner, 'slice', i);
          
          //SHIELD
        } else if (val[i] == "S") {
          Shield(target, 2);
          
          //HEAVY SHIELD
        } else if (val[i] == "I") {
          Shield(target, 3);
          addStatus("w", 1, target);
          
          //THROW SHIELD
        } else if (val[i] == "T") {
          attack(owner, target);
          hit(target, owner.dp, val[i], owner, 'punch', i);
          if(!owner.WP) Shield(owner, -Math.floor(owner.dp / 2));
          else Shield(owner, -2);
          
          //CUTLASS
        } else if (val[i] == "C") {
          attack(owner, target);
          hit(target, 3, val[i], owner, 'slice', i);

          //RAPIER
        } else if (val[i] == "R") {
          attack(owner, target);
          hit(target, 2, val[i], owner, 'slice', i);
          
          //BOMB
        } else if (val[i] == "B") {
          charArr.forEach((c) => {
            if (c.type != owner.container.type) {
              attack(owner, c.obj);
              if (c.obj == target && owner.AoC)
              hit(c.obj, 2 + owner.AoC, val[i], owner, 'punch', i);
              else hit(c.obj, 2, val[i], owner, 'punch', i);
            }
          });
          
          //FLINTLOCK
        } else if (val[i] == "G") {
          attack(owner, target);
          hit(target, 4, val[i], owner, '', i);
          val[i] = "J";
          die.childNodes[die.dataset.roll - 1].childNodes[i].innerHTML =
          "<span>J</span>";
          
          //RELOAD
        } else if (val[i] == "J") {
          val[i] = "G";
          die.childNodes[die.dataset.roll - 1].childNodes[i].innerHTML =
          "<span>G</span>";
          
          //POISON
        } else if (val[i] == "P") {
          addStatus("p", 1, target);
          attack(owner, target);
          target.poisonEL.style.width = `${(22 / target.mhp) * target.p + 3}vh`;
          
          //HEAL
        } else if (val[i] == "H") {
          target.efCo.innerHTML = "<span>H</span>";
          heal(target, 1);
          
          //FLEX
        } else if(val[i]== 'X'){
          target.efCo.innerHTML = "<span>X</span>";
          addStatus('r', 1, target);
        }
        
        die.childNodes.forEach((n) => (n.style.opacity = "0"));
        await sleep(250);
        if (i == val.length - 1) {
          resolve();
          inUse = false;
        }
      }
    }
    if(die.obj.broken){
      die.obj.broken--;
      if(die.obj.broken <= 0){
        playSound('shieldbreak');
        removeFromArray(pl.dieArr, die.obj);
        die.remove();
      }
    }
  });
};

const attack = async (owner, target) => {
  owner.img.classList.add("attack");
  target.img.classList.add("hit");
  await sleep(100);
  target.img.classList.remove("hit");
  owner.img.classList.remove("attack");
};

const statTip = {
  b: `Attacks have a 50% chance to miss. Lower this by at the end of its turn `,
  p: `loses 1 hp for each poison and lowers it by 1 at the and of its turn`,
  r: `The first symbol on a dieface deals 1 extra damage per rage this turn`,
  w: `Attacks deal 1 less damage. Lower this by 1 at the end of its turn`,
  stun: `Can't do anything this turn`,
};

//ADD STATUS ICON
const addStatus = (icon, val, target) => {
  if (icon == "p" && pl.Emerald && target != pl) val += 1;
  if (icon == "w") {
    if (target.SC == true) return;
    if (target[icon] + val > 0) {
      if (target.PC) target.weak = 2;
      else target.weak = 1;
    } else target.weak = 0;
  }

  let exist = false;

  //CHANGE STATUS VALUE
  if (val === false || val === true) target[icon] = val;
  else {
    target[icon] += val;
    if (target[icon] < 0) target[icon] = 0;
  }

  //CHECK IF EXIST
  target.statusCont.childNodes.forEach((s) => {
    if (s.st == icon) exist = s;
  });

  //CREATE NEW STATUS ELEMENT
  let newStat = {};
  if (!exist) {
    newStat = makeElmnt("div", "status", "", target.statusCont);
    newStat.st = icon;
    newStat.addEventListener("mouseenter", () => {
      addToolTip(0, 0, 0, statTip[icon]);
    });
    newStat.addEventListener("mouseleave", removeToolTip);
  }
  //CHANGE TO EXISTING ONE IF
  if (exist != false) newStat = exist;
  
  //ADD INNERHTML TO STATUS
  let svg = getSVG(`st-${icon}`);
  if (target[icon] === true){
    newStat.innerHTML = `<span></span>`;
    newStat.firstChild.append(svg);
  } else if (target[icon] >= 1){
    newStat.innerHTML = `<span><p>${target[icon]}</p></span>`;
    newStat.firstChild.append(svg);
  }
  //DELETE IF VALUE == FALSE || 0
  else {
    newStat.style = "transition: .5s; transform: scale(1.5); opacity: 0;";
    setTimeout(() => {
      newStat.remove();
    }, 1000);
  }
  let bgSvg = getSVG('st-bg');
  bgSvg.classList.add('bg');
  newStat.append(bgSvg);
};

const removeStatus = (icon, owner) => {
  owner.statusCont.childNodes.forEach((s) => {
    if (s.st == icon) {
      s.style = "transition: .5s; transform: scale(1.5); opacity: 0;";
      setTimeout(() => {
        s.remove();
      }, 1000);
    }
  });
};

const hit = async (target, val, icon, owner, ani, ind) => {
  if (owner) {
    if (owner.b > 0) {
      let miss = await random(seed[1], 1);
      if (owner.topaz) miss = await random(seed[1], 3);
      if (miss > 0) val = -1;
    }
    if (target.ss && val != "P") hit(owner, 1, undefined, undefined, 'slice');
  }
  if (owner == pl && pl.monkey && val > 0) {
    addResource(0, 1);
  }
  if(owner) {
    val -= owner.weak;
    if (ind == 0) val += owner.r;
    if (owner.Ruby && ind == 0) val += owner.r;
  }
  if (val < 0) val = -1;
  if(val >= 0 && target.RD){
    console.log('reroll')
    rollDice(target.dieList[await random(seed[1], target.dieList.length -1)])
  }
  //DMG COUNTER
  let dam = makeElmnt("p", "dam", "", target.container);
  //HIT ICON ON CONTAINER
  let anima = makeElmnt("div", '', `<div class="${ani}"></div>`, target.efCo);
  anima.style.transform = `rotate(${-45 + Math.floor(Math.random() * 90)}deg)`;
  //HIT SHIELD IF REQUIRED
  if (target.dp < val && target.dp > 0) playSound("shieldbreak");
  while (target.dp > 0 && val > 0 && icon != "R" && icon != "P") {
    Shield(target, -1);
    val--;
  }
  if (icon == "R" && val > 0 && owner.JT) {
    addStatus("p", 1, target);
    target.poisonEL.style.width = `${(22 / target.mhp) * target.p + 3}vh`;
  }
  dam.innerText = val;
  if (val == 0) {
    dam.innerText = "blocked";
    playSound("shieldon");
  }
  if (val == -1) {
    val++;
    dam.innerText = "miss";
  }
  target.hp -= val;
  if (target.hp < 0) target.hp = 0;
  if (target.sw && target.hp == 0) {
    target.hp = Math.round(target.mhp / 2);
    removeTreasure(C9, target);
    addTreasure(C10, target);
  }
  if (target == pl) pl.hptrack.innerHTML = `<span>H</span>${pl.hp}/${pl.mhp}`;
  target.hpCounter.innerText = `${target.hp}/${target.mhp}`;
  target.hpMeter.style.width = `${(90 / target.mhp) * target.hp + 10}%`;
  target.hpAMeter.style.width = `${(90 / target.mhp) * target.hp + 10}%`;
  body.classList.add("shake");
  await sleep(50);
  dam.style.left = `${Math.random() * 200 - 50}%`;
  await sleep(150);
  body.classList.remove("shake");
  if (target.hp <= 0 && !target.dead) {
    target.dead = true;
    if (target == pl) {
      win = true;
      EndGame(false);
    }
    if (target.container.type == "enemy") {
      if (target.type == "C") pl.quaDef++;
      else if (target.type == "B") pl.bossDef++;
      else pl.pirDef++;
      target.img.classList.add("death");
      setTimeout(() => {
        target.container.innerHTML = "";
      }, 1000);
      await sleep(10);
      removeFromArray(charArr, target.container);
      let enC = 0;
      charArr.forEach((c) => {
        if (c.type == "enemy" && c.obj.hp > 0) enC++;
      });
      if (target.onDeath) {
        if(enC == 0) win = true;
        let onDeath = eval(target.onDeath);
        await onDeath();
      }
      if (enC == 0 && win == false) {
        win = true;
        closeEndTurn();
        setTimeout(() => {
          pl.dieArr.forEach((d) => {
            d.faceVal.forEach((f) => {
              f.forEach((v, i) => {
                if (v == "J") f[i] = "G";
              });
            });
          });
          button.style = "";
          AdjustDie.classList.remove('hidden');
          booty();
          playSound("victory");
        }, 1000);
      }
    }
  }
};

const Shield = (char, val) => {
  char.dp += val;
  char.dpMeter.innerHTML = char.dp;
  char.dpMeter.style.opacity = "1";
  if (val > 0) char.efCo.innerHTML = "<span>S</span>";
  if (char.dp <= 0) char.dpMeter.style.opacity = "0";
};

let firstTurn = true;

//START PLAYER TURN
const startTurn = async () => {
  if (firstTurn == true) {
    if (pl.BBS == true) heal(pl, 2);
  }
  let awP = 0;
  openEndTurn();
  //RESET REROLLBUTTON
  pl.reroll = pl.maxRoll;
  pl.reDie.firstChild.dataset.roll = pl.reroll;
  toggleClasses(pl.reDie.firstChild);
  //RESET CHARACTERS
  charArr.forEach(async (c) => {
    //ENEMIES
    if (c.type == "enemy" && firstTurn == true && pl.Ame) hit(c.obj, Math.round(c.obj.mhp / 4), undefined, undefined, 'slice')
    if (c.type == "enemy" && firstTurn == false) {
      EndCharTurn(c.obj);
    }
    //RESET DICE
    playSound("roll");
    c.obj.dieList.forEach(async (d) => {
      d.obj.used = false;
      d.childNodes.forEach((n) => {
        n.style.opacity = "1";
      });
      if (c.obj.stun == false) {
        d.style.pointerEvents = "";
        d.parentElement.style.pointerEvents = "";
      }
      await sleep(10 + awP);
      //REROLL ALL DICE
      d.classList.remove("chained");
      await rollDice(d);
    });
  });
  //AWAIT POISON
  await sleep(awP);
  playBan("Player Turn");
  if(pl.noTreas > 0) addStatus('r', pl.noTreas, pl);
  if(pl.crown) addStatus('r', Math.floor(pl.resourses[0] / 200), pl);
  await sleep(800);
  roomA.style.pointerEvents = "";
};

//END PLAYER TURN
const endTurn = async () => {
  firstTurn = false;
  while (inUse) await sleep(20);
  if (pl.Diamond && pl.reroll > 1) {
    charArr.forEach((c) => {
      if (c.type == "enemy"){
        playSound('C')
        hit(c.obj, pl.reroll - 1, undefined, undefined, 'slice');
      };
    });
  }
  if (pl.Sapphire) Shield(pl, pl.reroll - 1);
  let awP = 0;
  closeEndTurn();
  let delay = 1000;
  charArr.forEach(async (c) => {
    if (c.type == "enemy" && c.obj.hp > 0) {
      delay += 500;
      for (i = c.obj.dieArr.length - 1; i >= 0; i--) {
        delay += 1000;
        let d = c.obj.dieArr[i];
        setTimeout(() => {
          if (c.obj.stun == false) useDie(c.obj, d.die, d.target, d.roll);
          else makeElmnt("p", "dam", "stunned", c.obj.efCo);
        }, delay);
      }
    } else if (c.type == "player") {
      EndCharTurn(c.obj);
    

      c.obj.dieList.forEach(async (d) => {
        d.childNodes.forEach((n) => {
          n.style.opacity = "0";
        });
      });
    }
  });
  //AWAIT POISON
  await sleep(awP);
  playBan("Enemy Turn");
  //START PLAYER TURN
    setTimeout(()=>{
      if(win == false) startTurn();
    }, delay + 2000);
};

const EndCharTurn = (char) => {
  if (char.stun == true) {
    char.dieCont.childNodes.forEach((n) => {
      n.firstChild.style.transform = "";
      n.firstChild.classList.remove("stun");
    });
    addStatus("stun", false, char);
  }

  //WEAK
  if (char.w > 0) addStatus("w", -1, char);
  //RAGE
  if (char.r > 0) addStatus("r", -100, char);
  //POISON
  if (char.p > 0) {
    // awP = 1000;
    hit(char, char.p, 'P', undefined, 'punch');
    if (pl.Emerald) addStatus("p", -3, char);
    else addStatus("p", -1, char);
    playSound("poison");
    char.poisonEL.style.width = `${(22 / char.mhp) * char.p + 3}vh`;
  }
  //BLIND
  if(char.b > 0) addStatus("b", -1, char);
  //DAGGER
  char.dagger = 0;
};

const closeEndTurn = () => {
  const endTurnButton = document.querySelector(".endturn-btn");
  endTurnButton.style.width = "2vh";
  endTurnButton.style.pointerEvents = "none";
};
const openEndTurn = () => {
  const endTurnButton = document.querySelector(".endturn-btn");
  endTurnButton.style.width = "";
  endTurnButton.style.pointerEvents = "";
};

const healing = () => {
  heal(pl, 3);
};
const crew = () => {
  console.log("crew");
};

let res = false;

//UPGRADE DICEFACE
const upgrade = async () => {
  openInventory(true);
};

const upgradeDieface = async (face) => {
  return new Promise(async (resolve, reject) => {
    document.querySelectorAll(".upgrade-cont").forEach((s) => s.remove());
    res = false;
    //UPGRADE BOX
    let mapCont = createMapBtn("");
    playSound("paper");
    mapCont.classList.add("upgrade-cont");
    let upgradeCont = makeElmnt("section", "inner-box", "", mapCont);
    let modal = makeElmnt("section", "upgrade-modal", "", mapCont);
    modal.addEventListener("click", () => {
      playSound("paper2");
      mapCont.remove();
    });
    document.querySelector(".up-cont").append(mapCont);
    //FILL DIE UPGRADE
    if (
      face.childNodes.length < 6 &&
      face.childNodes[0].innerText != face.childNodes[0].innerText.toLowerCase()
    ) {
      let copy = makeElmnt("li", face.classList, face.innerHTML, upgradeCont);
      copy.style.position = "relative";
      makeElmnt("div", "plus", "", upgradeCont);
      let cost = makeElmnt("ol", "cost", "", upgradeCont);
      makeElmnt("div", "arrow", "", upgradeCont);
      let copyP = makeElmnt("li", ``, face.innerHTML, upgradeCont);
      makeElmnt(
        "p",
        copyP.firstChild.classList,
        copyP.firstChild.innerHTML,
        copyP
      );
      copyP.classList.add(`die-item`, `dot${copyP.childNodes.length}`);
      //GET URGRADE VALUES
      let val = await upgradeResource(
        face.firstChild.firstChild.innerText,
        face.childNodes.length,
        cost
      );
      //CREATE CONFIRM BUTTON
      let con = makeElmnt("p", "btn con", "confirm", mapCont);
      //IF PLAYER HAD NOT ENOUGH RESOURSES
      if (res == false) {
        con.classList.add("no-click");
        resolve(false);
      }
      //CONFIRM ON CLICK
      con.addEventListener("click", () => {
        //REMOVE RESOURSES
        val.forEach((v) => {
          addResource(v.type, -v.val);
        });
        //CHANGE DIEFACE AND RESET UPGRADE BOX
        let newArr = [];
        for (i = 0; i < face.childNodes.length + 1; i++)
          newArr.push(face.firstChild.firstChild.innerText);
        mapCont.remove();
        resolve(true);
      });
      //IF DIEFACE VALUE IS > 6
    } else {
      let copy = makeElmnt("li", face.classList, face.innerHTML, upgradeCont);
      copy.classList.remove("die-body");
      makeElmnt("p", "max", `This dieface can't be upgraded`, upgradeCont);
      upgradeCont.style.flexDirection = "column";
      resolve(false);
    }
  });
};
//SET ARR FOR NEW DIEFACE
let newDieFaceArr = [];
//ADD DIEFACE
const addDieface = async () => {
  //CREATE CONTAINER
  let cont = makeElmnt("div", "newdiecont", "", roomA);
  setTimeout(() => {
    cont.style.opacity = "1";
  }, 10);
  //CREATE BANNER
  makeElmnt("h1", "", "Choose a new Dieface", cont);
  //CREATE VIEW BUTTON
  let closeEye = getSVG('eyeclose');
  let retBtn = makeElmnt("p", "btn return-btn", closeEye.outerHTML, body);
  let addDieOpen = true;
  retBtn.addEventListener("click", () => {
    playSound("paper");
    if (addDieOpen == true) {
      let openEye = getSVG('eyeopen')
      retBtn.innerHTML = openEye.outerHTML;
      cont.style.opacity = "0";
      cont.style.pointerEvents = "none";
      addDieOpen = false;
    } else {
      retBtn.innerHTML = closeEye.outerHTML;
      cont.style.opacity = "1";
      cont.style.pointerEvents = "";
      addDieOpen = true;
    }
  });
  //CREATE NEW DIEFACES
  let faceA = await makeNewDieFace(Math.ceil((1 / 16) * pl.floorLvl), 0, 0, true);
  let faceB = await makeNewDieFace(Math.ceil((1 / 16) * pl.floorLvl), faceA.class, 0, true, true);
  let faceD = makeElmnt('div');
  if(pl.MoOp) faceD = await makeNewDieFace(Math.ceil((1 / 16) * pl.floorLvl), faceA.class, faceB.class, true, true);
  let faceC = await makeNewDieFace(Math.ceil((1 / 16) * pl.floorLvl), faceA.class, faceB.class, true);
  if(pl.MoOp) cont.append(faceA, faceB, faceD, faceC);
  else cont.append(faceA, faceB, faceC);
};

//RETURN NEW DIEFACE
const makeNewDieFace = async (val, preA, preB, add, plus) => {
  return new Promise(async (resolve, reject) => {
    //SET VALUE FOR EVERY SYMBOL
    valArr = ["B", "S", "D", "R", "C", 'K', "G", "B", "E","T", "I", "X","F", "S", "D", "R", "C", 'K', "G", "B", "E","T", "I", "D"];
    await shuffle(valArr, seed[6]);
    //CHECK IF VALUE HAS BEEN USED
    valArr.forEach((v) => {
        if (v == preA) removeFromArray(valArr, v);
        if (v == preB) removeFromArray(valArr, v);
    });
    let newDieFaceArrTemp = [];
    //SET CHOZEN SYMBOL
    let nV = valArr[0];
    let mayanRew = ["H", "P"];
    if (combatType == "M") nV = mayanRew[await random(seed[6], 1)];
    //IF X SET VALUE TO 1, ELSE TIMES VALUE
    let faceLvl = val
    if(plus) faceLvl += 1;
    if (faceLvl > 6) faceLvl = 6;
    for (v = 0; v < faceLvl; v++) newDieFaceArrTemp.push(nV);
    //DRAW NEW DIEFACE
    let face = makeElmnt("li", `die-item dot${faceLvl} newdieface`);
    face.val = newDieFaceArrTemp;
    face.class = newDieFaceArrTemp[0];
    for (v = 0; v < newDieFaceArrTemp.length; v++)
      makeElmnt("p", "dot", `<span>${newDieFaceArrTemp[v]}</span>`, face);
    //ADD TOOLTIP
    face.addEventListener("mouseenter", () => {
      addToolTip(0, 0, nV);
      newDieFaceArr = newDieFaceArrTemp;
    });
    face.addEventListener("touchmove", () => {
      newDieFaceArr = newDieFaceArrTemp;
    });
    face.addEventListener("mouseleave", removeToolTip);
    //CLICK NEW DIEFACE
    if (add == true) {
      face.addEventListener("click", () => {
        roomA.append(face);
        face.classList.add("add-dieface");
        document.querySelector(".newdiecont").style.opacity = "0";
        document.querySelector(".return-btn").remove();
        pl.spareFaces.push(newDieFaceArrTemp);
        setTimeout(() => {
          face.remove();
          document.querySelector(".newdiecont").remove();
        }, 800);
      });
    }
    resolve(face);
  });
};

//UPGRADE A DIEFACE
const upgradeResource = (type, val, cost) => {
  return new Promise((resolve, reject) => {
    let typeArr = ["d", "r", "w", "i", "s", "f"];
    let arr = [];
    typeArr.forEach((t, i) => {
      arr.push({ type: i, s: t, val: 0 });
    });

    //TYPE VALUES AND RETURN INNERHTML
    if (type == "S") arr[2].val = 6;
    else if (type == "F") arr[1].val = 6;
    else if (type == "C") arr[3].val = 6;
    else if (type == "P") {
      arr[1].val = 4;
      arr[5].val = 2;
    } else if (type == "H") {
      arr[4].val = 4;
      arr[5].val = 2;
    } else if (type == "R") {
      arr[3].val = 4;
      arr[4].val = 2;
    } else if (type == "B") {
      arr[1].val = 4;
      arr[3].val = 2;
    } else if (type == "G") {
      arr[3].val = 4;
      arr[2].val = 2;
    } else if (type == "I") {
      arr[2].val = 4;
      arr[3].val = 2;
    } else if (type == "T") {
      arr[2].val = 4;
      arr[4].val = 2;
    } else if (type == "K") {
      arr[4].val = 4;
      arr[1].val = 2;
    } else if (type == "D") {
      arr[3].val = 4;
      arr[4].val = 2;
    }else if (type == "X") {
      arr[3].val = 4;
      arr[5].val = 2;
    }else if (type == "E") {
      arr[2].val = 4;
      arr[1].val = 2;
    }
    for (i = 0; i < val - 1; i++) {
      arr[0].val = mult(arr[0].val);
      arr[1].val = mult(arr[1].val);
      arr[2].val = mult(arr[2].val);
      arr[3].val = mult(arr[3].val);
      arr[4].val = mult(arr[4].val);
      arr[5].val = mult(arr[5].val);
    }
    if (pl.$w) arr[2].val = Math.ceil(arr[2].val / 2);
    if (pl.$r) arr[1].val = Math.ceil(arr[1].val / 2);
    if (pl.$i) arr[3].val = Math.ceil(arr[3].val / 2);
    if (pl.$s) arr[4].val = Math.ceil(arr[4].val / 2);
    if (pl.$f) arr[5].val = Math.ceil(arr[5].val / 2);
    arr.forEach((v) => {
      if (v.val > 0) makeElmnt("p", "", `<span>${v.s}</span>${v.val}`, cost);
    });

    //CHECK IF PLAYER HAS ENOUGH RESOURCES
    if (
      pl.resourses[0] >= arr[0].val &&
      pl.resourses[1] >= arr[1].val &&
      pl.resourses[2] >= arr[2].val &&
      pl.resourses[3] >= arr[3].val &&
      pl.resourses[4] >= arr[4].val &&
      pl.resourses[5] >= arr[5].val
    ) {
      res = true;
      resolve(arr);
    } else resolve();
  });
};

const mult = (val) => {
  return Math.ceil(val * 1.5);
};

//CHANGE DIEFACE
const changeDieFace = (die, dieFace, spareFace) => {
  let tempVal = die.obj.faceVal[dieFace.dataset.side - 1];
  //CHANGE VALUE INSIDE ARRAY
  die.obj.faceVal[dieFace.dataset.side - 1] = spareFace.val;
  //CHANGE VALUE INSIDE HTML DIEFACE
  dieFace.innerHTML = "";
  dieFace.classList = `die-item dot${
    die.obj.faceVal[dieFace.dataset.side - 1].length
  }`;
  if(die.obj.broken) dieFace.classList.add('broken');
  die.obj.faceVal[dieFace.dataset.side - 1].forEach((v) => {
    makeElmnt("p", "dot", `<span>${v}</span>`, dieFace);
  });
  //CHANGE VALUE OF SPAREFECE
  removeFromArray(pl.spareFaces, spareFace.val);
  spareFace.classList.remove(`dot${spareFace.val.length}`);
  spareFace.val = tempVal;
  pl.spareFaces.push(spareFace.val);
  spareFace.classList.add(`dot${spareFace.val.length}`);
  spareFace.innerHTML = "";
  spareFace.val.forEach((v) => {
    makeElmnt("p", "dot", `<span>${v}</span>`, spareFace);
  });
  if (document.querySelector(".sell-tab")) updateShop(0);
};

const createLoot = async (val) => {
  return new Promise(async (resolve, reject) => {
    //SET TEMP LOOT
    let tempLoot = [
      ["h", 0, "doubloon", 0],
      ["r", 0, "rum", 1],
      ["w", 0, "wood", 2],
      ["s", 0, "cloth", 3],
      ["i", 0, "iron", 4],
      ["f", 0, "strange flower", 5],
    ];

    //SET TOTAL LOOT = TO VALUE
    let value = 30;
    if (combatType == "M") {
      let flV = await random(seed[7], 5);
      tempLoot[5][1] = Math.floor((value / 12) * flV + 5);
      value -= tempLoot[5][1];
    } else {
      tempLoot[1][1] = await random(seed[7], 7);
      value -= tempLoot[1][1];
      tempLoot[2][1] = await random(seed[7], 7);
      value -= tempLoot[2][1];
      tempLoot[3][1] = await random(seed[7], 7);
      value -= tempLoot[3][1];
      tempLoot[4][1] = await random(seed[7], 7);
    }
    value -= tempLoot[4][1];
    tempLoot[0][1] = Math.ceil(value / 2);

    loot = tempLoot;
    resolve();
  });
};

const raiseMHP = ()=>{
  pl.mhp += 1;
  heal(pl, 1);
}

const rewardArr = [healing, upgrade, addDieface];
let opArr = [`Heal ${3 + pl.AoH} HP`, "Upgrade a Diceface", "Add a new Diceface",];

const booty = async () => {
  //GET NEW LOOT
  await createLoot(pl.floorLvl);
  //CREATE LOOTCONTAINER ORDERDLIST
  let rewardCon = makeElmnt("ol", "reward-con", "", roomA);
  //ADD PAPERTEXURE
  makeElmnt("div", "r-bg", "", rewardCon);
  //FOR EVERY LOOT TYPE
  for (i = 0; i < loot.length; i++) {
    if (loot[i][1] > 0) {
      let val = loot[i][1];
      let type = loot[i][2];
      let t = loot[i][3];
      //RESET FLOWER NAME
      if (type == "strange flower") type = "flower";
      //CREATE LOOT CONTAINER
      let lootCon = makeElmnt(
        "li",
        "loot",
        `<span>${loot[i][0]}</span> ${type} x${val}`,
        rewardCon
      );
      lootCon.type = loot[i][0];
      //ACE OF DIAMONDS
      if (loot[i][0] == "h" && pl.AoD == true) {
        lootCon.innerHTML = `<span>${
          loot[i][0]
        }</span> ${type} x${val} (+${Math.round(val * 0.3)})`;
        val = Math.round(val * 1.3);
      }
      //ADD LOOT
      lootCon.addEventListener("click", async () => {
        playSound(`loot${lootCon.type}`);
        lootCon.remove();
        addResource(t, val);
      });
    }
  }

  //ADD ENEMY TREASURE
  enemyArr.forEach((e) => {
    //CHECK IF THERE IS A TREASURE
    if (e.obj.enTr) {
      e.obj.enTr.forEach((t) => {
        //CREATE BOOTY LIST ITEM
        let newTreasure = makeElmnt(
          "li",
          "loot",
          `<span></span> ${t.name}`,
          rewardCon
        );
        let svg = getSVG(t.id);
        svg.style = 'position: relative; transform: translate(-50%);'
        newTreasure.firstChild.append(svg);
        newTreasure.addEventListener("mouseenter", () => {
          addToolTip(0, 0, 0, t.tip);
        });
        newTreasure.addEventListener("mouseleave", removeToolTip);
        newTreasure.addEventListener("click", () => {
          newTreasure.remove();
          addTreasure(t, pl);
        });
      });
    }
  });

  let LO1 = makeElmnt("div", "loot-option1 loot-option", "", rewardCon);
  let LO2 = makeElmnt("div", "loot-option2 loot-option", "", rewardCon);
  if (combatType == "M") LO1.num = 0;
  else LO1.num = await random(seed[7], rewardArr.length - 2);
  if (combatType == "M") LO2.num = 2;
  else LO2.num = (await random(seed[7], rewardArr.length - 2 - LO1.num)) + LO1.num + 1;
  if (!pl.AoH) pl.AoH = 0;
  LO1.innerText = opArr[LO1.num];
  let lootimage1 = getSVG(`reward${LO1.num}`);
  lootimage1.classList.add('loot-image');
  LO1.append(lootimage1);
  LO2.innerText = opArr[LO2.num];
  let lootimage2 = getSVG(`reward${LO2.num}`);
  lootimage2.classList.add('loot-image');
  LO2.append(lootimage2);
  LO1.addEventListener("click", async () => {
    playSound("click");
    await rewardArr[LO1.num]();
    LO1.remove();
    LO2.remove();
  });
  LO2.addEventListener("click", async () => {
    playSound("click");
    await rewardArr[LO2.num]();
    LO1.remove();
    LO2.remove();
  });

  rewardCon.childNodes.forEach((n) => {
    hoverSound(n, "hover");
  });
};

const EndGame = async (win) => {
  let deathscreen = makeElmnt("section", "death-screen", "", body);
  if(win) deathscreen.classList.add('death-win');
  else deathscreen.classList.add('death-loss');
  if (pl.container && pl.hp <= 0) pl.container.classList.add("death");
  let score = makeElmnt("ul", "score", "", deathscreen);
  await sleep(2500);
  let sA = makeElmnt(
    "li",
    "score-item",
    `Locations visited (${pl.floorLvl}):`,
    score
  );
  await sleep(500);
  let cA = makeElmnt("b", "counter", "0", sA);
  startTimer(cA, pl.floorLvl * 5);
  let sB = makeElmnt(
    "li",
    "score-item",
    `Pirates defeated (${pl.pirDef}):`,
    score
  );
  let cB = makeElmnt("b", "counter", "0", sB);
  startTimer(cB, pl.pirDef * 15);
  await sleep(500);
  let sC = makeElmnt(
    "li",
    "score-item",
    `Quartermasters defeated (${pl.quaDef}):`,
    score
  );
  let cC = makeElmnt("b", "counter", "0", sC);
  startTimer(cC, pl.quaDef * 30);
  await sleep(500);
  let sD = makeElmnt(
    "li",
    "score-item",
    `Captains defeateds (${pl.bossDef}):`,
    score
  );
  let cD = makeElmnt("b", "counter", "0", sD);
  startTimer(cD, pl.bossDef * 50);
  await sleep(500);
  let sE = makeElmnt(
    "li",
    "score-item",
    `Doubloons lefts (${pl.resourses[0]}):`,
    score
  );
  let cE = makeElmnt("b", "counter", "0", sE);
  startTimer(cE, pl.resourses[0]);
  let total = pl.floorLvl * 5 + pl.pirDef * 15 + pl.quaDef * 30 + pl.bossDef * 50 + pl.resourses[0];
  await sleep(500);
  let sF = makeElmnt("li", "score-item", `Victory?`, score);
  let cF = makeElmnt("b", "counter", "0", sF);
  if (win) {
    total += 200;
    startTimer(cF, 200);
  }
  await sleep(500);
  makeElmnt("div", "sum-line", "", score);
  let to = makeElmnt("li", "score-item", "Score", score);
  let tC = makeElmnt("b", "counter", "0", to);
  startTimer(tC, total);
  await sleep(2000);
  let mainbtn = makeElmnt('div', 'btn mainbtn', 'Main Menu', deathscreen)
  mainbtn.addEventListener('click', ()=>{
    body.style.transition = '1s ease';
    body.style.opacity = 0;
    setTimeout(() => {
      window.location = 'index.html';
    }, 1000);
  })
};

const startTimer = async (elm, val) => {
  let delay = Math.floor(2000 / val);
  while (parseInt(elm.innerText) != val) {
      elm.innerText = parseInt(elm.innerText) + 1;
      await sleep(delay);
  }
};

//THE ROYAL NAVY EVENT
royalNavy = {
    id: 'beta',
    title: "The Royal Navy",
    text: () => {
      return `While having a drink with your crew in the local tavern you notice a group of pirates getting arrested by the royal navy.<br><br>You spot one of the pirates that managed to get away walking towards you.`;
    },
    options: [
      {
        text: () => {
          return "Try to help the other pirates";
        },
        effect: (button) => {
          enterEvent(royalNavyA, button);
        },
      },
      {
        text: () => {
          return "Catch the pirate and sell him out [ gain 50 doubloons ]";
        },
        effect: (button) => {
          addResource(0, 50);
          enterEvent(royalNavyB, button);
        },
      },
      {
        req: () => {
          if (pl.resourses[0] >= 30) return true;
          else return false;
        },
        text: () => {
          return "Keep drinking [ Lose 30 doubloons ]";
        },
        effect: (button) => {
          addCrew(1);
          addResource(0, -30);
          enterEvent(royalNavyC, button);
        },
      },
    ],
  };
  royalNavyA = {
    title: "The Royal Navy",
    text: () => {
      return `You approuch the royal marines and they start drawing there swords.`;
    },
    options: [
      {
        text: () => {
          return "Fight";
        },
        effect: (button) => {
          document.querySelector(".dialog-container").remove();
          enterCombat(document.querySelector(".scr"), button, [
            royalMarine,
            royalMarine,
            royalMarine,
            royalMarine,
          ]);
        },
      },
    ],
  };
  royalNavyB = {
    id: 'beta',
    title: "The Royal Navy",
    text: () => {
      return `You catch the runaway pirate and you hand him to the royal marines.<br>For your reward they hand you 50 doubloons.<br><br>One of the guards looks at you suspiciously, you dicide to take your leave and go.`;
    },
    options: [
      {
        text: () => {
          return "Take your leave and go";
        },
        effect: (button) => {
          button.click();
        },
      },
    ],
  };
  royalNavyC = {
    id: 'beta',
    title: "The Royal Navy",
    text: () => {
      return `The runaway pirate takes a seat at your table and joins your crew to avoid the royal navy.<br><br>You gained a new crewmember.`;
    },
    options: [
      {
        text: () => {
          return "Weigh Anchor";
        },
        effect: (button) => {
          button.click();
        },
      },
    ],
  };
  royalNavyAA = {
    id: 'beta',
    title: "The Royal Navy",
    text: () => {
      return `After defeating a single royal marine the others drop there swords and start running away.<br>The rescued group of pirates want to join your crew.`;
    },
    options: [
      {
        text: () => {
          return "+ 3 crewmembers";
        },
        effect: (button) => {
          addCrew(3);
          document.querySelector(".event-option-list").firstChild.remove();
        },
      },
      {
        text: () => {
          return "Leave";
        },
        effect: (button) => {
          button.click();
        },
      },
    ],
  };
  
  //TREASURE CHEST
  treasureChest = {
    title: "Treasure Chest",
    id: 'E2',
    text: () => {
      return `You find a burried Treasure Chest while exploring.`;
    },
    options: [
      {
        text: () => {
          if (pl.dmc == true) return "Open the chest [ lose 5 max HP ]";
          else return `Open the chest`;
        },
        effect: async (button) => {
          playSound('paper2')
          button.style = "";
          let amount = 1;
          if (pl.dmc == true) {
            pl.mhp -= 5;
            heal(pl, -5);
            amount++;
          }
          //CREATE BOOTY
          let rewardCon = makeElmnt(
            "ol",
            "reward-con",
            "",
            document.querySelector(".scr")
          );
          //ADD PAPERTEXURE
          makeElmnt("div", "r-bg", "", rewardCon);
          //CEATE DOUBLOONS
          let val = (await random(seed[7], 9)) + (await random(seed[7], 9)) + 10;
          let lootCon = makeElmnt(
            "li",
            "loot",
            `<span>h</span> doubloons x${val}`,
            rewardCon
          );
          hoverSound(lootCon, 'hover');
          lootCon.addEventListener("click", async () => {
            playSound('looth')
            lootCon.remove();
            addResource(0, val);
          });
          //CREATE TREASURE
          if(combatType == 'B'){
            let newTreasure = makeElmnt(
                "li",
                "loot",
                `<span>d</span> + 1 new dice`,
                rewardCon
              );
              hoverSound(newTreasure, 'hover');
              newTreasure.addEventListener("click", () => {
                pl.dieArr.push({faceVal: [['S'], ['S'], ['S'], ['F'], ['F'], ['C']]});
                newTreasure.remove();
                upgradeFace(['S']);
              });
          } else {
            for (i = 0; i < amount; i++) {
                let trarr = [pl.comTr, pl.comTr, pl.comTr, pl.rareTr, pl.rareTr, pl.gemArr];
                trarr.forEach(a=>{
                  if(a.length == 0){
                    removeFromArray(trarr, a);
                  }
                })
                await shuffle(trarr, seed[5]);
                let t = trarr[0][0];
                removeFromArray(trarr[0], t);
                let newTreasure = makeElmnt(
                  "li",
                  "loot",
                  `<span></span> ${t.name}`,
                  rewardCon
                );
                let svg = getSVG(t.id);
                svg.style = `position: relative; transform: translate(-50%);`;
                newTreasure.firstChild.append(svg);
                hoverSound(newTreasure, 'hover');
                newTreasure.addEventListener("mouseenter", () => {
                  addToolTip(0, 0, 0, t.tip);
                });
                newTreasure.addEventListener("mouseleave", removeToolTip);
                newTreasure.addEventListener("click", () => {
                  newTreasure.remove();
                  addTreasure(window[t.id], pl);
                });
              }
          }
        },
      },
      {
        text: () => {
          return "Leave";
        },
        effect: (button) => {
          button.click();
        },
      },
    ],
  };
  
  //A SHADY MERCHANT
  shadyMerchant = {
    title: "A Shady Merchant",
    id: 'E1',
    text: () => {
      return `You come across a shady merchant. He wants to sell you some of his wear.<br><br>"Higher price, higher quality" the merchant says.`;
    },
    options: [
      {
        req: () => {
          if (pl.resourses[0] >= 50) return true;
          else return false;
        },
        text: () => {
          return "Buy 1 Dieface [ lose 50 doubloons ]";
        },
        effect: async (button) => {
          addResource(0, -50);
          enterEvent(shadyMerchantA, button);
          let n = await makeNewDieFace(2);
          pl.spareFaces.push(n.val);
          await upgradeFace(n.val);
        },
      },
      {
        req: () => {
          if (pl.resourses[0] >= 100) return true;
          else return false;
        },
        text: () => {
          return "Buy 2 Diefaces [ lose 100 doubloons ]";
        },
        effect: async (button) => {
          addResource(0, -100);
          enterEvent(shadyMerchantA, button);
          let n = await makeNewDieFace(3);
          pl.spareFaces.push(n.val);
          await upgradeFace(n.val);
          let nn = await makeNewDieFace(3);
          pl.spareFaces.push(nn.val);
          await upgradeFace(nn.val);
        },
      },
      {
        req: () => {
          if (pl.resourses[0] >= 150) return true;
          else return false;
        },
        text: () => {
          return "Buy 3 Diefaces [ lose 150 doubloons ]";
        },
        effect: async (button) => {
          addResource(0, -150);
          enterEvent(shadyMerchantA, button);
          let n = await makeNewDieFace(4);
          pl.spareFaces.push(n.val);
          await upgradeFace(n.val);
          let nn = await makeNewDieFace(4);
          pl.spareFaces.push(nn.val);
          await upgradeFace(nn.val);
          let nnn = await makeNewDieFace(4);
          pl.spareFaces.push(nnn.val);
          await upgradeFace(nnn.val);
        },
      },
      {
        text: () => {
          return "Leave";
        },
        effect: (button) => {
          button.click();
        },
      },
    ],
  };
  shadyMerchantA = {
    title: "A Shady Merchant",
    id: 'E1',
    text: () => {
      return `"Hehehe, no refunds" says the merchant as he quickly runs away.<br><br>You look at purchased goods, but they look fine.<br>You dicide not to look into it and leave.`;
    },
    options: [
      {
        text: () => {
          return "Leave";
        },
        effect: (button) => {
          button.click();
        },
      },
    ],
  };
  
  //IN THE MIST
  intoTheFog = {
    title: "Into the fog",
    id: 'E5',
    text: () => {
      return `While exploring the jungle you notice a thick fog creeping up on you.<br><br>You can barely see through the fog, but it sounds like someone is whispering to you.<br>You can't understand what they say.<br><br>You can still see the beach behind you.`;
    },
    options: [
      {
        text: () => {
          return "Enter the fog";
        },
        effect: (button) => {
          enterEvent(intoTheFogA, button);
        },
      },
      {
        text: () => {
          return "Run back to the beach";
        },
        effect: (button) => {
          button.click();
        },
      },
    ],
  };
  intoTheFogA = {
    title: "Into the fog",
    id: 'E5',
    text: () => {
      return `It's getting harder and harder to see where you're going and the whispering voices are getting louder.<br><br>The road splits two ways.<br>To your left you see something glistening in the distance, what could it be?<br>Suddenly a path decorated with strange flowers opens up on your right.`;
    },
    options: [
      {
        text: () => {
          return "Go left";
        },
        effect: (button) => {
          enterEvent(intoTheFogB, button);
        },
      },
      {
        text: () => {
          return "Go Right";
        },
        effect: (button) => {
          enterEvent(intoTheFogC, button);
        },
      },
    ],
  };
  intoTheFogB = {
    id: 'E5',
    title: "Into the fog",
    text: () => {
      intoTheFogB.gem = pl.gemArr[0];
      removeFromArray(pl.gemArr, pl.gemArr[0]);
      return `The shimmer in the distance comes from a gemstone atop a pedestal.<br>After further investigation you see that a <b style="color: ${intoTheFogB.gem.color}">${intoTheFogB.gem.name}</b> sits on a loose stone.<br><br>For all you know, it could be a trap.`;
    },
    options: [
      {
        text: () => {
          return `Take the treasure anyway [ Gain ${intoTheFogB.gem.name} ]`;
        },
        effect: (button) => {
          addTreasure(intoTheFogB.gem, pl);
          enterEvent(intoTheFogBA, button);
        },
        tooltip: () => {
          return intoTheFogB.gem.tip;
        },
      },
      {
        text: () => {
          if(pl.treasures.length == 0) return `Replace with a treasure`
          let a = Math.floor((pl.treasures.length / 10) * seed[5].arr[0]);
          intoTheFogB.options[1].treas = pl.treasures[a];
          return `Replace with a treasure [ Lose ${intoTheFogB.options[1].treas.name} ]`;
        },
        effect: (button) => {
          removeTreasure(intoTheFogB.options[1].treas, pl);
          addTreasure(intoTheFogB.gem, pl);
          enterEvent(intoTheFogBB, button);
        },
        req: () => {
          if (pl.treasures.length > 0) return true;
          else return false;
        },
      },
      {
        text: () => {
          if(pl.treasures.length <= 1) return `Replace with a treasure`
          let a = Math.floor(((pl.treasures.length - 1) / 10) * seed[5].arr[1]);
          if (pl.treasures[a] == intoTheFogB.options[1].treas) a++;
          intoTheFogB.options[2].treas = pl.treasures[a];
          return `Replace with a treasure [ Lose ${intoTheFogB.options[2].treas.name} ]`;
        },
        effect: (button) => {
          removeTreasure(intoTheFogB.options[2].treas, pl);
          addTreasure(intoTheFogB.gem, pl);
          enterEvent(intoTheFogBB, button);
        },
        req: () => {
          if (pl.treasures.length >= 2) return true;
          else return false;
        },
      },
    ],
  };
  intoTheFogBA = {
    id: 'E5',
    title: "Into the fog",
    text: () => {
      addBrandmark("w");
      return `As soon as you pick up the gem, the loose stone rises slightly and the whispers stop.<br>You feel a rumble under your feet.<br><br><b><i>An arrow flies from the bushes and hits you in your leg!</i></b><br><br>Luckely you still have a wooden leg on your ship from a previous crewmember.<br><br>The rumble stops and the fog lifts.`;
    },
    options: [
      {
        text: () => {
          return "Leave";
        },
        effect: (button) => {
          button.click();
        },
      },
    ],
  };
  intoTheFogBB = {
    id: 'E5',
    title: "Into the fog",
    text: () => {
      return `You quickly switch out the gem for the treasure and the voices stop wispering.<br><br>It stays quiet and the fog lifts.`;
    },
    options: [
      {
        text: () => {
          return "Leave";
        },
        effect: (button) => {
          button.click();
        },
      },
    ],
  };
  intoTheFogC = {
    id: 'E5',
    title: "Into the fog",
    text: () => {
      return `You follow the path of strange flowers to a waterfall.<br>When you reached the waterfall at the base of a pond, a mist rose from the waterfall creating a whistling sound.<br><br>You begin to feel calm and peaceful.`;
    },
    options: [
      {
        text: () => {
          return "Drink from the pond";
        },
        effect: (button) => {
          heal(pl, pl.mhp - pl.hp);
          enterEvent(intoTheFogCA, button);
        },
      },
      {
        text: () => {
          return "Fill a bottle with water";
        },
        effect: (button) => {
          addTreasure(C9, pl);
          enterEvent(intoTheFogCB, button);
        },
      },
    ],
  };
  intoTheFogCA = {
    id: 'E5',
    title: "Into the fog",
    text: () => {
      return `You drink the water from the pond and it heals all your cuts and bruises.<br><br>The whispering stops and you are blinded by the fog.<br><br>As soon as the fog lifts it appears that you are back on the beach.`;
    },
    options: [
      {
        text: () => {
          return "Leave";
        },
        effect: (button) => {
          button.click();
        },
      },
    ],
  };
  intoTheFogCB = {
    id: 'E5',
    title: "Into the fog",
    text: () => {
      return `You fill a bottle with water from the pond and the ground starts shaking under your feet. <br>You get blinded by the mist and the whispering fades away.<br><br>After a few moments the mist lifts and you find yourself back on the beach.`;
    },
    options: [
      {
        text: () => {
          return "Leave";
        },
        effect: (button) => {
          button.click();
        },
      },
    ],
  };
  
  //DIVE
  let diveSuc = 4;
  Dive = {
    title: "Dive",
    id: 'E4',
    text: () => {
      return `You found a shipwreck.<br><br>You should be able to dive down and see what you can find.`;
    },
    options: [
      {
        text: () => {
          return "Dive down";
        },
        effect: (button) => {
          enterEvent(DiveA, button);
        },
      },
      {
        text: () => {
          return "Leave";
        },
        effect: (button) => {
          button.click();
        },
      },
    ],
  };
  DiveA = {
    title: "Dive",
    id: 'E4',
    text: () => {
      return `There's barely anything left of the ship. What could have happend to it?<br><br>There is a chest underneath a pile of woodenbars. A good hard pull should get it out of there.`;
    },
    options: [
      {
        text: () => {
          return `Pull the chest [${100 / diveSuc}% chance of succes]`;
        },
        effect: async (button) => {
          let suc = await random(seed[4], diveSuc - 1);
          if (suc == 0) {
            enterEvent(DiveC, button);
            addTreasure(C5, pl);
          } else enterEvent(DiveB, button);
        },
      },
      {
        text: () => {
          return "Dive back up";
        },
        effect: (button) => {
          button.click();
        },
      },
    ],
  };
  DiveB = {
    title: "Dive",
    id: 'E4',
    text: () => {
      diveSuc--;
      return `It's starting to get loose but not quite yet.<br><br>Your getting out of breath and start to feel dizzy.`;
    },
    options: [
      {
        text: () => {
          return `Pull the chest [${Math.floor(
            100 / diveSuc
          )}% chance of succes and lose 3 HP]`;
        },
        effect: async (button) => {
          heal(pl, -3);
          let suc = await random(seed[4], diveSuc - 1);
          if (suc == 0) {
            enterEvent(DiveC, button);
            addTreasure(C5, pl);
          } else enterEvent(DiveB, button);
        },
      },
      {
        text: () => {
          return "Dive back up";
        },
        effect: (button) => {
          button.click();
        },
      },
    ],
  };
  DiveC = {
    title: "Dive",
    id: 'E4',
    text: () => {
      return `Succes! <br><br>Looks like the chest is empty.<br>At least its pretty.`;
    },
    options: [
      {
        text: () => {
          return "Dive back up";
        },
        effect: (button) => {
          button.click();
        },
      },
    ],
  };
  
  //UNDERWATER CHEST
  UnderwaterChest = {
    id: 'beta',
    title: "Underwater Chest",
    text: () => {
      return `The water is shallow and you find a chest underwater.<br>Could be something shiny...`;
    },
    options: [
      {
        text: () => {
          return `Open the chest`;
        },
        effect: async (button) => {
          addTreasure(C24, pl);
          enterEvent(UnderwaterChestA, button);
        },
      },
      {
        text: () => {
          return "Leave";
        },
        effect: (button) => {
          button.click();
        },
      },
    ],
  };
  UnderwaterChestA = {
    id: 'beta',
    title: "Underwater Chest",
    text: () => {
      return `You found a ships wheel.<br>It looks damaged and a green glow emerges from the crackes.`;
    },
    options: [
      {
        text: () => {
          return "Leave";
        },
        effect: (button) => {
          button.click();
        },
      },
    ],
  };
  
  //MESSAGE
  message = {
    title: "Message in a Bottle",
    id: 'E6',
    text: () => {
      return `You found a bottle on the beach. There seams to be a letter inside.<br>The letter tells about a burried treasure not far from here.`;
    },
    options: [
      {
        text: () => {
          return "Mark it on the map";
        },
        effect: async (button) => {
          button.click();
          let spot =
            currentRoom.next[await random(seed[4], currentRoom.next.length - 1)];
          for (i = 0; i < 7; i++) {
            spot = spot.next[await random(seed[4], spot.next.length - 1)];
          }
          spot.type = "T";
          await sleep(600);
          spot.dot.scrollIntoView({ behavior: "smooth", block: "center" });
          await sleep(800);
          spot.dot.innerHTML = `<div class="burried"><strong>burried treasure</strong>X</div>`;
          playSound("scr");
          document.querySelector(".event-option-list").firstChild.remove();
        },
      },
      {
        text: () => {
          return "Leave";
        },
        effect: async (button) => {
          button.click();
        },
      },
    ],
  };
  
  //PIRATECAVE
  piratecave = {
    title: "Piratecave",
    id: 'E7',
    text: () => {
      return `You enter a cave.<br>Inside you find a couple of sleeping rogue pirates.<br><br>Their treasure is right next to them.`;
    },
    options: [
      {
        text: () => {
          return "Sneak Closer";
        },
        effect: (button) => {
          enterEvent(piratecaveA, button);
        },
      },
      {
        text: () => {
          return "Attack while their asleep";
        },
        effect: (button) => {
          document.querySelector(".dialog-container").remove();
          enterCombat(document.querySelector(".scr"), button, [
            sleepA,
            sleepB,
            sleepC,
          ]);
          setTimeout(() => {
            enemyArr.forEach((target) => {
              makeElmnt("p", "dam", "stunned", target.efCo);
              target.obj.dieCont.childNodes.forEach(async (n, i) => {
                setTimeout(() => {
                  n.firstChild.style.transform = "none";
                  n.firstChild.classList.add("stun");
                }, 150 * i);
                addStatus("stun", true, target.obj);
              });
            });
          }, 3000);
        },
      },
      {
        text: () => {
          return "Leave";
        },
        effect: (button) => {
          button.click();
        },
      },
    ],
  };
  piratecaveA = {
    id: 'E7',
    title: "Piratecave",
    text: () => {
      return `You accidentely kick against a rock and it makes a small but echoing sound.<br>One of the pirates turns in his sleep.<br><br>Their still sleeping.`;
    },
    options: [
      {
        text: () => {
          return "Sneak Closer";
        },
        effect: async (button) => {
          let ran = await random(seed[4], 1);
          if (ran == 0) enterEvent(piratecaveB, button);
          else {
            document.querySelector(".dialog-container").remove();
            enterCombat(document.querySelector(".scr"), button, [
              sleepA,
              sleepB,
              sleepC,
            ]);
          }
        },
      },
      {
        text: () => {
          return "Attack while their asleep";
        },
        effect: async (button) => {
          document.querySelector(".dialog-container").remove();
          enterCombat(document.querySelector(".scr"), button, [
            sleepA,
            sleepB,
            sleepC,
          ]);
          setTimeout(() => {
            enemyArr.forEach((target) => {
              makeElmnt("p", "dam", "stunned", target.efCo);
              target.obj.dieCont.childNodes.forEach(async (n, i) => {
                setTimeout(() => {
                  n.firstChild.style.transform = "none";
                  n.firstChild.classList.add("stun");
                }, 150 * i);
                addStatus("stun", true, target.obj);
              });
            });
          }, 3000);
        },
      },
      {
        text: () => {
          return "Leave";
        },
        effect: (button) => {
          button.click();
        },
      },
    ],
  };
  piratecaveB = {
    id: 'E7',
    title: "Piratecave",
    text: () => {
      piratecave.tr = pl.comTr[0];
      removeFromArray(pl.comTr, pl.comTr[0]);
      return `The Treasure is within your grasp.`;
    },
    options: [
      {
        text: () => {
          return `Take Treasure [ ${piratecave.tr.name} ]`;
        },
        effect: (button) => {
          addTreasure(piratecave.tr, pl);
          document.querySelector(".event-option-list").firstChild.remove();
        },
        tooltip: () => {
          return piratecave.tr.tip;
        },
      },
      {
        text: () => {
          return "Leave";
        },
        effect: (button) => {
          button.click();
        },
      },
    ],
  };
  
  //GAMBLE
  Gamble = {
    id: 'beta',
    title: "Gamble",
    text: () => {
      Gamble.gem = pl.gemArr[0];
      removeFromArray(pl.gemArr, Gamble.gem);
      return `A merchant ship sails by and you decide to take a look on board.<br><br><i>"Arr ya in for a bit of gamble, lad?" </i><br><hr>the captain asks as he offers you a <b style="color: ${Gamble.gem.color}">${Gamble.gem.name}</b> as a price.<br><hr><i>"A fair game of poker, only 50 doubloons at stake."</i>`;
    },
    options: [
      {
        req: () => {
          if (pl.resourses[0] >= 50) return true;
          else return false;
        },
        text: () => {
          return "Take the offer [ Lose 50 doubloons ]";
        },
        effect: (button) => {
          enterEvent(GambleA, button);
          addResource(0, -50);
        },
      },
      {
        text: () => {
          return "Leave";
        },
        effect: (button) => {
          button.click();
        },
      },
    ],
  };
  GambleA = {
    id: 'beta',
    title: "Gamble",
    text: () => {
      return `You accepted and the captain starts dealing the cards.<br><hr>You got 2 cards: [ J ] [ Q ]<br>Cards on the table: [ 4 ] [ A ] [ 8 ] [ J ] [ 5 ]<br><hr>The captain starts laughing and trows his cards on the table revealing: [ K ] [ K ]`;
    },
    options: [
      {
        req: (option) => {
          pl.treasures.forEach((t) => {
            if (t.name.includes("Ace")) Gamble.ace = t;
          });
          if (Gamble.ace) {
            option.innerText = `Cheat [ lose ${Gamble.ace.name} ]`;
            return true;
          } else return false;
        },
        text: () => {
          return "Cheat";
        },
        effect: (button) => {
          enterEvent(GambleB, button);
          removeTreasure(Gamble.ace, pl);
          addTreasure(Gamble.gem, pl);
        },
      },
      {
        text: () => {
          return "Take your loss and leave";
        },
        effect: (button) => {
          button.click();
        },
      },
    ],
  };
  GambleB = {
    id: 'beta',
    title: "Gamble",
    text: () => {
      return `The captains smile drops from his face and asked you kindly to leave.`;
    },
    options: [
      {
        text: () => {
          return "Leave";
        },
        effect: (button) => {
          button.click();
        },
      },
    ],
  };
  
  //TAVERN
  Tavern = {
    title: "Tavern",
    id: 'E8',
    text: () => {
      return `You come across the local tavern.`;
    },
    options: [
      {
        text: () => {
          return `Enter the tavern`;
        },
        effect: (button) => {
          enterTavern(button);
        },
      },
      {
        text: () => {
          return "Leave";
        },
        effect: (button) => {
          button.click();
        },
      },
    ],
  };
  const enterTavern = async (btn) => {
    let tavern = makeElmnt(
      "section",
      "tavern",
      "",
      document.querySelector(".scr")
    );
    let button = makeElmnt("p", "btn continue-btn", "Leave Tavern", tavern);
    button.addEventListener("click", () => {
      btn.click();
    });
  
    let sellTab = makeElmnt("div", "sell-tab inactive-tab", "", tavern);
    let buyTab = makeElmnt("div", "buy-tab", "<h6>~ Buy Items ~<h6>", tavern);
  
    buyTab.addEventListener("click", () => {
      sellTab.classList.add("inactive-tab");
      buyTab.classList.remove("inactive-tab");
    });
  
    sellTab.addEventListener("click", () => {
      sellTab.classList.remove("inactive-tab");
      buyTab.classList.add("inactive-tab");
    });
  
    for (i = 0; i < 6; i++) {
      let pr = (await random(seed[7], 2)) + 1;
      let d = await makeNewDieFace(pr);
      d.sold = false;
      d.classList.remove("newdieface");
      d.pr = pr * 35 + (await random(seed[7], pr * 2));
      d.price = makeElmnt("p", "price", `<span>h</span>${d.pr}`, d);
      buyTab.append(d);
    }
  
    let sTr = [pl.shopTr, pl.uncomTr, pl.rareTr];
    for (i = 0; i < 3; i++) {
      let treas = makeElmnt("div", "treas", "", buyTab);
      treas.type = "treas";
      treas.sold = false;
      treas.tr = sTr[i][0];
      removeFromArray(sTr[i], treas.tr);
      treas.pr = (await random(seed[7], 9) * 2) + (i + 1) * 35 + 90;
      let img = getSVG(treas.tr.id)
      img.classList.add('tr-img');
      treas.append(img)
      treas.price = makeElmnt("p", "price", `<span>h</span>${treas.pr}`, treas);
      treas.addEventListener("mouseenter", () => {
        addToolTip(0, 0, 0, treas.tr.tip);
      });
      treas.addEventListener("mouseleave", removeToolTip);
    }
    buyTab.childNodes.forEach((item) => {
      item.sell = () => {
        if (item.sold == false) {
          item.sold = true;
          item.style = "opacity: 0.5; pointer-event: none;";
          item.price.style =
            "color: #cc0700; font-size: 6vh; top: 0; left: 0; transform: rotate(-45deg);";
          item.price.innerHTML = "Sold";
          if (item.type == "treas") addTreasure(item.tr, pl);
          else {
            pl.spareFaces.push(item.val);
            upgradeFace(item.val);
          }
          addResource(0, -item.pr);
          updateShop();
        }
      };
    });
    updateShop(0);
  };
  const updateShop = (temp) => {
    document.querySelector(".buy-tab").childNodes.forEach((item) => {
      if (item.price) {
        item.addEventListener("click", item.sell);
        item.price.style.color = "";
        if (pl.resourses[0] < item.pr || item.sold == true) {
          item.removeEventListener("click", item.sell);
          item.price.style.color = "#cc0700";
        }
      }
    });
  
    let sellTab = document.querySelector(".sell-tab");
    sellTab.innerHTML = "";
    if (pl.spareFaces.length == 0 && pl.treasures.length == 0)
      sellTab.innerHTML = `<p class="no-sell">You have nothing to sell</p>`;
    let sellTabInner = makeElmnt(
      "div",
      "sell-tab-inner",
      "<h6>~ Sell Items ~</h6>",
      sellTab
    );
    pl.spareFaces.forEach((d) => {
      let spareDieFace = makeElmnt(
        "div",
        `die-item dot${d.length}`,
        0,
        sellTabInner
      );
      d.forEach((v) => {
        if (v == v.toLowerCase()) {
          makeElmnt("p", "dot", `<span class="curse">${v}</span>`, spareDieFace);
        } else {
          makeElmnt("p", "dot", `<span>${v}</span>`, spareDieFace);
        }
      });
      spareDieFace.pr = getSell(d);
      spareDieFace.price = makeElmnt(
        "p",
        "price",
        `<span>h</span>${spareDieFace.pr}`,
        spareDieFace
      );
      spareDieFace.addEventListener("mouseenter", () => {
        addToolTip(0, 0, d[0]);
      });
      spareDieFace.addEventListener("mouseleave", removeToolTip);
      spareDieFace.addEventListener("click", () => {
        removeFromArray(pl.spareFaces, d);
        addResource(0, spareDieFace.pr);
        updateShop(0);
      });
    });
    pl.treasures.forEach((t) => {
      let treas = makeElmnt("div", "treas", "", sellTabInner);
      treas.pr = t.pr;
      let img = getSVG(t.id);
      img.classList.add('tr-img');
      treas.append(img);
      treas.price = makeElmnt("p", "price", `<span>h</span>${treas.pr}`, treas);
      treas.addEventListener("mouseenter", () => {
        addToolTip(0, 0, 0, t.tip);
      });
      treas.addEventListener("mouseleave", removeToolTip);
      treas.addEventListener("click", () => {
        removeTreasure(t, pl);
        addResource(0, 50);
        // updateShop(0);
        treas.remove();
      });
    });
  };
  const getSell = (val) => {
    return 4 + 6 * val.length;
  };
  
  //BONFIRE
  Bonfire = {
    title: "Bonfire",
    id: 'E3',
    text: () => {
      return `There's a bonfire on the beach.<br>What to do?`;
    },
    options: [
      {
        text: () => {
          return `Rest [ heal ${Math.ceil(pl.mhp / 3)} hp ]`;
        },
        effect: (button) => {
          heal(pl, Math.ceil(pl.mhp / 3));
          enterEvent(BonfireHeal, button);
        },
      },
      {
        text: () => {
          return "Combine Diefaces";
        },
        effect: (button) => {
          CombineDiefaces(button);
        },
      },
      {
        text: () => {
          return "Add a branding mark to your dice";
        },
        effect: (button) => {
          openInventory(false, true);
        },
      },
    ],
  };
  BonfireHeal = {
    title: "Bonfire",
    id: 'E3',
    text: () => {
      return `You and your crew are well rested`;
    },
    options: [
      {
        text: () => {
          return "leave";
        },
        effect: (button) => {
          button.click();
        },
      },
    ],
  };
  const CombineDiefaces = async (button) => {
    let screen = document.querySelector(".scr");
    screen.style.opacity = "0";
    await sleep(400);
    screen.innerHTML = "";
    screen.classList.add("combine-screen");
    screen.style.opacity = "1";
  
    let card = createMapBtn("");
    card.classList.add("merge-card");
    screen.append(card);
  
    let faceArr = [];
    pl.dieArr.forEach((d, ind) =>
      d.faceVal.forEach((v, inde) => {
        faceArr.push(v);
        v.r = [ind, inde];
      })
    );
    pl.spareFaces.forEach((v, ind) => {
      v.r = [ind, "/"];
      faceArr.push(v);
    });
    let dupArr = [];
    faceArr.forEach((f) => {
      let dup = false;
      dupArr.forEach((a) => {
        if (f[0] == a[0][0]) a.push(f);
        if (f[0] == a[0][0]) dup = true;
      });
      if (dup == false && f[0] != f[0].toLowerCase() && f.length < 6)
        dupArr.push(new Array(f));
    });
    dupArr = dupArr.filter((a) => a.length > 1);
    dupArr = [].concat.apply([], dupArr);
    let ca = [0, 0];
    dupArr.forEach((f) => {
      f.face = createDieFace(f, screen);
      f.face.c = -1;
      f.face.addEventListener("click", () => {
        if (f.face.c == -1) {
          let center =
            f.face.offsetLeft -
            window.innerWidth / 2 -
            (f.face.offsetLeft - window.innerWidth / 2) -
            (f.face.offsetLeft - window.innerWidth / 2) -
            window.innerHeight / 25;
          if (ca[0] == 0) {
            f.face.c = 0;
            ca[0] = f;
            f.face.style = `top: -${
              f.face.offsetTop - window.innerHeight / 4.2
            }px; left: ${
              center - window.innerHeight / 10
            }px; transform: scale(2);`;
          } else if (ca[1] == 0) {
            f.face.c = 1;
            ca[1] = f;
            f.face.style = `top: -${
              f.face.offsetTop - window.innerHeight / 4.2
            }px; left: ${
              center + window.innerHeight / 10
            }px; transform: scale(2);`;
          }
          if (ca[0].length + ca[1].length > 6)
            makeElmnt(
              "div",
              "warning",
              "A dieface can't have more than 6 symbols<br>Acces sybols will go to waste",
              screen
            );
        } else {
          ca[f.face.c] = 0;
          f.face.c = -1;
          f.face.style = ``;
        }
        dupArr.forEach((fa) => {
          if (fa.face) fa.face.classList.remove("nc", "fade");
        });
        ca.forEach((v) => {
          if (v[0]) {
            dupArr.forEach((fa) => {
              if (v[0] != fa[0] && fa.face) fa.face.classList.add("nc", "fade");
            });
          }
        });
        if (ca[0][0] != undefined && ca[0][0] == ca[1][0])
          merge.classList.remove("nc", "fade");
        else merge.classList.add("nc", "fade");
      });
    });
    let merge = makeElmnt("div", "merge btn fade", "merge", screen);
    merge.click = false;
    merge.addEventListener("click", () => {
      if (merge.click == false) {
        merge.click = true;
        let merged = [].concat.apply([], ca).slice(0, 6);
        if (ca[0].r[1] != "/") pl.dieArr[ca[0].r[0]].faceVal[ca[0].r[1]] = merged;
        else pl.spareFaces[ca[0].r[0]] = merged;
        if (ca[1].r[1] != "/") pl.dieArr[ca[1].r[0]].faceVal[ca[1].r[1]] = [""];
        else pl.spareFaces[ca[1].r[0]] = [""];
        upgradeFace(merged);
        dupArr.forEach((f) => f.face.remove());
        re.remove();
        merge.innerHTML = "Weigh Anchor";
      } else {
        button.click();
      }
    });
    let re = makeElmnt("div", "re btn", "return", screen);
    re.addEventListener("click", () => {
      screen.innerHTML = "";
      enterUnkownLand(screen, button, 'Bonfire');
    });
  };
  const checkLength = (a) => {
    return a.length >= 2;
  };
  
  //MAYAN RUINS
  mayanCombat = {
    title: "Mayan Ruin",
    id: 'beta',
    text: () => {
      return ``;
    },
    options: [
      {
        text: () => {
          return "Fight";
        },
        effect: (button) => {
          document.querySelector(".dialog-container").style.display = "none";
          enterCombat(
            document.querySelector(".scr"),
            button,
            mayanEnemys[0],
            "M"
          );
          removeFromArray(mayanEnemys, mayanEnemys[0]);
        },
      },
    ],
  };
  mayanRuin = {
    id: 'beta',
    title: "Mayan Ruin",
    text: () => {
      return `You've found a Mayan ruin.<br>It looks abandoned but there might still be something valuable inside.<br><br>What will you do?`;
    },
    options: [
      {
        text: () => {
          return "Explore";
        },
        effect: async (button) => {
          let ran = await random(seed[4], 3);
          if (ran > 1) enterEvent(mayanRuinA, button);
          else enterEvent(mayanRuinC, button);
        },
      },
      {
        text: () => {
          return "Leave";
        },
        effect: (button) => {
          button.click();
        },
      },
    ],
  };
  mayanRuinA = {
    id: 'beta',
    title: "Mayan Ruin",
    text: () => {
      addBrandmark();
      return `After exploring for a while, you trip over a wire and fall on the ground.<br>There's still a chance to find something.`;
    },
    options: [
      {
        text: () => {
          return "Continue Exploring";
        },
        effect: async (button) => {
          let ran = await random(seed[4], 2);
          if (ran > 1) enterEvent(mayanRuinB, button);
          else enterEvent(mayanRuinC, button);
        },
      },
      {
        text: () => {
          return "Leave";
        },
        effect: (button) => {
          button.click();
        },
      },
    ],
  };
  mayanRuinB = {
    id: 'beta',
    title: "Mayan Ruin",
    text: () => {
      addBrandmark();
      return `You've set of another trap.<br>Is it worth it to go on?`;
    },
    options: [
      {
        text: () => {
          return "Continue Exploring";
        },
        effect: async (button) => {
          let ran = await random(seed[4], 2);
          if (ran >= 1) enterEvent(mayanRuinB, button);
          else enterEvent(mayanRuinC, button);
        },
      },
      {
        text: () => {
          return "Leave";
        },
        effect: (button) => {
          button.click();
        },
      },
    ],
  };
  mayanRuinC = {
    id: 'beta',
    title: "Mayan Ruin",
    text: () => {
      mayanRuinC.treas = pl.mayanArr[0];
      removeFromArray(pl.mayanArr, pl.mayanArr[0]);
      return `You arrive at the center of the piramid.<br>There is still some treasure left.`;
    },
    options: [
      {
        text: () => {
          return `Take treasure [ ${mayanRuinC.treas.name} ]`;
        },
        effect: async () => {
          addTreasure(mayanRuinC.treas, pl);
          document.querySelector(".event-option-list").firstChild.remove();
        },
        tooltip: () => {
          return mayanRuinC.treas.tip;
        },
      },
      {
        text: () => {
          return "Leave";
        },
        effect: (button) => {
          button.click();
        },
      },
    ],
  };
  
  //MONKEY JUNGLE
  MonkeyJungle = {
    id: 'C31',
    title: "Monkey in the Jungle",
    text: () => {
      MonkeyJungle.coins = pl.resourses[0];
      addResource(0, -pl.resourses[0]);
      return `A monkey stole your purse while exploring the jungle.<br>All you doubloons where in there!<br><br>The monkey escapes through some thorny vines.`;
    },
    options: [
      {
        text: () => {
          return "Chase the monkey [ -4 hp ]";
        },
        effect: async (button) => {
          heal(pl, -4);
          if ((await random(seed[4], 3)) == 0) enterEvent(MonkeyJungleA, button);
          else enterEvent(MonkeyJungleB, button);
        },
      },
      {
        text: () => {
          return "Leave";
        },
        effect: (button) => {
          button.click();
        },
      },
    ],
  };
  MonkeyJungleA = {
    id: 'C31',
    title: "Monkey in the Jungle",
    text: () => {
      return `The Jungle is getting thicker but you almost caught the monkey.`;
    },
    options: [
      {
        text: () => {
          return "Chase the monkey [ -4 hp ]";
        },
        effect: async (button) => {
          heal(pl, -4);
          if ((await random(seed[4], 1)) == 0) enterEvent(MonkeyJungleA, button);
          else enterEvent(MonkeyJungleB, button);
        },
      },
      {
        text: () => {
          return "Leave";
        },
        effect: (button) => {
          button.click();
        },
      },
    ],
  };
  MonkeyJungleB = {
    id: 'C31',
    title: "Monkey in the Jungle",
    text: () => {
      return `You lost site of the monkey but you find your purse on the ground along with some extra doubloons and a couple of bananas.<br>That monkey must have robbed some more pirates.`;
    },
    options: [
      {
        text: () => {
          return `Take Bananas`;
        },
        effect: (button) => {
          addTreasure(C30, pl);
          document.querySelector(".event-option-list").firstChild.remove();
        },
        tooltip: () => {
          return C30.tip;
        },
      },
      {
        text: () => {
          return `Take the loot and leave [ +${
            MonkeyJungle.coins + Math.round(MonkeyJungle.coins * 0.2)
          } <span class="icon">h</span>]`;
        },
        effect: (button) => {
          addResource(
            0,
            MonkeyJungle.coins + Math.round(MonkeyJungle.coins * 0.2)
          );
          button.click();
        },
      },
    ],
  };
  
  //SEA MONKEY
  SeaMonkey = {
    id: 'C31',
    title: "Monkey in the Jungle",
    text: () => {
      return `Your crew is chasing a monkey on deck. It's the monkey you followed in the jungle.<br>It seams to be looking for something....`;
    },
    options: [
      {
        req: () => {
          if (pl.treasures.includes(C30)) return true;
          else return false;
        },
        text: () => {
          return `Give Bananas`;
        },
        effect: (button) => {
          removeTreasure(C30, pl);
          enterEvent(SeaMonkeyC, button);
        },
        tooltip: () => {
          return C30.tip;
        },
      },
      {
        req: () => {
          if (pl.resourses[0] >= 50) return true;
          else return false;
        },
        text: () => {
          return `Give doubloons [ -50 <span class="icon">h</span>]`;
        },
        effect: (button) => {
          enterEvent(SeaMonkeyB, button);
          addResource(0, -50);
        },
      },
      {
        text: () => {
          return `Scare it away`;
        },
        effect: (button) => {
          enterEvent(SeaMonkeyA, button);
        },
      },
    ],
  };
  SeaMonkeyA = {
    id: 'C31',
    title: "Monkey in the Jungle",
    text: () => {
      addBrandmark("h");
      return `You try to scare it by running towards the monkey. It screaches and bites you in your finger.<br>It jumps of the ship into the water and quickly swims back to shore.<br><br>The ship's doctor says the bite might be infected and decides to cut your had of and replace it with a hookhand.<br><br>Just to be sure...`;
    },
    options: [
      {
        text: () => {
          return `Weigh Anchor`;
        },
        effect: (button) => {
          button.click();
        },
      },
    ],
  };
  SeaMonkeyB = {
    id: 'C31',
    title: "Monkey in the Jungle",
    text: () => {
      return `It grabs the doubloons from your hand and jumps off the ship into the water. The monkey quickly swims back to shore and runs into the jungle.`;
    },
    options: [
      {
        text: () => {
          return `Weigh Anchor`;
        },
        effect: (button) => {
          button.click();
        },
      },
    ],
  };
  SeaMonkeyC = {
    id: 'C31',
    title: "Monkey in the Jungle",
    text: () => {
      return `You hand out the bananas and the monkey jumps on your shoulder, grabbing the bananas. He holds the bananas tight and looks happy at you. Apperently you've made a new friend.`;
    },
    options: [
      {
        text: () => {
          return `Let the monkey join your crew`;
        },
        effect: (button) => {
          addTreasure(C31, pl);
          document.querySelector(".event-option-list").firstChild.remove();
        },
        tooltip: () => {
          return C31.tip;
        },
      },
      {
        text: () => {
          return `Weigh Anchor`;
        },
        effect: (button) => {
          button.click();
        },
      },
    ],
  };
  
  //MARKET
  Market = {
    id: 'beta',
    title: "Market",
    text: async () => {
      let t = 5;
      Market.r = (await random(seed[7], t)) + 1;
      t -= Market.r - 1;
      Market.w = (await random(seed[7], t)) + 1;
      t -= Market.w - 1;
      Market.i = (await random(seed[7], t)) + 1;
      t -= Market.i - 1;
      Market.c = t + 1;
      pl.landEvents.push(Market);
      shuffle(pl.landEvents, seed[4]);
      return `There's a market in town. The merchant offers you doubloons for your resourses.<br><i>"Special price on all!"</i>`;
    },
    options: [
      {
        tooltip: () => {
          return `Hold Ctr and click to sell all`;
        },
        text: () => {
          return `Sell 1 <b>Rum</b> [ +${Market.r} <span class="icon">h</span> ]`;
        },
        effect: (button) => {
          if (pl.resourses[1] > 0) {
            if (ctrdown == true) {
              addResource(0, Market.r * pl.resourses[1]);
              addResource(1, -pl.resourses[1]);
            } else {
              addResource(1, -1);
              addResource(0, Market.r);
            }
          }
        },
      },
      {
        text: () => {
          return `Sell 1 <b>Wood</b> [ +${Market.w} <span class="icon">h</span> ]`;
        },
        effect: (button) => {
          if (pl.resourses[2] > 0) {
            if (ctrdown == true) {
              addResource(0, Market.w * pl.resourses[2]);
              addResource(2, -pl.resourses[2]);
            } else {
              addResource(2, -1);
              addResource(0, Market.w);
            }
          }
        },
        tooltip: () => {
          return `Hold Ctr and click to sell all`;
        },
      },
      {
        tooltip: () => {
          return `Hold Ctr and click to sell all`;
        },
        text: () => {
          return `Sell 1 <b>Iron</b> [ +${Market.i} <span class="icon">h</span> ]`;
        },
        effect: (button) => {
          if (pl.resourses[3] > 0) {
            if (ctrdown == true) {
              addResource(0, Market.i * pl.resourses[3]);
              addResource(3, -pl.resourses[3]);
            } else {
              addResource(3, -1);
              addResource(0, Market.i);
            }
          }
        },
      },
      {
        tooltip: () => {
          return `Hold Ctr and click to sell all`;
        },
        text: () => {
          return `Sell 1 <b>Cloth</b> [ +${Market.c} <span class="icon">h</span> ]`;
        },
        effect: (button) => {
          if (pl.resourses[4] > 0) {
            if (ctrdown == true) {
              addResource(0, Market.c * pl.resourses[4]);
              addResource(4, -pl.resourses[4]);
            } else {
              addResource(4, -1);
              addResource(0, Market.c);
            }
          }
        },
      },
      {
        text: () => {
          return `Buy resourses from the market`;
        },
        effect: (button) => {
          enterEvent(MarketB, button);
        },
      },
    ],
  };
  MarketB = {
    id: 'beta',
    title: "Market",
    text: async () => {
      MarketB.r = (await random(seed[7], 9)) + 3;
      MarketB.w = (await random(seed[7], 9)) + 3;
      MarketB.i = (await random(seed[7], 9)) + 3;
      MarketB.c = (await random(seed[7], 9)) + 3;
      return `The merchant shows you his wares.<br><i>"Buy buy buy!!"</i>`;
    },
    options: [
      {
        text: () => {
          return `Buy 1 <b>Rum</b> [ -${MarketB.r} <span class="icon">h</span> ]`;
        },
        effect: (button) => {
          if (pl.resourses[0] >= MarketB.r) {
            addResource(1, 1);
            addResource(0, -MarketB.r);
          }
        },
      },
      {
        text: () => {
          return `Buy 1 <b>Wood</b> [ -${MarketB.w} <span class="icon">h</span> ]`;
        },
        effect: (button) => {
          if (pl.resourses[0] >= MarketB.w) {
            addResource(2, 1);
            addResource(0, -MarketB.w);
          }
        },
      },
      {
        text: () => {
          return `Buy 1 <b>Iron</b> [ -${MarketB.i} <span class="icon">h</span> ]`;
        },
        effect: (button) => {
          if (pl.resourses[0] >= MarketB.i) {
            addResource(3, 1);
            addResource(0, -MarketB.i);
          }
        },
      },
      {
        text: () => {
          return `Buy 1 <b>Cloth</b> [ -${MarketB.c} <span class="icon">h</span> ]`;
        },
        effect: (button) => {
          if (pl.resourses[0] >= MarketB.c) {
            addResource(4, 1);
            addResource(0, -MarketB.c);
          }
        },
      },
      {
        text: () => {
          return `Leave`;
        },
        effect: (button) => {
          button.click();
        },
      },
    ],
  };
  //WHIRLPOOL
  Whirlpool = {
    id: 'beta',
    title: "Whirlpool",
    text: async () => {
      return `The current of the sea gets stronger and the wind begins to blow. A whirlpool forms in the distance.<br>Your crew sees a barrel full of food, a raft of hopeless pirates, and a treasure chest drifting towards the whirlpool.<br>You only have time to save <strong>1</strong> thing before your ship can no longer escape the whirlpool.`;
    },
    options: [
      {
        text: () => {
          return `Grab the barrel of food [ heal 10 hp ]`;
        },
        effect: (button) => {
          heal(pl, 10);
          Whirlpool.txt = `You grabbed the barrel full of food`;
          enterEvent(WhirlpoolA, button);
        },
      }, 
      {
        text: () => {
          return `Save the pirates [ +5 max hp ]`;
        },
        effect: (button) => {
          pl.mhp += 5;
          setTimeout(() => {
            heal(pl, 5);
          }, 100);
          Whirlpool.txt = `You saved the pirates`;
          enterEvent(WhirlpoolA, button);
        },
      }, 
      {
        text: () => {
          return `Grab the treasue chest [ Obtain a treasure ]`;
        },
        effect: async (button) => {
          let trarr = [pl.comTr, pl.comTr, pl.comTr, pl.comTr, pl.uncomTr, pl.uncomTr, pl.uncomTr, pl.rareTr, pl.rareTr, pl.gemArr];
          trarr.forEach(a=>{
            if(a.length == 0){
              removeFromArray(trarr, a);
            }
          })
          await shuffle(trarr, seed[5]);
          let t = trarr[0][0];
          removeFromArray(trarr[0], t);
          addTreasure(t, pl);
          Whirlpool.txt = `You grabbed the chest`;
          enterEvent(WhirlpoolA, button);
        },
      },
    ],
  };
  WhirlpoolA = {
    id: 'beta',
    title: "Whirlpool",
    text: async () => {
      return `${Whirlpool.txt} and turn your ship to avoid the whirlpool.<br>It was close but you've kept controle over your ship.`;
    },
    options: [
      {
        text: () => {
          return `Set sail`;
        },
        effect: (button) => {
          button.click();
        }
      }, 
    ],
  };
  //SHRINE
  Shrine = {
    id: 'beta',
    title: "Shrine",
    text: async () => {
      return `There's a shrine up ahead. They say it has magical properties and releaves you of all your sins.`;
    },
    options: [
      {
        text: () => {
          return `Clense your souls [ Remove all brandmarks from your dice ]`;
        },
        effect: (button) => {
          playSound('H')
          pl.dieArr.forEach(a=>{
            a.faceVal.map((d, i)=>{
              if(d[0] == d[0].toLowerCase()){
                a.faceVal[i] = [];
              } 
            })
          })
          document.querySelector(".event-option-list").firstChild.remove();
        }
      }, 
      {
        text: () => {
          return `Leave`;
        },
        effect: (button) => {
          button.click();
        }
      }, 
    ],
  };
  //CURSED HAMMER
  CursedHammer = {
    id: 'beta',
    title: "Cursed Hammer",
    text: async () => {
      CursedHammer.dmg = 4;
      return `One of your crewmenbers found a hammer on the ground. The longer you hold the hammer the more it is starting to hurt.`;
    },
    options: [
      {
        text: () => {
          return `Upgrade a random dieface [ -${CursedHammer.dmg} hp ]`;
        },
        effect: async (button) => {
          heal(pl, -CursedHammer.dmg);
          let count = 0;
          let face = "";
          while (count == 0) {
            face =
              pl.dieArr[await random(seed[6], pl.dieArr.length - 1)].faceVal[await random(seed[6], 6)];
            if (face[0] != face[0].toLowerCase() && face.length < 6) {
              face.push(face[0]);
              count++;
            }
          }
          CursedHammer.dmg += 4;
          document.querySelector(".event-option-list").firstChild.innerText = `Upgrade a random dieface [ -${CursedHammer.dmg} hp ]`;
          await upgradeFace(face);
        }
      }, 
      {
        text: () => {
          return `Drop the hammer on the ground and leave`;
        },
        effect: (button) => {
          button.click();
        }
      }, 
    ],
  };
  //DEAD PIRATE
  DeadPirate = {
    id: 'beta',
    title: "Dead Pirate",
    text: async () => {
      let brokenT = 0
      for(i=0;i<4;i++){
        brokenT += await random(seed[5], 9);
      }
      DeadPirate.brokenDice = {faceVal: [['w'],['F'],['S'],['a'],['F'],['S']], broken: brokenT,};
      DeadPirate.brokenDice.faceVal.forEach(v=> v.broken = true);
      DeadPirate.tipDice = makeDie(DeadPirate.brokenDice, pl);
      return `Looks like there has been a fight here.<br>The skeleton of a bizarly familiare pirate sits against a rock.`;
    },
    options: [
      {
        text: () => {
          setTimeout(()=>{
            document.querySelector(".event-option-list").firstChild.addEventListener("mouseenter", () => {addToolTip(DeadPirate.tipDice.firstChild.innerHTML);});
            document.querySelector(".event-option-list").firstChild.addEventListener('mouseleave', removeToolTip)
          }, 500);
          return `Search the cadaver [ Gain a new dice ]`;
        },
        effect: async (button) => {
          pl.dieArr.push(DeadPirate.brokenDice);
          upgradeFace(['w'], true);
          enterEvent(DeadPirateA, button);
        },
      }, 
      {
        text: () => {
          return `Ignore it and leave`;
        },
        effect: (button) => {
          button.click();
        }
      }, 
    ],
  };
  DeadPirateA = {
    id: 'beta',
    title: "Dead Pirate",
    text: async () => {
      return `You found a new dice!<br><br>It looks kind of broken.<br>Better be careful with it. When it breaks the whole thing would be useless.`;
    },
    options: [
      {
        text: () => {
          return `Adjust dice`;
        },
        effect: (button) => {
          openInventory();
        }
      },  
      {
        text: () => {
          return `Leave`;
        },
        effect: (button) => {
          button.click();
        }
      }, 
    ],
  };
  //BUTCHER
  Butcher = {
    id: 'beta',
    title: "Butcher",
    text: async () => {
      return `There's a butcher in town. The man only had 1 eye, a wooden leg and a hook for a hand.<hr><i>"Can you give a hand to an old sailer. I'll pay good doubloons for it."</i>`;
    },
    options: [
      {
        text: () => {
          return `Give a Hand [ +100 <span class="icon">h</span> ]`;
        },
        effect: (button) => {
            Butcher.txt = 'off your hand'
          addBrandmark('h');
          addResource(0, 100);
          enterEvent(ButcherA, button);
        },
        tooltip: ()=>{return `<span>h</span>Lose 1 reroll when this dieface is rolled`}
    },  
    {
        text: () => {
            return `Break a leg [ +150 <span class="icon">h</span> ]`;
        },
        effect: (button) => {
            Butcher.txt = 'off your leg'
            addBrandmark('w');
            addResource(0, 150);
            enterEvent(ButcherA, button);
        },
        tooltip: ()=>{return `<span>w</span>Gain 1 weak when this dieface is rolled`}
    }, 
    {
        text: () => {
            return `An eye for an eyepatch [ +200 <span class="icon">h</span> ]`;
        },
        effect: (button) => {
            Butcher.txt = 'out your eye'
            addBrandmark('e');
            addResource(0, 200);
            enterEvent(ButcherA, button);
        },
        tooltip: ()=>{return `<span>e</span>Gain 1 blind when this dieface is rolled`}
      }, 
      {
        text: () => {
          return `Leave`;
        },
        effect: (button) => {
          button.click();
        }
      }, 
    ],
  };
  ButcherA = {
    id: 'beta',
    title: "Butcher",
    text: async () => {
      return `Without any hazetasion the butcher cuts ${Butcher.txt}.<br><br><i>"Thank's for your donation."</i><br><br>You still got some good money out of it.`;
    },
    options: [
      {
        text: () => {
          return `Leave`;
        },
        effect: (button) => {
          button.click();
        }
      }, 
    ],
  };

  //Big Fish
  BigFish = {
    id: 'beta',
    title: "Big Fish",
    text: async () => {
      return `You caught a big tuna!!<br><br>Look at the size of it. Lets feast!`;
    },
    options: [
        {
            text: () => {
              return `Eat all of it yourself [ heal to full ]`;
            },
            effect: (button) => {
                heal(pl, 999);
                document.querySelector(".event-option-list").firstChild.remove();
                document.querySelector(".event-option-list").firstChild.remove();
              }
          },
          {
            text: () => {
              return `Share it with the crew [ + 5 max hp ]`;
            },
            effect: (button) => {
                pl.mhp +=5;
                heal(pl, 5);
                document.querySelector(".event-option-list").firstChild.remove();
                document.querySelector(".event-option-list").firstChild.remove();
              }
          },
          {
            text: () => {
              return `Leave`;
            },
            effect: (button) => {
              button.click();
            }
          }, 
    ],
  };
  
  const mayanEvents = ['mayanCombat', 'mayanRuin', 'mayanCombat'];
  
  //ENTER EVENTS
  
  const enterUnkownLand = async (room, button, event) => {
    battleModal.style.opacity = "1";
    await sleep(800);
    //DRAW BACKGROUND
    changeBackground("event-bg");
    button.style = "opacity: 0; pointer-events: none;";
  
    if (event == "?") event = pl.landEvents[0];
    if (event == "!") event = pl.seaEvents[0];
    removeFromArray(pl.seaEvents, event);
    removeFromArray(pl.landEvents, event);
    event = window[event];
    //CREATE CONTAINER
    let dialogContainer = createMapBtn("");
    dialogContainer.classList.add("dialog-container");
    room.append(dialogContainer);
    battleModal.style.opacity = "";
    await sleep(300);
    playSound("openevent");
    await sleep(700);
    enterEvent(event, button);
  };
  
  const enterEvent = async (event, button) => {
      if(event == undefined){
          event = CursedHammer;
      }
    //CLEAR CONTAINER
    if (document.querySelector(".event-text")) {
      document.querySelector(".event-text").remove();
      document.querySelector(".event-option-list").remove();
    }
  
    let dialog = document.querySelector(".dialog-container");
    //CREATE CONTAINER
    let innerContainer = makeElmnt(
      "section",
      "inner-event-container",
      "",
      dialog.firstChild
    );
  
    //HEADER
    makeElmnt("p", "event-header", event.title, dialog);
  
    //IMAGE
    let svg = getSVG(event.id);
    svg.classList.add('event-img');
    innerContainer.append(svg);
    // let image = makeElmnt("img", "event-img", "", innerContainer);
    // image.src = `../images/Event/${event.title}.svg`;
  
    //TEXT
    let text = await event.text();
    makeElmnt("p", "event-text", text, innerContainer);
  
    let optionList = makeElmnt("ol", "event-option-list", "", innerContainer);
  
    event.options.forEach(async (o) => {
      let optionText = await o.text();
      let option = makeElmnt("li", "option", optionText, optionList);
  
      if (o.req) {
        let req = o.req(option);
        if (req == false) {
          option.style = "opacity: 0.5; pointer-events: none;";
          // option.innerHTML = "Locked";
        }
        if (req == "delete") option.remove();
      }
  
      if (o.tooltip) option.addEventListener("mouseleave", removeToolTip);
      option.addEventListener("mouseenter", () => {
        if (o.tooltip) addToolTip(0, 0, 0, o.tooltip());
        playSound("hover");
      });
  
      option.addEventListener("click", () => {
        o.effect(button);
      });
    });
  };

  const glosInd = [`<div class="cat">Dicesymbols</div><li><span>B</span> Deals 2 dmg to all enemy's</li>
  <li><span>C</span> Deals 3 dmg</li>
  <li><span>D</span> Deals 1 dmg + 1 dmg for every <strong class="inline">D</strong> played this turn</li>
  <li><span>E</span> Deals 2 dmg and gain 1 shield if the target has shield</li>
  <li><span>F</span> Deals 2 dmg and has 5% chance to stun a enemy</li>
  <li><span>G</span> Deals 4 dmg and turns it into a <strong class="inline">J</strong></li>
  <li><span>H</span> Heal 1 hp</li>
  <li><span>I</span> Grants 3 shield and applies 1 weak</li>
  <li><span>J</span> Turns into a <strong class="inline">G</strong></li>
  <li><span>K</span> Deals 1 dmg and applies 1 weak</li>
  <li><span>P</span> Apply 1 poison</li>
  <li><span>Q</span> ???</li>
  <li><span>R</span> Deals 2 piercing dmg</li>
  <li><span>S</span> Grants 2 shield</li>
  <li><span>T</span> Deals dmg equal to your shield and lose 50% of your shield</li>
  <li><span>X</span> Grants 1 rage</li>`, `<div class="cat">Brandmarks</div><li><span style="color: black">a</span> Chain this die when this dieface is rolled</li>
  <li><span style="color: black">c</span> Chain a random die when this dieface is rolled</li>
  <li><span style="color: black">e</span> Gain 1 blind when this dieface is rolled</li>
  <li><span style="color: black">h</span> lose 1 reroll when this dieface is rolled</li>
  <li><span style="color: black">q</span> ???</li>
  <li><span style="color: black">w</span> Gain 1 weak when this dieface is rolled</li>
  <li><span style="color: black">x</span> This dieface can't be rolled</li>
  <li></li>
  <div class="cat">Status Effects</div>
  <li><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27.4 27.39" id="st-b"><g transform="matrix(.897 0 0 .897 -109.5 -75.61)" fill="#9a784e" stroke-width=".2949"><path d="m128.7 95.58-5.008 5.433 4.488 4.583 5.764 3.402 7.229 0.0473-1.654-2.221-4.772 0.1417-4.914-2.929-2.882-3.024 3.449-3.402z"/><path d="m132.4 99.62 0.0668 3.608 2.639 2.305 3.875 0.5345z"/><path d="m127.7 92.13 0.0334 0.1336 18.35 18.53 1.94-1.84-2.251-2.256 2.56-2.181 2.806-3.763-3.52-4.214-6.638-3.889-6.756-0.02363-3.142 1.772 1.488 1.701 2.744-1.479 4.85 0.09137 6.092 3.714 2.249 2.34-1.925 2.222-2.598 1.918-1.599-1.602 0.6432-3.009-1.66-3.38-4.003-1.281-2.137 0.5016-5.712-5.73z"/></g></svg></span> Attacks have a 50% chance to miss</li>
  <li><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45.64 40.83" id="st-p"><g transform="translate(-60.71 -172.6)" fill="#9a784e" stroke-opacity="0"><path d="m70.58 185.7 2.661-3.118-1.452-1.371 0.2419-3.575-4.597-0.5644-0.2151 2.446-2.5 0.9676 0.3494 3.413 3.683 0.2419z"/><path d="m92.99 182.7 2.742 3.118 1.425-1.666 3.535 0.3494 0.8871-3.44-2.957-1.64-0.2957-1.666-4.005-0.4032 0.215 3.736z"/><path d="m72.01 201 1.825 1.102-0.019 2.908-0.8173 0.6842 0.5512 2.205-2.87 2.129-2.243-1.672 0.038-1.463-2.015-1.007 0.4372-3.44 3.307 0.4371z"/><path d="m93.62 205.2-0.0806-0.1075-0.5914-0.5913 0.0538-2.822 1.586-1.129 1.989 2.043 2.527-0.5107 1.694 3.118-2.527 1.478-0.3226 2.473-3.226 0.6719-1.909-1.908z"/><path d="m75.33 205v-4.225l-4.238-4.631v-8.693l3.717-4.062h16.95l3.531 3.859v9.303l-4.015 4.387 0.0186 3.92-3.81-4.164-0.3763-4.665 4.125 0.0288-0.1426-7.81-4.015 1.422v2.697l4.157 3.692-4.458 1.351 0.3339-1.38-3.995-3.716-3.658 3.709c2.676 7e-3 1.749 4e-5 7.653 7e-3l0.3763 4.665h-8.587l-4.256-4.651 3.569-3.9 0.0135-2.257-3.574-1.532-8e-3 7.688 3.5 2.322 1.5 1.639z"/></g></svg></span> loses 1 hp for each poison</li>
  <li><span> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" id="st-r"><g transform="translate(-65.48 -103.5)"><path d="m73.73 121.2-4.201-2.362-1.101-3.147 1.672-3.706-0.7288-3.017 2.389 2.075-0.08533 2.619 1.832-2.626-0.2272-2.724 1.174-1.996 1.651-1.078-0.579 2.732 0.9386 1.844 2.048 1.259 0.608-1.777 2.581-1.488-1.067 2.181-0.1118 1.923 1.554 3.915-1.122 3.531-2.891 1.552 1.237-1.879-0.9805-2.03 0.1999-1.629-1.261 1.361 0.1867 1.286-0.7146-1.765 0.3253-1.642-0.2752-1.245-1.354-1.215 0.2979 1.53-0.9465 2.104-0.9277 0.8052-0.5166-1.443-1.029-0.7905 0.4337 1.438-0.8627 2.317 0.3272 1.462z" fill="#9a784e" stroke-opacity="0"/></g></svg></span> The first symbol on a dieface deals 1 extra damage per rage</li>
  <li><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6 6" id="st-stun"><g transform="translate(-462 -273.5)"><g transform="matrix(.9622 0 0 .961 17.55 11.41)" fill="#9a784e" stroke-opacity="0" stroke-width="1.04"><path d="m463.5 273.8 0.1651 1.631-1.253 0.7193 1.441 0.3232 0.1726 1.536 0.9294-1.216 1.538 0.3363-0.8185-1.248 0.7367-1.543-1.643 0.6274z"/><path d="m466.5 275.6-0.3004 0.8317 0.5307 0.8035-0.6851-0.162-0.2717 0.6967 0.7374-0.375 0.6716 0.5217-0.1077-0.7978 0.7198-0.5792-0.9481-0.0776z"/></g></g></svg></span> Can't do anything this turn</li>
  <li><span> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.83 13.55" id="st-w"><g transform="matrix(.8273 0 0 .827 -428.1 -148)" fill="#9a784e" stroke="#000" stroke-opacity="0" stroke-width=".3199"><path d="m523.9 183.8-2.432 5.566-2.245 1.122 0.7951 2.198 1.777-0.5145 1.122 1.684 2.245-0.7484-0.4677-2.432 1.777-4.21-1.871 0.0935z"/><path d="m526.4 184.8 3.542 1.886 0.759 2.214 1.838-0.5631-0.127-2.008 1.365-1.784-1.086-1.635-1.771 0.7375-2.283-0.9702-0.1268 1.354z"/><path d="m527.2 189.8-0.5893 0.6558 0.5893 0.9227 0.7437-0.938z"/><path d="m529.8 191.3 1.544 0.0352-0.7016 1.31-0.5823-0.1619z"/><path d="m521.1 181.2-0.6765 1.492 0.5668 0.3317 1.444-0.597z"/><path d="m524.8 180.7 0.4925 1.537 0.4617-0.1492 0.8465-1.418z"/></g></svg></span> Attacks deal 1 less damage</li>
  `]

  document.querySelector('.q-icon').addEventListener('click', async ()=>{
    let glos = makeElmnt('section', 'glos', `<div class="close-glos">X</div><h1>Glossary</h1>
    <ul class="wrap">${glosInd[0]}</ul>
    <div class="next-glos"></div>`, body);
    glos.ind = 0;
    playSound('paper2');
    glos.querySelector('.close-glos').addEventListener('click', removeGlos);
    glos.querySelector('.next-glos').addEventListener('mouseenter', ()=>{
      playSound('hover')
    });
    glos.querySelector('.close-glos').addEventListener('mouseenter', ()=>{
      playSound('hover')
    });
    glos.querySelector('.next-glos').addEventListener('click', ()=>{
      playSound('paper2')
      if(glos.ind == 0){
        glos.querySelector('.next-glos').style = 'clip-path: polygon(0 50%, 100% 0, 100% 100%);'
        glos.querySelector('.wrap').innerHTML = glosInd[1];
        glos.ind = 1;
      } else {
        glos.querySelector('.next-glos').style = 'clip-path: polygon(100% 50%, 0 0, 0 100%);'
        glos.querySelector('.wrap').innerHTML = glosInd[0];
        glos.ind = 0;
      }
    })
  })

  const removeGlos = ()=>{
    playSound('paper');
    document.querySelectorAll('.glos').forEach(g=>{
      g.remove();
    });
  };

  const startNewGame = async () => {
    if(pl.stage == 1){
      pl.landEvents.push('Shrine');
    } else if(pl.stage == 2){
      pl.seaEvents.push('UnderwaterChest')
    }
    if(pl.stage == 0){
      // pl.tut = true;
    }
    await shuffle(pl.shopTr, seed[5]);
    await shuffle(pl.comTr, seed[5]);
    await shuffle(pl.uncomTr, seed[5]);
    await shuffle(pl.rareTr, seed[5]);
    await shuffle(pl.gemArr, seed[5]);
    await shuffle(pl.landEvents, seed[4]);
    await shuffle(pl.seaEvents, seed[4]);
    await shuffle(pl.bosses, seed[1]);
    roomTip = {
      B: `Captain<br>${window[pl.bosses[0]].name} ${window[pl.bosses[0]].Lastname}`,
      A: "pirate",
      C: "quartermaster",
      F: "message bottle",
      M: `Ruins`,
      R: "bonfire",
      S: "tavern",
      T: "treasure chest",
    };
    
    makeMap();
    
    await sleep(500);
    // if(pl.stage == 0) enterRoom("T");
    // else enterRoom('pros')
    enterRoom('pros')
    await sleep(3000);
    body.classList = '';
    // addTreasure(C39, pl)
  };
  
  startNewGame();