import { supabase } from "./supabase";
import heroBg from "../assets/images/hero_background_image1.png";
import altisImg from "../assets/images/Cars/Altis.jpeg";
import altisFrontImg from "../assets/images/Cars/Altis_front_pic.jpeg";
import carsGridImg from "../assets/images/Cars/Cars_Main_Grid.jpeg";
import havalImg from "../assets/images/Cars/Haval_car.jpeg";
import civicImg from "../assets/images/Cars/Honda_Civic.png";
import mehranImg from "../assets/images/Cars/Suzuki_Mehran.jpeg";
import mehranBackImg from "../assets/images/Cars/Suzuki_Mehran_back_pic.jpeg";
import mehranInteriorImg from "../assets/images/Cars/Suzuki_Mehran_interior.jpeg";
import mehranSideImg from "../assets/images/Cars/Suzuki_Mehran_side_pic.jpeg";
import swiftImg from "../assets/images/Cars/Suzuki_swift.jpg";
import swiftBackImg from "../assets/images/Cars/Suzuki_swift_back.jpg";

import bikesGridImg from "../assets/images/Bikes/Bikes_Main_Grid.jpeg";
import honda150Img from "../assets/images/Bikes/Honda150.jpeg";
import honda150BackImg from "../assets/images/Bikes/Honda150_back_pic.jpeg";
import honda150Pic2Img from "../assets/images/Bikes/Honda150_pic2.jpeg";
import cd70Img from "../assets/images/Bikes/Honda_CD70.jpg";
import cd70Pic2Img from "../assets/images/Bikes/Honda_CD70_pic2.png";

import masseyImg from "../assets/images/Tractors/Massey_Ferguson_tractor.jpg";
import tractorsGridImg from "../assets/images/Tractors/Tractors_Main_Grid.jpg";
import givingImage from "../assets/images/giving_image1.jpeg";
import sparePartsMainImg from "../assets/images/spare_parts_main_image.jpeg";
import logoImg from "../assets/images/logo_white.png";
import bikesLogoImg from "../assets/images/Waseem_bikes_logo.png";
import cd70Tank from "../assets/images/SpareParts/HondaTank_CD70.jpeg";
import cd70BackLight from "../assets/images/SpareParts/Honda_CD70_BackLight.jpeg";
import cd70BreakLeather from "../assets/images/SpareParts/Honda_CD70_BreakLeather.jpeg";
import cd70SideLight from "../assets/images/SpareParts/Honda_CD70_SideLight.jpeg";
import cd70Headlight from "../assets/images/SpareParts/Honda_CD70_headlight.jpeg";
export const IMAGES = {
  hero: heroBg,
  logo: logoImg,
  bikesLogo: bikesLogoImg,
  sedan: altisImg,
  suv: havalImg,
  hatch: swiftImg,
  city: carsGridImg,
  bike: cd70Img,
  luxury: civicImg,
  tractor1: masseyImg,
  tractor2: tractorsGridImg,
  tractor3: masseyImg,
  bike2: honda150Img,
  bike3: cd70Img,
  part1: sparePartsMainImg,
  part2:
    "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=600&q=80",
  part3:
    "https://images.unsplash.com/photo-1507136566006-cfc505b114fc?auto=format&fit=crop&w=600&q=80",

  // Local references
  altis: altisImg,
  altisFront: altisFrontImg,
  carsGrid: carsGridImg,
  civic: civicImg,
  mehran: mehranImg,
  mehranBack: mehranBackImg,
  mehranInterior: mehranInteriorImg,
  mehranSide: mehranSideImg,
  swift: swiftImg,
  swiftBack: swiftBackImg,
  bikesGrid: bikesGridImg,
  honda150: honda150Img,
  honda150Back: honda150BackImg,
  honda150Pic2: honda150Pic2Img,
  cd70: cd70Img,
  cd70Pic2: cd70Pic2Img,
  tractorsGrid: tractorsGridImg,
  massey: masseyImg,
  givingImage: givingImage,
};

