import { useState } from "react";
import { generateRandomPassword } from "./utils/suiRandomness";
import { ConnectButton, useWalletKit } from "@mysten/wallet-kit";

function App() {
  const { currentAccount, signAndExecuteTransactionBlock } = useWalletKit();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!currentAccount) {
      alert("Please connect your wallet first!");
      return;
    }
    
    setLoading(true);
    try {
      const newPassword = await generateRandomPassword({
        signAndExecuteTransactionBlock
      });
      setPassword(newPassword);
    } catch (error) {
      console.error("Failed to generate password:", error);
      setPassword("Error generating password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App" style={{
      height: "100vh",
      width: "100vw",
      background: `#f5e6d3`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      position: "fixed",
      top: 0,
      left: 0,
      fontFamily: "'Consolas', 'Courier New', monospace",
      backgroundImage: `
        radial-gradient(#d4c4b5 1px, transparent 1px),
        radial-gradient(#d4c4b5 1px, transparent 1px)
      `,
      backgroundSize: '20px 20px',
      backgroundPosition: '0 0, 10px 10px'
    }}>
      <div style={{
        maxWidth: "600px",
        width: "85%",
        padding: "2rem",
        background: "#fff5e6",
        borderRadius: "12px",
        boxShadow: "8px 8px 24px rgba(0, 0, 0, 0.15)",
        position: "relative",
        zIndex: "1",
        border: "2px solid #d4c4b5"
      }}>
        <div
          style={{
            textAlign: "center",
            fontFamily: "'Roboto Mono', monospace",
            fontSize: "1rem",
            color: "#8b6b4d",
            marginBottom: "0.7rem",
            fontWeight: "bold",
            letterSpacing: "0.5px"
          }}
        >
          Using protection at night ? ❌ Use protection for Sui ✅
        </div>
        <h1 style={{
          fontSize: "2.2rem",
          marginBottom: "1.5rem",
          fontWeight: "700",
          textAlign: "center",
          color: "#4a4a4a",
          fontFamily: "'Abril Fatface', cursive",
          borderBottom: "3px solid #d4c4b5",
          paddingBottom: "0.8rem",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)"
        }}>
          SuiGuard
          <br />
          <span style={{ 
            fontSize: "1.2rem", 
            color: "#6b6b6b",
            display: "block",
            marginTop: "0.3rem",
            fontFamily: "'Roboto Mono', monospace",
            letterSpacing: "1px"
          }}>
            Password Generator
          </span>
        </h1>
        
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
          marginBottom: "1.5rem"
        }}>
          <ConnectButton className="connect-button" />
          {currentAccount && (
            <div style={{
              fontSize: "0.85rem",
              color: "#6b6b6b",
              background: "#f0e6d9",
              padding: "0.6rem 1rem",
              borderRadius: "6px",
              border: "1px solid #d4c4b5",
              fontFamily: "'Roboto Mono', monospace"
            }}>
              Connected: {currentAccount.address.slice(0, 6)}...{currentAccount.address.slice(-4)}
            </div>
          )}
        </div>

        <div style={{
          background: "#f0e6d9",
          padding: "0.8rem",
          borderRadius: "6px",
          marginBottom: "1.5rem",
          textAlign: "center",
          border: "1px solid #d4c4b5"
        }}>
          <p style={{
            color: "#4a4a4a",
            fontSize: "0.9rem",
            fontFamily: "'Roboto Mono', monospace"
          }}>
            Price: <span style={{ color: "#8b6b4d" }}>0.001 SUI</span>
          </p>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading || !currentAccount}
          className="generate-button"
          style={{
            width: "100%",
            padding: "0.8rem",
            backgroundColor: currentAccount ? "#8b6b4d" : "#d4c4b5",
            color: "#ffffff",
            border: "none",
            borderRadius: "6px",
            cursor: currentAccount ? "pointer" : "not-allowed",
            fontSize: "1rem",
            fontFamily: "'Roboto Mono', monospace",
            marginBottom: "1rem",
            transition: "all 0.3s ease",
            position: "relative",
            overflow: "hidden"
          }}
        >
          {loading ? "Processing..." : "Generate Password"}
        </button>
        
        {password && (
          <div style={{ 
            marginTop: "1.2rem",
            padding: "1.2rem",
            backgroundColor: "#f0e6d9",
            borderRadius: "6px",
            border: "1px solid #d4c4b5",
            boxShadow: "4px 4px 12px rgba(0, 0, 0, 0.05)"
          }}>
            <p style={{ 
              fontSize: "0.9rem", 
              fontFamily: "'Roboto Mono', monospace",
              color: "#4a4a4a",
              marginBottom: "0.8rem"
            }}>
              Generated Password:
            </p>
            <div style={{ 
              padding: "0.8rem",
              backgroundColor: "#ffffff",
              borderRadius: "6px",
              border: "1px solid #d4c4b5",
              fontFamily: "'Roboto Mono', monospace",
              fontSize: "1.1rem",
              letterSpacing: "1px",
              wordBreak: "break-all",
              color: "#000000",
              fontWeight: "700",
              boxShadow: "inset 2px 2px 6px rgba(0, 0, 0, 0.05)"
            }}>
              {password}
            </div>
            <p style={{ 
              fontSize: "0.75rem",
              color: "#8b6b4d",
              marginTop: "0.8rem",
              padding: "0.6rem",
              background: "#fff5e6",
              borderRadius: "6px",
              fontFamily: "'Roboto Mono', monospace",
              border: "1px solid #d4c4b5"
            }}>
              🔒 SAVE PASSWORD IN SECURE LOCATION
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;