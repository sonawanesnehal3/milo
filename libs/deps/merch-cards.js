// Wed, 22 Nov 2023 13:50:06 GMT
import{html as p,LitElement as V}from"./lit-all.min.js";import{unsafeHTML as I}from"./lit-all.min.js";var b=class{constructor(e,t){this.key=Symbol("match-media-key"),this.matches=!1,this.host=e,this.host.addController(this),this.media=window.matchMedia(t),this.matches=this.media.matches,this.onChange=this.onChange.bind(this),e.addController(this)}hostConnected(){var e;(e=this.media)==null||e.addEventListener("change",this.onChange)}hostDisconnected(){var e;(e=this.media)==null||e.removeEventListener("change",this.onChange)}onChange(e){this.matches!==e.matches&&(this.matches=e.matches,this.host.requestUpdate(this.key,!this.matches))}};var z="hashchange";function F(n=window.location.hash){let e=[],t=n.replace(/^#/,"").split("&");for(let r of t){let[a,s=""]=r.split("=");a&&e.push([a,decodeURIComponent(s)])}return Object.fromEntries(e)}function f(n){let e=new URLSearchParams(window.location.hash.slice(1));Object.entries(n).forEach(([t,r])=>{r?e.set(t,r):e.delete(t)}),e.sort(),window.location.hash=decodeURIComponent(e.toString())}function A(n){let e=t=>{let r=F(window.location.hash);n(r)};return e(),window.addEventListener(z,e),()=>{window.removeEventListener(z,e)}}var S="(max-width: 899px)",R="(max-width: 1200px)",d="(min-width: 900px)",h="(min-width: 1200px)",v="(min-width: 1440px)";var L=document.createElement("style"),x=n=>`
@media screen and ${S} {
    .one-merch-card.${n},
    .two-merch-cards.${n},
    .three-merch-cards.${n},
    .four-merch-cards.${n} {
        grid-template-columns: var(--consonant-merch-card-${n}-width);
    }
}

/* Tablet */
@media screen and ${d} {
    :root {
        --consonant-merch-card-special-offer-width: 302px;
        --consonant-merch-card-catalog-width: 302px;
        --consonant-merch-card-plans-width: 302px;
    }

    .two-merch-cards.${n},
    .three-merch-cards.${n},
    .four-merch-cards.${n} {
        gap: var(--consonant-merch-spacing-m);
        grid-template-columns: repeat(2, var(--consonant-merch-card-${n}-width));
    }
}

/* desktop */
@media screen and ${h} {
    :root {
        --consonant-merch-card-special-offer-width: 378px;
        --consonant-merch-card-catalog-width: 276px;
        --consonant-merch-card-plans-width: 276px;
    }

    .three-merch-cards.${n},
    .four-merch-cards.${n} {
        grid-template-columns: repeat(3, var(--consonant-merch-card-${n}-width));
    }
}

/* Large desktop */
    @media screen and ${v} {
    .four-merch-cards.${n} {
        grid-template-columns: repeat(4, var(--consonant-merch-card-${n}-width));
    }
}
`;L.innerHTML=`
:root {

    --consonant-merch-card-detail-font-size: 12px;
    --consonant-merch-card-detail-font-weight: 500;
    --consonant-merch-card-detail-letter-spacing: 0.8px;
    --consonant-merch-card-background-color: #fff;

    --consonant-merch-card-heading-font-size: 18px;
    --consonant-merch-card-heading-line-height: 22.5px;
    --consonant-merch-card-heading-secondary-font-size: 14px;
    --consonant-merch-card-body-font-size: 14px;
    --consonant-merch-card-body-line-height: 21px;

    /* responsive width */
    --consonant-merch-card-mobile-width: 300px;

    /* spacing */
    --consonant-merch-spacing-xxxs: 4px;
    --consonant-merch-spacing-xxs: 8px;
    --consonant-merch-spacing-xs: 16px;
    --consonant-merch-spacing-s: 24px;
    --consonant-merch-spacing-m: 32px;

    /* headings */
    --consonant-merch-card-heading-xs-font-size: 18px;
    --consonant-merch-card-heading-xs-line-height: 22.5px;
    --consonant-merch-card-heading-s-font-size: 20px;
    --consonant-merch-card-heading-s-line-height: 25px;
    --consonant-merch-card-heading-m-font-size: 24px;
    --consonant-merch-card-heading-m-line-height: 30px;
    --consonant-merch-card-heading-l-font-size: 20px;
    --consonant-merch-card-heading-l-line-height: 30px;
    --consonant-merch-card-heading-xl-font-size: 36px;
    --consonant-merch-card-heading-xl-line-height: 45px;

    /* detail */
    --consonant-merch-card-detail-m-font-size: 12px;
    --consonant-merch-card-detail-m-line-height: 15px;
    --consonant-merch-card-detail-m-font-weight: 700;
    --consonant-merch-card-detail-m-letter-spacing: 1px;

    /* body */
    --consonant-merch-card-body-xxs-font-size: 12px;
    --consonant-merch-card-body-xxs-line-height: 18px;
    --consonant-merch-card-body-xxs-letter-spacing: 1px;
    --consonant-merch-card-body-xs-font-size: 14px;
    --consonant-merch-card-body-xs-line-height: 21px;
    --consonant-merch-card-body-m-font-size: 18px;
    --consonant-merch-card-body-m-line-height: 27px;
    --consonant-merch-card-body-l-font-size: 20px;
    --consonant-merch-card-body-l-line-height: 30px;
    --consonant-merch-card-body-xl-font-size: 22px;
    --consonant-merch-card-body-xl-line-height: 33px;


    --consonant-merch-card-heading-padding: 0;
    --consonant-merch-card-image-height: 180px;

    /* colors */
    --consonant-merch-card-border-color: #eaeaea;
    --color-accent: #1473E6;
    --merch-color-grey-80: #2c2c2c;

    /* merch card generic */
    --consonant-merch-card-max-width: 378px;

    /* special offers mobile */
    --consonant-merch-card-special-offer-width: 300px;

    /* special offers */
    --consonant-merch-card-special-offers-width: 378px;

    /* segment */
    --consonant-merch-card-segment-width: 378px;

    /* inline-heading */
    --consonant-merch-card-inline-heading-width: 378px;

    /* plans */
    --consonant-merch-card-plans-width: 300px;
    --consonant-merch-card-plans-icon-size: 40px;

    /* catalog */
    --consonant-merch-card-catalog-width: 276px;
    --consonant-merch-card-catalog-icon-size: 40px;

    /* inline SVGs */
    --checkmark-icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xml:space='preserve' viewBox='0 0 10 10'%3E%3Cpath fill='%23fff' d='M3.788 9A.999.999 0 0 1 3 8.615l-2.288-3a1 1 0 1 1 1.576-1.23l1.5 1.991 3.924-4.991a1 1 0 1 1 1.576 1.23l-4.712 6A.999.999 0 0 1 3.788 9z' class='spectrum-UIIcon--medium'/%3E%3C/svg%3E%0A");

    --secure-icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xml:space='preserve' width='10' height='10' fill='%23757575' viewBox='0 0 12 15'%3E%3Cpath d='M11.5 6H11V5A5 5 0 1 0 1 5v1H.5a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5ZM3 5a3 3 0 1 1 6 0v1H3Zm4 6.111V12.5a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1.389a1.5 1.5 0 1 1 2 0Z'/%3E%3C/svg%3E");

    --ellipsis-icon: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" data-name="Group 308011"><circle cx="2" cy="2" r="2" fill="%232c2c2c" data-name="Ellipse 70" transform="translate(6 6)"/><circle cx="2" cy="2" r="2" fill="%232c2c2c" data-name="Ellipse 71" transform="translate(12 6)"/><circle cx="2" cy="2" r="2" fill="%232c2c2c" data-name="Ellipse 72" transform="translate(0 6)"/></svg>');

}

merch-cards {
    display: contents;
}

merch-cards > p[slot],
merch-cards > div[slot] p {
    margin: 0;
}

.one-merch-card,
.two-merch-cards,
.three-merch-cards,
.four-merch-cards {
    display: grid;
    justify-content: center;
    justify-items: center;
    gap: var(--spacing-m);
}

@media screen and ${h} {
    .one-merch-card,
    .two-merch-cards,
    .three-merch-cards,
    .four-merch-cards {
        padding: var(--spacing-m);
    }
}

div[class$='-badge'] {
    position: absolute;
    top: 16px;
    right: 0;
    font-size: var(--type-heading-xxs-size);
    font-weight: 500;
    max-width: 150px;
    line-height: 16px;
    text-align: center;
    padding: 8px 11px;
    border-radius: 5px 0 0 5px;
}

merch-card.background-opacity-70 {
    background-color: rgba(255 255 255 / 70%);
}

merch-card hr {
    background-color: var(--color-gray-200);
    border: none;
    height: 1px;
    width: 100%;
    margin-bottom: var(--consonant-merch-card-spacing-xs);
}

merch-card.has-divider hr {
    margin-bottom: var(--spacing-xxs);
}

merch-card[variant="special-offers"] span[is="inline-price"][data-template="priceStrikethrough"] {
    font-size: var(--consonant-merch-card-body-xs-font-size);
}

merch-card p, merch-card h3, merch-card h4 {
    margin: 0;
}

merch-card span[is=inline-price] {
    display: inline-block;
}

merch-card [slot='heading-xs'] {
    font-size: var(--consonant-merch-card-heading-xs-font-size);
    line-height: var(--consonant-merch-card-heading-xs-line-height);
    margin: 0;
    margin-bottom: var(--consonant-merch-spacing-xxs);
    color: var(--merch-color-grey-80);
}

merch-card [slot='heading-s'] {
    font-size: var(--consonant-merch-card-heading-s-font-size);
    line-height: var(--consonant-merch-card-heading-s-line-height);
    margin: 0;
    color: var(--merch-color-grey-80);
}

merch-card [slot='heading-m'] {
    font-size: var(--consonant-merch-card-heading-m-font-size);
    line-height: var(--consonant-merch-card-heading-m-line-height);
    margin: 0;
    color: var(--merch-color-grey-80);
}

merch-card [slot='heading-l'] {
    font-size: var(--consonant-merch-card-heading-l-font-size);
    line-height: var(--consonant-merch-card-heading-l-line-height);
    margin: 0;
    color: var(--merch-color-grey-80);
}

merch-card [slot='heading-xl'] {
    font-size: var(--consonant-merch-card-heading-xl-font-size);
    line-height: var(--consonant-merch-card-heading-xl-line-height);
    margin: 0;
    color: var(--merch-color-grey-80);
}

merch-card [slot='detail-m'] {
    font-size: var(--consonant-merch-card-detail-m-font-size);
    letter-spacing: var(--consonant-merch-card-detail-m-letter-spacing);
    font-weight: var(--consonant-merch-card-detail-m-font-weight);
    text-transform: uppercase;
    margin: 0;
    color: var(--merch-color-grey-80);
}

merch-card [slot="body-xxs"] {
    font-size: var(--consonant-merch-card-body-xxs-font-size);
    line-height: var(--consonant-merch-card-body-xxs-line-height);
    font-weight: normal;
    letter-spacing: var(--consonant-merch-card-body-xxs-letter-spacing);
    color: var(--merch-color-grey-80);
}

merch-card [slot="body-xs"] {
    font-size: var(--consonant-merch-card-body-xs-font-size);
    line-height: var(--consonant-merch-card-body-xs-line-height);
    color: var(--merch-color-grey-80);
}

merch-card [slot="body-m"] {
    font-size: var(--consonant-merch-card-body-m-font-size);
    line-height: var(--consonant-merch-card-body-m-line-height);
    color: var(--merch-color-grey-80);
}

merch-card [slot="body-l"] {
    font-size: var(--consonant-merch-card-body-l-font-size);
    line-height: var(--consonant-merch-card-body-l-line-height);
    color: var(--merch-color-grey-80);
}

merch-card [slot="body-xl"] {
    font-size: var(--consonant-merch-card-body-xl-font-size);
    line-height: var(--consonant-merch-card-body-xl-line-height);
    color: var(--merch-color-grey-80);
}

merch-card[variant="catalog"] [slot="action-menu-content"] {
    background-color: #000;
    color: var(--color-white, #fff);
    font-size: var(--consonant-merch-card-body-xs-font-size);
    width: fit-content;
    padding: var(--consonant-merch-spacing-xs);
    border-radius: var(--consonant-merch-spacing-xxxs);
    position: absolute;
    top: 55px;
    right: 15px;
    line-height: var(--consonant-merch-card-body-line-height);
}

merch-card[variant="catalog"] [slot="action-menu-content"] ul {
    padding-left: 0;
    padding-bottom: var(--consonant-merch-spacing-xss);
    margin-top: 0;
    margin-bottom: 0;
    list-style-position: inside;
    list-style-type: '\u2022 ';
}

merch-card[variant="catalog"] [slot="action-menu-content"] ul li {
    padding-left: 0;
    line-height: var(--consonant-merch-card-body-line-height);
}

merch-card[variant="catalog"] [slot="action-menu-content"] ::marker {
    margin-right: 0;
}

merch-card[variant="catalog"] [slot="action-menu-content"] p {
    color: var(--color-white, #fff);
}

merch-card[variant="catalog"] [slot="action-menu-content"] a {
    color: var(--consonant-merch-card-background-color);
    text-decoration: underline;
}

.button--inactive {
    display: none;
}

div[slot="footer"] a.con-button {
    margin-left: var(--consonant-merch-spacing-xs);
}

div[slot='bg-image'] img {
    position: relative;
    width: 100%;
    min-height: var(--consonant-merch-card-image-height);
    max-height: var(--consonant-merch-card-image-height);
    object-fit: cover;
}

/* grid styles for legacy cards */
@media screen and ${S} {
    .one-merch-card,
    .two-merch-cards,
    .three-merch-cards,
    .four-merch-cards {
        grid-template-columns: var(--consonant-merch-card-max-width);
    }
}

/* Tablet */
@media screen and ${d} {
    .two-merch-cards,
    .three-merch-cards,
    .four-merch-cards {
        grid-template-columns: repeat(2, var(--consonant-merch-card-max-width));
    }
}

/* desktop */
@media screen and ${h} {
    .three-merch-cards,
    .four-merch-cards {
        grid-template-columns: repeat(3, var(--consonant-merch-card-max-width));
    }
}

/* supported cards */
${x("special-offers")}
${x("catalog")}
${x("plans")}
${x("segment")}
${x("inline-heading")}

`;document.head.appendChild(L);import{html as i,LitElement as W}from"./lit-all.min.js";import{css as $,unsafeCSS as m}from"./lit-all.min.js";var O=$`
    :host {
        position: relative;
        display: flex;
        flex-direction: column;
        height: 100%;
        flex: 1 1 0;
        text-align: left;
        border-radius: var(--consonant-merch-spacing-xxxs);
        background-color: var(--consonant-merch-card-background-color);
        overflow: auto;
        grid-template-columns: repeat(auto-fit, minmax(300px, max-content));
        background-color: var(--consonant-merch-card-background-color);
        font-family: var(--body-font-family, 'Adobe Clean');
        border-radius: var(--consonant-merch-spacing-xs);
        border: 1px solid var(--consonant-merch-card-border-color);
    }

    .invisible {
        visibility: hidden;
    }

    :host(:hover) .invisible {
        visibility: visible;
        background-image: var(--ellipsis-icon);
        cursor: pointer;
    }

    slot {
        display: block;
    }

    .top-section {
        display: flex;
        justify-content: flex-start;
        flex-flow: wrap;
        align-items: center;
    }

    .top-section > .icons img:last-child {
        margin-right: var(--consonant-merch-spacing-xs);
    }

    .icons {
        display: flex;
        width: fit-content;
        fle-direction: row;
    }

    .icons img {
        width: var(--consonant-merch-card-plans-icon-size);
        height: var(--consonant-merch-card-plans-icon-size);
        margin-right: var(--consonant-merch-spacing-xxs);
    }

    .body {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        height: 100%;
        flex-direction: column;
        gap: var(--consonant-merch-spacing-xxs);
        padding: var(--consonant-merch-spacing-xs);
    }

    footer {
        display: flex;
        justify-content: flex-end;
        box-sizing: border-box;
        width: 100%;
        padding: var(--consonant-merch-spacing-xs);
    }

    hr {
        background-color: var(--color-gray-200);
        border: none;
        height: 1px;
        width: auto;
        margin-top: 0;
        margin-bottom: 0;
        margin-left: var(--consonant-merch-spacing-xs);
        margin-right: var(--consonant-merch-spacing-xs);
    }

    div[class$='-ribbon'] {
        position: absolute;
        top: 16px;
        right: 0;
        font-size: var(--type-heading-xxs-size);
        font-weight: 500;
        max-width: 150px;
        line-height: 16px;
        text-align: center;
        padding: 8px 11px;
        border-radius: 5px 0 0 5px;
    }

    .body .catalog-ribbon {
        display: flex;
        height: fit-content;
        flex-direction: column;
        width: fit-content;
        border-radius: 5px;
        position: relative;
        top: 0;
        margin-left: var(--consonant-merch-spacing-xxs);
    }

    .detail-bg-container {
        right: 0;
        padding: var(--consonant-merch-spacing-xs);
        border-radius: 5px;
        font-size: var(--consonant-merch-card-body-font-size);
        margin: var(--consonant-merch-spacing-xs);
    }

    .action-menu {
        display: flex;
        width: 32px;
        height: 32px;
        position: absolute;
        top: 16px;
        right: 16px;
        background-color: #f6f6f6;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 16px 16px;
    }
    .hidden {
        visibility: hidden;
    }

    #stock-checkbox,
    .secure-transaction-label {
        font-size: var(--consonant-merch-card-body-xxs-font-size);
        line-height: 1.3;
        color: var(--color-gray-600);
    }

    #stock-checkbox {
        display: inline-flex;
        align-items: center;
        cursor: pointer;
        gap: 10px; /*same as spectrum */
    }

    #stock-checkbox > input {
        display: none;
    }

    #stock-checkbox > span {
        display: inline-block;
        box-sizing: border-box;
        border: 2px solid rgb(117, 117, 117);
        border-radius: 2px;
        width: 14px;
        height: 14px;
    }

    #stock-checkbox > input:checked + span {
        background: var(--checkmark-icon) no-repeat var(--color-accent);
        border-color: var(--color-accent);
    }

    .secure-transaction-label {
        white-space: nowrap;
        display: inline-flex;
        gap: var(--consonant-merch-spacing-xxs);
        align-items: center;
        flex: 1;
    }

    .secure-transaction-label::before {
        display: inline-block;
        content: '';
        width: 12px;
        height: 15px;
        background: var(--secure-icon) no-repeat;
        background-position: center;
        background-size: contain;
    }

    .checkbox-container {
        display: flex;
        align-items: center;
        gap: var(--consonant-merch-spacing-xxs);
    }

    .checkbox-container input[type='checkbox']:checked + .checkmark {
        background-color: var(--color-accent);
        background-image: var(--checkmark-icon);
        border-color: var(--color-accent);
    }

    .checkbox-container input[type='checkbox'] {
        display: none;
    }

    .checkbox-container .checkmark {
        position: relative;
        display: inline-block;
        width: 12px;
        height: 12px;
        border: 2px solid #757575;
        background: #fff;
        border-radius: 2px;
        cursor: pointer;
        margin-top: 2px;
    }

    :host(:not([variant])) {
        max-width: 378px;
        width: 100%;
    }

    :host([variant='special-offers']) {
        min-height: 454px;
        width: 378px;
    }

    :host([variant='special-offers'].center) {
        text-align: center;
    }

    /* catalog */
    :host([variant='catalog']) {
        width: var(--consonant-merch-card-catalog-width);
        min-height: 296px;
    }

    /* plans */
    :host([variant='plans']) {
        width: var(--consonant-merch-card-plans-width);
        min-height: 348px;
    }

    :host([variant='segment']) {
        width: var(--consonant-merch-card-segment-width);
    }

    :host([variant='special-offers']) {
        width: var(--consonant-merch-card-special-offers-width);
    }

    :host([variant='inline-heading']) {
        width: var(--consonant-merch-card-inline-heading-width);
    }
