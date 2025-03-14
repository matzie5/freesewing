import { buttonRow, closingRow, headingRow, preLeadRow, wrap } from '../shared/blocks.mjs'
// Translations
import en from './en.json' assert { type: 'json' }
import de from './de.json' assert { type: 'json' }
import es from './es.json' assert { type: 'json' }
import fr from './fr.json' assert { type: 'json' }
import nl from './nl.json' assert { type: 'json' }
import uk from './uk.json' assert { type: 'json' }

// aea = Account Exists and is Active
export const signupaea = {
  html: wrap.html(`
  ${headingRow.html}
  ${preLeadRow.html}
  ${buttonRow.html}
  ${closingRow.html}
`),
  text: wrap.text(`
{{{ heading }}}

{{{ preLead }}}

{{{ textLead }}}

{{{ actionUrl }}}

{{{ closing }}}

{{{ greeting }}},
joost

PS: {{{ text-ps }}} : {{{ supportUrl }}}
`),
}

export const translations = { en, de, es, fr, nl, uk }
