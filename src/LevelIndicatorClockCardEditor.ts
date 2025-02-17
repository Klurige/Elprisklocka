import { css, html, LitElement } from 'lit';
import { state } from "lit/decorators/state";
import { Config } from "./Config";

export class LevelIndicatorClockCardEditor extends LitElement {
    _tag = "LevelIndicatorClockCardEditor";

    @state() _config;

    setConfig(config:Config) {
        this._config = config;
    }

    static styles = css`
    .table {
        display: table;
    }
    .row {
        display: table-row;
    }
    .cell {
        display: table-cell;
        padding: 0.5em;
    }
`;

render() {
    return html`
        <form class="table">
            <div class="row">
                <label class="label cell" for="header">Header:</label>
                <input
                    @change="${this.handleChangedEvent}"
                    class="value cell" id="header" value="${this._config.header}"/>
            </div>
            <div class="row">
                <label class="label cell" for="electricity_price">Electricity Price entity:</label>
                <input
                    @change="${this.handleChangedEvent}"
                    class="value cell" id="electricity_price" value="${this._config.electricity_price}"/>
            </div>
           <div class="row">
                <label class="label cell" for="iso_formatted_time">Date and Time (ISO) entity:</label>
                <input
                    @change="${this.handleChangedEvent}"
                    class="value cell" id="iso_formatted_time" value="${this._config.datetimeiso}"/>
            </div>
        </form>
    `;
}

handleChangedEvent(changedEvent) {
    const target = changedEvent.target as HTMLInputElement;
    const newConfig = Object.assign({}, this._config);
    switch (target.id) {
        case "header":
            newConfig.header = changedEvent.target.value;
            break;
        case "electricity_price":
            newConfig.electricity_price = changedEvent.target.value;
            break;
        case "iso_formatted_time":
            newConfig.iso_formatted_time = changedEvent.target.value;
            break;
        default:
            console.log(this._tag,"handleChangedEvent() - unknown event target id");
    }

    const messageEvent = new CustomEvent("config-changed", {
        detail: { config: newConfig },
        bubbles: true,
        composed: true,
    });
    this.dispatchEvent(messageEvent);
}

}
