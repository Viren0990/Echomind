"use client"

import { createContext, useContext, useState, ReactNode } from "react"
import { Trash2, X, AlertTriangle } from "lucide-react"
import { deleteChat } from "@/app/actions/character"
import { useRouter } from "next/navigation"

interface DeleteChatContextType {
  openDeleteModal: (chatId: string, characterName: string) => void
}

const DeleteChatContext = createContext<DeleteChatContextType | null>(null)

export const useDeleteChat = () => {
  const context = useContext(DeleteChatContext)
  if (!context) {
    throw new Error("useDeleteChat must be used within DeleteChatProvider")
  }
  return context
}

interface DeleteChatProviderProps {
  children: ReactNode
}

export const DeleteChatProvider = ({ children }: DeleteChatProviderProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [chatToDelete, setChatToDelete] = useState<{
    id: string
    name: string
  } | null>(null)
  const router = useRouter()

  const openDeleteModal = (chatId: string, characterName: string) => {
    setChatToDelete({ id: chatId, name: characterName })
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
    setChatToDelete(null)
    setIsDeleting(false)
  }

  const handleDelete = async () => {
    if (!chatToDelete) return
    
    setIsDeleting(true)
    try {
      const result = await deleteChat(chatToDelete.id)
      if (result.success) {
        closeModal()
        router.refresh()
      } else {
        console.error("Failed to delete chat:", result.message)
        
      }
    } catch (error) {
      console.error("Error deleting chat:", error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <DeleteChatContext.Provider value={{ openDeleteModal }}>
      {children}
      
     
      {isOpen && chatToDelete && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          style={{ zIndex: 9999 }}
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
          
            <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 text-white relative">
              <div className="text-center flex justify-center items-center gap-3">
                <div>
                  <h2 className="text-lg">Are you sure you want to Delete Conversation?</h2>
                </div>
              </div>
            </div>

            <div className="p-6 flex gap-3 justify-center">
              <button
                onClick={closeModal}
                disabled={isDeleting}
                className="px-4 py-2 text-slate-600 hover:text-slate-800 hover:bg-slate-200 rounded-lg transition-colors duration-200 font-medium disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-6 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg transition-all duration-200 font-medium shadow-lg hover:shadow-red-500/25 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDeleting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </DeleteChatContext.Provider>
  )
}
