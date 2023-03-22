# Pasos

Instalar node y npm

1- Instalar node

2- Instalar npm

3- ir a la raiz del directorio "ing-2" y hacer npm install // esto instala todas las dependencias

___________________

Montar Base de datos:

4- npm install --save mysql2

5- npx sequelize-cli db:create

6- npx sequelize-cli model:generate --name User --attributes user:string,name:string,rol:string,pass:string

7- npx sequelize-cli db:migrate

Ejecutar:

8- nodemon app
