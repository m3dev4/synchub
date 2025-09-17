"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CreateCommunityModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateCommunityModal = ({
  isOpen,
  onOpenChange,
}: CreateCommunityModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Créer une nouvelle communauté</DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <p>Modal de test - Fonctionnalité en cours de développement</p>
          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Fermer
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCommunityModal;
