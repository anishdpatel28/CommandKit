import React, { useState } from "react";
import "./App.web.css";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"reqgen" | "macroboard">("reqgen");
  const [reqgenStatus, setReqgenStatus] = useState({
    installed: false,
    version: "",
    running: false,
    latestVersion: "1.1.0",
  });
  const [macroboardStatus, setMacroboardStatus] = useState({
    installed: false,
    version: "",
    running: false,
    latestVersion: "2.1.0",
  });

  const handleReqgenAction = () => {
    if (!reqgenStatus.installed) {
      // Download
      setReqgenStatus(prev => ({
        ...prev,
        installed: true,
        version: "1.0.0",
      }));
    } else if (reqgenStatus.version !== reqgenStatus.latestVersion) {
      // Update
      setReqgenStatus(prev => ({ ...prev, version: prev.latestVersion }));
    } else {
      // Run
      setReqgenStatus(prev => ({ ...prev, running: true }));
    }
  };

  const handleMacroboardAction = () => {
    if (!macroboardStatus.installed) {
      // Download
      setMacroboardStatus(prev => ({
        ...prev,
        installed: true,
        version: "2.0.0",
      }));
    } else if (macroboardStatus.version !== macroboardStatus.latestVersion) {
      // Update
      setMacroboardStatus(prev => ({ ...prev, version: prev.latestVersion }));
    } else {
      // Run
      setMacroboardStatus(prev => ({ ...prev, running: true }));
    }
  };

  const getReqgenButtonText = () => {
    if (!reqgenStatus.installed) {
      return "Download";
    }
    if (reqgenStatus.version !== reqgenStatus.latestVersion) {
      return "Update";
    }
    if (reqgenStatus.running) {
      return "Running...";
    }
    return "Run";
  };

  const getMacroboardButtonText = () => {
    if (!macroboardStatus.installed) {
      return "Download";
    }
    if (macroboardStatus.version !== macroboardStatus.latestVersion) {
      return "Update";
    }
    if (macroboardStatus.running) {
      return "Running...";
    }
    return "Run";
  };

  const isReqgenButtonDisabled = () => {
    return reqgenStatus.running;
  };

  const isMacroboardButtonDisabled = () => {
    return macroboardStatus.running;
  };

  return (
    <div className="app">
      <header className="header">
        <h1>CommandKit</h1>
        <span className="version">v1.0.0</span>
      </header>

      <div className="container">
        <nav className="sidebar">
          <button
            className={`tab ${activeTab === "reqgen" ? "active" : ""}`}
            onClick={() => setActiveTab("reqgen")}
          >
            ReqGen
          </button>
          <button
            className={`tab ${activeTab === "macroboard" ? "active" : ""}`}
            onClick={() => setActiveTab("macroboard")}
          >
            MacroBoard
          </button>
        </nav>

        <main className="content">
          {activeTab === "reqgen" && (
            <div className="project-tab">
              <h2>ReqGen</h2>
              <div className="status">
                <p>
                  <strong>Status:</strong>{" "}
                  {reqgenStatus.installed ? "Installed" : "Not Installed"}
                </p>
                {reqgenStatus.version && (
                  <p>
                    <strong>Version:</strong> {reqgenStatus.version}
                  </p>
                )}
                <p>
                  <strong>Latest Version:</strong> {reqgenStatus.latestVersion}
                </p>
                <p>
                  <strong>Running:</strong>{" "}
                  {reqgenStatus.running ? "Yes" : "No"}
                </p>
              </div>
              <div className="actions">
                <button
                  onClick={handleReqgenAction}
                  disabled={isReqgenButtonDisabled()}
                  className={reqgenStatus.running ? "running" : ""}
                >
                  {getReqgenButtonText()}
                </button>
              </div>
            </div>
          )}

          {activeTab === "macroboard" && (
            <div className="project-tab">
              <h2>MacroBoard</h2>
              <div className="status">
                <p>
                  <strong>Status:</strong>{" "}
                  {macroboardStatus.installed ? "Installed" : "Not Installed"}
                </p>
                {macroboardStatus.version && (
                  <p>
                    <strong>Version:</strong> {macroboardStatus.version}
                  </p>
                )}
                <p>
                  <strong>Latest Version:</strong>{" "}
                  {macroboardStatus.latestVersion}
                </p>
                <p>
                  <strong>Running:</strong>{" "}
                  {macroboardStatus.running ? "Yes" : "No"}
                </p>
              </div>
              <div className="actions">
                <button
                  onClick={handleMacroboardAction}
                  disabled={isMacroboardButtonDisabled()}
                  className={macroboardStatus.running ? "running" : ""}
                >
                  {getMacroboardButtonText()}
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
