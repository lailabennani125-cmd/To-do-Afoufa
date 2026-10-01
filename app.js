const KEY="afoufa_tasks_v1";let tasks=JSON.parse(localStorage.getItem(KEY)||"[]");let filter="all";
const $=s=>document.querySelector(s);
function save(){localStorage.setItem(KEY,JSON.stringify(tasks));render()}
function render(){
 const list=$("#taskList"), empty=$("#empty");
 let visible=tasks.filter(t=>filter==="all"||filter==="active"&&!t.done||filter==="completed"&&t.done);
 list.innerHTML="";
 visible.forEach(t=>{
   const el=document.createElement("article");el.className="task"+(t.done?" done":"");
   el.innerHTML=`<button class="check" aria-label="Complete"></button><div class="task-content"><div class="task-title"></div><span class="tag"></span></div><button class="delete" aria-label="Delete">⌫</button>`;
   el.querySelector(".task-title").textContent=t.title;el.querySelector(".tag").textContent=t.category;
   el.querySelector(".check").onclick=()=>{t.done=!t.done;save()};
   el.querySelector(".delete").onclick=()=>{tasks=tasks.filter(x=>x.id!==t.id);save()};
   list.appendChild(el);
 });
 empty.style.display=visible.length?"none":"block";
 const done=tasks.filter(t=>t.done).length,total=tasks.length,pct=total?Math.round(done/total*100):0;
 $("#doneCount").textContent=done;$("#totalCount").textContent=total;$("#progressPercent").textContent=pct+"%";$("#progressBar").style.width=pct+"%";
}
document.querySelectorAll(".filter").forEach(b=>b.onclick=()=>{filter=b.dataset.filter;document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));b.classList.add("active");render()});
$("#addBtn").onclick=()=>{$("#modal").classList.remove("hidden");$("#taskInput").focus()};
$("#cancelBtn").onclick=()=>$("#modal").classList.add("hidden");
$("#modal").addEventListener("click",e=>{if(e.target.id==="modal")$("#modal").classList.add("hidden")});
$("#saveBtn").onclick=()=>{
 const title=$("#taskInput").value.trim();if(!title)return;
 tasks.unshift({id:Date.now(),title,category:$("#categoryInput").value,done:false});
 $("#taskInput").value="";$("#modal").classList.add("hidden");save();
};
$("#taskInput").addEventListener("keydown",e=>{if(e.key==="Enter")$("#saveBtn").click()});
render();
