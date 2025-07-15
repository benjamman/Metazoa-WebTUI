import ShortcutLabel from "./ShortcutLabel";

function SearchForm({ query = "", shortcut = "ctrl + k" }) {
    return <form action="/search" box-="square" shear-="top" className="search-form">
        <div className="header">
            <span is-="badge" variant-="background2">Search</span>
            <ShortcutLabel mod="ctrl" bind="k" />
        </div>
        <div className="wrapper">
            <input type="serach" name="q" defaultValue={query} placeholder="Search..." is-="input" variant-="background3" size="small"/>
            <input type="submit" value="Go" variant-="background2" size-="small" data-shortcut-mod="ctrl" data-shortcut-key="k" data-shortcut-action="click" />
        </div>
    </form>;
}

export default SearchForm;
