# 🚀 Deployment Instructies

## ✅ Status: Klaar voor Deployment!

Je dashboard is volledig gebouwd en getest. Volg deze stappen om het online te zetten:

## Stap 1: Maak een GitHub Repository aan

1. Ga naar [GitHub](https://github.com) en log in
2. Klik op het **+** icoon rechtsboven → **New repository**
3. Vul in:
   - **Repository name**: `reis-dashboard-2025` (of een andere naam)
   - **Description**: "Reis dashboard Hong Kong, Singapore, Langkawi & Dubai"
   - **Public** of **Private** (beide werken)
   - **NIET** aanvinken: "Initialize with README" (we hebben al bestanden)
4. Klik op **Create repository**

## Stap 2: Push je Code naar GitHub

Kopieer de commands die GitHub je toont, of gebruik deze (vervang `JOUW-USERNAME` en `reis-dashboard-2025` met jouw gegevens):

```bash
cd "/Users/sterremonincx/Desktop/Reis HK:Singapore:Lankawi"
git remote add origin https://github.com/JOUW-USERNAME/reis-dashboard-2025.git
git branch -M main
git push -u origin main
```

## Stap 3: Activeer GitHub Pages

1. Ga naar je repository op GitHub
2. Klik op **Settings** (tandwiel icoon)
3. Klik in het linker menu op **Pages**
4. Onder "Build and deployment":
   - **Source**: Selecteer **GitHub Actions**
5. Klaar! GitHub Actions zal nu automatisch je site bouwen

## Stap 4: Wacht op Deployment

- De eerste deployment duurt 1-2 minuten
- Ga naar de **Actions** tab om de voortgang te zien
- Je ziet een groene vinkje als het klaar is ✓

## Stap 5: Bezoek je Dashboard!

Je dashboard is nu live op:
```
https://JOUW-USERNAME.github.io/reis-dashboard-2025/
```

(Vervang `JOUW-USERNAME` en `reis-dashboard-2025` met jouw gegevens)

## 📱 Link Delen met Familie

Stuur deze link naar je familie om het dashboard te bekijken!

## 🔄 Updates Maken

Wanneer je data wilt updaten:

1. **Bewerk de JSON bestanden** in `public/data/`
2. **Test lokaal**:
   ```bash
   npm run dev
   ```
3. **Commit en push je wijzigingen**:
   ```bash
   git add .
   git commit -m "Update restaurant tips"
   git push
   ```
4. **Automatische deployment**: GitHub Actions bouwt en deployed automatisch!
5. **Ververs de link**: Na 1-2 minuten zie je de wijzigingen online

## 🛠️ Handige Commands

```bash
# Lokaal ontwikkelen
npm run dev

# Productie build maken (lokaal testen)
npm run build

# Productie build voorproeven
npm run preview

# Handmatige deployment (alternatief voor GitHub Actions)
npm run deploy
```

## 📁 Project Structuur - Waar vind ik wat?

```
public/data/
├── itinerary.json       ← Dagplanning aanpassen
├── tips.json            ← Restaurant/activiteiten tips
├── flights.json         ← Vluchtinformatie
└── accommodations.json  ← Hotel details

src/components/
├── Dashboard.jsx        ← Homepage met overzicht
├── ItineraryView.jsx    ← Dagplanning pagina
├── TipsDatabase.jsx     ← Tips en restaurants pagina
├── FlightInfo.jsx       ← Vluchten en hotels pagina
└── Navigation.jsx       ← Navigatie menu
```

## 💡 Tips voor Data Updates

### Restaurant Toevoegen

Bewerk `public/data/tips.json` en voeg toe onder de juiste categorie:

```json
{
  "id": "nieuwe-restaurant",
  "name": "Restaurant Naam",
  "category": "Categorie",
  "priority": "must-do",
  "description": "Beschrijving hier...",
  "priceRange": "$$",
  "source": "Tip van X"
}
```

### Planning Item Toevoegen

Bewerk `public/data/itinerary.json` en voeg een item toe aan een dag:

```json
{
  "time": "19:00",
  "type": "reservation",
  "title": "Dinner bij Restaurant X",
  "location": "Adres",
  "confirmed": true
}
```

## ⚠️ Troubleshooting

### Website laadt niet?
- Check of GitHub Actions succesvol was (groene vinkje in Actions tab)
- Wacht 2-3 minuten na eerste deployment
- Probeer hard refresh: Cmd+Shift+R (Mac) of Ctrl+Shift+R (Windows)

### Wijzigingen zijn niet zichtbaar?
- Check of je push succesvol was: `git status`
- Ga naar Actions tab en wacht tot deployment klaar is
- Hard refresh je browser

### Build errors?
- Check je JSON syntax met [JSONLint](https://jsonlint.com/)
- Alle quotes moeten dubbel zijn: `"` niet `'`
- Geen trailing comma's aan het einde van arrays

## 📞 Hulp Nodig?

Als je ergens vastloopt:
1. Check de README.md voor meer documentatie
2. Bekijk de Actions tab voor error logs
3. Test lokaal met `npm run dev` om problemen te vinden

## 🎉 Succes!

Je dashboard is klaar om gedeeld te worden. Veel plezier met jullie reis!

