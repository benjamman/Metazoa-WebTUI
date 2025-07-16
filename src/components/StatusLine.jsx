import ShortcutLabel from "./ShortcutLabel";

function StatusLine() {
    return <div className="status-line">
        <div>
            <span className="layer-label">
                NORMAL
            </span>
        </div>
        <div>
            {'['}
            {/*<span data-bind-key="h">h</span>*/}
            {' '}
            <span data-bind-key="j">j</span>
            {' '}
            <span data-bind-key="k">k</span>
            {' '}
            {/*<span data-bind-key="l">l</span>*/}
            {']'}
        </div>
    </div>;
}

export default StatusLine;
