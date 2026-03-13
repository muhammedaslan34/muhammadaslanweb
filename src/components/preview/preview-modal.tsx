"use client"

import { useState, useEffect } from "react"
import { ExternalLink, ArrowLeft } from "lucide-react"
import { Modal, ModalHeader, ModalContent } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"
import { DeviceControls } from "./device-controls"
import { IframePreview } from "./iframe-preview"
import { DeviceType } from "./previewModalMockData"

interface PreviewModalProps {
  isOpen: boolean
  onClose: () => void
  project: {
    title: string
    liveUrl: string
  }
}

export function PreviewModal({ isOpen, onClose, project }: PreviewModalProps) {
  const [selectedDevice, setSelectedDevice] = useState<DeviceType>(DeviceType.DESKTOP)
  const [isMobile, setIsMobile] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    
    const checkMobile = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth < 768)
      }
    }
    
    checkMobile()
    
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', checkMobile)
      return () => window.removeEventListener('resize', checkMobile)
    }
  }, [])

  if (!isMounted) {
    return null
  }

  const handleVisitSite = () => {
    window.open(project.liveUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="flex flex-col h-screen overflow-hidden">
      {/* Modal Header */}
      <ModalHeader onClose={onClose}>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="flex items-center space-x-2"
            >
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">Back</span>
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            {!isMobile && (
              <DeviceControls 
                selectedDevice={selectedDevice}
                onDeviceChange={setSelectedDevice}
              />
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={handleVisitSite}
              className="flex items-center space-x-2"
            >
              <ExternalLink size={16} />
              <span className="hidden sm:inline">Visit Site</span>
            </Button>
          </div>
        </div>
      </ModalHeader>

      {/* Preview Content */}
      <ModalContent className="flex-1 overflow-hidden h-full">
        <div className="w-full h-full">
          <IframePreview 
            url={project.liveUrl}
            device={selectedDevice}
          />
        </div>
      </ModalContent>
    </Modal>
  )
}
