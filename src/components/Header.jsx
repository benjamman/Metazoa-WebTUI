import ShortcutLabel from "./ShortcutLabel";
import SearchForm from "./SearchForm";

function Header({ query }) {
    return <header className="page-header">
       <pre className="logo-mini">
            <pre className="logo-mini">
            <span style={{ color: '#6495ED' }}>{`  _ _    `}</span>
            {`  `}
            <span style={{ color: '#9932CC' }}>{`_____`}</span>
            {`  `}
            <span style={{ color: '#9932CC' }}>{`—–`}</span>
            {`\n `}
            <span style={{ color: '#6495ED' }}>{`//\\/\\`}</span>
            <span style={{ color: '#4682B4' }}>{`etazoa`}</span>
            {` `}
            <span style={{ color: '#9932CC' }}>{`||`}</span>
            <span style={{ color: '#8A2BE2' }}>{`|U|`}</span>
            <span style={{ color: '#9932CC' }}>{`||`}</span>
            {`\n`}
            <span style={{ color: '#6495ED' }}>{`/`}</span>
            <span style={{ color: '#6495ED' }}>{`/ /\\ \\`}</span>
            {`  `}
            <span style={{ color: '#ADD8E6' }}>web</span>
            {` `}
            <span style={{ color: '#9932CC' }}>{`L|`}</span>
            <span style={{ color: '#8A2BE2' }}>{`\`-'`}</span>
            <span style={{ color: '#9932CC' }}>{`–—`}</span>
        </pre>
        </pre>
        <div box-="square" shear-="top">
            <div className="header">
                <span is-="badge" variant-="background2">
                    About 
                </span>
                <ShortcutLabel bind="a" />
            </div>
            <ul data-layername="about" data-shortcut={`normal,none,a,sectionNavigationLayer`}>
                <li is-="badge" variant-="background0">
                    <a href="/">Home</a>
                </li>
                <li is-="badge" variant-="background0">
                    <a href="https://github.com/benjamman/metazoa-webtui">Github</a>
                </li>
                <li is-="badge" variant-="background0">
                    <a href="https://github.com/webtui/webtui">WebTUI</a>
                </li>
                <li is-="badge" variant-="background0">
                    <a href="https://github.com/FusedFrameworks/metazoa-js">Metazoa</a>
                </li>
                {/*<li is-="badge" variant-="background0">
                    <a href="/settings">Settings</a>
                </li>*/}
            </ul>
        </div>
        <SearchForm query={query} />
    </header>;
}

export default Header;
