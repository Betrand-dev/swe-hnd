import React, { createContext, useCallback, useContext, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import { 
  BottomSheetModal, 
  BottomSheetModalProvider, 
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetBackdropProps
} from "@gorhom/bottom-sheet";
import { useThemeColor } from "@/hooks/use-theme-color";

// Define what functions are available across your application
interface BottomSheetContextProps { 
  showSheet: (content: React.ReactNode, snapPoints?: (string | number)[]) => void; 
  hideSheet: () => void; 
} 

const BottomSheetContext = createContext<BottomSheetContextProps | undefined>(undefined); 

export const BottomSheetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => { 
  const [sheetContent, setSheetContent] = useState<React.ReactNode | null>(null); 
  const [currentSnapPoints, setCurrentSnapPoints] = useState<(string | number)[]>(["50%"]); 
  const bottomSheetModalRef = useRef<BottomSheetModal>(null); 
  const surfaceColor = useThemeColor({}, "surface");
  const iconColor = useThemeColor({}, "tint");
  const borderColor = useThemeColor({}, "border");

  // Function to open the sheet from anywhere
  const showSheet = useCallback((content: React.ReactNode, snapPoints: (string | number)[] = ["50%", "90%"]) => { 
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
        opacity={0.42}
        pressBehavior="close"
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
            backgroundColor: surfaceColor,
            borderColor,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            borderWidth: 1,
          }}
          handleIndicatorStyle={{
            backgroundColor: iconColor,
            height: 4,
            width: 44,
          }}
          handleStyle={styles.handle}
          ref={bottomSheetModalRef} 
          snapPoints={currentSnapPoints} 
          index={0}
          backdropComponent={renderBackdrop}
          enablePanDownToClose
          keyboardBehavior="interactive"
          keyboardBlurBehavior="restore"
          android_keyboardInputMode="adjustResize"
          onDismiss={() => setSheetContent(null)}
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
  if (!context) throw new Error("useBottomSheet must be used within a BottomSheetProvider"); 
  return context; 
};

const styles = StyleSheet.create({
  handle: {
    paddingBottom: 8,
    paddingTop: 12,
  },
  contentContainer: {
    flex: 1,
    paddingBottom: 24,
    paddingHorizontal: 20,
    paddingTop: 8,
  },
});
