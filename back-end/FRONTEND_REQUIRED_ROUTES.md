# Backend Routes to Implement

This document outlines the additional backend API routes needed to support the frontend functionality for Phase 1 of the FixAppliance eCommerce platform.

## Articles / DIY Content Routes

### GET `/api/articles`
Get a list of published DIY articles with filtering and pagination.

**Query Parameters:**
- `page` (number) - Page number for pagination
- `limit` (number) - Number of articles per page (default: 12)
- `category` (string) - Filter by appliance category (e.g., washing-machine, refrigerator)
- `language` (string) - Filter by language (en, ar)
- `sort` (string) - Sort by: newest, popular

**Response:**
```json
{
  "success": true,
  "data": {
    "articles": [
      {
        "id": 1,
        "title": "How to Troubleshoot Your Washing Machine",
        "titleAR": "كيفية استكشاف أعطال غسالة الملابس",
        "slug": "how-to-troubleshoot-washing-machine",
        "excerpt": "Learn the most common washing machine problems...",
        "category": "washing-machine",
        "imageUrl": "/images/articles/washing-machine-guide.jpg",
        "hasVideo": true,
        "videoDuration": "5:30",
        "author": { "name": "Ahmad Hassan", "avatar": "..." },
        "readTime": "8 min",
        "createdAt": "2024-12-01"
      }
    ],
    "pagination": {
      "page": 1,
      "totalPages": 5,
      "totalCount": 48
    }
  }
}
```

### GET `/api/articles/:slug`
Get a single article by its slug.

---

## Appliance Categories Routes

### GET `/api/appliance-categories`
Get list of active appliance categories for booking forms.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nameEN": "Washing Machine",
      "nameAR": "غسالة الملابس",
      "icon": "washing-machine",
      "basePrice": 50.00,
      "isActive": true
    }
  ]
}
```

---

## Appliance Types Routes

### GET `/api/appliance-types`
Get list of active appliance types for booking forms.

**Query Parameters:**
- `categoryId` (number) - Optional filter by category

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nameEN": "Front Load Washing Machine",
      "nameAR": "غسالة تحميل أمامي",
      "categoryId": 1,
      "basePrice": 50.00,
      "isActive": true
    }
  ]
}
```

---

## Service Areas Routes

### GET `/api/service-areas`
Get list of active service areas.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nameEN": "Beirut",
      "nameAR": "بيروت",
      "region": "Mount Lebanon",
      "isActive": true
    }
  ]
}
```

---

## User Profile Routes

### GET `/api/user/profile`
Get current user's profile information.
**Requires:** User authentication

### PUT `/api/user/profile`
Update current user's profile information.
**Requires:** User authentication

---

## Technician Profile Routes

### GET `/api/technician/profile`
Get current technician's profile information.
**Requires:** Technician authentication

### PUT `/api/technician/profile`
Update current technician's profile information.
**Requires:** Technician authentication

### GET `/api/technician/specialties`
Get current technician's specialty areas.
**Requires:** Technician authentication

### DELETE `/api/technician/specialty/:id`
Remove a specialty from technician's profile.
**Requires:** Technician authentication

### GET `/api/technician/service-areas`
Get current technician's service areas.
**Requires:** Technician authentication

### DELETE `/api/technician/service-area/:id`
Remove a service area from technician's profile.
**Requires:** Technician authentication

---

## Technician Booking Routes (Additional)

### POST `/api/technician/booking/start`
Mark a booking as "in_progress".
**Requires:** Technician authentication

**Request Body:**
```json
{
  "bookingId": 123
}
```

### POST `/api/technician/booking/complete`
Mark a booking as "completed".
**Requires:** Technician authentication

**Request Body:**
```json
{
  "bookingId": 123,
  "notes": "Replaced the motor belt"
}
```

### POST `/api/technician/booking/decline`
Decline a pending booking (for technicians who don't want to accept).
**Requires:** Technician authentication

**Request Body:**
```json
{
  "bookingId": 123,
  "reason": "Location too far"
}
```

---

## Technician Earnings Routes

### GET `/api/technician/earnings`
Get technician's earnings summary.
**Requires:** Technician authentication

**Query Parameters:**
- `period` (string) - daily, weekly, monthly, yearly
- `startDate` (date) - Optional custom start date
- `endDate` (date) - Optional custom end date

**Response:**
```json
{
  "success": true,
  "data": {
    "totalEarnings": 1420.00,
    "totalBookings": 28,
    "completedBookings": 28,
    "earnings": [
      {
        "bookingId": 123,
        "amount": 42.50,
        "completedAt": "2024-12-01",
        "applianceType": "Washing Machine"
      }
    ]
  }
}
```

---

## Contact Form Route

### POST `/api/contact`
Submit a contact form message.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+961 71 234 567",
  "subject": "booking",
  "message": "I have a question about my booking..."
}
```

---

## Newsletter Subscription

### POST `/api/newsletter/subscribe`
Subscribe to the newsletter.

**Request Body:**
```json
{
  "email": "john@example.com",
  "language": "en"
}
```

---

## Notes

1. All authenticated routes should use the existing cookie-based JWT authentication already implemented.
2. Error responses should follow the existing format: `{ "message": "Error description" }`
3. All dates should be in ISO 8601 format.
4. The platform fee (15%) calculation should be handled on the backend for security.
5. Arabic translations (AR fields) should be stored in the database alongside English versions.
