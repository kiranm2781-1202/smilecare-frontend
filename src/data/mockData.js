export const clinicInfo = {
  name: 'SmileCare Family Dentistry',
  tagline: 'Caring for Your Family\'s Smiles, Every Generation',
  address: '12, Anna Salai, Near Gemini Flyover, Thousand Lights, Chennai, Tamil Nadu - 600006',
  phone: '+91 98410 12345',
  phone2: '+91 44 4112 3456',
  email: 'hello@smilecaredental.in',
  hours: {
    weekdays: 'Mon – Sat: 9:00 AM – 7:00 PM',
    sunday: 'Sunday: 10:00 AM – 2:00 PM',
  },
  mapEmbed: 'https://maps.google.com/?q=Anna+Salai+Chennai',
  established: 2010,
};

export const services = [
  { id: 1, name: 'Teeth Cleaning', icon: '🦷', description: 'Professional cleaning to remove plaque, tartar and stains for a bright, healthy smile.', duration: 45, price: 800, category: 'Preventive' },
  { id: 2, name: 'Teeth Whitening', icon: '✨', description: 'Advanced laser whitening to lighten your teeth by up to 8 shades in a single session.', duration: 90, price: 4500, category: 'Cosmetic' },
  { id: 3, name: 'Root Canal Treatment', icon: '🔬', description: 'Painless root canal therapy to save your natural tooth and eliminate infection.', duration: 90, price: 6000, category: 'Restorative' },
  { id: 4, name: 'Dental Implants', icon: '🏆', description: 'Permanent titanium implants that look, feel and function just like your natural teeth.', duration: 120, price: 25000, category: 'Restorative' },
  { id: 5, name: 'Braces & Aligners', icon: '😁', description: 'Metal braces and clear aligner options to straighten teeth and correct bite issues.', duration: 60, price: 35000, category: 'Orthodontics' },
  { id: 6, name: 'Tooth Extraction', icon: '🪥', description: 'Safe and comfortable extraction of damaged or wisdom teeth under local anaesthesia.', duration: 45, price: 1200, category: 'Surgical' },
  { id: 7, name: 'Dental Crown', icon: '👑', description: 'Custom ceramic crowns to restore strength, shape and appearance of a damaged tooth.', duration: 60, price: 8000, category: 'Restorative' },
  { id: 8, name: 'Kids Dentistry', icon: '🧒', description: 'Gentle, fun and anxiety-free dental care specially designed for children aged 3–15.', duration: 45, price: 600, category: 'Pediatric' },
];

export const doctors = [
  {
    id: 1,
    name: 'Dr. Priya Sharma',
    designation: 'Chief Dental Surgeon',
    specialization: 'Cosmetic & Implant Dentistry',
    qualification: 'BDS, MDS (Prosthodontics) – Manipal University',
    experience: 14,
    rating: 4.9,
    reviews: 312,
    languages: ['English', 'Hindi', 'Tamil'],
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    image: null,
    initials: 'PS',
    color: '#4f46e5',
  },
  {
    id: 2,
    name: 'Dr. Rahul Mehta',
    designation: 'Senior Orthodontist',
    specialization: 'Braces, Aligners & Jaw Correction',
    qualification: 'BDS, MDS (Orthodontics) – KLE University',
    experience: 10,
    rating: 4.8,
    reviews: 245,
    languages: ['English', 'Hindi', 'Tamil'],
    availableDays: ['Monday', 'Wednesday', 'Friday', 'Saturday'],
    image: null,
    initials: 'RM',
    color: '#0891b2',
  },
  {
    id: 3,
    name: 'Dr. Ananya Krishnan',
    designation: 'Pediatric Dentist',
    specialization: 'Children\'s Dentistry & Preventive Care',
    qualification: 'BDS, MDS (Pedodontics) – Rajiv Gandhi University',
    experience: 8,
    rating: 4.9,
    reviews: 198,
    languages: ['English', 'Tamil', 'Telugu'],
    availableDays: ['Tuesday', 'Thursday', 'Friday', 'Saturday'],
    image: null,
    initials: 'AK',
    color: '#059669',
  },
  {
    id: 4,
    name: 'Dr. Vikram Nair',
    designation: 'Oral & Maxillofacial Surgeon',
    specialization: 'Extractions, Implants & Jaw Surgery',
    qualification: 'BDS, MDS (Oral Surgery) – AIIMS Delhi',
    experience: 12,
    rating: 4.7,
    reviews: 167,
    languages: ['English', 'Hindi', 'Malayalam'],
    availableDays: ['Monday', 'Tuesday', 'Thursday', 'Saturday'],
    image: null,
    initials: 'VN',
    color: '#dc2626',
  },
];

