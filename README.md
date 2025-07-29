# GenVibe

GenVibe is a full-stack AI-powered text-to-image generator. Users can sign up, log in, generate images from text prompts, and purchase credits to unlock more generations. Built with React (Vite) for the frontend and Express/MongoDB for the backend.

## Features

- **Text-to-Image Generation:** Enter a prompt and get a unique AI-generated image.
- **User Authentication:** Secure signup and login with JWT.
- **Credit System:** Each user has a credit balance; generating images consumes credits.
- **Purchase Credits:** Buy more credits via Razorpay integration.
- **Responsive UI:** Modern, mobile-friendly design with Tailwind CSS.
- **Testimonials & Pricing:** Showcase user feedback and available plans.

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Framer Motion, Axios, React Toastify
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, Razorpay, Bcrypt
- **Other:** dotenv, ESLint

## Getting Started

### Prerequisites

- Node.js & npm
- MongoDB instance
- Razorpay account (for payment integration)
- ClipDrop API key (for image generation)

### Setup

#### 1. Clone the repository

```sh
git clone https://github.com/Avi7877489/Imagify.git
cd genvibe

cd server
npm install

PORT=5000
MONGOBD_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RAZOREPAY_KEY_ID=your_razorpay_key_id
RAZOREPAY_KEY_SECRET=your_razorpay_key_secret
CURRENCY=INR
CLIPDROP_API=your_clipdrop_api_key

npm start


cd ../client
npm install

VITE_BACKEND_URL=http://localhost:5000
VITE_RAZOREPAY_KEY_ID=your_razorpay_key_id

client/
  src/
    components/
    context/
    pages/
    assets/
  public/
server/
  controllers/
  models/
  routes/
  Middleware/
  config/
