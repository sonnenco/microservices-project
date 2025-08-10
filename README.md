# 🧙‍♂️ Microservices Project

A fictional e-commerce site where users can browse Merlin's magical product catalog, manage their shopping cart, and complete checkout — supported by a set of microservices.

---

## 📸 Screenshots

### Home
<img width="1233" height="894" alt="Image" src="https://github.com/user-attachments/assets/e345ac4d-28f6-46ca-94cb-cb2b7643329c" />

### Product catalog
<img width="1050" height="821" alt="Image" src="https://github.com/user-attachments/assets/dd522e9f-2248-4389-ba53-1759d8a9b957" />

### Product details
<img width="1056" height="616" alt="Image" src="https://github.com/user-attachments/assets/d8f673b0-8c68-447c-b7b5-6594cd55ff9d" />

### Cart summary
<img width="1055" height="667" alt="Image" src="https://github.com/user-attachments/assets/79464663-b024-4c19-8667-f1b66dc71163" />

### Checkout
<img width="1055" height="1032" alt="Image" src="https://github.com/user-attachments/assets/7b32f261-5761-4bc8-905b-4f6c58ec0974" />

---

## 🔍 Features

- Browse, filter and search product catalog
- View product details pages, including product stock and returns policy
- Add and remove products from shopping cart
- Control the amount of each product in the shopping cart
- View cart summary and proceed to checkout
- Provide billing and shipping details, including order subtotal/tax/total and input discount code
- Receive order confirmation and automatically update product stock based on order contents

---

## 📦 Technologies Used

**Frontend**  
- React (JSX-based components)  
- Tailwind CSS  
- Axios  
- React Router DOM

**Backend Gateway (Node.js)**  
- Express.js  
- ZeroMQ  
- CORS

**Microservices**  
- 3 microservices written in **Python**, using **ZeroMQ** for communication, including:
    - Read and update product stock
    - Read product returns policies
    - Provide discount code validation
- 1 microservice written in **JavaScript**, using **HTTP fetch pattern**, including:
    - Order tax calculation

---

## 🛠️ Installation

### Frontend

```bash
cd frontend
npm install react react-dom react-router-dom tailwindcss axios
```

### Backend

```bash
cd backend
npm install cors express zeromq
```

### Microservice A
```bash
cd microservice-a
git clone https://github.com/Joanna324/tax-rate-microservice.git
node index.js

NOTE: Update index.js PORT to 40699 before starting
```

### Microservice B
```bash
cd microservice-b
python3 server.py
```

### Microservice C
```bash
cd microservice-c
python3 server.py
```

### Microservice D
```bash
cd microservice-d
python3 server.py
```

---

## 👥 Authors
- Main Project: Colin Sonnenberg (github.com/sonnenco)
- [Microservice A](https://github.com/Joanna324/tax-rate-microservice$0): Joanna Faulk (github.com/joanna324)
