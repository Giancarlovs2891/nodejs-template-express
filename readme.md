# get into project folder

cd nodejs-template-express

# create .env file

NODE_ENV=development
PORT=3002
DB_URL=mongodb://localhost/DB_NAME
SECRET_KEY=api@123
AWS_ACCESS_KEY=xxxxxxxxxxxxxxxx
AWS_SECRET_KEY=xxxxxxxxxxxxxxxx
AWS_REGION=us-east-1
AWS_BUCKET_NAME=xxxxxxxxxxxxxxxx
SENDGRID_API_KEY=xxxxxxxxxxxxxxxx
SENDGRID_FORGOT_PASSWORD_TEMPLATE=xxxxxxxxxxxxxxxx
SENDGRID_QUOTE_TEMPLATE=xxxxxxxxxxxxxxxx
SENDGRID_DEFAULT_FROM=admin@xxxxxxxxxxxxxxxx.com

# install dependencies

 npm install

# Run local dev server

npm run dev


