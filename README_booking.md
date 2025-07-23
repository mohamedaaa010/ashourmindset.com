diff --git a/README_booking.md b/README_booking.md
index d29c2d94020f9e794c34a834e97ba8baf460c852..ed00c904f5b22151a6bcda56ebde7c1098e0421a 100644
 b/README_booking.md
@@ -1,39 +1,29 @@
 # Booking Widget Guide
 
This site now uses a Cal.com element-click scheduler instead of the previous custom widget.
 
 ## Embed Snippet
 
Add the script below anywhere on your page. Then apply the `data-cal-*` attributes to the element that should open the calendar on click.
 
 ```html
  Cal("init", "45min", {origin:"https://app.cal.com"});

  // Important: add these attributes to the clickable element
  // data-cal-link="ashour-mindset/45min"
  // data-cal-namespace="45min"
  // data-cal-config='{"layout":"month_view","theme":"light"}'

  Cal.ns["45min"]("ui", {"theme":"light","cssVarsPerTheme":{"light":{"cal-brand":"#FA6E00"},"dark":{"cal-brand":"#FA6E00"}},"hideEventTypeDetails":false,"layout":"month_view"});
 </script>
 ```
 
 Update the `calLink` property if you use a different Cal.com account.
 
 For better mobile support, include a viewport meta tag in your page:
 
 ```html
 <meta name="viewport" content="width=device-width, initial-scale=1">
 ```
