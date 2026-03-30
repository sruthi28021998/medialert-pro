import React, { useState, useEffect } from 'react';
import { getSavedMedicines, saveMedicines } from './Data';
import { styles } from './Styles';

const MediAlert = () => {
  const [medicines, setMedicines] = useState(getSavedMedicines());
  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [dosage, setDosage] = useState('');

  // 1. Get current time in HH:mm format to compare with medicine time
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
  );

  // Update clock every minute so the "Overdue" status is live
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }));
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Progress Logic
  const completedCount = medicines.filter(m => m.taken).length;
  const totalCount = medicines.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  useEffect(() => {
    saveMedicines(medicines);
  }, [medicines]);

  const addMedicine = (e) => {
    e.preventDefault();
    if (!name.trim() || !time) {
      alert("Please enter both Name and Time! ⚠️");
      return;
    }
    const newMed = { 
      id: Date.now(), 
      name, 
      time, 
      dosage: dosage.trim() !== "" ? dosage : "As directed", 
      taken: false 
    };
    setMedicines([...medicines, newMed]);
    setName(''); setTime(''); setDosage('');
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

      {/* Progress Bar */}
      <div style={{ marginBottom: '25px' }}>
        <div style={{ background: '#eee', borderRadius: '10px', height: '12px', overflow: 'hidden' }}>
          <div style={{ width: `${progress}%`, background: '#4caf50', height: '100%', transition: 'width 0.5s ease' }}></div>
        </div>
        <p style={{ textAlign: 'right', fontSize: '12px', marginTop: '5px', color: '#666' }}>
          {Math.round(progress)}% of daily doses completed
        </p>
      </div>

      {/* Form */}
      <form onSubmit={addMedicine} style={styles.form}>
        <input style={styles.input} placeholder="Medicine Name" value={name} onChange={(e) => setName(e.target.value)} />
        <div style={styles.row}>
          <input type="time" style={styles.inputSmall} value={time} onChange={(e) => setTime(e.target.value)} />
          <input style={styles.inputSmall} placeholder="Dosage" value={dosage} onChange={(e) => setDosage(e.target.value)} />
        </div>
        <button type="submit" style={styles.addButton}>Add Reminder</button>
      </form>

      {/* List with Smart Logic */}
      <div style={styles.list}>
        {medicines.map(med => {
          // Check if time is past and dose is not taken
          const isOverdue = !med.taken && currentTime > med.time;

          return (
            <div key={med.id} style={med.taken ? styles.cardTaken : styles.card}>
              <div>
                <h3 style={styles.medName}>{med.name}</h3>
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


