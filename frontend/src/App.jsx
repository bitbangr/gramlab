import React, { useState } from 'react';

const posMap = {
  ADJ: 'Adjective',
  ADP: 'Adposition',
  ADV: 'Adverb',
  AUX: 'Auxiliary Verb',
  CCONJ: 'Coordinating Conjunction',
  DET: 'Determiner',
  INTJ: 'Interjection',
  NOUN: 'Noun',
  NUM: 'Numeral',
  PART: 'Particle',
  PRON: 'Pronoun',
  PROPN: 'Proper Noun',
  PUNCT: 'Punctuation',
  SCONJ: 'Subordinating Conjunction',
  SYM: 'Symbol',
  VERB: 'Verb',
  X: 'Other',
};


const depMap = {
  acomp: 'Adjectival Complement',
  advcl: 'Adverbial Clause Modifier',
  advmod: 'Adverbial Modifier',
  agent: 'Agent in Passive Voice',
  amod: 'Adjectival Modifier',
  appos: 'Appositional Modifier',
  attr: 'Attribute',
  aux: 'Auxiliary',
  auxpass: 'Passive Auxiliary',
  cc: 'Coordinating Conjunction',
  ccomp: 'Clausal Complement',
  conj: 'Conjunct',
  cop: 'Copula',
  csubj: 'Clausal Subject',
  csubjpass: 'Clausal Subject (Passive)',
  dep: 'Unspecified Dependency',
  det: 'Determiner',
  dobj: 'Direct Object',
  expl: 'Expletive',
  intj: 'Interjection',
  mark: 'Marker',
  neg: 'Negation Modifier',
  nmod: 'Nominal Modifier',
  npadvmod: 'Noun Phrase Adverbial Modifier',
  nsubj: 'Nominal Subject',
  nsubjpass: 'Passive Nominal Subject',
  nummod: 'Numeric Modifier',
  obj: 'Object',
  oprd: 'Object Predicate',
  parataxis: 'Parataxis',
  pobj: 'Prepositional Object',
  poss: 'Possession Modifier',
  prep: 'Prepositional Modifier',
  prt: 'Particle',
  punct: 'Punctuation',
  relcl: 'Relative Clause Modifier',
  ROOT: 'Root',
  xcomp: 'Open Clausal Complement',
};

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

          <div className="mt-4">
            <h2 className="font-semibold mb-1">Results Overlay:</h2>
            <div className="flex flex-wrap gap-1 text-lg">
              {result.tokens.map((tok, idx) => (
                <span
                  key={idx}
                  // className="relative group cursor-help"
                  className="relative group cursor-pointer hover:bg-blue-100 px-1 rounded"
                  // className="relative group cursor-text"
                  title={`${posMap[tok.pos] || tok.pos}, ${depMap[tok.dep] || tok.dep}`}
                >
                  {tok.text}
                </span>
              ))}
            </div>
          </div>
<p></p>

          {/* <table className="mt-2 w-full border border-collapse"> */}
          <table className="mt-2 table-auto border border-collapse">
            <thead>
              <tr>
                <th  className="w-[180px] text-left" title="The actual word or punctuation">Token</th>
                {/* <th className="w-[80px] text-left">Token</th> */}
                {/* <th  className="text-left" title="Part of Speech (e.g. NOUN, VERB)">POS</th> */}
                <th  className="w-[180px] text-left" title="Part of Speech (e.g. NOUN, VERB)">POS</th>
                {/* <th className="w-[120px] text-left">POS</th> */}
                <th  className="w-[200px] text-left" title="Syntactic role in sentence (e.g. subject)">Dependency</th>
                <th  className="w-[180px] text-left" title="The head (parent) word in the dependency tree">Head</th>
                {showAdvanced && (
                  <>
                    <th className="w-[180px] text-left" title="Dictionary base form">Lemma</th>
                    <th className="w-[180px] text-left" title="Detailed POS tag (Penn Treebank)">Tag</th>
                    <th className="w-[180px] text-left" title="Grammatical features (tense, number, etc.)">Morph</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {result.tokens.map((tok, idx) => (
                <tr key={idx}>
                  <td>{tok.text}</td>
                  {/* <td>{tok.pos}</td> */}
                  <td>{posMap[tok.pos] || tok.pos}</td>
                  {/* <td>{tok.dep}</td> */}
                  <td>{depMap[tok.dep] || tok.dep}</td>
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
