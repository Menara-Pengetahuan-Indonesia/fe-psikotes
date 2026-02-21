/**
 * Shared SVG background pattern constants.
 * All topo patterns share the same path, only stroke color differs.
 */

function topoPattern(strokeColor: string) {
  return (
    'url("data:image/svg+xml,'
    + '%3Csvg width=\'200\''
    + ' height=\'200\''
    + ' viewBox=\'0 0 200 200\''
    + ' xmlns=\'http://www.w3.org/'
    + '2000/svg\'%3E%3Cpath'
    + ' d=\'M0 100 C 20 80, 40 120,'
    + ' 60 100 S 100 80, 120 100'
    + ' S 160 120, 200 100\''
    + ` stroke='${strokeColor}'`
    + ' fill=\'transparent\''
    + ' stroke-width=\'1\'/%3E'
    + '%3C/svg%3E")'
  )
}

/** White stroke — dark hero sections */
export const TOPO_WHITE = topoPattern('white')

/** Slate stroke — light hero backgrounds */
export const TOPO_SLATE = topoPattern('%23334155')

/** Primary-700 teal stroke */
export const TOPO_PRIMARY = topoPattern('%230F766E')

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

export const TOPO_BG_SIZE = '400px 400px'
