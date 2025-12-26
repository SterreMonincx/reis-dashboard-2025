# 🌏 Reis Dashboard - Hong Kong, Singapore, Langkawi & Dubai

Een interactief dashboard voor onze familie reis naar Azië (26 dec 2025 - 10 jan 2026).

## ✨ Features

- 📅 **Dagplanning**: Dag-tot-dag schema voor elke bestemming
- 🍜 **Tips Database**: Alle restaurant, activiteiten en uitgaanstips met filters
- ✈️ **Vlucht & Hotel Info**: Volledige reis- en verblijfsinformatie
- 📱 **Mobile Responsive**: Werkt perfect op telefoons en tablets
- 🎨 **Modern Design**: Overzichtelijk en gebruiksvriendelijk

## 🚀 Lokaal Draaien

```bash
# Installeer dependencies
npm install

# Start development server
npm run dev
```

De website is nu beschikbaar op `http://localhost:5173`

## 📝 Data Updaten

Alle data staat in JSON bestanden in de `public/data/` folder:

- `itinerary.json` - Dagelijkse planning per bestemming
- `tips.json` - Restaurant en activiteiten tips
- `flights.json` - Vlucht informatie en transfers
- `accommodations.json` - Hotel details

### Stappen om data te updaten:

1. Open het betreffende JSON bestand in je editor
2. Maak je wijzigingen (houd de JSON structuur aan!)
3. Test lokaal met `npm run dev`
4. Deploy naar GitHub Pages (zie hieronder)

## 🌐 Deployen naar GitHub Pages

### Eerste keer setup:

1. Maak een GitHub repository aan (bijv. `reis-dashboard-2025`)
2. Initialiseer git en push:

```bash
git init
git add .
git commit -m "Initial commit: Reis dashboard"
git branch -M main
git remote add origin https://github.com/JOUW-USERNAME/reis-dashboard-2025.git
git push -u origin main
```

3. Ga naar je repository Settings → Pages
4. Onder "Build and deployment", kies:
   - Source: **GitHub Actions**
5. De website wordt automatisch deployed! 🎉

### Updates deployen:

Na je eerste setup, gewoon je wijzigingen committen en pushen:

```bash
git add .
git commit -m "Update planning/tips"
git push
```

De website wordt automatisch ge-update binnen een paar minuten!

### Handmatige deploy (optioneel):

Als je liever handmatig deployed:

```bash
npm run deploy
```

Dit bouwt en deployed direct naar de `gh-pages` branch.

## 📱 Dashboard Link Delen

Na deployment is je dashboard beschikbaar op:
```
https://JOUW-USERNAME.github.io/reis-dashboard-2025/
```

Deel deze link met je familie!

## 🛠️ Technologie

- **React** - UI Framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigatie
- **GitHub Pages** - Hosting

## 📞 Belangrijke Info

- **Vertrek**: 26 december 2025, 22:00 uur (Schiphol)
- **Terugkomst**: 10 januari 2026, 20:00 uur (Schiphol)
- **Bestemmingen**: Hong Kong → Singapore → Langkawi → Dubai
- **Referentie**: A2501439 (YourTravel)

## ⚠️ Let Op!

Vergeet niet binnen 3 dagen voor aankomst in te vullen:
- **Singapore**: SG Arrival Card
- **Maleisië (Langkawi)**: Malaysia Digital Arrival Card (MDAC)

---

**Veel plezier met de reis! 🎉✈️🌴**
