const styles = `
  .topbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 30px;
    background: #202020;
    border: 1px solid #333;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    z-index: 10000;
    font-family: 'Lucida Console', 'Courier New', monospace;
    font-size: 13.5px;
    font-weight: normal;
    color: #ffffff;
  }
  .topbar-section {
    display: flex;
    align-items: center;
    height: 100%;
    position: relative;
  }
  .topbar-button {
    background: transparent;
    color: #ffffff;
    border: none;
    padding: 0 6px;
    height: 100%;
    cursor: pointer;
    font-family: 'Lucida Console', 'Courier New', monospace;
    font-size: 9px;
    font-weight: normal;
    text-transform: uppercase;
    letter-spacing: 0.3px;
    display: flex;
    align-items: center;
    transition: all 0.1s;
    border-right: 1px solid #333;
    white-space: nowrap;
    min-width: fit-content;
  }
  .topbar-button:hover {
    background: #333;
  }
  .topbar-button-pressed {
    background: #555;
  }
  .topbar-button-disabled {
    color: #666;
    cursor: default;
  }
  .dropdown-button {
    background: transparent;
    color: #ffffff;
    border: none;
    padding: 0 6px;
    height: 100%;
    cursor: pointer;
    font-family: 'Lucida Console', 'Courier New', monospace;
    font-weight: normal;
    text-transform: uppercase;
    letter-spacing: 0.3px;
    display: flex;
    align-items: center;
    gap: 3px;
    transition: all 0.1s;
    border-right: 1px solid #333;
    white-space: nowrap;
    min-width: fit-content;
  }
  .dropdown-button:hover {
    background: #333;
  }
  .dropdown-button-pressed {
    background: #555;
  }
  .dropdown-arrow {
    font-size: 6px;
    opacity: 0.7;
  }
  .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    background: #000000;
    border: 1px solid #666;
    min-width: 160px;
    max-height: 300px;
    overflow-y: auto;
    z-index: 10001;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.8);
  }
  .dropdown-header {
    background: #333;
    color: #ffffff;
    padding: 4px 8px;
    font-weight: normal;
    border-bottom: 1px solid #666;
    text-align: center;
    font-size: 9px;
  }
  .dropdown-item {
    padding: 4px 8px;
    cursor: pointer;
    border-bottom: 1px solid #333;
    transition: all 0.1s;
    font-size: 9px;
  }
  .dropdown-item:hover {
    background: #333;
  }
  .dropdown-item.selected {
    background: #555;
    color: #ffffff;
  }
  .dropdown-item.disabled {
    color: #666;
    cursor: default;
  }
  .dropdown-item.disabled:hover {
    background: transparent;
  }
  .airport-display {
    background: #222;
    padding: 0 4px;
    height: 100%;
    display: flex;
    align-items: center;
    border-right: 1px solid #333;
    white-space: nowrap;
  }
  .frequency-display {
    padding: 0 4px;
    height: 100%;
    display: flex;
    align-items: center;
    border-right: 1px solid #333;
    white-space: nowrap;
  }
  .status-indicators {
    padding: 0 4px;
    height: 100%;
    display: flex;
    align-items: center;
    gap: 4px;
    border-right: 1px solid #333;
    white-space: nowrap;
  }
  .atis-container {
    display: flex;
    align-items: center;
    padding: 0 6px;
    border-right: 1px solid #333;
    cursor: pointer;
    user-select: none;
  }
  .atis-label {
    color: #fff;
    margin-right: 4px;
  }
  .atis-letter {
    text-transform: uppercase;
  }
  .atis-letter.red {
    color: #ff4d4d;
  }
  .atis-letter.yellow {
    color: #f1c40f;
  }
  .time-display {
    margin-left: auto;
    padding: 0 4px;
    height: 100%;
    display: flex;
    align-items: center;
    border-left: 1px solid #333;
    white-space: nowrap;
  }
  .overlay {
    position: fixed;
    top: 18px;
    left: 0;
    right: 0;
    bottom: 0;
    background: transparent;
    z-index: 9999;
  }
  .popup {
    position: fixed;
    top: 40px;
    left: 50%;
    transform: translateX(-50%);
    background: #111;
    border: 1px solid #444;
    padding: 12px 16px;
    z-index: 10002;
    color: #fff;
    font-family: 'Lucida Console', monospace;
    font-size: 12px;
    min-width: 280px;
    box-shadow: 0 0 10px #000;
    user-select: none;
  }
  .popup textarea {
    width: 100%;
    height: 100px;
    background: #222;
    border: 1px solid #333;
    color: #eee;
    font-family: 'Lucida Console', monospace;
    font-size: 12px;
    resize: none;
    padding: 6px;
  }
  .popup input {
    width: 50px;
    background: #222;
    border: 1px solid #333;
    color: #eee;
    font-family: 'Lucida Console', monospace;
    font-size: 14px;
    text-align: center;
    margin-right: 8px;
  }
  .popup-buttons {
    margin-top: 8px;
    display: flex;
    justify-content: flex-end;
    gap: 8px;
  }
  .popup-button {
    background: #333;
    border: none;
    color: #eee;
    padding: 6px 12px;
    cursor: pointer;
    font-family: 'Lucida Console', monospace;
    font-size: 12px;
  }
  .popup-button:hover {
    background: #555;
  }
`;

