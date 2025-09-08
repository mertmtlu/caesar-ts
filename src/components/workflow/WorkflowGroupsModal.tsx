import React from 'react';
import ManageGroupsModal from '@/components/common/ManageGroupsModal';
import { workflowGroupsHandler, createEntityConfig } from '@/components/common/groupHandlers.tsx';

interface WorkflowGroupsModalProps {
  isOpen: boolean;
  onClose: () => void;
  workflowId: string;
  workflowName: string;
  onSave?: () => void;
}

const WorkflowGroupsModal: React.FC<WorkflowGroupsModalProps> = ({
  isOpen,
  onClose,
  workflowId,
  workflowName,
  onSave,
}) => {
  const config = createEntityConfig('workflow', workflowId, workflowName);

  return (
    <ManageGroupsModal
      isOpen={isOpen}
      onClose={onClose}
      config={config}
      handler={workflowGroupsHandler}
      onSave={onSave}
    />
  );
};

export default WorkflowGroupsModal;