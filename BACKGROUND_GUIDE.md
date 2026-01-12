# Background & Aesthetic Adjustment Guide

This guide explains how to modify the global background colors, the radial gradient, and the coarse matte texture.

## 1. Global Color Variables
All primary colors are defined as CSS variables in the `:root` section of `app/globals.css`.

- **To Change the Brand Teal**: Modify `--teal-primary`.
- **To Change the Gold Accent**: Modify `--gold-accent`.
- **To Change the Main Background Visibility**: The `--background` variable is set to `transparent` to show the body's gradient. If you want a solid color again, change this back to a color value.

```css
:root {
  --teal-primary: #077D93;
  --gold-accent: #D0A933;
  --background: transparent;
}
```

## 2. Radial Gradient & Base Color
The main background effect is applied to the `body` in `app/globals.css`.

### Base Color
The `background-color` acts as the darkest shade at the edges of the screen where the gradient fades to transparent.
```css
body {
  background-color: #04414d; /* Change this for darker/lighter edges */
}
```

### Radial Gradient Steps
The `background-image` defines the lighting effect.
```css
background-image: 
  radial-gradient(circle at 50% 50%, 
    rgba(255, 255, 255, 0.25) 0%,   /* Center Highlight (Whiteness) */
    rgba(7, 125, 147, 0.6) 40%,    /* Midtone (Teal) */
    transparent 80%                /* Fallback to Base Color */
  );
```
- **Center "Whiteness"**: Increase the opacity (`0.25`) to make the center brighter, or change the `255, 255, 255` RGB values to a different color.
- **Gradient Spread**: Change the percentage values (`40%`, `80%`) to make the center light area larger or smaller.

## 3. Matte Coarse Texture
The grain effect is controlled by the `body::before` pseudo-element.

### Texture Intensity
Modify the `opacity` to make the grain more or less "visible".
```css
body::before {
  opacity: 0.035; /* Increase to ~0.06 for a very heavy grain */
}
```

### Texture Coarseness
Modify the `baseFrequency` in the SVG URL.
- **Lower Number (e.g., 0.4)**: Larger, softer grain.
- **Higher Number (e.g., 0.9)**: Smaller, sharper "sand-like" grain.
```css
background-image: url("...baseFrequency='0.85'...");
```

## 4. Navbar Transparency
The Navbar is designed to allow the gradient to show through. If you change the background colors, you might want to adjust its blur or border.

In `components/Navbar.tsx`:
- **Blur Intensity**: Change `backdrop-blur-sm` to `backdrop-blur-md` or `backdrop-blur-lg`.
- **Border Visibility**: Change `border-white/5` to a higher value like `border-white/20` if the background becomes lighter.
