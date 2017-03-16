npm run build
./node_modules/.bin/webdriver-manager start &
node server.js &
./node_modules/protractor/bin/protractor tests/protractor-config.js
