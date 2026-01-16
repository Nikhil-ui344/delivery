export const menuItems = [
  // BREAKFAST
  {
    id: 1,
    name: "Masala Dosa",
    category: "breakfast",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=500",
    description: "Crispy rice crepe filled with spiced potato masala, served with sambar and chutney",
    rating: 4.9,
    reviews: 186,
    available: true,
    spiceLevels: ["Mild", "Medium", "Hot"],
    toppings: [
      { name: "Extra Sambar", price: 1.50 },
      { name: "Coconut Chutney", price: 1.00 },
      { name: "Ghee", price: 2.00 },
      { name: "Onion Masala", price: 1.50 }
    ],
    popular: true
  },
  {
    id: 2,
    name: "Idli Sambar",
    category: "breakfast",
    price: 6.99,
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500",
    description: "Steamed rice cakes served with sambar lentil soup and coconut chutney",
    rating: 4.7,
    reviews: 145,
    available: true,
    spiceLevels: ["Mild", "Medium", "Hot"],
    toppings: [
      { name: "Extra Idli", price: 2.00 },
      { name: "Ghee", price: 2.00 },
      { name: "Podi", price: 1.50 },
      { name: "Extra Sambar", price: 1.50 }
    ]
  },
  {
    id: 3,
    name: "Poha",
    category: "breakfast",
    price: 5.99,
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=500",
    description: "Flattened rice flakes cooked with onions, peanuts, and Indian spices",
    rating: 4.5,
    reviews: 98,
    available: true,
    spiceLevels: ["Mild", "Medium", "Hot"],
    toppings: [
      { name: "Sev", price: 1.00 },
      { name: "Coriander", price: 0.75 },
      { name: "Lemon", price: 0.50 },
      { name: "Extra Peanuts", price: 1.25 }
    ]
  },
  {
    id: 4,
    name: "Masala Chai",
    category: "breakfast",
    price: 3.99,
    image: "https://images.unsplash.com/photo-1597318181390-8a9b75bd92cd?w=500",
    description: "Traditional Indian spiced tea with cardamom, ginger, and milk",
    rating: 4.8,
    reviews: 234,
    available: true,
    spiceLevels: [],
    toppings: [
      { name: "Extra Strong", price: 0.50 },
      { name: "Less Sugar", price: 0.00 },
      { name: "Extra Ginger", price: 0.75 },
      { name: "Elaichi", price: 0.50 }
    ]
  },
  
  // LUNCH
  {
    id: 5,
    name: "Chicken Biryani",
    category: "lunch",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500",
    description: "Aromatic basmati rice layered with marinated chicken, spices, and saffron",
    rating: 4.9,
    reviews: 312,
    available: true,
    spiceLevels: ["Mild", "Medium", "Hot", "Extra Hot"],
    toppings: [
      { name: "Raita", price: 1.50 },
      { name: "Extra Chicken", price: 3.50 },
      { name: "Boiled Egg", price: 1.00 },
      { name: "Fried Onions", price: 1.25 },
      { name: "Pickle", price: 0.75 }
    ],
    popular: true
  },
  {
    id: 6,
    name: "Paneer Butter Masala",
    category: "lunch",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500",
    description: "Soft paneer cubes in rich creamy tomato gravy with butter and spices",
    rating: 4.8,
    reviews: 245,
    available: true,
    spiceLevels: ["Mild", "Medium", "Hot"],
    toppings: [
      { name: "Extra Paneer", price: 3.00 },
      { name: "Butter", price: 1.50 },
      { name: "Cream", price: 1.50 },
      { name: "Naan", price: 2.50 }
    ],
    popular: true
  },
  {
    id: 7,
    name: "Chole Bhature",
    category: "lunch",
    price: 10.99,
    image: "https://images.unsplash.com/photo-1626074353765-517a5d016f1a?w=500",
    description: "Spiced chickpea curry served with fluffy deep-fried bread",
    rating: 4.7,
    reviews: 198,
    available: true,
    spiceLevels: ["Mild", "Medium", "Hot"],
    toppings: [
      { name: "Extra Bhature", price: 2.00 },
      { name: "Onion", price: 0.50 },
      { name: "Pickle", price: 0.75 },
      { name: "Green Chutney", price: 1.00 }
    ]
  },
  {
    id: 8,
    name: "Dal Tadka with Rice",
    category: "lunch",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500",
    description: "Tempered yellow lentils with aromatic spices served with steamed rice",
    rating: 4.6,
    reviews: 167,
    available: false,
    spiceLevels: ["Mild", "Medium", "Hot"],
    toppings: ["Papad", "Pickle", "Ghee", "Jeera Rice", "Curd"]
  },
  {
    id: 9,
    name: "Vegetable Thali",
    category: "lunch",
    price: 13.99,
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=500",
    description: "Complete meal with dal, sabzi, roti, rice, raita, and sweet",
    rating: 4.8,
    reviews: 189,
    available: true,
    spiceLevels: ["Mild", "Medium", "Hot"],
    toppings: ["Extra Sabzi", "Raita", "Papad", "Sweet"]
  },

  // DINNER
  {
    id: 10,
    name: "Butter Chicken",
    category: "dinner",
    price: 16.99,
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500",
    description: "Tender chicken in creamy tomato-based sauce with butter and spices",
    rating: 4.9,
    reviews: 356,
    available: true,
    spiceLevels: ["Mild", "Medium", "Hot"],
    toppings: ["Extra Chicken", "Butter", "Cream", "Naan", "Rice"],
    popular: true
  },
  {
    id: 11,
    name: "Tandoori Chicken",
    category: "dinner",
    price: 18.99,
    image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=500",
    description: "Clay oven roasted chicken marinated in yogurt and aromatic spices",
    rating: 4.8,
    reviews: 289,
    available: true,
    spiceLevels: ["Mild", "Medium", "Hot"],
    toppings: ["Mint Chutney", "Onion Salad", "Lemon", "Extra Chicken"]
  },
  {
    id: 12,
    name: "Fish Curry",
    category: "dinner",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500",
    description: "Fresh fish cooked in coconut-based curry with spices and herbs",
    rating: 4.7,
    reviews: 178,
    available: true,
    spiceLevels: ["Mild", "Medium", "Hot"],
    toppings: ["Extra Fish", "Coconut", "Curry Leaves", "Rice"]
  },
  {
    id: 13,
    name: "Palak Paneer",
    category: "dinner",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500",
    description: "Soft paneer cubes in creamy spinach gravy with aromatic spices",
    rating: 4.7,
    reviews: 203,
    available: true,
    spiceLevels: ["Mild", "Medium", "Hot"],
    toppings: ["Extra Paneer", "Cream", "Naan", "Rice"]
  },
  {
    id: 14,
    name: "Lamb Rogan Josh",
    category: "dinner",
    price: 21.99,
    image: "https://images.unsplash.com/photo-1645177628172-a94c30a5e4a0?w=500",
    description: "Tender lamb cooked in aromatic Kashmiri curry with spices",
    rating: 4.8,
    reviews: 167,
    available: true,
    spiceLevels: ["Mild", "Medium", "Hot"],
    toppings: ["Extra Lamb", "Naan", "Rice", "Raita"]
  },

  // SNACKS
  {
    id: 15,
    name: "Samosa (2 pieces)",
    category: "snacks",
    price: 5.99,
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500",
    description: "Crispy pastry filled with spiced potatoes and peas, served with chutney",
    rating: 4.8,
    reviews: 312,
    available: true,
    spiceLevels: ["Mild", "Medium", "Hot"],
    toppings: ["Mint Chutney", "Tamarind Chutney", "Extra Samosas", "Green Chili"],
    popular: true
  },
  {
    id: 16,
    name: "Paneer Tikka",
    category: "snacks",
    price: 11.99,
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500",
    description: "Grilled cottage cheese cubes marinated in spiced yogurt",
    rating: 4.8,
    reviews: 178,
    available: true,
    spiceLevels: ["Mild", "Medium", "Hot"],
    toppings: ["Mint Chutney", "Extra Paneer", "Onion", "Lemon"]
  },
  {
    id: 17,
    name: "Aloo Tikki (2 pieces)",
    category: "snacks",
    price: 6.99,
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=500",
    description: "Crispy potato patties served with chutneys and yogurt",
    rating: 4.7,
    reviews: 234,
    available: true,
    spiceLevels: ["Mild", "Medium", "Hot"],
    toppings: ["Tamarind Chutney", "Mint Chutney", "Yogurt", "Sev"],
    popular: true
  },
  {
    id: 18,
    name: "Pakora Platter",
    category: "snacks",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500",
    description: "Assorted fritters with onion, potato, and paneer in gram flour batter",
    rating: 4.6,
    reviews: 189,
    available: true,
    spiceLevels: ["Mild", "Medium", "Hot"],
    toppings: ["Mint Chutney", "Tamarind Chutney", "Green Chili", "Onion"]
  },
  {
    id: 19,
    name: "Pani Puri (6 pieces)",
    category: "snacks",
    price: 7.99,
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=500",
    description: "Crispy hollow puris filled with spiced water, potatoes, and chickpeas",
    rating: 4.7,
    reviews: 189,
    available: true,
    spiceLevels: ["Mild", "Medium", "Hot"],
    toppings: ["Sweet Chutney", "Spicy Pani", "Extra Masala", "Boondi"]
  },

  // DRINKS
  {
    id: 20,
    name: "Mango Lassi",
    category: "drinks",
    price: 5.99,
    image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=500",
    description: "Creamy yogurt drink blended with sweet mangoes",
    rating: 4.9,
    reviews: 378,
    available: true,
    spiceLevels: [],
    toppings: ["Extra Mango", "Cardamom", "Saffron"],
    popular: true
  },
  {
    id: 21,
    name: "Sweet Lassi",
    category: "drinks",
    price: 4.99,
    image: "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?w=500",
    description: "Traditional yogurt-based drink sweetened with sugar and cardamom",
    rating: 4.7,
    reviews: 267,
    available: true,
    spiceLevels: [],
    toppings: ["Rose Water", "Cardamom", "Pistachios"]
  },
  {
    id: 22,
    name: "Jaljeera",
    category: "drinks",
    price: 4.49,
    image: "https://images.unsplash.com/photo-1546173159-315724a31696?w=500",
    description: "Refreshing cumin-spiced lemonade with mint and spices",
    rating: 4.6,
    reviews: 189,
    available: true,
    spiceLevels: [],
    toppings: ["Extra Mint", "Ice", "Black Salt", "Lemon"]
  },
  {
    id: 23,
    name: "Nimbu Pani",
    category: "drinks",
    price: 3.99,
    image: "https://images.unsplash.com/photo-1523677011781-c91d1bbe4a5f?w=500",
    description: "Fresh lemon juice with water, sugar, and a hint of salt",
    rating: 4.5,
    reviews: 201,
    available: true,
    spiceLevels: [],
    toppings: ["Extra Lemon", "Ice", "Mint", "Black Salt"]
  },
  {
    id: 24,
    name: "Filter Coffee",
    category: "drinks",
    price: 4.99,
    image: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=500",
    description: "South Indian style strong filtered coffee with frothy milk",
    rating: 4.8,
    reviews: 289,
    available: true,
    spiceLevels: [],
    toppings: ["Extra Strong", "Extra Sugar", "Less Sugar"]
  }
];

