import { forwardRef } from 'react';

// icons
import { ChevronUpDownIcon, PencilSquareIcon } from '@heroicons/react/24/outline';

export const Item = forwardRef(({ id, ...props }: { id: any }, ref) => {
  return (
    <div {...props} className="bg-white w-full flex justify-between items-center border rounded p-2">
    {/* ref={ref} creates an error, but it doens't seem to be used anywhere.
    <div {...props} ref={ref} className="bg-white w-full flex justify-between items-center border rounded p-2">*/}
      <div className='flex space-x-2'>
        <ChevronUpDownIcon width={24} />
        <p className='font-semibold'>{id}</p>
      </div>

      <PencilSquareIcon width={20} className="text-blue-500 hover:text-blue-700" />
    </div>
  )
});