`,u=(n,e=!0)=>{let t=[$`
        /* Tablet */
        @media screen and ${m(d)} {
            :host([variant='${m(n)}'][size='wide']),
            :host([variant='${m(n)}'][size='super-wide']) {
                grid-column: span 2;
                width: 100%;
            }
        }

        /* Laptop */
        @media screen and ${m(h)} {
            :host([variant='${m(n)}'][size='super-wide']) {
                grid-column: span 3;
            }
        `];return e&&t.push($`
            /* Large desktop */
            @media screen and ${m(v)} {
                :host([variant='${m(n)}'][size='super-wide']) {
                    grid-column: span 4;
                }
            }
        `),t};var[E,T,M,B,_,N]=["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Enter","Tab"];var y="MERCH-CARD",K="merch-card",C=class extends W{static properties={name:{type:String},variant:{type:String,reflect:!0},size:{type:String,attribute:"size",reflect:!0},badgeColor:{type:String,attribute:"badge-color"},badgeBackgroundColor:{type:String,attribute:"badge-background-color"},badgeText:{type:String,attribute:"badge-text"},icons:{type:Array},actionmenu:{type:Boolean,attribute:"action-menu"},actionMenuContent:{type:String,attribute:"action-menu-content"},title:{type:String},description:{type:String},customHr:{type:Boolean,attribute:"custom-hr"},detailBg:{type:String,attribute:"detail-bg"},secureLabel:{type:String,attribute:"secure-label"},checkboxLabel:{type:String,attribute:"checkbox-label"},stockOfferOsis:{type:Object,attribute:"stock-offer-osis",converter:{fromAttribute:e=>{let[t,r,a]=e.split(",");return{PUF:t,ABM:r,M2M:a}}}},filters:{type:String,reflect:!0,converter:{fromAttribute:e=>Object.fromEntries(e.split(",").map(t=>{let[r,a,s]=t.split(":"),c=Number(a);return[r,{order:isNaN(c)?void 0:c,size:s}]})),toAttribute:e=>Object.entries(e).map(([t,{order:r,size:a}])=>[t,r,a].filter(s=>s!=null).join(":")).join(",")}},types:{type:String,attribute:"types",reflect:!0}};static styles=[O,...u("plans"),...u("catalog"),...u("special-offers",!1),...u("segment",!1),...u("inline-heading")];constructor(){super(),this.filters={},this.types=""}updated(e){e.has("badgeBackgroundColor")&&(this.style.border=`1px solid ${this.badgeBackgroundColor}`)}renderIcons(){return this.icons&&this.icons.length>0?i`
                  <div class="icons">
                      ${this.icons.map(e=>i`<img src="${e.src}" alt="${e.alt}" />`)}
                  </div>
              `:""}get evergreen(){this.classList.contains("intro-pricing")}get stockCheckbox(){return this.checkboxLabel?i`<label id="stock-checkbox">
                    <input type="checkbox" @change=${this.toggleStockOffer}></input>
                    <span></span>
                    ${this.checkboxLabel}
                </label>`:""}get plansFooter(){let e=this.secureLabel?i`<span class="secure-transaction-label"
                  >${this.secureLabel}</span
              >`:"";return i`<footer>${e}<slot name="footer"></slot></footer>`}get ribbon(){let e;if(!(!this.badgeBackgroundColor||!this.badgeColor||!this.badgeText))return this.evergreen&&(e=`border: 1px solid ${this.badgeBackgroundColor}; border-right: none;`),i`
            <div
                class="${this.variant}-ribbon"
                style="background-color: ${this.badgeBackgroundColor};
                    color: ${this.badgeColor};
                    ${e}"
            >
                ${this.badgeText}
            </div>
        `}get headingmMSlot(){return this.shadowRoot.querySelector('slot[name="heading-m"]').assignedElements()[0]}get footerSlot(){return this.shadowRoot.querySelector('slot[name="footer"]').assignedElements()[0]}get price(){return this.headingmMSlot?.querySelector('span[is="inline-price"]')}get checkoutLinks(){return[...this.footerSlot?.querySelectorAll('a[is="checkout-link"]')??[]]}toggleStockOffer(e){if(!this.stockOfferOsis)return;let t=this.checkoutLinks;t.length!==0&&t.forEach(r=>{let a=r.value?.offers?.[0]?.planType;if(!a)return;let s=this.stockOfferOsis[a];if(!s)return;let c=r.dataset.wcsOsi.split(",").filter(o=>o!==s);e.target.checked&&c.push(s),r.dataset.wcsOsi=c.join(",")})}toggleActionMenu(e){let t=e?.type==="mouseleave"?!0:void 0,r=this.shadowRoot.querySelector('slot[name="action-menu-content"]');r&&r.classList.toggle("hidden",t)}get title(){return this.querySelector('[slot="heading-xs"]').textContent.trim()}updateFilters(e){let t={...this.filters};Object.keys(t).forEach(r=>{if(e){t[r].order=Math.min(t[r].order,2);return}let a=t[r].order;a===1||isNaN(a)||(t[r].order=Number(a)+1)}),this.filters=t}includes(e){return this.textContent.match(new RegExp(e,"i"))!==null}render(){switch(this.variant){case"special-offers":return this.renderSpecialOffer();case"segment":return this.renderSegment();case"plans":return this.renderPlans();case"catalog":return this.renderCatalog();case"inline-heading":return this.renderInlineHeading();default:return this.renderDefault()}}renderSpecialOffer(){return i` <div class="image">
                <slot name="bg-image"></slot>
                ${this.ribbon}
            </div>
            <div class="body">
                <slot name="detail-m"></slot>
                <slot name="heading-xs"></slot>
                <slot name="body-xs"></slot>
            </div>
            ${this.evergreen?i`
                      <div
                          class="detail-bg-container"
                          style="background: ${this.detailBg}"
                      >
                          <slot name="detail-bg"></slot>
                      </div>
                  `:i`
                      <hr />
                      <footer><slot name="footer"></slot></footer>
                  `}`}renderSegment(){return i` ${this.ribbon}
            <div class="body">
                <slot name="heading-xs"></slot>
                <slot name="body-xs"></slot>
            </div>
            <hr />
            <footer><slot name="footer"></slot></footer>`}renderPlans(){return i` ${this.ribbon}
            <div class="body">
                ${this.renderIcons()}
                <slot name="heading-xs"></slot>
                <slot name="heading-m"></slot>
                <slot name="body-xxs"></slot>
                <slot name="body-xs"></slot>
                ${this.stockCheckbox}
            </div>
            ${this.plansFooter}`}renderCatalog(){return i` <div class="body">
                <div class="top-section">
                    ${this.renderIcons()} ${this.ribbon}
                    <div
                        class="action-menu ${this.actionmenu?"invisible":"hidden"}"
                        @click="${this.toggleActionMenu}"
                    ></div>
                </div>
                <slot
                    name="action-menu-content"
                    class="action-menu-content ${this.actionMenuContent?"":"hidden"}"
                    >${this.actionMenuContent}</slot
                >
                <slot name="heading-xs"></slot>
                <slot name="heading-m"></slot>
                <slot name="body-xxs"></slot>
                <slot name="body-xs"></slot>
            </div>
            <footer><slot name="footer"></slot></footer>`}renderInlineHeading(){return i`
            ${this.ribbon}
            <div class="body">
                <div class="top-section">
                    ${this.renderIcons()}
                    <slot name="heading-xs"></slot>
                </div>
                <slot name="body-xs"></slot>
            </div>
            ${this.customHr?"":i`<hr />`}
            <footer><slot name="footer"></slot></footer>
        `}renderDefault(){return i` ${this.ribbon}
            <div class="body">
                ${this.renderIcons()}
                <slot name="heading-xs"></slot>
                <slot name="body-xs"></slot>
            </div>
            <footer><slot name="footer"></slot></footer>`}connectedCallback(){super.connectedCallback(),this.setAttribute("tabindex","0"),this.addEventListener("keydown",this.keydownHandler),this.addEventListener("mouseleave",this.toggleActionMenu)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("keydown",this.keydownHandler)}keydownHandler(e){let t=document.activeElement?.closest(y);if(!t)return;function r(U,q){let k=document.elementFromPoint(U,q)?.closest(y);k&&(e.preventDefault(),e.stopImmediatePropagation(),k.focus(),k.scrollIntoView({behavior:"smooth",block:"center"}))}let{x:a,y:s,width:c,height:o}=t.getBoundingClientRect(),l=64;switch(e.code===N?e.shiftKey?E:T:e.code){case E:r(a-l,s);break;case T:r(a+c+l,s);break;case M:r(a,s-l);break;case B:r(a,s+o+l);break;case _:this.footerSlot?.querySelector("a")?.click();break}}};customElements.get(K.toLowerCase())||customElements.define("merch-card",C);var D=(n,e={})=>{n.querySelectorAll("span[data-placeholder]").forEach(t=>{let{placeholder:r}=t.dataset;t.innerText=e[r]??""})};import{css as G,unsafeCSS as P}from"./lit-all.min.js";var H=G`
    #header,
    #resultText,
    #footer {
        grid-column: 1 / -1;
        justify-self: stretch;
        color: var(--merch-color-grey-80);
    }

    sp-theme {
        display: contents;
    }

    #header {
        order: -2;
        display: grid;
        justify-items: baseline;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: auto;
        gap: var(--consonant-merch-spacing-m);
    }

    #searchBar {
        grid-column: 1 / -1;
        width: 100%;
        max-width: 302px;
    }

    #sortButton {
        justify-self: end;
    }

    #footer {
        order: 1000;
    }

    /* tablets */
    @media screen and ${P(d)} {
        #header {
            grid-template-columns: 1fr fit-content(100%) fit-content(100%);
        }

        #searchBar {
            grid-column: span 1;
        }

        #filtersButton {
            grid-column: span 1;
        }

        #sortButton {
            grid-column: span 1;
        }
    }

    /* Laptop */
    @media screen and ${P(h)} {
        #resultText {
            grid-column: span 2;
            order: -3;
        }

        #header {
            grid-column: 3 / -1;
            display: flex;
            justify-content: end;
        }
    }
