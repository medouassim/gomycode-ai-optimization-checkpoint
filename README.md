# Pricing card (Web Component)

Small static demo of a reusable **`<pricing-card>`** custom element: a single plan card with a title, price line, feature list, and call-to-action button. No build step or framework is required.

## Quick start

Open `index.html` in a modern browser (double-click the file, or serve the folder with any static server). The page registers the component and renders one example card.

If you use a local server (recommended for `file://` quirks with modules in some setups):

```bash
npx --yes serve .
```

Then visit the URL the tool prints (often `http://localhost:3000`).

## Project layout

| Path | Purpose |
|------|---------|
| `index.html` | Demo page: page background, imports the component, one sample `<pricing-card>`. |
| `components/pricing-card.js` | Defines `<pricing-card>` and its shadow DOM template + styles. |

## Using `<pricing-card>`

1. Load the script as a module (once per page):

   ```html
   <script type="module" src="./components/pricing-card.js"></script>
   ```

2. Place the element and pass content with attributes and a **named slot** for features:

   ```html
   <pricing-card
     plan-title="Basic Plan"
     price="$9.99"
     price-period="/ month"
     cta-label="Start trial"
   >
     <ul slot="features">
       <li>1 GB storage</li>
       <li>Basic support</li>
       <li>All core features</li>
     </ul>
   </pricing-card>
   ```

### Attributes

| Attribute | Required | Description |
|-----------|----------|-------------|
| `plan-title` | No | Heading text. Defaults to `Plan`. |
| `price` | No | Main price string (for example `$9.99`). Empty if omitted. |
| `price-period` | No | Text after the price (for example `/ month`). Omitted if empty. |
| `cta-label` | No | Button label. Defaults to `Get started`. |

### Features slot

- **Name:** `features`
- **Typical content:** a `<ul>` with `<li>` items. The component styles slotted list items from inside the shadow tree (`::slotted`).

## Theming

Default colors, radius, and shadow are **CSS custom properties** on the component’s `:host`. Override them in your page stylesheet by targeting the tag:

```html
<style>
  pricing-card {
    --pricing-accent: #7c3aed;
    --pricing-accent-hover: #6d28d9;
    --pricing-accent-active: #5b21b6;
    --pricing-radius: 16px;
  }
</style>
```

Available variables include:

- `--pricing-surface`, `--pricing-text`, `--pricing-muted`
- `--pricing-accent`, `--pricing-accent-hover`, `--pricing-accent-active`
- `--pricing-success` (price emphasis color)
- `--pricing-border`, `--pricing-radius`, `--pricing-shadow`, `--pricing-font`

## `::part()` hooks

The shadow template sets `part` attributes so you can style subregions from the light DOM when needed:

```css
pricing-card::part(card) {
  outline: 1px solid red; /* example */
}
```

Parts: `card`, `title`, `price`, `features`, `cta`.

## Browser support

Relies on **Custom Elements**, **Shadow DOM**, **HTML templates**, **ES modules**, and **CSS `::part()` / `::slotted()`**. Use current evergreen browsers (recent Chrome, Firefox, Safari, Edge).

## License

Use and adapt freely for learning or projects unless your course or organization specifies otherwise.
