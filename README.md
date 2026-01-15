# 🌮 Sangam Mexico Restaurant System

A complete frontend-only demo application for a restaurant management system with rich UI and animations.

## ✨ Features Implemented

### 👤 USER (CUSTOMER) SIDE - ALL FEATURES ✅

1. **Meal Sections** - Tab-based UI with 5 categories (Breakfast, Lunch, Dinner, Snacks, Drinks)
2. **Browse Menu** - Grid layout with animated food cards
3. **Search & Filter** - Real-time search and price range filters
4. **View Food Details** - Modal with images, ratings, descriptions, and reviews
5. **Add to Cart** - Animated cart with item count badge
6. **Customize Food** - Extra toppings (checkboxes), Spice levels (radio), Quantity selector
7. **Place Order (Checkout)** - Complete order summary and payment breakdown
8. **Order Tracking** - Animated stepper showing Preparing → Ready → Delivered
9. **Notifications** - Toast notifications for all actions (order confirmed, ready, etc.)
10. **User Profile** - Displays name, phone, order history with statistics
11. **Reviews & Ratings** - Star rating UI, review cards, and submission form

### 🏨 ADMIN (HOTEL) SIDE - ALL FEATURES ✅

1. **Admin Dashboard** - Overview cards with orders, sales, users statistics
2. **Add New Food Items** - Complete form with all fields
3. **Edit Food Items** - Update price, image, description inline
4. **Delete Food Items** - Confirmation modal before deletion
5. **Mark Food Available/Unavailable** - Toggle switch functionality
6. **Grey-Out Unavailable Food** - Visual disabled state with badge
7. **Manage Food Categories** - Filter and organize by categories
8. **View & Manage Live Orders** - Highlighted active orders section
9. **Update Order Status** - Dropdown buttons for Preparing/Ready/Delivered
10. **Inventory/Stock Management** - Stock table with low-stock indicators
11. **User Management** - User list with name, phone, order count
12. **Offers & Discounts** - Offer cards with discount percentage badges
13. **Sales & Popular Food Analytics** - Revenue charts, popular items list
14. **Order History & Reports** - Complete orders table with date grouping

## 🎨 Color Theme (Exactly as Specified)

```css
--primary-red: #8B1E1E;
--secondary-red: #6E1515;
--cream: #F7EDE2;
--gold: #F4C430;
--dark-text: #1F1F1F;
```

## 🎥 Framer Motion Animations

Animations implemented throughout:
- Page transitions
- Food cards hover effects
- Modal entrance/exit
- Cart drawer slide-in
- Order status changes
- Toast notifications
- Button interactions
- Loading states

## 📱 Responsive Design

- ✅ Mobile-first approach
- ✅ Tablet supported
- ✅ Desktop grid layouts
- ✅ All screens fully responsive

## 🚀 Getting Started

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

### Access the Application
Open your browser and visit: **http://localhost:5173/**

## 🔄 Toggle Between Views

Use the **"Admin View"** / **"User View"** button in the navbar to switch between customer and admin interfaces.

## 📦 Tech Stack

- **React 18** - UI library
- **React Router DOM** - Navigation
- **Framer Motion** - Animations (MANDATORY requirement met)
- **Lucide React** - Icons
- **Vite** - Build tool
- **CSS Modules** - Styling

## 📊 Dummy Data

The application uses comprehensive static data including:
- 24 menu items across all categories
- 5 user profiles with order history
- Multiple orders with different statuses
- 5 customer reviews
- 4 active offers/discounts

## 🎯 Key Highlights

- ✅ **Every feature is visually implemented** - No feature was skipped or merged
- ✅ **Brand colors dominate** - Restaurant menu theme throughout
- ✅ **Framer Motion used extensively** - All interactions are animated
- ✅ **Production-ready UI** - Suitable for demos, presentations, and client previews
- ✅ **No backend/API/database** - Pure frontend demo as required
- ✅ **Clean React structure** - Well-organized components and pages

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar
│   ├── Cart
│   ├── NotificationToast
│   ├── MenuTabs
│   ├── FoodCard
│   └── FoodDetailModal
├── pages/
│   ├── User/           # Customer-facing pages
│   │   ├── UserHome
│   │   ├── Checkout
│   │   ├── OrderTracking
│   │   ├── UserProfile
│   │   └── Reviews
│   └── Admin/          # Admin dashboard pages
│       ├── AdminDashboard
│       ├── ManageMenu
│       ├── ManageOrders
│       ├── Inventory
│       ├── UserManagement
│       ├── OffersManagement
│       └── Analytics
├── data/               # Static dummy data
├── AppContext.jsx      # Global state management
└── App.jsx            # Main app component
```

## 🌟 Navigation

### User Side
- **Menu** - Browse all food items
- **Track Order** - Real-time order status
- **Reviews** - View and write reviews
- **Profile** - User information and order history

### Admin Side
- **Dashboard** - Overview and statistics
- **Menu** - Manage food items (CRUD operations)
- **Orders** - View and update order status
- **Inventory** - Stock management
- **Users** - Customer management
- **Offers** - Discount management
- **Analytics** - Sales and performance metrics

## 💡 Usage Tips

1. **Add items to cart** - Click any food card to see details and customize
2. **Place orders** - Proceed to checkout and place order
3. **Track orders** - Watch the animated stepper update status
4. **Switch to Admin** - Click "Admin View" to manage the restaurant
5. **Manage inventory** - Update stock levels and mark items unavailable
6. **View analytics** - See sales breakdown and popular items

## ✅ Requirements Checklist

- ✅ Frontend-only (No backend, APIs, database, authentication, payment gateway)
- ✅ All user features implemented and visible
- ✅ All admin features implemented and visible
- ✅ Exact color theme applied
- ✅ Framer Motion animations throughout
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Clean React structure
- ✅ Production-ready quality

---

**Built with ❤️ for demonstration purposes**

🌮 **Sangam Mexico** - Authentic Mexican Flavors
