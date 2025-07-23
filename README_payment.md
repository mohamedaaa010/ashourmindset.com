# Stripe Payment Integration Notes

This project previously used a custom booking widget that redirected to Stripe Checkout. If you embed the Checkout page in an iframe, ensure the element has the attribute `allow="payment"` so Apple Pay can be displayed. The iframe domain and your site domain must both be registered with Stripe for Apple Pay to work.
