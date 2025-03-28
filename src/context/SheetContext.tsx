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
  title: string;
  content: ReactNode;
  direction?: 'right' | 'bottom';
  description?: string;
  showCloseButton?: boolean;
  showConfirmButton?: boolean;
  confirmText?: string;
  cancelText?: string;
  onClose?: () => void;
  onOpen?: () => void;
  onConfirm?: () => void;
};

export type SheetContentState = Record<SheetId, { isOpen: boolean; SheetProps: SheetProps }>;
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
        [action.payload.id]: { isOpen: true, SheetProps: action.payload },
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

  const openSheet = (SheetProps: SheetProps) => {
    dispatch({ type: 'OPEN', payload: SheetProps });
  };

  const closeSheet = (SheetId: SheetId) => {
    dispatch({ type: 'CLOSE', payload: { id: SheetId } });
  };

  return (
    <SheetContext.Provider value={{ openSheet, closeSheet }}>
      {children}
      {Object.entries(Sheets).map(([id, sheetItem]) => {
        const { isOpen, SheetProps } = sheetItem;
        const onCloseHandler = () => {
          closeSheet(id as SheetId);
          SheetProps.onClose?.(); // Call the onClose handler if provided
        };

        const SheetComponent = (
          <Sheet key={id} open={isOpen} onOpenChange={onCloseHandler}>
            <SheetContent side={SheetProps?.direction || 'right'}>
              <SheetHeader>
                <SheetTitle>{SheetProps.title}</SheetTitle>
                {SheetProps?.description && (
                  <SheetDescription>{SheetProps.description}</SheetDescription>
                )}
              </SheetHeader>
              <div className='grid gap-4 py-4'>{SheetProps?.content}</div>
              {SheetProps?.showConfirmButton && (
                <SheetFooter>
                  <SheetClose asChild>
                    <Button type='button' onClick={onCloseHandler}>
                      {SheetProps?.confirmText || 'Confirm'}
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