export const LISTINGS = [
  {
    id: 1,
    title: "Toyota Corolla Altis",
    brand: "Toyota",
    category: "Car",
    year: 2022,
    price: "Rs 72.5 Lac",
    priceRaw: 7250000,
    km: "41,200 km",
    city: "Bhakkar",
    fuel: "Petrol",
    transmission: "Automatic",
    verified: true,
    status: "Live",
    img: IMAGES.altis,
    images: [IMAGES.altis, IMAGES.altisFront],
    days: "Today",
    condition: "Excellent — no repainting reported",
  },
  {
    id: 2,
    title: "Hyundai Elantra GL",
    brand: "Hyundai",
    category: "Car",
    year: 2021,
    price: "Rs 64.9 Lac",
    priceRaw: 6490000,
    km: "33,800 km",
    city: "Bhakkar",
    fuel: "Petrol",
    transmission: "Automatic",
    verified: true,
    status: "Live",
    img: IMAGES.civic,
    images: [IMAGES.civic],
    days: "Yesterday",
  },
  {
    id: 3,
    title: "Suzuki Swift GLX",
    brand: "Suzuki",
    category: "Car",
    year: 2023,
    price: "Rs 44.5 Lac",
    priceRaw: 4450000,
    km: "18,500 km",
    city: "Bhakkar",
    fuel: "Petrol",
    transmission: "Automatic",
    verified: true,
    status: "Live",
    img: IMAGES.swift,
    images: [IMAGES.swift, IMAGES.swiftBack],
    days: "2 days ago",
  },
  {
    id: 4,
    title: "Hyundai Tucson AWD",
    brand: "Hyundai",
    category: "Car",
    year: 2020,
    price: "Rs 78.5 Lac",
    priceRaw: 7850000,
    km: "58,900 km",
    city: "Bhakkar",
    fuel: "Diesel",
    transmission: "Automatic",
    verified: true,
    status: "Sold",
    img: IMAGES.suv,
    images: [IMAGES.suv],
    days: "3 days ago",
  },
  {
    id: 5,
    title: "Toyota Yaris ATIV",
    brand: "Toyota",
    category: "Car",
    year: 2022,
    price: "Rs 48.2 Lac",
    priceRaw: 4820000,
    km: "27,400 km",
    city: "Bhakkar",
    fuel: "Petrol",
    transmission: "Automatic",
    verified: false,
    status: "Pending",
    img: IMAGES.sedan,
    images: [IMAGES.sedan],
    days: "4 days ago",
  },
  {
    id: 6,
    title: "Honda CD 70",
    brand: "Honda",
    category: "Bike",
    year: 2024,
    price: "Rs 1.65 Lac",
    priceRaw: 165000,
    km: "4,200 km",
    city: "Bhakkar",
    fuel: "Petrol",
    transmission: "Manual",
    verified: true,
    status: "Live",
    img: IMAGES.cd70,
    images: [IMAGES.cd70, IMAGES.cd70Pic2],
    days: "Today",
  },
  {
    id: 7,
    title: "Honda CB 150F",
    brand: "Honda",
    category: "Bike",
    year: 2023,
    price: "Rs 4.45 Lac",
    priceRaw: 445000,
    km: "9,100 km",
    city: "Bhakkar",
    fuel: "Petrol",
    transmission: "Manual",
    verified: true,
    status: "Live",
    img: IMAGES.honda150,
    images: [IMAGES.honda150, IMAGES.honda150Back, IMAGES.honda150Pic2],
    days: "Today",
  },
  {
    id: 8,
    title: "Honda CG 125",
    brand: "Honda",
    category: "Bike",
    year: 2022,
    price: "Rs 1.89 Lac",
    priceRaw: 189000,
    km: "15,600 km",
    city: "Bhakkar",
    fuel: "Petrol",
    transmission: "Manual",
    verified: false,
    status: "Pending",
    img: IMAGES.bike3,
    images: [IMAGES.bike3],
    days: "Yesterday",
  },
  {
    id: 9,
    title: "Massey Ferguson 240",
    brand: "Massey Ferguson",
    category: "Tractor",
    year: 2021,
    price: "Rs 15.8 Lac",
    priceRaw: 1580000,
    km: "1,200 hrs",
    city: "Bhakkar",
    fuel: "Diesel",
    transmission: "Manual",
    verified: true,
    status: "Live",
    img: IMAGES.massey,
    images: [IMAGES.massey],
    days: "2 days ago",
  },
  {
    id: 10,
    title: "Millat Tractor 385",
    brand: "Millat",
    category: "Tractor",
    year: 2020,
    price: "Rs 12.5 Lac",
    priceRaw: 1250000,
    km: "2,400 hrs",
    city: "Bhakkar",
    fuel: "Diesel",
    transmission: "Manual",
    verified: true,
    status: "Live",
    img: IMAGES.tractor2,
    images: [IMAGES.tractor2],
    days: "5 days ago",
  },
  {
    id: 11,
    title: "Fiat 480 Special",
    brand: "Fiat",
    category: "Tractor",
    year: 2019,
    price: "Rs 9.75 Lac",
    priceRaw: 975000,
    km: "3,100 hrs",
    city: "Bhakkar",
    fuel: "Diesel",
    transmission: "Manual",
    verified: false,
    status: "Sold",
    img: IMAGES.tractor3,
    images: [IMAGES.tractor3],
    days: "1 week ago",
  },
  {
    id: 12,
    title: "Suzuki Mehran VX",
    brand: "Suzuki",
    category: "Car",
    year: 2012,
    price: "Rs 8.5 Lac",
    priceRaw: 850000,
    km: "95,000 km",
    city: "Bhakkar",
    fuel: "Petrol/CNG",
    transmission: "Manual",
    verified: true,
    status: "Live",
    img: IMAGES.mehran,
    images: [
      IMAGES.mehran,
      IMAGES.mehranBack,
      IMAGES.mehranInterior,
      IMAGES.mehranSide,
    ],
    days: "Just now",
    condition: "Good — local engine and body condition",
  },
];

