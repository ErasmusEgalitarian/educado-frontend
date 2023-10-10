import { Link, useLocation} from 'react-router-dom';
import useSWR from 'swr';

// Hooks
import useToken from '../../../hooks/useToken';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// icons
import { ChevronUpDownIcon, PencilSquareIcon } from '@heroicons/react/24/outline';

import SectionServices from '../../../services/section.services';

export function SortableItem(props: any) {
  const token = "dummyToken";
  // const token = useToken();
  
  // Fetch the section data from the server.
  const { data, error } = useSWR(
    token ? [`http://127.0.0.1:8888/api/sections/${props.item}`, token] : null,
    SectionServices.getSectionDetail
  );
  
  const location = useLocation();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: props.item.sectionNumber });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  //If data is not found yet, show a loading message.
  if(data === undefined) return (<div>Loading...</div>);

  //Else show the sections.
  return (
    <div className="flex justify-between items-center border rounded p-1">
      <div ref={setNodeRef} style={style} {...attributes} {...listeners} >
        <div className='btn btn-ghost'>
          <ChevronUpDownIcon width={24} />
        </div>
      </div>

      <div className='flex justify-between items-center w-full space-x-2'>
        <p className='font-semibold indent-8'>{data.title}</p>
        <Link to={`${location.pathname}/sections/${data._id}`} className='btn btn-ghost'>
          <PencilSquareIcon width={20} className="text-blue-500 hover:text-blue-700" />
          </Link>
      </div>
    </div>
  );
}