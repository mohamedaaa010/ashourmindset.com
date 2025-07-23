diff --git a/README_booking.md b/README_booking.md
index 74a24f54cf0fa76a7de89264ec6e6aa7d13cf95c..d29c2d94020f9e794c34a834e97ba8baf460c852 100644
 b/README_booking.md
@@ -1,47 +1,39 @@
 # Booking Widget Guide
 
 This site now uses a Cal.com inline scheduler instead of the previous custom widget.
 
 ## Embed Snippet
 
 Paste the following HTML where you want the calendar to appear:
 
 ```html
<div style="width:100%;height:100%;overflow:scroll" id="my-cal-inline-30min"></div>
 <script type="text/javascript">
   (function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
   Cal("init", "30min", {origin:"https://app.cal.com"});
 
   Cal.ns["30min"]("inline", {
     elementOrSelector:"#my-cal-inline-30min",
     config: {"layout":"month_view","theme":"light"},
     calLink: "ashour-mindset/30min",
   });
 
   Cal.ns["30min"]("ui", {
     theme: "light",
     cssVarsPerTheme: {
      light: { "cal-brand": "#FF6A4D" },
      dark: { "cal-brand": "#FF6A4D" }
     },
     hideEventTypeDetails: false,
     layout: "month_view"
   });
 </script>
 ```
 
 Update the `calLink` property if you use a different Cal.com account.
 
 For better mobile support, include a viewport meta tag in your page:
 
 ```html
 <meta name="viewport" content="width=device-width, initial-scale=1">
 ```
