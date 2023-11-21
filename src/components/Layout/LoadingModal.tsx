import { colors } from '@/src/constants/colors';
import { View, Modal, ActivityIndicator } from 'react-native';
import tw from "twrnc"

function LoadingModal({ loading }: { loading: boolean }) {
  return (
    <>
      {loading &&
        <View style={tw`absolute z-50 w-full h-full bg-[rgba(0,0,0,.3)] flex justify-center items-center`}>
          <View style={tw`bg-white rounded-lg h-[100px] w-[100px] flex justify-center items-center`}>
            <ActivityIndicator size="large" color={"red"} hidesWhenStopped={!loading} />
          </View>
        </View>}
    </>
  );
}

export default LoadingModal;