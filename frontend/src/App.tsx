import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import FileUpload from "./components/FileUpload";
import DocumentManager from "./components/DocumentManager";
import Chat from "./components/Chat";
import { useState, useEffect } from "react";
import {
  MdMenu,
  MdFolderOpen,
  MdChatBubbleOutline,
  MdOutlineSettings,
  MdLightMode,
  MdDarkMode,
} from "react-icons/md";

// Theme toggle functionality
const useTheme = () => {
  const [darkMode, setDarkMode] = useState(
    window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return { darkMode, setDarkMode };
};

// Navbar Component with improved styling - modern design with reduced border
interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar = ({ darkMode, toggleDarkMode }: NavbarProps) => (
  <div className="flex justify-center w-full">
    <div className="w-full mx-4 md:mx-12 lg:mx-20 bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm px-4 py-3 flex justify-between items-center z-10 transition-all duration-300 rounded-xl mt-4 border-[0.5px] border-gray-100 dark:border-gray-700 shadow-sm">
      <div className="flex items-center">
        <img
          src="téléchargement.png"
          alt="NETCOM"
          className="h-7 w-auto hidden md:block"
        />
      </div>
      <div className="flex items-center space-x-4">
        <nav className="space-x-6 hidden md:flex">
          <Link
            to="/"
            className="text-sm text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition font-medium relative group"
          >
            Documents
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link
            to="/chat"
            className="text-sm text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition font-medium relative group"
          >
            Chat
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
          </Link>
        </nav>
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Toggle dark mode"
        >
          {darkMode ? (
            <MdLightMode className="text-yellow-400" size={18} />
          ) : (
            <MdDarkMode className="text-gray-600" size={18} />
          )}
        </button>
      </div>
    </div>
  </div>
);

// Sidebar Component with enhanced UI
interface SidebarProps {
  isCollapsed: boolean;
  toggleCollapse: () => void;
  darkMode: boolean;
}

const Sidebar = ({ isCollapsed, toggleCollapse, darkMode }: SidebarProps) => {
  const location = useLocation();

  interface LinkClassProps {
    path: string;
  }

  const linkClass = (path: LinkClassProps["path"]): string =>
    `${
      location.pathname === path
        ? "bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 font-medium"
        : "text-gray-700 dark:text-gray-300"
    } flex items-center ${
      isCollapsed ? "justify-center" : ""
    } py-3 px-4 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all duration-200`;

  return (
    <aside
      className={`fixed top-0 left-0 h-screen ${
        isCollapsed ? "w-20" : "w-72"
      } bg-white dark:bg-gray-800 shadow-lg py-6 transform transition-all duration-300 z-50 border-r border-gray-100 dark:border-gray-700`}
    >
      <div
        className={`mb-8 flex items-center ${
          isCollapsed ? "justify-center px-2" : "justify-between px-6"
        }`}
      >
        {!isCollapsed && (
          <div className="flex items-center">
            <div className="h-8 w-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <h1 className="ml-3 text-xl font-bold text-orange-500">NETCOM</h1>
          </div>
        )}
        <button
          className={`${
            isCollapsed ? "" : "ml-2"
          } p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200`}
          onClick={toggleCollapse}
          aria-label="Toggle sidebar"
        >
          <MdMenu size={24} className="text-gray-600 dark:text-gray-300" />
        </button>
      </div>
      <nav className="space-y-2 px-4">
        <Link to="/" className={linkClass("/")} title="Documents">
          <div className="flex items-center w-full">
            <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-orange-50 dark:bg-gray-700">
              <MdFolderOpen
                size={22}
                className="text-orange-500 dark:text-orange-400"
              />
            </div>
            {!isCollapsed && <span className="ml-3 truncate">Add Documents</span>}
          </div>
        </Link>
        <Link to="/chat" className={linkClass("/chat")} title="Chat">
          <div className="flex items-center w-full">
            <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-orange-50 dark:bg-gray-700">
              <MdChatBubbleOutline
                size={22}
                className="text-orange-500 dark:text-orange-400"
              />
            </div>
            {!isCollapsed && <span className="ml-3 truncate">Chat</span>}
          </div>
        </Link>
      </nav>
    </aside>
  );
};

// Card component for consistent UI - Keeping this for the Upload section only
import { ReactNode } from "react";

const Card = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div
    className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 transition-colors duration-300 ${className}`}
  >
    {children}
  </div>
);

const App = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { darkMode, setDarkMode } = useTheme();

  const onUploadSuccess = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed((prev) => !prev);
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <Router>
      <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        {/* Sidebar with improved design */}
        <Sidebar
          isCollapsed={sidebarCollapsed}
          toggleCollapse={toggleSidebar}
          darkMode={darkMode}
        />

        {/* Main Content */}
        <div
          className={`flex-1 flex flex-col transition-all duration-300 ${
            sidebarCollapsed ? "ml-20" : "ml-72"
          }`}
        >
          {/* Navbar with dark mode toggle */}
          <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

          {/* Pages */}
          <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <Routes>
              <Route
                path="/"
                element={
                  <div className="w-full max-w-5xl mx-auto space-y-6">
                    <div className="flex items-center justify-between mb-6">
                      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                        <span className="text-orange-500">Document</span>{" "}
                        Management
                      </h1>
                    </div>
                    <Card className="border-l-4 border-l-orange-500">
                      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                        Upload New Document
                      </h2>
                      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border border-dashed border-gray-300 dark:border-gray-600">
                        <FileUpload onUploadSuccess={onUploadSuccess} />
                      </div>
                    </Card>
                    {/* Removed Card wrapper here */}
                    <div className="mt-6">
                      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white flex items-center">
                        <div className="w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mr-2">
                          <span className="text-orange-500 text-xs font-bold">
                            N
                          </span>
                        </div>
                        My Documents
                      </h2>
                      <DocumentManager refreshTrigger={refreshTrigger} />
                    </div>
                  </div>
                }
              />
              <Route
                path="/chat"
                element={
                  <div className="w-full max-w-6xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                        <span className="text-orange-500">Chat</span> with Your
                        Documents
                      </h1>
                    </div>
                    {/* Removed Card wrapper here */}
                    <div className="h-[calc(100vh-180px)]">
                      <Chat />
                    </div>
                  </div>
                }
              />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;