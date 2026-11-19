"""One-off: build the TEMPORARY in-app logo and the PWA icons from the banner in Brand/.
Run from the project root:  python -I tools/make-assets.py
The logo is a keyed-out crop of the banner, so it is soft. Replace src/assets/logo.webp with the real logo
(SVG or a clean transparent PNG) and rebuild the icons from the real mark when it arrives."""
import math
from PIL import Image

u = Image.open("Brand/new unipole.png").convert("RGB")
x0, y0, x1, y1 = 848, 42, 1196, 146
crop = u.crop((x0, y0, x1, y1))
W, H = crop.size
logo = Image.new("RGBA", (W, H))
for x in range(W):
    top, bot = u.getpixel((x0 + x, y0 - 8)), u.getpixel((x0 + x, y1 + 8))
    for y in range(H):
        t = y / (H - 1)
        bg = tuple(top[i] * (1 - t) + bot[i] * t for i in range(3))
        p = crop.getpixel((x, y))
        a = max(0.0, min(1.0, (math.dist(p, bg) - 18) / 70))
        if a <= 0:
            continue
        col = tuple(int(max(0, min(255, (p[i] - bg[i] * (1 - a)) / a))) for i in range(3))
        logo.putpixel((x, y), col + (int(a * 255),))
logo.save("src/assets/logo.webp", "WEBP", quality=90, method=6)

# UPES + "School of Computer Science" lockup supplied in design-assets/, trimmed of its empty edge.
upes = Image.open("design-assets/combined new.png").convert("RGBA")
upes = upes.crop(upes.split()[3].point(lambda v: 255 if v > 20 else 0).getbbox())
upes.save("src/assets/upes.webp", "WEBP", lossless=True, method=6)

mark = logo.crop((0, 0, 88, H))  # the mark is the leftmost ~88px
mark = mark.crop(mark.getbbox())


def icon(size, frac):
    a, b = (0x01, 0x3F, 0x96), (0x77, 0x01, 0x9B)  # bright banner gradient, diagonal
    bg = Image.new("RGB", (size, size))
    px = bg.load()
    for y in range(size):
        for x in range(size):
            t = (x + y) / (2 * (size - 1))
            px[x, y] = tuple(round(a[i] + (b[i] - a[i]) * t) for i in range(3))
    bg = bg.convert("RGBA")
    h = int(size * frac)
    w = int(mark.width * h / mark.height)
    bg.alpha_composite(mark.resize((w, h), Image.LANCZOS), ((size - w) // 2, (size - h) // 2))
    return bg.convert("RGB")


icon(192, 0.56).save("public/icons/icon-192.png", optimize=True)
icon(512, 0.56).save("public/icons/icon-512.png", optimize=True)
icon(512, 0.40).save("public/icons/icon-maskable-512.png", optimize=True)  # inside the 80% safe zone
print("ok")
