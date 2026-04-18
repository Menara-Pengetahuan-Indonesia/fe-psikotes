'use client'

import { useState, useCallback } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import type { TreeSelection, ContentMode, TreeNodeType } from './types'

export function useTreeState() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const typeParam = searchParams.get('type') as TreeNodeType | null
  const idParam = searchParams.get('id')

  const selectedNode: TreeSelection | null =
    typeParam && idParam ? { type: typeParam, id: idParam } : null

  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set())
  const [contentMode, setContentMode] = useState<ContentMode>('view')
  const [createParent, setCreateParent] = useState<{ type: TreeNodeType; id: string } | null>(null)

  const nodeKey = (type: string, id: string) => `${type}:${id}`

  const selectNode = useCallback((sel: TreeSelection | null) => {
    const params = new URLSearchParams()
    if (sel) {
      params.set('type', sel.type)
      params.set('id', sel.id)
    }
    const qs = params.toString()
    router.replace(`${pathname}${qs ? `?${qs}` : ''}`, { scroll: false })
    setContentMode('view')
    setCreateParent(null)
  }, [router, pathname])

  const toggleExpand = useCallback((type: string, id: string) => {
    const key = nodeKey(type, id)
    setExpandedNodes(prev => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }, [])

  const isExpanded = useCallback((type: string, id: string) => {
    return expandedNodes.has(nodeKey(type, id))
  }, [expandedNodes])

  const startCreate = useCallback((parentType: TreeNodeType, parentId: string) => {
    setCreateParent({ type: parentType, id: parentId })
    setContentMode('create')
  }, [])

  const startEdit = useCallback(() => {
    setContentMode('edit')
  }, [])

  const cancelAction = useCallback(() => {
    setContentMode('view')
    setCreateParent(null)
  }, [])

  return {
    selectedNode,
    selectNode,
    expandedNodes,
    toggleExpand,
    isExpanded,
    contentMode,
    setContentMode,
    createParent,
    startCreate,
    startEdit,
    cancelAction,
  }
}