import { JSX, ReactNode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import IslandToAirportMap from '../data/IslandToAirportMap.json';
import AssetManager from '../AssetManager';

let assetManager: AssetManager;

type ButtonProps = {
  disabled?: boolean;
  pressed?: boolean;
  onClick?: () => any;
  children?: ReactNode;
  className?: string;
};

function TopBarButton({ disabled = false, pressed = false, onClick, children, className = "" }: ButtonProps) {
  let buttonClass = `topbar-button ${className}`;
  if (disabled) buttonClass += " topbar-button-disabled";
  if (pressed) buttonClass += " topbar-button-pressed";

  return (
    <div className={buttonClass} onClick={!disabled ? onClick : undefined}>
      {children}
    </div>
  );
}

function DropdownButton({ disabled = false, pressed = false, onClick, children, className = "" }: ButtonProps) {
  let buttonClass = `dropdown-button ${className}`;
  if (disabled) buttonClass += " dropdown-button-disabled";
  if (pressed) buttonClass += " dropdown-button-pressed";

  return (
    <div className={buttonClass} onClick={!disabled ? onClick : undefined}>
      {children}
      <span className="dropdown-arrow">▼</span>
    </div>
  );
}

enum DropdownMenus {
  None,
  AirportSelect,
  Maps,
  DisabledOptions,
}

let selectedAirport = "";
let selectedPosition = "CTR";

function getSelectedAirport() {
  return selectedAirport;
}

function AirportSelectDropdown({ onClose }: { onClose: () => void }) {
  const [island, setIsland] = useState("");
  const [airport, setAirport] = useState("");
  const [showPositions, setShowPositions] = useState(false);
  const islandToAirportMap = new Map(Object.entries(IslandToAirportMap));

  const positions = [
    { code: "CTR", freq: "124.850" },
    { code: "TWR", freq: "118.300" },
    { code: "GND", freq: "121.900" }
  ];

  if (showPositions && airport) {
    return (
      <div className="dropdown-menu">
        <div className="dropdown-header">SELECT POSITION - {airport}</div>
        <div className="dropdown-item" onClick={() => setShowPositions(false)}>← BACK TO AIRPORTS</div>
        {positions.map((pos) => (
          <div
            key={pos.code}
            className={`dropdown-item ${selectedPosition === pos.code && selectedAirport === airport ? 'selected' : ''}`}
            onClick={() => {
              selectedAirport = airport;
              selectedPosition = pos.code;
              onClose();
            }}
          >
            {pos.code} - {pos.freq}
          </div>
        ))}
      </div>
    );
  }

  if (island === "") {
    return (
      <div className="dropdown-menu">
        <div className="dropdown-header">SELECT ISLAND</div>
        {[...islandToAirportMap.keys()].map((key) => (
          <div key={key} className="dropdown-item" onClick={() => setIsland(key)}>
            {key}
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div className="dropdown-menu">
        <div className="dropdown-header">SELECT AIRPORT</div>
        <div className="dropdown-item" onClick={() => setIsland("")}>← BACK TO ISLANDS</div>
        {islandToAirportMap.get(island)?.map((apt) => (
          <div
            key={apt}
            className="dropdown-item"
            onClick={() => {
              setAirport(apt);
              setShowPositions(true);
            }}
          >
            {apt}
          </div>
        ))}
      </div>
    );
  }
}

function AssetButton({ assetString, pressed = false }: { assetString: string; pressed?: boolean }) {
  let assetInfo;
  try {
    assetInfo = assetManager.parseAssetString(assetString);
  } catch (e) {
    return <div className="dropdown-item disabled">{assetString}</div>;
  }

  const [loaded, setLoadedState] = useState(pressed || assetManager.isAssetLoaded(assetString));

  function setLoaded() {
    setLoadedState(assetManager.isAssetLoaded(assetString));
  }

  return (
    <div
      className={`dropdown-item ${loaded ? 'selected' : ''}`}
      onClick={async () => {
        if (loaded) assetManager.unloadAsset(assetString);
        else await assetManager.loadAsset(assetString);
        setLoaded();
      }}
    >
      {assetInfo.name}
    </div>
  );
}

function MapsDropdown() {
  const airport = getSelectedAirport();
  const maps: Array<JSX.Element> = [];

  maps.push(<AssetButton key="coast" pressed assetString="global/coast" />);
  maps.push(<AssetButton key="boundaries" pressed assetString="global/boundaries" />);

  const category = assetManager.getCategory(airport);
  if (category) {
    for (const asset of category.assets) {
      maps.push(<AssetButton key={asset.id} assetString={`${airport}/${asset.id}`} />);
    }
  }

  return (
    <div className="dropdown-menu">
      <div className="dropdown-header">🗺️ MAPS</div>
      {maps}
    </div>
  );
}

function DisabledOptionsDropdown() {
  const disabledOptions = [
    "📍 PLACE CNTR",
    "🧲 OFF CNTR", 
    "🔁 RR 5",
    "📍 PLACE RR",
    "🧲 RR CNTR",
    "🌟 BRITE",
    "↗️ LDR DIR N",
    "🎯 LDR 2",
    "🔤 CHAR SIZE",
    "⚙️ PREF",
    "🧪 SSA FILTER",
    "🧪 GI TEXT FILTER",
    "⇧ SHIFT"
  ];

  return (
    <div className="dropdown-menu">
      <div className="dropdown-header">DISABLED OPTIONS</div>
      {disabledOptions.map((option, index) => (
        <div key={index} className="dropdown-item disabled">
          {option}
        </div>
      ))}
    </div>
  );
}

function AtisPopup({ letter, text, setLetter, setText, onClose }: {
  letter: string;
  text: string;
  setLetter: (l: string) => void;
  setText: (t: string) => void;
  onClose: () => void;
}) {
  const onCopy = () => {
    navigator.clipboard.writeText(text);
    setLetter(letter.trim() ? letter.trim().toUpperCase() : "A");
  };

  return (
    <div className="popup">
      <div style={{ marginBottom: 6, display: "flex", alignItems: "center" }}>
        <input
          maxLength={1}
          value={letter}
          onChange={e => setLetter(e.target.value.toUpperCase().replace(/[^A-Z]/g, ""))}
          style={{ textTransform: "uppercase" }}
        />
        <button className="popup-button" onClick={onCopy}>Copy ATIS Text</button>
        <button className="popup-button" onClick={onClose}>Close</button>
      </div>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        spellCheck={false}
      />
    </div>
  );
}

function TopBar() {
  const [activeDropdown, setActiveDropdown] = useState<DropdownMenus>(DropdownMenus.None);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [atisLetter, setAtisLetter] = useState("");
  const [atisText, setAtisText] = useState(
    `∎ (AIRPORT) ATIS Information {ATIS Tag} ∎
―――――――――――――――――――――――――――――――――――――
Controller Callsign: (AIRPORT) CTR/TWR/GND
―――――――――――――――――――――――――――――――――――――
Aerodrome:
Max Taxi Speed: (Max speed, default 25 KTS)
Max ACFT Size: N/A (default N/A)
Arrival Runway(s): (make selection)
Departure Runway(s): (make selection)
Pressure: (Default QNH 1020)

NOTAMS:
Providing top-down control for (make selection. Airport in the island is in JSON)
VFR ACFT say direction of flight, intentions in flight plan.
Advise receipt of information {ATIS Tag} on first contact.

Charts:
Chart Pack Author: (selection)
Chart Pack Link:
https://
―――――――――――――――――――――――――――――――――――――
∎ End of ATIS Information {ATIS Tag} ∎`
  );
  const [showAtisPopup, setShowAtisPopup] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date) => {
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const toggleDropdown = (menu: DropdownMenus) => {
    setActiveDropdown(activeDropdown === menu ? DropdownMenus.None : menu);
  };

  const closeDropdown = () => {
    setActiveDropdown(DropdownMenus.None);
    setShowAtisPopup(false);
  };

  const getFrequency = () => {
    const frequencies = {
      CTR: "124.850",
      TWR: "118.300",
      GND: "121.900"
    };
    return frequencies[selectedPosition as keyof typeof frequencies] || "124.850";
  };

  const getDisplayName = () => {
    if (selectedAirport) {
      return `${selectedAirport}_${selectedPosition}`;
    }
    return "IRFD_CTR";
  };

  const shouldShowRunwayButtons = () => {
    return selectedPosition === "TWR" || selectedPosition === "GND";
  };

  let letterClass = "atis-letter red";
  if (atisLetter.trim()) {
    letterClass = showAtisPopup ? "atis-letter yellow" : "atis-letter yellow";
  }

  return (
    <>
      <style>{styles}</style>

      <div className="topbar">
        <div className="topbar-section">
          <DropdownButton
            pressed={activeDropdown === DropdownMenus.AirportSelect}
            onClick={() => toggleDropdown(DropdownMenus.AirportSelect)}
          >
            {getDisplayName()}
          </DropdownButton>
          {activeDropdown === DropdownMenus.AirportSelect && (
            <AirportSelectDropdown onClose={closeDropdown} />
          )}
        </div>

        <div className="frequency-display">{getFrequency()}</div>

        <div className="status-indicators atis-container" onClick={() => setShowAtisPopup(true)}>
          <span className="atis-label">ATIS</span>
          <span className={letterClass}>{atisLetter.trim() || "A"}</span>
        </div>

        {shouldShowRunwayButtons() && (
          <>
            <TopBarButton>RWY</TopBarButton>
            <TopBarButton>SW_NW</TopBarButton>
          </>
        )}

        <div className="topbar-section">
          <DropdownButton
            pressed={activeDropdown === DropdownMenus.Maps}
            onClick={() => toggleDropdown(DropdownMenus.Maps)}
          >
            MAPS
          </DropdownButton>
          {activeDropdown === DropdownMenus.Maps && <MapsDropdown />}
        </div>

        <div className="topbar-section">
          <DropdownButton
            pressed={activeDropdown === DropdownMenus.DisabledOptions}
            onClick={() => toggleDropdown(DropdownMenus.DisabledOptions)}
          >
            OPTIONS
          </DropdownButton>
          {activeDropdown === DropdownMenus.DisabledOptions && <DisabledOptionsDropdown />}
        </div>

        <TopBarButton>+</TopBarButton>
        <TopBarButton>-</TopBarButton>

        <div className="time-display">
          W: 155/06 {formatTime(currentTime)}
        </div>
      </div>

      {showAtisPopup && (
        <AtisPopup
          letter={atisLetter}
          text={atisText}
          setLetter={setAtisLetter}
          setText={setAtisText}
          onClose={() => setShowAtisPopup(false)}
        />
      )}

      {(activeDropdown !== DropdownMenus.None || showAtisPopup) && (
        <div className="overlay" onClick={closeDropdown} />
      )}
    </>
  );
}

export default class DisplayControlBar {
  constructor(localAssetManager: AssetManager) {
    assetManager = localAssetManager;
    const bar = document.getElementById("dcb");
    if (!bar) throw new Error("DisplayControlBar: dcb element not found.");
    const root = createRoot(bar);
    root.render(<TopBar />);
  }
}
