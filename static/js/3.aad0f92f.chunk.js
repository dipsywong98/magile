(this.webpackJsonpmagile=this.webpackJsonpmagile||[]).push([[3],{361:function(R,s,c){"use strict";c.r(s),c.d(s,"getCLS",function(){return P}),c.d(s,"getFCP",function(){return C}),c.d(s,"getFID",function(){return M}),c.d(s,"getLCP",function(){return I}),c.d(s,"getTTFB",function(){return w});var d,g,T=function(){return"".concat(Date.now(),"-").concat(Math.floor(8999999999999*Math.random())+1e12)},m=function(i){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:-1;return{name:i,value:t,delta:0,entries:[],id:T(),isFinal:!1}},f=function(i,t){try{if(PerformanceObserver.supportedEntryTypes.includes(i)){var e=new PerformanceObserver(function(n){return n.getEntries().map(t)});return e.observe({type:i,buffered:!0}),e}}catch(n){}},h=!1,S=!1,L=function(i){h=!i.persisted},E=function(){addEventListener("pagehide",L),addEventListener("beforeunload",function(){})},l=function(i){var t=arguments.length>1&&arguments[1]!==void 0&&arguments[1];S||(E(),S=!0),addEventListener("visibilitychange",function(e){var n=e.timeStamp;document.visibilityState==="hidden"&&i({timeStamp:n,isUnloading:h})},{capture:!0,once:t})},v=function(i,t,e,n){var r;return function(){e&&t.isFinal&&e.disconnect(),t.value>=0&&(n||t.isFinal||document.visibilityState==="hidden")&&(t.delta=t.value-(r||0),(t.delta||t.isFinal||r===void 0)&&(i(t),r=t.value))}},P=function(i){var t,e=arguments.length>1&&arguments[1]!==void 0&&arguments[1],n=m("CLS",0),r=function(a){a.hadRecentInput||(n.value+=a.value,n.entries.push(a),t())},u=f("layout-shift",r);u&&(t=v(i,n,u,e),l(function(a){var o=a.isUnloading;u.takeRecords().map(r),o&&(n.isFinal=!0),t()}))},p=function(){return d===void 0&&(d=document.visibilityState==="hidden"?0:1/0,l(function(i){var t=i.timeStamp;return d=t},!0)),{get timeStamp(){return d}}},C=function(i){var t,e=m("FCP"),n=p(),r=f("paint",function(u){u.name==="first-contentful-paint"&&u.startTime<n.timeStamp&&(e.value=u.startTime,e.isFinal=!0,e.entries.push(u),t())});r&&(t=v(i,e,r))},M=function(i){var t=m("FID"),e=p(),n=function(a){a.startTime<e.timeStamp&&(t.value=a.processingStart-a.startTime,t.entries.push(a),t.isFinal=!0,u())},r=f("first-input",n),u=v(i,t,r);r?l(function(){r.takeRecords().map(n),r.disconnect()},!0):window.perfMetrics&&window.perfMetrics.onFirstInputDelay&&window.perfMetrics.onFirstInputDelay(function(a,o){o.timeStamp<e.timeStamp&&(t.value=a,t.isFinal=!0,t.entries=[{entryType:"first-input",name:o.type,target:o.target,cancelable:o.cancelable,startTime:o.timeStamp,processingStart:o.timeStamp+a}],u())})},D=function(){return g||(g=new Promise(function(i){return["scroll","keydown","pointerdown"].map(function(t){addEventListener(t,i,{once:!0,passive:!0,capture:!0})})})),g},I=function(i){var t,e=arguments.length>1&&arguments[1]!==void 0&&arguments[1],n=m("LCP"),r=p(),u=function(y){var F=y.startTime;F<r.timeStamp?(n.value=F,n.entries.push(y)):n.isFinal=!0,t()},a=f("largest-contentful-paint",u);if(a){t=v(i,n,a,e);var o=function(){n.isFinal||(a.takeRecords().map(u),n.isFinal=!0,t())};D().then(o),l(o,!0)}},w=function(i){var t,e=m("TTFB");t=function(){try{var n=performance.getEntriesByType("navigation")[0]||function(){var r=performance.timing,u={entryType:"navigation",startTime:0};for(var a in r)a!=="navigationStart"&&a!=="toJSON"&&(u[a]=Math.max(r[a]-r.navigationStart,0));return u}();e.value=e.delta=n.responseStart,e.entries=[n],e.isFinal=!0,i(e)}catch(r){}},document.readyState==="complete"?setTimeout(t,0):addEventListener("pageshow",t)}}}]);

//# sourceMappingURL=3.aad0f92f.chunk.js.map