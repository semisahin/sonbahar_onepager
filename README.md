# sonbahar — Website Direction

## Core Direction
- One-page website
- Very dark visual style
- Clean, minimal, formal
- English only for website copy
- No cheesy copy
- No descriptive slogans
- No vibe-marketing headlines
- High-contrast interface
- Minimal but premium presentation
- The page should feel intentional, controlled, and cinematic

## Overall Brand / Mood
- Very dark, moody, restrained visual language
- Crystal Castles-adjacent feeling
- Filmic mood
- Black / charcoal / muted grayscale palette
- No colorful marketing look
- No loud UI
- No clutter
- Design should feel premium, sparse, and cold
- UI should feel modern, but not try-hard

## Current Typography Direction
- Main UI/body font: **Inter**
- Headings / labels / navigation / brand: **Manrope**
- Typography should stay modern, clean, and neutral
- CAPS should be used selectively, not everywhere

## CAPS vs Normal Case Direction
Use CAPS only for:
- brand
- navigation
- small section labels
- micro-labels
- compact metadata labels

Use normal case / title case for:
- license names
- body text
- descriptive values
- contract text
- buttons where readability matters

Reason:
- too much CAPS makes the site feel stiff and harder to scan
- selective CAPS keeps the site controlled and premium

## Above the Fold
- The page starts with a full-screen video
- No visible site name on initial load
- No visible navigation on initial load
- No text-heavy overlay on the opening screen
- No "Beats", "Catalog", or similar labels visible at first
- The opening screen should feel empty, deliberate, and cinematic
- Scroll is intentionally locked on the intro screen at first
- The user should not scroll into the site immediately
- The main entry interaction is the centered down-arrow

## Current Intro Direction
- Current opener text: **ARCHIVE**
- This currently works well and feels restrained
- The intro should stay visually minimal
- No extra text
- No CTA sentence
- No headline stack
- No branding overload

## Intro Motion
- Hero video fades in softly on load
- Video has a subtle slow zoom
- Opener text fades in slowly and lightly
- Arrow appears after the opener
- Arrow has a subtle floating motion
- Motion should feel smooth, understated, and premium
- No aggressive animation
- No gimmicky transitions
- Clicking the arrow triggers a small micro-interaction before entering the page

## Scroll Cue
- A centered down-arrow is used as the only initial cue
- It should feel elegant and restrained
- Hover state should be subtle
- Motion should guide, not shout
- The arrow is the main invitation into the page

## Header Behavior
- No header visible on initial load
- Header appears only after entering / scrolling past the intro
- Header stays minimal and functional
- Brand shown in CAPS
- Brand placement: top left
- Navigation kept minimal

### Current header items
- Beats
- Licenses
- Contact

## Scroll / Entry Behavior
- Initial intro state is scroll-locked
- After pressing the intro arrow, normal scrolling becomes available
- The user enters directly into the player section
- No unnecessary content block between intro and player
- Transition from intro to player should feel smooth and direct
- Player is the main destination of the page

## Visual System
### Current color variable logic
- `--bg`: main page background
- `--bg-elevated`: slightly raised dark layer
- `--surface`: base panel surface
- `--surface-2`: secondary surface
- `--surface-3`: elevated surface
- `--text`: main text
- `--text-soft`: secondary readable text
- `--muted`: subdued UI text
- `--muted-2`: weaker metadata text
- `--line`: soft border
- `--line-strong`: stronger border
- `--shadow-soft`
- `--shadow-medium`
- `--shadow-strong`

### Visual intent
- fewer “random dark tones”
- more controlled tonal hierarchy
- especially important for:
  - header
  - player shell
  - license cards
  - modal
  - footer/contact strip

## Motion System
### Current motion direction
- Shared easing variables already introduced
- Motion is smoother and more consistent than before
- Hover should stay restrained
- Entry motion should be soft and slightly delayed
- Modal motion can still be improved further later
- Goal: everything should feel like one system

## Structure
1. Full-screen intro video
2. Minimal opener text
3. Centered animated down-arrow
4. Immediate scroll into BeatStars Blaze Pro player
5. License section
6. Minimal footer/contact strip

## BeatStars Player Direction
- Blaze Pro player appears immediately after intro
- Player is the central destination of the page
- Player section should feel slightly more “heroic” than the rest
- Wider, dominant container
- Premium shell around iframe
- Slight spacing above for breathing room
- Very small label above player is okay if restrained

### Current player label
- **Store**

### Current player UX direction
- Stronger framing than before
- Soft shadow
- Premium shell
- Still minimal, no loud framing
- Should feel integrated into the page, not boxed in harshly

## License Section
- Dedicated section below player
- Cards should feel readable, premium, and structured
- The section is currently much better than before because it now shows actual practical limits instead of only file tags

### Each license card currently shows
- License name
- License type
- Price
- Included files
- Usage summary specs
- `View Contract` button

### Current licenses
#### Basic License
- Type: Regular
- Price: $49
- Includes: MP3, WAV
- Copies: Up to 2,000
- Streams: 500,000 audio streams
- Videos: 1 music video
- Radio: 2 stations

#### Premium License
- Type: Regular
- Price: $149
- Includes: Stems, MP3, WAV
- Copies: Up to 3,000
- Streams: 500,000 audio streams
- Videos: 1 music video
- Radio: 2 stations

#### Unlimited License
- Type: Regular
- Price: $249
- Includes: Stems, MP3, WAV
- Copies: Unlimited
- Streams: Unlimited audio streams
- Videos: 1 music video
- Radio: Unlimited stations

#### Exclusive License
- Type: Exclusive
- Price: Offer Only
- Includes: MP3, Stems, WAV
- Copies: Unlimited
- Streams: Unlimited audio streams
- Videos: Unlimited music videos
- Radio: Unlimited stations

## License UX Decision
### Current best UX decision
- Keep the cards compact and scannable
- Show only the most relevant commercial limits directly in the card
- Do **not** put the full legal wall of text in the card
- Use `View Contract` for the detailed legal agreement
- Keep the player as the buying destination
- Do **not** add a general “Buy License” button in each card, because buying already happens via BeatStars player
- Keep `Inquire` only for **Exclusive License**, because that one is not a simple store purchase

## Contract UX
- Each license has a small `View Contract` button
- Clicking it opens a modal / popup
- Matching contract file is loaded dynamically
- Contract content is parsed from markdown-like text into readable HTML
- Popup is easy to close:
  - close icon (`×`)
  - click on overlay background
  - `ESC`

## Contract Modal Direction
- Must stay readable
- Long legal text should not feel cramped
- Better typography for legal text is important
- Strong spacing and hierarchy matter more than decoration
- Current contract note:
  - preview template
  - final agreement details provided at checkout

## Contract File Structure
Preferred structure:

```text
site/
├─ index.html
├─ hero.mp4
├─ contracts/
│  ├─ basic.txt
│  ├─ premium.txt
│  ├─ unlimited.txt
│  └─ exclusive.txt