`;var j="merch-cards",g={alphabetical:"alphabetical",authored:"authored"},Z={filters:[,"resultText","resultsText"],mobile:["noResultsMobileText","searchResultMobileText","searchResultsMobileText"],desktop:["noResultsText","searchResultText","searchResultsText"]},X=(n,{filter:e})=>n.filter(t=>t.filters.hasOwnProperty(e)),J=(n,{types:e})=>e?(e=e.split(","),n.filter(t=>e.some(r=>t.types.includes(r)))):n,Q=n=>n.sort((e,t)=>(e.title??"").localeCompare(t.title??"","en",{sensitivity:"base"})),Y=(n,{filter:e})=>n.sort((t,r)=>r.filters[e]?.order==null||isNaN(r.filters[e]?.order)?-1:t.filters[e]?.order==null||isNaN(t.filters[e]?.order)?1:t.filters[e].order-r.filters[e].order),ee=(n,{search:e})=>e?.length?(e=e.toLowerCase(),n.filter(t=>t.includes(e))):n,w=class extends V{static properties={filter:{type:String,attribute:"filter",reflect:!0},filtered:{type:String,attribute:"filtered"},search:{type:String,attribute:"search",reflect:!0},sort:{type:String,attribute:"sort",default:g.authored,reflect:!0},types:{type:String,attribute:"types",reflect:!0},limit:{type:Number,attribute:"limit"},page:{type:Number,attribute:"page",reflect:!0},singleApp:{type:String,attribute:"single_app"},hasMore:{type:Boolean},resultCount:{type:Number}};mobileAndTablet=new b(this,R);constructor(){super(),this.filter="all",this.hasMore=!1,this.resultCount=0}render(){return p`${this.header}
            <slot></slot>
            ${this.footer} `}updated(e){let t=[...this.children].filter(o=>o.tagName===y);e.has("singleApp")&&this.singleApp&&t.forEach(o=>{o.updateFilters(o.name===this.singleApp)});let r=this.sort===g.alphabetical?Q:Y,s=[X,J,ee,r].reduce((o,l)=>l(o,this),t).map((o,l)=>[o,l]);if(this.resultCount=s.length,this.page&&this.limit){let o=this.page*this.limit;this.hasMore=s.length>o,s=s.filter(([,l])=>l<o)}s.length>0&&(this.cardToScrollTo=s[s.length-1][0]);let c=new Map(s);t.forEach(o=>{c.has(o)?(o.style.order=c.get(o),o.size=o.filters[this.filter]?.size,o.style.removeProperty("display")):(o.style.display="none",o.size=void 0,o.style.removeProperty("order"))}),this.updateComplete.then(()=>{let o=this.shadowRoot.getElementById("resultText")?.firstElementChild?.assignedElements?.()?.[0];o&&D(o,{resultCount:this.resultCount,searchTerm:this.search})})}connectedCallback(){super.connectedCallback(),this.filtered?this.filter=this.filtered:this.startDeeplink(),this.updateComplete.then(()=>{this.prepareShowMore()})}disconnectedCallback(){super.disconnectedCallback(),this.stopDeeplink?.()}get header(){if(!this.filtered)return p`<div id="header">
                <sp-theme theme="spectrum" color="light" scale="medium">
                    ${this.searchBar} ${this.filtersButton} ${this.sortButton}
                </sp-theme>
            </div>
            <div id="resultText">
                <slot name="${this.resultTextSlotName}"></slot>
            </div>`}get footer(){if(!this.filtered)return p`<div id="footer">
            <sp-theme theme="spectrum" color="light" scale="medium">
                ${this.showMoreButton}
            </sp-theme>
        </div>`}get resultTextSlotName(){if(this.resultCount==null)return;let e=this.mobileAndTablet.matches;return Z[this.search?e?"mobile":"desktop":"filters"][Math.min(this.resultCount,2)]}get showMoreButton(){if(this.hasMore)return p`<sp-button
            variant="secondary"
            treatment="outline"
            style="order: 1000;"
            @click="${this.showMore}"
        >
            <slot name="showMoreText"></slot>
        </sp-button>`}get filtersButton(){return this.mobileAndTablet.matches?p` <sp-button
                  id="filtersButton"
                  variant="secondary"
                  treatment="outline"
                  @click="${this.openFilters}"
                  ><slot name="filtersText"></slot
              ></sp-button>`:""}get searchBar(){let e=this.querySelector('[slot="searchText"]')?.textContent.trim();return this.mobileAndTablet.matches?p` <sp-search
                  id="searchBar"
                  placeholder="${e}"
                  ></sp-button>`:""}get sortButton(){if(this.resultCount<=1)return;let e=this.querySelector('[slot="sortText"]')?.textContent.trim(),t=this.querySelector('[slot="popularityText"]')?.textContent.trim(),r=this.querySelector('[slot="alphabeticallyText"]')?.textContent.trim();if(!(e&&t&&r))return;let a=this.sort===g.alphabetical,s=a?"":"selected",c=a?"selected":"";return p`
            <overlay-trigger id="sortButton" placement="bottom" type="hint">
                <sp-button
                    slot="trigger"
                    variant="secondary"
                    treatment="outline"
                    >${e}:
                    ${a?r:t}</sp-button
                >
                <sp-popover slot="click-content" tip>
                    <sp-menu @click="${this.sortChanged}">
                        ${I(`<sp-menu-item
                                value="${g.authored}"
                                ${s}
                                >${t}</sp-menu-item>`)} ${I(`<sp-menu-item
                                value="${g.alphabetical}"
                                ${c}
                                >${r}</sp-menu-item
                            >`)}
                    </sp-menu>
                </sp-popover>
            </overlay-trigger>
        `}sortChanged(e){e.target.value===g.authored?f({sort:void 0}):f({sort:e.target.value})}showMore(){f({page:this.page+1}),setTimeout(()=>{this.scrollToShowMore()},1)}prepareShowMore(){this.page?this.limit=this.limit||24:this.page=1}scrollToShowMore(){this.cardToScrollTo.scrollIntoView({behavior:"smooth"})}startDeeplink(){this.stopDeeplink=A(({filter:e,types:t,sort:r,search:a,single_app:s,page:c})=>{!this.filtered&&e&&e!==this.filter&&setTimeout(()=>{f({page:void 0}),this.page=1},1),this.filtered||(this.filter=e??this.filter),this.types=t??"",this.search=a??"",this.singleApp=s,this.sort=r,this.page=Number(c)||this.page})}openFilters(){let e=document.querySelector("merch-sidenav");e&&e.open()}static styles=[H]};w.SortOrder=g;customElements.get(j)||customElements.define(j,w);export{w as MerchCards};
