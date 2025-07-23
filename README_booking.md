# Booking Widget Guide

This site now uses a Cal.com element-click scheduler instead of the previous custom widget.

## Embed Snippet

Add the script below anywhere on your page. Then apply the `data-cal-*` attributes to the element that should open the calendar on click.

```html
<script type="text/javascript">
  (function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
  Cal("init", "45min", {origin:"https://app.cal.com"});

  // Important: add these attributes to the clickable element
  // data-cal-link="ashour-mindset/45min"
  // data-cal-namespace="45min"
  // data-cal-config='{"layout":"month_view","theme":"light"}'

  Cal.ns["45min"]("ui", {"theme":"light","cssVarsPerTheme":{"light":{"cal-brand":"#FA6E00"},"dark":{"cal-brand":"#FA6E00"}},"hideEventTypeDetails":false,"layout":"month_view"});
</script>
```

Example Start Now button:

```html
<a href="#" data-cal-link="ashour-mindset/45min" data-cal-namespace="45min" data-cal-config='{"layout":"month_view","theme":"light"}'>Start Now</a>
```

Update the `calLink` property if you use a different Cal.com account.

For better mobile support, include a viewport meta tag in your page:

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```