export const testimonials = [
  { id: 1, name: 'Kavitha R.', location: 'T. Nagar', rating: 5, text: 'Best dental clinic in Chennai! Dr. Priya did my veneers and the result is absolutely stunning. Painless procedure and the staff was so warm and welcoming.' },
  { id: 2, name: 'Arjun S.', location: 'Adyar', rating: 5, text: 'Got my braces fitted by Dr. Rahul. He explained every step clearly. The clinic is super clean and modern. Highly recommend to anyone looking for orthodontic treatment.' },
  { id: 3, name: 'Meena T.', location: 'Anna Nagar', rating: 5, text: 'Brought my 7-year-old for a check-up and Dr. Ananya was absolutely amazing with kids. My daughter was actually excited to come back. That says everything!' },
  { id: 4, name: 'Suresh P.', location: 'Velachery', rating: 4, text: 'Needed an emergency root canal on a Sunday and they fit me in. Pain-free experience and very reasonable pricing. Very professional team.' },
];

export const stats = [
  { label: 'Years of Excellence', value: '14+' },
  { label: 'Happy Patients', value: '18,000+' },
  { label: 'Expert Doctors', value: '4' },
  { label: 'Treatments Offered', value: '30+' },
];

export const customers = [
  {
    id: 1,
    name: 'Kavitha Reddy',
    phone: '+91 98410 11001',
    email: 'kavitha.r@gmail.com',
    dob: '1990-04-15',
    gender: 'Female',
    address: '14, Gandhi Nagar, T. Nagar, Chennai - 600017',
    bloodGroup: 'B+',
    allergies: ['Penicillin'],
    medicalHistory: ['Diabetes (controlled)', 'Hypertension'],
    registeredOn: '2022-03-10',
    lastVisit: '2026-09-15',
    totalVisits: 8,
    assignedDoctor: 'Dr. Priya Sharma',
  },
  {
    id: 2,
    name: 'Arjun Suresh',
    phone: '+91 98410 22002',
    email: 'arjun.s@gmail.com',
    dob: '1995-08-22',
    gender: 'Male',
    address: '7, 2nd Cross, Adyar, Chennai - 600020',
    bloodGroup: 'O+',
    allergies: [],
    medicalHistory: [],
    registeredOn: '2023-07-05',
    lastVisit: '2026-09-28',
    totalVisits: 5,
    assignedDoctor: 'Dr. Rahul Mehta',
  },
  {
    id: 3,
    name: 'Meena Thyagarajan',
    phone: '+91 98410 33003',
    email: 'meena.t@gmail.com',
    dob: '1985-12-01',
    gender: 'Female',
    address: '22, Nehru Street, Anna Nagar, Chennai - 600040',
    bloodGroup: 'A+',
    allergies: ['Latex'],
    medicalHistory: ['Asthma'],
    registeredOn: '2021-11-20',
    lastVisit: '2026-10-01',
    totalVisits: 14,
    assignedDoctor: 'Dr. Ananya Krishnan',
  },
  {
    id: 4,
    name: 'Suresh Pillai',
    phone: '+91 98410 44004',
    email: 'suresh.p@gmail.com',
    dob: '1978-06-18',
    gender: 'Male',
    address: '5, Velachery Main Road, Velachery, Chennai - 600042',
    bloodGroup: 'AB+',
    allergies: [],
    medicalHistory: ['Hypertension'],
    registeredOn: '2020-01-15',
    lastVisit: '2026-08-20',
    totalVisits: 22,
    assignedDoctor: 'Dr. Vikram Nair',
  },
  {
    id: 5,
    name: 'Divya Krishnamurthy',
    phone: '+91 98410 55005',
    email: 'divya.k@gmail.com',
    dob: '2000-02-28',
    gender: 'Female',
    address: '9, Besant Nagar 3rd Ave, Chennai - 600090',
    bloodGroup: 'O-',
    allergies: [],
    medicalHistory: [],
    registeredOn: '2024-05-12',
    lastVisit: '2026-09-10',
    totalVisits: 3,
    assignedDoctor: 'Dr. Priya Sharma',
  },
  {
    id: 6,
    name: 'Rajesh Kumar',
    phone: '+91 98410 66006',
    email: 'rajesh.k@gmail.com',
    dob: '1972-09-09',
    gender: 'Male',
    address: '31, Mylapore, Chennai - 600004',
    bloodGroup: 'B-',
    allergies: ['Aspirin'],
    medicalHistory: ['Type 2 Diabetes', 'Heart condition (stable)'],
    registeredOn: '2019-08-30',
    lastVisit: '2026-07-15',
    totalVisits: 31,
    assignedDoctor: 'Dr. Vikram Nair',
  },
];

