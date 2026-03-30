import React, { useState, useEffect } from 'react';
import { getSavedMedicines, saveMedicines } from './Data';
import { styles } from './Styles';

const MediAlert = () => {
  const [medicines, setMedicines] = useState(getSavedMedicines());
  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [dosage, setDosage] = useState('');
  
  // 1. Motivational Quotes Logic
  const healthQuotes = [
    "💊 Consistency is the key to recovery!",
    "💧 Stay hydrated with your meds.",
    "☀️ A healthy outside starts from the inside.",
    "✅ Small steps lead to big health goals."
  ];
  const [quoteIndex, setQuoteIndex] = useState(0);

  // 2. Real-time Clock for Overdue Logic
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
  );

  // Combined Timer for Clock (every minute) and Quotes (every 5 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      // Update Clock for Overdue check
      setCurrentTime(new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }));
      // Cycle Quotes for UI dynamic feel
      setQuoteIndex((prev) => (prev + 1) % healthQuotes.length);
    }, 5000); 
    return () => clearInterval(timer);
  }, [healthQuotes.length]);

  // Progress Calculation
  const completedCount = medicines.filter(m => m.taken).length;
  const totalCount = medicines.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  // Auto-save to LocalStorage whenever medicines change
  useEffect(() => {
    saveMedicines(medicines);
  }, [medicines]);

  // SMART VALIDATION: Separate alerts for Name and Time
  const addMedicine = (e) => {
    e.preventDefault();

    // Step 1: Check Name
    if (!name.trim()) {
      alert("Please enter the Medicine Name! 💊");
      return;
    }

    // Step 2: Check Time
    if (!time) {
      alert("Please select a Time for the reminder! ⏰");
      return;
    }

    // Step 3: Success - Add the medicine
    const newMed = { 
      id: Date.now(), 
      name: name.trim(), 
      time, 
      dosage: dosage.trim() !== "" ? dosage : "As directed", 
      taken: false 
    };

    setMedicines([...medicines, newMed]);
    
    // Clear inputs
    setName(''); 
    setTime(''); 
    setDosage('');
  };

  const toggleTaken = (id) => {
    setMedicines(medicines.map(med => 
      med.id === id ? { ...med, taken: !med.taken } : med
    ));
  };

  const deleteMed = (id) => {
    if(window.confirm("Delete this reminder?")) {
      setMedicines(medicines.filter(med => med.id !== id));
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>💊 MediAlert Pro</h1>
        <p style={styles.subtitle}>Smart Health Tracker</p>
      </header>

      {/* Dynamic Health Quotes */}
      <div style={{ minHeight: '30px', textAlign: 'center', marginBottom: '10px' }}>
        <p style={{ fontStyle: 'italic', color: '#007bff', fontWeight: 'bold', fontSize: '14px' }}>
          {healthQuotes[quoteIndex]}
        </p>
      </div>

      {/* Progress Bar */}
      <div style={{ marginBottom: '25px' }}>
        <div style={{ background: '#eee', borderRadius: '10px', height: '10px', overflow: 'hidden' }}>
          <div style={{ 
            width: `${progress}%`, 
            background: '#4caf50', 
            height: '100%', 
            transition: 'width 0.5s ease-in-out' 
          }}></div>
        </div>
        <p style={{ textAlign: 'right', fontSize: '11px', marginTop: '5px', color: '#666' }}>
          {Math.round(progress)}% Daily Goal Met
        </p>
      </div>

      {/* Form with Refined Validation */}
      <form onSubmit={addMedicine} style={styles.form}>
        <input 
          style={styles.input} 
          placeholder="Medicine Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        <div style={styles.row}>
          <input 
            type="time" 
            style={styles.inputSmall} 
            value={time} 
            onChange={(e) => setTime(e.target.value)} 
          />
          <input 
            style={styles.inputSmall} 
            placeholder="Dosage (Optional)" 
            value={dosage} 
            onChange={(e) => setDosage(e.target.value)} 
          />
        </div>
        <button type="submit" style={styles.addButton}>Add Reminder</button>
      </form>

      {/* List with Smart Overdue Logic */}
      <div style={styles.list}>
        {medicines.map(med => {
          // Check if time has passed and dose is not yet marked as taken
          const isOverdue = !med.taken && currentTime > med.time;
          
          return (
            <div key={med.id} style={med.taken ? styles.cardTaken : styles.card}>
              <div>
                <h3 style={styles.medName}>💊 {med.name}</h3>
                <p style={{ 
                  fontSize: '13px', 
                  color: isOverdue ? '#d32f2f' : '#666', 
                  fontWeight: isOverdue ? 'bold' : 'normal' 
                }}>
                  ⏰ {med.time} {isOverdue ? "(Overdue! ⚠️)" : ""}
                </p>
                <p style={styles.medDetails}>📝 {med.dosage}</p>
              </div>
              <div style={styles.actions}>
                <button onClick={() => toggleTaken(med.id)} style={styles.doneBtn}>
                  {med.taken ? '✅' : '🔔'}
                </button>
                <button onClick={() => deleteMed(med.id)} style={styles.deleteBtn}>🗑️</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MediAlert;

