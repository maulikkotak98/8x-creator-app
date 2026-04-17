import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { AppColors } from "@/constants/colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        sceneStyle: { backgroundColor: AppColors.screenBg },
        tabBarStyle: {
          backgroundColor: AppColors.tabBarBg,
          borderTopColor: AppColors.tabBarBorder,
        },
        tabBarInactiveTintColor: AppColors.tabBarInactive,
        tabBarActiveTintColor: AppColors.tabBarActive,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Campaigns",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={23} name="megaphone.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="submissions"
        options={{
          title: "My Submissions",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={22} name="paperplane.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={22} name="person.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
