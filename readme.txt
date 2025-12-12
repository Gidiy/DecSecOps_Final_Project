docker network create do-net       

docker build -t backend_image ./DevSecOps-Project6-main

docker run -d --name backend_con --network do-net backend_image

docker build -t frontend_image ./Front_dev

docker run -d --name frontend_con --network do-net -p 8080:80 frontend_image

בדיקה
docker ps
docker network inspect do-net
docker exec -it frontend_con sh
ping backend_con

הקמה מהירה לאחר שינוי

הקמת קונטיינר לפוסטגרס
docker run -d --name pg_db --network app-net \
  -e POSTGRES_USER=app_admin \
  -e POSTGRES_PASSWORD=SuperSecret123 \
  -e POSTGRES_DB=gamification \
  -p 5432:5432 \
  -v pgdata:/var/lib/postgresql/data \
  postgres:16


docker stop backend_con
docker rm backend_con
docker rmi backend_image

docker stop frontend_con
docker rm frontend_con
docker rmi frontend_image

#בונה באקאנד
docker build -t backend_image ./backend
#בונה תמונה של פרונטאנד
docker build -t frontend_image ./frontend
#מריץ קונטיינר של באקאנד
docker run -d --name backend_con --network do-net -e DATABASE_URL=postgresql://app_admin:SuperSecret123@pg_db:5432/gamification -p 5000:5000 backend_image

#מריץ קונטיינר של פרונטאנד
docker run -d --name frontend_con --network do-net -p 8080:80 frontend_image
#מריץ קונטיינר של פוסטגרס
docker run -d --name database_con --network do-net -e POSTGRES_USER=app_admin -e POSTGRES_PASSWORD=SuperSecret123 -e POSTGRES_DB=gamification -p 5432:5432 -v pgdata:/var/lib/postgresql/data postgres:16
