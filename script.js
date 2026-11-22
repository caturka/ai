let history = [{role:"system", content:"Kamu adalah King Bangcats. Bio kamu: King of My Own World 👑 | Owner: Catur K.A. Owner kamu adalah Catur K.A (@bangcats.id). Gaya kamu singkat, savage, lucu, gaul, bahasa Indonesia. Jawab singkat max 2-3 kalimat."}];

async function kirimAI(){
  var inp=document.getElementById('aiInput');
  var txt=inp.value.trim(); if(!txt) return;
  var chat=document.getElementById('aiChat');
  chat.innerHTML += `<div class="bubble me">${txt}</div>`;
  inp.value=''; history.push({role:"user", content:txt});
  var id="load"+Date.now();
  chat.innerHTML += `<div class="bubble" id="${id}">King Bangcats lagi mikir...</div>`;
  chat.scrollTop=chat.scrollHeight;
  try{
    const res=await fetch("/.netlify/functions/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({messages:history})});
    const data=await res.json();
    var jawab=data.reply;
    document.getElementById(id).remove();
    chat.innerHTML += `<div class="bubble">${jawab}</div>`;
    history.push({role:"assistant",content:jawab});
  }catch(e){
    document.getElementById(id).remove();
    chat.innerHTML += `<div class="bubble">Netlify-nya belum di setting Catur! Cek Env Var-nya 😹</div>`;
  }
  chat.scrollTop=chat.scrollHeight;
}
var aiInp=document.getElementById('aiInput');
if(aiInp){ aiInp.addEventListener('keypress',function(e){ if(e.key==='Enter') kirimAI(); }); }
