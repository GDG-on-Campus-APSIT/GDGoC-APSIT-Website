if(!self.define){let e,s={};const i=(i,t)=>(i=new URL(i+".js",t).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(t,n)=>{const a=e||("document"in self?document.currentScript.src:"")||location.href;if(s[a])return;let c={};const o=e=>i(e,a),r={module:{uri:a},exports:c,require:o};s[a]=Promise.all(t.map((e=>r[e]||o(e)))).then((e=>(n(...e),c)))}}define(["./workbox-4754cb34"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/GDG_logo_horizontal.png",revision:"1b9d5f6522a88829a00ad6f3f6c45f83"},{url:"/_next/app-build-manifest.json",revision:"2396f2dbd1c39ead84bbc2a97b1a1a4c"},{url:"/_next/static/_zkghwhBsog8te8f3iXH0/_buildManifest.js",revision:"6310079bf1ae7bebeb6a2135896e4564"},{url:"/_next/static/_zkghwhBsog8te8f3iXH0/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/0e5ce63c-76a9ba9d7edca529.js",revision:"_zkghwhBsog8te8f3iXH0"},{url:"/_next/static/chunks/1593-8fd833fbef54efae.js",revision:"_zkghwhBsog8te8f3iXH0"},{url:"/_next/static/chunks/2117-7ba42d113192752f.js",revision:"_zkghwhBsog8te8f3iXH0"},{url:"/_next/static/chunks/3207-0a0f229a08747ae0.js",revision:"_zkghwhBsog8te8f3iXH0"},{url:"/_next/static/chunks/3489-504f85e3187777bd.js",revision:"_zkghwhBsog8te8f3iXH0"},{url:"/_next/static/chunks/4494-bbe5bf9eb48874e7.js",revision:"_zkghwhBsog8te8f3iXH0"},{url:"/_next/static/chunks/521-fcbfda082314c64c.js",revision:"_zkghwhBsog8te8f3iXH0"},{url:"/_next/static/chunks/5398-911e6274633abdee.js",revision:"_zkghwhBsog8te8f3iXH0"},{url:"/_next/static/chunks/5659-d0fdcd2d7cb9e739.js",revision:"_zkghwhBsog8te8f3iXH0"},{url:"/_next/static/chunks/7667-092886e250271e80.js",revision:"_zkghwhBsog8te8f3iXH0"},{url:"/_next/static/chunks/7818-93bd556c6d579203.js",revision:"_zkghwhBsog8te8f3iXH0"},{url:"/_next/static/chunks/7820-f30d8cf1baa416eb.js",revision:"_zkghwhBsog8te8f3iXH0"},{url:"/_next/static/chunks/8250-a7858b7464491fd8.js",revision:"_zkghwhBsog8te8f3iXH0"},{url:"/_next/static/chunks/9196-5427fafaf905966d.js",revision:"_zkghwhBsog8te8f3iXH0"},{url:"/_next/static/chunks/938157b5-0ca82682a53e3319.js",revision:"_zkghwhBsog8te8f3iXH0"},{url:"/_next/static/chunks/9568-ad54ed04046aea95.js",revision:"_zkghwhBsog8te8f3iXH0"},{url:"/_next/static/chunks/ad2866b8-d9a081783e4ea5b3.js",revision:"_zkghwhBsog8te8f3iXH0"},{url:"/_next/static/chunks/app/_not-found/page-6c6c9f3c9648ccb5.js",revision:"_zkghwhBsog8te8f3iXH0"},{url:"/_next/static/chunks/app/admin/certificate/page-d9df4f6f7899cc93.js",revision:"_zkghwhBsog8te8f3iXH0"},{url:"/_next/static/chunks/app/admin/content/add/page-c615875ef216a3bf.js",revision:"_zkghwhBsog8te8f3iXH0"},{url:"/_next/static/chunks/app/admin/content/page-f8274df74190d1cb.js",revision:"_zkghwhBsog8te8f3iXH0"},{url:"/_next/static/chunks/app/admin/events/page-928806696f668918.js",revision:"_zkghwhBsog8te8f3iXH0"},{url:"/_next/static/chunks/app/admin/members/page-0d4dccce0ddc810d.js",revision:"_zkghwhBsog8te8f3iXH0"},{url:"/_next/static/chunks/app/admin/recognition/page-e9a8e934ba32352f.js",revision:"_zkghwhBsog8te8f3iXH0"},{url:"/_next/static/chunks/app/admin/settings/page-c1d45bb34b25280c.js",revision:"_zkghwhBsog8te8f3iXH0"},{url:"/_next/static/chunks/app/auth/signup/page-b84b8a384424009d.js",revision:"_zkghwhBsog8te8f3iXH0"},{url:"/_next/static/chunks/app/blog/page-49ae08332ce6b54f.js",revision:"_zkghwhBsog8te8f3iXH0"},{url:"/_next/static/chunks/app/blog/write/page-5cebbd7e6430cf57.js",revision:"_zkghwhBsog8te8f3iXH0"},{url:"/_next/static/chunks/app/certificate/%5BcertificateId%5D/page-b8fdf57410cc2b74.js",revision:"_zkghwhBsog8te8f3iXH0"},{url:"/_next/static/chunks/app/community/page-c00706e031c04c3c.js",revision:"_zkghwhBsog8te8f3iXH0"},{url:"/_next/static/chunks/app/contact/page-adf583287296d1de.js",revision:"_zkghwhBsog8te8f3iXH0"},{url:"/_next/static/chunks/app/events/%5BeventId%5D/certificate/page-48f59a48e2c1535c.js",revision:"_zkghwhBsog8te8f3iXH0"},{url:"/_next/static/chunks/app/events/%5BeventId%5D/leaderboard/page-c2af2c3f79390df4.js",revision:"_zkghwhBsog8te8f3iXH0"},{url:"/_next/static/chunks/app/events/%5BeventId%5D/page-12a96a794c87751d.js",revision:"_zkghwhBsog8te8f3iXH0"},{url:"/_next/static/chunks/app/events/page-fe4111d1f7b1094c.js",revision:"_zkghwhBsog8te8f3iXH0"},{url:"/_next/static/chunks/app/get-involved/page-e82113abca5599a4.js",revision:"_zkghwhBsog8te8f3iXH0"},{url:"/_next/static/chunks/app/layout-950f4227aa124244.js",revision:"_zkghwhBsog8te8f3iXH0"},{url:"/_next/static/chunks/app/page-d7962ba1fb2c7b8f.js",revision:"_zkghwhBsog8te8f3iXH0"},{url:"/_next/static/chunks/app/profile/page-f734155205d223d0.js",revision:"_zkghwhBsog8te8f3iXH0"},{url:"/_next/static/chunks/app/recognition/page-16f4f0772abd2ac9.js",revision:"_zkghwhBsog8te8f3iXH0"},{url:"/_next/static/chunks/app/resources/access/page-6950d831969dc19e.js",revision:"_zkghwhBsog8te8f3iXH0"},{url:"/_next/static/chunks/app/resources/page-a5213c5dd11f5f21.js",revision:"_zkghwhBsog8te8f3iXH0"},{url:"/_next/static/chunks/app/resources/project/submit/page-2b89ab196791065a.js",revision:"_zkghwhBsog8te8f3iXH0"},{url:"/_next/static/chunks/app/template-012529f1aa397095.js",revision:"_zkghwhBsog8te8f3iXH0"},{url:"/_next/static/chunks/app/verify/%5BcertificateId%5D/page-c0df08a3d8b50a10.js",revision:"_zkghwhBsog8te8f3iXH0"},{url:"/_next/static/chunks/bc9e92e6-2f122e6814488770.js",revision:"_zkghwhBsog8te8f3iXH0"},{url:"/_next/static/chunks/fd9d1056-7e2f47df778b58ec.js",revision:"_zkghwhBsog8te8f3iXH0"},{url:"/_next/static/chunks/framework-8e0e0f4a6b83a956.js",revision:"_zkghwhBsog8te8f3iXH0"},{url:"/_next/static/chunks/main-33e7a7fd3cc35139.js",revision:"_zkghwhBsog8te8f3iXH0"},{url:"/_next/static/chunks/main-app-298e412179d4bb18.js",revision:"_zkghwhBsog8te8f3iXH0"},{url:"/_next/static/chunks/pages/_app-3c9ca398d360b709.js",revision:"_zkghwhBsog8te8f3iXH0"},{url:"/_next/static/chunks/pages/_error-cf5ca766ac8f493f.js",revision:"_zkghwhBsog8te8f3iXH0"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-8c17e013292b48aa.js",revision:"_zkghwhBsog8te8f3iXH0"},{url:"/_next/static/css/4eda9692eb26651d.css",revision:"4eda9692eb26651d"},{url:"/_next/static/css/e7eddfe4828c1690.css",revision:"e7eddfe4828c1690"},{url:"/_next/static/media/4473ecc91f70f139-s.p.woff",revision:"78e6fc13ea317b55ab0bd6dc4849c110"},{url:"/_next/static/media/463dafcda517f24f-s.p.woff",revision:"cbeb6d2d96eaa268b4b5beb0b46d9632"},{url:"/certificate sample.jpg",revision:"99533f21da69998444c4709908e32a73"},{url:"/certificate-template.csv",revision:"4b8821ebd51047704d47e18b1bf3898d"},{url:"/favicon.ico",revision:"dfcb797b149b22707c3b3af40413c4ab"},{url:"/fonts/GoogleSansDisplay-Bold.ttf",revision:"e183b06130f6d47e822e4d9ae9c9c6c7"},{url:"/fonts/GoogleSansDisplay-Regular.ttf",revision:"ae4b0f03a97f7981b5e74446423d7542"},{url:"/gdg-logo.png",revision:"9beb23bc2b93b45bfdc99667ea15606b"},{url:"/gdgoc-apsit-192x192.png",revision:"3b1e094af4fb7a25e6ef0728f7748698"},{url:"/gdgoc-apsit-512x512.png",revision:"e4715c3178159c9e6fab35c6e38ffc38"},{url:"/jishan_sign.png",revision:"c962b290fe983aa2f4cf34e61070bf99"},{url:"/leaderboard-template.csv",revision:"d41d8cd98f00b204e9800998ecf8427e"},{url:"/manifest.json",revision:"45a592483787c550b7d56eb4f57ead1d"},{url:"/placeholder.svg",revision:"35707bd9960ba5281c72af927b79291f"},{url:"/sample_sign.png",revision:"e19191aed7fdf35c82dc16dd93342fcf"},{url:"/signs/jishan_sign.png",revision:"057683227d42423f838346c7400043d8"},{url:"/signs/rushikesh_sir_sign.jpg",revision:"bf925359f90b01e0fa5992f6dc21532d"},{url:"/signs/yash_sign.jpg",revision:"5e3b4deeec6cdac7371003e431ee992b"},{url:"/sir_sign.png",revision:"04d10a9a74c5f848b33183f6dc95f47f"},{url:"/yash_sign.png",revision:"c3753a696c2428caedad0a364263c08e"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:i,state:t})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
