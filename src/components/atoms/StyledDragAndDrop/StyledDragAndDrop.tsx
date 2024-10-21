import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Stack, Switch, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';

import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from '@hello-pangea/dnd';

import { StyledButton } from '@/components/atoms';

import { GridColumnItem } from '@/types';

export type StyledDragAndDropProps = {
  list: GridColumnItem[];
  handleSave?: (list: GridColumnItem[]) => void;
  loading?: boolean;
  handleCancel?: () => void;
};

// a little function to help us with reordering the result
const reorder = (
  list: GridColumnItem[],
  startIndex: number,
  endIndex: number,
) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export const StyledDragAndDrop: FC<StyledDragAndDropProps> = ({
  list,
  handleSave,
  loading,
  handleCancel,
}) => {
  const [items, setItems] = useState<GridColumnItem[]>([]);
  const onDragEnd = (result: DropResult) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items2 = reorder(
      items,
      result.source.index,
      result.destination.index,
    );

    setItems(items2);
  };

  const onSwitch = (source: GridColumnItem, checked: boolean) => {
    // dropped outside the list
    const result = items.map((item) =>
      item.field === source.field
        ? {
            ...source,
            visibility: checked,
          }
        : item,
    );
    setItems(result);
  };

  useEffect(() => {
    setItems(list);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack gap={3} height={'inherit'} justifyContent={'space-between'}>
      <Stack gap={3}>
        <Typography variant={'subtitle1'}>Edit columns</Typography>
        <Typography variant={'body2'}>Columns (drag to reorder)</Typography>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <Stack
                {...provided.droppableProps}
                border={'1px solid'}
                borderColor={'rgba(145, 158, 171, 0.24)'}
                borderRadius={2}
                // flex={1}
                minHeight={190}
                ref={provided.innerRef}
                sx={{ overflowY: 'auto' }}
              >
                {items.map((item, index) => (
                  <Draggable
                    draggableId={item.field}
                    index={index}
                    key={item.field}
                  >
                    {(provided, snapshot) => (
                      <Stack
                        bgcolor={snapshot.isDragging ? '#EDEFF2' : 'none'}
                        borderRadius={snapshot.isDragging ? 2 : 0}
                        direction={'row'}
                        justifyContent={'space-between'}
                        p={1}
                        ref={provided.innerRef}
                        spacing={3}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        sx={{
                          ...provided.draggableProps.style,
                          '&:hover': {
                            bgcolor: 'rgba(145, 158, 171, 0.08)',
                          },
                          userSelect: 'none',
                          // some basic styles to make the items look a bit nicer
                          // change background colour if dragging
                          // styles we need to apply on draggables
                        }}
                      >
                        <Stack
                          alignItems={'center'}
                          direction={'row'}
                          spacing={3}
                        >
                          <DragIndicatorIcon
                            sx={{ fontSize: 24, color: 'info.main' }}
                          />
                          <Typography variant={'body2'}>
                            {item.label}
                          </Typography>
                        </Stack>
                        <Switch
                          checked={item.visibility}
                          disabled={item.disabled}
                          onChange={(e) => {
                            onSwitch(item, e.target.checked);
                          }}
                        />
                      </Stack>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Stack>
            )}
          </Droppable>
        </DragDropContext>
      </Stack>
      <Stack direction={'row'} gap={6} justifyContent={'center'}>
        <StyledButton
          color={'info'}
          onClick={handleCancel}
          size={'small'}
          sx={{ width: 208 }}
          variant={'outlined'}
        >
          Cancel
        </StyledButton>
        <StyledButton
          loading={loading}
          onClick={() => {
            handleSave?.(items);
          }}
          size={'small'}
          sx={{ width: 208 }}
        >
          Save
        </StyledButton>
      </Stack>
    </Stack>
  );
};
