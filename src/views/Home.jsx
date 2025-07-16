import Header from "../components/Header";
import ShortcutLabel from "../components/ShortcutLabel";
import StatusLine from "../components/StatusLine";

function Home() {
    return <>
        <StatusLine />
        <Header />

        <br/>
        <h1>Welcome!</h1>
        <p>This is a WebTUI client for Metazoa, a WIP meta engine library.</p>
        <br />
        <p>
            Please contact me if shortcuts mis-behave. They do sometimes visibly stick, that's fine for now, 
            it's a bug but only cosmetic. I've been told of issues that I can't seem to reproduce, 
            if you do contact me, please include steps to reproduce and if there's errors also the console output. 
            Thank you!
        </p>
        <br />
        <p>
            Mostly functional. There is some cosmetic imperfections and probably unhandled errors.
            The underlying Metazoa library is pre-alpha software which causes some problems. 
            But, h(e|a)ck, this is a hackathon entry! if it wasn't jank it would be out of place. We ballin'!
        </p>
        <br />
        <p>
            Another thing is that this is all SSR, I'd like to fix that, but it was just easier at the time...
            There's some things that could really slow down the server, and the client needs so much JS anway.
        </p>
        <br />
        <h2>Todo</h2>
        <ul style={{ color: "var(--foreground2)" }}>
            <li>Use proxies</li>
            <li>Fix Google search</li>
            <span>^ These two are essential. Both require a Metazoa patch.</span>
            <li>Bug report section</li>
            <li>Footer component</li>
            <li>Fix shortcut labels on {'<'}TextArticle/{'>'}. Why do they look like that??</li>
            <li>Fix focus bug when typing in search</li>
            <span>^ If you click the search bar <i>*pfft using the mouse*</i> then press <ShortcutLabel bind="a"/>, for example, it will remove focus from the search bar because they layer was never set. I should add a way to use [data-trigger-shortcut="onclick,focus search"] and then name shortcuts e.g. "focus search".</span>
            <li>Don't highlihgt shortcuts from other layers</li>
            <li>Better anchoer highlight</li>
            <li>Filters (safesearch)</li>
            <span>^ Metazoa needs implementation</span>
            <li>Image Search</li>
            <li>Themes</li>
            <li>Settings</li>
            <li>Backgrounds</li>
            <span>^ Very important if you don't have your anime wallpaer what are you doing??</span>
            <li>A little boot animation when you load the page. It would cover up the visual content shift.</li>
            <li>Docs/Wiki</li>
            <li>Warn on weird searches</li>
            <span>^ What I mean is when someone spells "mario" with a million 'a's. It's wasted bandwidth, and so before searching it should popover with "Hey! Your search query seems sub-optimal. Would you like us to help with that?" and fixup spelling and term optimization. Like don't do this all the time, that would be more obnoxious. But just when extreme, or on hotkey press.</span>
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
