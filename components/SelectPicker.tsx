import React, { useState } from "react";
import { View, Modal, TouchableOpacity, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useTheme, useStyleSheet, StyleService } from "@ui-kitten/components";
import Text from "components/Text";

interface SelectPickerProps {
  items: any;
  onChange: any;
  value: any;
  label: string;
  errors: boolean;
  errorMessage: any;
}

const SelectPicker = ({
  items,
  onChange,
  value,
  label,
  errors,
  errorMessage,
}: SelectPickerProps) => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);

  const [modalVisible, setModalVisible] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  const selectedLabel =
    items.find((item: any) => item.value === value)?.label || "";

  const handleConfirm = () => {
    onChange(tempValue);
    setModalVisible(false);
  };

  const handleCancel = () => {
    setTempValue(value);
    setModalVisible(false);
  };

  return (
    <View style={styles.pickerView}>
      <Text bold category="h8" style={styles.label}>
        {label}
      </Text>
      <TouchableOpacity
        style={styles.touchable}
        onPress={() => setModalVisible(true)}
      >
        <Text>{selectedLabel || "Pilih salah satu..."}</Text>
      </TouchableOpacity>
      {errors && (
        <Text status="warning" category="h9" style={styles.labelWarning}>
          {errorMessage || "Pilih salah satu!"}
        </Text>
      )}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={handleCancel}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Picker
              selectedValue={tempValue}
              onValueChange={setTempValue}
              style={
                Platform.OS === "ios"
                  ? pickerSelectStyles.inputIOS
                  : pickerSelectStyles.inputAndroid
              }
            >
              {items.map((item: any, idx: number) => (
                <Picker.Item key={idx} label={item.label} value={item.value} />
              ))}
            </Picker>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleConfirm}
              >
                <Text style={{ fontWeight: "bold" }}>Confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleCancel}
              >
                <Text style={{ color: "red" }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const themedStyles = StyleService.create({
  pickerView: {
    marginBottom: 24,
  },
  label: {
    color: "color-basic-600",
    marginBottom: 4,
  },
  labelWarning: {
    marginTop: 4,
  },
  touchable: {
    minHeight: 40,
    justifyContent: "center",
    borderBottomWidth: 2,
    borderColor: "#F0F0F0",
    paddingVertical: 8,
    fontWeight: "700",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  modalButtons: {
    borderTopWidth: 1,
    borderColor: "#F0F0F0",
    gap: 8,
    marginTop: 16,
    paddingBottom: 16,
    flexDirection: "row",
  },
  modalButton: {
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    padding: 10,
  },
});

const pickerSelectStyles = StyleService.create({
  inputIOS: {
    minHeight: 200,
    fontSize: 18,
  },
  inputAndroid: {
    minHeight: 200,
    fontSize: 18,
  },
});

export default React.memo(SelectPicker);
