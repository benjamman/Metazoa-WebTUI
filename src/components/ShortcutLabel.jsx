function ShortcutLabel({ mod, bind, variant = "background1" }) {
  return (
    <>
      <span is-="badge" variant-={variant} className="shortcut-label">
        [
        {mod ? (
          <>
            <span data-mod-key={mod}>{mod}</span>{" "}
            <span style={{ paddingInline: "1ch" }}>+</span>{" "}
            <span data-bind-key={bind}>{bind}</span>
          </>
        ) : (
          <span data-bind-key={bind}>{bind}</span>
        )}
        ]
      </span>
    </>
  );
}

export default ShortcutLabel;