export const SPARE_PARTS = [
  {
    id: 1,
    name: "Honda CD 70 Fuel Tank",
    price: "Rs 3,800",
    compatible: ["Honda CD 70", "Honda CD 70 Dream"],
    img: cd70Tank,
  },
  {
    id: 2,
    name: "Honda CD 70 Back Light",
    price: "Rs 450",
    compatible: ["Honda CD 70", "Honda CG 125"],
    img: cd70BackLight,
  },
  {
    id: 3,
    name: "Honda CD 70 Brake Leather",
    price: "Rs 350",
    compatible: ["Honda CD 70", "Honda CG 125"],
    img: cd70BreakLeather,
  },
  {
    id: 4,
    name: "Honda CD 70 Side Indicator Pair",
    price: "Rs 600",
    compatible: ["Honda CD 70", "Honda CG 125"],
    img: cd70SideLight,
  },
  {
    id: 5,
    name: "Honda CD 70 Headlight",
    price: "Rs 950",
    compatible: ["Honda CD 70", "Honda CG 125"],
    img: cd70Headlight,
  },
];

export const CITIES = [
  "Bhakkar",
  "Darya Khan",
  "Karachi",
  "Lahore",
  "Islamabad",
  "Rawalpindi",
  "Faisalabad",
  "Multan",
];

export const BRANDS = {
  Car: [
    "Suzuki",
    "Toyota",
    "Honda",
    "Changan",
    "Kia",
    "Hyundai",
    "Haval",
    "MG",
    "BYD",
  ],
  Bike: ["Honda"],
  Tractor: ["Massey Ferguson", "Fiat", "New Holland", "Millat", "Al-Ghazi"],
};

export const BODY_TYPES = [
  "Sedan",
  "SUV",
  "Hatchback",
  "Coupe",
  "Truck",
  "Van",
];

export const YEAR_OPTIONS = [
  "2024 — 2026",
  "2020 — 2023",
  "2015 — 2019",
  "2010 — 2014",
  "Before 2010",
];

export const DYNAMIC_PRICE_RANGES = {
  Car: [
    "Under Rs 15 Lac",
    "Rs 15 – 35 Lac",
    "Rs 35 – 70 Lac",
    "Rs 70 Lac – 1.5 Cr",
    "Rs 1.5 – 5 Cr",
    "Above Rs 5 Cr",
  ],
  Bike: [
    "Under Rs 1.5 Lac",
    "Rs 1.5 – 3 Lac",
    "Rs 3 – 5 Lac",
    "Rs 5 – 8 Lac",
    "Above Rs 8 Lac",
  ],
  Tractor: [
    "Under Rs 25 Lac",
    "Rs 25 – 45 Lac",
    "Rs 45 – 80 Lac",
    "Rs 80 Lac – 1.5 Cr",
    "Above Rs 1.5 Cr",
  ],
  any: [
    "Under Rs 10 Lac",
    "Rs 10 – 30 Lac",
    "Rs 30 – 70 Lac",
    "Rs 70 Lac – 1.5 Cr",
    "Above Rs 1.5 Cr",
  ],
};

