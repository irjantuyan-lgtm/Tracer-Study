import { Icon } from "./Icon";

export function TableActions({
  onEdit,
  onDelete,
}: {
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="table-actions">
      <button title="Edit data" onClick={onEdit}>
        <Icon name="edit" size={16} />
      </button>
      <button title="Hapus data" onClick={onDelete}>
        <Icon name="trash" size={16} />
      </button>
    </div>
  );
}
