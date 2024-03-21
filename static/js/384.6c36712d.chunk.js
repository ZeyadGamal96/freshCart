"use strict";(self.webpackChunke_commerce=self.webpackChunke_commerce||[]).push([[384],{1162:(e,s,t)=>{t.r(s),t.d(s,{default:()=>b});var a=t(5043),i=t(7154),c=t(2907),r=t(5475),d=t(1521),o=t(3768),l=t(9534),n=t(579);function m(e){let{product:s}=e;const{addProductToCart:t,setNumOfCartItems:i}=(0,a.useContext)(d.M),{addProductToWishlist:c,setNumOfWishlistItems:m}=(0,a.useContext)(l.h);return(0,n.jsxs)("div",{className:"col-md-2 product position-relative",children:[(0,n.jsxs)(r.N_,{to:"details/".concat(s.id),children:[(0,n.jsx)("img",{src:s.imageCover,className:"w-100",alt:"product"}),(0,n.jsx)("h6",{className:"text-main ",children:s.category.name}),(0,n.jsx)("h2",{className:"h5",children:s.title.split(" ").slice(0,2).join(" ")}),(0,n.jsxs)("div",{className:"d-flex justify-content-between my-3",children:[(0,n.jsxs)("span",{children:[s.price," EPG"]}),(0,n.jsxs)("span",{children:[(0,n.jsx)("i",{className:"fa-solid fa-star rating-color"})," ",s.ratingsAverage]})]})]}),(0,n.jsx)("button",{className:"btn bg-main w-100 mb-2 text-white",onClick:()=>{!async function(e){let{data:s}=await t(e);"success"===s.status&&(o.Ay.success(s.message,{position:"bottom-right",duration:4e3}),i(s.numOfCartItems))}(s.id)},children:"ADD TO CART"}),(0,n.jsx)("button",{className:"btn bg-danger w-100 mb-2 text-white",onClick:()=>{!async function(e){let{data:s}=await c(e);"success"===s.status&&(o.Ay.success(s.message,{position:"bottom-right",duration:4e3}),m(null===s||void 0===s?void 0:s.count))}(s.id)},children:"ADD TO WISHLIST"})]})}function h(){const{data:e}=(0,c.useQuery)("FeatureProduct",(function(){return i.A.get("https://ecommerce.routemisr.com/api/v1/products")})),[s,t]=(0,a.useState)(""),[r,d]=(0,a.useState)([]);return(0,a.useEffect)((()=>{d(null===e||void 0===e?void 0:e.data.data.filter((e=>e.title.toLowerCase().includes(s.toLowerCase()))))}),[s]),(0,a.useEffect)((()=>{e&&d(e.data.data)}),[e]),(0,n.jsxs)("div",{children:[(0,n.jsx)("input",{type:"text",onChange:e=>t(e.target.value),className:"form-control mb-4",placeholder:"Search for product here"}),(0,n.jsx)("div",{className:"row gy-4",children:null===r||void 0===r?void 0:r.map((e=>(0,n.jsx)(m,{product:e})))})]})}var u=t(2382);const g=t.p+"static/media/slider-2.92200ddb54f84e0e8c71.jpeg",x=t.p+"static/media/slider-image-1.3c3940ee0f1c3b17ff9a.jpeg",j=t.p+"static/media/slider-image-2.e510b0de8a4d96a1d5ad.jpeg",p=t.p+"static/media/slider-image-3.7e5c9f7a513f6db6dd5e.jpeg";function f(){return(0,n.jsxs)("div",{className:"row mt-5 g-0",children:[(0,n.jsx)("div",{className:"col-md-9",children:(0,n.jsxs)(u.A,{dots:!0,infinite:!0,speed:500,slidesToShow:1,slidesToScroll:1,arrows:!1,autoplay:!0,children:[(0,n.jsx)("img",{src:g,height:400,className:"w-100",alt:"slideImage"}),(0,n.jsx)("img",{src:x,height:400,className:"w-100",alt:"slideImage"}),(0,n.jsx)("img",{src:j,height:400,className:"w-100",alt:"slideImage"}),(0,n.jsx)("img",{src:p,height:400,className:"w-100",alt:"slideImage"})]})}),(0,n.jsxs)("div",{className:"col-md-3",children:[(0,n.jsx)("img",{src:x,height:200,className:"w-100",alt:"slideImage"}),(0,n.jsx)("img",{src:j,height:200,className:"w-100",alt:"slideImage"})]})]})}function w(){const{data:e,isLoading:s,isError:t}=(0,c.useQuery)("CategorySlider",(function(){return i.A.get("https://ecommerce.routemisr.com/api/v1/categories").then((e=>e.data.data)).catch((e=>{throw new Error("Unable to fetch categories")}))}));return s?(0,n.jsx)("p",{children:"Loading..."}):t?(0,n.jsx)("p",{children:"Error fetching data"}):(0,n.jsx)("div",{className:"row",children:(0,n.jsx)("div",{className:"col-md-12",children:(0,n.jsx)(u.A,{className:"my-5",dots:!0,infinite:!0,speed:500,slidesToShow:6,slidesToScroll:1,responsive:[{breakpoint:1200,settings:{slidesToShow:5}},{breakpoint:992,settings:{slidesToShow:4}},{breakpoint:768,settings:{slidesToShow:3}},{breakpoint:576,settings:{slidesToShow:2}}],children:e.map((e=>(0,n.jsxs)("div",{className:"px-2",children:[(0,n.jsx)("img",{src:e.image,className:"w-100",height:300,alt:"category"}),(0,n.jsx)("h4",{className:"text-center",children:e.name})]},e.id)))})})})}var N=t(1591),v=t(4362);function b(){const{isLoading:e}=(0,c.useQuery)("loading");return e?(0,n.jsx)(v.A,{}):(0,n.jsxs)("div",{className:"container py-5",children:[(0,n.jsx)(N.m,{children:(0,n.jsx)("title",{children:"Home"})}),(0,n.jsx)(f,{}),(0,n.jsx)(w,{}),(0,n.jsx)(h,{})]})}}}]);
//# sourceMappingURL=384.6c36712d.chunk.js.map