export const categories = [
  { id: "breakfast", name: "Breakfast", icon: "Coffee" },
  { id: "lunch", name: "Lunch", icon: "Utensils" },
  { id: "dinner", name: "Dinner", icon: "UtensilsCrossed" },
  { id: "snacks", name: "Snacks", icon: "Cookie" },
  { id: "drinks", name: "Drinks", icon: "Glass" }
];

export const reviews = [
  {
    id: 1,
    userName: "Maria Garcia",
    rating: 5,
    comment: "Best Mexican food I've ever had! The tacos are authentic and delicious.",
    date: "2026-01-10",
    itemId: 5
  },
  {
    id: 2,
    userName: "John Smith",
    rating: 4,
    comment: "Great atmosphere and excellent service. Portions are generous!",
    date: "2026-01-08",
    itemId: 10
  },
  {
    id: 3,
    userName: "Carlos Rodriguez",
    rating: 5,
    comment: "The guacamole is made fresh right at your table. Amazing!",
    date: "2026-01-05",
    itemId: 17
  },
  {
    id: 4,
    userName: "Sarah Johnson",
    rating: 4,
    comment: "Love the margaritas and the nachos. Will definitely come back!",
    date: "2026-01-03",
    itemId: 15
  },
  {
    id: 5,
    userName: "Miguel Torres",
    rating: 5,
    comment: "Authentic Mexican cuisine! Feels like I'm back in Mexico City.",
    date: "2025-12-28",
    itemId: 11
  }
];

