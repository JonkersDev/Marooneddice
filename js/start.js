document.querySelector('.start-game').addEventListener('click', ()=>{
    document.body.style.transition = '0.5s ease';
    document.body.style.opacity = '0';;
    setTimeout(()=>{
        window.location = 'game.html';
    }, 500);
})                 

const Save = ()=>{
    resetPlayerObj();
  
    // pl.treasures = [C1]
    pl.SavedTreasures = [];
    pl.treasures.forEach((t)=>{
      pl.SavedTreasures.push(t.id);
    })
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
    }
  }

  Save();