import Header from "../components/Header";
import ShortcutLabel from "../components/ShortcutLabel";

function Home() {
    return <>
        <Header />

        <br/>
        <h1>Welcome!</h1>
        <p>This is a WebTUI client for Metazoa, a WIP meta engine library.</p>
        <br />
        <p>
            Mostly functional. There is some cosmetic imperfections and probably unhandled errors.
            The underlying Metazoa library is pre-alpha software which causes some problems. 
            But, h(e|a)ck, this is a hackathon entry! if it wasn't jank it would be out of place. We ballin'!
        </p>
        <br />
        <h2>Todo</h2>
        <ul style={{ color: "var(--foreground2)" }}>
            <li>Statusline</li>
            <li>Use proxies</li>
            <li>Fix Google search</li>
            <span>^ These two are essential. Both require a Metazoa patch.</span>
            <li>Don't highlihgt shortcuts from other layers</li>
            <li>Better anchoer highlihgt</li>
            <li>Filters (safesearch)</li>
            <span>^ Metazoa needs implementation</span>
            <li>Image Search</li>
            <li>Themes</li>
            <li>Settings</li>
            <li>Backgrounds</li>
            <span>^ Very important if you don't have your anime wallpaer what are you doing??</span>
            <li>Docs/Wiki</li>
            <li>More search params</li>
            <span>^ Implement in Metazoa. So much work to be done.</span>
            <li>Single key shortcuts with the same bind as a shortcut with a mod</li>
            <span>^ Algorithm needs to check for shortcuts with a mod and bind first and cancel single key immediately.</span>
        </ul>
        <br/>
        <div box-="square" shear-="top" style={{ width: "36ch" }}>
            <span className="header">
                <span is-="badge" variant-="background2">Contact</span>
                <ShortcutLabel mod="shift" bind="c" />
            </span>
            <address style={{ padding: "1lh 1ch" }} data-layername="contact" data-shortcut={`normal,shift,c,sectionNavigationLayer`}>
                Ben {'<'}<a href="mailto:benjamman@proton.me">benjamman@proton.me</a>{'>'} 
                <br /><br />
                GitHub:{' '}
                <span is-="badge" variant-="background1"><a href="https://github.com/benjamman">benjamman</a></span>
                {','}
                <span is-="badge" variant-="background1"><a href="https://github.com/shipment22">shipment22</a></span>
                <br /><br />
                Discord: <span is-="badge" variant-="background1">shipment22</span> 
            </address>
        </div>
    </>;
}

export default Home;
