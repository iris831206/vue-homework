import{r as m,a as x,c as o,b as e,F as u,d as p,f as _,t as n,w as v,v as k,o as c,h as C,i as T}from"./index-RyDHrruE.js";const V={class:"container mt-5"},D={class:"row"},$={class:"col-md-4"},B=["onClick"],F={class:"d-flex w-100 justify-content-between"},M={class:"mb-1"},U={class:"mb-1"},j={class:"col-md-8"},N={class:"table"},Q=e("thead",null,[e("tr",null,[e("th",{scope:"col",width:"50"},"操作"),e("th",{scope:"col"},"品項"),e("th",{scope:"col"},"描述"),e("th",{scope:"col",width:"90"},"數量"),e("th",{scope:"col"},"單價"),e("th",{scope:"col"},"小計")])],-1),S=["onClick"],A=["onUpdate:modelValue","onChange"],E=["value"],L={class:"text-end mb-3"},O={class:"text-end"},q=e("hr",null,null,-1),z={class:"row justify-content-center"},G={class:"col-md-8"},H={key:0,class:"alert alert-secondary text-center",role:"alert"},I={key:1,class:"card"},J={class:"card-body"},K={class:"card-title"},P=e("h5",null,"訂單",-1),R={class:"table"},W=e("thead",null,[e("tr",null,[e("th",{scope:"col"},"品項"),e("th",{scope:"col"},"數量"),e("th",{scope:"col"},"小計")])],-1),X={class:"text-end"},Y={class:"text-end"},se={__name:"week-3",setup(Z){const b=m([{id:1,name:"珍珠奶茶",description:"香濃奶茶搭配QQ珍珠",price:50,num:20},{id:2,name:"冬瓜檸檬",description:"清新冬瓜配上新鮮檸檬",price:45,num:15},{id:3,name:"翡翠檸檬",description:"綠茶與檸檬的完美結合",price:55,num:30},{id:4,name:"四季春茶",description:"香醇四季春茶，回甘無比",price:45,num:10},{id:5,name:"阿薩姆奶茶",description:"阿薩姆紅茶搭配香醇鮮奶",price:50,num:25},{id:6,name:"檸檬冰茶",description:"檸檬與冰茶的清新組合",price:45,num:20},{id:7,name:"芒果綠茶",description:"芒果與綠茶的獨特風味",price:55,num:18},{id:8,name:"抹茶拿鐵",description:"抹茶與鮮奶的絕配",price:60,num:20}]),a=m([]),d=m({}),r=m(""),f=l=>{const s=a.value.find(t=>t.id===l.id);s?s.num+=1:a.value.push({...l,cartId:new Date().getTime(),num:1})},y=l=>{a.value=a.value.filter(s=>s.id!==l)},g=l=>{a.value.map(s=>(s.id===l.id&&(s.num=l.num),s))},h=x(()=>a.value.reduce((l,s)=>l+s.price*s.num,0)),w=()=>{d.value={id:new Date().getTime(),cart:a.value,message:r.value,sum:h.value},a.value=[],r.value=""};return(l,s)=>(c(),o(u,null,[e("div",V,[e("div",D,[e("div",$,[(c(!0),o(u,null,p(b.value,t=>(c(),o("div",{class:"list-group",key:t.id},[e("a",{href:"#",class:"list-group-item list-group-item-action",onClick:C(i=>f(t),["prevent"])},[e("div",F,[e("h5",M,n(t.name),1),e("small",null,n(t.price),1)]),e("p",U,n(t.description),1)],8,B)]))),128))]),e("div",j,[e("table",N,[Q,e("tbody",null,[(c(!0),o(u,null,p(a.value,t=>(c(),o("tr",{key:t.id},[e("td",null,[e("button",{type:"button",class:"btn btn-sm",onClick:i=>y(t.id)},"x",8,S)]),e("td",null,n(t.name),1),e("td",null,[e("small",null,n(t.description),1)]),e("td",null,[v(e("select",{"onUpdate:modelValue":i=>t.num=i,onChange:i=>g(t)},[(c(),o(u,null,p(10,i=>e("option",{key:i,value:i},n(i),9,E)),64))],40,A),[[T,t.num]])]),e("td",null,n(t.price),1),e("td",null,n(t.price*t.num),1)]))),128))])]),e("div",L,[e("h5",null,[_("總計: "),e("span",null,n(h.value)+"元",1)])]),v(e("textarea",{class:"form-control mb-3",rows:"3",placeholder:"備註","onUpdate:modelValue":s[0]||(s[0]=t=>r.value=t)},null,512),[[k,r.value]]),e("div",O,[e("button",{class:"btn btn-primary",onClick:s[1]||(s[1]=t=>w(d.value))},"送出")])])])]),q,e("div",z,[e("div",G,[d.value.id?(c(),o("div",I,[e("div",J,[e("div",K,[P,e("table",R,[W,e("tbody",null,[(c(!0),o(u,null,p(d.value.cart,t=>(c(),o("tr",{key:t.id},[e("td",null,n(t.name),1),e("td",null,n(t.num),1),e("td",null,n(t.num*t.price),1)]))),128))])]),e("div",X,[_("備註: "),e("span",null,n(d.value.message),1)]),e("div",Y,[e("h5",null,[_("總計: "),e("span",null,n(d.value.sum)+"元",1)])])])])])):(c(),o("div",H," 尚未建立訂單"))])])],64))}};export{se as default};
