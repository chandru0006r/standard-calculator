import { useForm } from 'react-hook-form';
import Modal from '../ui/Modal.jsx';
import { useStudentStore } from '../../store/student';
import toast from 'react-hot-toast';

export default function CreateCommunityForm({ open, onClose }) {
  const createCommunity = useStudentStore((s) => s.createCommunity);
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    await createCommunity({ name: data.name, description: data.description, members: [], posts: [] });
    toast.success('Community created');
    reset();
    onClose?.();
  };

  return (
    <Modal open={open} onClose={onClose} title="Create Community" footer={(
      <>
        <button className="btn-secondary" onClick={onClose}>Cancel</button>
        <button className="btn-primary" onClick={handleSubmit(onSubmit)} disabled={isSubmitting}>Create</button>
      </>
    )}>
      <label className="label">Name</label>
      <input className="input mb-3" {...register('name', { required: true })} />
      <label className="label">Description</label>
      <textarea className="input" rows={3} {...register('description')} />
    </Modal>
  );
}
