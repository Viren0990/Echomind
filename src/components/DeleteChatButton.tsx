"use client"

import { Trash2 } from "lucide-react"
import { useDeleteChat } from "./DeleteChatContext"

interface DeleteChatButtonProps {
  chatId: string
  characterName: string
}

export const DeleteChatButton = ({ chatId, characterName }: DeleteChatButtonProps) => {
  const { openDeleteModal } = useDeleteChat()

  return (
    <button
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        openDeleteModal(chatId, characterName)
      }}
      className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 group/delete"
      title="Delete conversation"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  )
}
