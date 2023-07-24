echo "Switching to branch master"
git checkout master

echo "Building app..."
npm run build

echo "Deploying files to server"
scp -r build/* root@46.101.150.9:/var/www/cash-money-front

echo "Done!"