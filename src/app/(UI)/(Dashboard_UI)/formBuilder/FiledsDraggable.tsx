/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-extraneous-dependencies */
import {useDraggable} from '@dnd-kit/core';
import {FC, JSX} from 'react';
import {CSS} from '@dnd-kit/utilities';

interface Draggable {
  children?: JSX.Element | JSX.Element[];
}

const FiledsDraggable: FC<Draggable> = (props: any) => {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: props.children,
    data: {title: props.children},
  });

  return (
    <div
      ref={setNodeRef}
      style={{transform: CSS.Translate.toString(transform)}}
      {...attributes}
      {...listeners}
    >
      {/* <OsButton buttontype="PRIMARY_ICON" text={props.children} /> */}

      {props.children}
    </div>
  );
};

export default FiledsDraggable;
