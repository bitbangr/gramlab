import React, { useState } from 'react';

export default function App() {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const analyze = async () => {
    const res = await fetch('http://localhost:8000/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
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

      <div className="mt-2 flex items-center gap-4">
        <button className="bg-blue-500 text-white px-4 py-2" onClick={analyze}>
          Analyze
        </button>
        <button
          className="text-sm text-blue-700 underline"
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          {showAdvanced ? 'Hide advanced view' : 'Show advanced view'}
        </button>
      </div>

      {result && (
        <div className="mt-4">
          <p>
            <strong>Passive Voice:</strong> {result.passive_voice ? 'Yes' : 'No'}
          </p>

          <table className="mt-2 w-full border border-collapse">
            <thead>
              <tr>
                <th title="The actual word or punctuation">Token</th>
                <th title="Part of Speech (e.g. NOUN, VERB)">POS</th>
                <th title="Syntactic role in sentence (e.g. subject)">Dependency</th>
                <th title="The head (parent) word in the dependency tree">Head</th>
                {showAdvanced && (
                  <>
                    <th title="Dictionary base form">Lemma</th>
                    <th title="Detailed POS tag (Penn Treebank)">Tag</th>
                    <th title="Grammatical features (tense, number, etc.)">Morph</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {result.tokens.map((tok, idx) => (
                <tr key={idx}>
                  <td>{tok.text}</td>
                  <td>{tok.pos}</td>
                  <td>{tok.dep}</td>
                  <td>{tok.head}</td>
                  {showAdvanced && (
                    <>
                      <td>{tok.lemma}</td>
                      <td>{tok.tag}</td>
                      <td>{tok.morph}</td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
