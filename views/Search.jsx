import SearchForm from "../components/SearchForm";
import TextArticle from "../components/TextArticle";
import ShortcutLabel from "../components//ShortcutLabel";

function Search({ query, articles }) {
    const searchTerms = query.split(/\s/);
    return <>
        <header className="page-header">
            <pre class="logo-mini">{` _ _      ____  ()
//\\/\\etazoaL||U|[]
             \`-'  `}</pre>
            <div box-="square" shear-="top">
                <div className="header">
                    <span is-="badge" variant-="background2">
                        About 
                    </span>
                    <ShortcutLabel mod="shift" bind="1-4" />
                </div>
                <ul>
                    <li is-="badge" variant-="background0">
                        <a href="/">Home</a>
                    </li>
                    <li is-="badge" variant-="background0">
                        <a href="/">Github</a>
                    </li>
                    <li is-="badge" variant-="background0">
                        <a href="/">WebTUI</a>
                    </li>
                    <li is-="badge" variant-="background0">
                        <a href="/">Metazoa</a>
                    </li>
                </ul>
            </div>
            <SearchForm query={query} />
        </header>
        {articles.map((result, index) => {
            let shortcut = [];
            if (index <= 9) {
                shortcut = ["ctrl", 0];
                if (index < 9) shortcut[1] = index+1;
            }
            return <TextArticle key={index} article={result} searchTerms={searchTerms} shortcut={shortcut} />
        })}
    </>;
}

export default Search;
