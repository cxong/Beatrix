var screenStart = {
  alwaysWin: true,
  BPM: 133,
  b : {drum: DrumDefs.BD},
  m : {drum: DrumDefs.ME},
  a : {drum: DrumDefs.CLA},
  t : {drum: DrumDefs.TAM},
  r : {drum: DrumDefs.RIM},
  i : {drum: DrumDefs.BHI},
  s : {drum: DrumDefs.SD},
  B : {drum: DrumDefs.BD, beat: ["right", "up"], period: 16},
  o : {drum: DrumDefs.HO},
  x : {drum: DrumDefs.BLO},
  solution : ["        "],
  cells : [
"          xxxxx                 ",
"          xxxxxx                ",
"          xxxxxx                ",
"          xxxxxx                ",
"           xxxxx                ",
"           xxxx                 ",
"            xxxx                ",
"            xxxxx               ",
"          xxxxxxx               ",
"   bb  mmmxxaxxttt rr  iii s s  ",
"   b b m xxaxaxxt  r r  i  s s  ",
"   bb  mmxxaxaxxt  rr   i   s   ",
"   b b mxx aaaxxtxxr r  i  s s  ",
"   bbxxmmm axax txxrxr iii s s  ",
"    xxxx  xxxxx   xx            ",
"  o       xxxxx                 ",
"          xxxxxxx               ",
"  o       xxxxxxxxx             ",
"           xxxxxxxxxx           ",
"  o         xxx  xxxxx          ",
"            xxxx  xxxx          ",
"  o          xxx   xxx          ",
"             xxx   xxx          ",
"  o          xxxx  xxx          ",
"             xxxx  xxx          ",
"  o          xxxx  xxxx         ",
"            xxxxx  xxxx         ",
"  o         xxxxx  xxxx         ",
"           xxxxxx xxxxx         ",
"  B b s  s sbbs  so             ",
"            xxxxx   xxx         ",
"            x xxx   x xx        "
]
};

var screenEasy = {
  alwaysWin: true,
  BPM: 67,
  b : {drum: DrumDefs.BD},
  m : {drum: DrumDefs.ME},
  a : {drum: DrumDefs.CLA},
  t : {drum: DrumDefs.TAM},
  r : {drum: DrumDefs.RIM},
  i : {drum: DrumDefs.BHI},
  s : {drum: DrumDefs.SD},
  B : {drum: DrumDefs.BD, beat: ["down"], period: 16},
  o : {drum: DrumDefs.HO},
  x : {drum: DrumDefs.BLO},
  solution : ["        "],
  cells : [
"                                ",
"            xx                  ",
"           xxxx               B ",
"           xxxxx                ",
"            xxx               o ",
"            xxxxx               ",
"             xxxxx            o ",
"      xx    xxxxxxx             ",
"       xxx  xxxxxxx           o ",
"       xxx xxxxxxxxx            ",
"   ss  o  xx iiixxaxx ss t t mo ",
"  s   o o  x ixxxa axs   t t m  ",
"   s  o o    iiixa axxs   tt mo ",
"    s o o    ixxxaaa   s  t     ",
"  ss   o    xiiixa a ss  t   mo ",
"             xxxxx              ",
"            xxxxxx            o ",
"            xx xx               ",
"           xxxxxx             o ",
"           xx xxx               ",
"          xxx xxx               ",
"          xx  xx                ",
"          xx  xxx             s ",
"          xx   xx               ",
"          xxx  xxx              ",
"          xxxx xxxx           s ",
"          xxxx  xxx           b ",
"          xxxx  xxxx            ",
"          xxxxx xxx             ",
"          xxxxx  xx           b ",
"           xxx                s ",
"                                "
]
};

var screenTricky = {
  alwaysWin: true,
  BPM: 80,
  b : {drum: DrumDefs.BD},
  m : {drum: DrumDefs.ME},
  a : {drum: DrumDefs.CLA},
  t : {drum: DrumDefs.TAM},
  r : {drum: DrumDefs.RIM},
  i : {drum: DrumDefs.BHI},
  s : {drum: DrumDefs.SD},
  S : {drum: DrumDefs.SD, bounce: "down"},
  C : {drum: DrumDefs.ME, beat: ["down", "right"], period: 32},
  h : {drum: DrumDefs.HH},
  c : {drum: DrumDefs.ME},
  z : {drum: DrumDefs.ME, bounce: "up"},
  x : {drum: DrumDefs.BLO},
  solution : ["        "],
  cells : [
" c                              ",
"                                ",
" C b sh b  b sh b  b sh b sbb S ",
"          x                   b ",
" c        x  xxxx             b ",
"          xxxxxxx               ",
" c        xxxxxxxx              ",
"           xxxxxx               ",
" c         xxxxx                ",
"   ttt rr  iiixxcc m m b b aa   ",
" c  t  r r  ixxcxx m m b b   a  ",
"    t  rr   ixxcxx mm   bb  a   ",
" c  t  r r  ixxcxxxm m  b       ",
"    t  r r iiixxccxm m b    a   ",
" c          xxxxx  xx           ",
"            xxxxx   x           ",
" z           xxxx   x           ",
"             xxxxx  x           ",
"             xxxxx  x           ",
"            xxxxxx              ",
"           xxxx xx              ",
"           xxx   xx             ",
"          xxx    xx             ",
"          xx     xxx            ",
"          xx      xx            ",
"          xx      xxx           ",
"          xx      xxx           ",
"         xxx      xxxx          ",
"         xxxx      xxx          ",
"          xx       xxx          ",
"        xx         xxx          ",
"                                "
]
};

