import { useState } from 'react';

// DND-KIT
import {
  DndContext,
  closestCenter,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';

import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import {
  restrictToVerticalAxis,
} from "@dnd-kit/modifiers";

// Components
import { SortableItem } from './@dnd/SortableItem';
import { Item } from './@dnd/Item';

// Intefaces
import { Section } from '../../interfaces/CourseDetail';

/**
 * 
 * 
 * @param {Array<Section>} sections  
 * @returns HTML Element
 */
export const SectionList = ({ sections }: { sections: Array<Section> }) => {
  // States
  console.log("Sections: ", sections);
  const [activeId, setActiveId] = useState(null);
  const [items, setItems] = useState(sections);
  console.log("Items: ", items);
  // Setup of pointer and keyboard sensor
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  

  // handle start of dragging
  const handleDragStart = (event: any) => {
    const { active } = event;
    setActiveId(active._id);
  }

  // handle end of dragging
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active._id !== over._id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active._id);
        const newIndex = items.indexOf(over._id);
        
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
  
  console.log("Active ID: ", activeId);

  return (
    <div className='flex flex-col space-y-2'>
      <DndContext
        modifiers={[restrictToVerticalAxis]}
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {items.map((item) => <SortableItem key={item._id} item={item} />)}
        </SortableContext>

        <DragOverlay>
          {activeId ? <Item id={activeId} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

