# Training Flights - Flight Booking Simulator

A small, browser-based flight booking simulator built with React and Vite. All logic runs in the browser with dummy flight data. **TRAINING ONLY — no real reservations are made.**

## Overview

Training Flights is a demonstration app for learning flight booking workflows. Search flights, select a flight, enter passenger details, and see a simulated booking confirmation with a unique training reference number.

## Prerequisites

- **Node.js** (v16 or later recommended)
- **npm** (installed with Node.js)
- A modern web browser (Chrome, Firefox, Safari, Edge)

## Installation

```bash
npm install
```

This installs React, Vite, and all required dependencies listed in `package.json`.

## Development

Run the development server with hot module reloading:

```bash
npm run dev -- --host 127.0.0.1 --port 5173 --strictPort
```

Open your browser and navigate to `http://127.0.0.1:5173`. Changes to source files reload automatically.

**To stop the dev server:** Press `Ctrl+C` in the terminal.

## Build for Production

Create an optimized production build:

```bash
npm run build
```

Output files are in the `dist/` folder. The build is a static site with no backend required.

## Preview Built App

After building, test the production build locally:

```bash
npm run preview -- --host 127.0.0.1 --port 4173 --strictPort
```

Open your browser to `http://127.0.0.1:4173`. This serves the built files to verify they work correctly.

## Sample Data and Test Date

The app includes three dummy flights departing on **2026-11-20**:

| Flight ID | Airline   | Route      | Departure | Price (per person) |
|-----------|-----------|------------|-----------|------------------|
| TR101     | Demo Air  | BLR → DEL  | 09:00     | ₹5000            |
| TR102     | Demo Air  | BLR → DEL  | 14:00     | ₹6500            |
| TR103     | Demo Air  | BLR → BOM  | 11:00     | ₹4000            |

**Default search:** Bangalore (BLR) to Delhi (DEL) on 2026-11-20, showing TR101 and TR102.

### Test Passenger Name

Use **"Test Traveller"** as the default passenger name (pre-filled in the form).

## User Journey

1. **Search:** Select departure airport, arrival airport, and date. Initial values are BLR, DEL, and 2026-11-20.
2. **Results:** View matching flights with ID, airline, route, departure time, and price per person. If no flights match, a clear message displays.
3. **Select Flight:** Click a flight card to show booking details.
4. **Enter Details:** Confirm the passenger name and select the number of travelers (1–6). The total cost updates automatically.
5. **Confirmation:** After confirming, receive a simulated booking reference starting with `TRAIN-`, status `SIMULATED`, and full booking details.

## Validation Rules

- **Passenger Name:** Must not be blank (trimmed).
- **Passenger Count:** Integer from 1 to 6.
- **Origin and Destination:** Must be different valid airport codes (trimmed, uppercased).
- **Date:** Must be provided.

Invalid submissions show a clear error message and do not display a confirmation.

## Manual Acceptance Checks

Run these tests in a browser to verify the app:

| ID  | Test                               | Expected Result                                          |
|-----|------------------------------------|---------------------------------------------------------|
| T01 | Search BLR → DEL, 2026-11-20       | Exactly TR101 and TR102 displayed                       |
| T02 | Search BOM → DEL or wrong date     | "No flights found" message displayed clearly            |
| T03 | Search with blank date             | Validation error message, no invalid results shown      |
| T04 | Select TR101, "Test Traveller", 2 passengers | Confirmation with TRAIN-* ref, SIMULATED status, ₹10000 total |
| T05 | Blank name, count 0/7/1.5          | Validation error, no confirmation shown                 |
| T06 | Refresh browser after confirmation | Returns to search screen, confirmation cleared          |
| T07 | Build then test search and booking | Both work correctly in built app                        |

## Memory and Refresh Behavior

The app stores flight selection and passenger details **in browser memory only**. Refreshing the page clears:

- Selected flight
- Passenger name (reverts to "Test Traveller")
- Passenger count (reverts to 1)
- Any displayed confirmation

This is by design—training apps do not persist state across sessions.

## Simulation Limitations

- **No real reservation:** Confirmations are display only; no ticket is issued.
- **No persistence:** Bookings are lost on refresh or browser close.
- **No payment:** No payment processing or integration.
- **No authentication:** No login or user accounts.
- **No database:** All flights are dummy data in `src/data/flights.js`.
- **No backend:** The app is purely browser-based.

## Architecture

- **Framework:** React with Vite
- **Language:** Plain JavaScript (JSX)
- **Styling:** Plain CSS
- **State:** React `useState` hooks for search, booking, and confirmation
- **Data:** Static array in `src/data/flights.js`

## Building with AI

This app was scaffolded and implemented with an AI coding assistant (Copilot in VS Code). All user-facing features were verified through manual browser checks before delivery.

## File Structure

```
flight-booking-training/
├── README.md
├── package.json
├── package-lock.json
├── index.html
├── vite.config.js
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── data/
│       └── flights.js
└── dist/  (generated after build)
```

## Troubleshooting

**Port 5173 already in use:**  
Stop any other process using the port, or modify the dev command:
```bash
npm run dev -- --port 5174
```

**Module not found errors:**  
Ensure dependencies are installed:
```bash
npm install
npm run dev
```

**Build fails:**  
Clear cache and rebuild:
```bash
rm -rf dist node_modules package-lock.json
npm install
npm run build
```

## License

Training use only. Provided as-is for educational purposes.
