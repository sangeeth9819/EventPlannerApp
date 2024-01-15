import React, { useState } from "react";
import { View, PixelRatio, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import ComponentStyles from "../../constants/Component.styles";

const InputText = ({
  secureTextEntry,
  textAlign,
  backgroundColor,
  width,
  height,
  borderStyle,
  placeholder,
  editable,
  disabled,
  keyType,
  refInner,
  stateValue,
  returnKeyType,
  onFocus,
  maxLength,
  keydisable,
  multiline,
  numberOfLines,
  setState,
  onSubmitEditing,
  inputIcon,
  inputIconName,
  defaultValue
}) => {
  const [textsecre, setTextsecre] = useState(secureTextEntry);
  const [isActive, setIsActive] = useState(false);

  return (
    <TextInput
      style={[{
        marginVertical: PixelRatio.getPixelSizeForLayoutSize(3),
        textAlign: textAlign === "center" ? 'center' : '',
        backgroundColor: backgroundColor ? backgroundColor : ComponentStyles.COLORS.ORANGE,
        width: width ? width : '100%', height: height
      }, borderStyle]}
      label={placeholder}
      secureTextEntry={textsecre}
      activeUnderlineColor={ComponentStyles.COLORS.GRAY}
      editable={editable}
      disabled={disabled}
      activeOutlineColor={ComponentStyles.COLORS.GRAY}
      keyboardType={keyType}
      mode="flat"
      ref={refInner}
      value={stateValue}
      placeholderTextColor={ComponentStyles.COLORS.RED}
      returnKeyType={returnKeyType}
      textAlign={'center'}
      autoFocus={onFocus}
      textColor={ComponentStyles.COLORS.BLACK}
      maxLength={maxLength}
      underlineColor={ComponentStyles.COLORS.LIGHT_GRAY}
      showSoftInputOnFocus={keydisable}
      multiline={multiline}
      onFocus={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
      numberOfLines={numberOfLines}
      onChangeText={setState}
      onSubmitEditing={onSubmitEditing}
      left={inputIcon ? <TextInput.Icon icon={inputIconName} iconColor={isActive ? ComponentStyles.COLORS.DARK_BLUE : ComponentStyles.COLORS.LIGHT_GRAY} /> : ""}
      right={secureTextEntry ? <TextInput.Icon icon={textsecre ? "eye-off-outline" : "eye-outline"} onPress={() => setTextsecre(!textsecre)} iconColor={ComponentStyles.COLORS.LIGHT_GRAY} /> : ""}
      defaultValue={defaultValue}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    marginVertical: PixelRatio.getPixelSizeForLayoutSize(2),
    backgroundColor: ComponentStyles.COLORS.WHITE,
    borderColor: ComponentStyles.COLORS.WHITE,
    elevation: 5
  },
  SectionStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: .5,
    borderColor: ComponentStyles.COLORS.PRIMARY_COLOR,
    marginVertical: PixelRatio.getPixelSizeForLayoutSize(2),
  },
  SearchSectionStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ComponentStyles.COLORS.LIGHT_GRAY,
    height: 50,
    marginVertical: PixelRatio.getPixelSizeForLayoutSize(2),
  },
});

export default InputText;
