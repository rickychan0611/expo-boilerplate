import { colors } from '@/src/constants/colors';
import { View, Modal, Text, TouchableOpacity, StyleSheet } from 'react-native';
import tw from "twrnc"

function NumKeyboard({ open, setOpen, setQty, qty }: any) {

  const handleKeyPress = (key: string) => {
    if (key === 'backspace') {
      qty.length && setQty((prevNumber: string) => prevNumber.slice(0, -1));
    } else if (key === 'cancel') {
      setQty('');
    } else if (key === 'done') {
      setOpen(false)
    } else {
      if (key === '0' && qty === "" || qty.length === 6) return
      setQty((prevNumber: string) => prevNumber + key);
    }
  };

  return (
    <Modal
      visible={open}
      onRequestClose={() => setOpen(false)}
      transparent={true}
    >
      <View style={tw`flex-1 bg-[rgba(0,0,0,.3)] flex justify-center items-center p-4`}>
        <View style={tw`w-full bg-white rounded`}>
          <View style={tw`h-[70px] rounded-t bg-gray-100 text-right px-6 justify-center items-end`}>
            <Text style={tw`text-2xl`}>{qty}</Text>
          </View>

          <View style={styles.row}>
            <TouchableOpacity onPress={() => handleKeyPress('1')} style={styles.key}>
              <Text>1</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleKeyPress('2')} style={styles.key}>
              <Text>2</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleKeyPress('3')} style={styles.key}>
              <Text>3</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <TouchableOpacity onPress={() => handleKeyPress('4')} style={styles.key}>
              <Text>4</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleKeyPress('5')} style={styles.key}>
              <Text>5</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleKeyPress('6')} style={styles.key}>
              <Text>6</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity onPress={() => handleKeyPress('7')} style={styles.key}>
              <Text>7</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleKeyPress('8')} style={styles.key}>
              <Text>8</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleKeyPress('9')} style={styles.key}>
              <Text>9</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity onPress={() => handleKeyPress('cancel')} style={styles.key}>
              <Text>Clear</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleKeyPress('0')} style={styles.key}>
              <Text>0</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleKeyPress('backspace')} style={styles.key}>
              <Text>←</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => handleKeyPress('done')} style={styles.doneButton}>
            <Text>DONE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = {
  keyboard: tw`p-4 rounded`,
  row: tw`flex-row justify-between`,
  key: tw`flex-1 border-b border-l border-gray-100 p-4 justify-center items-center h-[60px]`,
  inputText: tw`text-center text-2xl`,
  doneButton: tw`h-[60px] p-2 rounded justify-center items-center`
}

export default NumKeyboard;