export const PRICE_RANGES = DYNAMIC_PRICE_RANGES.any;

export const CATEGORIES = [
  {
    name: "Car",
    tagline: "Family sedans, SUVs and hatchbacks",
    img: IMAGES.carsGrid,
    count: 124,
  },
  {
    name: "Bike",
    tagline: "Daily commuters and sports bikes",
    img: IMAGES.bikesGrid,
    count: 86,
  },
  {
    name: "Tractor",
    tagline: "Workhorses for the farm",
    img: IMAGES.tractorsGrid,
    count: 37,
  },
];

export const CONTACT = {
  email: "waseemmotors77@gmail.com",
  phone: "03121537773",
  whatsapp: "03121537773",
  address: "Darya Khan Road, Bhakkar, Punjab, Pakistan",
  hours: "Sat – Thu: 9:00 AM – 8:00 PM (Friday Off)",
  emails: ["waseemmotors77@gmail.com", "waseemhondabhakkar@gmail.com"],
  phones: [
    { name: "Muhammad Akash Awan", number: "03121537773" },
    { name: "Abdul Sattar Awan", number: "03007789481" },
  ],
  showrooms: {
    Car: "Waseem Motors Darya Khan Road Bhakkar Near Noor Mehal",
    Tractor: "Waseem Tractors Darya Khan Road Bhakkar Near Punjab College",
    Bike: "Waseem Honda Bhakkar Near DHQ Hospital Bhakkar Khansar Road",
  },
};

export function formatPrice(amount) {
  const num = Number(amount) || 0;
  if (num < 100000) {
    return `Rs ${num.toLocaleString()}`;
  } else if (num < 10000000) {
    const lacs = num / 100000;
    const formatted =
      lacs % 1 === 0 ? lacs : lacs.toFixed(2).replace(/\.?0+$/, "");
    return `Rs ${formatted} Lac`;
  } else {
    const crores = num / 10000000;
    const formatted =
      crores % 1 === 0 ? crores : crores.toFixed(2).replace(/\.?0+$/, "");
    return `Rs ${formatted} Cr`;
  }
}

export function getBrandFromTitle(title, category) {
  if (!title) return "Other";
  const t = title.toLowerCase();
  const brands = BRANDS[category] || [];
  for (const b of brands) {
    if (t.includes(b.toLowerCase())) {
      return b;
    }
  }
  if (t.includes("toyota")) return "Toyota";
  if (t.includes("suzuki")) return "Suzuki";
  if (t.includes("hyundai")) return "Hyundai";
  if (t.includes("honda")) return "Honda";
  if (t.includes("massey") || t.includes("ferguson")) return "Massey Ferguson";
  if (t.includes("fiat")) return "Fiat";
  if (t.includes("holland")) return "New Holland";
  if (t.includes("millat")) return "Millat";
  if (t.includes("ghazi")) return "Al-Ghazi";
  return "Other";
}

export async function getCurrentListings() {
  try {
    const { data: dbListings, error } = await supabase
      .from("listings")
      .select("*")
      .order("id", { ascending: true });

    if (error) throw error;

    return (dbListings || []).map(item => ({
      id: item.id,
      title: item.title,
      category: item.category,
      brand: item.brand,
      year: item.year,
      price: item.price,
      priceRaw: Number(item.price_raw),
      km: item.km,
      city: item.city,
      fuel: item.fuel,
      transmission: item.transmission,
      verified: item.verified,
      status: item.status,
      source: item.source,
      bookingEnabled: item.booking_enabled,
      img: item.img,
      images: item.images || [],
    }));
  } catch (e) {
    console.error("Error reading listings from Supabase", e);
    return [];
  }
}

export async function getCurrentSpareParts() {
  try {
    const { data: dbParts, error } = await supabase
      .from("spare_parts")
      .select("*")
      .order("id", { ascending: true });

    if (error) throw error;

    return (dbParts || []).map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      priceRaw: Number(item.price_raw),
      compatible: item.compatible || [],
      img: item.img,
    }));
  } catch (e) {
    console.error("Error reading spare parts from Supabase", e);
    return [];
  }
}
