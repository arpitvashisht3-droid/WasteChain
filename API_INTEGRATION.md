# WasteChain Backend API Integration Specification

This document specifies the RESTful backend API contracts for **WasteChain**. All frontend service calls in `src/services/` are wired to consume these endpoints using Axios, with an environment-configurable base URL:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## 1. Authentication Endpoints

### 1.1 User Login
- **Method**: `POST`
- **URL**: `/api/auth/login`
- **Authentication Required**: No
- **Request Body**:
```json
{
  "email": "user@wastechain.org",
  "password": "password123"
}
```
- **Success Response (200 OK)**:
```json
{
  "id": "usr_89201",
  "name": "Atharv Kapoor",
  "email": "atharv@wastechain.org",
  "role": "User",
  "greenPoints": 840,
  "tier": "Gold Recycler",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```
- **Error Response (401 Unauthorized)**:
```json
{
  "error": "Invalid email or password credentials."
}
```

---

### 1.2 User Registration
- **Method**: `POST`
- **URL**: `/api/auth/register`
- **Authentication Required**: No
- **Request Body**:
```json
{
  "name": "Atharv Kapoor",
  "email": "atharv@wastechain.org",
  "password": "password123",
  "role": "User"
}
```
- **Success Response (201 Created)**:
```json
{
  "id": "usr_89202",
  "name": "Atharv Kapoor",
  "email": "atharv@wastechain.org",
  "role": "User",
  "greenPoints": 100,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```
- **Error Response (400 Bad Request)**:
```json
{
  "error": "Email address already registered."
}
```

---

### 1.3 Get & Update Profile
- **Method**: `GET` / `PUT`
- **URL**: `/api/auth/profile`
- **Authentication Required**: Yes (`Bearer <token>`)
- **Request Body (PUT)**:
```json
{
  "name": "Atharv Kapoor",
  "email": "atharv@wastechain.org",
  "role": "Collector"
}
```
- **Success Response (200 OK)**:
```json
{
  "id": "usr_89201",
  "name": "Atharv Kapoor",
  "email": "atharv@wastechain.org",
  "role": "Collector",
  "greenPoints": 840,
  "updatedAt": "2026-08-26T10:00:00Z"
}
```

---

## 2. Waste AI Analysis Endpoint

### 2.1 Analyze Waste Photo (Vision AI)
- **Method**: `POST`
- **URL**: `/api/waste/analyze`
- **Authentication Required**: Yes
- **Request Body** (`multipart/form-data`):
  - `image`: File (Binary image upload) OR `imageUrl`: String
- **Success Response (200 OK)**:
```json
{
  "success": true,
  "analysis": {
    "category": "Plastic",
    "material": "PET #1 (Polyethylene Terephthalate)",
    "recyclability": 96,
    "estimatedWeightKg": 0.5,
    "estimatedValueINR": 18,
    "greenPoints": 140,
    "co2SavedKg": 1.8,
    "recommendation": "Recycle via Collection Request"
  }
}
```
- **Error Response (422 Unprocessable Entity)**:
```json
{
  "error": "Unable to identify waste material from image. Please ensure photo is clear."
}
```

---

## 3. Waste Passport Registry Endpoints

### 3.1 Get All Passports
- **Method**: `GET`
- **URL**: `/api/passports`
- **Authentication Required**: Yes
- **Success Response (200 OK)**:
```json
[
  {
    "id": "WC-2026-00124",
    "itemTitle": "PET Plastic Water Bottles",
    "category": "Plastic",
    "material": "PET #1",
    "estimatedWeight": 4.7,
    "status": "Collected",
    "currentStage": 3
  }
]
```

---

### 3.2 Create Digital Waste Passport
- **Method**: `POST`
- **URL**: `/api/passports`
- **Authentication Required**: Yes
- **Request Body**:
```json
{
  "itemTitle": "PET Plastic Water Bottles",
  "category": "Plastic",
  "material": "PET #1",
  "estimatedWeight": 4.7,
  "estimatedValue": 140
}
```
- **Success Response (201 Created)**:
```json
{
  "id": "WC-2026-98401",
  "status": "AI Identified",
  "currentStage": 1,
  "qrCodeData": "https://wastechain.app/passport/WC-2026-98401",
  "createdAt": "2026-08-26T10:00:00Z"
}
```

