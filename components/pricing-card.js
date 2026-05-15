/**
 * <pricing-card> — reusable pricing plan card as a native Web Component.
 *
 * - Shadow DOM keeps styles isolated from the host page.
 * - Plan name, price, period, and CTA text come from HTML attributes.
 * - Feature bullets are passed in via the named slot "features" (typically a <ul>).
 * - Theme with CSS custom properties on :host (see README).
 */

const template = document.createElement("template");
template.innerHTML = `
  <style>
    /* Default theme tokens; override on <pricing-card> in the light DOM. */
    :host {
      --pricing-surface: #ffffff;
      --pricing-text: #0f172a;
      --pricing-muted: #64748b;
      --pricing-accent: #2563eb;
      --pricing-accent-hover: #1d4ed8;
      --pricing-accent-active: #1e40af;
      --pricing-success: #059669;
      --pricing-border: #e2e8f0;
      --pricing-radius: 12px;
      --pricing-shadow: 0 4px 6px -1px rgb(15 23 42 / 0.08),
        0 10px 15px -3px rgb(15 23 42 / 0.08);
      --pricing-font: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto,
        "Helvetica Neue", Arial, sans-serif;
      display: block;
      font-family: var(--pricing-font);
      color: var(--pricing-text);
      max-width: 320px;
    }

    article {
      background: var(--pricing-surface);
      border: 1px solid var(--pricing-border);
      border-radius: var(--pricing-radius);
      box-shadow: var(--pricing-shadow);
      padding: 1.25rem 1.25rem 1.125rem;
      text-align: left;
    }

    header {
      margin-bottom: 0.75rem;
    }

    h2 {
      margin: 0 0 0.35rem;
      font-size: 1.375rem;
      font-weight: 700;
      letter-spacing: -0.02em;
      line-height: 1.2;
    }

    .price-row {
      margin: 0;
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--pricing-success);
      letter-spacing: -0.01em;
    }

    .price-period {
      font-weight: 500;
      color: var(--pricing-muted);
      font-size: 0.95rem;
    }

    .features-wrap {
      margin: 0.25rem 0 1rem;
    }

    /* Slotted content lives in the light DOM; ::slotted styles it from inside the shadow tree. */
    ::slotted(ul) {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    ::slotted(li) {
      padding: 0.5rem 0;
      border-bottom: 1px solid var(--pricing-border);
      font-size: 0.9375rem;
      color: var(--pricing-text);
    }

    ::slotted(li:last-child) {
      border-bottom: none;
      padding-bottom: 0;
    }

    button {
      width: 100%;
      appearance: none;
      border: none;
      border-radius: 8px;
      background: var(--pricing-accent);
      color: #fff;
      font-family: inherit;
      font-size: 0.9375rem;
      font-weight: 600;
      padding: 0.65rem 1rem;
      cursor: pointer;
      transition: background 0.15s ease, transform 0.08s ease;
    }

    button:hover {
      background: var(--pricing-accent-hover);
    }

    button:active {
      background: var(--pricing-accent-active);
      transform: translateY(1px);
    }

    button:focus-visible {
      outline: 2px solid var(--pricing-accent);
      outline-offset: 2px;
    }
  </style>
  <!-- part="..." exposes hooks for ::part() styling from outside the shadow root -->
  <article part="card">
    <header>
      <h2 part="title"></h2>
      <p class="price-row" part="price">
        <span class="amount"></span>
        <span class="price-period"></span>
      </p>
    </header>
    <div class="features-wrap" part="features">
      <slot name="features"></slot>
    </div>
    <button type="button" part="cta"></button>
  </article>
`;

class PricingCard extends HTMLElement {
  /** Attributes that should trigger a re-sync of text nodes when changed. */
  static get observedAttributes() {
    return ["plan-title", "price", "price-period", "cta-label"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" }).appendChild(template.content.cloneNode(true));
    // Cache shadow DOM nodes we update from attributes (avoids repeated queries).
    this._heading = this.shadowRoot.querySelector("h2");
    this._amount = this.shadowRoot.querySelector(".amount");
    this._period = this.shadowRoot.querySelector(".price-period");
    this._button = this.shadowRoot.querySelector("button");
  }

  connectedCallback() {
    this._syncFromAttributes();
  }

  attributeChangedCallback() {
    this._syncFromAttributes();
  }

  /** Maps declarative attributes onto the shadow template. */
  _syncFromAttributes() {
    const planTitle = this.getAttribute("plan-title") ?? "Plan";
    const price = this.getAttribute("price") ?? "";
    const pricePeriod = this.getAttribute("price-period") ?? "";
    const ctaLabel = this.getAttribute("cta-label") ?? "Get started";

    this._heading.textContent = planTitle;
    this._amount.textContent = price;
    this._period.textContent = pricePeriod ? ` ${pricePeriod}` : "";
    this._button.textContent = ctaLabel;
  }
}

customElements.define("pricing-card", PricingCard);
