import React, {useState} from "react";
import NavBar from "../components/navbar";
import FormProcedure from "../components/form_proc";

import { Plus } from "lucide-react";

export default function Home () {
    const [openModal, setOpenModal] = useState(false);

    return (
        <div className="min-h-screen bg-indigo-50 ">

            <NavBar/>
            <div className="p-8 flex justify-between items-start gap-6 ">

                {/* tableau des procedures */}
                <div className="p-4 rounded-xl shadow w-3/4 bg-gray-100 ">
                    <h2 className="text-2xl font-bold mb-2">
                        Liste de vos procédures
                    </h2>
                    <div className="overflow-x-auto  shadow-md border border-gray-200">
                        <table className="w-full border-collapse  text-center">
                            <thead>
                                <tr className="bg-indigo-600 text-white uppercase tracking-wide">
                                    <td>N°</td>
                                    <td>Type de procédure</td>
                                    <td>Concerné(e)</td>
                                    <td>Motif</td>
                                    <td>Statut</td>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                <tr className="hover:bg-amber-100 transition">
                                    <td className="px-4 py-3">1</td>
                                    <td className="px-4 py-3">Authentification</td>
                                    <td className="px-4 py-3">Mamba  ozone</td>
                                    <td className="px-4 py-3">proc voyage</td>
                                    <td className="px-4 py-3">
                                        <span className="px-3 py-2 text-sm font-semibold rounded-full bg-green-100 text-green-700">
                                            En cours
                                        </span>
                                    </td>
                                </tr>
                                <tr className="hover:bg-amber-100 transition">
                                    <td className="px-4 py-3">2</td>
                                    <td className="px-4 py-3">Certification</td>
                                    <td className="px-4 py-3">Mamoud van</td>
                                    <td className="px-4 py-3">proc voyage</td>
                                    <td className="px-4 py-3">
                                        <span className="px-3 py-2 text-sm font-semibold rounded-full bg-red-100 text-red-700">
                                            Annulé
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Bouton de procedure */}
                <div className="flex justify-end w-1/4">
                    <button
                        onClick={() => setOpenModal(true)}
                        className="bg-indigo-700 flex items-center gap-2 text-white px-4 py-2 mt-6 font-bold rounded-xl hover:bg-amber-500 transition">
                            <Plus size={20}/> Nouvelle procédure
                    </button>
                </div>
            </div>

            {/* Modal du formulaire de la procedure */}
            {openModal && (
                <FormProcedure closeModal = {() => setOpenModal(false)}/>
            )}
        </div>
    );
}