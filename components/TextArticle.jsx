import HighlightText from "./HighlightText";
import ShortcutLabel from "./ShortcutLabel";

function TextArticle({ article, searchTerms, shortcut="none" }) {
    return <article className="ar" box-="round" shear-="both" style={{ marginBottom: "1lh" }}>
        <div className="header">
            <span is-="badge" variant-="background2">{new URL(article.href).hostname}</span>
            <ShortcutLabel mod={shortcut[0]} bind={shortcut[1]} />
        </div>
        <header style={{
            padding: "1lh 1ch 0 1ch"
        }}>
            <a href={article.href} style={{textDecoration: "none"}} className="article-hyperlink" data-shortcut-mod={shortcut[0]} data-shortcut-key={shortcut[1]} data-shortcut-action="click" >
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
        <div className="footer">
            {Object.entries(article.engines).map((engine, index) => {
                const ei = `${engine[0]}: ${engine[1]}`;
                return <li key={ei} is-="badge" variant-="background0">{ei}</li>;
            })}
        </div>
    </article>;
}

export default TextArticle;
