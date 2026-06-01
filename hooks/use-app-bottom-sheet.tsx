import React, { createContext, useContext, useState, useRef, useCallback } from 'react'; 
import { StyleSheet } from 'react-native';
import { 
  BottomSheetModal, 
  BottomSheetModalProvider, 
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetBackdropProps
} from '@gorhom/bottom-sheet'; 
import { useThemeColor } from "@/hooks/use-theme-color";

// Define what functions are available across your application
interface BottomSheetContextProps { 
  showSheet: (content: React.ReactNode, snapPoints?: (string | number)[]) => void; 
  hideSheet: () => void; 
} 

const BottomSheetContext = createContext<BottomSheetContextProps | undefined>(undefined); 

export const BottomSheetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => { 
  const [sheetContent, setSheetContent] = useState<React.ReactNode | null>(null); 
  const [currentSnapPoints, setCurrentSnapPoints] = useState<(string | number)[]>(['50%']); 
  const bottomSheetModalRef = useRef<BottomSheetModal>(null); 
  const surfaceColor = useThemeColor({}, "surface");
  const textColor = useThemeColor({}, "text");
  const iconColor = useThemeColor({}, "tint");

  // Function to open the sheet from anywhere
  const showSheet = useCallback((content: React.ReactNode, snapPoints: (string | number)[] = ['50%', '90%']) => { 
    setSheetContent(content); 
    setCurrentSnapPoints(snapPoints); 
    bottomSheetModalRef.current?.present(); 
  }, []); 

  // Function to close the sheet programmatically
  const hideSheet = useCallback(() => { 
    bottomSheetModalRef.current?.dismiss(); 
  }, []); 

  // Renders a dim backdrop that closes the sheet when tapped
  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
      />
    ),
    []
  );

  return ( 
    <BottomSheetContext.Provider value={{ showSheet, hideSheet }}> 
      <BottomSheetModalProvider> 
        {children} 
        
        <BottomSheetModal 
        backgroundStyle={{
            backgroundColor: surfaceColor
        }}
        handleIndicatorStyle={{
            backgroundColor: iconColor,
            width: 55,
            height: 4
        }}
          ref={bottomSheetModalRef} 
          snapPoints={currentSnapPoints} 
          index={0}
          backdropComponent={renderBackdrop}
          onDismiss={() => setSheetContent(null)} // Clear content layout on close
        > 
          <BottomSheetView style={[styles.contentContainer]}>
            {sheetContent} 
          </BottomSheetView>
        </BottomSheetModal> 
      </BottomSheetModalProvider> 
    </BottomSheetContext.Provider> 
  ); 
}; 

// Hook to easily consume functions inside screens
export const useBottomSheet = () => { 
  const context = useContext(BottomSheetContext); 
  if (!context) throw new Error('useBottomSheet must be used within a BottomSheetProvider'); 
  return context; 
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 16,
  },
});
