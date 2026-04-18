# Google Maps Setup Instructions

## How to Get Your Google Maps API Key

### Step 1: Go to Google Cloud Console
1. Visit: https://console.cloud.google.com/
2. Sign in with your Google account

### Step 2: Create a New Project (if you don't have one)
1. Click on the project dropdown at the top
2. Click "New Project"
3. Enter project name (e.g., "RDB Bank Website")
4. Click "Create"

### Step 3: Enable Google Maps JavaScript API
1. In the Google Cloud Console, go to "APIs & Services" → "Library"
2. Search for "Maps JavaScript API"
3. Click on it and press "Enable"

### Step 4: Create API Credentials
1. Go to "APIs & Services" → "Credentials"
2. Click "+ CREATE CREDENTIALS" → "API key"
3. Your API key will be generated
4. Click "Edit API key" to configure restrictions (recommended)

### Step 5: Configure API Key Restrictions (Optional but Recommended)
1. Under "Application restrictions", select "HTTP referrers (web sites)"
2. Add your website domain (e.g., `yourdomain.com/*`)
3. Under "API restrictions", select "Restrict key"
4. Select "Maps JavaScript API" from the dropdown
5. Click "Save"

### Step 6: Add API Key to Your Website
1. Open the file: `HTML/branch_network.html`
2. Find this line (around line 9):
```html
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY_HERE&callback=initMap" async defer></script>
```
3. Replace `YOUR_API_KEY_HERE` with your actual API key
4. Example:
```html
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBxxx...xxx&callback=initMap" async defer></script>
```

### Step 7: Test Your Map
1. Open `HTML/branch_network.html` in your web browser
2. The interactive Google Map should now appear with branch markers

## Important Notes

- **Free Tier**: Google Maps offers $200 free credit per month
- **Billing**: You need to enable billing, but won't be charged unless you exceed free tier
- **Security**: Always restrict your API key to prevent unauthorized use
- **Domain Restriction**: Add your website domain in API restrictions for security

## Features Included

✅ Interactive Google Map centered on Sri Lanka  
✅ Custom colored markers for Branches (blue), ATMs (orange), and CDMs (purple)  
✅ Info windows with complete branch details (code, address, phone, email, district, region, hours)  
✅ "Get Directions" button in each info window  
✅ Map/Satellite view toggle  
✅ Fullscreen mode support  
✅ 18 real RDB Bank branch locations across Sri Lanka

## Sample Branch Locations

The map includes 18 actual RDB Bank branches across Sri Lanka:

1. **Agalawatta Branch** (Code: 103) - Kalutara District, Western Region
2. **Agarapathana Branch** (Code: 617) - Nuwara Eliya District, Central Region
3. **Agunakolapelessa Branch** (Code: 209) - Hambantota District, Southern Region
4. **Ahangama Branch** (Code: 243) - Galle District, Southern Region
5. **Akkaraipattu Branch** (Code: 805) - Ampara District, Eastern Region
6. **Akmeemana Branch** (Code: 222) - Galle District, Southern Region
7. **Akuressa Branch** (Code: 204) - Matara District, Southern Region
8. **Alawwa Branch** (Code: 304) - Kurunegala District, North Western Region
9. **Ambalantota Branch** (Code: 208) - Hambantota District, Southern Region
10. **Ambanpola Branch** (Code: 331) - Kurunegala District, North Western Region
11. **Ampara Branch** (Code: 801) - Ampara District, Eastern Region
12. **Anamaduwa Branch** (Code: 315) - Puttalam District, North Western Region
13. **Anuradhapura Branch** (Code: 402) - Anuradhapura District, North Central Region
14. **Anuradhapura New Town Branch** (Code: 419) - Anuradhapura District, North Central Region
15. **Aralagamvila Branch** (Code: 423) - Polonnaruwa District, North Central Region
16. **Aranayake Branch** (Code: 506) - Kegalle District, Sabaragamuwa Region
17. **Athugalpura Branch** (Code: 329) - Kurunegala District, North Western Region
18. **Awissawella Branch** (Code: 127) - Colombo District, Western Region

## Customization

### To Add More Branches
Edit `js/branch_network.js`, find the `branches` array in the `addBranchMarkers()` function and add:

```javascript
{
    name: 'Your Branch Name',
    code: '123',  // Branch code
    position: { lat: YOUR_LATITUDE, lng: YOUR_LONGITUDE },
    type: 'branch', // or 'atm' or 'cdm'
    address: 'Full Address Here',
    phone: '011-1234567',
    email: 'branchname@rdb.lk',
    district: 'District Name',
    region: 'Region Name',
    hours: 'Mon-Fri: 9:00 AM - 3:00 PM'
}
```

### Branch Data Structure
Each branch includes:
- **name**: Branch name with location
- **code**: Unique branch code (e.g., '103', '617')
- **position**: GPS coordinates {lat, lng}
- **type**: 'branch', 'atm', or 'cdm'
- **address**: Full street address
- **phone**: Contact number
- **email**: Branch email address
- **district**: District name
- **region**: Sri Lankan region (Western, Central, Southern, Eastern, North Western, North Central, Sabaragamuwa)
- **hours**: Operating hours

### To Change Marker Colors
Edit the `getMarkerIcon()` function in `js/branch_network.js`:

```javascript
const colors = {
    branch: '#0099ab',  // Blue for branches
    atm: '#ff9800',     // Orange for ATMs
    cdm: '#9c27b0'      // Purple for CDMs
};
```

## Troubleshooting

### Map Not Showing?
- Check if API key is correctly added
- Verify Maps JavaScript API is enabled in Google Cloud Console
- Check browser console for errors (F12)
- Ensure billing is enabled in Google Cloud Console

### "This page can't load Google Maps correctly"
- Your API key may not be valid
- Maps JavaScript API may not be enabled
- Check domain restrictions in API key settings

### Markers Not Appearing?
- Check browser console for JavaScript errors
- Verify coordinates are correct (latitude, longitude)
- Ensure `addBranchMarkers()` is being called after map initialization

## Support

For Google Maps API documentation: https://developers.google.com/maps/documentation/javascript

For pricing information: https://cloud.google.com/maps-platform/pricing
