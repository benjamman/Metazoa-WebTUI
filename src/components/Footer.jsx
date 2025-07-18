import ShortcutLabel from "../components/ShortcutLabel";

function Footer() {
    return <footer className="page-footer">
        <div box-="square" shear-="top" style={{ width: "36ch" }}>
            <span className="header">
                <span is-="badge" variant-="background2">Contact</span>
                <ShortcutLabel mod="shift" bind="c" />
            </span>
            <address style={{ padding: "1lh 1ch" }} data-layername="contact" data-layertype="section-navigation" data-shortcut={`normal,shift,c,sectionNavigationLayer`}>
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
        <div box-="square" shear-="top" style={{ width: "36ch" }}>
            <span className="header">
                <span is-="badge" variant-="background2">Bugs</span>
                <ShortcutLabel mod="shift" bind="b" />
            </span>
            <div style={{ padding: "1lh 1ch" }} data-layername="bugs" data-layertype="section-navigation" data-shortcut={`normal,shift,b,sectionNavigationLayer`}>
                <p>
                    Having issues with this site?
                    <br /><br />
                    <ul>
                        <li><a href="https://github.com/benjamman/Metazoa-WebTUI/issues">Metazoa-WebTUI issues</a></li>
                        <li><a href="https://github.com/webtui/webtui/issues">Metazoa issues</a></li>
                        <li><a href="https://github.com/FusedFrameworks/metazoa-js/issues">WebTUI issues</a></li>
                    </ul>
                </p>
            </div>
        </div>
    </footer>;
}

export default Footer;
