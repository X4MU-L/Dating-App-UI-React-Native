import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Matches from "../components/matches";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { chatData } from "../constant";
import { useNavigation } from "@react-navigation/native";

export default function ChatScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="">
      <View className="px-4">
        <Text className="uppercase font-semibold text-neutral-500 tracking-wider">
          Matches
        </Text>
      </View>
      <Matches />

      {/* Search Bar */}
      <View className="mx-4 mt-6 flex-row items-center rounded-2xl bg-neutral-200 px-3 py-4">
        <TextInput
          placeholder="Search"
          placeholderTextColor={"gray"}
          style={{
            fontSize: hp(1.7),
          }}
          className="flex-1 text-base mb-1 pl-1 tracking-widest"
        />

        <View className="">
          <MagnifyingGlassIcon size={hp(2.5)} color={"gray"} strokeWidth={3} />
        </View>
      </View>

      {/* Chat List */}

      <View className="px-4">
        <View className="border-b border-neutral-300 py-4">
          <Text className="uppercase font-semibold text-neutral-500 tracking-wider ">
            CHAT
          </Text>
        </View>

        <FlatList
          data={chatData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="w-full py-3 items-center flex-row border-b  border-neutral-300 "
              onPress={() =>
                navigation.navigate("ChatDetails", {
                  chat: item.chat,
                  imgUrl: item.imgUrl,
                  name: item.name,
                  age : item.age
                })
              }
            >
              {/* Avatar */}
              <View className="w-[17%]">
                <Image
                  source={item.imgUrl}
                  style={{
                    width: hp(6),
                    height: hp(6),
                  }}
                  className="rounded-full"
                />
              </View>

              {/* Information */}
              <View className="w-[82%]  space-y-1">
                <View className="flex-row justify-between items-center">
                  <View className="flex-row justify-center">
                    <Text className="font-bold text-base leading-[0px]">
                      {item.name} {", "}
                    </Text>
                    <Text className="font-bold text-base leading-[0px] mr-1">
                      {item.age}
                    </Text>
                    {item.isOnline && (
                      <View className="w-2 h-2 bg-[#F26322] rounded-full ml-1 mt-1"></View>
                    )}
                  </View>
                  <Text className="text-sm leading-[0px]">{item.timeSent}</Text>
                </View>
                <View>
                  <Text className="font-semibold text-xs text-neutral-500">
                    {item.lastMessage.length > 45
                      ? item.lastMessage.slice(0, 45) + "..."
                      : item.lastMessage}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
