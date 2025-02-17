"use client"

import { useState, useEffect } from "react"
import { Button } from "../components/button"
import { Input } from "../components/input" 
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/dialog"
import { UserPlus, Copy, Facebook, Twitter, Linkedin } from "lucide-react"

export default function InvitationPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [inviteLink, setInviteLink] = useState("")
  const [isCopied, setIsCopied] = useState(false)

  useEffect(() => {
    if (isOpen) {
      generateInviteLink()
    }
  }, [isOpen])

  const generateInviteLink = () => {
    // Mock function to generate invite link
    // In a real scenario, this would call your API to generate a unique token
    const token = Math.random().toString(36).substring(2, 15)
    setInviteLink(`https://www.pidus.net/${token}`)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(inviteLink).then(() => {
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    })
  }

  const shareOnSocial = (platform: string) => {
    let shareUrl = ""
    const message = encodeURIComponent("Join me on this amazing website!")

    switch (platform) {
      case "Facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(inviteLink)}`
        break
      case "Twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(inviteLink)}&text=${message}`
        break
      case "LinkedIn":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(inviteLink)}`
        break
    }

    window.open(shareUrl, "_blank")
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <UserPlus className="h-4 w-4" />
          Invite Friends
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Invite Friends to Our Website</DialogTitle>
          <DialogDescription>
            Share this unique link to invite your friends to join our amazing platform.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="invite-link" className="text-right col-span-1">
              Invite Link
            </label>
            <Input id="invite-link" value={inviteLink} readOnly className="col-span-3" />
          </div>
          <Button onClick={copyToClipboard} className="w-full gap-2">
            <Copy className="h-4 w-4" />
            {isCopied ? "Copied!" : "Copy Link"}
          </Button>
          <div className="text-center text-sm text-muted-foreground">Or share directly on:</div>
          <div className="flex justify-center space-x-4">
            <Button onClick={() => shareOnSocial("Facebook")} size="icon" variant="outline">
              <Facebook className="h-4 w-4" />
            </Button>
            <Button onClick={() => shareOnSocial("Twitter")} size="icon" variant="outline">
              <Twitter className="h-4 w-4" />
            </Button>
            <Button onClick={() => shareOnSocial("LinkedIn")} size="icon" variant="outline">
              <Linkedin className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

