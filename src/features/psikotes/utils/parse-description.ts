export type DescriptionBlock =
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] }

function splitInlineNumberedList(text: string): string[] | null {
  const regex = /(?:^|\s)(\d+[.)])\s+/g
  const matches: { idx: number; marker: string }[] = []
  let m: RegExpExecArray | null
  while ((m = regex.exec(text)) !== null) {
    matches.push({ idx: m.index + (m[0].startsWith(' ') ? 1 : 0), marker: m[1] })
  }

  if (matches.length < 2) return null

  const prefix = text.slice(0, matches[0].idx).trim()
  if (prefix.length > 0) return null

  const items: string[] = []
  for (let i = 0; i < matches.length; i++) {
    const start = matches[i].idx + matches[i].marker.length
    const end = i + 1 < matches.length ? matches[i + 1].idx : text.length
    const itemText = text.slice(start, end).trim().replace(/[.,;]$/, '').trim()
    if (itemText.length > 0) items.push(itemText)
  }

  return items.length >= 2 ? items : null
}

export function parseDescription(raw: string | null | undefined): DescriptionBlock[] {
  if (!raw) return []

  const lines = raw
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean)

  const blocks: DescriptionBlock[] = []
  let currentList: string[] | null = null

  const flushList = () => {
    if (currentList && currentList.length > 0) {
      blocks.push({ type: 'list', items: currentList })
    }
    currentList = null
  }

  for (const line of lines) {
    const listMatch = line.match(/^\d+[.)]\s+(.+)$/)
    const isHeading = /.+:$/.test(line) && line.length < 140 && !listMatch

    if (listMatch) {
      if (!currentList) currentList = []
      currentList.push(listMatch[1].trim().replace(/[.,;]$/, '').trim())
      continue
    }

    flushList()

    if (isHeading) {
      blocks.push({ type: 'heading', text: line.replace(/:$/, '').trim() })
      continue
    }

    const colonSplit = line.match(/^(.{3,120}?):\s+(.+)$/)
    if (colonSplit) {
      const head = colonSplit[1]
      const rest = colonSplit[2]
      const inlineItems = splitInlineNumberedList(rest)
      if (inlineItems) {
        blocks.push({ type: 'heading', text: head.trim() })
        blocks.push({ type: 'list', items: inlineItems })
        continue
      }
    }

    const inlineItems = splitInlineNumberedList(line)
    if (inlineItems) {
      blocks.push({ type: 'list', items: inlineItems })
      continue
    }

    blocks.push({ type: 'paragraph', text: line })
  }

  flushList()
  return blocks
}