---

### 3.3 Verify Passport QR Code
- **Method**: `POST`
- **URL**: `/api/passports/verify-qr`
- **Authentication Required**: Yes
- **Request Body**:
```json
{
  "qrData": "https://wastechain.app/passport/WC-2026-00124"
}
```
- **Success Response (200 OK)**:
```json
{
  "valid": true,
  "passportId": "WC-2026-00124",
  "verifiedAt": "2026-08-26T10:00:00Z"
}
```

---

## 4. Waste Collection Requests Endpoints

### 4.1 Create Collection Request
- **Method**: `POST`
- **URL**: `/api/collections`
- **Authentication Required**: Yes
- **Request Body**:
```json
{
  "passportId": "WC-2026-00124",
  "category": "Plastic",
  "weight": "4.7 kg",
  "location": "Hostel Block B, Campus",
  "preferredTime": "Today 4:00 PM"
}
```
- **Success Response (201 Created)**:
```json
{
  "id": "REQ-802",
  "status": "Pending",
  "rewardPts": 160,
  "createdAt": "2026-08-26T10:00:00Z"
}
```

---

### 4.2 Accept & Complete Collection
- **Method**: `POST`
- **URL**: `/api/collections/:id/accept` / `/api/collections/:id/complete`
- **Authentication Required**: Yes (Role: `Collector`)
- **Request Body (Complete)**:
```json
{
  "actualWeight": "4.7 kg"
}
```
- **Success Response (200 OK)**:
```json
{
  "id": "REQ-802",
  "status": "Completed",
  "actualWeight": "4.7 kg",
  "greenPointsIssued": 160
}
```

---

## 5. Marketplace & Payment Endpoints

### 5.1 Create Marketplace Listing
- **Method**: `POST`
- **URL**: `/api/marketplace`
- **Authentication Required**: Yes
- **Request Body**:
```json
{
  "title": "Ergonomic Wooden Study Table",
  "category": "Furniture",
  "type": "List",
  "price": 900,
  "condition": "Like New",
  "location": "Campus Hostels"
}
```
- **Success Response (201 Created)**:
```json
{
  "id": "MKT-901",
  "title": "Ergonomic Wooden Study Table",
  "price": 900,
  "status": "Active"
}
```

---

### 5.2 Create Payment Order (Razorpay / Cashfree)
- **Method**: `POST`
- **URL**: `/api/payments/create-order`
- **Authentication Required**: Yes
- **Request Body**:
```json
{
  "amount": 850,
  "currency": "INR",
  "itemId": "MKT-901"
}
```
- **Success Response (200 OK)**:
```json
{
  "success": true,
  "orderId": "order_RZP_982401",
  "amount": 850,
  "currency": "INR",
  "keyId": "rzp_test_LIVE_KEY"
}
```

---

### 5.3 Verify Payment Signature
- **Method**: `POST`
- **URL**: `/api/payments/verify`
- **Authentication Required**: Yes
- **Request Body**:
```json
{
  "orderId": "order_RZP_982401",
  "paymentId": "pay_RZP_77102",
  "signature": "e838f7d9..."
}
```
- **Success Response (200 OK)**:
```json
{
  "success": true,
  "transactionId": "pay_RZP_77102",
  "verifiedAt": "2026-08-26T10:00:00Z"
}
```

---

## 6. Gamification, Leaderboard & ESG Impact Endpoints

### 6.1 Get Leaderboard Standings
- **Method**: `GET`
- **URL**: `/api/leaderboard`
- **Authentication Required**: No
- **Success Response (200 OK)**:
```json
[
  { "rank": 1, "name": "IIT Delhi Eco Warriors", "points": 48900, "recycledKg": 3450 },
  { "rank": 2, "name": "BITS Pilani Green Club", "points": 42100, "recycledKg": 2980 }
]
```

---

### 6.2 Get Impact Statistics
- **Method**: `GET`
- **URL**: `/api/impact`
- **Authentication Required**: No
- **Success Response (200 OK)**:
```json
{
  "totalRecycledKg": 14850,
  "co2PreventedKg": 25245,
  "landfillDivertedKg": 14100,
  "greenPointsAwarded": 185600,
  "monthlyTrend": [
    { "month": "Aug", "recycledKg": 3350, "co2Saved": 5695 }
  ]
}
```
