function ShortcutLabel({ mod, bind, variant = "background1" }) {
    return <>
        <span is-="badge" variant-={variant} className="shortcut-label">[
            <span data-mod-key={mod}>{mod}</span> <span style={{paddingInline:"1ch"}}>+</span> <span>{bind}</span>
        ]</span>
    </>;
}

export default ShortcutLabel;
