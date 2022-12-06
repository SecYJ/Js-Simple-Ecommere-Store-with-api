import{r as d,f as h,s as b,u as m,a as y,b as x}from"./view.6235c83a.js";const $=document.querySelector("#pre-order"),v=document.querySelector("#products-filter-select"),T=document.querySelector("#products-list"),w=document.querySelector("#cart-list"),E=document.querySelector("#cart-list-bottom"),L=document.querySelector("#cart-list-total-price"),f=document.querySelector("#cart-header"),a={productsList:[],cartList:[]},g=t=>t.length===0?'<p class="text-center">\u5F53\u524D\u4EA7\u54C1\u5217\u8868\u4E3A\u7A7A</p>':t.map(e=>{const{origin_price:r,price:c,title:n,images:s,category:o,id:l}=e;return`
                <li class="relative">
                    <div class="absolute top-2 py-2 px-6 bg-black text-white right-0">
                        ${o}
                    </div>
                    <img src=${s} alt=${n} class="h-[300px] w-full object-cover" />
                    <button
                        type="button"
                        class="bg-black text-white w-full py-3 hover:bg-primary-extra-dark transition-colors"
                        data-id=${l}
                    >
                        \u52A0\u5165\u8CFC\u7269\u8ECA
                    </button>
                    <div class="mt-2">
                        <h3 class="mb-2">${n}</h3>
                        <p class="line-through">NT$${r}</p>
                        <strong class="text-[1.75rem]">NT$${c}</strong>
                    </div>
                </li>            
            `}).join(""),p=t=>{const e=document.querySelector("#cart-list-bottom");if(t.length===0)return f.classList.add("hidden"),e.classList.remove("flex"),e.classList.add("hidden"),'<td class="text-center">\u5F53\u524D\u8D2D\u7269\u5217\u8868\u4E3A\u7A7A!</td>';const r=t.map(c=>{const{id:n,images:s,price:o,title:l}=c.product,{id:i,quantity:u}=c;return`
            <tr>
                <td width="300">
                    <img src=${s} class="inline-block w-20 h-20" />
                    <p class="w-[14ch] inline-block align-middle ml-4">
                        ${l}
                    </p>
                </td>
                <td></td>
                <td><p>NT$${o}</p></td>
                <td><p>${u}</p></td>
                <td><p>NT$${u*o}</p></td>
                <td>
                    <button type="button" class="material-icons" data-id=${i}>clear</button>
                </td>
            </tr>
      `});return f.classList.remove("hidden"),e.classList.remove("hidden"),e.classList.add("flex"),r.join("")},N=async()=>{try{const[t,e]=await x("products");a.productsList=t,a.cartList=e,d("#products-list",g,a.productsList),d("#cart-list",p,a.cartList)}catch(t){console.error(t)}};v.addEventListener("change",t=>{const{value:e}=t.target;if(e==="\u5168\u90E8"){d("#products-list",g,a.productsList);return}const r=a.productsList.filter(({category:c})=>c===e);d("#products-list",g,r)});$.addEventListener("submit",async t=>{t.preventDefault(),[...t.target].forEach(s=>{s.localName==="input"&&(s.nextElementSibling.textContent="")});const e=h(t.target);if(console.log(e),e!=null&&e.length){e.forEach(s=>{const[o,l]=s,i=t.target[o].nextElementSibling;if(l.length===1){i.textContent=l[0];return}i.textContent=l.join(", ")});return}if(h(document.querySelector("#tel")),a.cartList.length===0){b("\u76EE\u524D\u8D2D\u7269\u8F66\u4E3A\u7A7A","error");return}const r=new FormData(t.target);if([...r].forEach(s=>{const[o,l]=s;if(o==="payment")return;const i=t.target[o].nextElementSibling.classList;l.trim()===""?i.remove("hidden"):i.add("hidden")}),![...r].every(([,s])=>s.trim()!==""))return;const{status:n}=await m({method:"post",url:"/orders",data:{data:{user:Object.fromEntries(r)}}});n&&sweetAlert({text:"\u8BA2\u5355\u6210\u529F\u9001\u51FA\u{1F600}",icon:"success"}),d("#cart-list",p,[]),a.cartList=[],t.target.reset()});T.addEventListener("click",async t=>{if(t.target.nodeName!=="BUTTON")return;const e=t.target.dataset.id,r=a.cartList.find(i=>{var u;return((u=i==null?void 0:i.product)==null?void 0:u.id)===e});let c=null;r?c=parseInt(r.quantity)+1:c=1;const{carts:n,finalTotal:s,status:o,total:l}=await m({method:"post",url:"/carts",data:{data:{quantity:c,productId:e}}});a.cartList=n,d("#cart-list",p,a.cartList),L.textContent=`NT$${s}`});w.addEventListener("click",async t=>{if(t.target.nodeName!=="BUTTON")return;const{carts:e,finalTotal:r,total:c,status:n}=await m({method:"delete",url:`/carts/${t.target.dataset.id}`});a.cartList=e,L.textContent=`NT$${r}`,y({status:n,text:"\u5220\u9664\u6210\u529F",icon:"warning"}),d("#cart-list",p,a.cartList)});E.addEventListener("click",async t=>{if(t.target.nodeName!=="BUTTON")return;const{carts:e,finalTotal:r,message:c,status:n,total:s}=await m({method:"delete",url:"/carts"});a.cartList=e,L.textContent=`NT$${r}`,y({status:n,text:c,icon:"warning"}),d("#cart-list",p,a.cartList)});N();
