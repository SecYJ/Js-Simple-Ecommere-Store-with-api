import{u as i,a as u,c as D,d as l,r as C}from"./view.6235c83a.js";const h=(t,a="category")=>{const r={};if(t.forEach(e=>{const{price:s}=e,c=a==="category"?e.category:e.title;r[c]=r[c]+s||s}),a==="allProduct"){const e=Object.entries(r).sort((n,d)=>d[1]-n[1]),s=e.slice(0,3),c=e.slice(3).reduce((n,d)=>n+=d[1],0);return e.length>3?[...s,["\u5176\u4ED6",c]]:[...s]}return Object.entries(r)},S=document.querySelector("#order-list"),p=document.querySelector("#clear-cart"),y=document.querySelector("#order-table"),T=document.querySelector("#no-order-msg"),q=document.querySelector("#toggle-chart"),f=document.querySelector("#function-bar"),o={chartData:[],chartType:"category"},O=t=>t.map(a=>{const{id:r,products:e,paid:s,createdAt:c,user:n}=a,{name:d,tel:$,address:L,email:b}=n;return`
            <tr>
                <td>${r}</td>
                <td>${d} ${$}</td>
                <td>${L}</td>
                <td>${b}</td>
                <td>${e.map(v=>{const{title:x,quantity:w}=v;return`<p>${x} : ${w}</p>`}).join("")}</td>
                <td>${new Intl.DateTimeFormat(navigator.language).format(new Date(c*1e3))}</td>
                <td>
                    <a
                        href="javascript:;"
                        class="update-paid block w-max text-[#0067c2] underline"
                        data-id=${r}
                        data-paid=${s}
                    >
                        ${s?"\u5DF2\u8655\u7406":"\u672A\u8655\u7406"}
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
        `}).join(""),m=()=>{y.classList.add("hidden"),f.classList.add("hidden"),T.classList.remove("hidden"),title.textContent=""},j=async()=>{const{orders:t}=await i("/orders",!0);if(t.length===0)return m();y.classList.remove("hidden"),p.classList.remove("hidden"),f.classList.remove("hidden"),title.textContent="\u5168\u7522\u54C1\u985E\u5225\u71DF\u6536\u6BD4\u91CD";const a=t.reduce((r,{products:e})=>[...r,...e],[]);o.chartData=a,l(h(a)),g(t)};S.addEventListener("click",async t=>{if(t.target.classList.contains("update-paid")){t.preventDefault();const{id:a,paid:r}=t.target.dataset,e={method:"put",url:"orders",data:{data:{id:a,paid:r!=="true"}}},{status:s,orders:c}=await i(e,!0);u({status:s,text:"\u8BA2\u5355\u72B6\u6001\u5DF2\u66F4\u65B0",icon:"success"}),g(c)}if(t.target.classList.contains("delete-order")){const a={url:`/orders/${t.target.dataset.id}`,method:"delete"},{status:r,orders:e}=await i(a,!0),s=D(e);o.chartData=s,e.length===0&&m(),l(h(s,o.chartType)),g(e),u({status:r,text:"\u5220\u9664\u6210\u529F",icon:"error"})}});p.addEventListener("click",async()=>{const t={method:"delete",url:"/orders"},{status:a,orders:r,message:e}=await i(t,!0);a&&m(),u({text:e,status:a}),l(r)});q.addEventListener("click",t=>{const{chartType:a,chartData:r}=o;o.chartType=a==="category"?"allProduct":"category",t.target.textContent=a==="category"?"\u54C1\u9805":"\u7C7B\u522B",l(h(r,o.chartType))});const g=t=>C("#order-list",O,t);j();
