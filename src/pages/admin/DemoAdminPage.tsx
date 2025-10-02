import React, { useState, useEffect } from 'react';
import { api } from '@/api/api';
import { DemoShowcaseDto } from '@/api/types';
import Button from '@/components/common/Button';
import { ConfirmationModal } from '@/components/common/Modal';
import DemoItemsTable from '@/components/admin/demo/DemoItemsTable';
import CreateDemoItemModal from '@/components/admin/demo/CreateDemoItemModal';

interface ItemToDelete {
  id: string;
  name: string;
}

const DemoAdminPage: React.FC = () => {
  // Data state
  const [demoItems, setDemoItems] = useState<DemoShowcaseDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // UI state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<ItemToDelete | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Load demo items on mount
  useEffect(() => {
    loadDemoItems();
  }, []);

  const loadDemoItems = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await api.demoShowcase.demoShowcase_GetAllAdmin();

      if (response.success && response.data) {
        setDemoItems(response.data as DemoShowcaseDto[]);
      } else {
        setError(response.message || 'Failed to load demo items');
      }
    } catch (error) {
      console.error('Failed to load demo items:', error);
      setError('Failed to load demo items. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClick = (id: string, name: string) => {
    setItemToDelete({ id, name });
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;

    try {
      setIsDeleting(true);
      const response = await api.demoShowcase.demoShowcase_Delete(itemToDelete.id);

      if (response.success) {
        // Optimistically update local state
        setDemoItems(prev => prev.filter(item => item.id !== itemToDelete.id));
        setShowDeleteModal(false);
        setItemToDelete(null);
      } else {
        setError(response.message || 'Failed to delete item');
      }
    } catch (error) {
      console.error('Failed to delete item:', error);
      // On error, refetch to ensure consistency
      loadDemoItems();
      setError('Failed to delete item. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDemoItemCreated = () => {
    // Refresh the list after creating a new item
    loadDemoItems();
  };

  if (isLoading && demoItems.length === 0) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          {/* Header skeleton */}
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-96"></div>
            </div>
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
          </div>

          {/* Table skeleton */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-4">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-48"></div>
              </div>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
                    <div className="flex-1 h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Demo Showcase Management
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Manage demo showcase items displayed to users
          </p>
        </div>

        <div className="mt-4 sm:mt-0">
          <Button
            variant="primary"
            onClick={() => setShowCreateModal(true)}
            leftIcon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            }
          >
            Create Demo Item
          </Button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
            </div>
            <div className="ml-auto pl-3">
              <button
                onClick={loadDemoItems}
                className="text-sm text-red-800 dark:text-red-200 hover:text-red-600 dark:hover:text-red-300"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Items Count */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          Demo Items ({demoItems.length})
        </h2>
      </div>

      {/* Demo Items Table */}
      <DemoItemsTable
        items={demoItems}
        onDelete={handleDeleteClick}
        isDeleting={isDeleting}
      />

      {/* Create Modal */}
      <CreateDemoItemModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onDemoItemCreated={handleDemoItemCreated}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setItemToDelete(null);
        }}
        onConfirm={confirmDelete}
        title="Delete Demo Item"
        message={
          itemToDelete
            ? `Are you sure you want to delete the demo item for "${itemToDelete.name}"? This action cannot be undone.`
            : 'Are you sure you want to delete this demo item?'
        }
        confirmText="Delete Item"
        cancelText="Cancel"
        variant="danger"
        loading={isDeleting}
      />
    </div>
  );
};

export default DemoAdminPage;
