/**
 * Shared SVG background pattern constants.
 * Updated with richer, multi-layered topographic paths for better visual impact.
 */

function topoPattern(strokeColor: string) {
  // A more complex, multi-layered topographic path
  return (
    'url("data:image/svg+xml,'
    + '%3Csvg width=\'400\''
    + ' height=\'400\''
    + ' viewBox=\'0 0 400 400\''
    + ' xmlns=\'http://www.w3.org/2000/svg\'%3E'
    + '%3Cg fill=\'none\' stroke=\'' + strokeColor + '\' stroke-width=\'0.8\' stroke-opacity=\'0.6\'%3E'
    + '%3Cpath d=\'M0 200 C 40 160, 80 240, 120 200 S 200 160, 240 200 S 320 240, 400 200 M0 150 C 40 110, 80 190, 120 150 S 200 110, 240 150 S 320 190, 400 150 M0 250 C 40 210, 80 290, 120 250 S 200 210, 240 250 S 320 290, 400 250 M0 100 C 50 50, 100 150, 150 100 S 250 50, 300 100 S 400 150, 450 100 M0 300 C 50 250, 100 350, 150 300 S 250 250, 300 300 S 400 350, 450 300\'/%3E'
    + '%3Cpath d=\'M-50 175 C 0 125, 50 225, 100 175 S 200 125, 250 175 S 350 225, 400 175 M-50 225 C 0 175, 50 275, 100 225 S 200 175, 250 225 S 350 275, 400 225\'/%3E'
    + '%3C/g%3E%3C/svg%3E")'
  )
}

/** White stroke — dark hero sections */
export const TOPO_WHITE = topoPattern('white')

/** Slate stroke — light hero backgrounds */
export const TOPO_SLATE = topoPattern('%23334155')

/** Primary-700 teal stroke */
export const TOPO_PRIMARY = topoPattern('%230F766E')

/** Primary-200 light teal stroke */
export const TOPO_PRIMARY_LIGHT = topoPattern('%2399F6E4')

/** Accent-400 amber stroke */
export const TOPO_ACCENT = topoPattern('%23FBBF24')

/** Konseling indigo stroke */
export const TOPO_KONSELING = topoPattern('%234338ca')

/** Pelatihan orange stroke */
export const TOPO_PELATIHAN = topoPattern('%23c2410c')

/** Plus-cross decorative pattern (gratis listing) */
export const PLUS_CROSS_PATTERN =
  'url("data:image/svg+xml,'
  + '%3Csvg width=\'60\' height=\'60\''
  + ' viewBox=\'0 0 60 60\''
  + ' xmlns=\'http://www.w3.org/2000/svg\'%3E'
  + '%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E'
  + '%3Cg fill=\'white\' fill-opacity=\'0.4\'%3E'
  + '%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z'
  + 'm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4z'
  + 'M6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6z'
  + 'M6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E'
  + '%3C/g%3E%3C/g%3E%3C/svg%3E")'

export const TOPO_BG_SIZE = '600px 600px'
