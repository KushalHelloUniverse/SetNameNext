import { useState, useEffect } from 'react';

const Home = () => {
  const [name, setName] = useState('');
  const [savedName, setSavedName] = useState<string | null>(null);

  // Fetch the saved name on component load
  useEffect(() => {
    async function fetchName() {
      const response = await fetch('/api/name');
      const data = await response.json();
      if (data?.name) setSavedName(data.name);
    }
    fetchName();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Save the name to the database
    const response = await fetch('/api/name', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });

    if (response.ok) {
      const data = await response.json();
      setSavedName(data.name);
      setName(''); // Clear the input field
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h1>Enter Your Name</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          style={{ padding: '10px', width: '100%', marginBottom: '10px' }}
        />
        <button type="submit" style={{ padding: '10px', width: '100%' }}>
          Save
        </button>
      </form>
      {savedName && <h2>Hi, {savedName}!</h2>}
    </div>
  );
};

export default Home;
