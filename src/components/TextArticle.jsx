import HighlightText from "./HighlightText";
import ShortcutLabel from "./ShortcutLabel";

function TextArticle({ article, searchTerms, shortcut="none", active=false }) {
    return <article className={ active ? "ar active" : "ar" } box-="square" shear-="both" style={{ marginBottom: "1lh" }}>
        <div className="header">
            <span is-="badge" variant-="background2">{new URL(article.href).hostname}</span>
            {/* This is a hackathon leave me alone */}
            <span className="highlight-or-hidden">
                <ShortcutLabel mod={shortcut[0]} bind={shortcut[1]} />
                <ShortcutLabel mod="shift" bind={shortcut[1]} />
            </span>
        </div>
        <header style={{
            padding: "1lh 1ch 0 1ch"
        }}>
            <a href={article.href} style={{textDecoration: "none"}} className="article-hyperlink main-anchor">
                <div>
                    <div style={{
                            display: "grid",
                            gridTemplateColumns: "auto 1fr",
                            gap:"1ch",
                            margin:0
                            }}>
                        <div className="article-favicon-wrapper">
                            <img src={article.icon} className="article-favicon" />
                        </div>
                        <div style={{overflow:"hidden"}}>
                            <h3 className="ellipsis" style={{color: "var(--foreground0)",margin:0, padding:0}} title={article.title}>{article.title}</h3>
                            <div className="ellipsis" style={{textDecoration: "underline"}} title={article.href}>{article.href}</div>
                        </div>
                    </div>
                </div>
            </a>
        </header>
        <p className="article-description">
            <HighlightText text={article.description} searchTerms={searchTerms} />
        </p>
        <div className="header">
            <div>
                {Object.entries(article.engines).map((engine, index) => {
                    const ei = `${engine[0]}: ${engine[1]}`;
                    return <li key={ei} is-="badge" variant-="background0">{ei}</li>;
                })}
            </div>
            {
            // This should be a shorcut/link that shows up when you select or hover the result
            // It should popup a UI to show more result info
            /*<span is-="badge" variant-="background0">
                Description provided by {article.descriptor}
            </span>*/}
        </div>
    </article>;
}

export default TextArticle;
