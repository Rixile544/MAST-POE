export type Course = 'Starter' | 'Main' | 'Dessert' | 'Drink';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  course: Course;
  price: number;
  // image can be a remote URL (string) or a local require() result (number)
  image?: string | number;
}

export const COURSES: Course[] = ['Starter', 'Main', 'Dessert', 'Drink'];

// In-memory array to store menu items
const menuItems: MenuItem[] = [
  { id: '1', name: 'Tomato Soup', description: 'Warm spiced tomato soup with basil cream', course: 'Starter', price: 45, image: require('../../assets/Tomato Soup.jpg') },
  { id: '2', name: 'Beetroot Carpaccio', description: 'Marinated beets, goat cheese, walnuts', course: 'Starter', price: 60, image: require('../../assets/Beetroot Carpaccio.jpg') },
  { id: '3', name: 'Grilled Salmon', description: 'Atlantic salmon, lemon butter, greens', course: 'Main', price: 140, image: require('../../assets/Grilled Salmon.jpg') },
  { id: '4', name: 'Slow-roast Lamb', description: 'Herb-crusted lamb, rosemary jus', course: 'Main', price: 180, image: require('../../assets/Slow-roast Lamb.jpg') },
  { id: '5', name: 'Wild Mushroom Risotto', description: 'Creamy arborio rice, parmesan', course: 'Main', price: 110, image: require('../../assets/Wild Mushroom Risotto.jpg') },
  { id: '6', name: 'Chocolate Mousse', description: 'Light and airy dark chocolate mousse', course: 'Dessert', price: 65, image: require('../../assets/Chocolate Mousse.jpg') },
  { id: '7', name: 'Lemon Tart', description: 'Zesty lemon curd, shortcrust pastry', course: 'Dessert', price: 58, image: require('../../assets/Lemon Tart.jpg') },
  { id: '8', name: 'House-made Soda', description: 'Seasonal fruit soda (non-alcoholic)', course: 'Drink', price: 35, image: require('../../assets/House-made Soda.jpg') },
  { id: '9', name: 'Classic Cappuccino', description: 'Freshly brewed espresso & milk foam', course: 'Drink', price: 28, image: require('../../assets/Classic Cappuccino.jpg') }
];

export function getAllMenuItems(): MenuItem[] {
  return menuItems;
}

export function addMenuItem(item: Omit<MenuItem, 'id'>): MenuItem {
  const id = String(Date.now());
  const newItem: MenuItem = { id, ...item };
  menuItems.push(newItem);
  return newItem;
}

export function removeMenuItem(id: string): boolean {
  const idx = menuItems.findIndex(m => m.id === id);
  if (idx === -1) return false;
  menuItems.splice(idx, 1);
  return true;
}

export function averagePriceByCourse(): Record<Course, number> {
  const totals: Record<Course, { sum: number; count: number }> = {
    Starter: { sum: 0, count: 0 },
    Main: { sum: 0, count: 0 },
    Dessert: { sum: 0, count: 0 },
    Drink: { sum: 0, count: 0 }
  };

  for (let i = 0; i < menuItems.length; i++) {
    const it = menuItems[i];
    totals[it.course].sum += it.price;
    totals[it.course].count += 1;
  }

  const averages: Record<Course, number> = {
    Starter: 0,
    Main: 0,
    Dessert: 0,
    Drink: 0
  };

  for (const k in totals) {
    // for-in loop used as PoE evidence
    const key = k as Course;
    const t = totals[key];
    averages[key] = t.count === 0 ? 0 : Math.round((t.sum / t.count) * 100) / 100;
  }

  return averages;
}
