import React from "react";
import { View } from "react-native";
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

  return (
    <View style={styles.pickerView}>
      <Text bold category="h8" style={styles.label}>
        {label}
      </Text>
      <Picker
        selectedValue={value}
        onValueChange={onChange}
        style={pickerSelectStyles.inputIOS}
      >
        <Picker.Item label="" value={null} enabled={false} />
        {items.map((item: any, idx: number) => (
          <Picker.Item key={idx} label={item.label} value={item.value} />
        ))}
      </Picker>
      {errors && (
        <Text status="warning" category="h9" style={styles.labelWarning}>
          {errorMessage || "Pilih salah satu!"}
        </Text>
      )}
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
});

const pickerSelectStyles = StyleService.create({
  inputIOS: {
    minHeight: 40,
    borderRadius: 0,
    borderBottomWidth: 2,
    borderWidth: 0,
    borderColor: "#F0F0F0",
    paddingVertical: 7,
    fontSize: 14,
    fontWeight: "700",
  },
  inputAndroid: {
    minHeight: 40,
    borderRadius: 0,
    borderBottomWidth: 2,
    borderWidth: 0,
    borderColor: "#F0F0F0",
    paddingVertical: 7,
    fontSize: 14,
    fontWeight: "700",
  },
});

export default React.memo(SelectPicker);
