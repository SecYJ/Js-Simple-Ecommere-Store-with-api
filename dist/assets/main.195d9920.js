import{r as n,s as y,u as m,a as $,b as f,f as b}from"./view.bd2f20c2.js";const v=document.querySelector("#pre-order"),x=document.querySelector("#products-filter-select"),T=document.querySelector("#products-list"),w=document.querySelector("#cart-list"),N=document.querySelector("#cart-list-bottom"),g=document.querySelector("#cart-list-total-price"),h=document.querySelector("#cart-header"),r={productsList:[],cartList:[]},L=t=>t.length===0?'<p class="text-center">\u5F53\u524D\u4EA7\u54C1\u5217\u8868\u4E3A\u7A7A</p>':t.map(e=>{const{origin_price:a,price:s,title:c,images:i,category:o,id:l}=e;return`
                <li class="relative">
                    <div class="absolute top-2 py-2 px-6 bg-black text-white right-0">
                        ${o}
                    </div>
                    <img src=${i} alt=${c} class="h-[300px] w-full object-cover" />
                    <button
                        type="button"
                        class="bg-black text-white w-full py-3 hover:bg-primary-extra-dark transition-colors"
                        data-id=${l}
                    >
                        \u52A0\u5165\u8CFC\u7269\u8ECA
                    </button>
                    <div class="mt-2">
                        <h3 class="mb-2">${c}</h3>
                        <p class="line-through">NT$${a}</p>
                        <strong class="text-[1.75rem]">NT$${s}</strong>
                    </div>
                </li>            
            `}).join(""),p=t=>{const e=document.querySelector("#cart-list-bottom");if(t.length===0)return h.classList.add("hidden"),e.classList.remove("flex"),e.classList.add("hidden"),'<td class="text-center">\u5F53\u524D\u8D2D\u7269\u5217\u8868\u4E3A\u7A7A!</td>';const a=t.map(s=>{const{id:c,images:i,price:o,title:l}=s.product,{id:d,quantity:u}=s;return`
            <tr>
                <td width="300">
                    <img src=${i} class="inline-block w-20 h-20" />
                    <p class="w-[14ch] inline-block align-middle ml-4">
                        ${l}
                    </p>
                </td>
                <td></td>
                <td><p>NT$${o}</p></td>
                <td><p>${u}</p></td>
                <td><p>NT$${u*o}</p></td>
                <td>
                    <button type="button" class="material-icons" data-id=${d}>clear</button>
                </td>
            </tr>
      `});return h.classList.remove("hidden"),e.classList.remove("hidden"),e.classList.add("flex"),a.join("")},k=async()=>{try{const[t,e]=await b("products");r.productsList=t,r.cartList=e,n("#products-list",L,r.productsList),n("#cart-list",p,r.cartList)}catch(t){console.error(t)}};x.addEventListener("change",t=>{const{value:e}=t.target;if(e==="\u5168\u90E8"){n("#products-list",L,r.productsList);return}const a=r.productsList.filter(({category:s})=>s===e);n("#products-list",L,a)});v.addEventListener("submit",async t=>{if(t.preventDefault(),r.cartList.length===0){y("\u76EE\u524D\u8D2D\u7269\u8F66\u4E3A\u7A7A","error");return}const e=new FormData(t.target);if([...e].forEach(c=>{const[i,o]=c;if(i==="payment")return;const l=t.target[i].nextElementSibling.classList;o.trim()===""?l.remove("hidden"):l.add("hidden")}),![...e].every(([,c])=>c.trim()!==""))return;const{status:s}=await m({method:"post",url:"/orders",data:{data:{user:Object.fromEntries(e)}}});s&&$({text:"\u8BA2\u5355\u6210\u529F\u9001\u51FA\u{1F600}",icon:"success"}),n("#cart-list",p,[]),r.cartList=[],t.target.reset()});T.addEventListener("click",async t=>{if(t.target.nodeName!=="BUTTON")return;const e=t.target.dataset.id,a=r.cartList.find(d=>{var u;return((u=d==null?void 0:d.product)==null?void 0:u.id)===e});let s=null;a?s=parseInt(a.quantity)+1:s=1;const{carts:c,finalTotal:i,status:o,total:l}=await m({method:"post",url:"/carts",data:{data:{quantity:s,productId:e}}});r.cartList=c,n("#cart-list",p,r.cartList),g.textContent=`NT$${i}`});w.addEventListener("click",async t=>{if(t.target.nodeName!=="BUTTON")return;const{carts:e,finalTotal:a,total:s,status:c}=await m({method:"delete",url:`/carts/${t.target.dataset.id}`});r.cartList=e,g.textContent=`NT$${a}`,f({status:c,text:"\u5220\u9664\u6210\u529F",icon:"warning"}),n("#cart-list",p,r.cartList)});N.addEventListener("click",async t=>{if(t.target.nodeName!=="BUTTON")return;const{carts:e,finalTotal:a,message:s,status:c,total:i}=await m({method:"delete",url:"/carts"});r.cartList=e,g.textContent=`NT$${a}`,f({status:c,text:s,icon:"warning"}),n("#cart-list",p,r.cartList)});k();
