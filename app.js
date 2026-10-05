
const TASKS=[
{id:1,section:"Grundidee",skill:"Array vs. Liste",afb:"AFB II",points:4,type:"multi",title:"Warum eine neue Datenstruktur?",
prompt:"Welche Aussagen beschreiben Nachteile eines Arrays, wenn häufig Pakete eingefügt und gelöscht werden? Wähle alle fachlich richtigen Aussagen.",
choices:["Beim Einfügen oder Löschen müssen unter Umständen viele Elemente verschoben werden.","Einfügen und Löschen benötigen bei Arrays grundsätzlich immer nur O(1).","Im ungünstigsten Fall kann der Aufwand für Verschiebeoperationen O(n) betragen.","Ein Java-Array kann seine Länge nach der Erzeugung beliebig automatisch verändern.","Ein Java-Array besitzt nach seiner Erzeugung eine feste Länge."],
answers:[0,2,4],
solution:"Richtig sind 1, 3 und 5: Verschiebeoperationen können viele Elemente betreffen und damit im ungünstigsten Fall O(n) benötigen. Außerdem besitzt ein Java-Array eine feste Länge."},

{id:2,section:"Referenzen",skill:"Heap & Referenzen",afb:"AFB II",points:5,type:"multi",title:"Objekte im Heap",
code:`Paket p1 = new Paket("P100", 4.5, "Wiesbaden");
Paket p2 = new Paket("P200", 2.8, "Mainz");
Paket p3 = new Paket("P300", 6.1, "Frankfurt");
Knoten k1 = new Knoten(p1);
Knoten k2 = new Knoten(p2);
Knoten k3 = new Knoten(p3);
k1.setNaechster(k2);
k2.setNaechster(k3);`,
prompt:"Welche Aussagen zum gegebenen Quellcode sind richtig? Wähle alle richtigen Aussagen.",
choices:["Es werden insgesamt sechs Objekte erzeugt: drei Paketobjekte und drei Knotenobjekte.","Es werden nur drei Objekte erzeugt, weil jedes Paket direkt zu einem Knoten gehört.","k3 bildet das Listenende und besitzt null als Nachfolger.","k1 ist über k2 erreichbar; deshalb kann die Referenz auf k1 ohne Folgen verloren gehen.","Geht die einzige erreichbare Referenz auf k1 verloren, ist die Kette über den Listenanfang nicht mehr erreichbar."],
answers:[0,2,4],
solution:"Richtig sind 1, 3 und 5: Es entstehen drei Paket- und drei Knotenobjekte. k3 ist der letzte Knoten. Geht die einzige Referenz auf k1 verloren, ist die Kette vom Listenanfang aus nicht mehr erreichbar."},

{id:3,section:"Traversieren",skill:"Traversierung",afb:"AFB II",points:6,type:"code",title:"Alle Knoten zählen",
prompt:"Implementiere die Methode public int anzahlPakete(). Die Methode soll alle Knoten der einfach verketteten Liste zählen. Verwende dafür eine zusätzliche Laufreferenz, die bei erster beginnt und bis null weitergesetzt wird. Die Referenz erster und die Verkettung der Knoten dürfen nicht verändert werden. Gib am Ende die ermittelte Anzahl zurück.",
focus:["Laufreferenz statt Veränderung von erster","Start bei erster","Traversierung bis null","Zähler korrekt erhöhen","Anzahl zurückgeben"],
starter:`public int anzahlPakete() {\n    // dein Code\n}`,
concepts:[["int"],["aktuell"],["erster"],["while"],["null"],["getNaechster"],["++","+= 1","+ 1"],["return"]],
diagnoses:[
 {test:a=>!a.includes("erster"),name:"Startreferenz fehlt",hint:"Die Laufreferenz muss beim ersten Knoten beginnen."},
 {test:a=>!a.includes("while"),name:"Keine vollständige Traversierung",hint:"Die Anzahl der Knoten ist vorher unbekannt. Welche Schleife passt?"},
 {test:a=>!a.includes("getnaechster"),name:"Laufreferenz wird nicht weitergesetzt",hint:"Nach dem Verarbeiten eines Knotens muss aktuell auf dessen Nachfolger zeigen."},
 {test:a=>/erster\s*=\s*erster\.getnaechster/.test(a),name:"Listenanfang wird zerstört",hint:"Verändere nicht erster. Verwende ausschließlich eine zusätzliche Laufreferenz."}],
solution:`public int anzahlPakete() {
    int anzahl = 0;
    Knoten aktuell = erster;
    while (aktuell != null) {
        anzahl++;
        aktuell = aktuell.getNaechster();
    }
    return anzahl;
}`},

{id:4,section:"Simulation",skill:"Referenzänderung",afb:"AFB II",points:5,type:"heap-insert",title:"P250 hinter P200 einfügen",
prompt:"Füge in der Simulation den Knoten P250 direkt hinter P200 ein. Ausgangsstruktur: P100 → P200 → P300 → null. Zielstruktur: P100 → P200 → P250 → P300 → null. Führe die Referenzänderungen so aus, dass der bisherige Nachfolger P300 zu keinem Zeitpunkt verloren geht.",
focus:["P300 erreichbar halten","P250 mit P300 verknüpfen","P200 anschließend mit P250 verknüpfen"],
solution:"Zuerst P250 → P300 sichern, danach P200 → P250 setzen. So bleibt P300 erreichbar."},

{id:5,section:"Einfügen",skill:"Referenzänderung",afb:"AFB III",points:5,type:"mc",title:"Warum ist die Reihenfolge wichtig?",
prompt:"Wähle die Befehlsfolge, die den neuen Knoten neu direkt hinter aktuell einfügt. Prüfe dabei insbesondere, welche Referenz zuerst gesetzt werden muss, damit der bisherige Nachfolger von aktuell nicht verloren geht.",
focus:["Bisherigen Nachfolger erhalten","Reihenfolge der beiden Referenzänderungen","neu liegt danach direkt hinter aktuell"],
choices:[
`aktuell.setNaechster(neu);\nneu.setNaechster(aktuell.getNaechster());`,
`neu.setNaechster(aktuell.getNaechster());\naktuell.setNaechster(neu);`,
`neu.setNaechster(aktuell);\naktuell.setNaechster(neu);`,
`aktuell = neu;\nneu.setNaechster(null);`],answer:1,
diagnoses:[{name:"Referenzverlust",hint:"Bevor aktuell.naechster überschrieben wird, muss die bisherige Referenz auf den alten Nachfolger gesichert werden."}],
solution:"Zuerst übernimmt neu den bisherigen Nachfolger. Erst danach zeigt aktuell auf neu."},

{id:6,section:"Löschen",skill:"Löschen & Sonderfälle",afb:"AFB III",points:8,type:"code",title:"Fehlerhaften Löschalgorithmus korrigieren",
code:`public boolean loeschen(String paketnummer) {
    Knoten aktuell = erster;
    while (aktuell != null) {
        if (aktuell.getPaket().getPaketnummer().equals(paketnummer)) {
            aktuell = aktuell.getNaechster();
            return true;
        }
        aktuell = aktuell.getNaechster();
    }
    return false;
}`,
prompt:"Analysiere zunächst den Fehler der vorgegebenen Methode: Erkläre, warum die Zuweisung an aktuell allein keinen Knoten aus der Liste entfernt. Implementiere anschließend eine korrekte Methode loeschen(String paketnummer). Deine Lösung muss (1) eine leere Liste, (2) das Löschen des ersten Knotens, (3) das Löschen eines inneren Knotens und (4) den Fall 'nicht gefunden' korrekt behandeln. Verwende geeignete Referenzen auf den aktuellen Knoten und seinen Vorgänger.",
focus:["Warum die ursprüngliche Methode nicht löscht","Vorgänger und aktueller Knoten","Sonderfall erster Knoten","Inneren Knoten durch Umhängen entfernen","Leere Liste / nicht gefunden"],
starter:`public boolean loeschen(String paketnummer) {\n    // korrigierter Code\n}`,
concepts:[["vorher"],["aktuell"],["erster"],["while"],["equals"],["vorher == null","vorher==null"],["erster = aktuell.getnaechster","erster=aktuell.getnaechster"],["vorher.setnaechster"],["return true"],["return false"]],
diagnoses:[
 {test:a=>!a.includes("vorher"),name:"Vorgängerreferenz fehlt",hint:"Um einen inneren Knoten zu umgehen, brauchst du Zugriff auf seinen Vorgänger."},
 {test:a=>!/(vorher\s*==\s*null)/.test(a),name:"Sonderfall erstes Element fehlt",hint:"Beim ersten Knoten existiert kein Vorgänger. Wie erkennst du diesen Fall?"},
 {test:a=>!/(erster\s*=\s*aktuell\.getnaechster)/.test(a),name:"erster wird beim Löschen des ersten Knotens nicht angepasst",hint:"Worauf muss erster zeigen, wenn der bisher erste Knoten entfernt wird?"},
 {test:a=>!a.includes("vorher.setnaechster"),name:"Innerer Knoten wird nicht aus der Kette entfernt",hint:"Der Vorgänger muss anschließend direkt auf den Nachfolger des zu löschenden Knotens zeigen."}],
solution:`public boolean loeschen(String paketnummer) {
    Knoten vorher = null;
    Knoten aktuell = erster;
    while (aktuell != null) {
        if (aktuell.getPaket().getPaketnummer().equals(paketnummer)) {
            if (vorher == null) {
                erster = aktuell.getNaechster();
            } else {
                vorher.setNaechster(aktuell.getNaechster());
            }
            return true;
        }
        vorher = aktuell;
        aktuell = aktuell.getNaechster();
    }
    return false;
}`},

{id:70,section:"Algorithmuslabor",skill:"Löschen schrittweise",afb:"AFB II/III",points:7,type:"algo-delete",title:"loeschen(\"P300\") Schritt für Schritt",
prompt:"Führe den Löschalgorithmus für die Liste P100 → P200 → P300 → P400 → null selbst aus. Entscheide in jedem Schritt, was als Nächstes geschehen muss. Die App zeigt vorher, aktuell und die Listenstruktur.",
solution:"P100 und P200 werden nacheinander geprüft. Dabei wandern vorher und aktuell weiter. Bei P300 ist die Bedingung erfüllt; vorher (P200) wird direkt mit P400 verbunden. Danach liefert die Methode true."},

{id:7,section:"Komplexität",skill:"Komplexität",afb:"AFB III",points:5,type:"multi",title:"Ist Löschen O(1)?",
prompt:"Beurteile die Aussage „Das Löschen eines Pakets aus einer einfach verketteten Liste hat immer O(1).“ Welche Aussagen sind richtig? Wähle alle richtigen Aussagen.",
choices:["Ist der zu löschende Knoten bzw. sein Vorgänger bereits bekannt, kann das eigentliche Umhängen der Referenzen O(1) benötigen.","Wird das Paket erst anhand seiner Paketnummer gesucht, kann die Suche im ungünstigsten Fall O(n) benötigen.","Die gesamte Löschoperation ist deshalb unabhängig von der Ausgangssituation immer O(1).","Bei einer Suche nach Paketnummer kann es notwendig sein, die Liste Knoten für Knoten zu durchlaufen.","Da eine verkettete Liste keine Indizes besitzt, ist auch das reine Umhängen einer bereits bekannten Referenz immer O(n)."],
answers:[0,1,3],
solution:"Richtig sind 1, 2 und 4. Das reine Entfernen eines bereits lokalisierten Knotens kann durch wenige Referenzänderungen O(1) sein. Muss der Knoten erst gesucht werden, benötigt die Suche im Worst Case O(n). Die Gesamtaussage „immer O(1)“ ist daher falsch."},

{id:8,section:"Nutzdaten",skill:"Nutzdaten vs. Struktur",afb:"AFB II",points:4,type:"multi",title:"Zielort ändern",
prompt:"Warum muss beim Ändern des Zielorts eines Pakets normalerweise keine naechster-Referenz verändert werden? Wähle alle richtigen Aussagen.",
choices:["Der Zielort gehört zu den Nutzdaten des Paketobjekts.","Die naechster-Referenz beschreibt die Struktur bzw. Verkettung der Liste.","Eine Änderung des Zielorts verändert automatisch die Reihenfolge aller Knoten.","Wenn nur der Zielort geändert wird, kann die Verkettung der Knoten unverändert bleiben.","Nutzdaten und Strukturdaten sind bei einer verketteten Liste immer identisch."],
answers:[0,1,3],
solution:"Richtig sind 1, 2 und 4: Der Zielort ist ein Nutzdatum des Pakets. naechster gehört zur Listenstruktur. Eine Änderung des Zielorts erfordert deshalb normalerweise keine Änderung der Verkettung."},

{id:9,section:"Transfer",skill:"Datenstruktur beurteilen",afb:"AFB III",points:6,type:"multi",title:"Array oder Liste?",
prompt:"Im Logistikzentrum wird häufig auf ein Paket an einer bereits bekannten Positionsnummer zugegriffen. Welche Aussagen sind richtig? Wähle alle richtigen Aussagen.",
choices:["Bei einem Array kann über den Index direkt auf eine Position zugegriffen werden.","Der Zugriff auf Arrayposition i hat typischerweise O(1).","Bei einer einfach verketteten Liste kann Position i ohne Traversierung direkt angesprungen werden.","Bei einer einfach verketteten Liste müssen die Knoten bis zur gewünschten Position nacheinander durchlaufen werden.","Für diesen Anwendungsfall ist das Array hinsichtlich des Positionszugriffs geeigneter."],
answers:[0,1,3,4],
solution:"Richtig sind 1, 2, 4 und 5. Arrays ermöglichen direkten Indexzugriff in O(1). Eine einfach verkettete Liste muss bis zur gewünschten Position traversiert werden; das benötigt im Worst Case O(n)."}
];

