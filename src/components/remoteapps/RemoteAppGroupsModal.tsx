import React from 'react';
import ManageGroupsModal from '@/components/common/ManageGroupsModal';
import { remoteAppGroupsHandler, createEntityConfig } from '@/components/common/groupHandlers.tsx';

interface RemoteAppGroupsModalProps {
  isOpen: boolean;
  onClose: () => void;
  remoteAppId: string;
  remoteAppName: string;
  onSave?: () => void;
}

const RemoteAppGroupsModal: React.FC<RemoteAppGroupsModalProps> = ({
  isOpen,
  onClose,
  remoteAppId,
  remoteAppName,
  onSave,
}) => {
  const config = createEntityConfig('remoteapp', remoteAppId, remoteAppName);

  return (
    <ManageGroupsModal
      isOpen={isOpen}
      onClose={onClose}
      config={config}
      handler={remoteAppGroupsHandler}
      onSave={onSave}
    />
  );
};

export default RemoteAppGroupsModal;