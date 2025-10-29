# 🧰 Service Finder

Service Finder is a full-stack web application that connects **users with local service providers** such as electricians, plumbers, mechanics, carpenters, drivers, and more.  
It allows users to browse, search, and contact skilled professionals based on **city, occupation, or keywords**, providing a smooth and intuitive experience.

---

## 🚀 Features

### 🧑‍💻 User Authentication
- **Login**, **Register**, and **Forgot Password** functionality.  
- Secure authentication powered by **Supabase Auth**.
- Passwords are safely managed using **bcrypt** for encryption.
- Email verification and reset password support.

### 🧾 Service Management
- Users can **add new services** with details like name, city, occupation, experience, and description.
- Workers can manage their visibility using the **active/inactive** status.
- Admins (or users) can view all registered services.

### 🔍 Dashboard & Search
- Dynamic **dashboard** for exploring available service providers.
- Search by **city**, **occupation**, or **keywords**.
- Real-time filtering with instant updates.
- Display of worker ratings, experience, and contact information.

### 🎨 Modern UI/UX
- Built with **Next.js (App Router)** and **TailwindCSS**.
- Clean, responsive, and mobile-friendly layout.
- Integrated **Bootstrap** for additional styling flexibility.
- Uses **Lucide React icons** for a professional look.

---

## 🛠️ Tech Stack

| Layer | Technologies |
|-------|---------------|
| **Frontend** | Next.js 15, React 18, TailwindCSS, Bootstrap |
| **Backend** | Supabase (PostgreSQL + Auth + API) |
| **Database** | Supabase PostgreSQL |
| **Hosting** | Render / Vercel |
| **Other Tools** | TypeScript, ESLint, Lucide Icons, Radix UI Components |

---

## 🧩 Folder Structure

services-finder/
│
├── app/ # Next.js app directory
│ ├── dashboard/ # Dashboard and filtering logic
│ ├── add-worker/ # Add Service form
│ ├── login/ # Login page
│ ├── register/ # Registration page
│ └── forgot-password/ # Password reset page
│
├── components/ # Reusable UI components
├── integrations/supabase # Supabase client setup
├── utils/ # Helper functions and utilities
└── public/ # Static assets (images, logos)

yaml
Copy code

---

## 🌱 Future Improvements

The current version of **Service Finder** is functional and user-friendly.  
Here are some ways it can be enhanced in the future:

1. **⭐ Rating & Review System**  
   - Allow users to rate and review service providers directly.

2. **📍 Live Location Integration**  
   - Add Google Maps API to show nearby service providers based on user’s location.

3. **💬 Real-Time Chat**  
   - Integrate a live chat feature between users and workers.

4. **📅 Booking System**  
   - Let users book appointments or schedule services directly from the dashboard.

5. **🔔 Notifications**  
   - Email or in-app notifications for new bookings or messages.

6. **📊 Admin Panel**  
   - Add an admin dashboard for managing users, services, and reports.

---

## 💡 How It Helps

- **For Users:** Quickly find reliable service providers in your area without hassle.  
- **For Service Providers:** A simple digital platform to list services and reach more customers.  
- **For Communities:** Promotes local employment and digital visibility for skilled workers.

---

## 🧑‍💼 Developer

**👨‍💻 Narendra Nersu**  
B.Tech Final Year Student — Computer science student
Passionate about AI/ML, Web Development, and Building Real-World Solutions.

---


## 🖥️ Deployment

The application can be deployed using  **Render** for free.  
To deploy:
```bash
# Install dependencies
npm install

# Build the project
npm run build

# Start the production server
npm start
