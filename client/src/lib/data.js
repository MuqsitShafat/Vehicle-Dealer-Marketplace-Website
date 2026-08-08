import heroBg from "../assets/images/hero_background_image.jpeg";
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
import givingImage from "../assets/images/giving_image.jpeg";
import sparePartsMainImg from "../assets/images/spare_parts_main_image.jpeg";
import logoImg from "../assets/images/logo.png";
export const IMAGES = {
  hero: heroBg,
  logo: logoImg,
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
    name: "Alternator 12V",
    price: "Rs 12,500",
    compatible: ["Toyota Corolla", "Hyundai Elantra", "Suzuki Swift"],
    img: IMAGES.part1,
  },
  {
    id: 2,
    name: "Brake Pad Set (Front)",
    price: "Rs 4,800",
    compatible: ["Suzuki Swift", "Suzuki Alto", "Suzuki Mehran"],
    img: IMAGES.part2,
  },
  {
    id: 3,
    name: "LED Headlight Pair",
    price: "Rs 9,200",
    compatible: ["Toyota Corolla", "Hyundai Tucson"],
    img: IMAGES.part3,
  },
  {
    id: 4,
    name: "Timing Belt Kit",
    price: "Rs 7,600",
    compatible: ["Toyota Corolla", "Toyota Yaris"],
    img: IMAGES.part1,
  },
  {
    id: 5,
    name: "Battery 65AH",
    price: "Rs 22,400",
    compatible: ["Hyundai Tucson", "Massey Ferguson 240"],
    img: IMAGES.part2,
  },
  {
    id: 6,
    name: "Chain Sprocket Set",
    price: "Rs 3,100",
    compatible: ["Honda CD 70", "Honda CG 125", "Honda CB 150F"],
    img: IMAGES.part3,
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
  Car: ["Toyota", "Suzuki", "Hyundai"],
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

export const PRICE_RANGES = [
  "Under Rs 20 Lac",
  "Rs 20 – 40 Lac",
  "Rs 40 – 70 Lac",
  "Rs 70 Lac – 1.5 Cr",
  "Above Rs 1.5 Cr",
];

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
  phone: "03332834567",
  whatsapp: "03332834567",
  address: "Darya Khan Road, Bhakkar, Punjab, Pakistan",
  hours: "Mon – Sat: 9:00 AM – 8:00 PM",
  emails: [
    "waseemmotors77@gmail.com",
    "waseemhondabhakkar@gmail.com"
  ],
  phones: [
    { name: "Muhammad Akash Awan", number: "03121537773" },
    { name: "Muhammad Waseem Awan", number: "03332834567" },
    { name: "Abdul Sattar Awan", number: "03007789481" }
  ],
  showrooms: {
    Car: "Waseem Motors Darya Khan Road Bhakkar Near Noor Mehal",
    Tractor: "Waseem Tractors Darya Khan Road Bhakkar Near Punjab College",
    Bike: "Waseem Honda Bhakkar Near DHQ Hospital Bhakkar Khansar Road"
  }
};
