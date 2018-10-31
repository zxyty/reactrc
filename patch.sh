# diff -u ./node_modules/rmc-tabs/lib/DefaultTabBar.native.js ./patch/rmc-tabs/DefaultTabBar.native.js > ./patch/rmc-tabs/fix.patch
# patch -b ./node_modules/rmc-tabs/lib/DefaultTabBar.native.js ./patch/rmc-tabs/fix.patch

# rm -rf ./node_modules/antd-mobile/lib/accordion/style/index.native.js
# cp -R ./patch/accordion/style/index.native.js ./node_modules/antd-mobile/lib/accordion/style/index.native.js