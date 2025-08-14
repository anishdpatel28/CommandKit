import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/MaterialIcons";

import ReqGenTab from "./components/ReqGenTab";
import MacroBoardTab from "./components/MacroBoardTab";
import { colors } from "./theme/colors";

type TabType = "reqgen" | "macroboard";

const App = () => {
  const [activeTab, setActiveTab] = useState<TabType>("reqgen");

  const renderTabContent = () => {
    switch (activeTab) {
      case "reqgen":
        return <ReqGenTab />;
      case "macroboard":
        return <MacroBoardTab />;
      default:
        return <ReqGenTab />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <LinearGradient
        colors={[colors.primary, colors.secondary]}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Icon name="code" size={32} color="white" />
          <Text style={styles.title}>CommandKit</Text>
          <Text style={styles.subtitle}>Developer Tools Hub</Text>
        </View>
      </LinearGradient>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "reqgen" && styles.activeTab]}
          onPress={() => setActiveTab("reqgen")}
        >
          <Icon
            name="description"
            size={24}
            color={
              activeTab === "reqgen" ? colors.primary : colors.textSecondary
            }
          />
          <Text
            style={[
              styles.tabText,
              activeTab === "reqgen" && styles.activeTabText,
            ]}
          >
            ReqGen
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === "macroboard" && styles.activeTab]}
          onPress={() => setActiveTab("macroboard")}
        >
          <Icon
            name="keyboard"
            size={24}
            color={
              activeTab === "macroboard" ? colors.primary : colors.textSecondary
            }
          />
          <Text
            style={[
              styles.tabText,
              activeTab === "macroboard" && styles.activeTabText,
            ]}
          >
            MacroBoard
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderTabContent()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerContent: {
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 5,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    marginHorizontal: 20,
    marginTop: -15,
    borderRadius: 12,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: colors.lightPrimary,
  },
  tabText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "600",
    color: colors.textSecondary,
  },
  activeTabText: {
    color: colors.primary,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});

export default App;
