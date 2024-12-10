(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function i(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?n.credentials="include":e.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(e){if(e.ep)return;e.ep=!0;const n=i(e);fetch(e.href,n)}})();let o=[],c=!1;function m(){try{new WebAssembly.Memory({initial:256*64*3,maximum:256*64*3})}catch{return!1}return!0}const l=m();l||(document.getElementById("user-input").placeholder="Not enough RAM");function f(s,t){const i=document.getElementById("chat"),r=document.createElement("div");r.classList.add(t==="User"?"user-message-row":"ai-message-row");const e=document.createElement("span");e.classList.add("message"),e.textContent=s,r.appendChild(e),i.appendChild(r)}function d(s){const t=document.getElementById("chat");for(;t.firstChild;)t.removeChild(t.lastChild);s.forEach(i=>{f(i.content,i.role)})}const u=new Worker(new URL("/aqlm-rs/assets/worker-CEmUJf8D.js",import.meta.url));document.getElementById("user-input-form").addEventListener("submit",function(s){if(s.preventDefault(),c)return;let t=document.getElementById("user-input").value;if(document.getElementById("user-input").value="",t==="")return;o.push({role:"User",content:t});function i(){d(o),c=!0,document.getElementById("user-input-button").classList.add("inactive-button"),document.getElementById("clear-button").classList.add("inactive-button"),document.getElementById("chat-title").classList.add("chat-title-hidden"),document.getElementById("user-input-width-limiter").classList.remove("user-input-width-limiter-active"),document.getElementById("user-input-height-limiter").classList.remove("user-input-height-limiter-active"),document.getElementById("chat").classList.remove("chat-hidden"),document.getElementById("chat").classList.add("chat-visible")}if(!l){o.push({role:"Assistant",content:"Not enough RAM. Only devices with available 3GB of RAM are supported."}),i();return}i(),u.postMessage(o)});document.getElementById("clear-button").addEventListener("click",function(s){u.postMessage([])});u.onmessage=s=>{document.getElementById("clear-button").classList.remove("clear-button-hidden"),o=s.data.messages,d(o),s.data.is_finished&&(c=!1,document.getElementById("user-input-button").classList.remove("inactive-button"),document.getElementById("clear-button").classList.remove("inactive-button"))};