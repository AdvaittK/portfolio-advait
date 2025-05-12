# Automatic Geo-based Currency Display for Portfolio Services Page

This feature implements automatic currency display that shows INR or USD pricing based on user location. Here's how it works:

## Features

1. **Geolocation-based Currency Detection**
   - Shows INR prices to visitors from India
   - Shows USD prices to visitors from other countries
   - Uses IP-based geolocation through Vercel's Edge Middleware
   - Fully automatic with no manual toggle

3. **Price Configuration**
   - Essential Professional Presence: ₹9,999 / $299
   - Enhanced Professional Solution: ₹24,999 / $549
   - Complete Business Platform: ₹35,999 / $899
   - Maintenance Package: ₹999 / $59

## Implementation Details

### Files Created/Modified:

1. **middleware.ts**
   - Detects visitor country using Vercel's Edge geolocation
   - Sets a default currency cookie based on location

2. **lib/currency-provider.tsx**
   - Provides React context for currency state management
   - Reads the currency value set by middleware via cookies

3. **components/ui/price.tsx**
   - Displays prices in the automatically detected currency
   - Takes both INR and USD values as props

5. **app/services/services-wrapper.tsx & layout.tsx**
   - Wraps the services page with the CurrencyProvider
   - Ensures currency context is available to all price components

## How It Works

1. When a user visits the site, the middleware detects their country
2. If they're from India, INR pricing is automatically shown
3. If they're from anywhere else, USD pricing is automatically shown
4. The geo-detected currency preference is saved in a cookie and persists across sessions
5. No manual currency switching is available - it's purely based on geographic location

## Technical Notes

- Uses Vercel's Edge Middleware for geolocation
- Uses cookies-next for managing cookies
- The system is fully responsive and works on all devices
- No user interface element is needed since the currency is detected automatically
