import { useState, useEffect } from "react";

// DND-KIT
import {
  DndContext,
  closestCenter,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { restrictToVerticalAxis } from "@dnd-kit/modifiers";

// Components
import { SortableComponentItem } from "./@dnd/SortableComponentItem";
import { Item } from "./@dnd/Item";

// Intefaces
import ComponentService from "../../services/component.service";
import { Component } from "../../interfaces/SectionInfo";

interface Props {
  sid: string;
  components: Component[];
  setComponents: Function;
  addOnSubmitSubscriber: Function;
}

export const ComponentList = ({
  sid,
  components,
  setComponents,
  addOnSubmitSubscriber,
}: Props) => {
  // States
  const [activeId, setActiveId] = useState(null);

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
    setActiveId(active.id);
  };

  // handle end of dragging
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setComponents((components: Component[]) => {
        const oldIndex = components.findIndex(
          (component) => component.compId === active.id
        );
        const newIndex = components.findIndex(
          (component) => component.compId === over.id
        );
        console.log("oldIndex", oldIndex);
        console.log("newIndex", newIndex);
        console.log("components", components);

        return arrayMove(components, oldIndex, newIndex);
      });
    }
  };

  useEffect(() => {
    addOnSubmitSubscriber(() => onSubmit());
  }, []);

  function onSubmit() {
    ComponentService.setComponents(sid, components);
  }

  return (
    <div className="w-full">
      <DndContext
        modifiers={[restrictToVerticalAxis]}
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={components.map((comp) => comp.compId)}
          strategy={verticalListSortingStrategy}
        >
          {components.map((comp, key: React.Key) => (
            <SortableComponentItem
              key={key}
              component={comp}
              setComponents={setComponents}
            />
          ))}
        </SortableContext>

        <DragOverlay className="w-full">
          {activeId ? <Item id={activeId} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};
