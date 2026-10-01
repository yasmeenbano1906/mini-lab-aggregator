# MediScan — Mini Lab Aggregator

MediScan is a healthcare price comparison web application. It allows users to search for a lab test using a **test name and pincode** and compare available providers based on the final price.

## Features

* Search lab tests by test name and pincode
* Find both single tests and health packages
* Filter providers by pincode
* Compare MRP and offer prices
* Calculate the total final price
* Show home collection charges
* Display NABL accreditation
* Show report turnaround time (TAT)
* Responsive design for desktop and mobile
* Loading and no-results states

## Tech Stack

* **React** — Frontend UI
* **Vite** — Fast React development setup
* **CSS** — Styling and responsive design
* **Node.js** — Backend JavaScript runtime
* **Express.js** — REST API
* **Mock Data** — Sample lab and package data

## Why These Technologies?

**React** was used to create a dynamic and reusable user interface.

**Vite** provides a fast and simple development environment for React.

**CSS** was used to create the responsive layout and keep the project lightweight.

**Node.js and Express.js** were used to create the backend API and handle the search, filtering, price calculation, and sorting logic.

**Mock data** was used because this assignment focuses on the application and comparison logic rather than connecting to real healthcare providers.

## How It Works

1. The user enters a test name and pincode.
2. The frontend sends the search request to the backend.
3. The backend checks which providers are available in that pincode.
4. It searches both single tests and packages containing the requested test.
5. Results are sorted by the total final price.
6. The frontend displays the results as comparison cards.

## Price Calculation

The application calculates the final payable price as:

```text
Total Final Price = Offer Price + Home Collection Fee
```

This makes the comparison more useful because the user can see the actual final price.

## API

### Search Tests

```text
GET /api/search?search_query=Lipid%20Profile&pincode=110001
```

### Parameters

| Parameter      | Description              |
| -------------- | ------------------------ |
| `search_query` | Name of the lab test     |
| `pincode`      | User's six-digit pincode |

The API returns matching providers and packages available for the requested pincode, sorted by total final price.

## Run Locally

### Requirements

* Node.js 18+
* npm

### Backend

Open a terminal:

```bash
cd backend
npm install
npm start
```

The backend runs on:

```text
http://localhost:5000
```

### Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL shown by Vite in your browser.

### Example Search

```text
Test Name: Lipid Profile
Pincode: 110001
```

## Step 4 — Scraper Architecture

**Question:** In the real world, big companies will try to block our servers from scraping their prices. 
If you had to build a scraper to get live prices from a competitor's website without 
getting blocked, how would you architect it ?

**Answer:** I would first prefer official APIs, partner feeds, or other permitted data sources instead of directly scraping websites. 
For permitted scraping, I would use a queue with provider-specific workers, reasonable rate limits, caching, and retries with backoff. This reduces unnecessary traffic and makes the system more reliable. 
I would normalize the collected prices into a common format before storing them. I would not go against companies terms and access restrictions rather than trying to bypass their anti-bot systems.

**I am also building a small project which
is a automated internship and job search. I plan to use scraping only where it is permitted, while preferring official APIs, feeds, or other authorized data sources whenever available like adzuna and i am thinking more also. This internship 
will help me more because this will be a real world project and development.**

## Project Purpose

This project was created as an internship assignment to demonstrate **React frontend development, REST API integration, backend filtering, price calculation, sorting, and responsive UI design**.
