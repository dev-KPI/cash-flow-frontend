source .env

echo "Switching to branch dev"
git checkout dev

echo "Building app..."
npm run build

echo "Deploying files to server"
scp -r build/* $SHELL_ROOT:/var/www/cash-money-frontend/build

echo "Done!"