export const users = [
  {
    id: 1,
    name: "Maria Garcia",
    phone: "+1-555-0101",
    email: "maria.g@email.com",
    orderCount: 23,
    totalSpent: 487.32,
    joinedDate: "2025-06-15"
  },
  {
    id: 2,
    name: "John Smith",
    phone: "+1-555-0102",
    email: "john.smith@email.com",
    orderCount: 15,
    totalSpent: 342.18,
    joinedDate: "2025-08-22"
  },
  {
    id: 3,
    name: "Carlos Rodriguez",
    phone: "+1-555-0103",
    email: "carlos.r@email.com",
    orderCount: 31,
    totalSpent: 678.45,
    joinedDate: "2025-04-10"
  },
  {
    id: 4,
    name: "Sarah Johnson",
    phone: "+1-555-0104",
    email: "sarah.j@email.com",
    orderCount: 12,
    totalSpent: 289.67,
    joinedDate: "2025-09-05"
  },
  {
    id: 5,
    name: "Miguel Torres",
    phone: "+1-555-0105",
    email: "miguel.t@email.com",
    orderCount: 28,
    totalSpent: 598.12,
    joinedDate: "2025-05-18"
  }
];

export const offers = [
  {
    id: 1,
    title: "Taco Tuesday Special",
    description: "Buy 2 taco orders, get 1 free!",
    discount: 33,
    code: "TACO33",
    validUntil: "2026-01-31",
    active: true
  },
  {
    id: 2,
    title: "Family Feast",
    description: "Order above $50 and get 20% off",
    discount: 20,
    code: "FAMILY20",
    validUntil: "2026-02-15",
    active: true
  },
  {
    id: 3,
    title: "Happy Hour",
    description: "50% off on all drinks from 3-5 PM",
    discount: 50,
    code: "HAPPY50",
    validUntil: "2026-01-30",
    active: true
  },
  {
    id: 4,
    title: "First Order Bonus",
    description: "Get $10 off on your first order",
    discount: 10,
    code: "FIRST10",
    validUntil: "2026-12-31",
    active: true
  }
];
