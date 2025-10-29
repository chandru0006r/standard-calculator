import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppStore } from '../store/useAppStore';

const schema = z.object({
  name: z.string().min(3, 'Name is too short'),
  description: z.string().min(5, 'Description is too short'),
});

export default function CreateCommunityForm() {
  const { createCommunity } = useAppStore();
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (values) => {
    await createCommunity(values);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card space-y-3">
      <h3 className="text-lg font-semibold">Create Community</h3>
      <div>
        <label className="label" htmlFor="name">Name</label>
        <input id="name" className="input" {...register('name')} />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
      </div>
      <div>
        <label className="label" htmlFor="description">Description</label>
        <textarea id="description" className="input" rows={3} {...register('description')} />
        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
      </div>
      <div className="flex justify-end">
        <button className="btn-primary" disabled={isSubmitting}>Create</button>
      </div>
    </form>
  );
}
