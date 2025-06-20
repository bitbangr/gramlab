import React from 'react';  // ✅ Required for JSX

import { useState } from 'react';

export default function App() {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);

  const analyze = async () => {
    const res = await fetch('http://localhost:8000/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    const data = await res.json();
    setResult(data);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Gramlab: Grammar Analyzer</h1>
      <textarea
        rows="4"
        className="w-full border p-2"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste text here..."
      />
      <button className="mt-2 bg-blue-500 text-white px-4 py-2" onClick={analyze}>
        Analyze
      </button>

      {result && (
        <div className="mt-4">
          <p><strong>Passive Voice:</strong> {result.passive_voice ? 'Yes' : 'No'}</p>
          <table className="mt-2 w-full border">
            <thead>
              <tr><th>Token</th><th>POS</th><th>Dependency</th><th>Head</th></tr>
            </thead>
            <tbody>
              {result.tokens.map((tok, idx) => (
                <tr key={idx}>
                  <td>{tok.text}</td>
                  <td>{tok.pos}</td>
                  <td>{tok.dep}</td>
                  <td>{tok.head}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
