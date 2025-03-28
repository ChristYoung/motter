'use client';

import { createContext, ReactNode, useContext, useReducer } from 'react';

import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

export type DrawerId = string;
export type DrawerProps = {
  id: DrawerId;
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

export type DrawerContentState = Record<DrawerId, { isOpen: boolean; drawerProps: DrawerProps }>;
export type DrawerContentAction =
  | {
      type: 'OPEN';
      payload: DrawerProps;
    }
  | { type: 'CLOSE'; payload: { id: DrawerId } }
  | { type: 'REMOVE'; payload: { id: DrawerId } };

export const DrawerContext = createContext<{
  openDrawer: (drawerProps: DrawerProps) => void;
  closeDrawer: (drawerId: DrawerId) => void;
}>({ openDrawer: () => {}, closeDrawer: () => {} });

export const DrawerContextReducer = (
  state: DrawerContentState,
  action: DrawerContentAction
): DrawerContentState => {
  switch (action.type) {
    case 'OPEN':
      return {
        ...state,
        [action.payload.id]: { isOpen: true, drawerProps: action.payload },
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

export const DrawerContextProvider = ({ children }: { children: ReactNode }) => {
  const [drawers, dispatch] = useReducer(DrawerContextReducer, {});

  const openDrawer = (drawerProps: DrawerProps) => {
    dispatch({ type: 'OPEN', payload: drawerProps });
  };

  const closeDrawer = (drawerId: DrawerId) => {
    dispatch({ type: 'CLOSE', payload: { id: drawerId } });
  };

  return (
    <DrawerContext.Provider value={{ openDrawer, closeDrawer }}>
      {children}
      {Object.entries(drawers).map(([id, drawer]) => {
        const { isOpen, drawerProps } = drawer;
        const onCloseHandler = () => {
          closeDrawer(id as DrawerId);
          drawerProps.onClose?.(); // Call the onClose handler if provided
        };

        // use `Drawer` when the direction is 'bottom', and use `Sheet` when the direction is 'right'
        const DrawerComponent = (
          <Drawer
            key={id}
            open={isOpen}
            direction={'bottom'}
            onOpenChange={onCloseHandler}
            onAnimationEnd={() => {
              if (!isOpen) {
                dispatch({ type: 'REMOVE', payload: { id: id as DrawerId } });
              }
            }}
          >
            <DrawerContent>
              <div className='mx-auto w-full max-w-sm'>
                <DrawerHeader>
                  <DrawerTitle>{drawerProps.title}</DrawerTitle>
                  {drawerProps.description && (
                    <DrawerDescription>{drawerProps.description}</DrawerDescription>
                  )}
                </DrawerHeader>
                <div className='p-4 pb-0'>
                  <div className='flex items-center justify-center space-x-2'>
                    {drawerProps?.content}
                  </div>
                </div>
                {(drawerProps?.showCloseButton || drawerProps?.showConfirmButton) && (
                  <DrawerFooter>
                    {drawerProps?.showConfirmButton && (
                      <Button
                        onClick={() => {
                          drawerProps.onConfirm?.();
                          closeDrawer(id as DrawerId);
                        }}
                      >
                        {drawerProps?.confirmText || 'Confirm'}
                      </Button>
                    )}
                    {drawerProps?.showCloseButton && (
                      <DrawerClose asChild>
                        <Button variant='outline' onClick={onCloseHandler}>
                          {drawerProps?.cancelText || 'Cancel'}
                        </Button>
                      </DrawerClose>
                    )}
                  </DrawerFooter>
                )}
              </div>
            </DrawerContent>
          </Drawer>
        );

        const SheetComponent = (
          <Sheet key={id} open={isOpen} onOpenChange={onCloseHandler}>
            <SheetContent side={'bottom'}>
              <SheetHeader>
                <SheetTitle>{drawerProps.title}</SheetTitle>
                {drawerProps?.description && (
                  <SheetDescription>{drawerProps.description}</SheetDescription>
                )}
              </SheetHeader>
              <div className='grid gap-4 py-4'>{drawerProps?.content}</div>
              {drawerProps?.showConfirmButton && (
                <SheetFooter>
                  <SheetClose asChild>
                    <Button type='button' onClick={onCloseHandler}>
                      {drawerProps?.confirmText || 'Confirm'}
                    </Button>
                  </SheetClose>
                </SheetFooter>
              )}
            </SheetContent>
          </Sheet>
        );

        return drawerProps?.direction === 'right' ? SheetComponent : DrawerComponent;
      })}
    </DrawerContext.Provider>
  );
};

export const useDrawer = () => {
  return useContext(DrawerContext);
};
