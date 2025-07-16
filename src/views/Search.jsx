import Header from "../components/Header";
import Footer from "../components/Footer"
import StatusLine from "../components/StatusLine";
import TextArticle from "../components/TextArticle";
import ShortcutLabel from "../components//ShortcutLabel";

function Search({ query, articles, suggestions }) {
    const searchTerms = query.split(/\s/);
    return <>
            <StatusLine />
            <Header query={query} />
            <div className="page-columns">
            <main id="main">
                <header box-="square" shear-="top">
                    <div className="header">
                        <span is-="badge" variant-="background2">
                            Toolbar
                        </span>
                        <ShortcutLabel bind="t" />
                    </div>
                    <ul data-layername="toolbar" data-shortcut={`normal,none,t,sectionNavigationLayer`}>
                        <li is-="badge" variant-="background0">
                            <a href="/">Web</a>
                        </li>
                        {/*<li is-="badge" variant-="background0">
                            <a href="/">Images</a>
                        </li>
                        <li is-="badge" variant-="background0">
                            <a href="/">Videos</a>
                        </li>
                        <li is-="badge" variant-="background0">
                            <a href="/">News</a>
                        </li>
                        <li is-="badge" variant-="background0">
                            <a href="/">Forums</a>
                        </li>
                        <li is-="badge" variant-="background0">
                            <a href="/">Books</a>
                        </li>*/}
                    </ul>
                </header>
                {articles.map((result, index) => {
                    let shortcut = [];
                    if (index <= 9) {
                        shortcut = ["ctrl", 0];
                        if (index < 9) shortcut[1] = index+1;
                    }
                    return <TextArticle {...(index === 0 && { active: true })} key={index} article={result} searchTerms={searchTerms} shortcut={shortcut} />
                })}
            </main>
            <div>
                {/*<div box-="square" shear-="top">
                    <div className="header">
                        <span is-="badge" variant-="background2">
                            Filters
                        </span>
                        <ShortcutLabel mod="shift" bind="f" />
                    </div>
                    <ul className="flexy-badges">
                        <li is-="badge" variant-="background1">safesearch</li>
                        <li is-="badge" variant-="background1">badware</li>
                        <li is-="badge" variant-="background1">+</li>
                    </ul>
                </div>*/}
                <div box-="square" shear-="top">
                    <div className="header">
                        <span is-="badge" variant-="background2">
                            Suggestions
                        </span>
                        <ShortcutLabel bind="s" />
                    </div>
                    <ul className="suggestions-box flexy-badges" data-layername="suggestions" data-shortcut={`normal,none,s,sectionNavigationLayer`}>
                        {suggestions.map((suggestion, index) => {
                            const visibleSuggestion = suggestion.q.replace(query, '');
                            if (visibleSuggestion.length > 32) return;
                            return <a href={`/search?q=${suggestion.q}`}>
                                <li key={index} is-="button" size-="small" variant-="background1">
                                    {visibleSuggestion}
        </li>
                            </a>;
                        })}
                    </ul>
                </div>
                {/*<div box-="square" shear-="top">
                    <div className="header">
                        <span is-="badge" variant-="background2">
                            Extra content
                        </span>
                        <ShortcutLabel mod="shift" bind="e"/>
                    </div>
                    <p style={{padding:"1lh 1ch"}}>
Dummy text refers to placeholder text used in the design and publishing industries to demonstrate the visual appearance of a document or layout without using meaningful content. It is commonly used in graphic design, web development, and typography to show how text will look in a given format.

One of the most well-known examples of dummy text is Lorem Ipsum, which has been the industry's standard dummy text since the 1500s.
Lorem Ipsum is derived from a corrupted version of a Latin text by Cicero, and it has been used in typesetting since the 1960s, popularized by advertisements for Letraset transfer sheets. It was later introduced to the digital world in the mid-1980s through desktop publishing programs like Aldus PageMaker.

Dummy text is often used to test fonts, layouts, and designs without the distraction of readable content. It helps designers and developers focus on the visual aspects of a page rather than the meaning of the text.
The use of dummy text ensures that the layout and formatting can be evaluated independently of the actual content that will eventually be placed in the design.
                    </p>
                </div>*/}
            </div>
        </div>
        <Footer />
    </>;
}

export default Search;
