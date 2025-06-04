// Allows one to see a list of possible prefill values when clicking on an empty field, 
// and to fill that field based on the option clicked.
const PrefillValueComponent = ({ clickedField, setClickedField, setFormData, parentForms, defaultOptions, }: any) => (
  <div style={{
    position: "absolute", top: 100, left: 100, background: "#fff", padding: "1em",
    border: "1px solid #ccc", borderRadius: "8px", zIndex: 999, maxHeight: "300px",
    overflowY: "auto", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", width: 300,
  }}>
    <h3>
      Select data for: <code>{clickedField}</code>
    </h3>

    {/* Closes the menu */}
    <button onClick={() => setClickedField(null)}>
      Cancel
    </button>

    {/* Displays global defaults if they exist */}
    {defaultOptions.length > 0 && (
      <div style={{ marginTop: "1em" }}>
        <strong>Global Defaults</strong>
        {defaultOptions.map(({ key, label, value }) => (
          <button key={key} style={buttonStyle} onClick={() =>
            setFormData((prev: any) => ({ ...prev,  [clickedField]: value, }))}>
            {`${label}: ${value}`}
          </button>
        ))}
      </div>
    )}

    {/* Informs if there are no non-default options */}
    {parentForms.length === 0 && defaultOptions.length === 0 && (
      <p style={{ marginTop: "1em" }}>
        No data available from prerequisite forms or global defaults.
      </p>
    )}

    {/* Maps predecessor node data to buttons that can be clicked to set the initial clicked field's value to that of the clicked option*/}
    {parentForms.map((parent: any, idx: number) => (
      <div key={idx} style={{ marginTop: "1em" }}>
        <strong>{parent.name}</strong>
        {Object.entries(parent.data || {}).map(([key, value]) => (
          <button key={key} style={buttonStyle} onClick={() => setFormData((prev: any) => ({
              ...prev,  [clickedField]: typeof value === "object" ? JSON.stringify(value) : value,
            }))}>
            {key}: {typeof value === "object" ? JSON.stringify(value) : String(value)}
          </button>
        ))}
      </div>
    ))}
  </div>
);

// styling

const buttonStyle: React.CSSProperties = {
  display: "block",
  margin: "0.25em 0",
  padding: "0.25em 0.5em",
  background: "#eee",
  border: "1px solid #ccc",
  borderRadius: "4px",
  cursor: "pointer",
  width: "100%",
  textAlign: "left",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

export default PrefillValueComponent;
