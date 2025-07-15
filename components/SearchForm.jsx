import ShortcutLabel from "./ShortcutLabel";

function SearchForm({ query = "", shortcut = [ "ctrl", "k" ] }) {
    return <form action="/search" box-="square" shear-="top" className="search-form">
        <div className="header">
            <span is-="badge" variant-="background2">Search</span>
            <ShortcutLabel mod={shortcut[0]} bind={shortcut[1]} />
        </div>
        <div className="wrapper">
            <input type="serach" name="q" defaultValue={query} placeholder="Search..." is-="input" variant-="background3" size="small" data-shortcut={`all,${shortcut.join(',')},selectEnd+preventDefault/selectAll+preventDefault/default`}/>
            <input type="submit" value="Go" variant-="background2" size-="small" />
        </div>
    </form>;
}

export default SearchForm;
