import React from 'react';
import ManageGroupsModal from '@/components/common/ManageGroupsModal';
import { projectGroupsHandler, createEntityConfig } from '@/components/common/groupHandlers.tsx';

interface ProjectGroupsModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
  projectName: string;
  onSave?: () => void;
}

const ProjectGroupsModal: React.FC<ProjectGroupsModalProps> = ({
  isOpen,
  onClose,
  projectId,
  projectName,
  onSave,
}) => {
  const config = createEntityConfig('project', projectId, projectName);

  return (
    <ManageGroupsModal
      isOpen={isOpen}
      onClose={onClose}
      config={config}
      handler={projectGroupsHandler}
      onSave={onSave}
    />
  );
};

export default ProjectGroupsModal;