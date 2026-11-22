// VERSI AMAN - GA ADA KEY DI FILE, GITHUB GA BAKAL BLOCK LAGI
let history = [{role:"system", content:"Kamu adalah King Bangcats. Bio kamu: King of My Own World 👑 | Owner: Catur K.A. Owner kamu adalah Catur K.A (@bangcats.id). Gaya kamu singkat, savage, lucu, gaul, bahasa Indonesia. Jawab singkat max 2-3 kalimat."}];

function getKey(){
  let k = localStorage.getItem('groq_key');
  if(!k){
    k = prompt("Masukin API Key Groq lu Catur (cuma sekali, disimpen di HP lu doang):");
    if(k) localStorage.setItem('groq_key', k);
  }
  return k;
}

async function kirimAI(){
  var inp=document.getElementById('aiInput');
  var txt=inp.value.trim(); if(!txt) return;
  var chat=document.getElementById('aiChat');
  chat.innerHTML += `<div class="bubble me">${txt}</div>`;
  inp.value=''; history.push({role:"user", content:txt});
  var id="load"+Date.now();
  chat.innerHTML += `<div class="bubble" id="${id}">King Bangcats lagi mikir...</div>`;
  chat.scrollTop=chat.scrollHeight;
  var GROQ_API_KEY = getKey();
  if(!GROQ_API_KEY){ document.getElementById(id).remove(); chat.innerHTML += `<div class="bubble">Key-nya ga ada, reload dulu Catur!</div>`; return; }
  try{
    const res=await fetch("https://api.groq.com/openai/v1/chat/completions",{method:"POST",headers:{"Authorization":"Bearer "+GROQ_API_KEY,"Content-Type":"application/json"},body:JSON.stringify({model:"llama-3.3-70b-versatile",messages:history,temperature:0.8,max_tokens:300})});
    const data=await res.json();
    var jawab=data.choices[0].message.content;
    document.getElementById(id).remove();
    chat.innerHTML += `<div class="bubble">${jawab}</div>`;
    history.push({role:"assistant",content:jawab});
  }catch(e){
    document.getElementById(id).remove();
    chat.innerHTML += `<div class="bubble">Key-nya salah / abis Catur! Cek lagi 😹</div>`;
  }
  chat.scrollTop=chat.scrollHeight;
}
var aiInp=document.getElementById('aiInput');
if(aiInp){ aiInp.addEventListener('keypress',function(e){ if(e.key==='Enter') kirimAI(); }); }