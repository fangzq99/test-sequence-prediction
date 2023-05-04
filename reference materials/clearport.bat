c:/
adb -s ce07171755ab9cc50d uninstall io.appium.uiautomator2.server
adb -s ce07171755ab9cc50d uninstall io.appium.uiautomator2.server.test
adb -s emulator-5556 uninstall io.appium.uiautomator2.server
adb -s emulator-5556 uninstall io.appium.uiautomator2.server.test
ping 192.0.2.1 -n 20 -w 2 >nul