var screenWin = {
  alwaysWin: true,
  BPM: 155,
  b : {drum: DrumDefs.BD},
  m : {drum: DrumDefs.ME},
  a : {drum: DrumDefs.CLA},
  t : {drum: DrumDefs.TAM},
  r : {drum: DrumDefs.RIM},
  i : {drum: DrumDefs.BHI},
  s : {drum: DrumDefs.SD},
  o : {drum: DrumDefs.HO},
  h : {drum: DrumDefs.HH},
  H : {drum: DrumDefs.HH, beat: ["down"], period: 32},
  B : {drum: DrumDefs.BD, beat: ["down"], period: 32},
  w : {drum: DrumDefs.COW},
  z : {drum: DrumDefs.ME, bounce: "up"},
  x : {drum: DrumDefs.BLO},
  solution : ["        "],
  cells : [
"  B                           H ",
"                                ",
"  h            x                ",
"              xxx               ",
"  s           xxxx            h ",
"              xxxx              ",
"  b          xxxxx            h ",
"             xxxxx              ",
"  h          xxxxxx             ",
"   t t  o  s sxxwxxxw i m  m a  ",
"  bt t o o s sxxwxwxw i mm m ah ",
"    tt o o s sxxwxwxw i m mm a  ",
"  s t  o o s sxxwxw w i m  m  h ",
"   t    o   s xxxwxwx i m  m a  ",
"  h           xxxxxxx           ",
"              xxxxxx            ",
"  h           xxxxxx            ",
"              xxxxxx            ",
"  b           xx xxx          h ",
"              xx  xx            ",
"  s           x   xx          h ",
"             xx   xx            ",
"  h          xx    x            ",
"            xx     x            ",
"  b         xx     xx         h ",
"            x      xx           ",
"  h        xx       x           ",
"           x        x           ",
"  s        x        x         h ",
"           xx       x           ",
"  h                             ",
"                                "
]
};

var screenCredits = {
  alwaysWin: true,
  BPM: 188,
  b : {drum: DrumDefs.BD},
  m : {drum: DrumDefs.ME},
  a : {drum: DrumDefs.CLA},
  t : {drum: DrumDefs.TAM},
  r : {drum: DrumDefs.RIM},
  R : {drum: DrumDefs.RIM, beat: ["right"], period: 32},
  i : {drum: DrumDefs.BHI},
  s : {drum: DrumDefs.SD},
  o : {drum: DrumDefs.HO},
  h : {drum: DrumDefs.HH},
  H : {drum: DrumDefs.HH, beat: ["right"], period: 32},
  B : {drum: DrumDefs.BD, beat: ["right"], period: 32},
  c : {drum: DrumDefs.COW},
  C : {drum: DrumDefs.COW, beat: ["right"], period: 32},
  e : {drum: DrumDefs.BME},
  g : {drum: DrumDefs.GUI},
  x : {drum: DrumDefs.BLO},
  z : {drum: DrumDefs.BHI},
  Z : {drum: DrumDefs.BHI, beat: ["right"], period: 32},
  solution : ["        "],
  cells : [
"          bi                    ",
"   ccooo bb mm  hh              ",
"  c  o ob bim mh h              ",
"   ccooo bbim m hh              ",
"                 h              ",
"   cc          hhx x            ",
"  c  ooomm  hh    x t t         ",
"  c  o om mh h   x xt t         ",
"   ccooom m hh   x x tt         ",
" H   h   h   h   h   h   h   h  ",
"  i   g    hg i s               ",
"  i  g ge eg gis                ",
"  i  gg e egg i s               ",
"  iii gg e  ggis                ",
" B     b b     b b     b b     b",
"m   mi h     g im   m   ti   gxx",
"mm mm cch  ag gimm mma rrtmmg gx",
"m m mc h ha ag im m a artim ggx ",
"m   micc h aaggim   maartim mgxx",
" C       c       c       c      ",
"  tttg  st i                    ",
"   tg gs tt mm  hh              ",
"   tgg  st im mh h              ",
"   t ggs ttim m hh              ",
"                 h              ",
"               hh               ",
" R   r     r     r   r     r    ",
"m   mi h     g ih h  e e        ",
"mm mm cch  ag gihho e em m a mm ",
"m m mc h ha ag ihohoeeeem a am m",
"m   micc h aaggih o e e   maam m",
" Z     x     e     z   e z   e  "
]
};