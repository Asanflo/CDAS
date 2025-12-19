import { useContext } from "react";
import { StepperContext } from "../../context/stepperContext";

import { Upload, Trash2, FileText } from "lucide-react";

const UploadStep = () => {
    const { userData, setUserData } = useContext(StepperContext);
    const documents = userData.documents || [];

    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);

        setUserData({
            ...userData,
            documents: [...documents, ...files]
        });
    };


    const removeDocument = (index) => {
        setUserData({
            ...userData,
            documents: documents.filter((_, i) => i !== index)
        });
    };


    return (
        <div className="flex flx-col gap-6 animate-fadIn">
            {/* Zone upload */}
            <label className="
                flex flex-col items-center justify-center
                border-2 border-dashed border-indigo-300
                rounded-xl p-8 cursor-pointer
                hover:bg-indigo-50 transition
            ">
                <Upload size={32} className="text-indigo-500 mb-2" />
                <p className="font-medium text-gray-700">
                    Cliquez pour ajouter des documents
                </p>
                <p className="text-sm text-gray-500">
                    PDF, TXT
                </p>

                <input
                    type="file"
                    multiple
                    accept=".pdf,.txt, .doc, .docx"
                    onChange={handleFileUpload}
                    className="hidden"
                />
            </label>

            {/* Liste des documents */}
            {documents.length > 0 && (
                <div className="flex flex-col gap-3">

                    <p className="text-sm font-semibold text-gray-700">
                        Documents ajoutés ({documents.length})
                    </p>

                    <ul className="space-y-2">
                        {documents.map((file, index) => (
                            <li
                                key={index}
                                className="flex items-center justify-between bg-gray-50 p-3 rounded-lg shadow-sm"
                            >
                                <div className="flex items-center gap-3">
                                <FileText className="text-indigo-500" />
                                <div>
                                    <p className="text-sm font-medium">{file.name}</p>
                                    <p className="text-xs text-gray-500">
                                    {(file.size / 1024).toFixed(1)} KB
                                    </p>
                                </div>
                                </div>

                                <button
                                onClick={() => removeDocument(index)}
                                className="text-red-500 hover:text-red-700"
                                >
                                <Trash2 size={18} />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default UploadStep;