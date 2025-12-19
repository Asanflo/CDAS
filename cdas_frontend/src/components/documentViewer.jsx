import { useState } from "react";

const DocumentViewer = ({ documents }) => {
  const [currentDoc, setCurrentDoc] = useState(null);
  const [validation, setValidation] = useState({});

  const toggleValidation = (docId) => {
    setValidation(prev => ({
      ...prev,
      [docId]: !prev[docId]
    }));
  };

  return (
    <div className="grid grid-cols-2 gap-4">

      {/* Liste documents */}
      <div className="bg-white p-4 rounded shadow space-y-2">
        <h4 className="font-semibold">Documents</h4>

        {documents.map(doc => (
          <div key={doc.id} className="flex items-center justify-between">
            <button
              onClick={() => setCurrentDoc(doc)}
              className="text-indigo-600 underline"
            >
              {doc.nom}
            </button>

            <input
              type="checkbox"
              checked={validation[doc.id] || false}
              onChange={() => toggleValidation(doc.id)}
            />
          </div>
        ))}
      </div>

      {/* Aperçu document */}
      <div className="bg-white p-2 rounded shadow">
        {currentDoc ? (
          <iframe
            src={currentDoc.url}
            title="document"
            className="w-full h-[400px] border"
          />
        ) : (
          <p className="text-gray-500">Sélectionnez un document</p>
        )}
      </div>

    </div>
  );
};

export default DocumentViewer;
