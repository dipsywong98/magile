(this.webpackJsonpmagile=this.webpackJsonpmagile||[]).push([[0],{195:function(e,t,n){},196:function(e,t){function n(e){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}n.keys=function(){return[]},n.resolve=n,e.exports=n,n.id=196},201:function(e,t){},203:function(e,t){},213:function(e,t){},215:function(e,t){},242:function(e,t){},243:function(e,t){},248:function(e,t){},250:function(e,t){},257:function(e,t){},276:function(e,t){},302:function(e,t,n){"use strict";n.r(t);var r,a,c,i,o,u=n(3),s=n(0),l=n(13),d=n.n(l),f=(n(195),n(6)),p=n(17),h=n(64),O=n(182),j=n(181),b=function(e){Object(O.a)(n,e);var t=Object(j.a)(n);function n(){var e;Object(h.a)(this,n);for(var r=arguments.length,a=new Array(r),c=0;c<r;c++)a[c]=arguments[c];return(e=t.call.apply(t,[this].concat(a))).maxPlayer=8,e.minPlayer=2,e.turn=0,e.direction=1,e.points=0,e.drawDeck=[],e.stage=[],e.mode=null,e.trashDeck=[],e.playerDeck=[],e.playerHp=[],e.logs=[],e.lastAction=null,e.ignited=!1,e.duel=!1,e}return n}(p.b),E=n(14),g=n(25);!function(e){e[e.PLAY_CARD=0]="PLAY_CARD",e[e.END=1]="END",e[e.DISCARD_CARD=2]="DISCARD_CARD",e[e.TAKE_HIT=3]="TAKE_HIT"}(r||(r={})),function(e){e.EARTH_MAGE="earth_mage",e.WATER_MAGE="water_mage",e.FIRE_MAGE="fire_mage",e.WIND_MAGE="wind_mage",e.THUNDER_MAGE="thunder_mage",e.EARTH_MISSILE="earth_missile",e.WATER_MISSILE="water_missile",e.FIRE_MISSILE="fire_missile",e.WIND_MISSILE="wind_missile",e.THUNDER_MISSILE="thunder_missile",e.LIGHT_MAGILE="light_magile",e.DARK_MAGILE="dark_magile",e.HOMO_IGNITE="homo_ignite",e.HETERO_IGNITE="hetero_ignite",e.ANGEL_GUARD="angel_guard"}(a||(a={})),function(e){e[e.HOMO=0]="HOMO",e[e.HETERO=1]="HETERO"}(c||(c={})),function(e){e.MAGE="mage",e.MISSILE="missile",e.MAGILE="magile",e.IGNITE="ignite",e.ANGEL_GUARD="angel_guard"}(i||(i={})),function(e){e.NONE="none",e.EARTH="earth",e.WATER="water",e.FIRE="fire",e.WIND="wind",e.THUNDER="thunder",e.LIGHT="light",e.DARK="dark"}(o||(o={}));var y,m,I=[o.EARTH,o.WATER,o.FIRE,o.WIND,o.THUNDER,o.LIGHT,o.DARK],v=n(15),A=(y={},Object(v.a)(y,a.EARTH_MAGE,9),Object(v.a)(y,a.WATER_MAGE,9),Object(v.a)(y,a.FIRE_MAGE,9),Object(v.a)(y,a.WIND_MAGE,9),Object(v.a)(y,a.THUNDER_MAGE,9),Object(v.a)(y,a.EARTH_MISSILE,9),Object(v.a)(y,a.WATER_MISSILE,9),Object(v.a)(y,a.FIRE_MISSILE,9),Object(v.a)(y,a.WIND_MISSILE,9),Object(v.a)(y,a.THUNDER_MISSILE,9),Object(v.a)(y,a.LIGHT_MAGILE,3),Object(v.a)(y,a.DARK_MAGILE,3),Object(v.a)(y,a.HOMO_IGNITE,3),Object(v.a)(y,a.HETERO_IGNITE,3),Object(v.a)(y,a.ANGEL_GUARD,6),y),w=function(e,t){switch(t){case c.HOMO:switch(e){case 1:case 2:case 3:case 4:return 1;case 5:case 6:case 7:return 2;default:return 3}case c.HETERO:switch(e){case 1:case 2:case 3:case 4:return 1;case 5:case 6:return 2;default:return 3}default:return 0}},x=function(e){switch(e){case a.EARTH_MAGE:case a.WATER_MAGE:case a.FIRE_MAGE:case a.WIND_MAGE:case a.THUNDER_MAGE:return i.MAGE;case a.EARTH_MISSILE:case a.WATER_MISSILE:case a.FIRE_MISSILE:case a.WIND_MISSILE:case a.THUNDER_MISSILE:return i.MISSILE;case a.LIGHT_MAGILE:case a.DARK_MAGILE:return i.MAGILE;case a.HETERO_IGNITE:case a.HOMO_IGNITE:return i.IGNITE;case a.ANGEL_GUARD:return i.ANGEL_GUARD}},_=function(e,t){return e.reduce((function(e,n){var r=x(n);return e&&(r===t||r===i.MAGILE)}),!0)},D=function(e){switch(e){case a.EARTH_MAGE:case a.EARTH_MISSILE:return o.EARTH;case a.WATER_MAGE:case a.WATER_MISSILE:return o.WATER;case a.FIRE_MAGE:case a.FIRE_MISSILE:return o.FIRE;case a.WIND_MAGE:case a.WIND_MISSILE:return o.WIND;case a.THUNDER_MAGE:case a.THUNDER_MISSILE:return o.THUNDER;case a.LIGHT_MAGILE:return o.LIGHT;case a.DARK_MAGILE:return o.DARK;default:return o.NONE}},T=function(e){return![i.MISSILE,i.MAGE].includes(x(e))},R=function(e){var t=new Set,n=e.filter((function(e){return D(e)!==o.NONE}));return n.forEach((function(e){t.add(D(e))})),t.size===n.length},S=function e(t){return function(n){if(n.playerDeck[t].length>=n.playerHp[t])throw new Error("cannot draw, ".concat(n.players[t]," already has ").concat(n.playerHp[t]," cards"));var r=n.drawDeck[0];if(void 0===r)return e(t)(Object(f.a)(Object(f.a)({},n),{},{drawDeck:Object(p.e)(n.trashDeck),trashDeck:[]}));var a=[].concat(Object(E.a)(n.playerDeck[t]),[r]),c=Object(E.a)(n.playerDeck);return c[t]=a,a.length<n.playerHp[t]?e(t)(Object(f.a)(Object(f.a)({},n),{},{playerDeck:c,drawDeck:n.drawDeck.slice(1)})):Object(f.a)(Object(f.a)({},n),{},{playerDeck:c,drawDeck:n.drawDeck.slice(1)})}},H=function e(t){return function(n){if(1===n.playerHp[t]){var r=x(n.playerDeck[t][0]);if(1===n.playerDeck[t].length&&r!==i.MAGE&&r!==i.MISSILE)return Object(p.d)(e(t),S(t),N({cards:n.playerDeck[t]},t))(n)}return n}},M=function(e){e=Object(f.a)(Object(f.a)({},e),{},{turn:0,direction:1,points:0,drawDeck:[],stage:[],mode:null,trashDeck:[],playerDeck:[],playerHp:[],logs:[],lastAction:null,ignited:!1,duel:!1,winner:null});var t=Object.entries(A).flatMap((function(e){var t=Object(g.a)(e,2),n=t[0],r=t[1];return Array(r).fill(n)}));e.drawDeck=Object(p.e)(t);for(var n=0;n<e.players.length;n++)e.playerDeck[n]=[],e.playerHp[n]=7,e=S(n)(e);return Object(f.a)({},e)},N=function(e,t){var n=e.cards;return function(e){var r=[].concat(Object(E.a)(e.trashDeck),Object(E.a)(n)),a=Object(E.a)(e.playerDeck[t]);n.forEach((function(n){var r=a.indexOf(n);if(-1===r)throw new Error("".concat(e.players[t]," doesnt own card ").concat(n));a.splice(r,1)}));var c=Object(E.a)(e.playerDeck);return c[t]=a,Object(f.a)(Object(f.a)({},e),{},{trashDeck:r,playerDeck:c})}},G=function(e){var t=e.cards;return function(e){return Object(f.a)(Object(f.a)({},e),{},{stage:[].concat(Object(E.a)(e.stage),Object(E.a)(t))})}},k=function(e,t){return function(e){if(e.playerDeck[t].length>e.playerHp[t])throw new Error("Player deck amount is greater than his hp, please discard");return e}},L=function(e,t){var n=e.cards;return function(e){if(3===n.length){if(n.map((function(e){return D(e)})).includes(o.NONE))throw new Error("cannot mix ignite or angel card with mage, missiles and magiles");if(e.duel&&n.map((function(e){return x(e)})).includes(i.MAGILE))throw new Error("cannot play function card during duel")}else{if(1!==n.length)throw new Error("you can only play 1 card or 3 cards");if(e.duel){var t=x(n[0]);if([i.MAGILE,i.IGNITE,i.ANGEL_GUARD].includes(t))throw new Error("cannot play function card during duel")}}return e}},C=function(e,t){var n=e.cards,r=e.mode;return function(e){if(0===e.stage.length){if(null===r||void 0===r)throw new Error("please specify homo transfer or hetero transfer as the first to transfer");if(r===c.HOMO&&1===e.playerHp[(t+1)%e.players.length])throw new Error("can only do hetero transfer when next player is 1 hp");if(1!==n.length)throw new Error("please play one card as the first to transfer");if(x(n[0])!==i.MAGE&&x(n[0])!==i.MISSILE)throw new Error("cannot play function type as the first to transfer");return Object(f.a)(Object(f.a)({},e),{},{mode:r})}return e}},P=function(e){var t=e.cards;return function(e){if(e.mode===c.HOMO&&!e.ignited){if(0===e.stage.length)return Object(f.a)({},e);var n=D(t[0]);if(n!==o.NONE){if(!function(e,t){return e.reduce((function(e,n){return e&&D(n)===t}),!0)}(t,D(e.stage[0])))throw new Error("cannot play color other than ".concat(n," in this homo transfer"));return Object(f.a)({},e)}}return e}},W=function(e){var t=e.cards;return function(e){if(e.mode===c.HETERO&&!e.ignited){if(0===e.stage.length)return Object(f.a)({},e);if(!function(e){return!!e.find((function(e){return D(e)===o.NONE}))}(t)){if(R([].concat(Object(E.a)(e.stage),Object(E.a)(t)))){if(_(t,x(e.stage[0])))return Object(f.a)({},e);throw e.duel?new Error("You may play ".concat(x(e.stage[0])," only")):new Error("You may play ".concat(x(e.stage[0])," or magile only"))}var n=e.stage.map((function(e){return D(e)}));throw new Error("Color ".concat(t.map((function(e){return D(e)})).filter((function(e){return n.includes(e)})).join(", ")," were played. You may play ").concat(I.filter((function(e){return!n.includes(e)})).join(",")," during this hetero transfer"))}}return e}},F=function(e){var t=e.cards;return function(e){if(1===t.length){var n=t[0];if(n===a.HETERO_IGNITE){if(e.mode===c.HETERO)return Object(f.a)(Object(f.a)({},e),{},{ignited:!0});throw new Error("cannot play hetero_ignite during homo transfer")}if(n===a.HOMO_IGNITE){if(e.mode===c.HOMO)return Object(f.a)(Object(f.a)({},e),{},{ignited:!0});throw new Error("cannot play homo_ignite during hetero transfer")}}return e}},U=function(e){var t=e.cards;return function(e){return 1===t.length&&t[0]===a.ANGEL_GUARD?Object(f.a)({},e):e}},Y=function(e){return function(){return function(t){if(e===t)throw new Error("invalid move");return t}}},K=function(e){var t=(e.turn+e.players.length+e.direction)%e.players.length;return Object(f.a)(Object(f.a)({},e),{},{turn:t})},z=function(e){var t=e.playerHp.findIndex((function(e){return e<=0}));return-1!==t?Object(f.a)(Object(f.a)({},e),{},{winner:t}):e},J=function(e){return B(e)?e:X(e)},B=function(e){var t=e.ignited,n=e.duel,r=e.turn,u=e.mode,s=e.playerDeck[r];return!(n||!s.find((function(e){return e===a.ANGEL_GUARD})))||(u===c.HETERO?!(n||!s.find((function(e){return e===a.HETERO_IGNITE})))||(t?s.includes(a.HETERO_IGNITE):s.filter((function(e){return D(e)!==o.NONE})).filter((function(e){return!n||x(e)!==i.MAGILE})).filter((function(t){return _([t],x(e.stage[0]))})).filter((function(t){return!e.stage.map((function(e){return D(e)})).includes(D(t))})).length>0):!(n||!s.find((function(e){return e===a.HOMO_IGNITE})))||(t?s.includes(a.HOMO_IGNITE):s.filter((function(t){return D(t)===D(e.stage[0])})).length>0))},X=function(e){if(null!==e.mode){var t=e.turn,n=e.stage.filter((function(e){return x(e)===i.IGNITE})).length,r=w(e.stage.filter((function(e){return D(e)!==o.NONE})).length,e.mode)+n+(e.duel?1:0),a=Object(E.a)(e.playerHp);return a[t]-=r,Object(f.a)(Object(f.a)({},e),{},{playerHp:a,ignited:!1,duel:e.duel||a[t]<=3,mode:null})}return e},q=function(e,t){return function(n){if(n.playerDeck[t].length-e.cards.length!==n.playerHp[t])throw new Error("should discard ".concat(n.playerDeck[t].length-n.playerHp[t]," cards"));return n}},Q=function(e){return Object(f.a)(Object(f.a)({},e),{},{stage:[],trashDeck:Object(E.a)(e.stage),lastAction:null})},V=function(e,t){var n=t.peerId;if(void 0===n)throw new Error("Expect peerId in action");var a=function(){var t=e.nameDict[e.members[n]];if(void 0===t)throw new Error("game not started");return t};switch(t.type){case p.a.START:return M(e);case r.PLAY_CARD:return function(e,t){return function(n){if(n.turn!==e)throw new Error("not your turn");var r=p.d.apply(void 0,[z,J,K,H(e),S(e)].concat(Object(E.a)([G,N,Y(n),U,F,W,P,L,C,k].map((function(n){return n(t,e)})))))(n);return Object(f.a)(Object(f.a)({},r),{},{lastAction:Object(f.a)(Object(f.a)({},t),{},{playerId:e})})}}(a(),t.payload)(JSON.parse(JSON.stringify(e)));case r.DISCARD_CARD:return p.d.apply(void 0,[Q].concat(Object(E.a)([N,q].map((function(e){return e(t.payload,a())})))))(JSON.parse(JSON.stringify(e)));case r.TAKE_HIT:return z(X(e));case r.END:return Object(f.a)(Object(f.a)({},e),{},{started:!1,ready:{}})}return e},Z=function(e){return Object.entries(e).sort((function(e,t){return t[1]-e[1]}))},$=function(e,t){return{type:r.PLAY_CARD,payload:{cards:e,mode:t}}},ee=function(e,t){var n=Object(E.a)(e.playerDeck[t]),r=Z(function(e){return e.map((function(e){return D(e)})).filter((function(e){return e!==o.NONE})).reduce((function(e,t){var n;return Object(f.a)(Object(f.a)({},e),{},Object(v.a)({},t,(null!==(n=e[t])&&void 0!==n?n:0)+1))}),{})}(n)),a=Z(function(e,t){return e.filter((function(e){return D(e)!==o.NONE})).filter((function(e,t,n){return n.indexOf(e)===t})).reduce((function(e,n){var r,a,c,o,u=x(n);return u!==i.MAGILE||t?Object(f.a)(Object(f.a)({},e),{},Object(v.a)({},u,(null!==(r=e[u])&&void 0!==r?r:0)+1)):(o={},Object(v.a)(o,i.MISSILE,(null!==(a=e[i.MISSILE])&&void 0!==a?a:0)+1),Object(v.a)(o,i.MAGE,(null!==(c=e[i.MAGE])&&void 0!==c?c:0)+1),o)}),{})}(n,e.duel));console.log({byColor:r,byType:a});var u=r[0][1]<=a[0][1]&&n.filter((function(e){return x(e)===i.MAGILE})).length<a[0][1]?c.HETERO:c.HOMO;return u===c.HOMO?$([n.find((function(e){return D(e)===r[0][0]}))],u):$([n.find((function(e){return x(e)===a[0][0]}))],u)},te=function(e,t){return e.playerDeck[t].length>e.playerHp[t]?function(e,t){var n,a=Object(E.a)(e.playerDeck[t]),c=a.length-e.playerHp[t],i=[];if(e.duel)for(;i.length<c&&a.find(T);)i.push(a.splice(a.findIndex(T),1)[0]);for(;i.length<c;)i.push(a.splice((n=a.length,Math.floor(Math.random()*n)),1)[0]);return{type:r.DISCARD_CARD,payload:{cards:i}}}(e,t):0===e.stage.length?ee(e,t):function(e,t){var n=e.playerDeck[t],i=e.mode,o=e.ignited,u=e.duel;if(i===c.HOMO){if(!o){var s=D(e.stage[0]),l=n.filter((function(e){return D(e)===s}));if(l.length>3)return $(l.slice(0,3));if(l.length>0)return $([l[0]])}if(!u){var d=n.find((function(e){return e===a.HOMO_IGNITE}));if(d)return $([d]);var f=n.find((function(e){return e===a.ANGEL_GUARD}));if(f)return $([f])}}else{if(!o){var p=e.stage.map((function(e){return D(e)})),h=x(e.stage[0]),O=new Set(I.filter((function(e){return!p.includes(e)}))),j=n.filter((function(e){var t=D(e);return!(x(e)!==h||!O.has(t))&&(O.delete(t),!0)}));if(console.log("playable colors",O,j),j.length>3)return $(j.slice(0,3));if(j.length>0)return $([j[0]])}if(!u){var b=n.find((function(e){return e===a.HETERO_IGNITE}));if(b)return $([b]);var E=n.find((function(e){return e===a.ANGEL_GUARD}));if(E)return $([E])}}return console.warn("AI PLAY CARD REACH EDGE CASE, TAKE HIT",e,t),{type:r.TAKE_HIT}}(e,t)},ne=Object(s.createContext)(null),re=function(){var e=Object(s.useContext)(ne);if(null===e)throw new Error("please wrap it using withGameNetwork before calling this hook");return e},ae=n(30),ce=n(18),ie=n.n(ce),oe=n(29),ue=n(350),se=n(340),le={angel_guard:n.p+"static/media/angel_guard.16ea5f11.png",dark_magile:n.p+"static/media/dark_magile.1e723600.png",earth_mage:n.p+"static/media/earth_mage.e84ed39c.png",earth_missile:n.p+"static/media/earth_missile.c93568e4.png",fire_mage:n.p+"static/media/fire_mage.0e5240db.png",fire_missile:n.p+"static/media/fire_missile.6d251f43.png",hetero_ignite:n.p+"static/media/hetero_ignite.4942ab4f.png",homo_ignite:n.p+"static/media/homo_ignite.0dedd4a2.png",light_magile:n.p+"static/media/light_magile.787bb1b9.png",thunder_mage:n.p+"static/media/thunder_mage.fea8f838.png",thunder_missile:n.p+"static/media/thunder_missile.bb1203a2.png",water_mage:n.p+"static/media/water_mage.c01f4c8a.png",water_missile:n.p+"static/media/water_missile.fb44c368.png",wind_mage:n.p+"static/media/wind_mage.64b5492a.png",wind_missile:n.p+"static/media/wind_missile.c08191d4.png"},de=n(351),fe=n.n(de),pe=n(86),he=n(87),Oe=n(347),je=Object(ue.a)((function(){return{root:{padding:"16px",width:"110px",height:"160px",borderRadius:"8px",cursor:"pointer",userSelect:"none",transition:"transform 0.1s ease-in-out",transformOrigin:"center","&:hover":{}}}})),be=function(e){var t=e.style,n=e.card,r=e.onClick,a=e.disabled,c=e.selected,i=e.isDelete,o=je();return Object(u.jsxs)(se.a,{elevation:4,style:Object(f.a)({pointerEvents:a?"none":"auto",backgroundImage:"url(".concat(le[n],")"),backgroundSize:"cover",position:"relative"},t),className:o.root,onClick:a?void 0:r,children:[Object(u.jsx)("h2",{style:{fontFamily:"Big Shoulders Inline Text, inherit",margin:0,color:"white",textShadow:"5px 3px 8px black"},children:n}),c&&Object(u.jsx)("div",{style:{position:"absolute",top:0,right:0},children:i?Object(u.jsx)(Oe.a,{style:{color:pe.a[500]},fontSize:"large"}):Object(u.jsx)(fe.a,{style:{color:he.a[500]},fontSize:"large"})})]})},Ee=n(341),ge=n(343),ye=n(352),me=n(353),Ie=n(356),ve=n(354),Ae=n.n(ve),we=n(355),xe=n.n(we),_e=.3,De=function(e){var t=e.maxWidth,n=e.style,r=Object(s.useState)(t),a=Object(g.a)(r,2),c=a[0],i=a[1];return Object(s.useEffect)((function(){setTimeout((function(){i("0")}),1)}),[]),Object(u.jsx)("div",{style:Object(f.a)({maxWidth:c,minWidth:c,transition:"min-width ".concat(_e,"s ease-in-out"),position:"relative"},n)})};!function(e){e[e.FIRST_PLAY=0]="FIRST_PLAY",e[e.RESPOND_PLAY=1]="RESPOND_PLAY",e[e.DISCARD=2]="DISCARD"}(m||(m={}));var Te=function(e){var t=e.cards,n=e.hide,r=e.reveal,a=e.onCardsChoose,i=e.chooseCardFor,o=e.takeHit,l=e.myTurn,d=Object(s.useState)([]),f=Object(g.a)(d,2),p=f[0],h=f[1],O=Object(s.useState)(null),j=Object(g.a)(O,2),b=j[0],y=j[1],I=Object(s.useState)(!1),v=Object(g.a)(I,2),A=v[0],w=v[1],x=Object(s.useState)(!1),_=Object(g.a)(x,2),D=_[0],T=_[1],R=Object(s.useReducer)((function(e,t){var n=t.type,r=t.payload;switch(n){case"add":return void 0!==r&&e.add(r),new Set(e);case"delete":return void 0!==r&&e.delete(r),new Set(e);case"clear":return new Set;default:return e}}),new Set),S=Object(g.a)(R,2),H=S[0],M=S[1],N=function(){var e=Object(oe.a)(ie.a.mark((function e(t,n){return ie.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:H.has(n)?M({type:"delete",payload:n}):M({type:"add",payload:n});case 1:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),G=function(e){var n=e===c.HOMO||e===c.HETERO?e:void 0,r=i===m.DISCARD;a({cards:t.filter((function(e,t){return H.has(t)})),mode:n}).then((function(){T(r),y(null),h(Array.from(H)),M({type:"clear"}),setTimeout((function(){w(!0)}),1),setTimeout((function(){w(!1),h([]),T(!1)}),500)})).catch((function(e){console.error(e)}))},k=function(e,n){var r=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return Object(u.jsx)("div",{style:{padding:r?0:"8px",maxWidth:"calc(100vw / ".concat(t.length+2,")"),transition:"max-width ".concat(_e/3,"s ease-in-out")},onMouseEnter:function(){return y(n)},onTouchStart:function(){return y(n)},onMouseLeave:function(){return y(null)},onTouchEnd:function(){return y(null)},children:e})};return Object(u.jsxs)("div",{style:{position:"fixed",bottom:0,left:0,right:0,zIndex:1,transform:n?"translateY(100%)":"translateY(50%)",transition:"transform 0.3s ease-in-out",pointerEvents:"none"},children:[Object(u.jsx)("div",{style:{textAlign:"center",transform:"translateY(-80px)",margin:"auto",display:"block",pointerEvents:"all"},children:l?Object(u.jsxs)(u.Fragment,{children:[n&&Object(u.jsx)(Ee.a,{variant:"contained",onClick:r,children:Object(u.jsx)(ge.a,{})}),!n&&i===m.RESPOND_PLAY&&Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)(Ee.a,{variant:"contained",title:"take hit",color:"secondary",onClick:function(){return window.confirm("Are you sure you want to take hit?")&&o().catch(console.error)},children:Object(u.jsx)(ye.a,{})}),Object(u.jsx)(Ee.a,{style:{marginLeft:"8px"},variant:"contained",title:"play",color:"primary",onClick:G,children:Object(u.jsx)(me.a,{})})]}),!n&&i===m.FIRST_PLAY&&Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)(Ee.a,{variant:"contained",title:"homo",color:"primary",onClick:function(){return G(c.HOMO)},children:Object(u.jsx)(Ae.a,{})}),Object(u.jsx)(Ee.a,{style:{marginLeft:"8px"},variant:"contained",title:"hetero",color:"primary",onClick:function(){return G(c.HETERO)},children:Object(u.jsx)(xe.a,{})})]}),!n&&i===m.DISCARD&&Object(u.jsx)(u.Fragment,{children:Object(u.jsx)(Ee.a,{variant:"contained",color:"secondary",title:"trash",onClick:G,children:Object(u.jsx)(Ie.a,{})})})]}):"not your turn"}),Object(u.jsxs)("div",{style:{display:"flex",justifyContent:"center",flexWrap:"nowrap"},children:[function(){for(var e=[],n=0,r=0;r<t.length;r++)p.includes(r)?e.push(null):(e.push(t[n]),n++);return D?[].concat(e,Object(E.a)(t.slice(n))):e}().map((function(e,r){return null===e?Object(u.jsx)(De,{maxWidth:"calc(100vw / ".concat(t.length+2," + 16px)")},r):k(Object(u.jsx)(be,{card:e,onClick:function(){return N(e,r)},disabled:n,style:{transform:b===r||H.has(r)?"translateY(-30%)":"translateY(-15%)"},selected:H.has(r),isDelete:i===m.DISCARD}),r)})),p.length>0&&!D&&Object(u.jsx)("div",{style:{maxWidth:A?"calc((100vw / ".concat(t.length+2," + 16px) * ").concat(p.length,")"):"0",transition:"max-width ".concat(_e,"s ease-in-out"),display:"flex",flexWrap:"nowrap"},children:t.slice(t.length-p.length).map((function(e,r){return k(Object(u.jsx)(be,{card:e,onClick:function(){return N(e,r)},disabled:n,style:{transform:A?void 0:"translateX(100vw)"},selected:H.has(r)}),r+t.length,!1)}))})]})]})},Re=n(359),Se=n(348),He=n(349),Me=n(357),Ne=n(342),Ge=function(){var e=re(),t=e.state,n=e.dispatch,a=e.dispatchAs,c=e.myPlayerId,i=e.myLocals,o=e.hideDeck,l=e.setHideDeck,d=e.error,f=e.setError,p=e.renderedDeckId,h=Object(s.useState)(p),O=Object(g.a)(h,2),j=O[0],b=O[1],E=function(e){console.error("HANDLE ERROR"),f(e.message)},y=t.turn===c||i.includes(t.players[t.turn]),I=function(){var e=Object(oe.a)(ie.a.mark((function e(r){return ie.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,t.turn!==c){e.next=6;break}return e.next=4,n(r).then((function(){return f("")}));case 4:e.next=12;break;case 6:if(!i.includes(t.players[t.turn])){e.next=11;break}return e.next=9,a(t.turn,r).then((function(){return f("")}));case 9:e.next=12;break;case 11:throw new Error("Not my turn");case 12:e.next=18;break;case 14:throw e.prev=14,e.t0=e.catch(0),E(e.t0),e.t0;case 18:case"end":return e.stop()}}),e,null,[[0,14]])})));return function(t){return e.apply(this,arguments)}}(),v=function(){var e=Object(oe.a)(ie.a.mark((function e(t){var n;return ie.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={type:r.PLAY_CARD,payload:t},e.next=3,I(n).then((function(){i.length>0&&l(!0)}));case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),A=function(){var e=Object(oe.a)(ie.a.mark((function e(t){var n;return ie.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={type:r.DISCARD_CARD,payload:t},e.next=3,I(n);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),w=function(){var e=Object(oe.a)(ie.a.mark((function e(){var t;return ie.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t={type:r.TAKE_HIT},e.next=3,I(t);case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();Object(s.useEffect)((function(){setTimeout((function(){b(p)}),500)}),[p]);var x=m.RESPOND_PLAY;0===t.stage.length&&(x=m.FIRST_PLAY),void 0!==j&&null!==j&&t.playerDeck[j].length>t.playerHp[j]&&(x=m.DISCARD);var _=function(){var e=Object(oe.a)(ie.a.mark((function e(t){return ie.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(x!==m.DISCARD){e.next=5;break}return e.next=3,A(t);case 3:e.next=7;break;case 5:return e.next=7,v(t);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(u.jsxs)("div",{style:{pointerEvents:"all",color:"white"},children:[t.started&&void 0!==c&&Object(u.jsx)(Te,{cards:t.playerDeck[null!==j&&void 0!==j?j:c],onCardsChoose:_,chooseCardFor:x,hide:o,reveal:function(){return l(!1)},takeHit:w,myTurn:y}),Object(u.jsx)("div",{style:{maxHeight:"50%"},children:t.logs.slice().reverse().map((function(e,t){return Object(u.jsx)("div",{children:e},t)}))}),Object(u.jsxs)(Re.a,{open:""!==d,onClose:function(){return f("")},"aria-labelledby":"form-dialog-title",children:[Object(u.jsx)(Se.a,{children:"Error"}),Object(u.jsx)(He.a,{children:Object(u.jsx)(Me.a,{children:d})}),Object(u.jsx)(Ne.a,{children:Object(u.jsx)(Ee.a,{onClick:function(){return f("")},color:"primary",children:"Close"})})]})]})},ke=function(){var e=re(),t=e.state,n=e.myPlayerId,a=e.dispatch,l=Object(s.useState)(null),d=Object(g.a)(l,2),p=d[0],h=d[1],O=Object(s.useState)(!1),j=Object(g.a)(O,2),b=j[0],E=j[1],y=Object(s.useState)(!1),m=Object(g.a)(y,2),I=m[0],v=m[1];Object(s.useEffect)((function(){v(!0),setTimeout((function(){E(!0)}),1),setTimeout((function(){h(t.stage),E(!1),v(!1)}),300)}),[t.lastAction]);var A=function(){var e=Object(oe.a)(ie.a.mark((function e(){return ie.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a({type:r.END}).catch(console.error);case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),_=function(){if(t.started)return null!==t.winner?"Loser is ".concat(t.players[t.winner]):t.playerDeck[t.turn].length>t.playerHp[t.turn]?"".concat(t.players[t.turn]," discard card til ").concat(t.playerHp[t.turn]):0===t.stage.length?"".concat(t.players[t.turn]," initializing transfer"):"".concat(t.players[t.turn]," responding to ").concat(t.mode===c.HOMO?"homo":"hetero"," transfer. Current damage: ").concat(function(e){var t=e.stage.filter((function(e){return x(e)===i.IGNITE})).length;return w(e.stage.filter((function(e){return D(e)!==o.NONE})).length,e.mode)+t+(e.duel?1:0)}(t))}(),T=function(){if(t.started){if(null!==t.winner)return"Game Over";if(t.duel)return"DUEL! NO Function card and each hit will deduct 1 more hp!";if(t.ignited)return"IGNITED! Respond only with same ignited or angel guard!"}}();return t.started?Object(u.jsxs)("div",{style:{backgroundColor:"green",position:"fixed",top:0,left:0,right:0,bottom:0,color:"white",boxShadow:t.duel?"inset 0 0 100px #ff9d9d":void 0,transition:"box-shadow 0.3s ease-in-out"},children:[Object(u.jsx)("div",{style:{display:"flex",justifyContent:"space-around",margin:"auto"},children:new Array(t.players.length).fill(0).map((function(e,r){return(r+(null!==n&&void 0!==n?n:0)+t.playerHp.length)%t.playerHp.length})).filter((function(e){return e!==(null!==n&&void 0!==n?n:0)})).map((function(e){return Object(u.jsxs)("div",{style:{border:"solid ".concat(t.turn===e?"red":"transparent"," 2px"),padding:"16px 32px"},children:[t.players[e]," : ",t.playerHp[e]]})}))}),null!==p&&Object(u.jsx)("div",{style:Object(f.a)({position:"absolute"},{top:"50vh",left:"50vw"}),children:Object(u.jsxs)("div",{style:{transform:"translate(-50%,-50%)",textAlign:"center"},children:[T&&Object(u.jsx)("h3",{children:T}),Object(u.jsx)("h1",{children:_}),void 0!==t.winner&&null!==t.winner&&Object(u.jsx)("div",{children:Object(u.jsx)(Ee.a,{variant:"contained",color:"primary",onClick:A,children:"again"})}),Object(u.jsx)("div",{style:{display:"flex",justifyContent:"center"},children:p.map((function(e){return Object(u.jsx)("div",{style:{padding:"8px"},children:Object(u.jsx)(be,{card:e,disabled:!0})})}))})]})}),I&&null!==t.lastAction&&Object(u.jsx)("div",{style:{display:"flex",position:"absolute",left:"50vw",top:b?"50vh":t.lastAction.playerId===n?"100vh":"-100%",transition:["top","bottom","left","right"].map((function(e){return"".concat(e," 0.2s ease-in-out")})).join(",")},children:Object(u.jsx)("div",{style:{transform:"translate(-50%,-50%)",display:"flex"},children:t.lastAction.cards.map((function(e){return Object(u.jsx)("div",{style:{padding:"8px"},children:Object(u.jsx)(be,{card:e,disabled:!0})})}))})}),Object(u.jsxs)("h3",{style:{position:"absolute",bottom:0,right:"20px"},children:["Draw Deck: ",t.drawDeck.length]})]}):Object(u.jsx)("div",{style:{backgroundColor:"green",position:"fixed",top:0,left:0,right:0,bottom:0,color:"white"}})},Le={en:Object(f.a)(Object(f.a)({},ae.e.en),{},{magile:"Magile",howToPlay:"How To Play",howToPlayContent:Object(u.jsx)("div",{children:"TBA"})}),zh:Object(f.a)(Object(f.a)({},ae.e.zh),{},{magile:"\u9b54\u6cd5\u98db\u5f48\u5927\u4f5c\u6230",howToPlay:"\u73a9\u6cd5",howToPlayContent:Object(u.jsx)("div",{children:"\u9084\u6c92\u6709\u54e6"})})},Ce=Object(ae.g)({i18ns:Le})(function(e){var t=function(t){var n=Object(p.f)(V,new b),r=n.myAis,a=n.state,c=n.dispatchAs;return Object(s.useEffect)((function(){if(void 0!==te&&r.includes(a.players[a.turn])&&a.started&&null===a.winner){var e=window.setTimeout((function(){var e=te(a,a.turn);c(a.turn,e).catch(console.error)}),1e3);return function(){window.clearTimeout(e)}}}),[c,r,a]),Object(u.jsx)(ne.Provider,{value:n,children:Object(u.jsx)(e,Object(f.a)({},t))})};return t.displayName="WithGameNetwork",t}((function(){var e=re(),t=Object(ae.f)().i18n;return Object(u.jsxs)(ae.a,{gameAppState:e.gameAppState,fullPage:[!1,!1,!0],GameRenderer:Object(u.jsx)(ke,{}),children:[Object(u.jsx)(ae.b,Object(f.a)(Object(f.a)({},e),{},{gameName:t.magile,children:Object(u.jsxs)(He.a,{children:[Object(u.jsx)("h2",{children:t.howToPlay}),Object(u.jsx)("div",{children:t.howToPlayContent})]})})),Object(u.jsx)(ae.d,Object(f.a)({},e)),Object(u.jsx)(Ge,{}),Object(u.jsx)("div",{style:{position:"fixed",top:0,right:0,zIndex:100},children:Object(u.jsx)(ae.c,{})})]})}))),Pe=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,361)).then((function(t){var n=t.getCLS,r=t.getFID,a=t.getFCP,c=t.getLCP,i=t.getTTFB;n(e),r(e),a(e),c(e),i(e)}))};d.a.render(Object(u.jsx)(Ce,{}),document.getElementById("root")),Pe()}},[[302,1,2]]]);
//# sourceMappingURL=main.073590bb.chunk.js.map