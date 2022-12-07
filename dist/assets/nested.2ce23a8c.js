import{u as o,a as l,b as m,d as u,r as C}from"./style.8e8b2a93.js";const h=(t,s="category")=>{const r={};if(t.forEach(e=>{const{price:a}=e,n=s==="category"?e.category:e.title;r[n]=r[n]+a||a}),s==="allProduct"){const e=Object.entries(r).sort((d,i)=>i[1]-d[1]),a=e.slice(0,3),n=e.slice(3).reduce((d,i)=>d+=i[1],0);return e.length>3?[...a,["\u5176\u4ED6",n]]:[...a]}return Object.entries(r)},S=document.querySelector("#order-list"),y=document.querySelector("#clear-cart"),f=document.querySelector("#order-table"),T=document.querySelector("#no-order-msg"),q=document.querySelector("#toggle-chart"),w=document.querySelector("#function-bar"),c={chartData:[],chartType:"category"},g=t=>C("#order-list",O,t),O=t=>t.map(s=>{const{id:r,products:e,paid:a,createdAt:n,user:d}=s,{name:i,tel:$,address:x,email:L}=d;return`
            <tr>
                <td>${r}</td>
                <td>${i} ${$}</td>
                <td>${x}</td>
                <td>${L}</td>
                <td>${e.map(b=>{const{title:v,quantity:D}=b;return`<p>${v} : ${D}</p>`}).join("")}</td>
                <td>${new Intl.DateTimeFormat(navigator.language).format(new Date(n*1e3))}</td>
                <td>
                    <a
                        href="javascript:;"
                        class="update-paid block w-max text-[#0067c2] underline"
                        data-id=${r}
                        data-paid=${a}
                    >
                        ${a?"\u5DF2\u8655\u7406":"\u672A\u8655\u7406"}
                    </a>
                </td>
                <td>
                    <button
                        type="button"
                        class="delete-order w-max bg-danger p-3 text-white hover:bg-danger/80"
                        data-id=${r}
                    >
                        \u5220\u9664
                    </button>
                    </td>
                    </tr>
                    `}).join(""),p=()=>{f.classList.add("hidden"),w.classList.add("hidden"),T.classList.remove("hidden"),title.textContent=""},j=async()=>{const{orders:t}=await l("/orders",!0);if(t.length===0)return p();f.classList.remove("hidden"),y.classList.remove("hidden"),w.classList.remove("hidden"),title.textContent="\u5168\u7522\u54C1\u985E\u5225\u71DF\u6536\u6BD4\u91CD";const s=m(t);c.chartData=s,u(h(s)),g(t)};S.addEventListener("click",async t=>{if(t.target.classList.contains("update-paid")){if(t.preventDefault(),!await o({type:"decision",icon:"warning",text:"\u662F\u5426\u4FEE\u6539\u8BA2\u5355\u72B6\u6001?"}))return;const{id:r,paid:e}=t.target.dataset,a={method:"put",url:"orders",data:{data:{id:r,paid:e!=="true"}}},{orders:n}=await l(a,!0);g(n),o({text:"\u8BA2\u5355\u72B6\u6001\u5DF2\u66F4\u65B0"})}if(t.target.classList.contains("delete-order")){if(!await o({type:"decision",text:`\u786E\u5B9A\u5220\u9664 id \u4E3A${t.target.dataset.id}\u7684\u8BA2\u5355?`,icon:"warning"}))return;const r={url:`/orders/${t.target.dataset.id}`,method:"delete"},{orders:e}=await l(r,!0),a=m(e);c.chartData=a,e.length===0&&p(),u(h(a,c.chartType)),g(e),o({text:"\u5220\u9664\u6210\u529F"})}});y.addEventListener("click",async()=>{if(!await o({type:"decision",text:"\u786E\u5B9A\u5220\u9664\u6240\u6709\u8BA2\u5355?",icon:"warning"}))return;const s={method:"delete",url:"/orders"},{status:r,orders:e,message:a}=await l(s,!0);r&&p(),u(e),o({text:a})});q.addEventListener("click",t=>{const{chartType:s,chartData:r}=c;c.chartType=s==="category"?"allProduct":"category",t.target.textContent=s==="category"?"\u54C1\u9805":"\u7C7B\u522B",u(h(r,c.chartType))});j();