let i=0,score=0,streak=0,attempts={},mistakes={},mastery={},hintUse={},solutionShown={};
const $=s=>document.querySelector(s);
const norm=s=>(s||"").toLowerCase().replace(/\s+/g," ").trim();
const esc=s=>(s||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;");
function initNav(){let secs=[...new Set(TASKS.map(t=>t.section))];$("#nav").innerHTML=secs.map(s=>`<span class="navpill" data-s="${s}">${s}</span>`).join("")}
function render(){
 const t=TASKS[i]; $("#feedback").classList.add("hidden"); $("#summary").classList.add("hidden");
 $("#bar").style.width=`${i/TASKS.length*100}%`;$("#progressText").textContent=`Aufgabe ${i+1} von ${TASKS.length}`;
 document.querySelectorAll(".navpill").forEach(x=>{x.classList.toggle("active",x.dataset.s===t.section)});
 let h=`<span class="tag">${t.skill}</span><span class="tag afb">${t.afb}</span><span class="tag">${t.points} P</span><h2>${t.title}</h2>`;
 if(t.code)h+=`<pre>${esc(t.code)}</pre>`;h+=`<p>${t.prompt}</p>`;
 if(t.focus&&t.focus.length)h+=`<div class="focusbox"><b>Achte bei deiner Antwort auf:</b><ul>${t.focus.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div>`;
 if(t.type==="text"||t.type==="code")h+=`<textarea id="answer" spellcheck="false">${esc(t.starter||"")}</textarea>`;
 if(t.type==="text")h+=`<p class="small answernote">Formuliere in eigenen Worten. Richtige Teilaspekte werden einzeln gewertet; du musst nicht die Formulierung einer Musterlösung treffen.</p>`;
 if(t.type==="mc")h+=t.choices.map((c,n)=>`<label class="choice"><input type="radio" name="ans" value="${n}"><pre>${esc(c)}</pre></label>`).join("");
 if(t.type==="multi")h+=`<p class="small"><b>Mehrfachauswahl:</b> Es können mehrere Antworten richtig sein.</p>`+t.choices.map((c,n)=>`<label class="choice"><input type="checkbox" name="multians" value="${n}"><span>${esc(c)}</span></label>`).join("");
 if(t.type==="heap-insert")h+=heapHTML();
 if(t.type==="algo-delete")h+=algoHTML();
 h+=`<button onclick="check()">Prüfen</button><button class="secondary" onclick="showHint()">Hinweis</button>`;
 $("#task").innerHTML=h;
}
function heapHTML(){
 return `<div class="sim">
 <b>Heap- und Referenzlabor</b>
 <div class="goal"><b>Ziel:</b> Füge P250 zwischen P200 und P300 ein, ohne einen Knoten zu verlieren.</div>
 <p class="small">Knoten können verschoben werden. Für eine Referenzänderung: Ausgangsknoten anklicken → Zielknoten anklicken → „naechster setzen“. Mit „erster setzen“ wird die Startreferenz verändert.</p>
 <div class="heaplab">
  <div id="heapcanvas" class="heapcanvas"></div>
  <div class="refpanel">
   <b>Aktionen</b>
   <div class="simcontrols">
    <button type="button" onclick="heapSetNext()">naechster setzen</button>
    <button type="button" onclick="heapSetNull()" class="secondary">naechster = null</button>
    <button type="button" onclick="heapSetFirst()" class="secondary">erster setzen</button>
    <button type="button" onclick="heapAdd()">Knoten erzeugen</button>
    <button type="button" onclick="heapDelete()" class="secondary">Knoten löschen</button>
    <button type="button" onclick="heapReset()" class="ghost">Reset</button>
   </div>
   <div id="heapstate" class="statusline"></div>
   <b>Erreichbarkeit</b><div id="reach" class="small"></div>
   <b>Ereignisse</b><div id="eventlog" class="eventlog"></div>
  </div>
 </div></div>`;
}
let heap,drag=null;
function freshHeap(){return {first:"P100",next:{P100:"P200",P200:"P300",P250:null,P300:null},pos:{P100:[35,55],P200:[190,55],P250:[190,190],P300:[345,55]},sel:[],events:["Startzustand geladen."]}}
function initHeap(){heap=freshHeap();drawHeap()}
function heapReset(){heap=freshHeap();drawHeap()}
function nodeCenter(n){let [x,y]=heap.pos[n];return [x+60,y+32]}
function drawHeap(){
 let c=$("#heapcanvas"); if(!c)return; c.innerHTML="";
 Object.keys(heap.next).forEach(n=>{
   let d=document.createElement("div"); d.className="heapnode "+(heap.sel.includes(n)?"selected":"")+(unreachableNodes().includes(n)?" badref":"");
   d.style.left=heap.pos[n][0]+"px";d.style.top=heap.pos[n][1]+"px";d.dataset.n=n;
   d.innerHTML=`<b>${n}</b><div class="mini">naechster → ${heap.next[n]||"null"}</div>`;
   d.onmousedown=e=>startDrag(e,n); d.onclick=e=>{if(!drag||!drag.moved)heapPick(n)};
   c.appendChild(d);
 });
 Object.entries(heap.next).forEach(([a,b])=>{if(b&&heap.next[b]!==undefined)drawLine(c,a,b)});
 updateHeapPanel();
}
function drawLine(c,a,b){
 let [x1,y1]=nodeCenter(a),[x2,y2]=nodeCenter(b);let dx=x2-x1,dy=y2-y1,len=Math.sqrt(dx*dx+dy*dy),ang=Math.atan2(dy,dx)*180/Math.PI;
 let l=document.createElement("div");l.className="heapline";l.style.left=x1+"px";l.style.top=y1+"px";l.style.width=Math.max(15,len-62)+"px";l.style.transform=`rotate(${ang}deg)`;c.appendChild(l);
}
function startDrag(e,n){drag={n,sx:e.clientX,sy:e.clientY,ox:heap.pos[n][0],oy:heap.pos[n][1],moved:false};document.onmousemove=moveDrag;document.onmouseup=endDrag}
function moveDrag(e){if(!drag)return;let dx=e.clientX-drag.sx,dy=e.clientY-drag.sy;if(Math.abs(dx)+Math.abs(dy)>4)drag.moved=true;heap.pos[drag.n]=[Math.max(0,drag.ox+dx),Math.max(0,drag.oy+dy)];drawHeap()}
function endDrag(){document.onmousemove=null;document.onmouseup=null;setTimeout(()=>drag=null,0)}
function heapPick(n){if(heap.sel.length>=2)heap.sel=[];heap.sel.push(n);drawHeap()}
function heapSetNext(){if(heap.sel.length!==2){heap.events.unshift("Wähle Ausgang und Ziel.");drawHeap();return}let[a,b]=heap.sel;heap.next[a]=b;heap.events.unshift(`${a}.naechster = ${b}`);heap.sel=[];drawHeap()}
function heapSetNull(){if(heap.sel.length<1)return;let a=heap.sel[0];heap.next[a]=null;heap.events.unshift(`${a}.naechster = null`);heap.sel=[];drawHeap()}
function heapSetFirst(){if(heap.sel.length<1)return;heap.first=heap.sel[0];heap.events.unshift(`erster = ${heap.first}`);heap.sel=[];drawHeap()}
function heapAdd(){let n=prompt("Paketnummer des neuen Knotens, z. B. P275:");if(!n)return;n=n.trim().toUpperCase();if(heap.next[n]!==undefined){heap.events.unshift(`${n} existiert bereits.`);drawHeap();return}heap.next[n]=null;heap.pos[n]=[35+Object.keys(heap.next).length*25,230];heap.events.unshift(`Knoten ${n} erzeugt; naechster = null`);drawHeap()}
function heapDelete(){if(heap.sel.length<1)return;let n=heap.sel[0];delete heap.next[n];delete heap.pos[n];if(heap.first===n)heap.first=null;Object.keys(heap.next).forEach(k=>{if(heap.next[k]===n)heap.next[k]=null});heap.events.unshift(`Knoten ${n} gelöscht.`);heap.sel=[];drawHeap()}
function reachable(){
 let r=[],n=heap.first,guard=0;while(n&&heap.next[n]!==undefined&&!r.includes(n)&&guard++<50){r.push(n);n=heap.next[n]}return r
}
function unreachableNodes(){let r=reachable();return Object.keys(heap.next).filter(n=>!r.includes(n))}
function updateHeapPanel(){
 if(!$("#heapstate"))return;
 $("#heapstate").textContent=`erster → ${heap.first||"null"} | `+Object.entries(heap.next).map(([a,b])=>`${a}→${b||"null"}`).join(" | ");
 let r=reachable(),u=unreachableNodes();$("#reach").innerHTML=`Erreichbar: <b>${r.join(", ")||"keine"}</b><br>${u.length?`Nicht erreichbar: <b>${u.join(", ")}</b>`:"Alle Knoten sind erreichbar."}`;
 $("#eventlog").innerHTML=heap.events.slice(0,12).map(x=>`<div>${esc(x)}</div>`).join("");
}

function algoHTML(){
 return `<div class="sim">
  <b>Algorithmuslabor</b>
  <div class="goal"><b>Auftrag:</b> Lösche P300. Wähle bei jedem Schritt die fachlich korrekte nächste Aktion.</div>
  <div class="algolab">
   <div>
    <div id="algocode" class="algocode"></div>
    <div id="algomsg" class="small"></div>
   </div>
   <div>
    <div class="vars">
      <div class="varbox"><b>vorher</b><span id="vprev">–</span></div>
      <div class="varbox"><b>aktuell</b><span id="vcurr">–</span></div>
      <div class="varbox"><b>gesucht</b><span>P300</span></div>
      <div class="varbox"><b>Rückgabe</b><span id="vresult">–</span></div>
    </div>
    <div id="miniheap" class="miniheap"></div>
    <div id="stepfeedback"></div>
    <div id="stepchoices" class="stepchoices"></div>
   </div>
  </div>
 </div>`;
}
const algoLines=[
"Knoten vorher = null;",
"Knoten aktuell = erster;",
"while (aktuell != null) {",
"  if (aktuell.getPaket().getPaketnummer().equals(paketnummer)) {",
"    if (vorher == null) {",
"      erster = aktuell.getNaechster();",
"    } else {",
"      vorher.setNaechster(aktuell.getNaechster());",
"    }",
"    return true;",
"  }",
"  vorher = aktuell;",
"  aktuell = aktuell.getNaechster();",
"}",
"return false;"
];
let algo;
function initAlgo(){
 algo={next:{P100:"P200",P200:"P300",P300:"P400",P400:null},prev:null,curr:"P100",phase:"check",line:3,finished:false,result:null,errors:0,lastError:""};
 drawAlgo();
}
function drawAlgo(){
 if(!$("#algocode"))return;
 $("#algocode").innerHTML=algoLines.map((l,n)=>`<div class="codeline ${n===algo.line?"active":""}">${String(n+1).padStart(2," ")}  ${esc(l)}</div>`).join("");
 $("#vprev").textContent=algo.prev||"null";$("#vcurr").textContent=algo.curr||"null";$("#vresult").textContent=algo.result===null?"–":String(algo.result);
 let order=[],n="P100",guard=0;while(n&&guard++<10){order.push(n);n=algo.next[n]}
 $("#miniheap").innerHTML=order.map((n,k)=>`<span class="mininode ${n===algo.curr?"current":""} ${n===algo.prev?"previous":""}">${n}</span>${k<order.length-1?'<span class="miniarrow">→</span>':""}`).join("")+'<span class="miniarrow">→ null</span>';
 $("#algomsg").innerHTML=`<p><b>Gelb:</b> aktuell · <b>Grün:</b> vorher</p>`;
 renderStepChoices();
}
function renderStepChoices(){
 let c=$("#stepchoices");if(algo.finished){c.innerHTML=`<div class="stepok"><b>Algorithmus beendet.</b> P300 wurde aus der erreichbaren Kette entfernt.</div>`;return}
 let choices=[];
 if(algo.phase==="check"){
   choices=[
    {id:"match",txt:`Prüfung ergibt: ${algo.curr} ist P300.`},
    {id:"nomatch",txt:`Prüfung ergibt: ${algo.curr} ist nicht P300.`},
    {id:"delete",txt:"Sofort aktuell = aktuell.getNaechster() setzen."}
   ];
 } else if(algo.phase==="advance"){
   choices=[
    {id:"prev",txt:"vorher = aktuell ausführen."},
    {id:"curr",txt:"aktuell = aktuell.getNaechster() ausführen."},
    {id:"rewire",txt:"vorher.setNaechster(aktuell.getNaechster()) ausführen."}
   ];
 } else if(algo.phase==="advance2"){
   choices=[
    {id:"curr",txt:"aktuell = aktuell.getNaechster() ausführen."},
    {id:"check",txt:"Ohne Weitergehen erneut denselben Knoten prüfen."},
    {id:"retfalse",txt:"return false ausführen."}
   ];
 } else if(algo.phase==="found"){
   choices=[
    {id:"firstcase",txt:"vorher == null; deshalb erster verändern."},
    {id:"innercase",txt:"vorher != null; deshalb Vorgänger mit dem Nachfolger von aktuell verbinden."},
    {id:"advance",txt:"P300 nur überspringen und mit der Suche fortfahren."}
   ];
 } else if(algo.phase==="return"){
   choices=[
    {id:"rettrue",txt:"return true ausführen."},
    {id:"retfalse",txt:"return false ausführen."},
    {id:"continue",txt:"Suche mit P400 fortsetzen."}
   ];
 }
 c.innerHTML=choices.map(x=>`<button type="button" onclick="algoAction('${x.id}')">${esc(x.txt)}</button>`).join("");
}
function algoAction(a){
 let correct=false,explain="";
 if(algo.phase==="check"){
   if(algo.curr==="P300"&&a==="match"){correct=true;algo.phase="found";algo.line=4}
   else if(algo.curr!=="P300"&&a==="nomatch"){correct=true;algo.phase="advance";algo.line=11}
   explain=algo.curr==="P300"?"Die Paketnummer stimmt jetzt mit P300 überein.":"Die Paketnummer stimmt noch nicht mit P300 überein.";
 } else if(algo.phase==="advance"){
   if(a==="prev"){correct=true;algo.prev=algo.curr;algo.phase="advance2";algo.line=12;explain="Der bisher aktuelle Knoten wird zum Vorgänger."}
   else explain="Vor dem Weitergehen muss vorher auf den bisherigen aktuellen Knoten gesetzt werden.";
 } else if(algo.phase==="advance2"){
   if(a==="curr"){correct=true;algo.curr=algo.next[algo.curr];algo.phase="check";algo.line=3;explain="aktuell zeigt nun auf den nächsten Knoten."}
   else explain="Jetzt muss die Laufreferenz aktuell zum Nachfolger weitergehen.";
 } else if(algo.phase==="found"){
   if(algo.prev!==null&&a==="innercase"){correct=true;algo.next[algo.prev]=algo.next[algo.curr];algo.phase="return";algo.line=9;explain=`${algo.prev}.naechster zeigt nun direkt auf ${algo.next[algo.prev]}.`}
   else if(algo.prev===null&&a==="firstcase"){correct=true;algo.phase="return";algo.line=9;explain="Beim ersten Knoten müsste erster angepasst werden."}
   else explain="P300 ist ein innerer Knoten: vorher ist nicht null. Daher muss die Referenz des Vorgängers umgehängt werden.";
 } else if(algo.phase==="return"){
   if(a==="rettrue"){correct=true;algo.result=true;algo.finished=true;algo.line=9;explain="Das Paket wurde gefunden und entfernt; true ist korrekt."}
   else explain="Nach erfolgreichem Löschen muss die Methode true zurückgeben.";
 }
 let f=$("#stepfeedback");
 if(correct){f.innerHTML=`<div class="stepok">${esc(explain)}</div>`}
 else{algo.errors++;algo.lastError=explain;mistakes["Algorithmusschritt falsch"]=(mistakes["Algorithmusschritt falsch"]||0)+1;f.innerHTML=`<div class="stepbad"><b>Noch nicht.</b> ${esc(explain)}</div>`}
 drawAlgo();
}
function algoHint(){
 if(!algo)return "Verfolge vorher und aktuell Schritt für Schritt.";
 if(algo.phase==="check")return `Vergleiche die Paketnummer von aktuell (${algo.curr}) mit P300.`;
 if(algo.phase==="advance")return "Bevor aktuell weiterwandert, muss der bisherige aktuelle Knoten als vorher gespeichert werden.";
 if(algo.phase==="advance2")return "Jetzt darf aktuell auf seinen Nachfolger gesetzt werden.";
 if(algo.phase==="found")return "Prüfe, ob vorher null ist. Bei P300 in dieser Liste ist ein Vorgänger vorhanden.";
 if(algo.phase==="return")return "Das Paket wurde erfolgreich entfernt. Welcher boolean-Wert signalisiert Erfolg?";
 return "Verfolge die Variablen und die Referenzstruktur.";
}

/* ---------- V6: inhaltstolerante lokale Bewertung ---------- */
const RUBRICS={
  1:[
    {label:"Verschieben beim Einfügen/Löschen erkannt",pts:1,
     test:a=>hasConcept(a,"shift")},
    {label:"Linearer Aufwand im ungünstigen Fall erkannt",pts:1,
     test:a=>hasConcept(a,"linear")},
    {label:"Feste Länge/Kapazität des Arrays erkannt",pts:1,
     test:a=>hasConcept(a,"fixed")},
    {label:"Folge für häufige Änderungen fachlich beurteilt",pts:1,
     test:a=>hasAny(a,["ungeeignet","unpraktisch","ineffizient","aufwendig","teuer","nachteil","problem"])}
  ],
  2:[
    {label:"Sechs erzeugte Objekte erkannt",pts:1,test:a=>/\b(6|sechs)\b/.test(a)},
    {label:"Drei Paket- und drei Knotenobjekte unterschieden",pts:1,
     test:a=>(hasAny(a,["3 paket","drei paket"])&&hasAny(a,["3 knoten","drei knoten"]))},
    {label:"k3 als Listenende mit null erkannt",pts:1,
     test:a=>a.includes("k3")&&a.includes("null")},
    {label:"Verlust von k1 macht die Kette vom Listenanfang aus unerreichbar",pts:2,
     test:a=>hasConcept(a,"unreachable")}
  ],
  7:[
    {label:"Aussage 'immer O(1)' wird abgelehnt/differenziert",pts:1,
     test:a=>hasAny(a,["nicht immer","stimmt nicht","falsch","nur wenn","kommt darauf","differenz"])},
    {label:"Reine Referenzänderung bei bekanntem Knoten/Vorgänger als konstant erkannt",pts:1,
     test:a=>hasConcept(a,"constant") && (hasConcept(a,"rewire") || hasAny(a,["vorgänger","vorgaenger","knoten bekannt","position bekannt","bereits gefunden"]))},
    {label:"Notwendige Suche nach Paketnummer/Knoten erkannt",pts:1,
     test:a=>hasConcept(a,"search")},
    {label:"Worst Case der Suche/Gesamtoperation als linear erkannt",pts:2,
     test:a=>hasConcept(a,"linear")}
  ],
  8:[
    {label:"Zielort als Nutzdatum des Paketobjekts erkannt",pts:2,
     test:a=>(hasAny(a,["zielort","ziel","adresse"])&&hasConcept(a,"payload"))},
    {label:"Listenstruktur den Knoten/Referenzen zugeordnet",pts:1,
     test:a=>hasConcept(a,"structure")},
    {label:"Struktur bleibt beim Ändern des Zielorts unverändert",pts:1,
     test:a=>hasConcept(a,"unchanged")}
  ],
  9:[
    {label:"Array als geeignetere Struktur gewählt",pts:2,
     test:a=>a.includes("array")&&hasAny(a,["geeignet","besser","sinnvoll","vorteil","verwenden","wählen","waehlen"])},
    {label:"Direkter Index-/Positionszugriff im Array erkannt",pts:1,
     test:a=>hasConcept(a,"arrayDirect")},
    {label:"Array-Zugriff als konstant beschrieben",pts:1,
     test:a=>hasAny(a,["o(1)","konstant","sofort","direkter zugriff"])},
    {label:"Liste benötigt Traversierung bis zur Position, worst case linear",pts:2,
     test:a=>(hasAny(a,["liste","verkettet"])&&hasAny(a,["o(n)","linear","durchlauf","durchgehen","nacheinander","bis zur position","vom anfang"]))}
  ]
};
function fold(s){
 return norm(s).replaceAll("ä","ae").replaceAll("ö","oe").replaceAll("ü","ue").replaceAll("ß","ss");
}
function hasAny(a,terms){
 const x=fold(a).replace(/[^a-z0-9()]+/g," ").replace(/\s+/g," ").trim();
 return terms.some(t=>{
   const y=fold(t).replace(/[^a-z0-9()]+/g," ").replace(/\s+/g," ").trim();
   return x.includes(y);
 });
}
function hasConcept(a,key){
 const C={
  shift:["verschieb","nachrueck","nach hinten rueck","nach vorne rueck","umkopier","elemente bewegen","elemente versetzen","plaetze verschieben","positionen verschieben"],
  linear:["o(n)","linear","alle elemente","alle knoten","jedes element","jeden knoten","gesamte liste","komplette liste","bis zum ende","n schritte","mit der anzahl","abhaengig von n"],
  fixed:["feste laenge","feste groesse","feste kapazitaet","nicht dynamisch","kann nicht wachsen","laenge kann nicht geaendert","groesse kann nicht geaendert"],
  unreachable:["nicht erreichbar","unerreichbar","kein zugriff","nicht mehr zugreifen","referenz verloren","zugriff verloren","kette verloren","liste verloren","kommt nicht mehr hin","garbage"],
  search:["suchen","suche","finden","erst finden","durchlaufen","durchgehen","nacheinander pruefen","alle knoten pruefen","bis zum paket","vom anfang aus"],
  constant:["o(1)","konstant","gleich viele schritte","unabhaengig von n","nur eine referenz","wenige referenzen","direkt umhaengen","referenz umhaengen"],
  rewire:["referenz","umhaeng","verknuepf","nachfolger aender","zeiger aender","setnaechster"],
  payload:["nutzdaten","paketdaten","daten des pakets","attribut des pakets","eigenschaft des pakets"],
  structure:["strukturdaten","listenstruktur","verkettung","naechster","nachfolger","referenz"],
  unchanged:["unveraendert","bleibt gleich","muss nicht geaendert","keine aenderung","struktur aendert sich nicht","verkettung bleibt"],
  arrayDirect:["index","direkter zugriff","direkt zugreifen","position direkt","sofort zugreifen"],
  listTraverse:["durchlaufen","durchgehen","vom anfang","knoten fuer knoten","nacheinander","bis zur position","traversier"]
 };
 return hasAny(a,C[key]||[]);
}
function rubricEvaluate(t,a){
 const rs=RUBRICS[t.id];
 if(!rs)return null;
 const rows=rs.map(r=>({...r,ok:!!r.test(a)}));
 const earned=rows.filter(r=>r.ok).reduce((s,r)=>s+r.pts,0);
 const total=rows.reduce((s,r)=>s+r.pts,0);
 // 70% = fachlich tragfähig; darunter Teilantwort mit gezieltem Feedback.
 return {rows,earned,total,ratio:earned/total,ok:earned/total>=0.70};
}
function multiHTML(m){
 const right=m.correctSelected.length, need=m.expected.length;
 return `<div class="rubric"><b>${m.wrongSelected.length===0&&m.missed.length===0?"Auswahl vollständig richtig":`Zwischenstand: ${right} von ${need} richtigen Aussagen ausgewählt`}</b>`+
 `<div class="small">${m.wrongSelected.length?m.wrongSelected.length+" unzutreffende Aussage(n) zusätzlich ausgewählt.":m.missed.length?m.missed.length+" richtige Aussage(n) fehlt/fehlen noch.":"Keine falsche Aussage ausgewählt."}</div></div>`;
}
function rubricHTML(r){
 const met=r.rows.filter(x=>x.ok).length, all=r.rows.length;
 const headline=met===all?"Alle fachlichen Kriterien erkannt":met>0?`Teilweise richtig – ${met} von ${all} Kriterien erkannt`:"Noch kein Kriterium sicher erkannt";
 return `<div class="rubric"><b>${headline}</b><div class="small">Punkte: ${r.earned} / ${r.total}</div>`+
 r.rows.map(x=>`<div class="rubricrow ${x.ok?"rubricok":"rubricmiss"}"><span>${x.ok?"✓":"○"}</span><span>${esc(x.label)}</span><b>${x.ok?x.pts:0}/${x.pts}</b></div>`).join("")+
 `</div>`;
}
function codeEvaluate(t,a){
 const x=fold(a);
 // Structural checks: deliberately independent of chosen variable names where possible.
 if(t.id===3){
   const hasCounter=/int\s+\w+\s*=\s*0\s*;/.test(x);
   const hasStart=/knoten\s+\w+\s*=\s*erster\s*;/.test(x);
   const hasLoop=/while\s*\(\s*\w+\s*!=\s*null\s*\)/.test(x);
   const hasAdvance=/=\s*\w+\.getnaechster\s*\(\s*\)\s*;/.test(x);
   const hasInc=/(\+\+|\+=\s*1|=\s*\w+\s*\+\s*1)/.test(x);
   const hasReturn=/return\s+\w+\s*;/.test(x);
   const rows=[
    ["Zählvariable initialisiert",hasCounter],["Laufreferenz startet bei erster",hasStart],
    ["Schleife läuft bis null",hasLoop],["Laufreferenz wird zum Nachfolger weitergesetzt",hasAdvance],
    ["Zähler wird erhöht",hasInc],["Ergebnis wird zurückgegeben",hasReturn]
   ];
   return structuralResult(rows);
 }
 if(t.id===6){
   const hasTwoRefs=(x.match(/knoten\s+\w+/g)||[]).length>=2;
   const hasLoop=/while\s*\(\s*\w+\s*!=\s*null\s*\)/.test(x);
   const hasEquals=/\.equals\s*\(/.test(x);
   const hasFirst=/erster\s*=\s*\w+\.getnaechster\s*\(\s*\)/.test(x);
   const hasRewire=/\w+\.setnaechster\s*\(\s*\w+\.getnaechster\s*\(\s*\)\s*\)/.test(x);
   const hasBool=/return\s+true\s*;/.test(x)&&/return\s+false\s*;/.test(x);
   const rows=[
    ["Zwei Laufrollen (Vorgänger und aktueller Knoten) vorhanden",hasTwoRefs],
    ["Bis null traversiert",hasLoop],["Paketnummer wird verglichen",hasEquals],
    ["Sonderfall erstes Element passt erster an",hasFirst],
    ["Innerer Knoten wird durch Umhängen umgangen",hasRewire],
    ["Erfolg/Misserfolg werden als boolean zurückgegeben",hasBool]
   ];
   return structuralResult(rows);
 }
 return null;
}
function structuralResult(rows){
 const rr=rows.map(([label,ok])=>({label,ok,pts:1}));
 const earned=rr.filter(r=>r.ok).length,total=rr.length;
 return {rows:rr,earned,total,ratio:earned/total,ok:earned/total>=0.80};
}
function evaluate(t){
 if(t.type==="multi"){
   const selected=[...document.querySelectorAll('input[name="multians"]:checked')].map(x=>+x.value).sort((a,b)=>a-b);
   const expected=[...(t.answers||[])].sort((a,b)=>a-b);
   const correctSelected=selected.filter(x=>expected.includes(x));
   const wrongSelected=selected.filter(x=>!expected.includes(x));
   const missed=expected.filter(x=>!selected.includes(x));
   const ok=wrongSelected.length===0&&missed.length===0;
   const rows=t.choices.map((label,n)=>({
     label,
     ok:(expected.includes(n)&&selected.includes(n))||(!expected.includes(n)&&!selected.includes(n)),
     pts:1,
     selected:selected.includes(n),
     expected:expected.includes(n)
   }));
   return {ok,diag:ok?[]:[{name:"Auswahl noch nicht vollständig korrekt",hint:wrongSelected.length?"Mindestens eine ausgewählte Aussage ist fachlich nicht richtig. Prüfe deine Auswahl erneut.":"Mindestens eine fachlich richtige Aussage fehlt noch."}],multi:{selected,expected,correctSelected,wrongSelected,missed,rows}};
 }

 if(t.type==="mc"){let x=document.querySelector('input[name=ans]:checked');return {ok:x&&+x.value===t.answer,diag:x&&+x.value===t.answer?[]:t.diagnoses}}
 if(t.type==="heap-insert"){
 let ok=heap.first==="P100"&&heap.next.P100==="P200"&&heap.next.P200==="P250"&&heap.next.P250==="P300"&&heap.next.P300===null;
 let lost=unreachableNodes();
 let diag=[];
 if(lost.includes("P300")) diag.push({name:"Referenzverlust",hint:"P300 ist nicht mehr von erster aus erreichbar. Sichere die Referenz auf P300, bevor du P200.naechster überschreibst."});
 if(!ok && !diag.length) diag.push({name:"Referenzstruktur noch falsch",hint:"Ziel ist P100→P200→P250→P300→null. Prüfe erster und alle naechster-Referenzen."});
 return {ok,diag};
}
 if(t.type==="algo-delete"){
   let ok=algo.finished && algo.next.P200==="P400" && algo.result===true;
   let diag=ok?[]:[{name:algo.lastError||"Algorithmus noch nicht abgeschlossen",hint:algoHint()}];
   return {ok,diag};
 }

 let a=norm($("#answer").value);
 if(t.type==="text"){
   let rr=rubricEvaluate(t,a);
   if(rr){
     let missingRows=rr.rows.filter(x=>!x.ok);
     let diag=missingRows.length?[{name:rr.earned>0?"Teilweise richtig – ergänze nur noch fehlende Aspekte":"Antwort noch nicht ausreichend zugeordnet",hint:"Ergänze als Nächstes: "+missingRows[0].label+"."}]:[];
     return {ok:rr.ok,diag,rubric:rr};
   }
 }
 if(t.type==="code"){
   let cr=codeEvaluate(t,a);
   if(cr){
     let missingRows=cr.rows.filter(x=>!x.ok);
     let diag=missingRows.length?[{name:cr.earned>0?"Algorithmus teilweise richtig":"Algorithmus noch unvollständig",hint:"Ergänze bzw. prüfe als Nächstes: "+missingRows[0].label+"."}]:[];
     return {ok:cr.ok,diag,rubric:cr};
   }
 }
 let missing=(t.concepts||[]).filter(g=>!g.some(k=>a.includes(norm(k))));
 let ds=(t.diagnoses||[]).filter(d=>d.test?d.test(a):false);
 return {ok:missing.length===0 && !ds.some(d=>d.name==="Listenanfang wird zerstört"),diag:ds}
}
function check(){
 const t=TASKS[i];attempts[t.id]=(attempts[t.id]||0)+1;let r=evaluate(t); t._lastRubric=r.rubric||null; t._lastMulti=r.multi||null;
 if(r.ok){let factor=attempts[t.id]===1?1:attempts[t.id]===2?.75:.5;score+=Math.ceil(t.points*factor);streak++;mastery[t.skill]=(mastery[t.skill]||0)+1;$("#score").textContent=score;$("#streak").textContent=streak;feedback(true,[],t)}
 else{streak=0;$("#streak").textContent=0;(r.diag.length?r.diag:[{name:"Antwort noch unvollständig",hint:"Prüfe die fachlichen Kernbegriffe und begründe deine Aussage."}]).forEach(d=>{mistakes[d.name]=(mistakes[d.name]||0)+1});mastery[t.skill]=(mastery[t.skill]||0)-1;feedback(false,r.diag,t)}
}
function feedback(ok,diag,t){
 const f=$("#feedback");f.className=`panel ${ok?"ok":"bad"}`;
 if(ok)f.innerHTML=`<h2>Fachlich tragfähig</h2><p>Die zentralen Anforderungen sind erfüllt. Unterschiedliche Formulierungen und Variablennamen sind zulässig.</p>${t._lastMulti?multiHTML(t._lastMulti):""}${t._lastRubric?rubricHTML(t._lastRubric):""}<div class="solution fullsolution"><b>Vollständige Musterlösung</b><pre>${esc(t.solution||"Für diese Aufgabe ist keine Textlösung hinterlegt.")}</pre></div><button onclick="next()">Weiter</button>`;
 else{let d=diag[0]||{name:"Antwort noch unvollständig",hint:"Überarbeite deine Lösung."};let used=hintUse[t.id]||0;let label=used>=2?"Lösung anzeigen":used===1?"Zweiten Hinweis":"Ersten Hinweis";let note=used>=2?"Du hast bereits zwei Hinweise erhalten.":"Hinweise: "+used+" von 2.";f.innerHTML=`<h2>Noch nicht</h2>${t._lastMulti?multiHTML(t._lastMulti):""}${t._lastRubric?rubricHTML(t._lastRubric):""}<div class="diagnosis"><b>Diagnose: ${esc(d.name)}</b><p>${esc(d.hint)}</p></div><p class="small">Versuch ${attempts[t.id]}. ${note}</p><button onclick="showHint()">${label}</button>`}
 f.classList.remove("hidden");f.scrollIntoView({behavior:"smooth",block:"nearest"});
}
function showHint(){
 const t=TASKS[i];
 hintUse[t.id]=(hintUse[t.id]||0)+1;
 let all=(t.diagnoses||[]).map(x=>x.hint).filter(Boolean);
 if(t.type==="heap-insert") all=[
   "Ziel ist P100→P200→P250→P300→null.",
   "Sichere zuerst P300: Setze P250.naechster auf P300. Danach P200.naechster auf P250."
 ];
 if(t.type==="algo-delete") all=[
   algoHint(),
   "Beobachte genau vorher und aktuell. Erst wenn aktuell P300 ist, wird die Strukturreferenz verändert."
 ];
 const count=hintUse[t.id], f=$("#feedback");
 if(count<=2){
   const hint=all[Math.min(count-1,Math.max(0,all.length-1))] ||
     (count===1 ? "Prüfe die fachlichen Kernbegriffe und den geforderten Zusammenhang."
                : "Prüfe jetzt insbesondere Referenzen, Sonderfälle und die Reihenfolge der Operationen.");
   f.className="panel bad";
   f.innerHTML=`<h2>Hinweis ${count} von 2</h2><div class="hint">${esc(hint)}</div>
   <p class="small">Überarbeite deine Antwort. Nach dem zweiten Hinweis wird beim nächsten Abruf die Lösung angezeigt.</p>`;
 } else {
   solutionShown[t.id]=true;
   f.className="panel";
   f.innerHTML=`<h2>Lösung</h2><p>Du hast zwei Hinweise erhalten. Jetzt wird die Kernlösung angezeigt.</p>
   <div class="solution fullsolution"><b>Vollständige Musterlösung</b><pre>${esc(t.solution||"Für diese Aufgabe ist keine Textlösung hinterlegt.")}</pre></div>
   <button onclick="next()">Weiter</button>`;
 }
 f.classList.remove("hidden");
 f.scrollIntoView({behavior:"smooth",block:"nearest"});
}
function next(){i++;if(i<TASKS.length){render();if(TASKS[i].type==="heap-insert")setTimeout(initHeap,0);if(TASKS[i].type==="algo-delete")setTimeout(initAlgo,0)}else finish()}
function adaptiveBank(){
 const m=Object.entries(mistakes).sort((a,b)=>b[1]-a[1]).slice(0,4).map(x=>x[0]);
 const bank={
 "Verschiebeoperationen fehlen":"P120 soll zwischen P100 und P200 eingefügt werden. Beschreibe für ein Array und eine verkettete Liste die notwendigen Operationen und vergleiche die Kosten.",
 "Komplexität nicht begründet":"Bestimme best case und worst case von suchePaket(...) und begründe beide Fälle.",
 "Objekte falsch gezählt":"Erzeuge vier Paket- und vier Knotenobjekte. Bestimme die Zahl der Heap-Objekte und skizziere ihre Referenzen.",
 "Listenende nicht erkannt":"Gegeben P100→P200→P300→null. Erläutere die Bedeutung von null und formuliere eine passende Schleifenbedingung.",
 "Erreichbarkeit nicht erklärt":"P100→P200→P300. Die Referenz erster wird auf P200 gesetzt. Analysiere, welche Objekte über die Liste noch erreichbar sind.",
 "Startreferenz fehlt":"Implementiere gesamtGewicht() mit einer Laufreferenz, ohne erster zu verändern.",
 "Keine vollständige Traversierung":"Implementiere zaehlePaketeNach(String zielort) für eine beliebig lange Liste.",
 "Laufreferenz wird nicht weitergesetzt":"Ein Traversierungsalgorithmus endet nicht. Analysiere, welcher Schritt nach jeder Verarbeitung eines Knotens zwingend erforderlich ist.",
 "Listenanfang wird zerstört":"Analysiere den Fehler: while(erster != null) { ... erster = erster.getNaechster(); }. Korrigiere ihn.",
 "Referenzverlust":"P175 soll zwischen P150 und P200 eingefügt werden. Gib die Referenzänderungen in sicherer Reihenfolge an und begründe.",
 "Vorgängerreferenz fehlt":"Implementiere loeschen(...) für ein inneres Element und erkläre die Aufgabe der Referenz vorher.",
 "Sonderfall erstes Element fehlt":"Erweitere einen Löschalgorithmus so, dass auch das erste Element korrekt gelöscht wird.",
 "erster wird beim Löschen des ersten Knotens nicht angepasst":"Gegeben P100→P200→P300. P100 wird gelöscht. Gib den neuen Wert von erster an und begründe.",
 "Innerer Knoten wird nicht aus der Kette entfernt":"Gegeben P100→P200→P300. Formuliere genau die Referenzänderung zum Löschen von P200.",
 "Konstante Referenzänderung fehlt":"Begründe, warum das reine Umhängen einer bekannten Referenz O(1) ist.",
 "Gesamtkomplexität fehlt":"Beurteile die Gesamtlaufzeit von loeschen(String paketnummer), wenn nur die Paketnummer bekannt ist.",
 "Suche und Änderung nicht getrennt":"Zerlege loeschen(String paketnummer) in Teiloperationen und gib deren jeweilige Komplexität an.",
 "Nutzdaten nicht erkannt":"Ordne ein: Zielort ändern, Status ändern, Paket löschen, Paket einfügen – Nutzdatenänderung oder Strukturänderung?",
 "Struktur nicht abgegrenzt":"Erläutere den Unterschied zwischen Paketobjekt, Knotenobjekt und naechster-Referenz.",
 "Keine Entscheidung":"Wähle für häufigen Direktzugriff zwischen Array und Liste und begründe.",
 "Komplexitätsvergleich unvollständig":"Vergleiche get(index) für Array und einfach verkettete Liste im worst case.",
 "Referenzstruktur noch falsch":"Simuliere auf Papier das Einfügen von P250 in P100→P200→P300 und notiere nach jedem Schritt alle naechster-Referenzen.",
 "Algorithmusschritt falsch":"Führe loeschen(\"P200\") für P100→P200→P300 schrittweise aus. Notiere nach jedem Schleifendurchlauf die Werte von vorher und aktuell sowie die veränderten Referenzen."
 };
 if(!m.length)return ["Implementiere getPaket(int index) für eine verkettete Liste und analysiere die Laufzeit.","Beurteile für drei Szenarien, ob Array oder Liste geeigneter ist: Direktzugriff, häufiges Einfügen am Anfang, sequenzielle Verarbeitung."];
 return m.map(x=>bank[x]||`Bearbeite eine neue Transferaufgabe zum Fehlertyp „${x}“.`);
}
function finish(){
 $("#task").classList.add("hidden");$("#feedback").classList.add("hidden");$("#bar").style.width="100%";$("#progressText").textContent="Grunddurchgang abgeschlossen";
 let skills=[...new Set(TASKS.map(t=>t.skill))],max=TASKS.reduce((a,t)=>a+t.points,0),ads=adaptiveBank();
 let h=`<h2>Persönliche Auswertung</h2><div class="grid2"><div class="metric"><b>${score} / ${max}</b>Punkte</div><div class="metric"><b>${Object.values(mistakes).reduce((a,b)=>a+b,0)}</b>diagnostizierte Fehlermuster</div></div><h3>Kompetenzprofil</h3>`;
 skills.forEach(s=>{let v=mastery[s]||0,p=Math.max(15,Math.min(100,55+v*25));h+=`<div class="skillrow"><span>${esc(s)}</span><div class="skillbar"><div style="width:${p}%"></div></div><span>${p}%</span></div>`});
 h+=`<h3>Dein Nachtraining</h3><p>Diese Aufgaben wurden aus den während dieser Sitzung registrierten Fehlermustern ausgewählt.</p>`;
 ads.forEach((a,n)=>h+=`<div class="adaptive"><span class="tag">Zusatzaufgabe ${n+1}</span><p>${esc(a)}</p><textarea placeholder="Deine Lösung ..."></textarea></div>`);
 h+=`<button onclick="restart()">Neuen Durchgang starten</button>`;
 $("#summary").innerHTML=h;$("#summary").classList.remove("hidden");$("#summary").scrollIntoView({behavior:"smooth"});
}
function restart(){i=0;score=0;streak=0;attempts={};mistakes={};mastery={};hintUse={};solutionShown={};$("#score").textContent=0;$("#streak").textContent=0;$("#task").classList.remove("hidden");render();window.scrollTo({top:0,behavior:"smooth"})}
initNav();render();if(TASKS[0].type==="heap-insert")setTimeout(initHeap,0);
