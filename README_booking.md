 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/README_booking.md b/README_booking.md
index d29c2d94020f9e794c34a834e97ba8baf460c852..ed00c904f5b22151a6bcda56ebde7c1098e0421a 100644
--- a/README_booking.md
+++ b/README_booking.md
@@ -1,39 +1,29 @@
 # Booking Widget Guide
 
-This site now uses a Cal.com inline scheduler instead of the previous custom widget.
+This site now uses a Cal.com element-click scheduler instead of the previous custom widget.
 
 ## Embed Snippet
 
-Paste the following HTML where you want the calendar to appear:
+Add the script below anywhere on your page. Then apply the `data-cal-*` attributes to the element that should open the calendar on click.
 
 ```html
-<div style="width:100%;height:100%;overflow:scroll" id="my-cal-inline-30min"></div>
 <script type="text/javascript">
   (function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
-  Cal("init", "30min", {origin:"https://app.cal.com"});
-
-  Cal.ns["30min"]("inline", {
-    elementOrSelector:"#my-cal-inline-30min",
-    config: {"layout":"month_view","theme":"light"},
-    calLink: "ashour-mindset/30min",
-  });
-
-  Cal.ns["30min"]("ui", {
-    theme: "light",
-    cssVarsPerTheme: {
-      light: { "cal-brand": "#FF6A4D" },
-      dark: { "cal-brand": "#FF6A4D" }
-    },
-    hideEventTypeDetails: false,
-    layout: "month_view"
-  });
+  Cal("init", "45min", {origin:"https://app.cal.com"});
+
+  // Important: add these attributes to the clickable element
+  // data-cal-link="ashour-mindset/45min"
+  // data-cal-namespace="45min"
+  // data-cal-config='{"layout":"month_view","theme":"light"}'
+
+  Cal.ns["45min"]("ui", {"theme":"light","cssVarsPerTheme":{"light":{"cal-brand":"#FA6E00"},"dark":{"cal-brand":"#FA6E00"}},"hideEventTypeDetails":false,"layout":"month_view"});
 </script>
 ```
 
 Update the `calLink` property if you use a different Cal.com account.
 
 For better mobile support, include a viewport meta tag in your page:
 
 ```html
 <meta name="viewport" content="width=device-width, initial-scale=1">
 ```
 
EOF
)