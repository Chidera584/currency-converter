# Currency Converter Web App

A responsive and user-friendly currency converter that allows users to convert between multiple currencies using real-time exchange rates. Works perfectly on all devices and screen sizes. Developed by **GroupA (10 members)**.

## Features

- Convert currencies in real-time using reliable APIs.
- Get the latest exchange rates for a base currency.
- Health check endpoint to verify backend status.
- Fully responsive design for desktops, tablets, and mobile devices.

## Technologies Used

- **Frontend:** React, JavaScript, HTML, CSS
- **Backend:** Node.js, Express.js
- **APIs:** [ExchangeRate API](https://api.exchangerate-api.com/)
- **Deployment:** Railway

## Project Structure

frontend/ # React frontend code
backend/ # Node.js + Express backend code

## How It Works

1. User selects a source currency, target currency, and amount.
2. The app sends a request to the backend API.
3. Backend fetches the latest exchange rates from the external API.
4. Backend responds with the converted amount and rate.
5. Frontend displays the result in real-time.

## API Endpoints

- **GET /api/convert?from=USD&to=EUR&amount=100** – Convert currency.
- **GET /api/currencies** – Get list of available currencies.
- **GET /api/rates/:base** – Get exchange rates for a base currency.
- **GET /api/health** – Health check endpoint.

## Known Limitations

- No database integration; all data comes from external APIs.
- No user guide included.
- Limited error handling for invalid or unsupported currencies.

## Group Members and Contributions

- **Adeniyi Oluwatomis Marvellous** – Frontend design and responsiveness  
- **Adeyeye Sewa** – UI/UX design and styling  
- **Alabi Eyitayo Enekole** – Backend APIs and server logic  
- **Basanya Basirat Abiodun** – Frontend-backend integration and API testing  
- **Eromonsele David Odianosen** – Currency conversion logic and rate handling  
- **Mesigo Chidera Sharon** – React state management and API interactions  
- **Mpigi Barisua Victoria** – Testing, debugging, and app functionality  
- **Njoku Kelechi David** – Deployment and environment setup  
- **Oluyemi Esther Buteh** – Frontend optimization and responsiveness  
- **Omoloju Olasubomi Ayoade** – Project coordination and troubleshooting  

## How to Run Locally

1. Clone the repository:

```bash
git clone <repository-url>
cd currency_converter
Install dependencies for both backend and frontend:


cd backend
npm install
cd ../frontend
npm install
Start the backend server:


cd backend
npm start
Start the frontend:


cd frontend
npm start
Open http://localhost:3000 in your browser.

Deployment
The app is deployed on Railway: https://currency-converter-production-4304.up.railway.app