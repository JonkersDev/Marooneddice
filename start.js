document.querySelector('.start-game').addEventListener('click', ()=>{
    document.body.style.transition = '0.5s ease';
    document.body.style.opacity = '0';;
    setTimeout(()=>{
        window.location = 'game.html';
    }, 500);
})                 

let pl = {};

const Save = ()=>{
    resetPlayerObj();
    window.localStorage.setItem('player', pl);
  }
  
  
  const resetPlayerObj = ()=>{
    pl = JSON.stringify({
      user: 'HannekePanneke',
      name: 'Charles',
      hp: 20,
      mhp: 20,
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
      AoH: 0,
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
      uncomTr: ["C4", "C7", "C8", "C2", "C18", "C29", 'C39'],
      rareTr: ["C27", "C32", "C36"],
      shopTr: ["C19", "C20", "C21", "C23"],
      gemArr: ["C11", "C12", "C16", "C14", "C15"],
      mayanArr: ["C13", "C26", "C28", "C22"],
      seed: [],
      CostumsSeed: '',
      landEvents: ['Market', 'MonkeyJungle', 'shadyMerchant', 'intoTheFog', 'piratecave', 'Butcher', 'DeadPirate', 'CursedHammer'],
      seaEvents: ['Gamble', 'Dive', 'BigFish', 'Whirlpool'],
      bosses: ['Mary', 'seymor', 'Stede'],
      SavedTreasures: ['C6'],
      BBS: true,
    })
  }

  Save();
  let shortcut = document.createElement('link');
shortcut.rel = "shortcut icon";
shortcut.type = "image/x-icon";
shortcut.href = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cg transform='translate(-188 36.6)'%3E%3Cg transform='translate(-54.1 6.81)' stroke-opacity='.0627'%3E%3Cpath d='m242-43.4 20.4 3.43 42.8-2.5-1.88 10.4 6.38-9.88 32.4-1.43-2.98 28.3-7 1.25 6.62 1.5-3.88 13.6 3.4 3.94 1.41 35.5 2.42 15.9-39.5-2.6 2.92-3.98-19.7 3.27-43.8 3.3 1.94-20.3 9.72 3.36-8.66-7.25h3.54l-3.01-5.13-0.707-22.8 5.48-7.42h-5.3z' fill='%23d8d0ab'/%3E%3Cg fill='%239a784e'%3E%3Cpath d='m277 41.2v-8.27l-7.65-7.72 7.51-4.37v4.67l7.88-7.95 15.8-9.21h16.5v16.8l-8.26 8.33v8.12l-8.06-8.14h-16.7v-8.47h17.1l-8.36-8.43-8.74 8.43 25 0.749v-12.9h-8v4.56l3.78 3.81h5.07v5.96h-25.2v6.38z'/%3E%3Cpath d='m269 20.9v-12.4h23.8l-8.1 4.72h-7.78v3.49z'/%3E%3Cpath d='m292-28.4-8.46 4.93-7.5 7.57-16.1 9.38-8.04-4.68v4.27l4.28 7.48 3.9 3.94 63.4 0.512 4.08-4.11 4.37-7.64v-4.03l-7.98 4.65-15.5-9.04-8.6-8.68zm0.262 8.46 7.78 4.53-7.92 4.61-7.85-4.57zm-15.5 8.62h9.25l6.36 3.71h0.421l5.98-3.48h8.26l-5.98 3.48h-8.26l-0.21 0.122 7.83 4.56h7.25l-7.5 4.37-8.04-4.68-7.86 4.58-6.98-4.07 7.12 0.0129 8.19-4.77-0.211-0.122h-9.25z'/%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E";
document.head.append(shortcut);
