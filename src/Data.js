const defaultMeds = [
  { id: 1, name: "Multivitamin", time: "08:00", dosage: "1 Tablet", taken: false },
  { id: 2, name: "Omega-3 Fish Oil", time: "13:00", dosage: "1 Capsule", taken: false },
  { id: 3, name: "Calcium + D3", time: "20:00", dosage: "1 Tablet", taken: false }
];

export const getSavedMedicines = () => {
 
  const saved = localStorage.getItem('mediAlert_data'); 
  return saved ? JSON.parse(saved) : defaultMeds;
};

export const saveMedicines = (medicines) => {
 
  localStorage.setItem('mediAlert_data', JSON.stringify(medicines));
};

