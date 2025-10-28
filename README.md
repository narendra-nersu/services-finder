# 🧰 Services Finder

### 🔍 Find Trusted Service Providers Near You

**Services Finder** is a modern web application that helps users easily find and connect with **local service providers** — like mechanics, plumbers, electricians, and more — in their area.  
It also allows **workers to register** their services and get discovered by potential customers.

Built using **Next.js (App Router)**, **Supabase**, and **Bootstrap/Tailwind**, this project combines clean design with powerful functionality.

---

## 🚀 Features

✅ **User Authentication** – Secure signup/login with Supabase Auth  
✅ **Service Search & Filters** – Find professionals by **city**, **service type**, or **keywords**  
✅ **Add Worker Module** – Service providers can add their own listings  
✅ **Responsive Design** – Fully optimized for all screen sizes  
✅ **Supabase Integration** – Real-time database & authentication  
✅ **Toast Notifications** – Modern success/error popups  
✅ **Modern UI** – Powered by **Bootstrap + Tailwind CSS**

---

## 🧠 Tech Stack

| Category | Technologies |
|-----------|---------------|
| **Frontend** | [Next.js 14 (App Router)](https://nextjs.org/) |
| **Styling** | Tailwind CSS, Bootstrap |
| **Backend & Database** | [Supabase](https://supabase.com/) |
| **Authentication** | Supabase Auth |
| **Icons** | Lucide Icons |
| **Deployment** | Vercel / Netlify / Supabase Hosting |

---

## 🏗️ Folder Structure

services-finder/
├── app/
│ ├── page.tsx → Homepage
│ ├── dashboard/ → Browse & search workers
│ ├── add-worker/ → Add service provider
│ ├── login/ → Login page
│ ├── register/ → Signup page
│ ├── forgot-password/ → Forgot password page
│ ├── reset-password/ → Reset password page
│ ├── layout.tsx → Root layout
│ └── globals.css → Global styles
│
├── components/ → Navbar, Footer, WorkerCard, etc.
├── integrations/ → Supabase setup & client config
├── hooks/ → Custom React hooks (e.g., use-toast)
└── package.json → Dependencies & scripts

yaml
Copy code

---

## ⚙️ Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/<your-username>/services-finder.git
cd services-finder
2️⃣ Install Dependencies
bash
Copy code
npm install
3️⃣ Setup Environment Variables
Create a file named .env.local in the root directory and add:

ini
Copy code
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
4️⃣ Run the Development Server
bash
Copy code
npm run dev
Now open 👉 http://localhost:3000

🖼️ Preview
A simple, clean interface to discover and connect with trusted service providers.

📸 Dashboard Example

css
Copy code
(Add a screenshot here later — e.g., dashboard page)
📸 Add Worker Form

sql
Copy code
(Add a screenshot here later — e.g., Add Worker page)
💡 Future Enhancements
🌟 Rating & Review System

💬 Real-Time Chat between user and provider

📅 Booking & Scheduling Feature

📍 Map-based Location Suggestions

🔔 Notification System for new requests

🧑‍💻 Author
👨‍💻 Narendra Nersu
📧 Learning by doing — because real skills come from building.

🪪 License
This project is open source and available under the MIT License.