export const treatmentHistory = {
  1: [
    { id: 1, date: '2026-09-15', service: 'Teeth Cleaning', doctor: 'Dr. Priya Sharma', status: 'completed', notes: 'Mild tartar buildup. Advised to floss daily.', cost: 800 },
    { id: 2, date: '2026-06-10', service: 'Teeth Whitening', doctor: 'Dr. Priya Sharma', status: 'completed', notes: 'Achieved 6 shades lighter. Patient very satisfied.', cost: 4500 },
    { id: 3, date: '2025-12-20', service: 'Dental Crown', doctor: 'Dr. Priya Sharma', status: 'completed', notes: 'Ceramic crown placed on upper left molar (#26).', cost: 8000 },
    { id: 4, date: '2025-07-05', service: 'Teeth Cleaning', doctor: 'Dr. Priya Sharma', status: 'completed', notes: 'Routine cleaning. No issues.', cost: 800 },
    { id: 5, date: '2026-10-15', service: 'Teeth Cleaning', doctor: 'Dr. Priya Sharma', status: 'confirmed', notes: 'Upcoming appointment', cost: 800 },
  ],
  2: [
    { id: 6, date: '2026-09-28', service: 'Braces & Aligners', doctor: 'Dr. Rahul Mehta', status: 'completed', notes: 'Monthly aligner check. Progress on track.', cost: 0 },
    { id: 7, date: '2026-08-28', service: 'Braces & Aligners', doctor: 'Dr. Rahul Mehta', status: 'completed', notes: 'Aligner tray #8 fitted. Minor crowding correcting well.', cost: 0 },
    { id: 8, date: '2023-07-10', service: 'Braces & Aligners', doctor: 'Dr. Rahul Mehta', status: 'completed', notes: 'Initial consultation. Clear aligner treatment plan started. ₹35,000 for full course.', cost: 35000 },
  ],
  3: [
    { id: 9, date: '2026-10-01', service: 'Kids Dentistry', doctor: 'Dr. Ananya Krishnan', status: 'completed', notes: 'Child (7 yrs). Routine check. 1 milk tooth loose — advised natural shedding.', cost: 600 },
    { id: 10, date: '2026-07-15', service: 'Teeth Cleaning', doctor: 'Dr. Ananya Krishnan', status: 'completed', notes: 'Scaling done. Gums healthy.', cost: 800 },
    { id: 11, date: '2025-11-20', service: 'Root Canal Treatment', doctor: 'Dr. Vikram Nair', status: 'completed', notes: 'RCT on lower right molar (#46). 2 sittings. Post & core placed.', cost: 6000 },
    { id: 12, date: '2025-03-10', service: 'Dental Crown', doctor: 'Dr. Vikram Nair', status: 'completed', notes: 'PFM crown on #46 post RCT.', cost: 7500 },
  ],
  4: [
    { id: 13, date: '2026-08-20', service: 'Dental Implants', doctor: 'Dr. Vikram Nair', status: 'completed', notes: '3-month implant review. Osseointegration successful.', cost: 0 },
    { id: 14, date: '2026-05-15', service: 'Dental Implants', doctor: 'Dr. Vikram Nair', status: 'completed', notes: 'Implant crown placed on #36. Patient satisfied.', cost: 25000 },
    { id: 15, date: '2026-02-01', service: 'Tooth Extraction', doctor: 'Dr. Vikram Nair', status: 'completed', notes: 'Surgical extraction of #36 (severely decayed). Implant planned.', cost: 2500 },
    { id: 16, date: '2025-09-10', service: 'Teeth Cleaning', doctor: 'Dr. Priya Sharma', status: 'completed', notes: 'Deep scaling. Moderate periodontal disease — advised 3-month recall.', cost: 1200 },
  ],
  5: [
    { id: 17, date: '2026-09-10', service: 'Teeth Cleaning', doctor: 'Dr. Priya Sharma', status: 'completed', notes: 'First cleaning. Good oral hygiene.', cost: 800 },
    { id: 18, date: '2026-07-01', service: 'Teeth Whitening', doctor: 'Dr. Priya Sharma', status: 'completed', notes: '8 shades lighter achieved. Very happy with results.', cost: 4500 },
    { id: 19, date: '2024-05-15', service: 'Teeth Cleaning', doctor: 'Dr. Priya Sharma', status: 'completed', notes: 'Initial visit. No major issues.', cost: 800 },
  ],
  6: [
    { id: 20, date: '2026-07-15', service: 'Dental Implants', doctor: 'Dr. Vikram Nair', status: 'completed', notes: '6-month implant review. Stable. Patient reminded about diabetic control.', cost: 0 },
    { id: 21, date: '2026-01-10', service: 'Root Canal Treatment', doctor: 'Dr. Vikram Nair', status: 'completed', notes: 'RCT on #16. Extra caution due to cardiac history — LA without adrenaline used.', cost: 6000 },
    { id: 22, date: '2025-06-20', service: 'Teeth Cleaning', doctor: 'Dr. Priya Sharma', status: 'completed', notes: 'Quadrant scaling. Diabetic patient — healing monitored.', cost: 1200 },
  ],
};

export const generateTimeSlots = () => {
  const slots = [];
  const bookedSlots = ['9:45 AM', '11:15 AM', '2:45 PM', '4:15 PM'];
  let hour = 9, minute = 0;
  while (hour < 18) {
    if (!(hour === 13 || (hour === 12 && minute === 45))) {
      const h = hour > 12 ? hour - 12 : hour;
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const label = `${h}:${minute === 0 ? '00' : minute} ${ampm}`;
      slots.push({ time: label, booked: bookedSlots.includes(label) });
    }
    minute += 45;
    if (minute >= 60) { hour += 1; minute -= 60; }
  }
  return slots;
};
