import React from "react";
import { Link as RouterLink } from "react-router-dom";

// Card component pour la cohérence de l'UI
const Card = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-lg ${className}`}
  >
    {children}
  </div>
);

// Composant Link personnalisé pour éviter les erreurs de type
const Link = ({
  to,
  className,
  children,
}: {
  to: string;
  className?: string;
  children: React.ReactNode;
}) => (
  <a href={to} className={className}>
    {children}
  </a>
);

const HomePage = () => {
  return (
    <div
      className="w-full min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: "url('netcom.png')",
        backgroundBlendMode: "overlay",
      }}
    >
      <div className="w-full max-w-6xl mx-auto space-y-10 py-12 px-4 sm:px-6 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white">
            Bienvenue sur{" "}
            <span className="text-orange-500 bg-orange-100 dark:bg-orange-900/30 px-3 py-1 rounded-lg">
              NETCOM
            </span>
          </h1>
        </div>

        {/* Section À propos de NETCOM avec logo stylisé */}
        <Card className="text-center py-14 border-l-4 border-l-orange-500 transform transition-all hover:-translate-y-2 bg-white/95 dark:bg-gray-800/95 backdrop-blur">
          <div className="relative h-36 w-36 mx-auto mb-8">
            {/* Logo stylisé de NETCOM */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full shadow-xl"></div>
            <div className="absolute inset-2 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center">
              <span className="text-orange-500 font-bold text-5xl">N</span>
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full border-4 border-orange-300 dark:border-orange-700 rounded-full animate-pulse opacity-50"></div>
          </div>
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-6">
            À propos de NETCOM
          </h2>
          <div className="w-28 h-1 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto mb-10 rounded-full"></div>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed text-lg">
            NETCOM est une plateforme web intelligente spécialisée dans les
            solutions technologiques innovantes. Notre mission est de simplifier
            l'accès à l'information et d'optimiser la gestion des connaissances
            grâce à des outils intelligents basés sur l'IA, même sans connexion
            Internet. Nous mettons à votre disposition des solutions
            performantes pour transformer vos données en insights actionnables.
          </p>
          <div className="flex justify-center">
            <button
              onClick={() => (window.location.href = "/about")}
              className="inline-flex items-center bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium px-8 py-4 rounded-lg transition-all shadow-lg hover:shadow-orange-500/20"
            >
              En savoir plus
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </button>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <Card className="border-l-4 border-l-orange-500 hover:border-l-orange-600 transition-all bg-white/95 dark:bg-gray-800/95 backdrop-blur hover:translate-y-[-8px]">
            <h2 className="text-2xl font-semibold mb-5 text-gray-800 dark:text-white flex items-center">
              <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mr-4">
                <span className="text-orange-500 text-sm font-bold">1</span>
              </div>
              Gestion de Documents
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 pl-14 leading-relaxed">
              Importez et gérez facilement vos documents (PDF, Word, PowerPoint)
              pour les rendre accessibles via notre système de chat intelligent,
              même sans connexion Internet.
            </p>
            <Link
              to="/documents"
              className="inline-flex items-center text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300 font-medium bg-orange-50 dark:bg-orange-900/20 px-5 py-3 rounded-lg transition-all hover:bg-orange-100 dark:hover:bg-orange-900/30"
            >
              Gérer vos documents
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </Link>
          </Card>
          <Card className="border-l-4 border-l-orange-500 hover:border-l-orange-600 transition-all bg-white/95 dark:bg-gray-800/95 backdrop-blur hover:translate-y-[-8px]">
            <h2 className="text-2xl font-semibold mb-5 text-gray-800 dark:text-white flex items-center">
              <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mr-4">
                <span className="text-orange-500 text-sm font-bold">2</span>
              </div>
              Chat Intelligent Local
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 pl-14 leading-relaxed">
              Interagissez avec vos documents grâce à notre chatbot local qui
              fonctionne même sans connexion Internet.
            </p>
            <Link
              to="/chat"
              className="inline-flex items-center text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300 font-medium bg-orange-50 dark:bg-orange-900/20 px-5 py-3 rounded-lg transition-all hover:bg-orange-100 dark:hover:bg-orange-900/30"
            >
              Démarrer une conversation
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </Link>
          </Card>
        </div>

        {/* Section Fonctionnalités */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold mb-12 text-gray-800 dark:text-white text-center">
            Fonctionnalités Principales
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all bg-white/95 dark:bg-gray-800/95 backdrop-blur hover:translate-y-[-8px]">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center mb-6 shadow-lg transform rotate-3 hover:rotate-0 transition-all">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                  Chatbot Local
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Notre chatbot fonctionne même sans Internet et analyse
                  automatiquement vos documents pour répondre à vos questions.
                </p>
              </div>
            </Card>
            <Card className="hover:bg-green-50 dark:hover:bg-green-900/10 transition-all bg-white/95 dark:bg-gray-800/95 backdrop-blur hover:translate-y-[-8px]">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mb-6 shadow-lg transform rotate-3 hover:rotate-0 transition-all">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                  Tableau de Bord Power BI
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Visualisez les données sur les pannes, performances du réseau
                  et interventions techniques via notre dashboard interactif.
                </p>
              </div>
            </Card>
            <Card className="hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-all bg-white/95 dark:bg-gray-800/95 backdrop-blur hover:translate-y-[-8px]">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center mb-6 shadow-lg transform rotate-3 hover:rotate-0 transition-all">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                  Modèle de Prédiction
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Anticipez les situations futures grâce à notre modèle de
                  prédiction avancé basé sur l'intelligence artificielle.
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* Section Comment ça marche */}
        <div className="mt-20 bg-gradient-to-r from-gray-50/95 to-gray-100/95 dark:from-gray-800/95 dark:to-gray-900/95 rounded-3xl p-10 backdrop-blur shadow-xl">
          <h2 className="text-3xl font-bold mb-10 text-gray-800 dark:text-white text-center">
            Comment ça marche
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md hover:shadow-xl transition-all">
              <div className="w-14 h-14 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 flex items-center justify-center mb-6 shadow-lg">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Importez vos documents
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Téléchargez vos fichiers PDF, Word, ou PowerPoint.
              </p>
            </div>
            <div className="flex flex-col items-center text-center bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md hover:shadow-xl transition-all">
              <div className="w-14 h-14 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 flex items-center justify-center mb-6 shadow-lg">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Traitement automatique
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Notre système analyse et indexe le contenu localement.
              </p>
            </div>
            <div className="flex flex-col items-center text-center bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md hover:shadow-xl transition-all">
              <div className="w-14 h-14 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 flex items-center justify-center mb-6 shadow-lg">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Posez vos questions
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Interagissez via notre interface de chat, même hors ligne.
              </p>
            </div>
            <div className="flex flex-col items-center text-center bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md hover:shadow-xl transition-all">
              <div className="w-14 h-14 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 flex items-center justify-center mb-6 shadow-lg">
                <span className="text-white font-bold text-xl">4</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Obtenez des réponses
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Recevez des informations précises basées sur vos documents.
              </p>
            </div>
          </div>
        </div>

        {/* Section Dashboard Analytique */}
        <Card className="mt-20 border-t-4 border-t-orange-500 overflow-hidden bg-white/95 dark:bg-gray-800/95 backdrop-blur hover:shadow-2xl transition-all">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
              <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
                Dashboard Power BI
              </h2>
              <p className="text-gray-700 dark:text-gray-200 mb-8 leading-relaxed bg-orange-50 dark:bg-orange-900/20 p-5 rounded-lg border-l-4 border-orange-500 shadow-md">
                <span className="font-semibold">Notre dashboard :</span> Une
                interface élégante et intuitive qui transforme vos données
                complexes en visualisations claires et exploitables. Prenez des
                décisions stratégiques basées sur des analyses en temps réel et
                anticipez les tendances futures.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 p-5 rounded-lg shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 flex items-center justify-center mr-4 shadow-md">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                        <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                      </svg>
                    </div>
                    <h3 className="font-semibold text-gray-800 dark:text-white">
                      Analyses visuelles
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 pl-14">
                    Graphiques interactifs et tableaux dynamiques
                  </p>
                </div>
                <div className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 p-5 rounded-lg shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 flex items-center justify-center mr-4 shadow-md">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <h3 className="font-semibold text-gray-800 dark:text-white">
                      Temps réel
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 pl-14">
                    Suivi des performances en direct
                  </p>
                </div>
              </div>
              <ul className="space-y-5 mb-8">
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mr-4 shadow-sm">
                    <svg
                      className="w-5 h-5 text-orange-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  Suivi des pannes en temps réel
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mr-4 shadow-sm">
                    <svg
                      className="w-5 h-5 text-orange-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  Historique des interventions techniques
                </li>
              </ul>
              <Link
                to="/dashboard"
                className="inline-flex items-center bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium px-6 py-4 rounded-lg transition-all shadow-lg hover:shadow-orange-500/20"
              >
                Explorer le dashboard
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              </Link>
            </div>
            <div className="md:w-1/2 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl p-8 shadow-inner">
              <div className="relative aspect-w-16 aspect-h-9 bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden transform rotate-1 hover:rotate-0 transition-all duration-500">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="h-4 bg-orange-200 dark:bg-orange-700 rounded-full w-1/3"></div>
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="h-28 bg-gradient-to-r from-orange-100 to-orange-200 dark:from-orange-800 dark:to-orange-700 rounded-lg flex items-center justify-center shadow-md">
                      <div className="w-20 h-20 rounded-full bg-orange-500/20 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-orange-500/40 flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center">
                            <span className="text-white font-bold text-xl">
                              85%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="h-28 bg-gradient-to-r from-orange-100 to-orange-200 dark:from-orange-800 dark:to-orange-700 rounded-lg p-4 shadow-md">
                      <div className="h-4 bg-orange-300 dark:bg-orange-600 rounded-full w-full mb-3"></div>
                      <div className="h-4 bg-orange-300 dark:bg-orange-600 rounded-full w-3/4 mb-3"></div>
                      <div className="h-4 bg-orange-300 dark:bg-orange-600 rounded-full w-1/2"></div>
                    </div>
                  </div>
                  <div className="h-36 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-lg mb-4 p-3 flex items-end shadow-md">
                    <div className="h-1/3 w-1/6 bg-orange-500 rounded-t-sm mx-1"></div>
                    <div className="h-1/2 w-1/6 bg-orange-500 rounded-t-sm mx-1"></div>
                    <div className="h-3/4 w-1/6 bg-orange-500 rounded-t-sm mx-1"></div>
                    <div className="h-2/3 w-1/6 bg-orange-500 rounded-t-sm mx-1"></div>
                    <div className="h-4/5 w-1/6 bg-orange-500 rounded-t-sm mx-1"></div>
                    <div className="h-full w-1/6 bg-orange-500 rounded-t-sm mx-1"></div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-12 bg-orange-100 dark:bg-orange-800 rounded-lg shadow-sm"></div>
                    <div className="h-12 bg-orange-100 dark:bg-orange-800 rounded-lg shadow-sm"></div>
                    <div className="h-12 bg-orange-100 dark:bg-orange-800 rounded-lg shadow-sm"></div>
                  </div>
                </div>
                <div className="absolute bottom-2 right-2">
                  <div className="text-xs text-gray-500 dark:text-gray-400 bg-white/70 dark:bg-gray-800/70 px-2 py-1 rounded-md">
                    NETCOM Analytics
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Section Modèle de Prédiction */}
        <Card className="mt-16 border-t-4 border-t-orange-500 overflow-hidden bg-white/90 dark:bg-gray-800/90 backdrop-blur">
          <div className="flex flex-col md:flex-row-reverse items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pl-8">
              <h2 className="text-2xl font-semibold mb-5 text-gray-800 dark:text-white">
                <span className="bg-orange-100 dark:bg-orange-900/30 px-3 py-1 rounded-lg">
                  Modèle de Prédiction Avancé
                </span>
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Notre modèle d'IA prédictive analyse vos données pour anticiper
                les situations futures et vous aider à prendre des décisions
                éclairées. Exploitez la puissance du machine learning pour
                transformer vos données en avantage stratégique.
              </p>
              <ul className="space-y-4 mb-6">
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mr-3">
                    <svg
                      className="w-4 h-4 text-orange-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  Anticipation des pannes réseau
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mr-3">
                    <svg
                      className="w-4 h-4 text-orange-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  Prévision des besoins en maintenance
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mr-3">
                    <svg
                      className="w-4 h-4 text-orange-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  Optimisation des interventions techniques
                </li>
              </ul>
              <Link
                to="/prediction"
                className="inline-flex items-center bg-orange-500 hover:bg-orange-600 text-white font-medium px-5 py-3 rounded-lg transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-1"
              >
                Découvrir nos modèles prédictifs
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              </Link>
            </div>
            <div className="md:w-1/2 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl p-6 shadow-inner">
              <div className="aspect-w-16 aspect-h-9 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform -rotate-1 hover:rotate-0 transition-all duration-300 hover:shadow-xl">
                <div className="p-4">
                  <div className="h-4 bg-orange-200 dark:bg-orange-700 rounded-full w-2/3 mb-3"></div>
                  <div className="h-40 bg-gradient-to-r from-orange-100 to-orange-200 dark:from-orange-900 dark:to-orange-800 rounded-lg mb-3 flex items-end p-2 shadow-md">
                    <div className="h-1/3 w-1/6 bg-orange-500 rounded-t-sm mx-1 animate-pulse"></div>
                    <div className="h-1/2 w-1/6 bg-orange-500 rounded-t-sm mx-1 animate-pulse"></div>
                    <div className="h-3/4 w-1/6 bg-orange-500 rounded-t-sm mx-1 animate-pulse"></div>
                    <div className="h-2/3 w-1/6 bg-orange-500 rounded-t-sm mx-1 animate-pulse"></div>
                    <div className="h-4/5 w-1/6 bg-orange-500 rounded-t-sm mx-1 animate-pulse"></div>
                    <div className="h-full w-1/6 bg-orange-500 rounded-t-sm mx-1 animate-pulse"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="h-16 bg-orange-100 dark:bg-orange-800/50 rounded-lg shadow-sm hover:bg-orange-200 dark:hover:bg-orange-800 transition-colors"></div>
                    <div className="h-16 bg-orange-100 dark:bg-orange-800/50 rounded-lg shadow-sm hover:bg-orange-200 dark:hover:bg-orange-800 transition-colors"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;
