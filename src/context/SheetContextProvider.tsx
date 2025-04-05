'use client';

import { createContext, ReactNode, useContext, useReducer } from 'react';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

export type SheetId = string;
export type SheetProps = {
  id: SheetId;
  content: ReactNode;
  title?: string;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
  direction?: 'right' | 'bottom' | 'left' | 'top';
  description?: string;
  showCloseButton?: boolean;
  showConfirmButton?: boolean;
  confirmText?: string;
  cancelText?: string;
  onClose?: () => void;
  onOpen?: () => void;
  onConfirm?: () => void;
};

export type SheetContentState = Record<SheetId, { isOpen: boolean; sheetProps: SheetProps }>;
export type SheetContentAction =
  | {
      type: 'OPEN';
      payload: SheetProps;
    }
  | { type: 'CLOSE'; payload: { id: SheetId } }
  | { type: 'REMOVE'; payload: { id: SheetId } };

export const SheetContext = createContext<{
  openSheet: (SheetProps: SheetProps) => void;
  closeSheet: (SheetId: SheetId) => void;
}>({ openSheet: () => {}, closeSheet: () => {} });

export const SheetContextReducer = (
  state: SheetContentState,
  action: SheetContentAction
): SheetContentState => {
  switch (action.type) {
    case 'OPEN':
      return {
        ...state,
        [action.payload.id]: { isOpen: true, sheetProps: action.payload },
      };
    case 'CLOSE': {
      return { ...state, [action.payload.id]: { ...state[action.payload.id], isOpen: false } };
    }
    case 'REMOVE': {
      const newState = { ...state };
      delete newState[action.payload.id];
      return newState;
    }
    default:
      return state;
  }
};

export const SheetContextProvider = ({ children }: { children: ReactNode }) => {
  const [Sheets, dispatch] = useReducer(SheetContextReducer, {});

  const openSheet = (sheetProps: SheetProps) => {
    dispatch({ type: 'OPEN', payload: sheetProps });
  };

  const closeSheet = (SheetId: SheetId) => {
    dispatch({ type: 'CLOSE', payload: { id: SheetId } });
  };

  return (
    <SheetContext.Provider value={{ openSheet, closeSheet }}>
      {children}
      {Object.entries(Sheets).map(([id, sheetItem]) => {
        const { isOpen, sheetProps } = sheetItem;
        const sheetWidth = sheetProps?.width || 500; // Default width if not provided
        const onCloseHandler = () => {
          closeSheet(id as SheetId);
          sheetProps.onClose?.(); // Call the onClose handler if provided
        };

        const SheetComponent = (
          <Sheet key={id} open={isOpen} onOpenChange={onCloseHandler}>
            <SheetContent
              side={sheetProps?.direction || 'right'}
              style={{ width: `${sheetWidth}px`, ...sheetProps?.style }}
            >
              <SheetHeader>
                {sheetProps?.title && <SheetTitle>{sheetProps.title}</SheetTitle>}
                {sheetProps?.description && (
                  <SheetDescription>{sheetProps.description}</SheetDescription>
                )}
              </SheetHeader>
              <div className='grid gap-4 py-4'>{sheetProps?.content}</div>
              {sheetProps?.showConfirmButton && (
                <SheetFooter>
                  <SheetClose asChild>
                    <Button type='button' onClick={onCloseHandler}>
                      {sheetProps?.confirmText || 'Confirm'}
                    </Button>
                  </SheetClose>
                </SheetFooter>
              )}
            </SheetContent>
          </Sheet>
        );
        return SheetComponent;
      })}
    </SheetContext.Provider>
  );
};

export const useSheet = () => {
  return useContext(SheetContext);
};
